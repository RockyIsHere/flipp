"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RecaptchaVerifier, signInWithPhoneNumber, signInWithEmailAndPassword, type ConfirmationResult } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import { getUserProfile, createOrUpdateUserProfile } from "@/lib/firestore";
import StatusBar from "./components/StatusBar";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [authMethod, setAuthMethod] = useState<"phone" | "email">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<"input" | "otp" | "name">("input");
  const [name, setName] = useState("");
  const [confirmResult, setConfirmResult] = useState<ConfirmationResult | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const verifierRef = useRef<RecaptchaVerifier | null>(null);

  useEffect(() => {
    if (!loading && user) {
      getUserProfile(user.uid).then((profile) => {
        if (profile?.role === "admin") {
          router.replace("/admin/dashboard");
        } else {
          router.replace("/home");
        }
      });
    }
  }, [user, loading, router]);

  const setupRecaptcha = () => {
    if (!verifierRef.current && recaptchaRef.current) {
      verifierRef.current = new RecaptchaVerifier(auth, recaptchaRef.current, {
        size: "invisible",
      });
    }
    return verifierRef.current!;
  };

  const handleSendCode = async () => {
    setError("");
    setBusy(true);
    try {
      const fullPhone = "+91" + phone.replace(/\D/g, "");
      const verifier = setupRecaptcha();
      const result = await signInWithPhoneNumber(auth, fullPhone, verifier);
      setConfirmResult(result);
      setStep("otp");
    } catch (err: unknown) {
      const rawMessage = err instanceof Error ? err.message : "Failed to send code";
      if (rawMessage.includes("api-key-not-valid") || rawMessage.includes("invalid-api-key")) {
        setError("Firebase Web API Key is not configured in .env.local. You can add your API key or click below to continue in Demo Mode.");
      } else if (rawMessage.includes("operation-not-allowed")) {
        setError("Phone Authentication / SMS Region is disabled in your Firebase Console. Please enable Phone Auth in Firebase Console > Authentication > Sign-in method.");
      } else {
        setError(rawMessage);
      }
      verifierRef.current = null;
    } finally {
      setBusy(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!confirmResult) return;
    setError("");
    setBusy(true);
    try {
      const cred = await confirmResult.confirm(otp);
      const profile = await getUserProfile(cred.user.uid);
      if (!profile) {
        setStep("name");
      } else {
        router.replace("/home");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Invalid code";
      setError(message);
    } finally {
      setBusy(false);
    }
  };

  const handleSaveName = async () => {
    if (!auth.currentUser) return;
    setError("");
    setBusy(true);
    try {
      await createOrUpdateUserProfile(auth.currentUser.uid, {
        name,
        phone: auth.currentUser.phoneNumber || "+91" + phone.replace(/\D/g, ""),
        role: "customer",
      });
      router.replace("/home");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to save";
      setError(message);
    } finally {
      setBusy(false);
    }
  };

  const handleEmailLogin = async () => {
    setError("");
    setBusy(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const profile = await getUserProfile(cred.user.uid);
      if (profile?.role === "admin") {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/home");
      }
    } catch (err: unknown) {
      const rawMessage = err instanceof Error ? err.message : "Login failed";
      if (rawMessage.includes("api-key-not-valid") || rawMessage.includes("invalid-api-key")) {
        setError("Firebase Web API Key is not configured in .env.local. You can add your API key or click below to continue in Demo Mode.");
      } else {
        setError(rawMessage);
      }
    } finally {
      setBusy(false);
    }
  };

  if (loading) return null;

  return (
    <div className="screen">
      <StatusBar />
      <div style={{ padding: "56px 24px 0" }}>
        <div style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 800,
          fontSize: 40,
          letterSpacing: "-0.03em",
        }}>
          KLIPP
        </div>
        <div className="kick" style={{ marginTop: 6 }}>
          Salon &amp; barber &middot; est. 2019
        </div>
      </div>

      <div style={{ padding: "0 24px", marginTop: "auto" }}>
        <h2 style={{ fontSize: 30 }}>Book your chair.</h2>
        <p className="text-muted" style={{ fontSize: 14 }}>
          {step === "otp"
            ? "Enter the 6-digit code we sent to your phone."
            : step === "name"
              ? "One last thing — what should we call you?"
              : "Enter your number and we'll text you a code. No password."}
        </p>

        {step === "input" && (
          <>
            <div style={{
              display: "flex",
              border: "1px solid var(--color-divider)",
              margin: "20px 0 14px",
            }}>
              <button
                onClick={() => setAuthMethod("phone")}
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "11px 0",
                  fontSize: 13,
                  fontWeight: 600,
                  background: authMethod === "phone" ? "var(--color-text)" : "transparent",
                  color: authMethod === "phone" ? "var(--color-bg)" : undefined,
                  border: "none",
                  cursor: "pointer",
                }}
                className={authMethod !== "phone" ? "text-muted" : ""}
              >
                Phone
              </button>
              <button
                onClick={() => setAuthMethod("email")}
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "11px 0",
                  fontSize: 13,
                  fontWeight: 600,
                  background: authMethod === "email" ? "var(--color-text)" : "transparent",
                  color: authMethod === "email" ? "var(--color-bg)" : undefined,
                  border: "none",
                  cursor: "pointer",
                }}
                className={authMethod !== "email" ? "text-muted" : ""}
              >
                Email
              </button>
            </div>

            {authMethod === "phone" ? (
              <div style={{
                display: "flex",
                border: "1px solid var(--color-text)",
                background: "#fff",
              }}>
                <div style={{
                  padding: "15px 12px",
                  borderRight: "1px solid var(--color-divider)",
                  fontSize: 15,
                  fontWeight: 600,
                }}>+91</div>
                <input
                  type="tel"
                  placeholder="98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "15px 12px",
                    fontSize: 15,
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontFamily: "var(--font-body)",
                  }}
                />
              </div>
            ) : (
              <>
                <div style={{
                  border: "1px solid var(--color-text)",
                  background: "#fff",
                  marginBottom: 10,
                }}>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "15px 12px",
                      fontSize: 15,
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      fontFamily: "var(--font-body)",
                    }}
                  />
                </div>
                <div style={{
                  border: "1px solid var(--color-text)",
                  background: "#fff",
                }}>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "15px 12px",
                      fontSize: 15,
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      fontFamily: "var(--font-body)",
                    }}
                  />
                </div>
              </>
            )}

            {error && (
              <p style={{ color: "var(--color-accent)", fontSize: 13, margin: "8px 0 0" }}>{error}</p>
            )}

            <button
              className="btn btn-primary btn-block"
              style={{ padding: 16, fontSize: 15, marginTop: 14 }}
              onClick={authMethod === "phone" ? handleSendCode : handleEmailLogin}
              disabled={busy}
            >
              {busy ? "Please wait..." : authMethod === "phone" ? "Send code" : "Sign in"}
            </button>

            <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ flex: 1, padding: "10px 0", fontSize: 12 }}
                onClick={() => router.push("/home")}
              >
                Demo Customer Mode &rarr;
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ flex: 1, padding: "10px 0", fontSize: 12 }}
                onClick={() => router.push("/admin/dashboard")}
              >
                Demo Admin Mode &rarr;
              </button>
            </div>
          </>
        )}

        {step === "otp" && (
          <>
            <div style={{
              border: "1px solid var(--color-text)",
              background: "#fff",
              marginTop: 20,
            }}>
              <input
                type="text"
                inputMode="numeric"
                placeholder="6-digit code"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={{
                  width: "100%",
                  padding: "15px 12px",
                  fontSize: 20,
                  fontWeight: 600,
                  letterSpacing: ".15em",
                  textAlign: "center",
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontFamily: "var(--font-body)",
                }}
              />
            </div>
            {error && (
              <p style={{ color: "var(--color-accent)", fontSize: 13, margin: "8px 0 0" }}>{error}</p>
            )}
            <button
              className="btn btn-primary btn-block"
              style={{ padding: 16, fontSize: 15, marginTop: 14 }}
              onClick={handleVerifyOtp}
              disabled={busy}
            >
              {busy ? "Verifying..." : "Verify"}
            </button>
            <button
              className="btn btn-ghost"
              style={{ padding: 10, marginTop: 4, justifyContent: "flex-start", fontSize: 13 }}
              onClick={() => { setStep("input"); setOtp(""); setError(""); }}
            >
              Use a different number
            </button>
          </>
        )}

        {step === "name" && (
          <>
            <div style={{
              border: "1px solid var(--color-text)",
              background: "#fff",
              marginTop: 20,
            }}>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "15px 12px",
                  fontSize: 15,
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontFamily: "var(--font-body)",
                }}
              />
            </div>
            {error && (
              <p style={{ color: "var(--color-accent)", fontSize: 13, margin: "8px 0 0" }}>{error}</p>
            )}
            <button
              className="btn btn-primary btn-block"
              style={{ padding: 16, fontSize: 15, marginTop: 14 }}
              onClick={handleSaveName}
              disabled={busy || !name.trim()}
            >
              {busy ? "Saving..." : "Continue"}
            </button>
          </>
        )}

        <p className="text-muted" style={{ fontSize: 11, margin: "14px 0 28px" }}>
          By continuing you agree to Klipp&apos;s terms and cancellation policy.
        </p>
      </div>

      <div ref={recaptchaRef} />
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import { getUserProfile } from "@/lib/firestore";
import StatusBar from "../components/StatusBar";

export default function AdminLoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      getUserProfile(user.uid).then((profile) => {
        if (profile?.role === "admin") {
          router.replace("/admin/dashboard");
        }
      });
    }
  }, [user, loading, router]);

  const handleSignIn = async () => {
    setError("");
    setBusy(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const profile = await getUserProfile(cred.user.uid);
      if (profile?.role !== "admin") {
        setError("This account does not have admin access.");
        await auth.signOut();
        setBusy(false);
        return;
      }
      router.replace("/admin/dashboard");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
    } finally {
      setBusy(false);
    }
  };

  if (loading) return null;

  return (
    <div className="screen" style={{
      background: "var(--color-neutral-900)",
      color: "var(--color-bg)",
      borderColor: "var(--color-neutral-900)",
    }}>
      <StatusBar />

      <div style={{ padding: "56px 24px 0" }}>
        <div style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 800,
          fontSize: 34,
          letterSpacing: "-0.03em",
        }}>
          KLIPP<span style={{ color: "var(--color-accent-500)" }}>/</span>ADMIN
        </div>
        <div className="kick" style={{ marginTop: 6, color: "var(--color-neutral-400)" }}>
          Staff access only
        </div>
      </div>

      <div style={{ padding: "0 24px", marginTop: "auto" }}>
        <h2 style={{ fontSize: 28 }}>Sign in</h2>

        <div style={{ margin: "18px 0 12px" }}>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 5, color: "var(--color-neutral-400)" }}>
            Staff email
          </div>
          <input
            type="email"
            placeholder="admin@klipp.salon"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              border: "1px solid var(--color-neutral-600)",
              padding: "15px 12px",
              fontSize: 15,
              background: "transparent",
              color: "var(--color-bg)",
              outline: "none",
              fontFamily: "var(--font-body)",
            }}
          />
        </div>

        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 5, color: "var(--color-neutral-400)" }}>
            Password
          </div>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              border: "1px solid var(--color-neutral-600)",
              padding: "15px 12px",
              fontSize: 15,
              background: "transparent",
              color: "var(--color-bg)",
              outline: "none",
              fontFamily: "var(--font-body)",
            }}
          />
        </div>

        {error && (
          <p style={{ color: "var(--color-accent-500)", fontSize: 13, margin: "8px 0 0" }}>{error}</p>
        )}

        <button
          className="btn btn-primary btn-block"
          style={{ padding: 16, fontSize: 15, marginTop: 16 }}
          onClick={handleSignIn}
          disabled={busy}
        >
          {busy ? "Signing in..." : "Sign in"}
        </button>
        <div style={{ fontSize: 12, margin: "14px 0 28px", color: "var(--color-neutral-400)" }}>
          Locked out? Ask the salon owner to reset your access.
        </div>
      </div>
    </div>
  );
}

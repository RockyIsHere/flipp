"use client";

import { useState } from "react";
import Link from "next/link";
import StatusBar from "./components/StatusBar";

export default function LoginPage() {
  const [authMethod, setAuthMethod] = useState<"phone" | "email">("phone");

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
          Enter your number and we&apos;ll text you a 4-digit code. No password.
        </p>

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
            }}>+1</div>
            <input
              type="tel"
              placeholder="(555) 018 4402"
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
          <div style={{
            border: "1px solid var(--color-text)",
            background: "#fff",
          }}>
            <input
              type="email"
              placeholder="you@email.com"
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
        )}

        <Link href="/home" style={{ textDecoration: "none" }}>
          <button className="btn btn-primary btn-block" style={{ padding: 16, fontSize: 15, marginTop: 14 }}>
            Send code
          </button>
        </Link>
        <p className="text-muted" style={{ fontSize: 11, margin: "14px 0 28px" }}>
          By continuing you agree to Klipp&apos;s terms and cancellation policy.
        </p>
      </div>
    </div>
  );
}

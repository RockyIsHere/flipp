"use client";

import { useState } from "react";
import Link from "next/link";
import StatusBar from "../components/StatusBar";
import BottomNav from "../components/BottomNav";

export default function ProfilePage() {
  const [reminders, setReminders] = useState(true);

  return (
    <div className="screen">
      <StatusBar />

      {/* Profile header */}
      <div style={{
        padding: "8px 16px 18px",
        borderBottom: "2px solid var(--color-text)",
        display: "flex",
        alignItems: "center",
        gap: 14,
      }}>
        <div style={{
          width: 56,
          height: 56,
          background: "var(--color-text)",
          color: "var(--color-bg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-heading)",
          fontWeight: 800,
          fontSize: 20,
        }}>AR</div>
        <div>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22 }}>
            Ana Reyes
          </div>
          <div className="text-muted" style={{ fontSize: 13 }}>+1 (555) 018 4402</div>
        </div>
      </div>

      {/* Info rows */}
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div>
          <div className="kick text-muted">Name</div>
          <div style={{ fontSize: 15, fontWeight: 600, marginTop: 3 }}>Ana Reyes</div>
        </div>
        <span className="btn btn-ghost" style={{ fontSize: 13 }}>Edit</span>
      </div>

      <div className="row" style={{ justifyContent: "space-between" }}>
        <div>
          <div className="kick text-muted">Phone</div>
          <div style={{ fontSize: 15, fontWeight: 600, marginTop: 3 }}>+1 (555) 018 4402</div>
        </div>
        <span className="btn btn-ghost" style={{ fontSize: 13 }}>Edit</span>
      </div>

      <div className="row" style={{ justifyContent: "space-between" }}>
        <div>
          <div className="kick text-muted">Email</div>
          <div style={{ fontSize: 15, fontWeight: 600, marginTop: 3 }}>ana.reyes@mail.com</div>
        </div>
        <span className="btn btn-ghost" style={{ fontSize: 13 }}>Edit</span>
      </div>

      {/* Text reminders toggle */}
      <div className="row" style={{
        justifyContent: "space-between",
        borderBottom: "2px solid var(--color-text)",
      }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Text reminders</div>
          <div className="text-muted" style={{ fontSize: 12 }}>2 hours before your slot</div>
        </div>
        <button
          onClick={() => setReminders(!reminders)}
          style={{
            width: 46,
            height: 26,
            background: reminders ? "var(--color-accent)" : "var(--color-neutral-300)",
            display: "flex",
            justifyContent: reminders ? "flex-end" : "flex-start",
            padding: 3,
            border: "none",
            cursor: "pointer",
            transition: "background 0.2s ease",
          }}
        >
          <div style={{ width: 20, height: 20, background: "var(--color-bg)" }} />
        </button>
      </div>

      <div style={{ padding: 16 }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <button className="btn btn-secondary btn-block" style={{ padding: 15, margin: 0 }}>
            Sign out
          </button>
        </Link>
      </div>

      <BottomNav />
    </div>
  );
}

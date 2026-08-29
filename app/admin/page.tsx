import Link from "next/link";
import StatusBar from "../components/StatusBar";

export default function AdminLoginPage() {
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
          <div style={{
            border: "1px solid var(--color-neutral-600)",
            padding: "15px 12px",
            fontSize: 15,
          }}>marco@klipp.salon</div>
        </div>

        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 5, color: "var(--color-neutral-400)" }}>
            Password
          </div>
          <div style={{
            border: "1px solid var(--color-neutral-600)",
            padding: "15px 12px",
            fontSize: 15,
            letterSpacing: ".2em",
          }}>
            ••••••••
          </div>
        </div>

        <Link href="/admin/dashboard" style={{ textDecoration: "none" }}>
          <button className="btn btn-primary btn-block" style={{ padding: 16, fontSize: 15, marginTop: 16 }}>
            Sign in
          </button>
        </Link>
        <div style={{ fontSize: 12, margin: "14px 0 28px", color: "var(--color-neutral-400)" }}>
          Locked out? Ask the salon owner to reset your access.
        </div>
      </div>
    </div>
  );
}

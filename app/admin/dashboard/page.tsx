import Link from "next/link";
import StatusBar from "../../components/StatusBar";
import AdminBottomNav from "../../components/AdminBottomNav";
import StatusTag from "../../components/StatusTag";
import { BellIcon } from "../../components/icons";
import { todaySchedule } from "../../data";

export default function AdminDashboardPage() {
  return (
    <div className="screen">
      {/* Dark header section */}
      <div style={{ background: "var(--color-neutral-900)", color: "var(--color-bg)", flexShrink: 0 }}>
        <StatusBar />
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "4px 16px 16px",
        }}>
          <div>
            <div className="kick" style={{ color: "var(--color-neutral-400)" }}>
              Klipp<span style={{ color: "var(--color-accent-500)" }}>/</span>Admin &middot; Marco
            </div>
            <div style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: 24,
              marginTop: 2,
            }}>Today &middot; Fri 29 Aug</div>
          </div>
          <BellIcon />
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", borderTop: "1px solid var(--color-neutral-700)" }}>
          <div style={{ flex: 1, padding: "12px 14px", borderRight: "1px solid var(--color-neutral-700)" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22 }}>12</div>
            <div style={{ fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--color-neutral-400)" }}>Booked</div>
          </div>
          <div style={{ flex: 1, padding: "12px 14px", borderRight: "1px solid var(--color-neutral-700)" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, color: "var(--color-accent-500)" }}>3</div>
            <div style={{ fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--color-neutral-400)" }}>Pending</div>
          </div>
          <div style={{ flex: 1, padding: "12px 14px" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22 }}>$412</div>
            <div style={{ fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--color-neutral-400)" }}>Expected</div>
          </div>
        </div>
      </div>

      {/* Needs a decision */}
      <div style={{ padding: "14px 16px 10px" }}>
        <div className="kick" style={{ color: "var(--color-accent-700)" }}>Needs a decision</div>
      </div>
      <div style={{ margin: "0 16px 14px", border: "2px solid var(--color-text)", padding: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16 }}>
            17:00 &middot; Ana Reyes
          </div>
          <StatusTag variant="pending">Pending</StatusTag>
        </div>
        <div className="text-muted" style={{ fontSize: 12, marginTop: 2 }}>
          Beard trim &middot; 20 min &middot; $18
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button className="btn btn-primary" style={{ flex: 1, padding: 12, justifyContent: "center" }}>
            Accept
          </button>
          <button className="btn btn-secondary" style={{ flex: 1, padding: 12, justifyContent: "center" }}>
            Reject
          </button>
        </div>
      </div>

      {/* Today's schedule */}
      <div style={{ padding: "12px 16px 8px", borderTop: "2px solid var(--color-text)" }}>
        <div className="kick text-muted">Today&apos;s schedule</div>
      </div>
      <div style={{ flex: 1, overflow: "auto" }}>
        {todaySchedule.filter(b => b.status !== "cancelled").map((booking) => (
          <Link
            key={booking.id}
            href={`/admin/booking/${booking.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="row" style={{
              justifyContent: "space-between",
              background: booking.status === "confirmed" && booking.time === "15:30" ? "var(--color-surface)" : undefined,
            }}>
              <div style={{ display: "flex", gap: 12 }}>
                <span style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: 15,
                  width: 44,
                }}>{booking.time}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{booking.customer}</div>
                  <div className="text-muted" style={{ fontSize: 12 }}>
                    {booking.service} &middot; {booking.duration}
                  </div>
                </div>
              </div>
              <StatusTag variant={
                booking.status === "completed" ? "done" :
                booking.time === "15:30" ? "now" :
                booking.status
              }>
                {booking.status === "completed" ? "Done" :
                 booking.time === "15:30" ? "Now" :
                 booking.status === "confirmed" ? "Confirmed" : "Pending"}
              </StatusTag>
            </div>
          </Link>
        ))}
      </div>

      <AdminBottomNav />
    </div>
  );
}

import Link from "next/link";
import StatusBar from "../../../components/StatusBar";
import StatusTag from "../../../components/StatusTag";
import { ChevronLeft, PhoneIcon } from "../../../components/icons";
import { todaySchedule } from "../../../data";

export default async function AdminBookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const booking = todaySchedule.find((b) => b.id === id) ?? todaySchedule[todaySchedule.length - 1];
  const initials = booking.customer.split(" ").map(n => n[0]).join("");

  return (
    <div className="screen">
      {/* Dark header */}
      <div style={{ background: "var(--color-neutral-900)", color: "var(--color-bg)", flexShrink: 0 }}>
        <StatusBar />
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "4px 16px 14px",
        }}>
          <Link href="/admin/bookings" style={{ color: "inherit", display: "flex" }}>
            <ChevronLeft />
          </Link>
          <span className="kick" style={{ color: "var(--color-neutral-400)" }}>
            Booking {booking.ref}
          </span>
        </div>
      </div>

      {/* Booking info */}
      <div style={{ padding: "18px 16px 16px", borderBottom: "2px solid var(--color-text)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 12 }}>
          <div>
            <h3 style={{ margin: 0 }}>{booking.service}</h3>
            <div className="text-muted" style={{ fontSize: 13, marginTop: 3 }}>
              Fri 29 Aug &middot; {booking.time}&ndash;{
                (() => {
                  const [h, m] = booking.time.split(":").map(Number);
                  const totalMin = h * 60 + m + parseInt(booking.duration);
                  return `${String(Math.floor(totalMin / 60)).padStart(2, "0")}:${String(totalMin % 60).padStart(2, "0")}`;
                })()
              } &middot; ${booking.price}
            </div>
          </div>
          <StatusTag variant={booking.status === "completed" ? "completed" : booking.status}>
            {booking.status === "completed" ? "Completed" :
             booking.status === "confirmed" ? "Confirmed" : "Pending"}
          </StatusTag>
        </div>
      </div>

      {/* Customer section */}
      <div style={{ padding: "14px 16px 6px" }}>
        <div className="kick text-muted">Customer</div>
      </div>
      <div className="row" style={{ gap: 14 }}>
        <div style={{
          width: 46,
          height: 46,
          background: "var(--color-text)",
          color: "var(--color-bg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-heading)",
          fontWeight: 800,
          fontSize: 16,
          flexShrink: 0,
        }}>{initials}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17 }}>
            {booking.customer}
          </div>
          <div className="text-muted" style={{ fontSize: 13 }}>
            {booking.phone || "+1 (555) 000 0000"}
          </div>
        </div>
        <PhoneIcon />
      </div>

      {/* Stats */}
      <div style={{ display: "flex", borderBottom: "2px solid var(--color-text)" }}>
        <div style={{ flex: 1, padding: "14px 16px", borderRight: "1px solid var(--color-divider)" }}>
          <div className="kick text-muted">Visits</div>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, marginTop: 3 }}>7</div>
        </div>
        <div style={{ flex: 1, padding: "14px 16px", borderRight: "1px solid var(--color-divider)" }}>
          <div className="kick text-muted">No-shows</div>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, marginTop: 3 }}>0</div>
        </div>
        <div style={{ flex: 1, padding: "14px 16px" }}>
          <div className="kick text-muted">Since</div>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, marginTop: 3 }}>2024</div>
        </div>
      </div>

      {/* Note */}
      {booking.note && (
        <div style={{ padding: 16 }}>
          <div className="kick text-muted">Note from customer</div>
          <p style={{ fontSize: 14, margin: "8px 0 0" }}>
            &ldquo;{booking.note}&rdquo;
          </p>
        </div>
      )}

      {/* Action buttons */}
      <div style={{
        marginTop: "auto",
        padding: "14px 16px 20px",
        borderTop: "2px solid var(--color-text)",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}>
        {booking.status === "pending" && (
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-primary" style={{ flex: 1, padding: 16, justifyContent: "center", fontSize: 15 }}>
              Accept
            </button>
            <button className="btn btn-secondary" style={{ flex: 1, padding: 16, justifyContent: "center", fontSize: 15 }}>
              Reject
            </button>
          </div>
        )}
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-secondary" style={{ flex: 1, padding: 14, justifyContent: "center" }}>
            Mark completed
          </button>
          <button className="btn btn-secondary" style={{
            flex: 1,
            padding: 14,
            justifyContent: "center",
            color: "var(--color-accent-700)",
            borderColor: "var(--color-accent-700)",
          }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

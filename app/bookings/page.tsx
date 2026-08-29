"use client";

import { useState, useEffect } from "react";
import StatusBar from "../components/StatusBar";
import BottomNav from "../components/BottomNav";
import StatusTag from "../components/StatusTag";
import { AuthGuard } from "@/lib/auth-guard";
import { useAuth } from "@/lib/auth-context";
import { getBookingsForCustomer, updateBookingStatus } from "@/lib/firestore";
import type { Booking } from "@/lib/types";

function BookingsContent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [cancelBooking, setCancelBooking] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getBookingsForCustomer(user.uid).then((b) => {
        setBookings(b);
        setLoading(false);
      });
    }
  }, [user]);

  const upcomingBookings = bookings.filter(b => b.status === "confirmed" || b.status === "pending");
  const pastBookings = bookings.filter(b => b.status === "completed" || b.status === "cancelled");
  const cancelTarget = bookings.find(b => b.id === cancelBooking);

  const handleCancel = async () => {
    if (!cancelTarget) return;
    await updateBookingStatus(cancelTarget.id, "cancelled");
    setBookings(bookings.map(b => b.id === cancelTarget.id ? { ...b, status: "cancelled" } : b));
    setCancelBooking(null);
  };

  return (
    <div className="screen">
      <StatusBar />

      <div style={{ padding: "8px 16px 12px" }}>
        <h3 style={{ margin: 0 }}>My bookings</h3>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "2px solid var(--color-text)" }}>
        <button
          onClick={() => setActiveTab("upcoming")}
          style={{
            flex: 1,
            textAlign: "center",
            padding: "12px 0",
            fontSize: 13,
            fontWeight: activeTab === "upcoming" ? 700 : 600,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: activeTab === "upcoming" ? "var(--color-accent)" : undefined,
            boxShadow: activeTab === "upcoming" ? "inset 0 -3px 0 var(--color-accent)" : undefined,
          }}
          className={activeTab !== "upcoming" ? "text-muted" : ""}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab("past")}
          style={{
            flex: 1,
            textAlign: "center",
            padding: "12px 0",
            fontSize: 13,
            fontWeight: activeTab === "past" ? 700 : 600,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: activeTab === "past" ? "var(--color-accent)" : undefined,
            boxShadow: activeTab === "past" ? "inset 0 -3px 0 var(--color-accent)" : undefined,
          }}
          className={activeTab !== "past" ? "text-muted" : ""}
        >
          Past
        </button>
      </div>

      {/* Booking cards */}
      <div style={{ flex: 1, overflow: "auto" }}>
        {loading && (
          <div className="text-muted" style={{ padding: 16, fontSize: 14 }}>Loading bookings...</div>
        )}

        {!loading && activeTab === "upcoming" && upcomingBookings.length === 0 && (
          <div className="text-muted" style={{ padding: 16, fontSize: 14 }}>No upcoming bookings</div>
        )}

        {activeTab === "upcoming" && upcomingBookings.map((booking) => (
          <div key={booking.id} style={{
            padding: 16,
            borderBottom: booking === upcomingBookings[upcomingBookings.length - 1]
              ? "2px solid var(--color-text)"
              : "1px solid var(--color-divider)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 10 }}>
              <div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18 }}>
                  {booking.serviceName}
                </div>
                <div className="text-muted" style={{ fontSize: 13, marginTop: 2 }}>
                  {booking.date} &middot; {booking.time} &middot; {booking.duration} &middot; &#8377;{booking.price}
                </div>
              </div>
              <StatusTag variant={booking.status}>{booking.status === "confirmed" ? "Confirmed" : "Pending"}</StatusTag>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              <button className="btn btn-secondary" style={{ flex: 1, padding: 13, justifyContent: "center" }}>
                Reschedule
              </button>
              <button
                className="btn btn-secondary"
                style={{ flex: 1, padding: 13, justifyContent: "center", color: "var(--color-accent-700)", borderColor: "var(--color-accent-700)" }}
                onClick={() => setCancelBooking(booking.id)}
              >
                Cancel
              </button>
            </div>
          </div>
        ))}

        {activeTab === "upcoming" && pastBookings.length > 0 && (
          <div style={{ padding: "14px 16px 6px" }}>
            <div className="kick text-muted">Earlier</div>
          </div>
        )}

        {activeTab === "upcoming" && pastBookings.map((booking) => (
          <div key={booking.id} className="row" style={{ justifyContent: "space-between", alignItems: "start" }}>
            <div>
              <div style={{
                fontWeight: 600,
                fontSize: 15,
              }} className={booking.status === "cancelled" ? "text-muted" : ""}>
                {booking.serviceName}
              </div>
              <div className="text-muted" style={{ fontSize: 12 }}>
                {booking.date} &middot; {booking.time}
              </div>
            </div>
            <StatusTag variant={booking.status}>
              {booking.status === "completed" ? "Completed" : "Cancelled"}
            </StatusTag>
          </div>
        ))}

        {activeTab === "past" && pastBookings.length === 0 && !loading && (
          <div className="text-muted" style={{ padding: 16, fontSize: 14 }}>No past bookings</div>
        )}

        {activeTab === "past" && pastBookings.map((booking) => (
          <div key={booking.id} className="row" style={{ justifyContent: "space-between", alignItems: "start" }}>
            <div>
              <div style={{
                fontWeight: 600,
                fontSize: 15,
              }} className={booking.status === "cancelled" ? "text-muted" : ""}>
                {booking.serviceName}
              </div>
              <div className="text-muted" style={{ fontSize: 12 }}>
                {booking.date} &middot; {booking.time}
              </div>
            </div>
            <StatusTag variant={booking.status}>
              {booking.status === "completed" ? "Completed" : "Cancelled"}
            </StatusTag>
          </div>
        ))}
      </div>

      <BottomNav />

      {/* Cancel sheet overlay */}
      {cancelTarget && (
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          zIndex: 50,
        }}>
          <div
            style={{ flex: 1, background: "color-mix(in srgb, var(--color-text) 45%, transparent)" }}
            onClick={() => setCancelBooking(null)}
          />
          <div style={{
            borderTop: "2px solid var(--color-text)",
            background: "var(--color-bg)",
            padding: "20px 16px 22px",
          }}>
            <h4 style={{ margin: "0 0 6px" }}>Cancel this booking?</h4>
            <p className="text-muted" style={{ fontSize: 13 }}>
              {cancelTarget.serviceName}, {cancelTarget.date} at {cancelTarget.time}. Cancelling now is free — under 4 hours a &#8377;100 fee applies.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
              <button
                className="btn btn-primary btn-block"
                style={{ padding: 17, fontSize: 15, margin: 0 }}
                onClick={handleCancel}
              >
                Yes, cancel booking
              </button>
              <button
                className="btn btn-secondary btn-block"
                style={{ padding: 17, fontSize: 15, margin: 0 }}
                onClick={() => setCancelBooking(null)}
              >
                Reschedule instead
              </button>
              <button
                className="btn btn-ghost"
                style={{ padding: 10, justifyContent: "flex-start" }}
                onClick={() => setCancelBooking(null)}
              >
                Keep it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookingsPage() {
  return (
    <AuthGuard>
      <BookingsContent />
    </AuthGuard>
  );
}

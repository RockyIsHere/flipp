"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import StatusBar from "../../components/StatusBar";
import AdminBottomNav from "../../components/AdminBottomNav";
import StatusTag from "../../components/StatusTag";
import { BellIcon } from "../../components/icons";
import { AuthGuard } from "@/lib/auth-guard";
import { useAuth } from "@/lib/auth-context";
import { getBookingsForCustomer, updateBookingStatus } from "@/lib/firestore";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Booking } from "@/lib/types";

function DashboardContent() {
  const { profile } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all bookings for admin view
    const fetchAll = async () => {
      const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      const all = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Booking);
      setBookings(all);
      setLoading(false);
    };
    fetchAll();
  }, []);

  const pendingBookings = bookings.filter(b => b.status === "pending");
  const todayBookings = bookings.filter(b => b.status !== "cancelled");
  const firstPending = pendingBookings[0];

  const totalExpected = todayBookings
    .filter(b => b.status !== "cancelled")
    .reduce((sum, b) => sum + b.price, 0);

  const handleAccept = async (id: string) => {
    await updateBookingStatus(id, "confirmed");
    setBookings(bookings.map(b => b.id === id ? { ...b, status: "confirmed" } : b));
  };

  const handleReject = async (id: string) => {
    await updateBookingStatus(id, "cancelled");
    setBookings(bookings.map(b => b.id === id ? { ...b, status: "cancelled" } : b));
  };

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
              Klipp<span style={{ color: "var(--color-accent-500)" }}>/</span>Admin &middot; {profile?.name || "Admin"}
            </div>
            <div style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: 24,
              marginTop: 2,
            }}>Today</div>
          </div>
          <BellIcon />
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", borderTop: "1px solid var(--color-neutral-700)" }}>
          <div style={{ flex: 1, padding: "12px 14px", borderRight: "1px solid var(--color-neutral-700)" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22 }}>{todayBookings.length}</div>
            <div style={{ fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--color-neutral-400)" }}>Booked</div>
          </div>
          <div style={{ flex: 1, padding: "12px 14px", borderRight: "1px solid var(--color-neutral-700)" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, color: "var(--color-accent-500)" }}>{pendingBookings.length}</div>
            <div style={{ fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--color-neutral-400)" }}>Pending</div>
          </div>
          <div style={{ flex: 1, padding: "12px 14px" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22 }}>&#8377;{totalExpected}</div>
            <div style={{ fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--color-neutral-400)" }}>Expected</div>
          </div>
        </div>
      </div>

      {/* Needs a decision */}
      {firstPending && (
        <>
          <div style={{ padding: "14px 16px 10px" }}>
            <div className="kick" style={{ color: "var(--color-accent-700)" }}>Needs a decision</div>
          </div>
          <div style={{ margin: "0 16px 14px", border: "2px solid var(--color-text)", padding: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16 }}>
                {firstPending.time} &middot; {firstPending.customerName}
              </div>
              <StatusTag variant="pending">Pending</StatusTag>
            </div>
            <div className="text-muted" style={{ fontSize: 12, marginTop: 2 }}>
              {firstPending.serviceName} &middot; {firstPending.duration} &middot; &#8377;{firstPending.price}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button
                className="btn btn-primary"
                style={{ flex: 1, padding: 12, justifyContent: "center" }}
                onClick={() => handleAccept(firstPending.id)}
              >
                Accept
              </button>
              <button
                className="btn btn-secondary"
                style={{ flex: 1, padding: 12, justifyContent: "center" }}
                onClick={() => handleReject(firstPending.id)}
              >
                Reject
              </button>
            </div>
          </div>
        </>
      )}

      {/* Schedule */}
      <div style={{ padding: "12px 16px 8px", borderTop: "2px solid var(--color-text)" }}>
        <div className="kick text-muted">All bookings</div>
      </div>
      <div style={{ flex: 1, overflow: "auto" }}>
        {loading && (
          <div className="text-muted" style={{ padding: 16, fontSize: 14 }}>Loading...</div>
        )}
        {todayBookings.map((booking) => (
          <Link
            key={booking.id}
            href={`/admin/booking/${booking.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="row" style={{ justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: 12 }}>
                <span style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: 15,
                  width: 44,
                }}>{booking.time}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{booking.customerName}</div>
                  <div className="text-muted" style={{ fontSize: 12 }}>
                    {booking.serviceName} &middot; {booking.duration}
                  </div>
                </div>
              </div>
              <StatusTag variant={
                booking.status === "completed" ? "done" : booking.status
              }>
                {booking.status === "completed" ? "Done" :
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

export default function AdminDashboardPage() {
  return (
    <AuthGuard requiredRole="admin">
      <DashboardContent />
    </AuthGuard>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import StatusBar from "../../components/StatusBar";
import StatusTag from "../../components/StatusTag";
import { CheckLargeIcon } from "../../components/icons";
import { AuthGuard } from "@/lib/auth-guard";
import { getBooking } from "@/lib/firestore";
import type { Booking } from "@/lib/types";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id");
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (bookingId) {
      getBooking(bookingId).then(setBooking);
    }
  }, [bookingId]);

  return (
    <div className="screen">
      <StatusBar />

      <div style={{ padding: "80px 24px 0" }}>
        <div style={{
          width: 64,
          height: 64,
          background: "var(--color-accent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <CheckLargeIcon />
        </div>
        <h2 style={{ fontSize: 32, margin: "22px 0 8px" }}>Request sent.</h2>
        <p className="text-muted" style={{ fontSize: 14 }}>
          Klipp confirms by text within 30 minutes. You&apos;ll see the status change in My Bookings.
        </p>
      </div>

      {/* Reference details */}
      {booking && (
        <div style={{
          margin: "26px 0 0",
          borderTop: "2px solid var(--color-text)",
          borderBottom: "2px solid var(--color-text)",
        }}>
          <div className="row" style={{ justifyContent: "space-between" }}>
            <span className="text-muted" style={{ fontSize: 13 }}>Reference</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>{booking.ref}</span>
          </div>
          <div className="row" style={{ justifyContent: "space-between" }}>
            <span className="text-muted" style={{ fontSize: 13 }}>Service</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>{booking.serviceName} &middot; {booking.duration}</span>
          </div>
          <div className="row" style={{ justifyContent: "space-between" }}>
            <span className="text-muted" style={{ fontSize: 13 }}>When</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>{booking.date} &middot; {booking.time}</span>
          </div>
          <div className="row" style={{ justifyContent: "space-between", borderBottom: 0 }}>
            <span className="text-muted" style={{ fontSize: 13 }}>Status</span>
            <StatusTag variant="pending">Pending</StatusTag>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div style={{
        marginTop: "auto",
        padding: "16px 16px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}>
        <Link href="/bookings" style={{ textDecoration: "none" }}>
          <button className="btn btn-primary btn-block" style={{ padding: 17, fontSize: 15, margin: 0 }}>
            View my bookings
          </button>
        </Link>
        <Link href="/home" style={{ textDecoration: "none" }}>
          <button className="btn btn-secondary btn-block" style={{ padding: 17, fontSize: 15, margin: 0 }}>
            Back to services
          </button>
        </Link>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <AuthGuard>
      <Suspense>
        <SuccessContent />
      </Suspense>
    </AuthGuard>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import StatusBar from "../../components/StatusBar";
import AdminBottomNav from "../../components/AdminBottomNav";
import StatusTag from "../../components/StatusTag";
import { SearchIcon } from "../../components/icons";
import { todaySchedule } from "../../data";

const filters = ["Today", "Upcoming", "Completed", "Cancelled"] as const;

export default function AdminBookingsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("Today");

  return (
    <div className="screen">
      {/* Dark header */}
      <div style={{ background: "var(--color-neutral-900)", color: "var(--color-bg)", flexShrink: 0 }}>
        <StatusBar />
        <div style={{ padding: "4px 16px 14px" }}>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 24 }}>
            Bookings
          </div>
        </div>
        <div className="hide-scrollbar" style={{ display: "flex", gap: 8, padding: "0 16px 14px", overflowX: "auto" }}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="tg"
              style={{
                padding: "7px 11px",
                border: activeFilter === f ? "none" : "1px solid var(--color-neutral-600)",
                background: activeFilter === f ? "var(--color-accent)" : "transparent",
                color: activeFilter === f ? "var(--color-bg)" : "var(--color-bg)",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Search bar */}
      <div style={{
        padding: "12px 16px",
        borderBottom: "2px solid var(--color-text)",
        display: "flex",
        gap: 10,
        alignItems: "center",
      }}>
        <SearchIcon />
        <span className="text-muted" style={{ fontSize: 14 }}>Search name or phone</span>
      </div>

      {/* Day section */}
      <div style={{ flex: 1, overflow: "auto" }}>
        <div style={{ padding: "12px 16px 6px" }}>
          <div className="kick text-muted">Fri 29 Aug &middot; 5 appointments</div>
        </div>

        {todaySchedule.map((booking) => (
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
                  <div style={{
                    fontSize: 14,
                    fontWeight: 600,
                  }} className={booking.status === "cancelled" ? "text-muted" : ""}>
                    {booking.customer}
                  </div>
                  <div className="text-muted" style={{ fontSize: 12 }}>
                    {booking.service} &middot; ${booking.price}
                  </div>
                </div>
              </div>
              <StatusTag variant={booking.status === "completed" ? "completed" : booking.status}>
                {booking.status === "completed" ? "Completed" :
                 booking.status === "confirmed" ? "Confirmed" :
                 booking.status === "cancelled" ? "Cancelled" : "Pending"}
              </StatusTag>
            </div>
          </Link>
        ))}

        {/* Next day preview */}
        <div style={{ padding: "12px 16px 6px", borderTop: "2px solid var(--color-text)" }}>
          <div className="kick text-muted">Sat 30 Aug &middot; 8 appointments</div>
        </div>
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 12 }}>
            <span style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: 15,
              width: 44,
            }}>09:00</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Sam Okoro</div>
              <div className="text-muted" style={{ fontSize: 12 }}>Beard trim &middot; $18</div>
            </div>
          </div>
          <StatusTag variant="confirmed">Confirmed</StatusTag>
        </div>
      </div>

      <AdminBottomNav />
    </div>
  );
}

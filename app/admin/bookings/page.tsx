"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import StatusBar from "../../components/StatusBar";
import AdminBottomNav from "../../components/AdminBottomNav";
import StatusTag from "../../components/StatusTag";
import { SearchIcon } from "../../components/icons";
import { AuthGuard } from "@/lib/auth-guard";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Booking } from "@/lib/types";

const filters = ["All", "Pending", "Confirmed", "Completed", "Cancelled"] as const;

function AdminBookingsContent() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      const all = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Booking);
      setBookings(all);
      setLoading(false);
    };
    fetchAll();
  }, []);

  const filtered = bookings.filter((b) => {
    if (activeFilter !== "All" && b.status !== activeFilter.toLowerCase()) return false;
    if (search) {
      const s = search.toLowerCase();
      return b.customerName.toLowerCase().includes(s) || b.customerPhone.includes(s);
    }
    return true;
  });

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
                color: "var(--color-bg)",
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
        <input
          type="text"
          placeholder="Search name or phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            fontSize: 14,
            border: "none",
            outline: "none",
            background: "transparent",
            fontFamily: "var(--font-body)",
          }}
        />
      </div>

      {/* Bookings list */}
      <div style={{ flex: 1, overflow: "auto" }}>
        {loading && (
          <div className="text-muted" style={{ padding: 16, fontSize: 14 }}>Loading...</div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-muted" style={{ padding: 16, fontSize: 14 }}>No bookings found</div>
        )}

        {filtered.map((booking) => (
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
                    {booking.customerName}
                  </div>
                  <div className="text-muted" style={{ fontSize: 12 }}>
                    {booking.serviceName} &middot; &#8377;{booking.price}
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
      </div>

      <AdminBottomNav />
    </div>
  );
}

export default function AdminBookingsPage() {
  return (
    <AuthGuard requiredRole="admin">
      <AdminBookingsContent />
    </AuthGuard>
  );
}

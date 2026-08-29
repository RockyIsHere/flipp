"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import StatusBar from "../components/StatusBar";
import BottomNav from "../components/BottomNav";
import StatusTag from "../components/StatusTag";
import { ChevronRight } from "../components/icons";
import { AuthGuard } from "@/lib/auth-guard";
import { useAuth } from "@/lib/auth-context";
import { getVisibleServices, getBookingsForCustomer } from "@/lib/firestore";
import type { Service, Booking } from "@/lib/types";

const categories = ["All", "Hair", "Beard", "Skin"] as const;

function HomeContent() {
  const { user, profile } = useAuth();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [services, setServices] = useState<Service[]>([]);
  const [nextBooking, setNextBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVisibleServices().then((s) => {
      setServices(s);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (user) {
      getBookingsForCustomer(user.uid).then((bookings) => {
        const upcoming = bookings.find(
          (b) => b.status === "confirmed" || b.status === "pending"
        );
        setNextBooking(upcoming || null);
      });
    }
  }, [user]);

  const filteredServices = activeCategory === "All"
    ? services
    : services.filter(s => s.category === activeCategory.toLowerCase());

  const initials = profile?.name
    ? profile.name.split(" ").map(n => n[0]).join("").toUpperCase()
    : "?";

  return (
    <div className="screen">
      <StatusBar />

      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 16px 14px",
        borderBottom: "2px solid var(--color-text)",
      }}>
        <div>
          <div style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            fontSize: 22,
            letterSpacing: "-0.02em",
          }}>KLIPP</div>
          <div className="text-muted" style={{ fontSize: 11 }}>
            12 Bahnhofstrasse &middot; Open until 20:00
          </div>
        </div>
        <Link href="/profile" style={{
          width: 38,
          height: 38,
          border: "1px solid var(--color-text)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
          fontWeight: 700,
          textDecoration: "none",
          color: "inherit",
        }}>
          {initials}
        </Link>
      </div>

      {/* Next Up */}
      {nextBooking && (
        <div style={{ padding: "18px 16px 14px", borderBottom: "1px solid var(--color-divider)" }}>
          <div className="kick text-muted">Next up</div>
          <div style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginTop: 6,
          }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17 }}>
              {nextBooking.serviceName} &middot; {nextBooking.date}, {nextBooking.time}
            </div>
            <StatusTag variant={nextBooking.status}>
              {nextBooking.status === "confirmed" ? "Confirmed" : "Pending"}
            </StatusTag>
          </div>
        </div>
      )}

      {/* Category filters */}
      <div style={{ display: "flex", gap: 8, padding: "14px 16px 12px" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="tg"
            style={{
              border: activeCategory === cat
                ? "1px solid var(--color-text)"
                : "1px solid var(--color-divider)",
              background: activeCategory === cat ? "var(--color-text)" : "transparent",
              color: activeCategory === cat ? "var(--color-bg)" : undefined,
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services list */}
      <div style={{ borderTop: "2px solid var(--color-text)", flex: 1, overflow: "auto" }}>
        {loading ? (
          <div className="text-muted" style={{ padding: 16, fontSize: 14 }}>Loading services...</div>
        ) : filteredServices.map((service) => (
          <Link
            key={service.id}
            href={`/service/${service.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="row" style={{ justifyContent: "space-between", padding: "17px 16px" }}>
              <div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17 }}>
                  {service.name}
                </div>
                <div className="text-muted" style={{ fontSize: 12 }}>
                  {service.duration} &middot; {service.description}
                </div>
              </div>
              <div style={{ textAlign: "right", display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ fontWeight: 600, fontSize: 16 }}>&#8377;{service.price}</div>
                <ChevronRight />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}

export default function HomePage() {
  return (
    <AuthGuard>
      <HomeContent />
    </AuthGuard>
  );
}

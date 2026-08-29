"use client";

import { useState } from "react";
import Link from "next/link";
import StatusBar from "../components/StatusBar";
import BottomNav from "../components/BottomNav";
import StatusTag from "../components/StatusTag";
import { ChevronRight } from "../components/icons";
import { services } from "../data";

const categories = ["All", "Hair", "Beard", "Skin"] as const;

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredServices = activeCategory === "All"
    ? services.filter(s => s.id !== "kids-cut")
    : services.filter(s => s.category === activeCategory.toLowerCase() && s.id !== "kids-cut");

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
          AR
        </Link>
      </div>

      {/* Next Up */}
      <div style={{ padding: "18px 16px 14px", borderBottom: "1px solid var(--color-divider)" }}>
        <div className="kick text-muted">Next up</div>
        <div style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginTop: 6,
        }}>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17 }}>
            Haircut &middot; Fri 29 Aug, 15:30
          </div>
          <StatusTag variant="confirmed">Confirmed</StatusTag>
        </div>
      </div>

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
        {filteredServices.map((service) => (
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
                <div style={{ fontWeight: 600, fontSize: 16 }}>${service.price}</div>
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

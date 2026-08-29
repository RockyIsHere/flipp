"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import StatusBar from "../../../../components/StatusBar";
import { CloseIcon } from "../../../../components/icons";
import { services } from "../../../../data";

const categories = ["Hair", "Beard", "Skin"] as const;

export default function EditServicePage() {
  const params = useParams();
  const id = params.id as string;
  const service = services.find((s) => s.id === id) ?? services[2]; // default to hot towel shave
  const [activeCategory, setActiveCategory] = useState(
    service.category.charAt(0).toUpperCase() + service.category.slice(1)
  );
  const [bookable, setBookable] = useState(service.id !== "kids-cut");

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
          <Link href="/admin/services" style={{ color: "inherit", display: "flex" }}>
            <CloseIcon />
          </Link>
          <span className="kick" style={{ color: "var(--color-neutral-400)" }}>Edit service</span>
        </div>
      </div>

      {/* Form */}
      <div style={{ padding: "20px 16px 0", flex: 1, overflow: "auto" }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 5 }}>Service name</div>
          <div style={{
            border: "1px solid var(--color-text)",
            background: "#fff",
            padding: "14px 12px",
            fontSize: 15,
          }}>{service.name}</div>
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 5 }}>Price</div>
            <div style={{
              border: "1px solid var(--color-text)",
              background: "#fff",
              padding: "14px 12px",
              fontSize: 15,
            }}>${service.price}</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 5 }}>Duration</div>
            <div style={{
              border: "1px solid var(--color-text)",
              background: "#fff",
              padding: "14px 12px",
              fontSize: 15,
            }}>{service.duration}</div>
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 5 }}>Category</div>
          <div style={{ display: "flex", border: "1px solid var(--color-divider)" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "11px 0",
                  fontSize: 13,
                  fontWeight: 600,
                  background: activeCategory === cat ? "var(--color-text)" : "transparent",
                  color: activeCategory === cat ? "var(--color-bg)" : undefined,
                  border: "none",
                  cursor: "pointer",
                }}
                className={activeCategory !== cat ? "text-muted" : ""}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 5 }}>
            Description <span className="text-muted">(optional)</span>
          </div>
          <div style={{
            border: "1px solid var(--color-divider)",
            background: "#fff",
            padding: "14px 12px",
            fontSize: 14,
            height: 76,
          }} className="text-muted">
            {service.longDescription || service.description}
          </div>
        </div>
      </div>

      {/* Bookable toggle */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "18px 0 0",
        padding: "14px 16px",
        borderTop: "2px solid var(--color-text)",
        borderBottom: "2px solid var(--color-text)",
      }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Bookable by customers</div>
          <div className="text-muted" style={{ fontSize: 12 }}>Hide to keep it off the menu</div>
        </div>
        <button
          onClick={() => setBookable(!bookable)}
          style={{
            width: 46,
            height: 26,
            background: bookable ? "var(--color-accent)" : "var(--color-neutral-300)",
            display: "flex",
            justifyContent: bookable ? "flex-end" : "flex-start",
            padding: 3,
            border: "none",
            cursor: "pointer",
            transition: "background 0.2s ease",
          }}
        >
          <div style={{ width: 20, height: 20, background: "var(--color-bg)" }} />
        </button>
      </div>

      {/* Action buttons */}
      <div style={{
        marginTop: "auto",
        padding: "16px 16px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}>
        <Link href="/admin/services" style={{ textDecoration: "none" }}>
          <button className="btn btn-primary btn-block" style={{ padding: 17, fontSize: 15, margin: 0 }}>
            Save service
          </button>
        </Link>
        <button className="btn btn-secondary btn-block" style={{
          padding: 15,
          margin: 0,
          color: "var(--color-accent-700)",
          borderColor: "var(--color-accent-700)",
        }}>
          Remove service
        </button>
      </div>
    </div>
  );
}

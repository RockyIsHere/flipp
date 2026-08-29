"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import StatusBar from "../../components/StatusBar";
import { ChevronLeft } from "../../components/icons";
import { services } from "../../data";
import { Suspense } from "react";

function ConfirmContent() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("service") || "haircut";
  const time = searchParams.get("time") || "15:30";
  const service = services.find((s) => s.id === serviceId) ?? services[0];

  return (
    <div className="screen">
      <StatusBar />

      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 16px 14px",
        borderBottom: "2px solid var(--color-text)",
      }}>
        <Link href={`/book/date?service=${serviceId}`} style={{ color: "inherit", display: "flex" }}>
          <ChevronLeft />
        </Link>
        <span className="kick">Step 2 of 2 &middot; Confirm</span>
      </div>

      {/* Appointment summary */}
      <div style={{
        padding: "20px 16px 16px",
        borderBottom: "2px solid var(--color-text)",
        background: "var(--color-surface)",
      }}>
        <div className="kick text-muted">Your appointment</div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
          <span style={{ fontSize: 14 }}>Service</span>
          <span style={{ fontSize: 14, fontWeight: 600 }}>{service.name} &middot; {service.duration}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
          <span style={{ fontSize: 14 }}>Date</span>
          <span style={{ fontSize: 14, fontWeight: 600 }}>Fri 29 Aug 2026</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
          <span style={{ fontSize: 14 }}>Time</span>
          <span style={{ fontSize: 14, fontWeight: 600 }}>{time}</span>
        </div>
        <hr className="hr" style={{ margin: "12px 0" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>Total</span>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22 }}>
            ${service.price}
          </span>
        </div>
      </div>

      {/* Form fields */}
      <div style={{ padding: "18px 16px", flex: 1, overflow: "auto" }}>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 5 }}>Full name</div>
          <div style={{
            border: "1px solid var(--color-text)",
            background: "#fff",
            padding: "14px 12px",
            fontSize: 15,
          }}>Ana Reyes</div>
        </div>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 5 }}>Phone</div>
          <div style={{
            border: "1px solid var(--color-text)",
            background: "#fff",
            padding: "14px 12px",
            fontSize: 15,
          }}>+1 (555) 018 4402</div>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 5 }}>
            Note for the stylist <span className="text-muted">(optional)</span>
          </div>
          <div style={{
            border: "1px solid var(--color-divider)",
            background: "#fff",
            padding: "14px 12px",
            fontSize: 14,
            height: 74,
          }} className="text-muted">
            Keep the length on top.
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: "auto",
        padding: "14px 16px 20px",
        borderTop: "2px solid var(--color-text)",
      }}>
        <p className="text-muted" style={{ fontSize: 11, margin: "0 0 10px" }}>
          Free cancellation up to 4 hours before. The salon confirms within 30 minutes.
        </p>
        <Link href="/book/success" style={{ textDecoration: "none" }}>
          <button className="btn btn-primary btn-block" style={{ padding: 17, fontSize: 15, margin: 0 }}>
            Confirm booking
          </button>
        </Link>
      </div>
    </div>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense>
      <ConfirmContent />
    </Suspense>
  );
}

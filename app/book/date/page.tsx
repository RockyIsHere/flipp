"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import StatusBar from "../../components/StatusBar";
import { ChevronLeft } from "../../components/icons";
import { AuthGuard } from "@/lib/auth-guard";
import { getService } from "@/lib/firestore";
import type { Service } from "@/lib/types";
import { Suspense } from "react";

const dates = [
  { day: "THU", num: "28" },
  { day: "FRI", num: "29" },
  { day: "SAT", num: "30" },
  { day: "SUN", num: "31" },
  { day: "MON", num: "01" },
  { day: "TUE", num: "02" },
];

const morningSlots = [
  { time: "09:00", available: false },
  { time: "09:45", available: true },
  { time: "10:30", available: true },
  { time: "11:15", available: false },
  { time: "12:00", available: true },
];

const afternoonSlots = [
  { time: "13:30", available: true },
  { time: "14:15", available: true },
  { time: "15:30", available: true },
  { time: "16:15", available: true },
  { time: "17:00", available: false },
  { time: "18:30", available: true },
];

function DatePickerContent() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("service") || "haircut";
  const [service, setService] = useState<Service | null>(null);

  const [selectedDate, setSelectedDate] = useState("29");
  const [selectedTime, setSelectedTime] = useState("15:30");

  useEffect(() => {
    getService(serviceId).then(setService);
  }, [serviceId]);

  const serviceName = service?.name || "Service";
  const serviceDuration = service?.duration || "";

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
        <Link href={`/service/${serviceId}`} style={{ color: "inherit", display: "flex" }}>
          <ChevronLeft />
        </Link>
        <span className="kick">Step 1 of 2 &middot; {serviceName}, {serviceDuration}</span>
      </div>

      {/* Month header */}
      <div style={{ padding: "18px 16px 12px" }}>
        <h4 style={{ margin: 0 }}>August 2026</h4>
      </div>

      {/* Date chips */}
      <div className="hide-scrollbar" style={{
        display: "flex",
        gap: 8,
        padding: "0 16px 16px",
        overflowX: "auto",
      }}>
        {dates.map((d) => (
          <button
            key={d.num}
            onClick={() => setSelectedDate(d.num)}
            style={{
              flex: "none",
              width: 46,
              textAlign: "center",
              padding: "9px 0",
              border: selectedDate === d.num ? "none" : "1px solid var(--color-divider)",
              background: selectedDate === d.num ? "var(--color-accent)" : "transparent",
              color: selectedDate === d.num ? "var(--color-bg)" : undefined,
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".06em" }}
              className={selectedDate !== d.num ? "text-muted" : ""}>
              {d.day}
            </div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18 }}>
              {d.num}
            </div>
          </button>
        ))}
      </div>

      {/* Morning slots */}
      <div style={{ padding: "14px 16px 6px", borderTop: "2px solid var(--color-text)" }}>
        <div className="kick text-muted">Morning</div>
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 8,
        padding: "6px 16px 16px",
      }}>
        {morningSlots.map((slot) => (
          <button
            key={slot.time}
            onClick={() => slot.available && setSelectedTime(slot.time)}
            disabled={!slot.available}
            style={{
              padding: "14px 0",
              textAlign: "center",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "var(--font-body)",
              border: selectedTime === slot.time
                ? "1px solid var(--color-accent)"
                : slot.available
                  ? "1px solid var(--color-text)"
                  : "1px solid var(--color-divider)",
              background: selectedTime === slot.time ? "var(--color-accent)" : "transparent",
              color: selectedTime === slot.time ? "var(--color-bg)" : undefined,
              textDecoration: !slot.available ? "line-through" : undefined,
              opacity: !slot.available ? 0.4 : 1,
              cursor: slot.available ? "pointer" : "not-allowed",
            }}
          >
            {slot.time}
          </button>
        ))}
      </div>

      {/* Afternoon slots */}
      <div style={{ padding: "14px 16px 6px", borderTop: "1px solid var(--color-divider)" }}>
        <div className="kick text-muted">Afternoon</div>
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 8,
        padding: "6px 16px 16px",
      }}>
        {afternoonSlots.map((slot) => (
          <button
            key={slot.time}
            onClick={() => slot.available && setSelectedTime(slot.time)}
            disabled={!slot.available}
            style={{
              padding: "14px 0",
              textAlign: "center",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "var(--font-body)",
              border: selectedTime === slot.time
                ? "1px solid var(--color-accent)"
                : slot.available
                  ? "1px solid var(--color-text)"
                  : "1px solid var(--color-divider)",
              background: selectedTime === slot.time ? "var(--color-accent)" : "transparent",
              color: selectedTime === slot.time ? "var(--color-bg)" : undefined,
              textDecoration: !slot.available ? "line-through" : undefined,
              opacity: !slot.available ? 0.4 : 1,
              cursor: slot.available ? "pointer" : "not-allowed",
            }}
          >
            {slot.time}
          </button>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        marginTop: "auto",
        padding: "14px 16px 20px",
        borderTop: "2px solid var(--color-text)",
      }}>
        <div className="text-muted" style={{ fontSize: 12, marginBottom: 8 }}>
          Fri 29 Aug &middot; {selectedTime}&ndash;16:15
        </div>
        <Link
          href={`/book/confirm?service=${serviceId}&date=29&time=${selectedTime}`}
          style={{ textDecoration: "none" }}
        >
          <button className="btn btn-primary btn-block" style={{ padding: 17, fontSize: 15, margin: 0 }}>
            Continue
          </button>
        </Link>
      </div>
    </div>
  );
}

export default function DatePickerPage() {
  return (
    <AuthGuard>
      <Suspense>
        <DatePickerContent />
      </Suspense>
    </AuthGuard>
  );
}

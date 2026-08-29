"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import StatusBar from "../../components/StatusBar";
import { ChevronLeft } from "../../components/icons";
import { AuthGuard } from "@/lib/auth-guard";
import { useAuth } from "@/lib/auth-context";
import { getService, createBooking } from "@/lib/firestore";
import type { Service } from "@/lib/types";
import { Suspense } from "react";

function ConfirmContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, profile } = useAuth();
  const serviceId = searchParams.get("service") || "haircut";
  const time = searchParams.get("time") || "15:30";
  const [service, setService] = useState<Service | null>(null);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getService(serviceId).then(setService);
  }, [serviceId]);

  const handleConfirm = async () => {
    if (!user || !profile || !service) return;
    setBusy(true);
    try {
      const bookingId = await createBooking({
        serviceId: service.id,
        serviceName: service.name,
        customerId: user.uid,
        customerName: profile.name,
        customerPhone: profile.phone,
        date: "Fri 29 Aug",
        time,
        duration: service.duration,
        price: service.price,
        status: "pending",
        note: note || undefined,
      });
      router.push(`/book/success?id=${bookingId}`);
    } catch {
      setBusy(false);
    }
  };

  if (!service) {
    return (
      <div className="screen">
        <StatusBar />
        <div className="text-muted" style={{ padding: 16, fontSize: 14 }}>Loading...</div>
      </div>
    );
  }

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
            &#8377;{service.price}
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
          }}>{profile?.name || "—"}</div>
        </div>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 5 }}>Phone</div>
          <div style={{
            border: "1px solid var(--color-text)",
            background: "#fff",
            padding: "14px 12px",
            fontSize: 15,
          }}>{profile?.phone || "—"}</div>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 5 }}>
            Note for the stylist <span className="text-muted">(optional)</span>
          </div>
          <textarea
            placeholder="Any preferences or requests..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{
              width: "100%",
              border: "1px solid var(--color-divider)",
              background: "#fff",
              padding: "14px 12px",
              fontSize: 14,
              height: 74,
              resize: "none",
              outline: "none",
              fontFamily: "var(--font-body)",
            }}
          />
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
        <button
          className="btn btn-primary btn-block"
          style={{ padding: 17, fontSize: 15, margin: 0 }}
          onClick={handleConfirm}
          disabled={busy}
        >
          {busy ? "Booking..." : "Confirm booking"}
        </button>
      </div>
    </div>
  );
}

export default function ConfirmPage() {
  return (
    <AuthGuard>
      <Suspense>
        <ConfirmContent />
      </Suspense>
    </AuthGuard>
  );
}

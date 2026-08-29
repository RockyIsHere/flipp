import Link from "next/link";
import StatusBar from "../../components/StatusBar";
import { ChevronLeft, CheckIcon } from "../../components/icons";
import { services } from "../../data";

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = services.find((s) => s.id === id) ?? services[0];

  return (
    <div className="screen">
      <StatusBar />

      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 16px 14px",
        borderBottom: "2px solid var(--color-text)",
      }}>
        <Link href="/home" style={{ color: "inherit", display: "flex" }}>
          <ChevronLeft />
        </Link>
        <span className="kick">Service</span>
      </div>

      {/* Service info */}
      <div style={{ padding: "22px 16px 18px", borderBottom: "1px solid var(--color-divider)" }}>
        <h2 style={{ fontSize: 34, marginBottom: 8 }}>{service.name}</h2>
        <p className="text-muted" style={{ fontSize: 14, margin: 0 }}>
          {service.longDescription || service.description}
        </p>
      </div>

      {/* Price & Duration */}
      <div style={{ display: "flex", borderBottom: "2px solid var(--color-text)" }}>
        <div style={{ flex: 1, padding: 16, borderRight: "1px solid var(--color-divider)" }}>
          <div className="kick text-muted">Price</div>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 24, marginTop: 4 }}>
            ${service.price}
          </div>
        </div>
        <div style={{ flex: 1, padding: 16 }}>
          <div className="kick text-muted">Duration</div>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 24, marginTop: 4 }}>
            {service.duration}
          </div>
        </div>
      </div>

      {/* Included */}
      {service.included && (
        <div style={{ padding: "18px 16px" }}>
          <div className="kick text-muted">Included</div>
          <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 9, fontSize: 14 }}>
            {service.included.map((item) => (
              <div key={item} style={{ display: "flex", gap: 9 }}>
                <CheckIcon />
                {item}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{
        marginTop: "auto",
        padding: "14px 16px 20px",
        borderTop: "2px solid var(--color-text)",
        display: "flex",
        alignItems: "center",
        gap: 14,
      }}>
        <div>
          <div className="kick text-muted">Total</div>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22 }}>
            ${service.price}
          </div>
        </div>
        <Link href={`/book/date?service=${service.id}`} style={{ flex: 1, textDecoration: "none" }}>
          <button className="btn btn-primary" style={{ width: "100%", padding: 17, fontSize: 15, justifyContent: "flex-start" }}>
            Book now
          </button>
        </Link>
      </div>
    </div>
  );
}

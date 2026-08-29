import Link from "next/link";
import StatusBar from "../../components/StatusBar";
import AdminBottomNav from "../../components/AdminBottomNav";
import { EditIcon, TrashIcon } from "../../components/icons";
import { services } from "../../data";

export default function AdminServicesPage() {
  return (
    <div className="screen">
      {/* Dark header */}
      <div style={{ background: "var(--color-neutral-900)", color: "var(--color-bg)", flexShrink: 0 }}>
        <StatusBar />
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          padding: "4px 16px 14px",
        }}>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 24 }}>
            Services
          </div>
          <div className="kick" style={{ color: "var(--color-neutral-400)" }}>
            {services.filter(s => s.id !== "kids-cut").length} active
          </div>
        </div>
      </div>

      <div style={{ borderBottom: "2px solid var(--color-text)" }} />

      {/* Services list */}
      <div style={{ flex: 1, overflow: "auto" }}>
        {services.map((service) => (
          <div
            key={service.id}
            className="row"
            style={{
              justifyContent: "space-between",
              borderBottom: service.id === "kids-cut"
                ? "2px solid var(--color-text)"
                : undefined,
            }}
          >
            <div>
              <div style={{
                fontSize: 15,
                fontWeight: 600,
              }} className={service.id === "kids-cut" ? "text-muted" : ""}>
                {service.name}
              </div>
              <div className="text-muted" style={{ fontSize: 12 }}>
                ${service.price} &middot; {service.duration}
                {service.id === "kids-cut" && " · hidden"}
              </div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <Link
                href={`/admin/services/${service.id}/edit`}
                className="btn btn-secondary btn-icon"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <EditIcon />
              </Link>
              <span className="btn btn-secondary btn-icon" style={{ color: "var(--color-accent-700)" }}>
                <TrashIcon />
              </span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: 16 }}>
        <button className="btn btn-primary btn-block" style={{ padding: 16, fontSize: 15, margin: 0 }}>
          + &nbsp;Add service
        </button>
      </div>

      <AdminBottomNav />
    </div>
  );
}

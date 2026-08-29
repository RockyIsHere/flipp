import Link from "next/link";
import StatusBar from "../../components/StatusBar";
import StatusTag from "../../components/StatusTag";
import { CheckLargeIcon } from "../../components/icons";

export default function BookingSuccessPage() {
  return (
    <div className="screen">
      <StatusBar />

      <div style={{ padding: "80px 24px 0" }}>
        <div style={{
          width: 64,
          height: 64,
          background: "var(--color-accent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <CheckLargeIcon />
        </div>
        <h2 style={{ fontSize: 32, margin: "22px 0 8px" }}>Request sent.</h2>
        <p className="text-muted" style={{ fontSize: 14 }}>
          Klipp confirms by text within 30 minutes. You&apos;ll see the status change in My Bookings.
        </p>
      </div>

      {/* Reference details */}
      <div style={{
        margin: "26px 0 0",
        borderTop: "2px solid var(--color-text)",
        borderBottom: "2px solid var(--color-text)",
      }}>
        <div className="row" style={{ justifyContent: "space-between" }}>
          <span className="text-muted" style={{ fontSize: 13 }}>Reference</span>
          <span style={{ fontSize: 13, fontWeight: 600 }}>KL-2481</span>
        </div>
        <div className="row" style={{ justifyContent: "space-between" }}>
          <span className="text-muted" style={{ fontSize: 13 }}>Service</span>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Haircut &middot; 45 min</span>
        </div>
        <div className="row" style={{ justifyContent: "space-between" }}>
          <span className="text-muted" style={{ fontSize: 13 }}>When</span>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Fri 29 Aug &middot; 15:30</span>
        </div>
        <div className="row" style={{ justifyContent: "space-between", borderBottom: 0 }}>
          <span className="text-muted" style={{ fontSize: 13 }}>Status</span>
          <StatusTag variant="pending">Pending</StatusTag>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{
        marginTop: "auto",
        padding: "16px 16px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}>
        <Link href="/bookings" style={{ textDecoration: "none" }}>
          <button className="btn btn-primary btn-block" style={{ padding: 17, fontSize: 15, margin: 0 }}>
            View my bookings
          </button>
        </Link>
        <Link href="/home" style={{ textDecoration: "none" }}>
          <button className="btn btn-secondary btn-block" style={{ padding: 17, fontSize: 15, margin: 0 }}>
            Back to services
          </button>
        </Link>
      </div>
    </div>
  );
}

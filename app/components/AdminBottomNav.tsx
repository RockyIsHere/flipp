"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardIcon, CalendarIcon, ServicesIcon } from "./icons";

const tabs = [
  { href: "/admin/dashboard", label: "Dashboard", icon: DashboardIcon },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarIcon },
  { href: "/admin/services", label: "Services", icon: ServicesIcon },
];

export default function AdminBottomNav() {
  const pathname = usePathname();

  return (
    <div className="bar" style={{
      background: "var(--color-neutral-900)",
      color: "var(--color-bg)",
      borderTopColor: "var(--color-neutral-900)",
    }}>
      {tabs.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className="tab"
            style={{
              color: active ? "var(--color-accent-500)" : undefined,
              boxShadow: active ? "inset 0 3px 0 var(--color-accent-500)" : undefined,
            }}
          >
            <Icon />
            {label}
          </Link>
        );
      })}
    </div>
  );
}

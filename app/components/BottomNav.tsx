"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, CalendarIcon, ProfileIcon } from "./icons";

const tabs = [
  { href: "/home", label: "Home", icon: HomeIcon },
  { href: "/bookings", label: "Bookings", icon: CalendarIcon },
  { href: "/profile", label: "Profile", icon: ProfileIcon },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="bar">
      {tabs.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className="tab"
            style={{
              color: active ? "var(--color-accent)" : undefined,
              boxShadow: active ? "inset 0 3px 0 var(--color-accent)" : undefined,
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

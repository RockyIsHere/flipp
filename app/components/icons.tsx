export function SignalIcon() {
  return (
    <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor">
      <rect x="0" y="7" width="2.5" height="4" />
      <rect x="4" y="5" width="2.5" height="6" />
      <rect x="8" y="2.5" width="2.5" height="8.5" />
      <rect x="12" y="0" width="2.5" height="11" />
    </svg>
  );
}

export function WifiIcon() {
  return (
    <svg width="14" height="11" viewBox="0 0 24 20" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M2 6a15 15 0 0 1 20 0M6 11a9 9 0 0 1 12 0" />
      <circle cx="12" cy="16.5" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function BatteryIcon() {
  return (
    <svg width="22" height="11" viewBox="0 0 26 12" fill="none">
      <rect x="0.75" y="0.75" width="21" height="10.5" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" />
      <rect x="2.5" y="2.5" width="15" height="7" fill="currentColor" />
      <path d="M23.5 4v4" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
    </svg>
  );
}

export function HomeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 10.5 12 3l9 7.5V21H3z" />
    </svg>
  );
}

export function CalendarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="18" height="16" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

export function ProfileIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
    </svg>
  );
}

export function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.5 }}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export function ChevronLeft() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m15 6-6 6 6 6" />
    </svg>
  );
}

export function CheckIcon({ color = "var(--color-accent)", size = 18 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 2 }}>
      <path d="m4 12 5 5L20 6" />
    </svg>
  );
}

export function CheckLargeIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--color-bg)" strokeWidth="2.5">
      <path d="m4 12 5 5L20 6" />
    </svg>
  );
}

export function DashboardIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z" />
    </svg>
  );
}

export function ServicesIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M8.5 7.5 20 19M20 5 8.5 16.5" />
    </svg>
  );
}

export function BellIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8" />
      <path d="M10.3 21a1.9 1.9 0 0 0 3.4 0" />
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.5 }}>
      <circle cx="11" cy="11" r="7" />
      <path d="m16.5 16.5 4 4" />
    </svg>
  );
}

export function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2">
      <path d="M4 5c0 8 7 15 15 15l2-3-4-2-2 2c-3-1.5-5.5-4-7-7l2-2-2-4z" />
    </svg>
  );
}

export function EditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 20h4L20 8l-4-4L4 16z" />
    </svg>
  );
}

export function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

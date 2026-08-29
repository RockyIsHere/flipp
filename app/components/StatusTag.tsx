type TagVariant = "confirmed" | "pending" | "completed" | "cancelled" | "now" | "done";

const variants: Record<TagVariant, React.CSSProperties> = {
  confirmed: {
    background: "var(--color-accent)",
    color: "var(--color-bg)",
  },
  pending: {
    border: "1px solid var(--color-accent)",
    color: "var(--color-accent-700)",
  },
  completed: {
    background: "var(--color-neutral-300)",
  },
  cancelled: {
    border: "1px solid var(--color-neutral-500)",
    color: "color-mix(in srgb, var(--color-text) 55%, transparent)",
  },
  now: {
    background: "var(--color-accent)",
    color: "var(--color-bg)",
  },
  done: {
    background: "var(--color-neutral-300)",
  },
};

export default function StatusTag({ variant, children }: { variant: TagVariant; children: React.ReactNode }) {
  return (
    <span className="tg" style={variants[variant]}>
      {children}
    </span>
  );
}

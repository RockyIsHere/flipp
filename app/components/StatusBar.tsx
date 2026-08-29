import { SignalIcon, WifiIcon, BatteryIcon } from "./icons";

export default function StatusBar() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 16px 6px",
      fontSize: "11px",
      fontWeight: 600,
      letterSpacing: "0.04em",
      flexShrink: 0,
    }}>
      <span>9:41</span>
      <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon />
      </span>
    </div>
  );
}

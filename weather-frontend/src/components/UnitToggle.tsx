interface UnitToggleProps {
  unit: "metric" | "imperial";
  setUnit: (unit: "metric" | "imperial") => void;
  isMobile: boolean;
}

export default function UnitToggle({ unit, setUnit, isMobile }: UnitToggleProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <span style={{ color: "#4b5563", fontSize: isMobile ? "12px" : "14px", fontWeight: "500" }}>°C</span>
      <input
        type="checkbox"
        checked={unit === "imperial"}
        onChange={() => setUnit(unit === "metric" ? "imperial" : "metric")}
        style={{
          height: isMobile ? "20px" : "24px",
          width: isMobile ? "40px" : "48px",
          borderRadius: "999px",
          backgroundColor: unit === "metric" ? "#d1d5db" : "#3b82f6",
          position: "relative",
          appearance: "none",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = unit === "metric" ? "#9ca3af" : "#2563eb")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = unit === "metric" ? "#d1d5db" : "#3b82f6")}
      />
      <span style={{ color: "#4b5563", fontSize: isMobile ? "12px" : "14px", fontWeight: "500" }}>°F</span>
    </div>
  );
}
interface UnitToggleProps {
  unit: "metric" | "imperial";
  setUnit: (unit: "metric" | "imperial") => void;
  isMobile: boolean;
}

export default function UnitToggle({ unit, setUnit, isMobile }: UnitToggleProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        background: "rgba(255, 255, 255, 0.95)",
        borderRadius: "12px",
        padding: "8px 16px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        transition: "box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.15)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)")}
    >
      <span
        style={{
          color: unit === "metric" ? "#1a202c" : "#6b7280",
          fontSize: isMobile ? "14px" : "16px",
          fontWeight: unit === "metric" ? "600" : "500",
          cursor: "pointer",
          transition: "color 0.3s ease",
        }}
        onClick={() => setUnit("metric")}
      >
        °C
      </span>
      <label
        style={{
          position: "relative",
          display: "inline-block",
          width: isMobile ? "40px" : "48px",
          height: isMobile ? "20px" : "24px",
        }}
      >
        <input
          type="checkbox"
          checked={unit === "imperial"}
          onChange={() => setUnit(unit === "metric" ? "imperial" : "metric")}
          style={{
            opacity: 0,
            width: 0,
            height: 0,
          }}
        />
        <span
          style={{
            position: "absolute",
            cursor: "pointer",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: unit === "metric" ? "#d1d5db" : "#3b82f6",
            borderRadius: "999px",
            transition: "background-color 0.3s ease",
          }}
        >
          <span
            style={{
              position: "absolute",
              content: "",
              height: isMobile ? "16px" : "20px",
              width: isMobile ? "16px" : "20px",
              left: unit === "metric" ? "2px" : isMobile ? "22px" : "26px",
              bottom: "2px",
              backgroundColor: "#ffffff",
              borderRadius: "50%",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              transition: "left 0.3s ease",
            }}
          />
        </span>
      </label>
      <span
        style={{
          color: unit === "imperial" ? "#1a202c" : "#6b7280",
          fontSize: isMobile ? "14px" : "16px",
          fontWeight: unit === "imperial" ? "600" : "500",
          cursor: "pointer",
          transition: "color 0.3s ease",
        }}
        onClick={() => setUnit("imperial")}
      >
        °F
      </span>
    </div>
  );
}
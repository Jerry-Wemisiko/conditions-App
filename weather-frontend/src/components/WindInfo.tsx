interface WindInfoProps {
  windSpeed: number;
  unit: "metric" | "imperial";
  isMobile: boolean;
}

export default function WindInfo({ windSpeed, unit, isMobile }: WindInfoProps) {
  return (
    <div style={{ textAlign: "center" }}>
      <p
        style={{
          fontSize: isMobile ? "12px" : "14px",
          color: "#6b7280",
          fontWeight: "500",
          marginBottom: "8px",
        }}
      >
        Wind Status
      </p>
      <p
        style={{
          fontSize: isMobile ? "20px" : "24px",
          fontWeight: "600",
          color: "#1f2937",
        }}
      >
        {(windSpeed * 3.6).toFixed(1)} {unit === "metric" ? "km/h" : "mph"}
      </p>
    </div>
  );
}
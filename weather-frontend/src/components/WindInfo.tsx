interface WindInfoProps {
  windSpeed: number;
  unit: "metric" | "imperial";
  isMobile: boolean;
}

export default function WindInfo({ windSpeed, unit, isMobile }: WindInfoProps) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "8px" }}>
        <svg
          width={isMobile ? "16" : "20"}
          height={isMobile ? "16" : "20"}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#6b7280"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
        </svg>
        <p
          style={{
            fontSize: isMobile ? "14px" : "16px",
            color: "#6b7280",
            fontWeight: "500",
          }}
        >
          Wind Status
        </p>
      </div>
      <p
        style={{
          fontSize: isMobile ? "20px" : "24px",
          fontWeight: "600",
          color: "#1a202c",
        }}
      >
        {(windSpeed * 3.6).toFixed(1)} {unit === "metric" ? "km/h" : "mph"}
      </p>
    </div>
  );
}
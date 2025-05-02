interface HumidityInfoProps {
  humidity: number;
  isMobile: boolean;
}

export default function HumidityInfo({ humidity, isMobile }: HumidityInfoProps) {
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
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
        <p
          style={{
            fontSize: isMobile ? "14px" : "16px",
            color: "#6b7280",
            fontWeight: "500",
          }}
        >
          Humidity
        </p>
      </div>
      <p
        style={{
          fontSize: isMobile ? "20px" : "24px",
          fontWeight: "600",
          color: "#1a202c",
          marginBottom: "12px",
        }}
      >
        {humidity}%
      </p>
      <div
        style={{
          width: "100%",
          backgroundColor: "#e5e7eb",
          borderRadius: "999px",
          height: isMobile ? "6px" : "8px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${humidity}%`,
            height: "100%",
            background: "linear-gradient(90deg, #3b82f6, #60a5fa)",
            borderRadius: "999px",
            transition: "width 0.3s ease",
          }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
        <span style={{ fontSize: isMobile ? "12px" : "14px", color: "#6b7280", fontWeight: "500" }}>0%</span>
        <span style={{ fontSize: isMobile ? "12px" : "14px", color: "#6b7280", fontWeight: "500" }}>100%</span>
      </div>
    </div>
  );
}
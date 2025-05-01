interface HumidityInfoProps {
  humidity: number;
  isMobile: boolean;
}

export default function HumidityInfo({ humidity, isMobile }: HumidityInfoProps) {
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
        Humidity
      </p>
      <p
        style={{
          fontSize: isMobile ? "20px" : "24px",
          fontWeight: "600",
          color: "#1f2937",
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
        ></div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
        <span style={{ fontSize: isMobile ? "10px" : "12px", color: "#6b7280" }}>0%</span>
        <span style={{ fontSize: isMobile ? "10px" : "12px", color: "#6b7280" }}>100%</span>
      </div>
    </div>
  );
}
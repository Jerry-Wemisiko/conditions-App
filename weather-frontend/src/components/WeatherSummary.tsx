interface WeatherSummaryProps {
  current: {
    temperature: number;
    description: string;
    icon: string;
    date: string;
    location: string;
  };
  unit: "metric" | "imperial";
  isMobile: boolean;
}

export default function WeatherSummary({ current, unit, isMobile }: WeatherSummaryProps) {
  const formattedDate = new Date(current.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100%", justifyContent: "space-between" }}>
      <div style={{ textAlign: "center" }}>
        <img
          src={`http://openweathermap.org/img/wn/${current.icon}@2x.png`}
          alt="Weather"
          style={{
            width: isMobile ? "80px" : "100px",
            height: isMobile ? "80px" : "100px",
            margin: isMobile ? "12px auto" : "16px auto",
            filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))",
          }}
        />
        <p
          style={{
            fontSize: isMobile ? "36px" : "48px",
            fontWeight: "700",
            color: "#1f2937",
            marginBottom: "8px",
          }}
        >
          {Math.round(current.temperature)}°{unit === "metric" ? "C" : "F"}
        </p>
        <p
          style={{
            fontSize: isMobile ? "16px" : "20px",
            color: "#4b5563",
            textTransform: "capitalize",
            fontStyle: "italic",
          }}
        >
          {current.description}
        </p>
      </div>
      <p
        style={{
          color: "#6b7280",
          fontSize: isMobile ? "14px" : "16px",
          marginTop: "auto",
          textAlign: "center",
          fontWeight: "500",
        }}
      >
        {formattedDate} | {current.location}
      </p>
    </div>
  );
}
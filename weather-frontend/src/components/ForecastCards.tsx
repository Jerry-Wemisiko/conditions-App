interface ForecastCardsProps {
  forecast: { date: string; temp: number; description: string; icon: string }[];
  unit: "metric" | "imperial";
  isMobile: boolean;
}

export default function ForecastCards({ forecast, unit, isMobile }: ForecastCardsProps) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "16px" }}>
      {forecast.map((day) => {
        const formattedDate = new Date(day.date).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
        });
        return (
          <div
            key={day.date}
            style={{
              border: "1px solid #d1d5db",
              borderRadius: "12px",
              padding: isMobile ? "12px" : "16px",
              textAlign: "center",
              background: "linear-gradient(145deg, #f9fafb, #e5e7eb)",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
            }}
          >
            <p style={{ fontSize: isMobile ? "14px" : "16px", fontWeight: "600", color: "#1f2937" }}>{formattedDate}</p>
            <img
              src={`http://openweathermap.org/img/wn/${day.icon}.png`}
              alt="Weather"
              style={{
                width: isMobile ? "40px" : "48px",
                height: isMobile ? "40px" : "48px",
                margin: isMobile ? "8px auto" : "12px auto",
                filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
              }}
            />
            <p style={{ fontSize: isMobile ? "14px" : "16px", color: "#4b5563", fontWeight: "500" }}>
              {Math.round(day.temp)}°{unit === "metric" ? "C" : "F"}
            </p>
          </div>
        );
      })}
    </div>
  );
}
import Image from "next/image";

interface ForecastCardsProps {
  forecast: { date: string; temp: number; description: string; icon: string }[];
  unit: "metric" | "imperial";
  isMobile: boolean;
}

export default function ForecastCards({ forecast, unit, isMobile }: ForecastCardsProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
        gap: isMobile ? "12px" : "16px",
      }}
    >
      {forecast.map((day) => {
        const formattedDate = new Date(day.date).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
        });
        return (
          <div
            key={day.date}
            style={{
              border: "none",
              borderRadius: "16px",
              padding: isMobile ? "12px" : "16px",
              textAlign: "center",
              background: "rgba(255, 255, 255, 0.8)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              backdropFilter: "blur(5px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
            }}
          >
            <p
              style={{
                fontSize: isMobile ? "14px" : "16px",
                fontWeight: "600",
                color: "#1a202c",
                marginBottom: "8px",
              }}
            >
              {formattedDate}
            </p>
            <Image
              src={`http://openweathermap.org/img/wn/${day.icon}.png`}
              alt="Weather"
              width={isMobile ? 40 : 48}
              height={isMobile ? 40 : 48}
              style={{ margin: "8px auto", filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))" }}
            />
            <p
              style={{
                fontSize: isMobile ? "14px" : "16px",
                color: "#4b5563",
                fontWeight: "500",
              }}
            >
              {Math.round(day.temp)}°{unit === "metric" ? "C" : "F"}
            </p>
          </div>
        );
      })}
    </div>
  );
}
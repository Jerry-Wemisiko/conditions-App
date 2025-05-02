import Image from "next/image";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        justifyContent: "space-between",
        textAlign: "center",
      }}
    >
      <div>
        <Image
          src={`http://openweathermap.org/img/wn/${current.icon}@2x.png`}
          alt="Weather"
          width={isMobile ? 80 : 120}
          height={isMobile ? 80 : 120}
          style={{ margin: "20px auto", filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))" }}
        />
        <p
          style={{
            fontSize: isMobile ? "40px" : "56px",
            fontWeight: "800",
            color: "#1a202c",
            marginBottom: "12px",
            lineHeight: "1",
          }}
        >
          {Math.round(current.temperature)}°{unit === "metric" ? "C" : "F"}
        </p>
        <p
          style={{
            fontSize: isMobile ? "18px" : "22px",
            color: "#4b5563",
            textTransform: "capitalize",
            fontStyle: "italic",
            fontWeight: "500",
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
          fontWeight: "500",
          letterSpacing: "0.5px",
        }}
      >
        {formattedDate} | {current.location}
      </p>
    </div>
  );
}
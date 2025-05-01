"use client";

import { useState, useEffect } from "react";
import SearchBar from "../src/components/SearchBar";
import UnitToggle from "../src/components/UnitToggle";
import WeatherSummary from "../src/components/WeatherSummary";
import ForecastCards from "../src/components/ForecastCards";
import WindInfo from "../src/components/WindInfo";
import HumidityInfo from "../src/components/HumidityInfo";

interface WeatherData {
  current: {
    temperature: number;
    description: string;
    icon: string;
    date: string;
    location: string;
    wind_speed: number;
    humidity: number;
  };
  forecast: { date: string; temp: number; description: string; icon: string }[];
  unit: "metric" | "imperial";
}

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [city, setCity] = useState("Nairobi");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive layout based on screen width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/weather?city=${encodeURIComponent(city)}&unit=${unit}`,
        { mode: "cors" }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: WeatherData = await response.json();
      setWeather(data);
      setError("");
    } catch (err: any) {
      console.error("Frontend: Fetch error:", err.message);
      setError(err.message || "Failed to fetch weather data");
      setWeather(null);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [city, unit]);

  return (
    <>
      {/* Global Style Reset */}
      <style>
        {`
          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow-x: hidden;
          }
        `}
      </style>

      <main
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #74ebd5 0%, #acb6e5 100%)",
          padding: isMobile ? "16px" : "24px",
          display: "flex",
          flexDirection: "column",
          width: "100vw",
          boxSizing: "border-box",
          margin: 0,
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontSize: isMobile ? "28px" : "36px",
            fontWeight: "700",
            color: "#ffffff",
            textAlign: "center",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            marginBottom: "24px",
          }}
        >
          Weather-App
        </h1>

        {/* Main Content */}
        <div
          style={{
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "24px",
            flex: 1,
            width: "100%",
          }}
        >
          {/* Left Panel: WeatherSummary */}
          <div
            style={{
              background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
              borderRadius: "16px",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
              padding: isMobile ? "16px" : "24px",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {weather ? (
              <WeatherSummary current={weather.current} unit={unit} isMobile={isMobile} />
            ) : (
              <p style={{ color: "#6b7280", textAlign: "center" }}>Loading weather...</p>
            )}
            {error && <p style={{ color: "#ef4444", marginTop: "16px", textAlign: "center" }}>{error}</p>}
          </div>

          {/* Right Panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Top: SearchBar and UnitToggle */}
            <div
              style={{
                background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
                borderRadius: "16px",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
                padding: "16px",
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: isMobile ? "stretch" : "center",
                gap: "12px",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div style={{ flex: 1 }}>
                <SearchBar city={city} setCity={setCity} onSearch={fetchWeather} isMobile={isMobile} />
              </div>
              <UnitToggle unit={unit} setUnit={setUnit} isMobile={isMobile} />
            </div>

            {/* Middle: ForecastCards */}
            <div
              style={{
                background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
                borderRadius: "16px",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
                padding: "24px",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {weather ? (
                <ForecastCards forecast={weather.forecast} unit={unit} isMobile={isMobile} />
              ) : (
                <p style={{ color: "#6b7280", textAlign: "center" }}>Loading forecast...</p>
              )}
            </div>

            {/* Bottom: WindInfo and HumidityInfo */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: "24px",
              }}
            >
              <div
                style={{
                  background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
                  borderRadius: "16px",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
                  padding: "16px",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                {weather ? (
                  <WindInfo windSpeed={weather.current.wind_speed} unit={unit} isMobile={isMobile} />
                ) : (
                  <p style={{ color: "#6b7280", textAlign: "center" }}>Loading wind...</p>
                )}
              </div>
              <div
                style={{
                  background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
                  borderRadius: "16px",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
                  padding: "16px",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                {weather ? (
                  <HumidityInfo humidity={weather.current.humidity} isMobile={isMobile} />
                ) : (
                  <p style={{ color: "#6b7280", textAlign: "center" }}>Loading humidity...</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer
          style={{
            marginTop: "24px",
            textAlign: "center",
            color: "#ffffff",
            fontSize: isMobile ? "12px" : "14px",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
            padding: "16px 0",
          }}
        >
          Developed by Skyles
        </footer>
      </main>
    </>
  );
}
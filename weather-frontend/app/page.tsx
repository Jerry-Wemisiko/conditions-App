"use client";

import { useState, useEffect, useCallback } from "react";
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

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchWeather = useCallback(async () => {
    try {
      const url = `http://127.0.0.1:8000/api/weather?city=${encodeURIComponent(city)}&unit=${unit}`;
      console.log('Fetching weather from:', url);
      const response = await fetch(url, { mode: "cors" });
      if (!response.ok) {
        throw new Error(
          response.status === 404
            ? `City not found or API endpoint unavailable (URL: ${url})`
            : `HTTP error! Status: ${response.status}`
        );
      }
      const data: WeatherData = await response.json();
      setWeather(data);
      setError("");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch weather data";
      console.error("Frontend: Fetch error:", errorMessage);
      setError(errorMessage);
      setWeather(null);
    }
  }, [city, unit]);

  useEffect(() => {
    fetchWeather();
  }, [city, unit, fetchWeather]);

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
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
          * {
            box-sizing: border-box;
          }
        `}
      </style>

      <main
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #6dd5fa 0%, #2980b9 100%)",
          padding: isMobile ? "16px" : "32px",
          display: "flex",
          flexDirection: "column",
          width: "100vw",
          color: "#1a202c",
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontSize: isMobile ? "32px" : "40px",
            fontWeight: "800",
            color: "#ffffff",
            textAlign: "center",
            textShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)",
            marginBottom: "32px",
            letterSpacing: "1px",
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
            gap: "32px",
            flex: 1,
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          {/* Left Panel: WeatherSummary */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              borderRadius: "24px",
              boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
              padding: isMobile ? "20px" : "32px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              backdropFilter: "blur(10px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.boxShadow = "0 16px 32px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.15)";
            }}
          >
            {weather ? (
              <WeatherSummary current={weather.current} unit={unit} isMobile={isMobile} />
            ) : (
              <p style={{ color: "#6b7280", textAlign: "center", fontSize: "16px", fontWeight: "500" }}>
                Loading weather...
              </p>
            )}
            {error && (
              <p style={{ color: "#ef4444", marginTop: "16px", textAlign: "center", fontSize: "14px", fontWeight: "500" }}>
                {error}
              </p>
            )}
          </div>

          {/* Right Panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {/* Top: SearchBar and UnitToggle Side by Side */}
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: "16px",
                alignItems: isMobile ? "stretch" : "center",
              }}
            >
              <div style={{ flex: 1 }}>
                <SearchBar city={city} setCity={setCity} onSearch={fetchWeather} isMobile={isMobile} />
              </div>
              <UnitToggle unit={unit} setUnit={setUnit} isMobile={isMobile} />
            </div>

            {/* Middle: ForecastCards */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                borderRadius: "24px",
                boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
                padding: "24px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                backdropFilter: "blur(10px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow = "0 16px 32px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.15)";
              }}
            >
              {weather ? (
                <ForecastCards forecast={weather.forecast} unit={unit} isMobile={isMobile} />
              ) : (
                <p style={{ color: "#6b7280", textAlign: "center", fontSize: "16px", fontWeight: "500" }}>
                  Loading forecast...
                </p>
              )}
            </div>

            {/* Bottom: WindInfo and HumidityInfo */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: "32px",
              }}
            >
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  borderRadius: "24px",
                  boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
                  padding: "20px",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  backdropFilter: "blur(10px)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 16px 32px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.15)";
                }}
              >
                {weather ? (
                  <WindInfo windSpeed={weather.current.wind_speed} unit={unit} isMobile={isMobile} />
                ) : (
                  <p style={{ color: "#6b7280", textAlign: "center", fontSize: "16px", fontWeight: "500" }}>
                    Loading wind...
                  </p>
                )}
              </div>
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  borderRadius: "24px",
                  boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
                  padding: "20px",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  backdropFilter: "blur(10px)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 16px 32px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.15)";
                }}
              >
                {weather ? (
                  <HumidityInfo humidity={weather.current.humidity} isMobile={isMobile} />
                ) : (
                  <p style={{ color: "#6b7280", textAlign: "center", fontSize: "16px", fontWeight: "500" }}>
                    Loading humidity...
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer
          style={{
            marginTop: "32px",
            textAlign: "center",
            color: "#ffffff",
            fontSize: isMobile ? "14px" : "16px",
            textShadow: "1px 1px 4px rgba(0, 0, 0, 0.3)",
            padding: "16px 0",
            fontWeight: "500",
          }}
        >
          Developed by Skyles | Powered by OpenWeatherMap
        </footer>
      </main>
    </>
  );
}
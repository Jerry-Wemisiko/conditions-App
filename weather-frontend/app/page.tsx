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
  const [city, setCity] = useState("New York");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/weather?city=${encodeURIComponent(city)}&unit=${unit}`
      );
      if (!response.ok) throw new Error("Failed to fetch weather");
      const data: WeatherData = await response.json();
      setWeather(data);
      setError("");
    } catch (err) {
      setError("City not found");
      setWeather(null);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [city, unit]);

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Panel: WeatherSummary */}
        <div className="md:col-span-1">
          {weather && <WeatherSummary current={weather.current} unit={unit} />}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>

        {/* Right Panel */}
        <div className="md:col-span-1 flex flex-col gap-4">
          {/* Top: SearchBar and UnitToggle */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <SearchBar city={city} setCity={setCity} onSearch={fetchWeather} />
            </div>
            <UnitToggle unit={unit} setUnit={setUnit} />
          </div>

          {/* Middle: ForecastCards */}
          {weather && <ForecastCards forecast={weather.forecast} unit={unit} />}

          {/* Bottom: WindInfo and HumidityInfo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {weather && <WindInfo windSpeed={weather.current.wind_speed} unit={unit} />}
            {weather && <HumidityInfo humidity={weather.current.humidity} />}
          </div>
        </div>
      </div>
    </main>
  );
}
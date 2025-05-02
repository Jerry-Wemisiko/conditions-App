import { NextResponse } from "next/server";

interface ForecastItem {
  dt_txt: string;
  main: { temp: number };
  weather: Array<{ description: string; icon: string }>;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  const unit = searchParams.get("unit") || "metric";

  if (!city) {
    return NextResponse.json({ error: "City is required" }, { status: 400 });
  }

  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`
    );
    if (!weatherResponse.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const weatherData = await weatherResponse.json();

    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`
    );
    if (!forecastResponse.ok) {
      throw new Error("Failed to fetch forecast data");
    }
    const forecastData = await forecastResponse.json();

    const forecastItems = forecastData.list
      .filter((item: ForecastItem) => item.dt_txt.includes("12:00:00"))
      .slice(0, 3)
      .map((item: ForecastItem) => ({
        date: item.dt_txt,
        temp: item.main.temp,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
      }));

    return NextResponse.json({
      current: {
        temperature: weatherData.main.temp,
        description: weatherData.weather[0].description,
        icon: weatherData.weather[0].icon,
        date: new Date(weatherData.dt * 1000).toISOString(),
        location: weatherData.name,
        wind_speed: weatherData.wind.speed,
        humidity: weatherData.main.humidity,
      },
      forecast: forecastItems,
      unit,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
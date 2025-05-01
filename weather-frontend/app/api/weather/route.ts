import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  const unit = searchParams.get("unit");

  console.log("API Route: Received request with city:", city, "unit:", unit);

  if (!city || !unit) {
    console.log("API Route: Missing city or unit");
    return NextResponse.json({ error: "City and unit are required" }, { status: 400 });
  }

  try {
    console.log("API Route: Fetching from Laravel backend...");
    const response = await fetch(
      `http://127.0.0.1:8000/api/weather?city=${encodeURIComponent(city)}&unit=${unit}`
    );
    console.log("API Route: Backend response status:", response.status);
    if (!response.ok) {
      const errorData = await response.json();
      console.log("API Route: Backend error:", errorData);
      return NextResponse.json({ error: errorData.error || "Failed to fetch weather" }, { status: response.status });
    }
    const data = await response.json();
    console.log("API Route: Backend response data:", data);
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("API Route: Fetch error:", err.message);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
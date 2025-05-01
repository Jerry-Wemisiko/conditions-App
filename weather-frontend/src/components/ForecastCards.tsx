interface ForecastCardsProps {
    forecast: { date: string; temp: number; description: string; icon: string }[];
    unit: "metric" | "imperial";
  }
  
  export default function ForecastCards({ forecast, unit }: ForecastCardsProps) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">3-Day Forecast</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {forecast.map((day) => (
            <div key={day.date} className="border rounded-md p-4 text-center">
              <p>{day.date}</p>
              <img
                src={`http://openweathermap.org/img/wn/${day.icon}.png`}
                alt="Weather"
                className="w-12 h-12 mx-auto"
              />
              <p>{day.temp}°{unit === "metric" ? "C" : "F"}</p>
              <p className="capitalize">{day.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
interface ForecastCardsProps {
    forecast: { date: string; temp: number; description: string; icon: string }[];
    unit: "metric" | "imperial";
  }
  
  export default function ForecastCards({ forecast, unit }: ForecastCardsProps) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {forecast.map((day) => {
            const formattedDate = new Date(day.date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
            });
            return (
              <div key={day.date} className="border rounded-md p-4 text-center">
                <p className="text-sm font-semibold">{formattedDate}</p>
                <img
                  src={`http://openweathermap.org/img/wn/${day.icon}.png`}
                  alt="Weather"
                  className="w-12 h-12 mx-auto my-2"
                />
                <p className="text-sm">
                  {Math.round(day.temp)}°{unit === "metric" ? "C" : "F"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
interface WeatherSummaryProps {
    current: {
      temperature: number;
      description: string;
      icon: string;
      date: string;
      location: string;
    };
    unit: "metric" | "imperial";
  }
  
  export default function WeatherSummary({ current, unit }: WeatherSummaryProps) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold">{current.location} - {current.date}</h2>
        <img
          src={`http://openweathermap.org/img/wn/${current.icon}.png`}
          alt="Weather"
          className="w-16 h-16 mx-auto"
        />
        <p className="text-2xl">{current.temperature}°{unit === "metric" ? "C" : "F"}</p>
        <p className="capitalize">{current.description}</p>
      </div>
    );
  }
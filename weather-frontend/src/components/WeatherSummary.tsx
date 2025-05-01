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
    // Format date to "DD MMM YYYY"
    const formattedDate = new Date(current.date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500 text-sm">
          {formattedDate} | {current.location}
        </p>
        <img
          src={`http://openweathermap.org/img/wn/${current.icon}@2x.png`}
          alt="Weather"
          className="w-20 h-20 mx-auto my-2"
        />
        <p className="text-4xl font-bold">
          {Math.round(current.temperature)}°{unit === "metric" ? "C" : "F"}
        </p>
        <p className="text-lg capitalize text-center">{current.description}</p>
      </div>
    );
  }
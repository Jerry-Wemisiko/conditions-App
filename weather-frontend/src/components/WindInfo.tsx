interface WindInfoProps {
    windSpeed: number;
    unit: "metric" | "imperial";
  }
  
  export default function WindInfo({ windSpeed, unit }: WindInfoProps) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 text-center">
        <p className="text-sm text-gray-500">Wind Status</p>
        <p className="text-2xl font-semibold">
          {windSpeed} {unit === "metric" ? "km/h" : "mph"}
        </p>
      </div>
    );
  }
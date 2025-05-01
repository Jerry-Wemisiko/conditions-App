interface WindInfoProps {
    windSpeed: number;
    unit: "metric" | "imperial";
  }
  
  export default function WindInfo({ windSpeed, unit }: WindInfoProps) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 text-center">
        <h3 className="text-lg font-semibold">Wind Speed</h3>
        <p>{windSpeed} {unit === "metric" ? "m/s" : "mph"}</p>
      </div>
    );
  }
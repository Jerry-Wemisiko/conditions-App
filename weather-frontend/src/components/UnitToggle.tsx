interface UnitToggleProps {
    unit: "metric" | "imperial";
    setUnit: (unit: "metric" | "imperial") => void;
  }
  
  export default function UnitToggle({ unit, setUnit }: UnitToggleProps) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-gray-700 text-sm">°C</span>
        <input
          type="checkbox"
          className="toggle"
          checked={unit === "imperial"}
          onChange={() => setUnit(unit === "metric" ? "imperial" : "metric")}
        />
        <span className="text-gray-700 text-sm">°F</span>
      </div>
    );
  }
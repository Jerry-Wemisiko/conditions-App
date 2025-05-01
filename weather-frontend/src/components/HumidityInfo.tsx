interface HumidityInfoProps {
    humidity: number;
  }
  
  export default function HumidityInfo({ humidity }: HumidityInfoProps) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 text-center">
        <p className="text-sm text-gray-500">Humidity</p>
        <p className="text-2xl font-semibold">{humidity}%</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div
            className="bg-blue-500 h-2.5 rounded-full"
            style={{ width: `${humidity}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>
    );
  }
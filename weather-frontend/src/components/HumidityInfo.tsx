interface HumidityInfoProps {
    humidity: number;
  }
  
  export default function HumidityInfo({ humidity }: HumidityInfoProps) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 text-center">
        <h3 className="text-lg font-semibold">Humidity</h3>
        <p>{humidity}%</p>
      </div>
    );
  }
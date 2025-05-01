<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\JsonResponse;
// 
// This controller handles weather data retrieval from OpenWeatherMap API
// and returns the current weather and a 3-day forecast for a given city.
// It uses the OpenWeatherMap Geocoding API to get latitude and 
// longitude for the city, and then fetches the current weather and
class WeatherController extends Controller
{
    public function getWeather(Request $request): JsonResponse
    {
        \Log::info('WeatherController: Request received', [
            'city' => $request->query('city'),
            'unit' => $request->query('unit')
        ]);

        $city = $request->query('city');
        $unit = $request->query('unit', 'metric');

        if (!$city) {
            \Log::error('WeatherController: City missing');
            return response()->json(['error' => 'City is required'], 400);
        }

        $apiKey = env('OPENWEATHERMAP_API_KEY');
        if (!$apiKey) {
            \Log::error('WeatherController: API key not configured');
            return response()->json(['error' => 'API key not configured'], 500);
        }

        // Geocoding API
        $geoResponse = Http::get("https://api.openweathermap.org/geo/1.0/direct", [
            'q' => $city,
            'limit' => 1,
            'appid' => $apiKey
        ])->json();

        if (empty($geoResponse)) {
            \Log::error('WeatherController: City not found', ['city' => $city]);
            return response()->json(['error' => 'City not found'], 404);
        }

        $lat = $geoResponse[0]['lat'];
        $lon = $geoResponse[0]['lon'];

        // Current weather
        $weatherResponse = Http::get("https://api.openweathermap.org/data/2.5/weather", [
            'lat' => $lat,
            'lon' => $lon,
            'units' => $unit,
            'appid' => $apiKey
        ])->json();

        // 3-day forecast
        $forecastResponse = Http::get("https://api.openweathermap.org/data/2.5/forecast", [
            'lat' => $lat,
            'lon' => $lon,
            'units' => $unit,
            'appid' => $apiKey
        ])->json();

        $forecastData = [];
        $dates = [];
        foreach ($forecastResponse['list'] as $item) {
            $date = date('Y-m-d', $item['dt']);
            if (!in_array($date, $dates) && count($dates) < 3 && $date !== date('Y-m-d')) {
                $dates[] = $date;
                $forecastData[] = [
                    'date' => $date,
                    'temp' => $item['main']['temp'],
                    'description' => $item['weather'][0]['description'],
                    'icon' => $item['weather'][0]['icon'],
                ];
            }
        }

        \Log::info('WeatherController: Response prepared', ['city' => $city]);
        return response()->json([
            'current' => [
                'temperature' => $weatherResponse['main']['temp'],
                'description' => $weatherResponse['weather'][0]['description'],
                'icon' => $weatherResponse['weather'][0]['icon'],
                'date' => date('Y-m-d'),
                'location' => $weatherResponse['name'],
                'wind_speed' => $weatherResponse['wind']['speed'],
                'humidity' => $weatherResponse['main']['humidity'],
            ],
            'forecast' => $forecastData,
            'unit' => $unit,
        ]);
    }
}
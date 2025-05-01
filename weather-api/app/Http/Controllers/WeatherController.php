<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\JsonResponse;

class WeatherController extends Controller
{
    /**
     * Fetch weather data for a given city.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function getWeather(Request $request): JsonResponse
    {
        // Validate input
        $request->validate([
            'city' => 'required|string',
            'unit' => 'nullable|string|in:metric,imperial',
        ]);

        $city = $request->query('city');
        $unit = $request->query('unit', 'metric'); // Default to Celsius
        $apiKey = env('OPENWEATHERMAP_API_KEY');

        // Step 1: Get coordinates using Geocoding API
        $geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q={$city}&limit=1&appid={$apiKey}";
        $geoResponse = Http::get($geoUrl)->json();

        if (empty($geoResponse)) {
            return response()->json(['error' => 'City not found'], 404);
        }

        $lat = $geoResponse[0]['lat'];
        $lon = $geoResponse[0]['lon'];

        // Step 2: Get current weather
        $weatherUrl = "http://api.openweathermap.org/data/2.5/weather?lat={$lat}&lon={$lon}&units={$unit}&appid={$apiKey}";
        $weatherResponse = Http::get($weatherUrl)->json();

        // Step 3: Get 3-day forecast
        $forecastUrl = "http://api.openweathermap.org/data/2.5/forecast?lat={$lat}&lon={$lon}&units={$unit}&appid={$apiKey}";
        $forecastResponse = Http::get($forecastUrl)->json();

        // Process forecast to get next 3 days
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

        // Format response
        $response = [
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
        ];

        return response()->json($response);
    }
}
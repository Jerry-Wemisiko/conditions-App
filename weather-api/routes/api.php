<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WeatherController;

Route::get('/test', function () {
    return response()->json(['message' => 'Test route']);
});

Route::get('/weather', [WeatherController::class, 'getWeather']);

Route::get('/debug-key', function () {
    return response()->json(['api_key' => env('OPENWEATHERMAP_API_KEY')]);
});
<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WeatherController;

Route::get('/test', function () {
    return response()->json(['message' => 'Test route']);
});

Route::get('/weather', [WeatherController::class, 'getWeather']);
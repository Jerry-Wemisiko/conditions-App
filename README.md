# Weather App
A decoupled weather application with a Laravel backend and Next.js frontend.

## Setup
### Backend
1. `cd backend`
2. `composer install`
3. Copy `.env.example` to `.env` and set `OPENWEATHERMAP_API_KEY`.
4. `php artisan key:generate`
5. `php artisan serve`

### Frontend
1. `cd frontend`
2. `npm install`
3. Copy `.env.local.example` to `.env.local` and set `NEXT_PUBLIC_API_URL=http://127.0.0.1:8000`.
4. `npm run dev`

## Features
- City search using OpenWeatherMap Geocoding API.
- Toggle between Celsius and Fahrenheit.
- Current weather, 3-day forecast, wind, and humidity.

import { fetchWeatherApi } from "openmeteo";

const params = {
  latitude: -34.58333,
  longitude: 19.35,
  hourly: [
    "swell_wave_height",
    "sea_surface_temperature",
    "sea_level_height_msl",
  ],
  forecast_days: 1,
};
const url = "https://marine-api.open-meteo.com/v1/marine";
const responses = await fetchWeatherApi(url, params);

// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0];

// Attributes for timezone and location
const latitude = response.latitude();
const longitude = response.longitude();
const elevation = response.elevation();
const utcOffsetSeconds = response.utcOffsetSeconds();

console.log(
	`\nCoordinates: ${Math.abs(latitude)}°${latitude < 0 ? 'S' : 'N'} ${Math.abs(longitude)}°${longitude < 0 ? 'W' : 'E'}`,
	`\nElevation: ${elevation}m asl`,
	`\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
);

const hourly = response.hourly();

// Note: The order of weather variables in the URL query and the indices below need to match!
const weatherData = {
	hourly: {
		time: Array.from(
			{ length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() }, 
			(_ , i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
		),
		swell_wave_height: hourly.variables(0).valuesArray(),
		sea_surface_temperature: hourly.variables(1).valuesArray(),
		sea_level_height_msl: hourly.variables(2).valuesArray(),
	},
};

// The 'weatherData' object now contains a simple structure, with arrays of datetimes and weather information
console.log("\nHourly data:\n", weatherData.hourly)

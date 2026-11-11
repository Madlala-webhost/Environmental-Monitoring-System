import { fetchWeatherApi } from "openmeteo";

const params = {
	latitude: 52.52,
	longitude: 13.41,
	hourly: ["temperature_2m", "wind_speed_10m", "wind_direction_10m", "rain", "cloud_cover", "precipitation", "wind_gusts_10m"],
};
const url = "https://api.open-meteo.com/v1/forecast";
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
		temperature_2m: hourly.variables(0).valuesArray(),
		wind_speed_10m: hourly.variables(1).valuesArray(),
		wind_direction_10m: hourly.variables(2).valuesArray(),
		rain: hourly.variables(3).valuesArray(),
		cloud_cover: hourly.variables(4).valuesArray(),
		precipitation: hourly.variables(5).valuesArray(),
		wind_gusts_10m: hourly.variables(6).valuesArray(),
	},
};

// The 'weatherData' object now contains a simple structure, with arrays of datetimes and weather information
console.log("\nHourly data:\n", weatherData.hourly)

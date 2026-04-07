import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

/**
 * Fetch weather data from OpenWeather API
 * @param {string} location - City name or location
 * @returns {Object} Weather data or null if fetch fails
 */
export const fetchWeather = async (location) => {
  if (!location || !process.env.OPENWEATHER_API_KEY) {
    return null;
  }

  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: location,
          appid: process.env.OPENWEATHER_API_KEY,
          units: "imperial", // Returns temperature in Fahrenheit
        },
        timeout: 5000,
      }
    );

    return {
      condition: response.data.weather[0].main,
      temperature: response.data.main.temp,
      location: response.data.name,
    };
  } catch (error) {
    console.error("Weather API Error:", error.message);
    return null; // Return null if weather fetch fails (entry still saves)
  }
};
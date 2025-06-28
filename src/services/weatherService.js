
import axios from "axios";

const API_KEY = "beb2ca3b6902150b86f73a262e2c1323";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getForecastByCity = async (city) => {
  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      q: city,
      units: "metric",
      lang: "pt_br",
      appid: API_KEY,
    },
  });
  return response.data;
};



export async function getWeatherByCapital(cities = []) {
  if (!Array.isArray(cities) || cities.length === 0) {
    throw new Error('Você deve passar um array não vazio de cidades');
  }

  const fetchCityWeather = async (city) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&lang=pt_br&appid=${API_KEY}`
    );
    if (!response.ok) {
      return null; 
    }
    return response.json();
  };

  const promises = cities.map(fetchCityWeather);

  const results = await Promise.all(promises);

  return results.filter(Boolean);
}

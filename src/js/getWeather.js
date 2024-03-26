/**
 * Returns current weather data of provided city using OpenWeather API.
 * https://openweathermap.org/current
 */

import getCoordinates from './getCoordinates';

const apiKey = '89ab6f6729c23a478a56b4f4bbd36f45';

const getWeather = async function getWeather(cityInput, units) {
    const { lat, lon, city, country } = await getCoordinates(cityInput, apiKey);
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`
    );
    const weatherData = await response.json();
    const description = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const temperature = weatherData.main.temp;
    const feelsLike = weatherData.main.feels_like;
    const humidity = weatherData.main.humidity;
    const wind = weatherData.wind.speed;
    return {
        city,
        country,
        description,
        icon,
        temperature,
        feelsLike,
        humidity,
        wind,
    };
};

export default getWeather;

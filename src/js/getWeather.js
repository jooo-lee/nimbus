/**
 * Returns current weather data of provided city using OpenWeather API.
 * https://openweathermap.org/current
 */

import getCoordinates from './getCoordinates';

const getWeather = async function getWeather(city, apiKey) {
    const { lat, lon } = await getCoordinates(city, apiKey);
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    const weatherData = await response.json();
    console.log(weatherData);
};

export default getWeather;

import getWeather from './getWeather';

const displayWeather = async function displayWeather(cityInput, units) {
    const {
        city,
        country,
        description,
        weatherIcon,
        temperature,
        feelsLike,
        humidity,
        windSpeed,
    } = await getWeather(cityInput, units);

    const cityElem = document.querySelector('#city');
    const countryElem = document.querySelector('#country');
    const weatherIconElem = document.querySelector('#weather-icon');
    const descriptionElem = document.querySelector('#description');
    const temperatureElem = document.querySelector('#temperature');
    const feelsLikeElem = document.querySelector('#feels-like');
    const humidityElem = document.querySelector('#humidity');
    const windSpeedElem = document.querySelector('#wind-speed');

    cityElem.textContent = city;
    countryElem.textContent = country;

    // Retrieve appropriate weather icon from OpenWeather
    weatherIconElem.src = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

    // Capitalize first letter of description
    descriptionElem.textContent =
        description.charAt(0).toUpperCase() + description.slice(1);

    temperatureElem.textContent = temperature;
    feelsLikeElem.textContent = `Feels like: ${feelsLike}`;
    humidityElem.textContent = `Humidity: ${humidity}%`;
    windSpeedElem.textContent = `Wind speed: ${windSpeed}`;

    // Add appropriate units of measurement
    if (units === 'metric') {
        temperatureElem.textContent += ' °C';
        feelsLikeElem.textContent += ' °C';
        windSpeedElem.textContent += ' m/s';
    } else if (units === 'imperial') {
        temperatureElem.textContent += ' °F';
        feelsLikeElem.textContent += ' °F';
        windSpeedElem.textContent += ' mph';
    } else {
        throw new Error('Invalid unit of measurement!');
    }
};

export default displayWeather;

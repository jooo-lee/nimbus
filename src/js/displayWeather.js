import getWeather from './getWeather';

const displayWeather = async function displayWeather(cityInput) {
    // Hide weather display and show loader while fetching data
    const weatherDisplay = document.querySelector('#weather-display');
    weatherDisplay.style.display = 'none';
    const loader = document.querySelector('#weather-display-loader');
    loader.style.display = 'initial';

    const unitsToggler = document.querySelector('#units-toggler');
    const units = unitsToggler.checked ? 'imperial' : 'metric';

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
    const descriptionElem = document.querySelector('#description');
    const temperatureElem = document.querySelector('#temperature');
    const feelsLikeElem = document.querySelector('#feels-like');
    const humidityElem = document.querySelector('#humidity');
    const windSpeedElem = document.querySelector('#wind-speed');

    cityElem.textContent = city;
    countryElem.textContent = country;

    /**
     * Hardcoding the weather icon <img> element in HTML causes the missing image
     * icon to appear the first time the page is loaded, so we dynamically create
     * the <img> element here.
     */
    let weatherIconElem = document.querySelector('#weather-icon');
    if (!weatherIconElem) {
        // Only create <img> element once, first time page is loaded
        weatherIconElem = document.createElement('img');
    }
    weatherIconElem.src = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    weatherIconElem.alt = 'Weather icon';
    weatherIconElem.id = 'weather-icon';
    countryElem.after(weatherIconElem);

    // Capitalize first letter of description
    descriptionElem.textContent =
        description.charAt(0).toUpperCase() + description.slice(1);

    temperatureElem.textContent = Math.round(temperature);
    feelsLikeElem.textContent = `Feels like: ${Math.round(feelsLike)}`;
    humidityElem.textContent = `Humidity: ${humidity}%`;
    windSpeedElem.textContent = `Wind: ${windSpeed}`;

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

    // Done fetching data, hide loader and show weather display
    loader.style.display = 'none';
    weatherDisplay.style.display = 'flex';
};

export default displayWeather;

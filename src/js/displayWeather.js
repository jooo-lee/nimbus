import getWeather from './getWeather';

const displayWeather = async function displayWeather(cityInput) {
    // Hide weather display and its error message and show loader while fetching data
    const weatherDisplay = document.querySelector('#weather-display');
    weatherDisplay.style.display = 'none';
    const weatherDisplayError = document.querySelector(
        '#weather-display-error'
    );
    weatherDisplayError.style.display = 'none';
    const loader = document.querySelector('#weather-display-loader');
    loader.style.display = 'initial';

    const unitsToggler = document.querySelector('#units-toggler');
    const units = unitsToggler.checked ? 'imperial' : 'metric';

    // Attempt to fetch data, display error message if it fails
    let weatherData;
    try {
        weatherData = await getWeather(cityInput, units);
    } catch (error) {
        loader.style.display = 'none';
        weatherDisplayError.style.display = 'initial';
        weatherDisplayError.textContent =
            "Sorry, we couldn't find that location.";
        return;
    }

    const cityElem = document.querySelector('#city');
    const countryElem = document.querySelector('#country');
    const descriptionElem = document.querySelector('#description');
    const temperatureElem = document.querySelector('#temperature');
    const feelsLikeElem = document.querySelector('#feels-like');
    const humidityElem = document.querySelector('#humidity');
    const windSpeedElem = document.querySelector('#wind-speed');

    cityElem.textContent = weatherData.city;
    countryElem.textContent = weatherData.country;

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
    weatherIconElem.src = `https://openweathermap.org/img/wn/${weatherData.weatherIcon}@2x.png`;
    weatherIconElem.alt = 'Weather icon';
    weatherIconElem.id = 'weather-icon';
    countryElem.after(weatherIconElem);

    // Capitalize first letter of description
    descriptionElem.textContent =
        weatherData.description.charAt(0).toUpperCase() +
        weatherData.description.slice(1);

    temperatureElem.textContent = Math.round(weatherData.temperature);
    feelsLikeElem.textContent = `Feels like: ${Math.round(weatherData.feelsLike)}`;
    humidityElem.textContent = `Humidity: ${weatherData.humidity}%`;
    windSpeedElem.textContent = `Wind: ${weatherData.windSpeed}`;

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

    // Successfully fetched data, hide loader and show weather display
    loader.style.display = 'none';
    weatherDisplay.style.display = 'flex';
};

export default displayWeather;

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/getCoordinates.js
/**
 * Uses direct geocoding from Geocoding API to return latitude and longitude when
 * provided a city name.
 * https://openweathermap.org/api/geocoding-api
 */

const getCoordinates = async function getCoordinates(cityInput, apiKey) {
    const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=1&appid=${apiKey}`
    );
    const coordinates = await response.json();
    const lat = coordinates[0].lat;
    const lon = coordinates[0].lon;
    const city = coordinates[0].name;

    // Convert country code to country name
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    const country = regionNames.of(coordinates[0].country);

    return { lat, lon, city, country };
};

/* harmony default export */ const js_getCoordinates = (getCoordinates);

;// CONCATENATED MODULE: ./src/js/getWeather.js
/**
 * Returns current weather data of provided city using OpenWeather API.
 * https://openweathermap.org/current
 */



const apiKey = '89ab6f6729c23a478a56b4f4bbd36f45';

const getWeather = async function getWeather(cityInput, units) {
    const { lat, lon, city, country } = await js_getCoordinates(cityInput, apiKey);
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`
    );
    const weatherData = await response.json();
    const description = weatherData.weather[0].description;
    const weatherIcon = weatherData.weather[0].icon;
    const temperature = weatherData.main.temp;
    const feelsLike = weatherData.main.feels_like;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;
    return {
        city,
        country,
        description,
        weatherIcon,
        temperature,
        feelsLike,
        humidity,
        windSpeed,
    };
};

/* harmony default export */ const js_getWeather = (getWeather);

;// CONCATENATED MODULE: ./src/js/displayWeather.js


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
        weatherData = await js_getWeather(cityInput, units);
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

/* harmony default export */ const js_displayWeather = (displayWeather);

;// CONCATENATED MODULE: ./src/js/initSearchCityForm.js


const initSearchCityForm = function initializeSearchCityForm() {
    const cityInputField = document.querySelector('#city-input');
    const searchCityform = document.querySelector('#search-city');
    searchCityform.addEventListener('submit', (event) => {
        event.preventDefault();

        // Display error message if city input field is empty
        if (!cityInputField.value.trim().length) {
            const weatherDisplayError = document.querySelector(
                '#weather-display-error'
            );
            weatherDisplayError.style.display = 'initial';
            weatherDisplayError.textContent = 'Please enter a city.';
            return;
        }

        js_displayWeather(cityInputField.value);
        searchCityform.reset();
        cityInputField.blur();
    });
};

/* harmony default export */ const js_initSearchCityForm = (initSearchCityForm);

;// CONCATENATED MODULE: ./src/js/initUnitsToggler.js


const initUnitsToggler = function initializeUnitsToggler() {
    const unitsToggler = document.querySelector('#units-toggler');
    unitsToggler.addEventListener('click', () => {
        const city = document.querySelector('#city');
        js_displayWeather(city.textContent);
    });
};

/* harmony default export */ const js_initUnitsToggler = (initUnitsToggler);

;// CONCATENATED MODULE: ./src/js/initDom.js




const initDom = function initializeDom() {
    js_displayWeather('Toronto');
    js_initSearchCityForm();
    js_initUnitsToggler();
};

/* harmony default export */ const js_initDom = (initDom);

;// CONCATENATED MODULE: ./src/js/index.js



js_initDom();

/******/ })()
;
//# sourceMappingURL=main.js.map
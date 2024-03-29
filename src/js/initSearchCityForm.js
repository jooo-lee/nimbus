import displayWeather from './displayWeather';

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

        displayWeather(cityInputField.value);
        searchCityform.reset();
        cityInputField.blur();
    });
};

export default initSearchCityForm;

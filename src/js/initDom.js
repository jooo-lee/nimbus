import displayWeather from './displayWeather';

const initDom = function initializeDom() {
    displayWeather('Toronto', 'metric');

    const cityInputField = document.querySelector('#city-input');
    const searchBtn = document.querySelector('#search-btn');
    searchBtn.addEventListener('click', () => {
        displayWeather(cityInputField.value, 'metric').catch((error) =>
            console.error(error)
        );
    });

    const searchCityform = document.querySelector('#search-city');
    searchCityform.addEventListener('submit', (event) => {
        event.preventDefault();
        searchCityform.reset();
    });
};

export default initDom;

import getWeather from './getWeather';

const initDom = function initializeDom() {
    const cityInput = document.querySelector('#city-input');
    const searchBtn = document.querySelector('#search-btn');
    searchBtn.addEventListener('click', () => {
        getWeather(cityInput.value, 'metric')
            .then((response) => console.log(response))
            .catch((error) => console.error(error));
    });

    const searchCityform = document.querySelector('#search-city');
    searchCityform.addEventListener('submit', (event) => {
        event.preventDefault();
        searchCityform.reset();
    });
};

export default initDom;

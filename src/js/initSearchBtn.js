import displayWeather from './displayWeather';

const initSearchBtn = function initializeSearchButton() {
    const cityInputField = document.querySelector('#city-input');
    const searchBtn = document.querySelector('#search-btn');
    searchBtn.addEventListener('click', () => {
        displayWeather(cityInputField.value).catch((error) =>
            console.error(error)
        );
    });
};

export default initSearchBtn;

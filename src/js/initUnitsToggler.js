import displayWeather from './displayWeather';

const initUnitsToggler = function initializeUnitsToggler() {
    const unitsToggler = document.querySelector('#units-toggler');
    unitsToggler.addEventListener('click', () => {
        const city = document.querySelector('#city');
        displayWeather(city.textContent);
    });
};

export default initUnitsToggler;

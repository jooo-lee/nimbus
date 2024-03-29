import displayWeather from './displayWeather';
import initSearchCityForm from './initSearchCityForm';
import initUnitsToggler from './initUnitsToggler';

const initDom = function initializeDom() {
    displayWeather('Toronto');
    initSearchCityForm();
    initUnitsToggler();
};

export default initDom;

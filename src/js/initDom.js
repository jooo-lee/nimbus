import displayWeather from './displayWeather';
import initSearchBtn from './initSearchBtn';
import initSearchCityForm from './initSearchCityForm';
import initUnitsToggler from './initUnitsToggler';

const initDom = function initializeDom() {
    displayWeather('Toronto');
    initSearchCityForm();
    initSearchBtn();
    initUnitsToggler();
};

export default initDom;

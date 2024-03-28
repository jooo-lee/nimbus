const initSearchCityForm = function initializeSearchCityForm() {
    const searchCityform = document.querySelector('#search-city');
    searchCityform.addEventListener('submit', (event) => {
        event.preventDefault();
        searchCityform.reset();
    });
};

export default initSearchCityForm;

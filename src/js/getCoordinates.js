/**
 * Uses direct geocoding from Geocoding API to return latitude and longitude when
 * provided a city name.
 * https://openweathermap.org/api/geocoding-api
 */

const getCoordinates = async function getCoordinates(city, apiKey) {
    const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
    );
    const coordinates = await response.json();
    const lat = coordinates[0].lat;
    const lon = coordinates[0].lon;
    return { lat, lon };
};

export default getCoordinates;

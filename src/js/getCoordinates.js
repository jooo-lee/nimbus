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

export default getCoordinates;

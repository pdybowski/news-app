import { WEATHER_API_HOST, WEATHER_API_KEY } from './weather.config';

function getCurrentDayWeather(locationKey = 274663) {
    const apiCurrentDaysUrl = `${WEATHER_API_HOST}currentconditions/v1/${locationKey}?apikey=${WEATHER_API_KEY}`;
    return fetch(apiCurrentDaysUrl)
        .then(response => response.json())
        .catch(error => console.error(error));
}


function getFiveDayWeather(locationKey = 274663) {
    const apiFiveDaysUrl = `${WEATHER_API_HOST}forecasts/v1/daily/5day/${locationKey}?apikey=${WEATHER_API_KEY}&metric=true`;
    return fetch(apiFiveDaysUrl)
        .then(response => response.json())
        .catch(error => console.error(error));
}

function getCurrentLocationInfo(locationKey = 274663) {
    const apiFiveDaysUrl = `${WEATHER_API_HOST}locations/v1/${locationKey}?apikey=${WEATHER_API_KEY}`;
    return fetch(apiFiveDaysUrl)
        .then(response => response.json())
        .catch(error => console.error(error));
}

export default {
    getCurrentLocationInfo: function(locationKey) {
        return getCurrentLocationInfo(locationKey);
    },

    getCurrentDayWeather: function(locationKey) {
        return getCurrentDayWeather(locationKey);
    },
    getFiveDayWeather: function(locationKey) {
        return getFiveDayWeather(locationKey);
    },
};

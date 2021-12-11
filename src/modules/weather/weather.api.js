import { WEATHER_API } from '../../shared/environment';

function getCurrentDayWeather(locationKey = 274663) {
    const apiCurrentDaysUrl = `${WEATHER_API.API_BASE_URL}currentconditions/v1/${locationKey}?apikey=${WEATHER_API.API_KEY}`;
    return fetch(apiCurrentDaysUrl).then((response) => response.json());
}

function getFiveDayWeather(locationKey = 274663) {
    const apiFiveDaysUrl = `${WEATHER_API.API_BASE_URL}forecasts/v1/daily/5day/${locationKey}?apikey=${WEATHER_API.API_KEY}&metric=true`;
    return fetch(apiFiveDaysUrl).then((response) => response.json());
}

function getCurrentLocationInfo(locationKey = 274663) {
    const apiFiveDaysUrl = `${WEATHER_API.API_BASE_URL}locations/v1/${locationKey}?apikey=${WEATHER_API.API_KEY}`;
    return fetch(apiFiveDaysUrl).then((response) => response.json());
}

export default {
    getCurrentLocationInfo: function (locationKey) {
        return getCurrentLocationInfo(locationKey);
    },

    getCurrentDayWeather: function (locationKey) {
        return getCurrentDayWeather(locationKey);
    },
    getFiveDayWeather: function (locationKey) {
        return getFiveDayWeather(locationKey);
    },
};

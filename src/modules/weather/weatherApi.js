import { WEATHER_API } from '../../shared/environment';
import { API } from '../../shared';

export class WeatherApi extends API {
    constructor() {
        super(WEATHER_API.API_BASE_URL, WEATHER_API.API_KEY, null);
    }

    fetch(query) {
        return super.fetch(WEATHER_API.API_BASE_URL, null, `${query}apikey=${WEATHER_API.API_KEY}`);
    }

    getCurrentDayWeather(locationKey) {
        return this.fetch(`currentconditions/v1/${locationKey}?`);
    }

    getFiveDayWeather(locationKey) {
        return this.fetch(`forecasts/v1/daily/5day/${locationKey}?metric=true&`);
    }

    getCurrentLocationInfo(locationKey) {
        return this.fetch(`locations/v1/${locationKey}?`);
    }

    getCityList(query) {
        return this.fetch(`locations/v1/cities/autocomplete?q=${query}&`);
    }

    getKeyByGeolocation(lat, lon) {
        return this.fetch(
            `locations/v1/cities/geoposition/search?q=${lat}%2C${lon}&toplevel=true&`
        );
    }
}

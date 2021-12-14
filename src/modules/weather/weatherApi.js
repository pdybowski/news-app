import { WEATHER_API } from '../../shared/environment';
import { API } from '../../shared';
import spinner from '../../shared/spinner';

export class WeatherApi extends API {
    constructor() {
        super(WEATHER_API.API_BASE_URL, WEATHER_API.API_KEY, null);
    }

    fetch(query) {
        return super.fetch(WEATHER_API.API_BASE_URL, null, `${query}apikey=${WEATHER_API.API_KEY}`);
    }

    getCurrentDayWeather(locationKey) {
        spinner.showSpinner();
        return this.fetch(`currentconditions/v1/${locationKey}?`).finally(() =>
            spinner.hideSpinner()
        );
    }

    getFiveDayWeather(locationKey) {
        spinner.showSpinner();
        return this.fetch(`forecasts/v1/daily/5day/${locationKey}?metric=true&`).finally(() =>
            spinner.hideSpinner()
        );
    }

    getCurrentLocationInfo(locationKey) {
        spinner.showSpinner();
        return this.fetch(`locations/v1/${locationKey}?`).finally(() => spinner.hideSpinner());
    }

    getCityList(query) {
        return this.fetch(`locations/v1/cities/autocomplete?q=${query}&`);
    }
}

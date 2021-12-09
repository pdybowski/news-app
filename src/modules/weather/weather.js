import api from './weather.api';
import { createColumn, createRow } from '../../utils';

export class Weather {
    constructor() {
        this.viewElement = document.querySelector('#main');
    }

    async start() {
        try {
            await this._fetchData();
        } catch (error) {
            console.error(error);
        }
        this._createContainer();
    }

    async _fetchData() {
        this._fiveDayWeather = await api.getFiveDayWeather();
        this._currentDayWeather = await api.getCurrentDayWeather();
        this._currentLocationInfo = await api.getCurrentLocationInfo();
    }

    _createContainer() {
        this.container = document.createElement('div');
        this.viewElement.appendChild(this.container);
        this._createToday();
        this._createNextDays();
    }

    _createToday() {
        const currentDayDiv = createRow();
        this._createCurrentDayInfoIn(currentDayDiv);
        this._createCurrentDayWeatherIn(currentDayDiv);
        this.container.append(currentDayDiv);
    }

    _createCurrentDayInfoIn(parent) {
        const currentDayInfoDiv = document.createElement('div');
        this._createTitleIn(currentDayInfoDiv);
        this._createInfoContentIn(currentDayInfoDiv);
        parent.append(currentDayInfoDiv);
    }

    _createTitleIn(parent) {
        const title = document.createElement('h1');
        title.innerText = `Weather in ${this._currentLocationInfo.LocalizedName}`;
        parent.appendChild(title);
    }

    _createInfoContentIn(parent) {
        const infoContentDiv = document.createElement('div');
        infoContentDiv.innerText = this._fiveDayWeather.Headline.Text;
        parent.append(infoContentDiv);
    }

    _createCurrentDayWeatherIn(parent) {
        const currentDayWeatherDiv = document.createElement('div');

        const dailyForecast = this._fiveDayWeather.DailyForecasts[0];
        this._createWeatherElementIn(
            currentDayWeatherDiv,
            `${this._currentDayWeather[0].Temperature.Metric.Value}°C`,
            dailyForecast.Day.Icon,
            `↑ ${dailyForecast.Temperature.Maximum.Value}`,
            `↓ ${dailyForecast.Temperature.Minimum.Value}`,
            true
        );

        parent.append(currentDayWeatherDiv);
    }

    _createNextDays() {
        const nextDaysDiv = createRow();
        this._fiveDayWeather['DailyForecasts'].forEach((dailyData) => {
            const column = createColumn();
            this._createWeatherElementIn(
                column,
                new Date(dailyData.Date).getDay(),
                dailyData.Day.Icon,
                dailyData.Temperature.Maximum.Value,
                dailyData.Temperature.Minimum.Value
            );
            nextDaysDiv.append(column);
        });

        this.container.append(nextDaysDiv);
    }

    _createWeatherElementIn(
        parent,
        firstElement,
        icon,
        maxTemperature,
        minTemperature,
        isHorizontal = false
    ) {
        const weatherElement = isHorizontal ? createRow() : document.createElement('div');

        weatherElement.append(
            this._createFirstElementDiv(firstElement, isHorizontal),
            this._createWeatherIconDiv(icon, isHorizontal),
            this._createTemperatureRangeDiv(maxTemperature, minTemperature, isHorizontal)
        );

        parent.append(weatherElement);
    }

    _createTemperatureRangeDiv(maxTemperature, minTemperature, isHorizontal = false) {
        const temperatureRangeDiv = isHorizontal ? createColumn() : createRow();

        const maxTempDiv = this._createTempDiv(maxTemperature);
        maxTempDiv.classList.add('fw-bold');

        temperatureRangeDiv.append(maxTempDiv, this._createTempDiv(minTemperature));

        return temperatureRangeDiv;
    }

    _createTempDiv(temperature, isHorizontal = false) {
        const temperatureDiv = isHorizontal ? document.createElement('div') : createColumn();
        temperatureDiv.innerText = `${temperature}°C`;
        return temperatureDiv;
    }

    _createFirstElementDiv(value, isHorizontal = false) {
        const firstElementDiv = isHorizontal ? createColumn() : document.createElement('div');

        switch (value) {
            case 0:
                firstElementDiv.innerText = 'Sun';
                break;
            case 1:
                firstElementDiv.innerText = 'Mon';
                break;
            case 2:
                firstElementDiv.innerText = 'Tue';
                break;
            case 3:
                firstElementDiv.innerText = 'Wed';
                break;
            case 4:
                firstElementDiv.innerText = 'Thu';
                break;
            case 5:
                firstElementDiv.innerText = 'Fri';
                break;
            case 6:
                firstElementDiv.innerText = 'Sat';
                break;
            default:
                firstElementDiv.innerText = value;
                break;
        }

        return firstElementDiv;
    }

    _createWeatherIconDiv(icon, isHorizontal = false) {
        const weatherIconDiv = isHorizontal ? createColumn() : document.createElement('div');
        const img = document.createElement('img');
        img.src = `./content/img/weather/${icon}-s.png`;
        weatherIconDiv.appendChild(img);
        return weatherIconDiv;
    }
}

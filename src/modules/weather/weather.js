import api from './weather.api';
import { createColumn, createElement, createRow } from '../../utils';
import { Notification } from '../../shared';

export class Weather {
    constructor() {
        this._viewElement = document.querySelector('#main');
    }

    async start() {
        try {
            await this._fetchData();
        } catch (error) {
            new Notification().showError('Fetch weather data error', error);
        }
        this._createContainer();
    }

    async _fetchData() {
        this._fiveDayWeather = await api.getFiveDayWeather();
        this._currentDayWeather = await api.getCurrentDayWeather();
        this._currentLocationInfo = await api.getCurrentLocationInfo();
    }

    _createContainer() {
        this._container = createElement('div');
        this._viewElement.append(this._container);
        this._createToday();
        this._createNextDays();
    }

    _createToday() {
        const currentDayDiv = createRow();
        currentDayDiv.append(this._createCurrentDayInfo(), this._createCurrentDayWeatherIn());
        this._container.append(currentDayDiv);
    }

    _createCurrentDayInfo() {
        const currentDayInfoDiv = createElement('div');
        currentDayInfoDiv.append(this._createTitle(), this._createInfoContent());
        return currentDayInfoDiv;
    }

    _createTitle() {
        const title = createElement('h1');
        title.innerText = `Weather in ${this._currentLocationInfo.LocalizedName}`;
        return title;
    }

    _createInfoContent() {
        const infoContentDiv = createElement('div');
        infoContentDiv.innerText = this._fiveDayWeather.Headline.Text;
        return infoContentDiv;
    }

    _createCurrentDayWeatherIn() {
        const currentDayWeatherDiv = createElement('div');

        const dailyForecast = this._fiveDayWeather.DailyForecasts[0];

        currentDayWeatherDiv.append(
            this._createWeatherElement(
                `${this._currentDayWeather[0].Temperature.Metric.Value}°C`,
                dailyForecast.Day.Icon,
                `↑ ${dailyForecast.Temperature.Maximum.Value}`,
                `↓ ${dailyForecast.Temperature.Minimum.Value}`,
                true
            )
        );

        return currentDayWeatherDiv;
    }

    _createNextDays() {
        const nextDaysDiv = createRow();
        this._fiveDayWeather.DailyForecasts.forEach((dailyData) => {
            const column = createColumn();
            column.append(
                this._createWeatherElement(
                    new Date(dailyData.Date).getDay(),
                    dailyData.Day.Icon,
                    dailyData.Temperature.Maximum.Value,
                    dailyData.Temperature.Minimum.Value
                )
            );
            nextDaysDiv.append(column);
        });

        this._container.append(nextDaysDiv);
    }

    _createWeatherElement(
        firstElement,
        icon,
        maxTemperature,
        minTemperature,
        isHorizontal = false
    ) {
        const weatherElement = isHorizontal ? createRow() : createElement('div');

        weatherElement.append(
            this._createFirstElement(firstElement, isHorizontal),
            this._createWeatherIcon(icon, isHorizontal),
            this._createTemperatureRange(maxTemperature, minTemperature, isHorizontal)
        );

        return weatherElement;
    }

    _createTemperatureRange(maxTemperature, minTemperature, isHorizontal = false) {
        const temperatureRangeDiv = isHorizontal ? createColumn() : createRow();

        const maxTempDiv = this._createTemperature(maxTemperature);
        maxTempDiv.classList.add('fw-bold');

        temperatureRangeDiv.append(maxTempDiv, this._createTemperature(minTemperature));

        return temperatureRangeDiv;
    }

    _createTemperature(temperature, isHorizontal = false) {
        const temperatureDiv = isHorizontal ? createElement('div') : createColumn();
        temperatureDiv.innerText = `${temperature}°C`;
        return temperatureDiv;
    }

    _createFirstElement(value, isHorizontal = false) {
        const firstElementDiv = isHorizontal ? createColumn() : createElement('div');

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

    _createWeatherIcon(iconId, isHorizontal = false) {
        const weatherIconDiv = isHorizontal ? createColumn() : createElement('div');
        const img = createElement('img', {
            src: `./content/img/weather/${iconId}-s.png`,
        });
        weatherIconDiv.appendChild(img);
        return weatherIconDiv;
    }
}

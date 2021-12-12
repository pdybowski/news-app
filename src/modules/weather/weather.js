import { WeatherApi } from './weatherApi';
import { createColumn, createElement, createRow, isDefined } from '../../utils';
import { Modal, Notification } from '../../shared';

const WEATHER_COUNTRY_KEY = 'weather.country.id';

export class Weather {
    constructor() {
        this._viewElement = document.querySelector('#main');
        if (!isDefined(localStorage.getItem(WEATHER_COUNTRY_KEY))) {
            localStorage.setItem(WEATHER_COUNTRY_KEY, '274663');
        }
        this._api = new WeatherApi();
    }

    async start() {
        try {
            await this._fetchData();
        } catch (error) {
            new Notification().showError('Fetch weather data error', error);
        }
        this._createMainContainer();
        this._createSettingsContainer();
        this._createWeatherContainer();
    }

    async _fetchData() {
        this._fiveDayWeather = await this._api.getFiveDayWeather(
            localStorage.getItem(WEATHER_COUNTRY_KEY)
        );
        this._currentDayWeather = await this._api.getCurrentDayWeather(
            localStorage.getItem(WEATHER_COUNTRY_KEY)
        );
        this._currentLocationInfo = await this._api.getCurrentLocationInfo(
            localStorage.getItem(WEATHER_COUNTRY_KEY)
        );
    }

    _createMainContainer() {
        this._container = createElement('div');
        this._viewElement.append(this._container);
    }

    _createToday() {
        const currentDayDiv = createRow();
        currentDayDiv.append(this._createCurrentDayInfo(), this._createCurrentDayWeatherIn());
        this._weatherContainer.append(currentDayDiv);
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

        this._weatherContainer.append(nextDaysDiv);
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

    _createSettingsContainer() {
        const settings = new Modal('weatherModal', 'Weather settings', this._createSettingsBody());
        settings.create();
        const settingsButtonContainer = createElement('div', {
            class: 'row justify-content-end mt-1',
        });
        settingsButtonContainer.append(
            settings.createModalHandlerButton(
                { class: 'weather__settings btn btn-primary col-1' },
                null,
                'Settings'
            )
        );
        this._container.append(settingsButtonContainer);
    }

    _createSettingsBody() {
        this._settingsBody = createElement('div', { class: 'container' });
        this._createSettingsSearchForm();
        return this._settingsBody;
    }

    _createSettingsSearchForm() {
        this._setingsFormElement = createElement('form', {
            class: 'row',
        });

        this._createSearchCountryInput();
        this._createSearchCountrySaveButton();

        this._settingsBody.append(this._setingsFormElement);
    }

    _createSearchCountryInput() {
        const countrySearchContainer = createElement('div', { class: 'form-floating col ps-0' });
        this._countrySearchElement = createElement(
            'input',
            {
                class: 'form-control',
                list: 'datalistOptions',
                id: 'countrySearch',
                placeholder: 'Type to search...',
                value: localStorage.getItem(WEATHER_COUNTRY_KEY),
            },
            { keyup: () => this._getAutocompleteCityList() }
        );
        countrySearchContainer.append(this._countrySearchElement);
        countrySearchContainer.append(
            createElement(
                'label',
                {
                    for: 'countrySearch',
                },
                null,
                'Country ID'
            )
        );

        this._createSettingsDatalistElement(countrySearchContainer);
        this._setingsFormElement.append(countrySearchContainer);
    }

    _createSettingsDatalistElement(parent) {
        this._datalistElement = createElement('datalist', { id: 'datalistOptions' });
        parent.append(this._datalistElement);
    }

    async _getAutocompleteCityList() {
        this._datalistElement.innerHTML = '';
        if (this._countrySearchElement.value !== '') {
            const cityListData = await this._api.getCityList(this._countrySearchElement.value);
            cityListData.forEach((dataElement) => {
                const cityElement = createElement(
                    'option',
                    {
                        value: dataElement.Key,
                    },
                    null,
                    `${dataElement.LocalizedName}, ${dataElement.AdministrativeArea.LocalizedName}, ${dataElement.Country.LocalizedName}`
                );
                this._datalistElement.append(cityElement);
            });
        }
    }

    _createSearchCountrySaveButton() {
        this._setingsFormElement.append(
            createElement(
                'button',
                {
                    type: 'button',
                    class: 'btn btn-primary col-2',
                },
                {
                    click: async () => {
                        localStorage.setItem(WEATHER_COUNTRY_KEY, this._countrySearchElement.value);
                        await this._refreshWeatherContainer();
                    },
                },
                'Save'
            )
        );
    }

    async _refreshWeatherContainer() {
        try {
            await this._fetchData();
        } catch (error) {
            new Notification().showError('Fetch weather data error', error);
        }
        this._createWeatherContainer();
    }

    _createWeatherContainer() {
        if (isDefined(document.getElementById('weatherContainer'))) {
            this._container.removeChild(document.getElementById('weatherContainer'));
        }
        this._weatherContainer = createElement('div', { id: 'weatherContainer', class: 'row' });
        this._container.append(this._weatherContainer);
        this._createToday();
        this._createNextDays();
    }
}

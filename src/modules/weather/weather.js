import { WeatherApi } from './weatherApi';
import { createColumn, createElement, createRow, isDefined } from '../../utils';
import { Modal, Notification, Spinner } from '../../shared';
import { WEATHER_COUNTRY_KEY_LS } from './constants';

export class Weather {
    constructor() {
        this._viewElement = document.querySelector('#main');
        if (!isDefined(localStorage.getItem(WEATHER_COUNTRY_KEY_LS))) {
            localStorage.setItem(WEATHER_COUNTRY_KEY_LS, '274663');
        }
        this._api = new WeatherApi();
    }

    async start() {
        try {
            this._spinner = new Spinner();
            this._spinner.showSpinner();
            await this._fetchData();
            this._createMainContainer();
            this._createSettingsContainer();
            this._createWeatherContainer();
        } catch (error) {
            new Notification().showError('Fetch weather data error', error);
        } finally {
            this._spinner.removeSpinner();
        }
    }

    async _fetchData() {
        this._fiveDayWeather = await this._api.getFiveDayWeather(
            localStorage.getItem(WEATHER_COUNTRY_KEY_LS)
        );
        this._currentDayWeather = await this._api.getCurrentDayWeather(
            localStorage.getItem(WEATHER_COUNTRY_KEY_LS)
        );
        this._currentLocationInfo = await this._api.getCurrentLocationInfo(
            localStorage.getItem(WEATHER_COUNTRY_KEY_LS)
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
            class: 'd-flex justify-content-end mt-1',
        });
        const settingsButton = settings.createModalHandlerButton({ class: 'btn btn-secondary' });
        settingsButton.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">\n' +
            '  <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>\n' +
            '  <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>\n' +
            '</svg>';
        settingsButtonContainer.append(settingsButton);
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
                value: localStorage.getItem(WEATHER_COUNTRY_KEY_LS),
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
            try {
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
            } catch (error) {
                new Notification().showError('Fetch weather data error', error);
            }
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
                    click: this._updateWeatherConfiguration(),
                },
                'Save'
            )
        );
    }

    _updateWeatherConfiguration() {
        return async () => {
            localStorage.setItem(WEATHER_COUNTRY_KEY_LS, this._countrySearchElement.value);
            await this._refreshWeatherContainer();
        };
    }

    async _refreshWeatherContainer() {
        try {
            this._spinner = new Spinner();
            this._spinner.showSpinner('body');
            await this._fetchData();
            this._createWeatherContainer();
        } catch (error) {
            new Notification().showError('Fetch weather data error', error);
        } finally {
            this._spinner.removeSpinner();
        }
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

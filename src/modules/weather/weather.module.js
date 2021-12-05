import api from './weather.api';

export class Weather {
    constructor() {
        this.viewElement = document.querySelector('#main');
        this._start();
    }

    _start() {
        this._fiveDayWeather = api.getFiveDayWeather();
        this._currentDayWeather = api.getCurrentDayWeather();
        this._currentLocationInfo = api.getCurrentLocationInfo();
        this._createContainer();
    }

    _createContainer() {
        this.container = document.createElement('div');
        this.viewElement.appendChild(this.container);
        this._createToday();
        this._createNextDays();
    }

    _createToday() {
        const currentDayDiv = createRow();
        const fiveDayWeather = this._fiveDayWeather;
        const currentDayWeather = this._currentDayWeather;
        const currentLocationInfo = this._currentLocationInfo;
        const createWeatherElement = this._createWeatherElementIn;
        createCurrentDayInfoIn(currentDayDiv);
        createCurrentDayWeatherIn(currentDayDiv);
        this.container.append(currentDayDiv);

        function createCurrentDayInfoIn(parent) {
            const currentDayInfoDiv = document.createElement('div');
            createTitleIn(currentDayInfoDiv);
            createInfoContentIn(currentDayInfoDiv);
            parent.append(currentDayInfoDiv);

            function createTitleIn(parent) {
                const title = document.createElement('h1');
                currentLocationInfo.then(data => {
                    title.innerText = `Weather in ${data.LocalizedName}`;
                });
                parent.appendChild(title);
            }

            function createInfoContentIn(parent) {
                const infoContentDiv = document.createElement('div');
                fiveDayWeather.then(data => {
                    infoContentDiv.innerText = data.Headline.Text;
                });
                parent.append(infoContentDiv);
            }
        }

        function createCurrentDayWeatherIn(parent) {
            const currentDayWeatherDiv = document.createElement('div');

            fiveDayWeather.then(fiveDayData => {
                    const dailyForecast = fiveDayData.DailyForecasts[0];
                    currentDayWeather
                        .then(currentDayData =>
                            createWeatherElement(
                                currentDayWeatherDiv,
                                `${currentDayData[0].Temperature.Metric.Value}°C`,
                                dailyForecast.Day.Icon,
                                `↑ ${dailyForecast.Temperature.Maximum.Value}`,
                                `↓ ${dailyForecast.Temperature.Minimum.Value}`,
                                true,
                            ),
                        );
                },
            );

            parent.append(currentDayWeatherDiv);
        }
    }


    _createNextDays() {
        const nextDaysDiv = createRow();
        this._fiveDayWeather
            .then(data => data['DailyForecasts']
                .forEach(dailyData => {
                        const column = createColumn();
                        this._createWeatherElementIn(
                            column,
                            new Date(dailyData.Date).getDay(),
                            dailyData.Day.Icon,
                            dailyData.Temperature.Maximum.Value,
                            dailyData.Temperature.Minimum.Value,
                        );
                        nextDaysDiv.append(column);
                    },
                ));

        this.container.append(nextDaysDiv);
    }


    _createWeatherElementIn(parent, firstElement, icon, maxTemperature, minTemperature, isHorizontal = false) {

        const weatherElement = isHorizontal
            ? createRow()
            : document.createElement('div');

        weatherElement.append(
            createFirstElementDiv(firstElement),
            createWeatherIconDiv(icon),
            createTemperatureRangeDiv(maxTemperature, minTemperature),
        );

        parent.append(weatherElement);

        function createTemperatureRangeDiv(maxTemperature) {
            const temperatureRangeDiv = isHorizontal
                ? createColumn()
                : createRow();

            const maxTempDiv = createTempDiv(maxTemperature);
            maxTempDiv.classList.add('fw-bold');

            temperatureRangeDiv.append(
                maxTempDiv,
                createTempDiv(minTemperature),
            );

            return temperatureRangeDiv;

            function createTempDiv(temperature) {
                const temperatureDiv = isHorizontal
                    ? document.createElement('div')
                    : createColumn();
                temperatureDiv.innerText = `${temperature}°C`;
                return temperatureDiv;
            }
        }

        function createFirstElementDiv(value) {
            const firstElementDiv = isHorizontal
                ? createColumn()
                : document.createElement('div');

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

        function createWeatherIconDiv(icon) {
            const weatherIconDiv = isHorizontal
                ? createColumn()
                : document.createElement('div');
            const img = document.createElement('img');
            img.src = `./content/img/weather/${icon}-s.png`;
            weatherIconDiv.appendChild(img);
            return weatherIconDiv;
        }

    }
}


function createRow() {
    const row = document.createElement('div');
    row.classList.add('row');
    return row;
}


function createColumn() {
    const col = document.createElement('div');
    col.classList.add('col');
    return col;
}

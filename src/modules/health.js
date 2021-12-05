export class Health {
    constructor() {
        this.viewElement = document.querySelector('#main');

        this._start();
    }

    _start() {
        this._createTitle();
        this._createSubtitle();
        this._createSearchForm();
        this._createResultView();
    }

    _createTitle() {
        const title = document.createElement('h1');
        title.setAttribute('class', 'title');
        title.innerText = 'COVID-19 Pandemic';
        this.viewElement.appendChild(title);
    }

    _createSubtitle() {
        const subtitle = document.createElement('p');
        subtitle.setAttribute('class', 'subtitle');
        subtitle.innerText = 'Coronavirus cases and deaths by country';
        this.viewElement.appendChild(subtitle);
    }

    _createSearchForm() {
        const searchForm = document.createElement('div');
        const inputLocation = document.createElement('input');
        const searchLocation = document.createElement('button');

        searchForm.setAttribute('class', 'search-form');
        inputLocation.setAttribute('class', 'input-location');
        searchLocation.setAttribute('class', 'health-btn btn-dark');

        searchLocation.innerText = 'Search';
        // inputLocation.innerHTML = 'nnnn'; // nie działa, trzeba inaczej

        searchForm.append(inputLocation, searchLocation);
        this.viewElement.appendChild(searchForm);
    }

    _createResultView() {
        const searchResult = document.createElement('div');

        searchResult.setAttribute('class', 'search-result');
       
        searchResult.appendChild(this._createCountry());
        searchResult.appendChild(this._createCases());
        searchResult.appendChild(this._createDeaths());
        this.viewElement.appendChild(searchResult);
    }

    _createCountry() {
        const country = document.createElement('p');
        country.setAttribute('class', 'country');
        country.innerText = 'USA';
        return country;
    }

    _createCases() {
        const cases = document.createElement('p');
        cases.setAttribute('class', 'cases');
        cases.innerText = 'Cases: ' + '';
        return cases;
    }

    _createDeaths() {
        const deaths = document.createElement('p');
        deaths.setAttribute('class', 'deaths');
        deaths.innerText = 'Deaths: ' + '';
        return deaths;
    }
}

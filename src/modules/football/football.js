import { FootballApi } from './footballApi';
import { createElement } from '../../utils/createElement';
import { Notification, Spinner } from '../../shared';

import './football.css'

export class Sport {
    constructor() {
        this.mainBox = document.querySelector('#main');
        this._api = new FootballApi();
    }

    start() {
        this._fetchData();
        this._createHeader('Football Leagues!');
    }


    async _fetchData() {
        const spinner = new Spinner();
        try {
            spinner.showSpinner();
            const fetchedData = await this._api.getLeagues('leagues');
            const leaguesData = fetchedData.data
            this._createLeaguesContainer(leaguesData);
        } catch (error) {
            new Notification().showError('Fetch football data error', error);
            console.log(error)
        } finally {
            spinner.removeSpinner();
        }
    }

    _createHeader(text) {
        this._header = createElement('div', {
            class: 'football__header',
        });
        this._createTitle(text);
        this.mainBox.appendChild(this._header);
    }
    _createTitle(sectionTitle) {
        const title = createElement('h1', { class: 'football__title' }, null, sectionTitle);
        this._header.appendChild(title);
    }

    _createLeagueBox(fulllLagueName, imageSrc, elementID) {
        const leagueBox = createElement('div', {
            class: 'leagues__box p-2 bd-highlight d-flex flex-column justify-content-between rounded-3'
        });
        const logo = createElement('img', { class: 'leagues__box--image', src: imageSrc });
        const leagueName = createElement('p', { class: 'leagues__box--name text-center' });
        const button = createElement(
            'button',
            {
                id: elementID,
                class: 'leagues__box--button rounded-2',
            },
        );
        button.innerText = 'Check the table!';
        button.addEventListener('click', () => this._fetchDataForLeague(elementID))
        leagueName.innerText = fulllLagueName;
        leagueBox.appendChild(logo);
        leagueBox.appendChild(leagueName);
        leagueBox.appendChild(button);
        return leagueBox
    }

    async _fetchDataForLeague(elementID) {
        const spinner = new Spinner();
        try {
            spinner.showSpinner();
            this._clearMainBox()
            const fetchedLeagueData = await this._api.getSecificLeague(elementID);
            const leagueData = fetchedLeagueData.data
            console.log(leagueData)

            this._createOneLeagueContent(leagueData)
        } catch (error) {
            new Notification().showError('Fetch football league data error', error);
            console.log(error)
        } finally {
            spinner.removeSpinner();
        }
    }

    _clearMainBox(){
        this.mainBox.innerHTML = '';
    }

    _createLeagueHeader(data){
        this._createHeader(data.name);
        const leagueYear = createElement('p', { class: 'leagueHeader__season'});
        leagueYear.innerText = `Season: ${data.season}`;
        this.mainBox.appendChild(leagueYear);
    }

    _createOneLeagueContent(fetchedData){
        this._createLeagueHeader(fetchedData)
        this._createTableWithDetails()
    }

    _createTableWithDetails(fetchedData) {
        
    }

    _createLeaguesContainer(fetchedData) {
        const leaguesContainer = createElement('div', {
            class: 'leagues__container d-flex p-2 bd-highlight justify-content-between align-self-center'
        });

        for (const league of fetchedData) {
            const leagueBox = this._createLeagueBox(league.name, league.logos.light, league.id)
            leaguesContainer.appendChild(leagueBox);
        }

        this.mainBox.append(leaguesContainer);
    }
}

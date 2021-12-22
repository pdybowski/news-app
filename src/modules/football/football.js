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
        this._createHeader();
    }


    async _fetchData() {
        const spinner = new Spinner();
        try {
            spinner.showSpinner();
            const fetchedData = await this._api.getLeagues('leagues');
            const leaguesData = fetchedData.data
            console.log(leaguesData)
            this._createLeaguesContainer(leaguesData);
        } catch (error) {
            new Notification().showError('Fetch football data error', error);
            console.log(error)
        } finally {
            spinner.removeSpinner();
        }
    }

    _createHeader() {
        this._header = createElement('div', {
            class: 'row  football__header',
        });
        this._createTitle('Football Leagues!');
        this.mainBox.appendChild(this._header);
    }
    _createTitle(sectionTitle) {
        const title = createElement('h1', { class: 'football__title' }, null, sectionTitle);
        const column = createElement('div', {
            class: 'col-12 col-md-6 d-flex justify-content-md-start justify-content-center',
        });
        column.appendChild(title);
        this._header.appendChild(column);
    }

    _createMainContainer() {
        this.container = createElement('div', { class: 'football__main-container' });
        this.mainBox.append(this.container);
    }

    _createLeagueBox(fulllLagueName, imageSrc, elementID) {
        const id = elementID
        const leagueBox = createElement('div', { 
            class: 'leagues__box p-2 bd-highlight d-flex flex-column rounded-3' 
        });
        const logo = createElement('img', { class: 'leagues__box--image', src: imageSrc });
        const leagueName = createElement('p', { class: 'leagues__box--name text-center' });
        leagueName.innerText = fulllLagueName;
        leagueBox.appendChild(logo);
        leagueBox.appendChild(leagueName);
        return leagueBox
    }

    _createLeaguesContainer(fetchedData) {
        const leaguesContainer = createElement('div', { 
            class: 'leagues__container d-flex p-2 bd-highlight justify-content-between align-self-center' 
        });

        for (const league of fetchedData) {
            console.log(league.name, league.logos.light, league.id)
            const leagueBox = this._createLeagueBox(league.name, league.logos.light, league.id)
            leaguesContainer.appendChild(leagueBox);
        }

        this.mainBox.append(leaguesContainer);
    }
}

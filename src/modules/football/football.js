import { FootballApi } from './footballApi';
import { createElement } from '../../utils/createElement';
import { Notification, Spinner } from '../../shared';

export class Sport {
    constructor() {
        this.mainBox = document.querySelector('#main');
        this._api = new FootballApi();
    }

    start() {
        this._fetchData();
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

    _createMainContainer() {
        this.container = createElement('div', { class: 'football__main-container' });
        this.mainBox.append(this.container);
    }

    _createLeagueBox(fulllLagueName, imageSrc, elementID) {
        const id = elementID
        const leagueBox = createElement('div', { class: 'leagues__box' });
        const logo = createElement('img', { class: 'leagues__box--image', src: imageSrc });
        const leagueName = createElement('h2', { class: 'leagues__box--name' });
        leagueName.innerText = fulllLagueName;
        leagueBox.appendChild(logo);
        leagueBox.appendChild(leagueName);
        return leagueBox
    }

    _createLeaguesContainer(fetchedData) {
        const leaguesContainer = createElement('div', { class: 'Leagues__container' });

        for (const league of fetchedData) {
            console.log(league.name, league.logos.light, league.id)
            const leagueBox = this._createLeagueBox(league.name, league.logos.light, league.id)
            leaguesContainer.appendChild(leagueBox);
        }

        this.mainBox.append(leaguesContainer);
    }
}

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
            const leaguesData = await this._api.getLeagues();
            this._data = leaguesData.data;
            this._createLeaguesContainer(this._data);
        } catch (error) {
            new Notification().showError('Fetch weather data error', error);
        } finally {
            spinner.removeSpinner();
        }
    }

    _createMainContainer() {
        this.container = createElement('div', { class: 'football__main-container' });
        this.mainBox.append(this.container);
    }

    _createLeaguesContainer(fetchedData) {
        const leaguesContainer = createElement('div', { class: 'Leagues__container' });

        fetchedData.forEach((league) => {
            _createLeagueBox(league.name, league.logos.light, league.id)
        })

        this.mainBox.append(leaguesContainer);
    }

    _createLeagueBox(imageSrc, fulllLagueName) {
        const leagueBox = createElement('div', { class: 'leagues__box' });
        const logo = createElement('img', { class: 'leagues__box--image', src: imageSrc});
        const leagueName = createElement('h2', { class: 'leagues__box--name'});
        leagueName.innerText = fulllLagueName;
        leagueBox.append(logo, leagueName);
        this.leaguesContainer.append(leagueBox);
    }
}

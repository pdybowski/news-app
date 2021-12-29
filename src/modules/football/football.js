import { FootballApi } from './footballApi';
import { createElement } from '../../utils/createElement';
import { Notification, Spinner } from '../../shared';

import './football.css'

export class Sport {
    constructor() {
        this.mainBox = document.querySelector('#main');
        this.year = document.querySelectorAll('.leagueHeader__season--year');

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
        button.addEventListener('click', () => {
            this.mainBox.innerHTML = '';
            this._fetchDataForLeague(elementID)
        })
        leagueName.innerText = fulllLagueName;
        leagueBox.appendChild(logo);
        leagueBox.appendChild(leagueName);
        leagueBox.appendChild(button);
        return leagueBox
    }

    async _fetchDataForLeague(elementID, season = 2021) {
        const spinner = new Spinner();
        try {
            spinner.showSpinner();
            this._clearMainBox()
            const fetchedLeagueData = await this._api.getSecificLeague(elementID, season);
            const leagueData = fetchedLeagueData.data

            this._createOneLeagueContent(leagueData, elementID)
        } catch (error) {
            new Notification().showError('Fetch football league data error', error);
            console.log(error)
        } finally {
            spinner.removeSpinner();
        }
    }

    _clearMainBox() {
        return this.mainBox.innerHTML = '';
    }

    _createLeagueHeader(data, elementID) {
        console.log(data)
        this._createHeader(data.name);
        const seasonsList = createElement('span', { class: 'season__list' });
        const seasonsContainer = createElement('div', { class: 'season__container' });
        const leagueYear = createElement('ul', { class: 'leagueHeader__season' });
        const currentLeagueYear = createElement('li', { class: 'leagueHeader__season--year', elementID: '2021' });
        currentLeagueYear.innerText = '2021'
        leagueYear.appendChild(currentLeagueYear)

        const year2020 = createElement('li', { class: 'leagueHeader__season--year', elementID: '2020' });
        year2020.innerText = '2020'
        leagueYear.appendChild(year2020)
        const year2019 = createElement('li', { class: 'leagueHeader__season--year', elementID: '2019' });
        year2019.innerText = '2019'
        leagueYear.appendChild(year2019)
        const year2018 = createElement('li', { class: 'leagueHeader__season--year', elementID: '2018' });
        year2018.innerText = '2018'
        leagueYear.appendChild(year2018)


        seasonsList.innerText = 'Season:'
        seasonsContainer.appendChild(seasonsList)
        seasonsContainer.appendChild(leagueYear)
        this.mainBox.appendChild(seasonsContainer);

        document.querySelectorAll('.leagueHeader__season--year').forEach(year => {
            year.addEventListener('click', () => {
                let clickedYear = year.getAttribute('elementID');
                this._fetchDataForLeague(elementID, clickedYear)
            });
        });
    }

    _createOneLeagueContent(fetchedData, elementID) {
        this._createLeagueHeader(fetchedData, elementID);
        this._createArrowBack(() => addEventListener('click', () => {
            this.mainBox.innerHTML = '';
            this.start();
        }))
        this._createTableWithDetails(fetchedData);
    }

    _createTableHead() {
        const results = ['Club', 'Wins', 'Losses', 'Draws', 'Games Played', 'Points', 'Rank']
        const tableHead = createElement('thead', { class: 'league__tableHead' });
        const tr = createElement('tr');

        results.forEach((item) => {
            const th = createElement('th');
            th.innerText = item
            return tr.appendChild(th)
        })

        tableHead.appendChild(tr);
        return tableHead;
    }

    _createTableContent(data) {
        const tbody = createElement('tbody', { class: 'league__tableBody' });
        const clubsStats = data.standings

        for (const club of clubsStats) {
            const oneTableRow = createElement('tr');
            const clubName = createElement('td');
            const wins = createElement('td');
            const losses = createElement('td');
            const draws = createElement('td');
            const gamesPlayed = createElement('td');
            const points = createElement('td');
            const rank = createElement('td');

            clubName.innerText = club.team.name

            for (let oneStatistic of club.stats) {
                switch (oneStatistic.name) {
                    case 'wins':
                        wins.innerText = oneStatistic.value;
                    case 'losses':
                        losses.innerText = oneStatistic.value;
                    case 'ties':
                        draws.innerText = oneStatistic.value;
                    case 'gamesPlayed':
                        gamesPlayed.innerText = oneStatistic.value;
                    case 'points':
                        points.innerText = oneStatistic.value;
                    case 'rank':
                        rank.innerText = oneStatistic.value;
                    default:
                        break;
                }
            }

            oneTableRow.appendChild(clubName);
            oneTableRow.appendChild(wins);
            oneTableRow.appendChild(losses);
            oneTableRow.appendChild(draws);
            oneTableRow.appendChild(gamesPlayed);
            oneTableRow.appendChild(points);
            oneTableRow.appendChild(rank);


            tbody.appendChild(oneTableRow)
        }
        return tbody
    }

    _createTableWithDetails(fetchedData) {
        const tableContainer = createElement('div', { class: 'league__table-container' });
        const table = createElement('table', { class: 'league__table table table-success table-striped' });
        const tableHeader = this._createTableHead();
        const tableBody = this._createTableContent(fetchedData);

        table.appendChild(tableHeader);
        table.appendChild(tableBody);
        tableContainer.appendChild(table)

        this.mainBox.appendChild(tableContainer);
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

    _createArrowBack() {
        const arrowBackAnchor = createElement('a', {
            class: '',
            href: './#/football'
        });
        const arrowBack = createElement('i', {
            class: 'fas fa-long-arrow-alt-left bootstarp__icon--arrow',
        });

        
        arrowBackAnchor.appendChild(arrowBack)
        this.mainBox.appendChild(arrowBackAnchor);
    }
}

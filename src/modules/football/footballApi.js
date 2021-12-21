import { SPORT_API } from '../../shared/environment';
import { API } from '../../shared/api';

export class FootballApi extends API {
    constructor() {
        super(SPORT_API.API_BASE_URL, null, null);
    }

    fetch(query) {
        return super.fetch(SPORT_API.API_BASE_URL, null, `${query}`);
    }

    getLeagues(header) {
        return this.fetch(`${header}`);
    }

    getSecificLeague(leagueID, season = 2021) {
        return this.fetch(`/leagues/${leagueID}/standings?season=${season}&sort=asc`);
    }
};
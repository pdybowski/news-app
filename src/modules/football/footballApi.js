import { NEWS_API } from '../../shared/environment';
import { API } from '../../shared/api';

export class FootballApi extends API {
    constructor() {
        super(NEWS_API.API_BASE_URL, null, null);
    }

    fetch(query) {
        return super.fetch(NEWS_API.API_BASE_URL, null, ``);
    }

    getLeagues() {
        return this.fetch(`/leagues`);
    }

    getSecificLeague(leagueID, season = 2021) {
        return this.fetch(`/leagues/${leagueID}/standings?season=${season}&sort=asc`);
    }
};
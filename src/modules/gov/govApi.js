import { GOVERNMENT_API } from '../../shared/environment';
import { API } from '../../shared';
import { replacePolishAccents } from '../../utils/replacePolishAccents';

export class GovApi extends API {
    constructor() {
        super(GOVERNMENT_API.API_BASE_URL, null, null);
    }

    fetch(query) {
        return super.fetch(`${GOVERNMENT_API.API_BASE_URL}search?`, {
            method: GET,
        });
    }

    getItemByQuery(query) {
        replacePolishAccents(query);
        return this.fetch(`q=${query}&`);
    }

    paginate(page = 1, per_page = 10) {
        return this.fetch(`page=${page}&per_page=${per_page}`);
    }

    filterItemsByModel(query) {
        if (!query.includes(',')) {
            return this.fetch(`model=${query}&`);
        } else {
            return this.fetch(`model[terms]=${query}&`);
        }
    }

    sortQueryBy(type) {
        // title/date/views_count
        return this.fetch(`sort=${type}&`);
    }
}

import { NEWS_API } from '../../shared/environment';
import { API } from '../../shared/api';

export class NewsApi extends API {
    constructor() {
        super(NEWS_API.API_BASE_URL, NEWS_API.API_KEY, null);
    }

    fetch(query) {
        return super.fetch(NEWS_API.API_BASE_URL, null, `${query}&apiKey=${NEWS_API.API_KEY}`);
    }

    getTopNews(header) {
        return this.fetch(`${header}?language=en`);
    }

    getSearchedNews(keyword) {
        return this.fetch(`everything?language=en&q=${keyword}`);
    }
}

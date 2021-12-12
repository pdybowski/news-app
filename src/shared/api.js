export class API {
    constructor(baseUrl, apiKey, apiId) {
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
        this.apiId = apiId;
    }

    async fetch(url, options, query = '') {
        const response = await fetch(`${url}${query}`, options);

        if (response.ok) {
            return response.json();
        }

        return Promise.reject(response);
    }
}

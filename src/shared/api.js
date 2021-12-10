class API {
    constructor(apiUrl, apiKey, apiId) {
        this.apiUrl = baseUrl;
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

export class Jobs {
    constructor(){
        this.APP_ID = 07300533;
        this.APP_KEY = 'fadda830981b47b9ef3e023f82b349ca';
        this.URL = `https://api.adzuna.com/v1/api/jobs/pl/search/1?app_id=${this.APP_ID}&app_key=${this.APP_KEY}`;
        this.fetchedData;

        try{
            fetchingData(this.URL);
            this.fetchedData = data
            console.log(data)
        } catch {
            console.log(error)
        } 
    }

    async fetchingData(url) {
        const response = await fetch(url, {
            headers: {
              'Content-Type': 'application/json'
            },
          });
        const data = await response.json()
        return data
    }
}

export default Jobs
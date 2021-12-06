export class Jobs {
    constructor(){
        this.viewElement = document.querySelector('.view')
        this.APP_ID = 07300533;
        this.APP_KEY = 'fadda830981b47b9ef3e023f82b349ca';
        this.URL = `https://api.adzuna.com/v1/api/jobs/pl/search/1?app_id=${this.APP_ID}&app_key=${this.APP_KEY}`;
        this.fetchedData;
    }

    start(){
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

    _createJobItem(){
        const itemContainer = document.createElement('div');
        const additionalInfo = document.createElement('span');

        itemContainer.appendChild(itemHeader);
        itemContainer.appendChild(additionalInfo);
        itemContainer.appendChild(shortDescription);
    }

    _createJobHeader(){
        const itemHeader = document.createElement('h4');
        itemHeader.classList.add('jobs--header')
        itemHeader.innerText = 'Job opportunities';

        return itemHeader
    }

    _createJobDescription(){
        const shortDescription = document.createElement('p');
        shortDescription.classList.add('jobs--description')
        shortDescription.innerText = 'Check out the latest jobs in your area!';

        return shortDescription
    }
}

export default Jobs
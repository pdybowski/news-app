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
    
    _start(){
        this._createJobHeader('h2');
        this._createJobDescription();
        this._createJobItems();
    }

    _createJobItems(title, ){
        const itemContainer = document.createElement('div');
        
    }

    _createHeader(typeOfHeader){
        const sectionHeader = document.createElement(typeOfHeader);
        sectionHeader.classList.add('jobs--header')
        sectionHeader.innerText = 'Job opportunities';
        this.viewElement.appendChild(sectionHeader)
    }

    _createJobDescription(){
        const jobSectionDescription = document.createElement('p');
        jobSectionDescription.classList.add('jobs--description')
        jobSectionDescription.innerText = 'Check out the latest jobs in your area!';
        this.viewElement.appendChild(jobSectionDescription)
    }

    _createButton(){
        const jobButton = document.createElement('button');
        jobButton.classList.add('jobs--button')
        jobButton.innerText = 'Show more';
    }
}

export default Jobs
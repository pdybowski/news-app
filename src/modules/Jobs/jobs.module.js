export class Jobs {
    constructor(){
        this.viewElement = document.querySelector('.view')
        this.APP_ID = '07300533';
        this.APP_KEY = 'fadda830981b47b9ef3e023f82b349ca';
        this.URL = `https://api.adzuna.com/v1/api/jobs/pl/search/1?app_id=${this.APP_ID}&app_key=${this.APP_KEY}`;
        this.fetchedData;
        this.fetchError;
    }

    _render(){
        fetch(this.URL)
        .then(response => response.json())
        .then(data => this.fetchedData = data.results)
        .catch(error => this.fetchError = error);
    
        this._start(this.fetchedData)
    }

    
    _start(data){
        this._createJobHeader('h2', 'Job opportunities');
        this._createJobText('Check out the latest jobs in your area!');
        // this._createJobItems();

        for (item of data){
            return <h1>{item}</h1>
        }
    }

    _createJobItems(title, company, min, max, link){
        const itemContainer = document.createElement('div');
        const JobTitle = this._createJobHeader('h4', title);
        const companyName = this._createJobText(company);
        const salaryRange = this._createSalaryBox(min, max)
        const button =  _createButton(link)

        itemContainer.appendChild(JobTitle);
        itemContainer.appendChild(companyName);
        itemContainer.appendChild(salaryRange);
        itemContainer.appendChild(salaryRange);
        itemContainer.appendChild(button);
    }

    _createHeader(typeOfHeader, text){
        const sectionHeader = document.createElement(typeOfHeader);
        sectionHeader.classList.add('jobs--header')
        sectionHeader.innerText = text;
        this.viewElement.appendChild(sectionHeader)
    }

    _createJobText(text){
        const jobSectionDescription = document.createElement('p');
        jobSectionDescription.classList.add('jobs--description')
        jobSectionDescription.innerText = text;
        this.viewElement.appendChild(jobSectionDescription)
    }

    _createSalaryBox(minSalaryRange, maxSalaryRange){
        const salaryBox = document.createElement('div');
        const salaryRangeInfo = document.createElement('span');

        salaryRangeInfo.innerText = `Min. Salary: ${minSalaryRange} || Max. Salary: ${maxSalaryRange}`;
        salaryBox.appendChild(salaryRangeInfo);
    }

    _createButton(){
        const jobButton = document.createElement('button');
        jobButton.classList.add('jobs--button')
        jobButton.innerText = 'Show more';
    }
}

const test = new Jobs();
test._render()
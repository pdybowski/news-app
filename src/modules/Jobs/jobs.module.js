export class Jobs {
    constructor() {
        this.viewElement = document.querySelector('.view')
        this.APP_ID = '07300533';
        this.APP_KEY = 'fadda830981b47b9ef3e023f82b349ca';
        this.URL = `https://api.adzuna.com/v1/api/jobs/pl/search/1?app_id=${this.APP_ID}&app_key=${this.APP_KEY}`;
        this.fetchedData;
        this.fetchError;

        this._fetchData()
    }

    _fetchData() {
        fetch(this.URL)
            .then(response => response.json())
            .then(data => this._renderContent(data.results))
            .catch(error => this.fetchError = error);
    }


    _renderContent(data) {
        const containerWithJobOffers = document.createElement('div');
        this._createHeader('h2', 'Job opportunities');
        this._createJobText('Check out the latest jobs in your area!');
        const jobOffers = data

        console.log(jobOffers)

        jobOffers.forEach((job) => {
            // this._createJobItems(job)
            const offerBox = document.createElement('div');
            offerBox.classList.add('offer--container');
            const offerHeader = document.createElement('h4');
            const offerCompanyName = document.createElement('p');
            const offerLocalization = document.createElement('p');
            const offerSalary = document.createElement('span');
            let minSalary = job.salary_min ? job.salary_min : 'unknow';
            let maxSalary = job.salary_max ? job.salary_max : 'unknow';

            offerHeader.innerText =  job.title ? job.title : 'No title for this role';
            offerCompanyName.innerText =  job.company.display_name ? job.company.display_name : null;
            offerLocalization.innerText = job.location.display_name ? job.location.display_name : 'Location unknown';
            offerSalary.innerText = `min. salary: ${minSalary} || max. salary: ${maxSalary}`;
        
            offerBox.appendChild(offerHeader);
            offerBox.appendChild(offerCompanyName);
            offerBox.appendChild(offerLocalization);
            offerBox.appendChild(offerSalary);
            containerWithJobOffers.appendChild(offerBox);
        })

        this.viewElement.appendChild(containerWithJobOffers)
    }

    // _createJobItems(item) {
    //     const offerBox = document.createElement('div');
    //     const offerHeader = document.createElement('h4');
    //     const offerDescription = document.createElement('p');
 
    //     offerHeader.innerText =  item.title ? item.title : 'No title for this role';
    //     offerDescription.innerText = item.location.display_name ? item.location.display_name : 'Location unknown';
    
    //     offerBox.appendChild(offerHeader);
    //     offerBox.appendChild(offerDescription);

    //     return offerBox
    // }

    _createHeaderElement(typeOfHeader, text) {
        const itemHeader = document.createElement(typeOfHeader);
        itemHeader.classList.add('item--header')
        itemHeader.innerText = text;
        return itemHeader
    }

    _createHeader(typeOfHeader, text) {
        const sectionHeader = document.createElement(typeOfHeader);
        sectionHeader.classList.add('jobs--header')
        sectionHeader.innerText = text;
        this.viewElement.appendChild(sectionHeader)
    }

    _createJobTextElement(text) {
        const jobDescription = document.createElement('p');
        jobDescription.classList.add('job--description')
        jobDescription.innerText = text;
        return jobDescription
    }

    _createJobText(text) {
        const jobSectionDescription = document.createElement('p');
        jobSectionDescription.classList.add('jobs--description')
        jobSectionDescription.innerText = text;
        this.viewElement.appendChild(jobSectionDescription)
    }

    _createSalaryBox(minSalaryRange, maxSalaryRange) {
        const salaryBox = document.createElement('div');
        const salaryRangeInfo = document.createElement('span');

        salaryRangeInfo.innerText = `Min. Salary: ${toString(minSalaryRange)} || Max. Salary: ${toString(maxSalaryRange)}`;
        salaryBox.appendChild(salaryRangeInfo);

        return salaryBox
    }

    _createButton() {
        const jobButton = document.createElement('button');
        jobButton.classList.add('jobs--button')
        jobButton.innerText = 'Show more';
        return jobButton
    }
}
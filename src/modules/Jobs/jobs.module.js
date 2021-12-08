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
        containerWithJobOffers.classList.add('jobOffers--container');
        this._createHeader('h2', 'Job opportunities');
        this._createJobText('Check out the latest jobs in your area!');
        const jobOffers = data

        jobOffers.forEach((job) => {
            const offerBox = document.createElement('div');
            offerBox.classList.add('jobOffers__offerBox', 'position-relative', 'shadow', 'p-3', 'mb-5', 'bg-light', 'rounded');
            const offerHeader = document.createElement('h4');
            offerHeader.classList.add('fs-4')
            const offerCompanyName = document.createElement('p');
            const offerLocalization = document.createElement('p');
            offerLocalization.classList.add('fw-light')
            const offerSalary = document.createElement('span');
            offerSalary.classList.add('fw-light')
            const button = document.createElement('a');
            button.setAttribute('href', job.redirect_url)
            button.setAttribute('target', '_blank')
            button.classList.add('jobOffers__offerBox--button', 'position-absolute', 'bottom-0', 'start-50', 'translate-middle-x')
            button.innerText = 'Show more!';
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
            offerBox.appendChild(button);
            containerWithJobOffers.appendChild(offerBox);
        })

        this.viewElement.appendChild(containerWithJobOffers)
    }

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
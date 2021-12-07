export class Jobs {
    constructor(){
        this.viewElement = document.querySelector('.view')
        this.APP_ID = '07300533';
        this.APP_KEY = 'fadda830981b47b9ef3e023f82b349ca';
        this.URL = `https://api.adzuna.com/v1/api/jobs/pl/search/1?app_id=${this.APP_ID}&app_key=${this.APP_KEY}`;
        this.fetchedData;
        this.fetchError;

        this._render()
    }

    _render(){
        fetch(this.URL)
        .then(response => response.json())
        .then(data => this._start(data.results))
        .catch(error => this.fetchError = error);
    }

    
    _start(data){
        this._createHeader('h2', 'Job opportunities');
        this._createJobText('Check out the latest jobs in your area!');
        const jobOffers = data
        console.log(jobOffers)

        for(const jobOffer of jobOffers){
            // console.log(jobOffer.title);
            // console.log(jobOffer.company.display_name);
            // console.log(jobOffer.salary_max);
            // console.log(jobOffer.salary_min);
            // console.log(jobOffer.redirect_url);
            this._createJobItems(jobOffer)
        }
    }

    _createJobItems(item){
        const {title, company, salary_max, salary_min, redirect_url} = item;

        const itemContainer = document.createElement('div');

        const JobTitle = this._createHeaderElement('h4', title);
        const companyName = this._createJobTextElement(company.display_name);
        const salaryRange = this._createSalaryBox(salary_min, salary_max)
        const button =  _createButton(redirect_url)

        itemContainer.appendChild(JobTitle);
        itemContainer.appendChild(companyName);
        itemContainer.appendChild(salaryRange);
        itemContainer.appendChild(salaryRange);
        itemContainer.appendChild(button);

        this.viewElement.appendChild(itemContainer)
    }

    _createHeaderElement(typeOfHeader, text){
        const itemHeader = document.createElement(typeOfHeader);
        itemHeader.classList.add('item--header')
        itemHeader.innerText = text;
        return itemHeader
    }

    _createHeader(typeOfHeader, text){
        const sectionHeader = document.createElement(typeOfHeader);
        sectionHeader.classList.add('jobs--header')
        sectionHeader.innerText = text;
        return sectionHeader
    }

    _createJobTextElement(text){
        const jobDescription = document.createElement('p');
        jobDescription.classList.add('job--description')
        jobDescription.innerText = text;
        return jobDescription
    }

    _createJobText(text){
        const jobSectionDescription = document.createElement('p');
        jobSectionDescription.classList.add('jobs--description')
        jobSectionDescription.innerText = text;
        return jobSectionDescription
    }

    _createSalaryBox(minSalaryRange, maxSalaryRange){
        const salaryBox = document.createElement('div');
        const salaryRangeInfo = document.createElement('span');

        salaryRangeInfo.innerText = `Min. Salary: ${minSalaryRange} || Max. Salary: ${maxSalaryRange}`;
        salaryBox.appendChild(salaryRangeInfo);

        return salaryBox
    }

    _createButton(){
        const jobButton = document.createElement('button');
        jobButton.classList.add('jobs--button')
        jobButton.innerText = 'Show more';
        return jobButton
    }
}
export class Home {
    constructor() {
        this.viewElement = document.querySelector('#main');

        this.start();
    };

    start() {
        this._createContent()
        this._timer()
    };

    _createContent() {
        const mainContainer = document.createElement('div');
        const header = document.createElement('h1');
        const content = document.createElement('p');

        this.mainContainer.className.add("view container-lg");
        this.header.className.add("view__header view__text--color h1");
        this.content.className.add("view__textContent view__text--color display-6");

        this.viewElement.appendChild(mainContainer);
        this.viewElement.appendChild(header);
        this.viewElement.appendChild(content);

        return this.mainContainer;
    }

    _timer() {
        setInterval(() => {
            this.fullDate = new Date();
            this.day = String(this.fullDate.getDate()).padStart(2, '0');
            this.month = String(this.fullDate.getMonth()).padStart(2, '0');
            this.year = this.fullDate.getFullYear();
            this.hour = String(this.fullDate.getHours()).padStart(2, '0');
            this.minutes = String(this.fullDate.getMinutes()).padStart(2, '0');
            this.sec = String(this.fullDate.getSeconds()).padStart(2, '0');
            this.mainContainer.innerText = `Dziś jest ${this.day}.${this.month}.${this.year}r. \n Godzina ${this.hour}:${this.minutes}:${this.sec}`;
        }, 1000);
    }
};

export default Home
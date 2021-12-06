export class Home {
    constructor() {
        this.viewElement = document.querySelector('#main');

        this.start();
    }

    start() {
        this._createContent();
        this._timer();
    }

    _createContent() {
        this.mainContainer = document.createElement('div');
        this.header = document.createElement('h1');

        this.mainContainer.classList.add("view", "container-lg");
        this.header.classList.add("view__header", "view__text--color", "h1");
        this.header.innerText = "Hi 👋🏼 It's good to see you here!";

        this.mainContainer.appendChild(this.header);
        this.viewElement.appendChild(this.mainContainer);
    }

    _createTimeText() {
        this.content = document.createElement('p');
        this.content.classList.add('view__textContent', 'view__text--color', 'display-6');
        this.mainContainer.appendChild(this.content);
    }

    _timer() {
        this._createTimeText();

        setInterval(() => {
            this.fullDate = new Date();
            this.day = String(this.fullDate.getDate()).padStart(2, '0');
            this.month = String(this.fullDate.getMonth() + 1).padStart(2, '0');
            this.year = this.fullDate.getFullYear();
            this.hour = String(this.fullDate.getHours()).padStart(2, '0');
            this.minutes = String(this.fullDate.getMinutes()).padStart(2, '0');
            this.sec = String(this.fullDate.getSeconds()).padStart(2, '0');
            this.content.innerText = `Today is ${this.day}.${this.month}.${this.year} \n Hour: ${this.hour}:${this.minutes}:${this.sec}`;
        }, 1000);
    }
}

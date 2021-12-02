export class Home {
    constructor() {
        this.textElement = document.querySelector('.view__textContent');
    
        this.start();
    };

    start() {
        setInterval(() => {
            this.fullDate = new Date();
            this.day = String(this.fullDate.getDate()).padStart(2, '0');
            this.month = this.fullDate.getMonth();
            this.year = this.fullDate.getFullYear();
            this.hour = this.fullDate.getUTCHours();
            this.minutes = this.fullDate.getMinutes();
            this.sec = this.fullDate.getSeconds();
            this.textElement.innerText = `Dziś jest ${this.day}.${this.month}.${this.year}r. \n Godzina ${this.hour}:${this.minutes}:${this.sec}`;
        }, 1000);
    };

};

export default Home
// import Home from './JSmodules/Home'

export default class Home {
    constructor() {
        this.textElement = document.querySelector('.view__textContent')
        this.fullDate = new Date();
        this.day = String(this.fullDate.getDate()).padStart(2, '0');
        this.month = this.fullDate.getMonth()
        this.year = this.fullDate.getFullYear();
        this.hour = this.fullDate.getUTCHours();
        this.minutes = this.fullDate.getMinutes();
        this.seconds = this.fullDate.getSeconds();

        this.outputDate = `Dziś jest ${this.day}.${this.month}.${this.year}r. \n Godzina ${this.hour}:${this.minutes}:${this.seconds}`
    }

    start() {
        setInterval(() => {
            this.textElement.innerText = this.outputDate
        }, 1000)
    }

    test(){
        console.log(`${this.fullDate}`)
    }
}
const homePageUpdate = new Home()
homePageUpdate.start()
homePageUpdate.test()
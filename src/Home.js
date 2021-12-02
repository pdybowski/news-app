export default class Home {
    constructor() {
        this.fullDate = new Date();
        this.day = String(fullDate.getDate()).padStart(2, '0');
        this.year = fullDate.getFullYear();
        this.hour = fullDate.getUTCHours();
        this.outputDate = `Dziś jest ${day}.${year}r. '\n' Godzina ${hour}`
    }

    
}
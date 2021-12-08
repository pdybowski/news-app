import { Home, News } from './modules';
import Router from './shared/router';

export default class App {
    constructor() {
        this.router = new Router();
        this.router.addRoute('/', new Home());
        this.router.addRoute('/#/news', new News());
        console.log(this.router);
    }
}

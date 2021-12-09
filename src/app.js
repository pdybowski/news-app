import { Home, News } from './modules';
import Router from './modules/shared/router';

export default class App {
    constructor() {
        this._startNav();
    }

    _startNav() {
        this.router = new Router();
        this.router.addRoute('/', new Home());
        this.router.addRoute('/news', new News());
        this.router.start();
    }
}

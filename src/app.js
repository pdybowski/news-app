import { Health, Home, News, Sport, Weather } from './modules';
import Router from './modules/shared/router';
import { Spinner } from './shared';

export default class App {
    constructor() {
        this._startNav();
    }

    _startNav() {
        this.router = new Router();
        this.router.addRoute('/', new Home());
        this.router.addRoute('/weather', new Weather());
        this.router.addRoute('/football', new Sport());
        this.router.addRoute('/news', new News());
        this.router.addRoute('/health', new Health());
        this.router.start();
    }
}

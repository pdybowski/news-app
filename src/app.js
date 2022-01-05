import { Home, News, Sport, Weather, Government } from './modules';
import { BurgerMenu } from './shared/burgermenu/burger';
import { checkMobile } from './utils/checkMobile';
import Router from './modules/shared/router';

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
        this.router.addRoute('/gov', new Government());
        this.router.start();
        checkMobile() ? new BurgerMenu()._start() : null;
    }
}

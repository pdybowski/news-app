import { Home, News, Sport, Weather } from './modules';
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
        this.router.start();
        this._displayMobileMenu();
    }

    _handleClick() {
        const hamburger = document.querySelector('.hamburger');
        hamburger.classList.toggle('hamburger--active');

        const ul = document.querySelector('#myTopnav');
        ul.classList.toggle('responsive');
    }

    _displayMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        hamburger.addEventListener('click', this._handleClick);

        const links = document.querySelectorAll('.mobile--hidden');
        links.forEach((link) => link.addEventListener('click', this._handleClick));
    }
}

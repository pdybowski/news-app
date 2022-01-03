import { createElement } from '../../utils/createElement';
import './burger.css';

export class BurgerMenu {
    constructor() {
        this.wrapper = document.querySelector('.wrapper');
    }

    _start() {
        this._createBurgerMenu();
        this._displayMobileMenu();
    }

    _createBurgerMenu() {
        const hamburger = createElement('button', { class: 'hamburger' });

        const hamburger_box = createElement('span', { class: 'hamburger__box' });
        const hamburger_inner = createElement('span', { class: 'hamburger__inner' });
        hamburger_box.appendChild(hamburger_inner);

        hamburger.appendChild(hamburger_box);
        this.wrapper.appendChild(hamburger);
    }

    _handleClick() {
        const hamburger = document.querySelector('.hamburger');
        hamburger.classList.toggle('hamburger--active');

        const ul = document.querySelector('ul.nav--list');
        ul.classList.toggle('responsive');
    }

    _displayMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        hamburger.addEventListener('click', this._handleClick);

        const links = document.querySelectorAll('li');
        const number = links.length - 1;
        for (let i = number; i > 0; i--) {
            links[i].addEventListener('click', this._handleClick);
        }
    }
}

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
        const hamburger = createElement('button', {
            class: 'hamburger',
            title: 'burger menu button',
        });

        const hamburger_box = createElement('span', { class: 'hamburger__box' });
        const hamburger_inner = createElement('span', { class: 'hamburger__inner' });
        hamburger_box.appendChild(hamburger_inner);

        hamburger.appendChild(hamburger_box);
        this.wrapper.appendChild(hamburger);

        const link = document.querySelector('.nav--item__link');
        const logo = createElement('img', {
            class: 'home__icon',
            //src: './content/img/favicon.ico',
            src: 'https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/000000/external-news-news-kiranshastry-gradient-kiranshastry.png',
            alt: 'news logo',
        });
        link.innerText = '';
        link.appendChild(logo);
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

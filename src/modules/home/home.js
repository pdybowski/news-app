import './home.css';
import { createElement, createRow } from '../../utils';

export class Home {
    constructor() {
        this.viewElement = document.querySelector('#main');
    }

    start() {
        this._createContent();
        this._timer();
    }

    _createContent() {
        this.mainContainer = document.createElement('div');
        this.header = document.createElement('h1');

        this.mainContainer.classList.add('view', 'container-lg');
        this.header.classList.add('view__header', 'view__text--color', 'h1');
        this.header.innerText = `Hi 👋🏼 It's good to see you here!`;

        this.mainContainer.appendChild(this.header);
        this.viewElement.appendChild(this.mainContainer);

        this._createInfoAndPeopleContainer();
    }

    _createTimeText() {
        this.content = document.createElement('p');
        this.content.classList.add('view__textContent', 'view__text--color', 'display-6');
        this.mainContainer.appendChild(this.content);
    }

    _timer() {
        this._createTimeText();

        setInterval(() => {
            this.fullDate = new Date();
            this.day = String(this.fullDate.getDate()).padStart(2, '0');
            this.month = String(this.fullDate.getMonth() + 1).padStart(2, '0');
            this.year = this.fullDate.getFullYear();
            this.hour = String(this.fullDate.getHours()).padStart(2, '0');
            this.minutes = String(this.fullDate.getMinutes()).padStart(2, '0');
            this.sec = String(this.fullDate.getSeconds()).padStart(2, '0');
            this.content.innerText = `Today is ${this.day}.${this.month}.${this.year} \n Hour: ${this.hour}:${this.minutes}:${this.sec}`;
        }, 1000);
    }

    _createInfoAndPeopleContainer() {
        const loremIpsum =
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
        const infoAndPeopleContainer = createElement('div', { class: 'min-vh-100' });

        infoAndPeopleContainer.append(
            this._createQuickInfoContainer(loremIpsum),
            this._createPeopleSection(loremIpsum)
        );
        this.viewElement.append(infoAndPeopleContainer);
    }

    _createPeopleSection(loremIpsum) {
        const peopleSection = createElement('div', { class: 'py-5' });
        this.firstRow = createRow();
        this.firstRow.append(
            this._createHomeCard('Piotr Dybowski', 'Mentor', loremIpsum),
            this._createHomeCard('Justyna Gładysz', 'Team Member', loremIpsum),
            this._createHomeCard('Filip Kaczmarek', 'Team Member', loremIpsum)
        );
        this.secondRow = createRow();
        this.secondRow.append(
            this._createHomeCard('Tomasz Prządka', 'Team Member', loremIpsum, 6),
            this._createHomeCard('Patrycja Starzec', 'Team Member', loremIpsum, 6)
        );
        peopleSection.append(this.firstRow, this.secondRow);
        return peopleSection;
    }

    _createHomeCard(name, role, quote, col = 4) {
        const column = createElement('div', {
            class: `col-lg-${col} d-flex justify-content-center`,
        });
        const homeCard = createElement('div', { class: 'home__card' });

        const homeCardFaceFront = createElement('div', { class: 'home__card-face front-face' });
        const userIcon = createElement('i', { class: 'fas fa-user-circle fa-7x' });
        const userName = createElement(
            'div',
            { class: 'pt-3 text-uppercase name' },
            null,
            `${name}`
        );
        const userRole = createElement('div', { class: 'home__card-face__role' }, null, `${role}`);
        homeCardFaceFront.append(userIcon, userName, userRole);

        const homeCardFaceBack = createElement('div', { class: 'home__card-face back-face' });
        const quoteIconLeft = createElement('i', { class: 'fas fa-quote-left' });
        const quoteElement = createElement('div', null, null, `${quote}`);
        const quoteIconRight = createElement('i', { class: 'fas fa-quote-right' });
        homeCardFaceBack.append(quoteIconLeft, quoteElement, quoteIconRight);

        homeCard.append(homeCardFaceFront, homeCardFaceBack);

        column.append(homeCard);
        return column;
    }

    _createQuickInfoContainer(loremIpsum) {
        const quickInfoContainer = createElement('div', {
            class: 'home__infoElement p-5 m-5',
        });
        const quickInfoHeader = createElement(
            'h2',
            { class: 'text-center border-bottom pb-3' },
            null,
            'About'
        );
        const quickInoContent = createElement('div', { class: 'pt-4' }, null, `${loremIpsum}`);
        quickInfoContainer.append(quickInfoHeader, quickInoContent);
        return quickInfoContainer;
    }
}

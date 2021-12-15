import { NewsApi } from './newsApi';
import { Notification } from '../../shared/notifications/notifications';
import { createElement } from '../../utils/createElement';

export class News {
    constructor() {
        this.viewElement = document.querySelector('#main');
        this._api = new NewsApi();
        this.start();
    }

    async start() {
        try {
            await this._fetchData();
            this._createTitle();
            this._createForm();
        } catch (error) {
            new Notification().showError('Fetch news data error', error);
        }
    }

    async _fetchData() {
        this._topNews = await this._api.getTopNews('top-headlines').then((response) => {
            let main = this._createContainer();
            let data = response.articles;
            data.forEach((article) => {
                console.log(article);
                main.appendChild(this._createCard(article));
            });
        });
    }

    async _searchData(keyword) {
        this._searchNews = await this._api.getSearchedNews(keyword).then((response) => {
            let main = this._createContainer();
            let data = response.articles;
            data.forEach((article) => {
                console.log(article);
                main.appendChild(this._createCard(article));
            });
        });
    }

    _createTitle() {
        this._title = createElement('h1', { class: 'news__title' }, null, 'The News');
        this.viewElement.appendChild(this._title);
    }

    _searchKeyword() {
        let newKeyword = document.querySelector('.news__input').value;
        let container = document.querySelector('.news__container');
        if (container && newKeyword) {
            this.viewElement.removeChild(container);
            this._searchData(newKeyword);
        }
    }

    _createForm() {
        this._form = createElement('form', { class: 'news__form' });
        this._form.append(
            this._createLabel(),
            this._createInput(),
            this._createButton('news__search--button', 'search', {
                click: this._searchKeyword.bind(this),
            })
        );
        this.viewElement.appendChild(this._form);
    }

    _createLabel() {
        this._label = createElement('label', { for: 'news__label' });
        return this._label;
    }

    _createInput() {
        this._input = createElement('input', {
            type: 'text',
            id: 'news',
            name: 'news',
            class: 'news__input',
        });
        return this._input;
    }

    _createInputButton() {
        const inputButton = this._createButton('news__search--button', 'search');
        inputButton.addEventListener('click', this._searchKeyword.bind(this));
    }

    _createContainer() {
        this._container = createElement('div', { class: 'news__container' });
        this.viewElement.appendChild(this._container);
        return this._container;
    }

    _createCard(parameter) {
        this._card = createElement('div', { class: 'news__card' }, null, null);
        this._card.appendChild(this._createImg(parameter));
        this._card.appendChild(this._createCardDetails(parameter));
        return this._card;
    }

    _createImg(parameter) {
        this._img = createElement('img', {
            alt: '',
            class: 'news__img',
        });
        if (parameter.urlToImage) {
            this._img.setAttribute('src', `${parameter.urlToImage}`);
        } else {
            this._img.setAttribute(
                'src',
                'https://images.unsplash.com/photo-1476242906366-d8eb64c2f661?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80'
            );
        }
        return this._img;
    }

    _createCardDetails(parameter) {
        this._cardDetails = createElement('div', { class: 'card__details' });
        this._cardDetails.appendChild(this._createDate(parameter));
        this._cardDetails.appendChild(this._createArticleTitle(parameter));
        this._cardDetails.appendChild(this._createArticleContent(parameter));
        this._cardDetails.appendChild(this._createLink(parameter));
        return this._cardDetails;
    }

    _createDate(parameter) {
        let data = parameter.publishedAt.slice(0, 10);
        this._date = createElement('div', { class: 'news__date' }, null, `Published: ${data}`);
        return this._date;
    }

    _createArticleTitle(parameter) {
        this._articleTitle = createElement(
            'div',
            { class: 'news__article__title' },
            null,
            parameter.title
        );
        return this._articleTitle;
    }

    _createArticleContent(parameter) {
        let data = parameter.description.slice(0, 130);
        this._article = createElement('p', { class: 'news__short__content' }, null, data);
        return this._article;
    }

    _createButton(className, innerTxt, event) {
        this._button = createElement(
            'button',
            { class: className, type: 'button' },
            event,
            innerTxt
        );
        return this._button;
    }

    _createLink(parameter) {
        this._link = createElement('a', {
            href: `${parameter.url}`,
            target: '_blank',
        });
        this._link.appendChild(this._createButton('news__read--button', 'Read more'));
        return this._link;
    }
}

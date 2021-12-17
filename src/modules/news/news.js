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
        await this._api.getTopNews('top-headlines').then((response) => {
            let main = this._createContainer();
            let data = response.articles;
            data.forEach((article) => {
                main.appendChild(this._createCard(article));
            });
        });
    }

    async _searchData(keyword) {
        await this._api.getSearchedNews(keyword).then((response) => {
            const main = this._createContainer();
            const data = response.articles;
            data.forEach((article) => {
                main.appendChild(this._createCard(article));
            });
        });
    }

    _createTitle() {
        const title = createElement('h1', { class: 'news__title' }, null, 'The News');
        this.viewElement.appendChild(title);
    }

    _searchKeyword() {
        const newKeyword = document.querySelector('.news__input').value;
        const container = document.querySelector('.news__container');
        if (container && newKeyword) {
            this.viewElement.removeChild(container);
            this._searchData(newKeyword);
        }
    }

    _createForm() {
        const form = createElement('form', { class: 'news__form' });
        form.append(
            this._createLabel(),
            this._createInput(),
            this._createButton('news__search--button', 'search', {
                click: this._searchKeyword.bind(this),
            })
        );
        this.viewElement.appendChild(form);
    }

    _createLabel() {
        return createElement('label', { for: 'news__label' });
    }

    _createInput() {
        return createElement('input', {
            type: 'text',
            id: 'news',
            name: 'news',
            class: 'news__input',
        });
    }

    _createContainer() {
        const container = createElement('div', { class: 'news__container' });
        this.viewElement.appendChild(container);
        return container;
    }

    _createCard(parameter) {
        const card = createElement('div', { class: 'news__card' }, null, null);
        card.appendChild(this._createImg(parameter));
        card.appendChild(this._createCardDetails(parameter));
        return card;
    }

    _createImg(parameter) {
        const img = createElement('img', {
            alt: '',
            class: 'news__img',
        });
        if (parameter.urlToImage.length) {
            img.setAttribute('src', `${parameter.urlToImage}`);
        } else {
            img.setAttribute(
                'src',
                'https://images.unsplash.com/photo-1476242906366-d8eb64c2f661?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80'
            );
        }
        return img;
    }

    _createCardDetails(parameter) {
        const cardDetails = createElement('div', { class: 'card__details' });
        cardDetails.appendChild(this._createDate(parameter));
        cardDetails.appendChild(this._createArticleTitle(parameter));
        cardDetails.appendChild(this._createArticleContent(parameter));
        cardDetails.appendChild(this._createLink(parameter));
        return cardDetails;
    }

    _createDate(parameter) {
        const dataFormat = parameter.publishedAt.slice(0, 10);
        const date = createElement(
            'div',
            { class: 'news__date' },
            null,
            `Published: ${dataFormat}`
        );
        return date;
    }

    _createArticleTitle(parameter) {
        const articleTitle = createElement(
            'div',
            { class: 'news__article__title' },
            null,
            parameter.title
        );
        return articleTitle;
    }

    _createArticleContent(parameter) {
        const textFormat = parameter.description.slice(0, 130);
        const article = createElement(
            'p',
            { class: 'news__short__content' },
            null,
            `${textFormat}...`
        );
        return article;
    }

    _createButton(className, innerTxt, event) {
        const button = createElement(
            'button',
            { class: className, type: 'button' },
            event,
            innerTxt
        );
        return button;
    }

    _createLink(parameter) {
        const link = createElement('a', {
            href: `${parameter.url}`,
            target: '_blank',
        });
        link.appendChild(this._createButton('news__read--button', 'Read more'));
        return link;
    }
}

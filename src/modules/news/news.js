import { NewsApi } from './newsApi';
import { createElement } from '../../utils/createElement';
import { Notification, Spinner } from '../../shared';
import './style.css';

export class News {
    constructor() {
        this.viewElement = document.querySelector('#main');
        this._api = new NewsApi();
    }

    start() {
        this._createNewsWrapper();
        this._fetchData();
        this._createHeader();
        this._createTitle();
        this._createForm();
        this._createContainer();
    }

    async _fetchData() {
        const spinner = new Spinner();
        try {
            spinner.showSpinner();
            const array = await this._api.getTopNews('top-headlines');
            this._data = array.articles;
            this._createArticlesArray(this._data, 4);
        } catch (error) {
            new Notification().showError('Fetch news data error', error);
        } finally {
            spinner.removeSpinner();
        }
    }

    async _searchData(keyword) {
        const spinner = new Spinner();
        try {
            spinner.showSpinner();
            const user_array = await this._api.getSearchedNews(keyword);
            this.user_data = user_array.articles;
            this._createArticlesArray(this.user_data, 4);
        } catch (error) {
            new Notification().showError('Fetch news data error', error);
        } finally {
            spinner.removeSpinner();
        }
    }

    _searchKeyword() {
        const cards = document.querySelectorAll('.news__card');
        const input = document.querySelector('.news__input');
        const newKeyword = input.value;
        if (this._container && newKeyword) {
            cards.forEach((i) => {
                this._container.removeChild(i);
            });
            this._searchData(newKeyword);
        }
        this._footer ? this._newsWrapper.removeChild(this._footer) : null;
        input.value = null;
    }

    _createArticlesArray(data, size) {
        this._pageSize = size;
        this._arrayOfArticles = [];
        for (var i = 0; i < data.length; i += this._pageSize) {
            this._arrayOfArticles.push(data.slice(i, i + this._pageSize));
        }
        this._createFooter(this._arrayOfArticles);
        this._displayArticles(); // displays article after view is rendered
    }

    async _displayArticles(number = 0, array = this._arrayOfArticles) {
        try {
            for (let i = 0; i < this._pageSize; i++) {
                await this._container.appendChild(this._createCard(array[number][i]));
            }
        } catch (error) {
            this._onSearchResultNull();
        }
    }

    _onSearchResultNull() {
        let error_container = createElement('div', {
            class: 'news__error--container',
        });
        let error_info = createElement(
            'div',
            { class: 'news__error--info' },
            null,
            'Sorry, nothing found, please try again'
        );
        error_container.appendChild(error_info);
        this._container.appendChild(error_container);
    }

    _insertPageNumber(number) {
        const cards = document.querySelectorAll('.news__card');
        cards.forEach((i) => {
            this._container.removeChild(i);
        });
        this._displayArticles(number);
    }

    _createNewsWrapper() {
        this._newsWrapper = createElement('div', { class: 'news__wrapper' }, null, null);
        this.viewElement.appendChild(this._newsWrapper);
    }

    _createHeader() {
        this._header = createElement('div', {
            class: 'news__header',
        });
        this._newsWrapper.appendChild(this._header);
    }

    _createTitle() {
        const title = createElement('h1', { class: 'news__title' }, null, 'The News');
        this._header.appendChild(title);
    }

    _createForm() {
        const form = createElement(
            'form',
            {
                class: 'news__form',
            },
            { submit: this._onSubmit.bind(this) }
        );
        form.append(this._createSearchBox());
        this._header.appendChild(form);
    }

    _createSearchBox() {
        const searchbox = createElement('div', { class: 'news__searchbox' });
        searchbox.append(this._createInput(), this._createSearchFavicon());
        return searchbox;
    }

    _createInput() {
        return createElement('input', {
            type: 'text',
            id: 'news',
            name: 'news',
            placeholder: 'Search...',
            class: 'news__input',
        });
    }

    _onSubmit(e) {
        e.preventDefault();
        this._searchKeyword();
        return false; //prevents reloading the page after submitting
    }

    _createSearchFavicon() {
        const searchIcon = createElement('i', { class: 'fas fa-search' });
        const iconWrapper = createElement(
            'div',
            { class: 'icon__wrapper' },
            {
                click: this._searchKeyword.bind(this),
            }
        );
        iconWrapper.appendChild(searchIcon);
        return iconWrapper;
    }

    _createContainer() {
        this._container = createElement('div', { class: ' news__container' });
        this._newsWrapper.appendChild(this._container);
        return this._container;
    }

    _createCard(parameter) {
        this._card = createElement('div', { class: 'news__card' });
        this._card.appendChild(this._createImg(parameter));
        this._card.appendChild(this._createCardDetails(parameter));
        return this._card;
    }

    _createImg(parameter) {
        const img = createElement(
            'img',
            {
                alt: 'image illustrating news article',
                class: 'news__img',
            },
            {
                error: () => {
                    img.setAttribute(
                        'src',
                        'https://images.unsplash.com/photo-1639262498805-17c7dc422d37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
                    );
                },
            }
        );

        parameter.urlToImage
            ? img.setAttribute('src', `${parameter.urlToImage}`)
            : img.setAttribute(
                  'src',
                  'https://images.unsplash.com/photo-1476242906366-d8eb64c2f661?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80'
              );
        return img;
    }

    _createCardDetails(parameter) {
        const cardDetails = createElement('div', { class: 'card__details' });
        cardDetails.appendChild(this._createDate(parameter));
        cardDetails.appendChild(this._createArticleTitle(parameter));
        cardDetails.appendChild(this._createArticleContent(parameter));
        cardDetails.appendChild(this._createCardFooter(parameter));
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
        const text = parameter.title;
        let input;
        if (text) {
            input = text.length > 130 ? `${text.slice(0, 132)}...` : text;
        } else {
            input = text;
        }
        const articleTitle = createElement('div', { class: 'news__article__title' }, null, input);
        return articleTitle;
    }

    _createArticleContent(parameter) {
        const text = parameter.description;
        let input;
        if (text) {
            input = text.length > 210 ? `${text.slice(0, 210)}...` : text;
        } else {
            input = text;
        }

        const article = createElement(
            'p',
            { class: 'news__short__content overflow-hidden' },
            null,
            input
        );
        return article;
    }

    _createCardFooter(parameter) {
        const footer = createElement('div', { class: 'card__footer' });
        footer.appendChild(this._createLink(parameter));
        return footer;
    }

    _createButton(className, innerText, event) {
        const button = createElement(
            'button',
            { class: className, type: 'button' },
            event,
            innerText
        );
        return button;
    }

    _createLink(parameter) {
        const link = createElement('a', {
            href: `${parameter.url}`,
            target: '_blank',
        });
        link.appendChild(this._createButton('btn btn-dark news__read--button', 'Read more'));
        return link;
    }

    _createFooter(array) {
        this._footer = createElement('div', { class: 'footer news_footer' });
        for (let i = 0; i < array.length; i++) {
            this._pageNumber = createElement(
                'button',
                {
                    id: `${i + 1}`,
                    class: 'btn btn-light page__number--button',
                    value: `${i + 1}`,
                },
                {
                    click: this._insertPageNumber.bind(this, i, array),
                },
                `${i + 1}`
            );
            this._footer.appendChild(this._pageNumber);
        }
        this._newsWrapper.appendChild(this._footer);
    }
}

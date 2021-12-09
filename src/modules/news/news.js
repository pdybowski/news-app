export class News {
    constructor() {
        this.viewElement = document.querySelector('#main');
    }

    start() {
        this._createTitle();
        this._createForm();
        this._createContainer();
    }

    _createTitle() {
        const mainTitle = document.createElement('h1');
        mainTitle.setAttribute('class', 'news__title');
        this.viewElement.appendChild(mainTitle);
        mainTitle.innerText = 'The News';
    }

    //helper function that set multiple attributes of an element
    _setAttributes(element, attributes) {
        for (let key in attributes) {
            element.setAttribute(key, attributes[key]);
        }
    }

    _createForm() {
        const form = document.createElement('form');
        const label = document.createElement('label');
        const inputText = document.createElement('input');
        const inputSubmit = document.createElement('input');

        form.setAttribute('class', 'news__form');
        label.setAttribute('for', 'news__label');
        this._setAttributes(inputText, {
            type: 'text',
            id: 'news',
            name: 'news',
            class: 'news__input',
        });
        this._setAttributes(inputSubmit, {
            type: 'submit',
            value: 'submit',
            class: 'search__button',
        });

        label.innerText = 'Search for the topic';

        form.append(label, inputText, inputSubmit);
        this.viewElement.appendChild(form);
    }

    _createContainer() {
        const mainContainer = document.createElement('div');
        mainContainer.setAttribute('class', 'news__container');
        this.viewElement.appendChild(mainContainer);
        //the number of articles displayed will depend on the limit set in the API query (max. 10);
        for (let i = 0; i < 5; i++) {
            mainContainer.appendChild(this._createCard());
        }
    }

    _createCard() {
        const card = document.createElement('div');
        card.setAttribute('class', 'news__card');
        card.appendChild(this._createImg());
        card.appendChild(this._createCardDetails());
        return card;
    }

    _createImg() {
        const img = document.createElement('img');
        this._setAttributes(img, {
            src: 'https://images.unsplash.com/photo-1636884285351-0f14627ada21?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            alt: '',
            class: 'news__img',
        });

        return img;
    }

    _createCardDetails() {
        const cardDetails = document.createElement('div');
        cardDetails.setAttribute('class', 'card__details');
        cardDetails.appendChild(this._createTag());
        cardDetails.appendChild(this._createArticleTitle());
        cardDetails.appendChild(this._createArticleContent());
        cardDetails.appendChild(this._createLink());
        return cardDetails;
    }
    _createTag() {
        const tag = document.createElement('span');
        tag.setAttribute('class', 'news__tag');
        tag.innerText = 'tag name';
        return tag;
    }

    _createArticleTitle() {
        const title = document.createElement('div');
        title.setAttribute('class', 'news__article__title');
        title.innerText = 'Title';
        return title;
    }

    _createArticleContent() {
        const article = document.createElement('p');
        article.setAttribute('class', 'news__short__content');
        article.innerText =
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur sodales morbi dignissim sed diam pharetra vitae ipsum odio.'; //kontent z API
        return article;
    }

    _createButton() {
        const button = document.createElement('button');
        button.setAttribute('class', 'news__button');
        button.innerText = 'Read more';
        return button;
    }

    _createLink() {
        const link = document.createElement('a');
        link.setAttribute('href', '#');
        link.setAttribute('target', '_blank');
        link.appendChild(this._createButton());
        return link;
    }
}

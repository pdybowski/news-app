import { Spinner, Notification } from '../../shared';
import { createElement as createEl, isDefined, removeRedundantHtmlTags } from '../../utils';
import { GovApi } from './govApi';
import './style.css';

export class Government {
    constructor() {
        this.mainView = document.querySelector('#main');
        this.api = new GovApi();
        this.spinner = new Spinner();
    }

    async start() {
        try {
            this.spinner.showSpinner();
            await this._fetchInitialData();
            this._createPageContainer();
            // create a page
        } catch (e) {
            // throw new Error(e);
            new Notification().showError('Failed to load data', e);
            console.log(e);
        } finally {
            this.spinner.removeSpinner();
        }
    }

    _createPageContainer() {
        // create containers and place them in desired spots
        this.container = createEl('div', {
            class: 'row mt-5 justify-content-center align-items-center',
        });
        this.mainView.append(this.container);
        this._createSearchContainer();
        this._createContentContainer();
    }

    _createContentContainer() {
        const contentContainer = createEl('div', {
            id: 'contentContainer',
            class: 'd-flex flex-row',
        });
        contentContainer.append(this._createSearchResultsContainer());
        this.container.append(contentContainer);
    }

    _createSearchResultsContainer() {
        const searchResultsContainer = createEl('div', {
            id: 'resultsContainer',
            class: 'd-flex justify-content-center flex-wrap',
        });

        if (isDefined(document.querySelectorbyId('resultsContainer'))) {
            const elements = this._populateCards(this.initialData.data);
            elements.forEach((element) => {
                searchResultsContainer.appendChild(element);
            });
        }

        // console.log('search results container ', searchResultsContainer);
        return searchResultsContainer;
    }

    _createSearchResultBody(title, modified, desc, keywords) {
        const searchResultBody = createEl('div', {
            class: 'card-body',
        });

        // console.log(searchResultBody);
        // piece below works
        searchResultBody.appendChild(this._createSearchResultTitle(title));
        searchResultBody.appendChild(this._createSearchResultKeywords(keywords));
        searchResultBody.appendChild(this._createSearchResultDesc(desc));
        searchResultBody.appendChild(this._createSearchResultModifiedDate(modified));
        return searchResultBody;
    }

    _createSearchResultTitle(title) {
        const searchResultTitle = createEl(
            'h3',
            {
                class: 'card-header',
            },
            null,
            `${title}`
        );
        return searchResultTitle;
    }

    _createSearchResultDesc(desc) {
        const searchResultDesc = createEl(
            'p',
            {
                class: 'card-text p-3',
            },
            null,
            `${desc}`
        );
        return searchResultDesc;
    }

    _createSearchResultModifiedDate(modifiedAt) {
        const searchResultModifiedDate = createEl(
            'h6',
            {
                class: 'card-subtitle m-3',
            },
            null,
            `Last modified: ${modifiedAt}`
        );
        return searchResultModifiedDate;
    }

    _createSearchResultKeywords(keywords = false) {
        const searchResultKeywords = createEl(
            'h6',
            {
                class: 'card-subtitle m-3 text-muted align-right',
            },
            null,
            `Keywords: ${keywords}`
        );

        return searchResultKeywords;
    }
    _createSearchResultCard(title, desc, modified, keywords) {
        const searchResultCard = createEl('div', {
            class: 'card',
        });
        // console.log('searchResultCard ', searchResultCard);
        searchResultCard.append(this._createSearchResultBody(title, modified, desc, keywords));
        return searchResultCard;
    }

    _populateCards(query) {
        let arrayOfElements = [];
        // console.log(typeof query);
        query.forEach((el) => {
            const row = createEl('div', {
                class: 'card-deck p-3',
            });
            console.log(el.attributes.keywords);
            let title = removeRedundantHtmlTags(el.attributes.title);
            let desc = removeRedundantHtmlTags(el.attributes.notes);
            let modified = el.attributes.modified.slice(0, 10);
            let keywords;
            if (el.attributes.keywords !== undefined) {
                keywords = el.attributes.keywords.join(', ');
            } else {
                keywords = false;
            }
            row.append(this._createSearchResultCard(title, desc, modified, keywords));
            arrayOfElements.push(row);
        });
        return arrayOfElements;
    }

    _createSearchContainer() {
        const searchContainer = createEl(
            'form',
            {
                class: 'col-8 col-sm-6 content-md-center align-self-center flex-nowrap',
            },
            { submit: this._fetchSearchResults.bind(this) }
        );

        searchContainer.append(this._createSearch());
        this.container.append(searchContainer);
    }

    _createSearch() {
        const search = createEl('div', {
            class: 'input-group rounded',
        });

        search.append(this._createSearchInput(), this._createSearchButton());
        return search;
    }
    _createSearchInput() {
        const searchInput = createEl('input', {
            id: 'searchInput',
            class: 'form-control rounded',
            type: 'search',
            placeholder: 'Search',
            autocomplete: 'off',
        });
        return searchInput;
    }

    _createSearchButton() {
        const searchBtnContainer = createEl('a', {
            attribute: 'href',
            role: 'button',
            class: 'btn btn-primary btn-lg d-flex align-items-center justify-content-center text-decoration-none',
        });
        searchBtnContainer.setAttribute('href', 'javascript:void(0)');
        const searchBtn = createEl('i', {
            class: 'fas fa-search',
        });
        searchBtnContainer.append(searchBtn);
        return searchBtnContainer;
    }

    async _fetchInitialData() {
        this.initialData = await this.api.fetch('', 1, 10);
        // console.log('Test ', this.initialData);
    }

    async _fetchSearchResults(e) {
        const input = document.getElementById('searchInput');
        const currentResults = document.getElementById('resultsContainer');
        console.log('User input', input.value);
        try {
            this.spinner.showSpinner();
            if (input !== null) {
                this.data = await this.api.getItemByQuery(input.value);
                currentResults.innerHTML = '';
                console.log('Data ', this.data);
                console.log('results Container', currentResults);
                currentResults.append(this._populateCards(this.data));
            }
            // create a page
        } catch (e) {
            // throw new Error(e);
            // new Notification().showError('Failed to load data', e);
            console.log(e);
        } finally {
            this.spinner.removeSpinner();
        }
        e.preventDefault();

        return false;
    }
}

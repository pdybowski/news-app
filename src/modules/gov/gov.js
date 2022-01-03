import { Spinner, Notification } from '../../shared';
import { createElement as createEl, removeRedundantHtmlTags } from '../../utils';
import { GovApi } from './govApi';
import './style.css';

export class Government {
    constructor() {
        this.mainView = document.querySelector('#main');
        this.api = new GovApi();
    }

    async start() {
        const spinner = new Spinner();
        try {
            spinner.showSpinner();
            await this._fetchInitialData();
            this._createPageContainer();
            // create a page
        } catch (e) {
            // throw new Error(e);
            new Notification().showError('Failed to load data', e);
            console.log(e);
        } finally {
            spinner.removeSpinner();
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
        const elements = this._populateCards();

        elements.forEach((element) => {
            searchResultsContainer.appendChild(element);
        });
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

    _createSearchResultKeywords(keywords) {
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
            class: 'card w-80',
        });
        // console.log('searchResultCard ', searchResultCard);
        searchResultCard.append(this._createSearchResultBody(title, modified, desc, keywords));
        return searchResultCard;
    }

    _populateCards() {
        let arrayOfElements = [];
        const jsonData = this.initialData.data;
        jsonData.forEach((el) => {
            const row = createEl('div', {
                class: 'card-deck p-3',
            });
            let title = removeRedundantHtmlTags(el.attributes.title);
            let desc = removeRedundantHtmlTags(el.attributes.notes);
            let modified = el.attributes.modified.slice(0, 10);
            let keywords = el.attributes.keywords.join(', ');
            row.append(this._createSearchResultCard(title, desc, modified, keywords));
            arrayOfElements.push(row);
        });
        return arrayOfElements;
    }

    _createSearchContainer() {
        const searchContainer = createEl('div', {
            class: 'col-8 col-sm-6 content-md-center align-self-center flex-nowrap',
        });

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
            class: 'form-control rounded',
            type: 'search',
            placeholder: 'Search',
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
        // this.initialData = await this.api.fetch('');

        this.initialData = await this.api.paginate(1, 10);
        // console.log('Paginate ', paginate);
        console.log('Test ', this.initialData);
        // return data, paginate;
    }
    // async _onSearchApplied() {
    //     const sortAvailableTypes = ['title', 'date', 'views_count'];
    // }
    // fetchData() {
    //     this._onSearchApplied();
    // }
}

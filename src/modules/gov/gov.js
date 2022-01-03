import { Spinner, Notification } from '../../shared';
import { createElement as createEl, isDefined, createRow } from '../../utils';
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
        } finally {
            spinner.removeSpinner();
        }

        // this._createActionsBarContainer();
        // this._createResultsContainer();
        // this._createPaginationBarContainer();
    }

    _createPageContainer() {
        // create containers and place them in desired spots
        this.container = createEl('div', {
            class: 'container mt-5',
        });
        this.mainView.append(this.container);
        this._createSearchContainer();
        this._createContentContainer();
    }

    _createContentContainer() {
        this.contentContainer = createEl('div', {
            id: 'contentContainer',
            class: 'd-flex flex-row ',
        });
        this.contentContainer.append(this._createSearchResultsContainer());
        this.container.append(this.contentContainer);
    }

    _createSearchResultsContainer() {
        this.searchResultsContainer = createEl('div', {
            id: 'resultsContainer',
            class: 'd-flex justify-content-center flex-wrap',
        });
        this.searchResultsContainer.append(this._populateCards());
        this.contentContainer.appendChild(this.searchResultsContainer);
        // console.log('search results container ', this.`searchResultsContainer);
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
                class: 'card-text',
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
            class: 'card',
        });
        // console.log('searchResultCard ', searchResultCard);
        searchResultCard.append(this._createSearchResultBody(title, modified, desc, keywords));
        return searchResultCard;
    }

    _populateCards() {
        const jsonData = this.initialData.data;
        for (let el of jsonData) {
            this.row = createEl('div', {
                class: 'card-deck p-3',
            });
            let title = this._removeRedundantHTMLTags(el.attributes.title);
            let desc = this._removeRedundantHTMLTags(el.attributes.notes);
            let modified = el.attributes.modified.slice(0, 10);
            let keywords = el.attributes.keywords.join(', ');
            console.log(keywords);
            this.row.append(this._createSearchResultCard(title, desc, modified, keywords));
            this.searchResultsContainer.append(this.row);
        }
    }

    _removeRedundantHTMLTags(str) {
        return str.replace(/<\/?[^>]+>/gi, '');
    }
    _createSearchContainer() {
        const searchContainer = createEl('div', {
            class: 'row content-md-center align-self-center w-50',
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

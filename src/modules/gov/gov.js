import { Spinner } from '../../shared';
import { createElement as createEl, isDefined, createRow } from '../../utils';
import { GovApi } from './govApi';
// import './style.css';

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
            // create a page
        } catch (e) {
            throw new Error(e);
            // new Notification().showError('Failed to load data', e);
        } finally {
            spinner.removeSpinner();
        }
        this._createPageContainer();

        // this._createActionsBarContainer();
        // this._createResultsContainer();
        // this._createPaginationBarContainer();
    }

    _createPageContainer() {
        // create containers and place them in desired spots
        this.container = createEl('div', {
            class: 'row mt-5',
        });
        this.mainView.append(this.container);
        this._createSearchContainer();
        this._createContentContainer();
    }

    _createContentContainer() {
        const contentContainer = createEl('div', {
            class: 'd-flex flex-row',
        });
        contentContainer.append(this._createSearchResultsContainer());
        this.container.append(contentContainer);
    }

    _createSearchResultsContainer() {
        const searchResultsContainer = createEl('div', {
            class: 'd-flex justify-content-center flex-wrap',
        });
        return searchResultsContainer;
    }

    _createSearchResultBox() {
        const searchResultBox = createEl('div', {
            class: 'd-flex flex-grow',
        });
    }

    _createSearchResult(title, keywords, notes, id, link, author, created, modified, model) {
        // title = title
        // keywords = array containing keywords
        //notes = description (needs to be wrapped)
        // id = data id
        // link = links.self --> link to data
        // author = author
        // created = createdAt
        // modified = modifiedAt
        // model = data type

        const searchResult = createEl('div', {
            class: 'd-flex flex-column align-items-center justify-content-center',
        });

        searchResult.append(this._createSearchResultTitle(), this._createSearchResultDescription());
    }

    _createSearchResultTitle() {
        const createTitle = createEl('div');
        return createTitle;
    }

    _createSearchResultDescription() {
        const createDesc = createEl('div');
        return createDesc;
    }
    _createSearchContainer() {
        const searchContainer = createEl('div', {
            class: 'input-group rounded col-6 align-items-center',
        });

        const fillSpace = createEl('div', {
            class: 'col-md-3',
        });
        searchContainer.append(this._createSearchInput(), this._createSearchButton());
        this.container.append(searchContainer);
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
        let data = await this.api.fetch();
        console.log('Test ', data);
        return data;
    }
    // async _onSearchApplied() {
    //     const sortAvailableTypes = ['title', 'date', 'views_count'];
    // }
    // fetchData() {
    //     this._onSearchApplied();
    // }
}

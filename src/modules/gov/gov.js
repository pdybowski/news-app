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
        this._fetchData('');
        this._createPageContainer();
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
        this.contentContainer = createEl('div', {
            id: 'contentContainer',
            class: 'd-flex flex-row',
        });
        // this.contentContainer.append(this._createSearchResultsContainer());
        this.container.append(this.contentContainer);
        // this.contentContainer.append(this.searchResultsContainer);
        this._createSearchResultsContainer();
    }

    async _createSearchResultsContainer() {
        this.searchResultsContainer = createEl('div', {
            id: 'resultsContainer',
            class: 'd-flex justify-content-center flex-wrap',
        });

        // const input = document.getElementById('searchInput');

        // console.log(this.searchResultsContainer);
        // let elements = this._populateCards(this.data);
        // elements.forEach((element) => {
        //     searchResultsContainer.appendChild(element);
        // });

        // let elements = this._fetchSearchResults();
        // elements.forEach((element) => {
        //     searchResultsContainer.appendChild(element);
        // });

        // return searchResultsContainer;
        this.contentContainer.append(this.searchResultsContainer);
    }

    _createSearchResultBody(title, modified, desc, keywords) {
        const searchResultBody = createEl('div', {
            class: 'card-body',
        });
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
        searchResultCard.append(this._createSearchResultBody(title, modified, desc, keywords));
        return searchResultCard;
    }

    _populateCards(query) {
        let arrayOfElements = [];
        // query = this.data;
        console.log(this.data);
        console.log('query ', query);
        query.forEach((el) => {
            const row = createEl('div', {
                class: 'card-deck p-3',
            });
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

        for (let el of arrayOfElements) {
            this.searchResultsContainer.append(el);
        }
    }

    _createSearchContainer() {
        const searchContainer = createEl(
            'form',
            {
                class: 'col-8 col-sm-6 content-md-center align-self-center flex-nowrap',
            },
            { submit: this._submit.bind(this) }
        );

        searchContainer.append(this._createSearch());
        this.container.append(searchContainer);
    }

    _submit(e) {
        e.preventDefault();
        this._fetchSearchResults();
        return false;
    }

    _createSearch() {
        const search = createEl('div', {
            class: 'input-group rounded',
        });

        search.append(this._createSearchInput(), this._createSearchButton());
        return search;
    }

    _createSearchInput() {
        const searchInput = createEl(
            'input',
            {
                id: 'searchInput',
                class: 'form-control rounded',
                type: 'search',
                placeholder: 'Search',
                autocomplete: 'off',
            },
            {
                focus: () => {
                    const searchInput = document.getElementById('searchInput');
                    if (searchInput.focus()) {
                        searchInput.placeholder = '';
                    } else {
                        searchInput.placeholder = 'Search';
                    }
                },
            }
        );
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

    async _fetchData(query) {
        try {
            this.spinner.showSpinner();
            const json = await this.api.getItemByQuery(`${query}`);
            this.data = json;
            console.log('Test ', this.data);
            this._populateCards(this.data.data);
        } catch (e) {
            new Notification().showError('Failed to load data', e);
            console.log(e);
        } finally {
            this.spinner.removeSpinner();
        }
    }

    async _fetchSearchResults() {
        const input = document.getElementById('searchInput');
        const currentResults = document.getElementById('resultsContainer');
        console.log('User input', input.value);
        try {
            this.spinner.showSpinner();
            if (input !== null) {
                this.data = await this.api.getItemByQuery(`${input.value}`);
                while (currentResults.firstChild) {
                    currentResults.removeChild(currentResults.firstChild);
                }

                this._populateCards(this.data.data);
            }
        } catch (e) {
            new Notification().showError('Failed to load data', e);
        } finally {
            this.spinner.removeSpinner();
        }
    }
}

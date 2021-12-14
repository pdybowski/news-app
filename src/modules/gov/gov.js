import { createElement as createEl, isDefined } from '../../utils';

export class Government {
    constructor() {
        this.mainView = document.querySelector('#main');
    }

    start() {
        // create a page
        this._createPageContainer();
    }

    _createPageContainer() {
        // create containers and place them in desired spots
        this._createHeadingContainer(); // todo
        this._createResultsContainer(); //todo
    }

    _createHeadingContainer() {
        const pageWrapper = createEl('div', {
            class: 'gov-heading',
        });
        pageWrapper.appendChild(this._createSearchContainer()); //todo
        pageWrapper.appendChild(this._createCategoryDropdownSelector()); //todo
    }

    _createBackButtonContainer(parent) {
        const backBtn = createEl('button', {
            class: 'gov-button--back',
        });
        parent.appendChild(backBtn);
    }

    _createSearchContainer(parent) {
        const searchContainer = createEl('div', {
            class: 'gov-search-container',
        });
        const searchInput = createEl('input', {
            class: 'gov-search-input__text',
        });
        const searchBtn = createEl('button', {
            class: 'gov-search-input__button',
        });

        parent.appendChild(searchContainer);
        searchContainer.appendChild(searchInput);
        searchContainer.appendChild(searchBtn);
    }

    _createCategoryDropdownSelector() {}

    _createResultsContainer() {
        const resultsSection = document.createElement('div').setAttribute('id', 'gov__section');
        const resultsBox = document.createElement('div').setAttribute('class', 'gov__item--result');
        const resultsBoxHeading = document
            .createElement('h2')
            .setAttribute('class', 'gov__item--heading');
        const resultsBoxDesc = document
            .createElement('div')
            .setAttribute('class', 'gov__item--desc');
        const resultsBoxDataset = document
            .createElement('div')
            .setAttribute('class', 'gov__dataset--wrapper');
        const resultsBoxDatasetAttrBox = document
            .createElement('div')
            .setAttribute('class', 'gov__dataset--attr-box');
        const resultsBoxDatasetAttrBoxTitle = document
            .createElement('p')
            .setAttribute('class', 'gov__dataset--attr-box-title');
        const resultsBoxDatasetAttrBoxDesc = document
            .createElement('p')
            .setAttribute('class', 'gov__dataset--attr-box-desc');
        document.append(resultsSection);
        resultsSection.appendChild(resultsBox);
        resultsSection.appendChild(resultsBoxDataset);
        resultsBox.appendChild(resultsBoxHeading);
        resultsBox.appendChild(resultsBoxDesc);
        resultsBoxDataset.appendChild(resultsBoxDatasetAttrBox);
        resultsBoxDatasetAttrBox.appendChild(resultsBoxDatasetAttrBoxTitle);
        resultsBoxDataset.appendChild(resultsBoxDatasetAttrBoxDesc);
    }
}

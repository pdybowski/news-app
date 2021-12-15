import { createElement } from '../utils';

export class Spinner {
    constructor() {
        this._createSpinner();
    }

    _createSpinner() {
        this._spinnerLoader = createElement('div', { id: 'loader', class: 'overlay show' });
        const spinner = createElement('div', { class: 'spinner' });
        this._spinnerLoader.append(spinner);
    }

    showSpinner(targetElement = 'body') {
        document.querySelector(targetElement).append(this._spinnerLoader);
    }

    removeSpinner() {
        this._spinnerLoader.remove();
    }
}

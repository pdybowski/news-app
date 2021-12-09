import { createElement, isDefined } from '../utils';

export class Modal {
    constructor(modalId, headerText, contentComponent, footerComponent = null) {
        this._viewElement = document.querySelector('body');
        this._modalId = modalId;
        this._headerText = headerText;
        this._footerComponent = footerComponent;
        this._contentComponent = contentComponent;
        this._start();
    }

    create() {
        this._viewElement.append(this._modalContainer);
    }

    remove() {
        this._viewElement.removeChild(this._modalContainer);
    }

    createModalHandlerButton(attributes, events, innerText) {
        const extendedAttributes = {
            'data-bs-toggle': 'modal',
            'data-bs-target': `#${this._modalId}`,
            ...attributes,
        };

        return createElement('button', extendedAttributes, events, innerText);
    }

    _start() {
        this._createModalContainer();
        this._createDialogElement();
        this._createContentElement();
        this._createHeaderElement();
        this._createBodyElement();
        this._createFooterElement();
        this._createTitleElement();
        this._createButtonElement();
    }

    _createButtonElement() {
        const button = createElement('button', {
            type: 'button',
            class: 'btn-close',
            'data-bs-dismiss': 'modal',
            'aria-label': 'Close',
        });

        this._header.append(button);
    }

    _createTitleElement() {
        const title = createElement(
            'h5',
            {
                class: 'modal-title',
                id: 'modalTitleLabel',
            },
            null,
            this._headerText
        );

        this._header.append(title);
    }

    _createFooterElement() {
        const footer = createElement('div', {
            class: 'modal-footer',
        });

        this._content.append(footer);

        if (isDefined(this._footerComponent)) {
            footer.append(this._footerComponent);
        } else {
            footer.append(
                createElement(
                    'button',
                    { type: 'button', class: 'btn btn-secondary', 'data-bs-dismiss': 'modal' },
                    null,
                    'Close'
                )
            );
        }
    }

    _createBodyElement() {
        const body = createElement('div', {
            class: 'modal-body',
        });

        this._content.append(body);
        body.append(this._contentComponent);
    }

    _createHeaderElement() {
        this._header = createElement('div', {
            class: 'modal-header',
        });

        this._content.append(this._header);
    }

    _createContentElement() {
        this._content = createElement('div', {
            class: 'modal-content',
        });

        this._dialog.append(this._content);
    }

    _createModalContainer() {
        this._modalContainer = createElement('div', {
            class: 'modal fade',
            id: this._modalId,
            tabindex: '-1',
            'aria-labelledby': 'modalTitleLabel',
            'aria-hidden': 'true',
        });
    }

    _createDialogElement() {
        this._dialog = createElement('div', {
            class: 'modal-dialog',
        });

        this._modalContainer.append(this._dialog);
    }
}

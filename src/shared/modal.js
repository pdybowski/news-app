import { createElement } from '../utils';

class Modal {
    constructor(modalId, parentElement, headerText, contentComponent, footerComponent) {
        this._parentElement = parentElement;
        this._modalId = modalId;
        this._headerText = headerText;
        this._footerComponent = footerComponent;
        this._contentComponent = contentComponent;
        this._start();
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

        this.header.append(button);
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

        this.header.append(title);
    }

    _createFooterElement() {
        const footer = createElement('div', {
            class: 'modal-footer',
        });

        this.content.append(footer);
        footer.append(this._footerComponent);
    }

    _createBodyElement() {
        const body = createElement('div', {
            class: 'modal-body',
        });

        this.content.append(body);
        body.append(this._contentComponent);
    }

    _createHeaderElement() {
        this.header = createElement('div', {
            class: 'modal-header',
        });

        this.content.append(this.header);
    }

    _createContentElement() {
        this.content = createElement('div', {
            class: 'modal-content',
        });

        this._dialog.append(this.content);
    }

    _createModalContainer() {
        this._modalContainer = createElement('div', {
            class: 'modal fade',
            id: this._modalId,
            tabindex: '-1',
            'aria-labelledby': 'modalTitleLabel',
            'aria-hidden': 'true',
        });
        this._parentElement.append(this._modalContainer);
    }

    _createDialogElement() {
        this._dialog = createElement('div', {
            class: 'modal-dialog',
        });

        this._modalContainer.append(this._dialog);
    }
}

function createModalHandlerButton(modalId, attributes, events, innerText) {
    const extendedAttributes = {
        'data-bs-toggle': 'modal',
        'data-bs-target': `#${modalId}`,
        ...attributes,
    };

    return createElement('button', extendedAttributes, events, innerText);
}

export default {
    createModalHandlerButton: function (modalId, attributes, events, innerText) {
        return createModalHandlerButton(modalId, attributes, events, innerText);
    },

    createModal: function (modalId, parentElement, headerText, contentComponent, footerComponent) {
        return new Modal(modalId, parentElement, headerText, contentComponent, footerComponent);
    },
};

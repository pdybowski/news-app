import './notifications.css';

export class Notification {
    constructor() {
        this.body = document.querySelector('body');
    }

    showSuccess(header, message) {
        this.notificationContainer = document.querySelector('.notification__container');
        if (!this.notificationContainer) {
            this._createNotificationContainer();
        }

        const successContainer = document.createElement('div');
        successContainer.classList.add('notification__message--success');

        const headerContainer = document.createElement('div');
        headerContainer.classList.add('notification__header');
        headerContainer.innerText = header;

        const messageContainer = document.createElement('div');
        messageContainer.classList.add('notification__message');
        messageContainer.innerText = message;

        successContainer.append(headerContainer);
        successContainer.append(messageContainer);

        this.notificationContainer.append(successContainer);
        this._removeMessage(successContainer);
    }

    showInfo(header, message) {
        this.notificationContainer = document.querySelector('.notification__container');
        if (!this.notificationContainer) {
            this._createNotificationContainer();
        }

        const infoContainer = document.createElement('div');
        infoContainer.classList.add('notification__message--info');

        const headerContainer = document.createElement('div');
        headerContainer.classList.add('notification__header');
        headerContainer.innerText = header;

        const messageContainer = document.createElement('div');
        messageContainer.classList.add('notification__message');
        messageContainer.innerText = message;

        infoContainer.append(headerContainer);
        infoContainer.append(messageContainer);

        this.notificationContainer.append(infoContainer);
        this._removeMessage(infoContainer);
    }

    showError(header, message) {
        this.notificationContainer = document.querySelector('.notification__container');
        if (!this.notificationContainer) {
            this._createNotificationContainer();
        }

        const errorContainer = document.createElement('div');
        errorContainer.classList.add('notification__message--error');

        const headerContainer = document.createElement('div');
        headerContainer.classList.add('notification__header');
        headerContainer.innerText = header;

        const messageContainer = document.createElement('div');
        messageContainer.classList.add('notification__message');
        messageContainer.innerText = message;

        errorContainer.append(headerContainer);
        errorContainer.append(messageContainer);

        this.notificationContainer.append(errorContainer);
        this._removeMessage(errorContainer);
    }

    _createNotificationContainer() {
        this.notificationContainer = document.createElement('div');
        this.notificationContainer.classList.add('notification__container');
        this.body.append(this.notificationContainer);
    }

    _removeMessage(child) {
        setTimeout(() => {
            this.notificationContainer.removeChild(child);
            if (this.notificationContainer.children.length === 0) {
                this.notificationContainer.remove();
            }
        }, 4000);
    }
}

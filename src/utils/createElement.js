import { isDefined } from '.';

export function createElement(tag, attributes, events, innerText) {
    const element = document.createElement(tag);
    if (isDefined(attributes)) {
        for (let key in attributes) {
            element.setAttribute(key, attributes[key]);
        }
    }
    if (isDefined(events)) {
        for (let key in events) {
            element.addEventListener(key, events[key]);
        }
    }
    if (isDefined(innerText)) {
        element.innerText = innerText;
    }
    return element;
}

export function createRow() {
    return createElement('div', {
        class: 'row',
    });
}

export function createColumn() {
    return createElement('div', {
        class: 'col',
    });
}

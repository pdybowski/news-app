export function createElement(tag, attributes) {
    const element = document.createElement(tag);
    for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    return element;
}
export function createRow() {
    const row = document.createElement('div');
    row.classList.add('row');
    return row;
}

export function createColumn() {
    const col = document.createElement('div');
    col.classList.add('col');
    return col;
}

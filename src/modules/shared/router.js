export default class Router {
    constructor() {
        this.routes = [];
        this.main = document.getElementById('main');
    }

    start() {
        window.addEventListener('popstate', () => {
            this._routeChanged();
        });

        this._onNavigation();
    }

    _onNavigation() {
        this._routeChanged();
        this._setActiveMenuItem();
    }

    addRoute(path, view) {
        const route = {
            path,
            view,
            link: path.slice(1),
        };

        this.routes.push(route);
    }

    navigate(url) {
        history.pushState(null, null, url);
    }

    _routeChanged() {
        this._clearView();
        const path = window.location.hash ? window.location.hash.slice(1) : '/';

        let foundRoute = this.routes.find(
            (route) => path.match(this._regExpPath(route.path)) !== null
        );

        if (!foundRoute && this.routes.length > 0) {
            foundRoute = this.routes[0];
        }

        if (!foundRoute) {
            return;
        }
        foundRoute.view.start();
    }

    _clearView() {
        this.main.innerHTML = '';
    }

    _setActiveMenuItem() {
        let items = document.querySelectorAll('.nav--item__link');
        items.forEach((item) =>
            item.addEventListener('click', () => {
                const activeItem = document.querySelector('.active');
                activeItem.classList.remove('active');
                item.classList.add('active');
            })
        );
    }

    _regExpPath(path) {
        return new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');
    }
}

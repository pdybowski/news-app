export class Sport {
    constructor() {
        this.mainBox = document.querySelector('#main');
    }

    _createMainContainer() {
        this.container = createElement('div', { class: 'football__main-container' });
        this.mainBox.append(this.container);
    }

    _createLeaguesContainer() {
        const leaguesContainer = createElement('div', { class: 'Leagues__container' });

        // loop for leages 

        this.mainBox.append(leaguesContainer);
    }

    _createLeagueBox(imageSrc, fulllLagueName) {
        const leagueBox = createElement('div', { class: 'leagues__box' });
        const logo = createElement('img', { class: 'leagues__box--image', src: imageSrc});
        const leagueName = createElement('h2', { class: 'leagues__box--name'});
        leagueName.innerText = fulllLagueName;
        leagueBox.append(logo, leagueName);
        this.leaguesContainer.append(leagueBox);
    }
}

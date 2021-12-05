export class Sport {
    constructor() {
        this.mainBox = document.querySelector('#main');
        this.start();
    }
    start() {
        this._createContent();
        this._createButtons();
    }
}

_createContent(){
    this.buttonsContainer = document.createElement('div');
    this.buttonsContainer.className = 'buttons';
    this.mainBox.appendChild(buttonsContainer);
}

_createButtons() {
    const areaName = document.createElement('button');
    areaName.className = 'area__name';
    areaName.innerHTML = 'Europe';
    buttonsContainer.appendChild(areaName);

    const leagueName = document.createElement('button');
    leagueName.className = 'league__name';
    l eagueName.innerHTML = 'Champions League';
    buttonsContainer.appendChild(leagueName);

    const season = document.createElement('button');
    season.className = 'area__name';
    season.innerHTML = '2021/2022';
    buttonsContainer.appendChild(season);
}
const spinner = document.getElementById("loader");

let spinnerCount = 0;

function showSpinner() {
    spinnerCount++;
    spinner.classList.add('show');
}

function hideSpinner() {
    spinnerCount--;
    if (spinnerCount <= 0) {
        spinner.classList.remove('show');
    }
}


export default {
    showSpinner: function () {
        showSpinner()
    },
    hideSpinner: function () {
        hideSpinner()
    },
}

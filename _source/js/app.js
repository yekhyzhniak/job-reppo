document.querySelector('.js-menu-btn').onclick = function () {
    this.classList.toggle('actived');
    document.querySelector('body').classList.toggle('overflow');
    document.querySelector('.header__menu').classList.toggle('show');
};

let btns = document.querySelectorAll('.links__btn')
btns.forEach(function (element) {

    element.onclick = swipe;
})

function swipe(event) {
    event.preventDefault();
    let data = this.getAttribute('data');

    btns.forEach(function (element) {
        element.classList.remove('btn-blue');
    })
    document.querySelector(`.links__btn[data="${data}"]`).classList.add('btn-blue');

    let block = document.querySelectorAll('.links__block')
    block.forEach(function (elem) {
        elem.classList.remove('visible');
    })
    document.querySelector(`.links__block[data="${data}"]`).classList.add('visible');
}

let btnz = document.querySelectorAll('.assistant__job-btns');
btnz.forEach(function (el) {
    el.onclick = swip;
})

function swip() {
    let data = this.getAttribute('data');

    btnz.forEach(function (element) {
        element.classList.remove('active');
    })
    document.querySelector(`.assistant__job-btns[data="${data}"]`).classList.add('active');

    let block = document.querySelectorAll('.assistant__job-item')
    block.forEach(function (elem) {
        elem.classList.remove('activer');
    })
    document.querySelector(`.assistant__job-item[data="${data}"]`).classList.add('activer');
}
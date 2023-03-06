document.querySelector('.js-menu-btn').onclick = function () {
    this.classList.toggle('actived');
    document.querySelector('body').classList.toggle('overflow');
    document.querySelector('.header__menu').classList.toggle('show');
};



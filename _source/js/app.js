document.querySelector('.js-menu-btn').onclick = function () {
    this.classList.toggle('active');
    document.querySelector('body').classList.toggle('overflow');
    document.querySelector('.js-menu').classList.toggle('active');
};


if (document.querySelector('.js-dscr-link') !== null) {
    document.querySelector('.js-dscr-link').onclick = function (event) {
        event.preventDefault();
        document.querySelector('.js-dscr-link').classList.add('hidden');
        document.querySelector('.shop__description-bg').classList.add('hidden');
        document.querySelector('.shop__dscr').classList.add('full');
    }
}

if (document.querySelector('.js-show-row') !== null) {
    document.querySelector('.js-show-row').onclick = function (event) {
        event.preventDefault();
        let shopRow = document.querySelectorAll('.shop__row');
        for (elems of shopRow) {
            elems.classList.remove('hidden');
        }
        document.querySelector('.js-show-row').classList.add('hidden');
        document.querySelector('.shop__btn-show').classList.add('margin');
    }
}



if (document.querySelectorAll('.js-btn') !== null) {
    let btn = document.querySelectorAll('.js-btn');
    btn.forEach(function (element) {
        element.onclick = showToogle;
        function showToogle() {
            let data = this.getAttribute('data');
            document.querySelector(`.js-btn[data="${data}"]`).classList.toggle('js-btn-toggle')
        }

    });
}

if (document.querySelectorAll('.js-row-pic') !== null) {
    let btn = document.querySelectorAll('.js-row-pic');
    let pics = document.querySelectorAll('.js-big-pic');
    btn.forEach(function (element) {
        element.onclick = showPic;
        function showPic() {
            let data = this.getAttribute('data');
            for (elems of pics) {
                elems.classList.remove('hidden')
                elems.classList.add('hidden')
            }
            document.querySelector(`.js-big-pic[data="${data}"]`).classList.remove('hidden')
        }
    })
}



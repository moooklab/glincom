new Swiper('section.projects div.swiper', {
    keyboard: true,
    navigation: {
        prevEl: document.querySelector('section.projects div.swiper-navigation div.arrow:first-child'),
        nextEl: document.querySelector('section.projects div.swiper-navigation div.arrow:last-child'),
    },
    pagination: {
        el: document.querySelector('section.projects div.swiper-pagination'),
        clickable: true
    },
    on: {
        'slideChange': function () {
            numbers = document.querySelectorAll('section.projects div.swiper-navigation div.pages span')
            numbers[0].textContent = this.realIndex
            numbers[1].textContent = this.realIndex + 2
            this.realIndex == 0 ? numbers[0].classList.add('hide') : numbers[0].classList.remove('hide')
            this.realIndex >= this.slides.length-1 ? numbers[1].classList.add('hide') : numbers[1].classList.remove('hide')
        }
    }
})

new Swiper('section.awards div.swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    keyboard: true,
    // autoHeight: true,
    pagination: {
        el: document.querySelector('section.awards div.swiper-pagination'),
        clickable: true
    },
    breakpoints: {
        1280: {
            slidesPerView: 2,
            spaceBetween: 175,
            // autoHeight: false,
            grid: {
                rows: 4,
                fill: 'row'
            }
        },
        960: {
            slidesPerView: 2,
            spaceBetween: 24,
            // autoHeight: false,
            pagination: false,
            grid: {
                rows: 4,
                fill: 'row'
            },
        },
        640: {
            slidesPerView: 2,
        }
    }
})
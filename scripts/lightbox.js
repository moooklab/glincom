lightboxImages = document.querySelectorAll('[lightbox]')

lightboxImages.forEach( (lightboxImage, index) => {
    lightboxImage?.addEventListener('click', event => {
        
        // Если изображения группированы, выбираем изображения только из группы
        group = lightboxImage.getAttribute('lightbox')
        group ? groupImages = document.querySelectorAll('[lightbox=' + group + ']') : groupImages = lightboxImages
        
        // Создаем диалоговое окно
        createDialog('lightbox')
        lightbox = document.querySelector('dialog[data-modal-name=lightbox]')

        // Добавляем слайды
        thumbs = lightbox.querySelector('div.thumbs')
        images = lightbox.querySelector('div.images')
        groupImages.forEach( groupImage => {
            thumbs.querySelector('div.swiper-wrapper').append( createSlide(groupImage) )
            images.querySelector('div.swiper-wrapper').append( createSlide(groupImage) )
        })

        // Создаем слайдер
        thumbsSwiper = new Swiper(thumbs.querySelector('div.swiper'), {
            slidesPerView: 'auto',
            spaceBetween: 10,
            freeMode: true,
        })

        // Создаем слайдер
        imagesSwiper = new Swiper(images.querySelector('div.swiper'), {
            slidesPerView: 1,
            navigation: {
                prevEl: 'dialog[data-modal-name=lightbox] div.swiper-navigation > *:first-child',
                nextEl: 'dialog[data-modal-name=lightbox] div.swiper-navigation > *:last-child',
            },
            thumbs: {
                swiper: thumbsSwiper,
                autoScrollOffset: .5
            }
        })

        imagesSwiper.slideTo(index)

    })
})


// Создаем блочный элемент и вставляем в него изображение
let createSlide = (element) => {
    var slide = document.createElement('div')
        slide.classList.add('swiper-slide')

        image = document.createElement('img')
        image.src = element.getAttribute('lightbox-src')

    slide.append(image)
    return slide
}
let galleryImages = document.querySelectorAll('section.gallery div.image img')
let galleryLinks = document.querySelectorAll('section.gallery div.navigation a')

let setBreakers = () => {
    var count = 1

    document.querySelectorAll('.breaker').forEach( breaker => breaker.remove() )
    images = document.querySelectorAll('div.image')

    images.forEach( image => {
        if (count % 3 === 0) {
            let breaker = document.createElement('div')
                breaker.classList.add('breaker')
            image.insertAdjacentElement('afterend', breaker)
        }
        count++
    })
}

let setImagesFlex = () => {
    images = document.querySelectorAll('div.image img')
    images.forEach( image => {
        image.parentElement.style.flex = image.naturalWidth / image.naturalHeight
    })
}

Promise.all(
    Array.from(document.images)
        .filter(img => !img.complete)
        .map(img => new Promise(resolve => { img.onload = img.onerror = resolve })))
        .then(() => {
    setImagesFlex()
    setBreakers()
    galleryScroll()
})

let galleryScroll = () => {
    let currentTag
    var count = 0

    galleryImages.forEach( galleryImage => {
        if ( currentTag != galleryImage.getAttribute('data-tag') ) {
            currentTag = galleryImage.getAttribute('data-tag')
            tagImages = document.querySelectorAll('img[data-tag=' + currentTag + ']')
            lastTagImage = tagImages[tagImages.length - 1]
            
            let top = tagImages[0].parentElement.offsetTop
            let bottom = lastTagImage.parentElement.offsetTop + lastTagImage.parentElement.offsetHeight
            let link = document.querySelector('a[href="#' + currentTag + '"]')

            
            document.body.parentNode.scrollTop <= 100 ? scrollPosition = document.body.parentNode.scrollTop : scrollPosition = document.body.parentNode.scrollTop + document.body.parentNode.clientHeight
            

            if ( scrollPosition >= top && scrollPosition <= bottom ) {
                galleryLinks.forEach( link => { link.classList.remove('active') })
                link?.classList.add('active')
            }
        }
    })
}

galleryLinks.forEach( link => {
    link.addEventListener('click', event => {
        let hash = event.target.hash.split('#')[1]
        let image = document.querySelectorAll('img[data-tag=' + hash  + ']')[0]
        let index = [].indexOf.call(galleryLinks, link)

        index > 1 ? direction = 'end' : direction = 'start'

        image.scrollIntoView({
            behavior: 'smooth',
            block: direction
        })
    })
})

window.addEventListener('scroll', galleryScroll)
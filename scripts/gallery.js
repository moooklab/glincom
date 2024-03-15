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
   let scrollCenterPosition = window.scrollY + window.innerHeight / 2
   let currentTag

   galleryImages.forEach( galleryImage => {
        if ( currentTag != galleryImage.getAttribute('data-tag') ) {
            currentTag = galleryImage.getAttribute('data-tag')
            tagImages = document.querySelectorAll('img[data-tag=' + currentTag + ']')
            lastTagImage = tagImages[tagImages.length - 1]
            
            let top = tagImages[0].parentElement.offsetTop + tagImages[0].parentElement.offsetHeight / 2
            let bottom = lastTagImage.parentElement.offsetTop + lastTagImage.parentElement.offsetHeight
            let link = document.querySelector('a[href="#' + currentTag + '"]')

            if ( scrollCenterPosition >= top && scrollCenterPosition <= bottom ) {
                galleryLinks.forEach( link => { link.classList.remove('active') })
                link?.classList.add('active')
            }
        }

   })
}

galleryLinks.forEach((link) => {
    link.addEventListener('click', event => {
        let hash = event.target.hash.split('#')[1]
        let image = document.querySelectorAll('img[data-tag=' + hash  + ']')[0]
        image.scrollIntoView({
            behavior: 'smooth'
        })
    })
})

window.addEventListener('scroll', galleryScroll)
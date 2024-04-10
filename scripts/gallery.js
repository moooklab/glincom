let gallery = document.querySelector('section.gallery')
let galleryImages = gallery.querySelectorAll('div.image img')
let galleryLinks = gallery.querySelectorAll('div.navigation a')
let globalPercentages = new Array()

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

// let galleryScroll = () => {
//     tags = new Array()
//     percentages = new Array()
//     pixels = new Array()
    
//     document.querySelectorAll('[data-tag]').forEach( element => { tags.push( element.getAttribute('data-tag') )  })
//     tags = [...new Set(tags)]

//     galleryHeight = gallery.offsetHeight
//     galleryTopPosition = gallery.getBoundingClientRect().top + document.body.parentNode.scrollTop
    
//     tags.forEach( tag => {
//         image = document.querySelector('[data-tag=' + tag + ']')
//         imageTopPosition = image.getBoundingClientRect().top + document.body.parentNode.scrollTop - galleryTopPosition
//         percentages.push( imageTopPosition / ( galleryHeight / 100 ) )
//     })

//     globalPercentages = percentages

//     percentages.forEach( (percent, index) => {
//         if( getElementScrollPosition( gallery ) > percent ) {
//             galleryLinks.forEach( link => { link.classList.remove('active') })
//             galleryLinks[index].classList.add('active')
//         }
//     })

// }

// galleryLinks.forEach( (link, index) => {
//     link.addEventListener('click', event => {
//         varPos = galleryTopPosition + (globalPercentages[index] * ((gallery.scrollHeight - window.innerHeight) / 100)) + 10
//         window.scrollTo({
//             top: varPos,
//         })
//     })
// })

// function getElementScrollPosition(element){
//     return (window.scrollY - galleryTopPosition) / (gallery.scrollHeight - window.innerHeight) * 100
// }

// let galleryScroll = () => {
//     let currentTag

//     galleryImages.forEach( galleryImage => {
//         if ( currentTag != galleryImage.getAttribute('data-tag') ) {
//             currentTag = galleryImage.getAttribute('data-tag')
//             tagImages = document.querySelectorAll('img[data-tag=' + currentTag + ']')
//             lastTagImage = tagImages[tagImages.length - 1]
            
//             let top = tagImages[0].parentElement.offsetTop + gallerySection.offsetTop
//             let bottom = lastTagImage.parentElement.offsetTop + lastTagImage.parentElement.offsetHeight + gallerySection.offsetTop
//             let link = document.querySelector('a[href="#' + currentTag + '"]')

//             document.body.parentNode.scrollTop <= gallerySection.offsetTop + 100 ? scrollPosition = document.body.parentNode.scrollTop : scrollPosition = document.body.parentNode.scrollTop + document.body.parentNode.clientHeight  
            
//             if ( scrollPosition >= top && scrollPosition <= bottom ) {
//                 galleryLinks.forEach( link => { link.classList.remove('active') })
//                 link?.classList.add('active')
//             }
//         }
//     })
// }

// galleryLinks.forEach( link => {
//     link.addEventListener('click', event => {
//         let hash = event.target.hash.split('#')[1]
//         let image = document.querySelectorAll('img[data-tag=' + hash  + ']')[0]
//         let index = [].indexOf.call(galleryLinks, link)

//         index > 1 ? direction = 'end' : direction = 'start'

//         image.scrollIntoView({
//             behavior: 'smooth',
//             block: direction
//         })
//     })
// })

galleryLinks.forEach( link => {
    link.addEventListener('click', event => {
        let hash = event.target.hash.split('#')[1]
        let image = document.querySelectorAll('img[data-tag=' + hash  + ']')[0]

        galleryLinks.forEach( link => { link.classList.remove('active') })
        link.classList.add('active')

        image.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
})

window.addEventListener('scroll', galleryScroll)
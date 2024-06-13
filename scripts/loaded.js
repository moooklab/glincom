file = document.querySelector('label.file input')
file?.addEventListener('change', function () {

    if( this.value ) {
        this.parentElement.classList.add('added')
        this.parentNode.querySelector('span.filename').textContent = this.files[0].name
    }
})
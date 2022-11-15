class Lightbox {

    static init () {
        const links = document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]')
            .forEach(link => link.addEventListener('click', e =>
            {
                e.preventDefault()
                new Lightbox(e.currentTarget.getAttribute('href'))
            }))
    }

    /**
     * 
     * @param {string} url URL de l'image
     */
    constructor (url) {
        const element = this.buildDom(url)
        document.body.appendChild(element)
    }

    /**
     * 
     * @param {KeyboardEvent} e 
     */
    onKeyUp (e) {

    }


    /**
     * Ferme la lightbox
     * @param {MouseEvent} e 
     */
    close (e) {
        e.preventDefault()
        this.element.classList.add('fadeOut')
        window.setTimeout(() => {
            this.element.parentElement.removeChild(this.element)
        }, 500)
    }

    /**
     * 
     * @param {string} url URL de l'image
     * @return {HTMLElement}
     */
    buildDom (url) {
        const dom = document.createElement('div')
        dom.classList.add('lightbox')
        dom.innerHTML = `
        <button class="lightbox__close">Close dialog</button>
        <button class="lightbox__next">Next image</button>
        <button class="lightbox__prev">Previous image</button>
        <div class="lightbox__container">
            <img src ="${url}" alt ="">
        </div>
        `
        dom.querySelector('.lightbox__close').addEventListener('click', this.close.bind(this))
        return dom
    }

}

Lightbox.init()
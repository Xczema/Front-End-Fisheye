class Image extends Media
{
    constructor(data, photographer)
    {
        super(data, photographer);
        this.media = data.image;
        this.onKeyUp = this.onKeyUp.bind(this);
        countTotalLikes += this.countLikes;
        document.addEventListener('keyup', this.onKeyUp);
    }

    buildCard()
    {
    return `
    <div class="media-wrapper" data-id="${this.id}">
        <a href="#" class="media-thumbnail" data-src="assets/sample/${this.photographer.name}/${this.media}">
            <img src="assets/sample/${this.photographer.name}/${this.media}" alt=""/>
        </a>
        <div class="pictureText">
            <div>
                <p>${this.title}</p>
            </div>
            <div class="pictureLike__btn">
                <button class="like__btn">
                    <span class="count">${this.countLikes}</span>
                    <span class="iconLike"><i class="far fa-regular fa-heart"></i></span>
                </button>
            </div>
        </div>
    </div>
    `
    }
    // LIGHTBOX
    renderSlide() {
        document.querySelector('.lightbox').hidden = false;
        const img = document.createElement('img');
        img.classList.add('containerMedia');
        img.src = `assets/sample/${this.photographer.name}/${this.media}`;
        document.querySelector(".lightbox__container").appendChild(img);
        return img
    }

    /**
     * Ferme la lightbox
     * @param {KeyboardEvent} event 
     */
    onKeyUp(event) {
        if (event.key === 'Escape') {
            this.closeSlider(event)
        }

    }



    /**
     * Ferme la lightbox
     * @param {MouseEvent} event 
     */
    closeSlider(event) {
        event.preventDefault();
        console.log('Hello, je suis la fonction closeSlider() et mon rôle est de fermer la lightbox');


        // const node = document.querySelector('.containerMedia');
        // if (node.parentNode) {
        //     node.parentNode.removeChild(node);
        // }


        // const abc = document.querySelector('.lightbox__container');
        // const abc_nest = document.querySelector('.containerMedia');
        // const garbage = abc.removeChild(abc_nest);
        
        document.removeEventListener('keyup', this.onKeyUp);
        
        // document.querySelector('.lightbox').setAttribute("hidden", true);
    }






    // LIKE FUNCTION
    addLike()
    {
        return `
        <i class="fas fa-solid fa-heart"></i>
    `
    }
    removeLike()
    {
        return `
        <i class="far fa-regular fa-heart"></i>
    `
    }
    addLikeTotal()
    {
        countTotalLikes++;
        return `
        ${countTotalLikes}
    `
    }
    removeLikeTotal()
    {
        countTotalLikes--;
        return `
        ${countTotalLikes}
    `
    }
}

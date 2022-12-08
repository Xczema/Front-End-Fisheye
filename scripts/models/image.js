class Image extends Media
{
    constructor(data, photographer)
    {
        super(data, photographer);
        this.media = data.image;
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
        const img = document.createElement('img');
        img.classList.add('containerMedia');
        img.src = `assets/sample/${this.photographer.name}/${this.media}`;
        return img;
    }

}

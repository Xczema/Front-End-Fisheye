class Video extends Media
{
    constructor(data, photographer)
    {
        super(data, photographer);
        this.video = data.video;
    }

    buildCard()
    {
    return `<div class="media-wrapper" data-id="${this.id}">
            <a href="#" class="media-thumbnail" data-src="assets/sample/${this.photographer.name}/${this.video}">
                <video src="assets/sample/${this.photographer.name}/${this.video}" alt="${this.title}, closeup view" loop muted autoplay controls></video>
            </a>
            <div class="pictureText">
                <div>
                    <p>${this.title}</p>
                </div>
                <div class="pictureLike__btn">
                    <button class="like__btn" aria-label="likes">
                        <span class="count">${this.countLikes}</span>
                        <span class="iconLike"><i class="far fa-regular fa-heart"></i></span>
                    </button>
                </div>
            </div>
        </div>`
    }
    // LIGHTBOX
    renderSlide() {
        const video = document.createElement('video');
        video.classList.add('containerMedia');
        video.ariaLabel = `${this.title}`;
        video.setAttribute('data-id', `${this.id}`);
        video.src = `assets/sample/${this.photographer.name}/${this.video}`;
        video.setAttribute('loop', '');
        video.setAttribute('muted', '');
        video.setAttribute('autoplay', '');
        // video.setAttribute('controls', '');
        return video;
    }
}

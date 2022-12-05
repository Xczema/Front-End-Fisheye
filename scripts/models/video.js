class Video extends Media
{
    constructor(data, photographer)
    {
        super(data, photographer);
        this.video = data.video;
        countTotalLikes += this.countLikes;
    }

    buildCard()
    {
    return `
        <div class="media-wrapper" data-id="${this.id}">
            <a href="#" class="media-thumbnail" data-src="assets/sample/${this.photographer.name}/${this.video}">
                <video src="assets/sample/${this.photographer.name}/${this.video}" loop muted autoplay controls></video>
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
        const video = document.createElement('video');
        video.src = `assets/sample/${this.photographer.name}/${this.video}`;
        video.setAttribute('loop', '');
        video.setAttribute('muted', '');
        video.setAttribute('autoplay', '');
        video.setAttribute('controls', '');
        document.querySelector('.lightbox__container').appendChild(video);
        return video
    }

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

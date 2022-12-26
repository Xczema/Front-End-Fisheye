class Media {
    constructor(data, photographer)
    {
        this.id = data.id;
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.countLikes = data.likes;
        this.date = data.date;
        this.price = data.price;
        this.photographer = photographer
        countTotalLikes += this.countLikes;
    }

    // LIKE FUNCTION
    addLike() {
        return `<i class="fas fa-solid fa-heart"></i>`
    }
    removeLike() {
        return `<i class="far fa-regular fa-heart"></i>`
    }
    addLikeTotal() {
        countTotalLikes++;
        return `${countTotalLikes}`
    }
    removeLikeTotal() {
        countTotalLikes--;
        return `${countTotalLikes}`
    }

    // LIGHTBOX FUNCTION
    changeTitle() {
        return (this.title);
    }


    renderNextSlide(medias, index) {
        if (medias[index + 1] instanceof Image) {
            const img = document.createElement('img');
            img.classList.add('containerMedia');
            img.setAttribute('data-id', `${medias[index + 1].id}`);
            img.src = `assets/sample/${medias[index + 1].photographer.name}/${medias[index + 1].media}`;
            return img;
        } else {
            const video = document.createElement('video');
            video.classList.add('containerMedia');
            video.setAttribute('data-id', `${medias[index + 1].id}`);
            video.src = `assets/sample/${medias[index + 1].photographer.name}/${medias[index + 1].video}`;
            video.setAttribute('loop', '');
            video.setAttribute('muted', '');
            video.setAttribute('autoplay', '');
            video.setAttribute('controls', '');
            return video;
        }
    }
    renderPrevSlide(medias, index) {
        if (medias[index - 1] instanceof Image) {
            const img = document.createElement('img');
            img.classList.add('containerMedia');
            img.setAttribute('data-id', `${medias[index - 1].id}`);
            img.src = `assets/sample/${medias[index - 1].photographer.name}/${medias[index - 1].media}`;
            return img;
        } else {
            const video = document.createElement('video');
            video.classList.add('containerMedia');
            video.setAttribute('data-id', `${medias[index - 1].id}`);
            video.src = `assets/sample/${medias[index - 1].photographer.name}/${medias[index - 1].video}`;
            video.setAttribute('loop', '');
            video.setAttribute('muted', '');
            video.setAttribute('autoplay', '');
            video.setAttribute('controls', '');
            return video;
        }
    }
}
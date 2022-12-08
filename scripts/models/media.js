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
}
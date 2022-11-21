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
    }

    
}
class Video
{
    constructor(data, photographer)
    {
        this.id = data.id;
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.video = data.video;
        this.countLikes = data.likes;
        this.date = data.date;
        this.price = data.price;
        this.photographer = photographer
    }

    buildCard()
        {
            return `
            <a href="assets/sample/${this.photographer.name}/${this.video}">
                <video src="assets/sample/${this.photographer.name}/${this.video}" loop muted autoplay controls></video>
            </a>
            <div class="pictureText">
                <div>
                    <p>${this.title}</p>
                    </div>
                    <div class="pictureLike__btn">
                    <button class="like__btn">
                        <span id="count">${this.countLikes}</span>
                        <span id="icon"><i class="far fa-regular fa-heart"></i></span>
                    </button>
                </div>
            </div>
            `
        }
}

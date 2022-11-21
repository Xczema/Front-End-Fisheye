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
            <a href="assets/sample/${this.photographer.name}/${this.media}">
                <img src="assets/sample/${this.photographer.name}/${this.media}" alt=""/>
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

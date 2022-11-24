// VARIABLES GLOBALES
const id = getId();
let countTotalLikes = 0;

init();


async function init() {
    // Récupères les datas des photographes
    const data = await getData();

    const photographer = data.photographers.find(a => a.id === id);
    const medias = data.media.filter(a => a.photographerId === id)
    .map(a => mediaFactory(a, photographer))

    // Affiche les détails du photographe
    displayPhotographerDetails(photographer);

    // Affiche le bouton "Contactez-moi"
    displayContactButton();

    // Affiche la photo de profil du photographe
    displayPhotographerPicture(photographer);

    // Afficher le filtre
    displayFilterButton();

    // Afficher les médias
    displayMedias(medias);

    // Fonction Like
    displayTotalLikes(photographer);
    listenForLike(medias);
};

function getId() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
      return Number(params.id);  //params.key;; "some_value"
}

function displayPhotographerDetails(photographer) {
    const divPhotographerInfo = document.createElement('div');
    divPhotographerInfo.setAttribute("id", "photographerInfo");
        divPhotographerInfo.innerHTML = `
        <h2>${photographer.name}</h2>
        <p>${photographer.city}, ${photographer.country}</p>
        `
    const pTagline = document.createElement('p');
    pTagline.setAttribute("id", "pTagline");
        pTagline.innerHTML = `
        <p>${photographer.tagline}</p>
        `
    document.querySelector(".photograph-header").appendChild(divPhotographerInfo)
    document.querySelector("#photographerInfo").appendChild(pTagline)
}

function displayContactButton() {
    const contactButton = document.createElement('button');
    contactButton.setAttribute("class", "contact_button");
    contactButton.setAttribute("onclick", "displayModal()");
    contactButton.innerHTML = `Contactez-moi`
    document.querySelector(".photograph-header").appendChild(contactButton)
}

function displayPhotographerPicture(photographer) {
    const divPhotographerPicture = document.createElement('div');
    divPhotographerPicture.setAttribute("id", "photographerPicture")
        divPhotographerPicture.innerHTML = `
        <img src="assets/photographers/${photographer.portrait}"/>
        `
    document.querySelector(".photograph-header").appendChild(divPhotographerPicture)
}

function displayFilterButton() {
    const filterButton = document.createElement('div');
    filterButton.setAttribute("class", "filter_button");
    filterButton.innerHTML = `
    <label for="filter-select">Trier par</label>
        <select name="filter" id="filter-select">
            <option value="popularity">Popularité</option>
            <option value="date">Date</option>
            <option value="titre">Titre</option>
        </select>
    `
    document.querySelector(".filterButton").appendChild(filterButton)
}


function displayMedias(medias) {
    medias.forEach(media =>
    {
        const divGallery = document.createElement('div')
        divGallery.setAttribute("class", "divGallery")
        divGallery.innerHTML = media.buildCard();
        
        document.querySelector(".photograph-gallery").appendChild(divGallery)
    })
}
function mediaFactory (media, photographer) {
    if (media.image) {
        return new Image (media, photographer);
    }
    return new Video (media, photographer);
}

//**     LIKE FUNCTIONNALITY    */

function listenForLike (medias) {
    medias.forEach(media =>
    {
        const likeBtn = document.querySelector(`.media-wrapper[data-id="${media.id}"] .like__btn`);
        const likeIcon = document.querySelector(`.media-wrapper[data-id="${media.id}"] .iconLike`);
        const count = document.querySelector(`.media-wrapper[data-id="${media.id}"] .count`);
        const countTotal = document.querySelector(`#countTotalLikes`);
        let clicked = false;

        likeBtn.addEventListener('click', () =>
        {       
            if (!clicked) {
                clicked = true;
                count.textContent++;
                likeIcon.innerHTML = media.addLike();
                countTotal.innerHTML = media.addLikeTotal();
            } else {
                clicked = false,
                count.textContent--;
                likeIcon.innerHTML = media.removeLike();
                countTotal.innerHTML = media.removeLikeTotal();
            }
        });
    })
}

function displayTotalLikes(photographer) {
    //COMPTEUR DE LIKE
    const totalLikes = document.createElement('div');
    totalLikes.setAttribute("id", "totalLikes");
    totalLikes.innerHTML = `
    <div>
        <p id="countTotalLikes">${countTotalLikes}</p>
        <i class="fas fa-solid fa-heart"></i>
    </div>
    <div>
        <p>${photographer.price}€ / jour</p>
    </div>
    `
    document.querySelector("#main").appendChild(totalLikes)
}
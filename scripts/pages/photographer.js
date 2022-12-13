// VARIABLES GLOBALES
const id = getId();
let countTotalLikes = 0;

init();

async function init() {
    // Récupères les datas des photographes
    const data = await getData();

    const photographer = data.photographers.find(a => a.id === id);
    const medias = data.media.filter(a => a.photographerId === id)
    .map(a => mediaFactory(a, photographer));

    // Affiche les détails du photographe
    displayPhotographerDetails(photographer);
    
    // Affiche le bouton "Contactez-moi"
    displayContactButton();
    
    // Affiche la photo de profil du photographe
    displayPhotographerPicture(photographer);
    
    // Afficher le filtre
    displayFilterButton();
    sortByPopularity(medias);
    
    // Afficher les médias
    displayMedias(medias);
    
    // Fonction Like
    displayTotalLikes(photographer);
    listenForLike(medias);
    
    // LightBox
    initSlider(medias);
};

function getId() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
      return Number(params.id);  //params.key;; "some_value"
}
//**     PHOTOGRAPHE HEADER    */
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
//**     BTN Filtre séléctionné    */
function getSelectValue() {
    let selectedValue = document.getElementById("filter-select").value;
    console.log(selectedValue);
    if (selectedValue === 'popularity') {
        sortByPopularity();
    }
    if (selectedValue === 'date') {
        sortByDate();
    }
}
//**     Sort by Popularity Function    */
function sortByPopularity(medias) {
        console.log('Medias filtré par popularité');
        console.log(medias);
        medias.forEach(media => {
            console.log(media.countLikes)
            // media.sort((a, b) => {
            //     return b.countLikes - a.countLikes;
            // });
        });
}
//**     Sort by Date Function    */
function sortByDate() {
        console.log('Medias filtré par date');
}
//**     BTN FILTER GALLERY    */
function displayFilterButton() {
    const filterButton = document.createElement('div');
    filterButton.setAttribute("class", "filter_button");
    filterButton.innerHTML = `
    <label for="filter-select">Trier par</label>
    <select name="filter" id="filter-select" onchange="getSelectValue()">
    <option value="popularity">Popularité</option>
    <option value="date">Date</option>
    <option value="titre">Titre</option>
    </select>
    `
    document.querySelector(".filterButton").appendChild(filterButton);
}


//**     CREATE GALLERY    */
function displayMedias(medias)
{
    medias.forEach(media =>
    {
        const divGallery = document.createElement('div')
        divGallery.setAttribute("class", "divGallery")
        divGallery.innerHTML = media.buildCard();
        
        document.querySelector(".photograph-gallery").appendChild(divGallery)
    })
}
function mediaFactory (media, photographer)
{
    if (media.image) {
        return new Image (media, photographer);
    }
    return new Video (media, photographer);
}
//**     LIKE FUNCTIONNALITY    */
function listenForLike (medias)
{
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
function displayTotalLikes(photographer)
{
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
//**     SLIDER FUNCTIONNALITY    */
function listenForSlider(medias)
{
    medias.forEach(media =>
    {
        const linksMedia = document.querySelector(`.media-wrapper[data-id="${media.id}"] .media-thumbnail`);
        const loadMedia = document.querySelector('.lightbox__container');
        linksMedia.addEventListener('click', () =>
        {   
            document.querySelector('.lightbox').hidden = false;
            loadMedia.appendChild(media.renderSlide());                
        });   
    });
    // Lightbox : Next Media
    document.querySelector('.lightbox__next').addEventListener('click', () => {
        nextMedia(medias);
    });
    document.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowRight') {
            nextMedia(medias);
        }
    });

    // Lightbox : Previous Media
    document.querySelector('.lightbox__prev').addEventListener('click', () => {
        prevMedia(medias);
    });
    document.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowLeft') {
            prevMedia(medias);
        }
    });

    // Lightbox : Close
    document.querySelector('.lightbox__close').addEventListener('click', () => {
        removeCurrentMedia();
        hideSlider(); 
    });
    document.addEventListener('keyup', (e) => {
        if (e.key === 'Escape') {
            removeCurrentMedia();
            hideSlider();
        }
    });
};
function initSlider(medias)
{
    const sliderEl = document.createElement('div');
    sliderEl.classList.add('lightbox');
    sliderEl.innerHTML = `
        <button class="lightbox__close">Close dialog</button>
        <button class="lightbox__next">Next image</button>
        <button class="lightbox__prev">Previous image</button>
        <div class="lightbox__container"></div>
        `;
    document.querySelector('body').appendChild(sliderEl);
    hideSlider();
    listenForSlider(medias);
};
function hideSlider() {
    document.querySelector('.lightbox').setAttribute("hidden", true);
};
function removeCurrentMedia() {
    document.querySelector('.lightbox__container .containerMedia').remove();
};
function nextMedia(medias) {
    console.log('Next Media');
    const mediaLoadedId = document.querySelector(".containerMedia[data-id]").getAttribute('data-id');
    const loadMedia = document.querySelector('.lightbox__container');
    let index = medias.findIndex(function (media) {
        return media.id == mediaLoadedId;
    });
    if (index === medias.length -1) {
        index = -1;
    }
    removeCurrentMedia();
    medias.forEach(media => {
        if (mediaLoadedId == media.id) {
            loadMedia.appendChild(media.renderNextSlide(medias, index));
        }
    })
};
function prevMedia(medias) {
    console.log('Prev Media');
    const mediaLoadedId = document.querySelector(".containerMedia[data-id]").getAttribute('data-id');
    const loadMedia = document.querySelector('.lightbox__container');
    let index = medias.findIndex(function (media) {
        return media.id == mediaLoadedId;
    });
    if (index === 0) {
        index = medias.length;
    }
    removeCurrentMedia();
    medias.forEach(media => {
        if (mediaLoadedId == media.id) {
            loadMedia.appendChild(media.renderPrevSlide(medias, index));
        }
    })
};
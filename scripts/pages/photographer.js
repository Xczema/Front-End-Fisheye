const id = getId();
init();


async function init() {
    // Récupères les datas des photographes
    const data = await getData();

    const photographer = data.photographers.find(a => a.id === id);
    const medias = data.media.filter(a => a.photographerId === id)
    .map(a => mediaFactory(a, photographer))

    console.log(medias)

    // Affiche les détails du photographe
    displayPhotographerDetails(photographer);

    // Affiche le bouton "Contactez-moi"
    displayContactButton();

    // Affiche la photo de profil du photographe
    displayPhotographerPicture(photographer);

    // Afficher le filtre
    displayFilterButton();

    // Afficher les médias
    displayMedias(medias, photographer);

    // Fonction Like
    listenForLike(medias);
    displayTotalLikes(photographer);

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


function listenForLike (medias) {
    medias.forEach(media =>
    {
        // Récupérer les selectors
        const likeBtn = document.querySelector(".like__btn");
        let likeIcon = document.querySelector("#icon");
        let count = document.querySelector("#count");
        let clicked = false;

        likeBtn.addEventListener('click', countTotal);

        // Mettre une fonction like qui va s'appliquer à tous les medias (indifférement que ce soit une image ou une vidéo) car la fonction est la même
        function countTotal () {
            if (!clicked) {
                clicked = true;
                likeIcon.innerHTML = `<i class="fas fa-solid fa-heart"></i>`;
                count.textContent++;
            } else {
                clicked = false,
                likeIcon.innerHTML = `<i class="far fa-regular fa-heart"></i>`;
                count.textContent--;
            }

            console.log(count)

        }
    })
}

    // const likeBtns = document.querySelectorAll(".like__btn");
    
    // // button clicked
    // let clicked = false;
    
    // // mettre dans une boucle
    // let likeIcon = document.querySelector("#icon");
    // let count = document.querySelector("#count");

    // likeBtns.forEach(button => 
    //     {
    //     button.addEventListener("click", () => {
    //         if (!clicked) {
    //             clicked = true;
    //             likeIcon.innerHTML = `<i class="fas fa-solid fa-heart"></i>`;
    //             count.textContent++;
    //         } else {
    //             clicked = false,
    //             likeIcon.innerHTML = `<i class="far fa-regular fa-heart"></i>`;
    //             count.textContent--;
    //         }
    //     })
    // })


function displayTotalLikes(photographer) {
    //COMPTEUR DE LIKE
    const totalLikes = document.createElement('div');
    totalLikes.setAttribute("id", "totalLikes");
    totalLikes.innerHTML = `
    <div>
        <p>297 081</p>
        <i class="fas fa-solid fa-heart"></i>
    </div>
    <div>
        <p>${photographer.price}€ / jour</p>
    </div>
    `
    document.querySelector("#main").appendChild(totalLikes)
}
// Compteur de like

// Créer le HTML et CSS
// Placer les events listeners
// Récupérer les informations
// Calculer la nouvelle valeur de like (après le clic)
// Les affichers dans le compteur de like total ET sur le media cliqué

// Enelever le like
// Enregistrer l'état "cliqué ou non" --> boolean

// Créer un état "cliqué ou non"
// L'appliquer à chaque button
// Et par conséquent décrémenter le compteur de like
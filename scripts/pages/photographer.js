//Mettre le code JavaScript lié à la page photographer.html
const id = getId();
init();


async function init() {
    // Récupères les datas des photographes
    const data = await getData();
    const photographer = data.photographers.find(a => a.id === id);
    const medias = data.media.filter(a => a.photographerId === id)
    
    // Affiche les détails du photographe
    displayPhotographerDetails(photographer);

    // Afficher le filtre


    // Afficher les médias
    displayMedias(medias)

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
    //COMPTEUR DE LIKE
    // <div id="totalLikes" style="position: fixed;
    // bottom: 0px;
    // right: 50px;
    // background-color: red;
    // color: white;
    // width: 100px;
    // height: 100px;"></div>
    
    document.querySelector(".photograph-header").appendChild(divPhotographerInfo)
    document.querySelector("#photographerInfo").appendChild(pTagline)
}

function displayPhotographerPicture(photographer) {
    const picture = `assets/photographers/${portrait}`;
    const divPhotographerPicture = document.createElement('div');
    divPhotographerPicture.setAttribute("id", "photographerPicture")
    const photographerPicture = document.createElement( 'img' );
    photographerPicture.setAttribute("src", picture)

    document.querySelector(".photograph-header").appendChild(divPhotographerPicture)
    document.querySelector("#photographerPicture").appendChild(photographerPicture)
}


function displayMedias(medias, photographer) {
    medias.forEach(media =>
    {
        const div = document.createElement('div')
        if (media.image)
        {
            div.innerHTML = 
            `<img src="assets/sample/${photographer.name}/${media.image}" style="width:200px"/>
            <p>${media.title}</p>`
            
        } else {
            div.innerHTML = 
            `<video src="assets/sample/${photographer.name}/${media.video}" style="width:200px"></video>
            <p>${media.title}</p>`
            
        }

        document.querySelector(".photograph-header").appendChild(div)
    })
}
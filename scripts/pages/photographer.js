//Mettre le code JavaScript lié à la page photographer.html

// GET DATA
async function getData() {
    // Penser à remplacer par les données récupérées dans le json
    return fetch("data/photographers.json")
        .then(function(resp) {
            return resp.json();
        })
}

// DISPLAY DATA
async function displayData(photographers) {
    const photographeHeader = document.querySelector(".photograph-header");

    photographers.forEach((artiste) => {
        const photographerModel = photographerFactory(artiste);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographeHeader.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const data = await getData();
    displayData(data.photographers);
};

init();


//photographerFactory
function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;
    const picture = `/assets/photographers/${portrait}`;
    const photographerLink = `photographer.html/?${id}`;
    //URL
    // console.log(photographerLink);

    function getUserCardDOM() {
        const section = document.createElement( 'section' );

        const link = document.createElement( 'a' );
        link.setAttribute("href", photographerLink)
        // Lien vers la page photographe
        // console.log(link)

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const p = document.createElement( 'p');
        p.textContent = `${city}, ${country}`;
        const p2 = document.createElement( 'p' );
        p2.textContent = `${tagline}`;
        p2.style.color = "black";
        const p3 = document.createElement( 'p' );
        p3.textContent = `${price}€/jour`;
        p3.style.color = "#525252";
        section.appendChild(link);
        link.appendChild(img);
        link.appendChild(h2);
        section.appendChild(p);
        section.appendChild(p2);
        section.appendChild(p3);
        return (section);
    }
    return { name, picture, getUserCardDOM }
}
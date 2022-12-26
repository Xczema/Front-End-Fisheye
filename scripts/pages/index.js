    // Au lieu d'avoir 2 function GetPhotographers et GetMedia, 
    // async function Media() {
    //     return fetch("data/photographers.json")
    //         .then(function(resp) {
    //             return resp.json();
    //         })

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const data = await getData();
        displayData(data.photographers);
    }
    
    init();
    
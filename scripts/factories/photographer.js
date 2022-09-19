function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;
    const picture = `assets/photographers/${portrait}`;
    const photographerLink = `photographer.html/?${id}`;
    //URL
    console.log(photographerLink);

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

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
        article.appendChild(link);
        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(p);
        article.appendChild(p2);
        article.appendChild(p3);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}
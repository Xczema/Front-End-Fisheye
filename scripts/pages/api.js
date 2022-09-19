async function getData() {
    // Penser à remplacer par les données récupérées dans le json
    return fetch("data/photographers.json")
        .then(function(resp) {
            return resp.json();
        })
}

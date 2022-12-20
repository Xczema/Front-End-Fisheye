// ------ FORMULAIRE CONTACT H2 ------ //

// Récupération des éléments du DOM
init();
async function init() {
    // Récupères les datas des photographes
    const data = await getData();
    const photographer = data.photographers.find(a => a.id === id);

    //// Ajout du nom du photographe au H2 du formulaire de contact
    changeFormTitle(photographer);
};

// ------ VALIDATION DES CHAMPS DU FORMULAIRE ------ //
const formTitle = document.getElementById('form-title');
const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const email = document.getElementById('email');
const message = document.getElementById('message');
const input = document.getElementsByClassName('text-control');
const form = document.getElementById('form');
const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/;

// Ajout du nom du photographe au H2 du formulaire de contact
function changeFormTitle (photographer) {
    formTitle.innerHTML = `
    <h2>Contactez-moi<br>${photographer.name}</h2>
    `
}

function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

// Verification Prénom
function checkFirstName() {
    if (firstName.value.trim().length < 2 || first.value.trim() === '' || !firstName.value.match(regex)) {
        firstName.parentElement.setAttribute('data-error-visible', 'true');
        firstName.style.border = '2px solid #e54858';
        return false;
    }
    first.parentElement.setAttribute('data-error-visible', 'false');
    first.style.border = 'solid #279e7a 0.19rem';
    let firstNameVal = document.getElementById('first').value;
    console.log(firstNameVal);
    return true;
}
// Verification Nom de famille
function checkLastName() {
    if (lastName.value.trim().length < 2 || last.value.trim() === "" || !lastName.value.match(regex)) {
        lastName.parentElement.setAttribute('data-error-visible', 'true');
        lastName.style.border = '2px solid #e54858';
        return false;
    }
    last.parentElement.setAttribute('data-error-visible', 'false');
    last.style.border = 'solid #279e7a 0.19rem';
    let nameVal = document.getElementById('last').value;
    console.log(nameVal);
    return true;
}
// Verification Adresse Email
function checkEmail() {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.value.trim().match(re)) {
        email.parentElement.setAttribute('data-error-visible', 'false');
        email.style.border = 'solid #279e7a 0.19rem';
        return true;
    }
    email.parentElement.setAttribute('data-error-visible', 'true');
    email.style.border = '2px solid #e54858';
    let emailVal = document.getElementById('email').value;
    console.log(emailVal);
    return false;
}
// Verification Message
function checkMessage() {
    if (message.value.trim().length < 140 || message.value.trim() === "") {
        message.parentElement.setAttribute('data-error-visible', 'true');
        message.style.border = '2px solid #e54858';
        return false;
    }
    message.parentElement.setAttribute('data-error-visible', 'false');
    message.style.border = 'solid #279e7a 0.19rem';
    let messageVal = document.getElementById('message').value;
    console.log(messageVal);
    return true;
}




// Paramétrage de l'event qui delenche la function de validation de chaque champ du formulaire.
// Note: L'évènement focusout est déclenché lorsqu'un élément du DOM est sur le point de perdre le focus. La différence principale entre cet évènement et blur (en-US) est que ce dernier ne se propage pas.
function formFieldsValidation(element, method, event) {
    element.addEventListener(event, method);
}
formFieldsValidation(firstName, checkFirstName, 'focusout');
formFieldsValidation(lastName, checkLastName, 'focusout');
formFieldsValidation(email, checkEmail, 'focusout');
formFieldsValidation(message, checkMessage, 'focusout');

// 1 fonction pour toutes les regrouper et check en 1x fois tous les champs
function forAllFieldsValidation() {
    checkFirstName();
    checkLastName();
    checkEmail();
    checkMessage();
}

// 1 function pour s'assurer que le formulaire est valide avant envoi (chaque champ est OK).
function formValidation() {
    if (checkFirstName() === true &&
        checkLastName() === true &&
        checkEmail() === true &&
        checkMessage() === true) 
        {
            return true;
        }
    return false;
}

// Envoi du formulaire
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (formValidation() == true) {
        displayModalSubmit(); // Affiche le message de confirmation de la soumission réussie
        document.querySelector('form').reset();
    } else {
        forAllFieldsValidation();
    }
});
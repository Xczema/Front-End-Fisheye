// DOM Elements MODAL
const modalbg = document.querySelector("#contact_modal");
const modalBtn = document.querySelectorAll(".modal-btn");


// ---------- DISPLAY MODAL ----------
// Déclenchement de l'event Modal
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Affichage du formulaire Modal
function launchModal() {
  modalbg.style.display = "block";
}

// Fermer le formulaire Modal
function closeModal() {
  modalbg.style.display = "none";
}
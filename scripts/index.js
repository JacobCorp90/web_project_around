const editButton = document.querySelector(".header__edit-button");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-button");
const nameInput = document.querySelector(".popup__input_name");
const aboutInput = document.querySelector(".popup__input_about");
const nameDisplay = document.querySelector(".header__title");
const aboutDisplay = document.querySelector(".header__subtitle");
const formElement = document.querySelector(".popup__container");
// Botón para editar //
editButton.addEventListener("click", function () {
  nameInput.placeholder = nameDisplay.textContent;
  aboutInput.placeholder = aboutDisplay.textContent;
  popup.classList.remove("popup_opened");
});
// Botón para cerrar el popup //
closeButton.addEventListener("click", function () {
  popup.classList.add("popup_opened");
});
// Función para manejar el envío del formulario//
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  nameDisplay.textContent = nameInput.value;
  aboutDisplay.textContent = aboutInput.value;
  popup.classList.add("popup_opened");
  nameInput.value = "";
  aboutInput.value = "";
}
// Conecta el manipulador (handler) al formulario//
formElement.addEventListener("submit", handleProfileFormSubmit);

import Card from "./card.js";
import { openImagePopup, closePopup } from "./utils.js";
import {
  enableValidation,
  resetAddImagePopupFormState,
} from "./formValidator.js";

// Array de tarjetas

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

const gallery = document.querySelector(".main__gallery");
const templateSelector = "#card-template";

initialCards.forEach((data) => {
  const card = new Card(data, templateSelector, {
    onImageClick: ({ src, alt, title }) => openImagePopup({ src, alt, title }),
  });
  const cardElement = card.generateCard();
  gallery.append(cardElement);
});
// Función para cerrar el popup de imagen
function enableImageClose() {
  const popup = document.querySelector(".image-popup");
  const closeBtn = popup.querySelector(".image-popup__close-button");

  // Botón X
  closeBtn.addEventListener("click", () => closePopup(popup));

  // Clic fuera de la imagen
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });

  // ESC
  document.addEventListener("keydown", (evt) => {
    if (
      evt.key === "Escape" &&
      !popup.classList.contains("image-popup_closed")
    ) {
      closePopup(popup);
    }
  });
}

enableImageClose();

// Botón para editar perfil //
const editButton = document.querySelector(".header__edit-button");
const popup = document.querySelector(".popup");
const nameInput = document.querySelector(".popup__input_name");
const aboutInput = document.querySelector(".popup__input_about");
const nameDisplay = document.querySelector(".header__title");
const aboutDisplay = document.querySelector(".header__subtitle");

editButton.addEventListener("click", function () {
  nameInput.placeholder = nameDisplay.textContent;
  aboutInput.placeholder = aboutDisplay.textContent;
  popup.classList.remove("popup_closed");
});

// Función para manejar el envío del formulario//
const formElement = document.querySelector(".popup__form");
formElement.addEventListener("submit", handleProfileFormSubmit);
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  nameDisplay.textContent = nameInput.value;
  aboutDisplay.textContent = aboutInput.value;
  popup.classList.add("popup_closed");

  nameInput.value = "";
  aboutInput.value = "";
}

// Botón para agregar imagen //

const addImagePopup = document.querySelector(".add-image-popup");
const addButton = document.querySelector(".header__add-button");
addButton.addEventListener("click", function () {
  resetAddImagePopupFormState();
  addImagePopup.classList.remove("add-image-popup_closed");
});

// Pop Up nueva imagen //

const titleInput = document.querySelector(".add-image-popup__input_title");
const urlInput = document.querySelector(".add-image-popup__input_url");
const imageFormElement = document.querySelector(".add-image-popup__form");
imageFormElement.addEventListener("submit", handleImageFormSubmit);

function handleImageFormSubmit(evt) {
  evt.preventDefault();

  const data = {
    name: titleInput.value.trim(),
    link: urlInput.value.trim(),
  };

  const newCard = new Card(data, templateSelector, {
    onImageClick: ({ src, alt, title }) => openImagePopup({ src, alt, title }),
  });
  const cardElement = newCard.generateCard();

  gallery.prepend(cardElement);

  // Cierra el popup y limpia el form/errores
  addImagePopup.classList.add("add-image-popup_closed");
  titleInput.value = "";
  urlInput.value = "";

  resetAddImagePopupFormState();
}

// Función para cerrar el primer formulario //

function enableProfilePopupClose() {
  const profilePopup = document.querySelector(".popup");
  const closeBtn = profilePopup.querySelector(".popup__close-button");

  // botón //
  closeBtn.addEventListener("click", () => closePopup(profilePopup));

  // click afuera //
  profilePopup.addEventListener("mousedown", (evt) => {
    if (evt.target === profilePopup) {
      closePopup(profilePopup);
    }
  });

  // esc //
  document.addEventListener("keydown", (evt) => {
    if (
      evt.key === "Escape" &&
      !profilePopup.classList.contains("popup_closed")
    ) {
      closePopup(profilePopup);
    }
  });
}

enableProfilePopupClose();

// Función para cerrar el segundo formulario //

function enableImagePopupClose() {
  const imagePopup = document.querySelector(".add-image-popup");
  const imagePopupCloseBtn = imagePopup.querySelector(
    ".add-image-popup__close-button"
  );

  // botón //
  imagePopupCloseBtn.addEventListener("click", () => closePopup(imagePopup));

  // click afuera //
  imagePopup.addEventListener("mousedown", (evt) => {
    if (evt.target === imagePopup) {
      closePopup(imagePopup);
    }
  });

  // esc //
  document.addEventListener("keydown", (evt) => {
    if (
      evt.key === "Escape" &&
      !imagePopup.classList.contains("add-image-popup_closed")
    ) {
      closePopup(imagePopup);
    }
  });
}

enableImagePopupClose();

// Validación formulario 1 //

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
});

// Validación formulario 2 //

enableValidation({
  formSelector: ".add-image-popup__form",
  inputSelector: ".add-image-popup__input",
  submitButtonSelector: ".add-image-popup__save-button",
  inactiveButtonClass: "add-image-popup__save-button_disabled",
  inputErrorClass: "add-image-popup__input_type_error",
  errorClass: "add-image-popup__input-error_active",
});

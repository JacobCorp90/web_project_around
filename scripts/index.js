import Card from "./card.js";
import FormValidator from "./formValidator.js";
import { openImagePopup, closePopup } from "./utils.js";

// Tarjetas iniciales
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

// Cierre de popup de imagen
function enableImageClose() {
  const popup = document.querySelector(".image-popup");
  const closeBtn = popup.querySelector(".image-popup__close-button");

  // Botón X
  closeBtn.addEventListener("click", () => closePopup(popup));

  // Click en overlay
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === popup) closePopup(popup);
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

// Popup Edit Profile
const editButton = document.querySelector(".header__edit-button");
const profilePopup = document.querySelector(".popup");
const nameInput = document.querySelector(".popup__input_name");
const aboutInput = document.querySelector(".popup__input_about");
const nameDisplay = document.querySelector(".header__title");
const aboutDisplay = document.querySelector(".header__subtitle");

editButton.addEventListener("click", () => {
  // Cargar placeholders actuales
  nameInput.placeholder = nameDisplay.textContent;
  aboutInput.placeholder = aboutDisplay.textContent;
  profileValidator.resetValidation();
  profilePopup.classList.remove("popup_closed");
});

// Submit del formulario de perfil
const profileForm = document.querySelector(".popup__form");
profileForm.addEventListener("submit", handleProfileFormSubmit);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameDisplay.textContent = nameInput.value;
  aboutDisplay.textContent = aboutInput.value;
  closePopup(profilePopup);
}

// Cierre: botón / overlay / ESC
function enableProfilePopupClose() {
  const closeBtn = profilePopup.querySelector(".popup__close-button");

  closeBtn.addEventListener("click", () => closePopup(profilePopup));

  profilePopup.addEventListener("mousedown", (evt) => {
    if (evt.target === profilePopup) closePopup(profilePopup);
  });

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

// Popup Add Image
const addImagePopup = document.querySelector(".add-image-popup");
const addButton = document.querySelector(".header__add-button");
const addImageForm = document.querySelector(".add-image-popup__form");
const titleInput = document.querySelector(".add-image-popup__input_title");
const urlInput = document.querySelector(".add-image-popup__input_url");

addButton.addEventListener("click", () => {
  addImageValidator.resetValidation();
  addImagePopup.classList.remove("add-image-popup_closed");
});

// Submit del formulario de nueva imagen
addImageForm.addEventListener("submit", handleImageFormSubmit);

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

  closePopup(addImagePopup);
  addImageValidator.resetValidation(); // deja el form listo para la próxima vez
}

// Cierre: botón / overlay / ESC
function enableImagePopupClose() {
  const closeBtn = addImagePopup.querySelector(
    ".add-image-popup__close-button"
  );

  closeBtn.addEventListener("click", () => closePopup(addImagePopup));

  addImagePopup.addEventListener("mousedown", (evt) => {
    if (evt.target === addImagePopup) closePopup(addImagePopup);
  });

  document.addEventListener("keydown", (evt) => {
    if (
      evt.key === "Escape" &&
      !addImagePopup.classList.contains("add-image-popup_closed")
    ) {
      closePopup(addImagePopup);
    }
  });
}
enableImagePopupClose();

// FormValidator
const profileValidator = new FormValidator(
  {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save-button",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error_active",
  },
  profileForm
);
profileValidator.enableValidation();

const addImageValidator = new FormValidator(
  {
    inputSelector: ".add-image-popup__input",
    submitButtonSelector: ".add-image-popup__save-button",
    inputErrorClass: "add-image-popup__input_type_error",
    errorClass: "add-image-popup__input-error_active",
  },
  addImageForm
);
addImageValidator.enableValidation();

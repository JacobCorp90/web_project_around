// 1) Datos iniciales

import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import PopupWithProfileImage from "../components/PopupWithProfileImage.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";

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

// 2) Instancias iniciales

const imagePopup = new PopupWithImage(".image-popup");
imagePopup.setEventListeners();

const userInfo = new UserInfo({
  userSelector: ".header__title",
  aboutSelector: ".header__subtitle",
});

const confirmDeletePopup = new PopupWithConfirmation(".confirm-popup");
confirmDeletePopup.setEventListeners();

// 3) Tarjetas (renderer - card - addItem)

const templateSelector = "#card-template";
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        item,
        templateSelector,
        ({ name, link }) => imagePopup.open({ name, link }),
        (cardInstance) => {
          // Abrir popup de confirmación
          confirmDeletePopup.setSubmitAction(() => {
            cardInstance.removeCard();
            confirmDeletePopup.close();
          });
          confirmDeletePopup.open();
        }
      );

      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
    },
  },
  ".main__gallery"
);

cardSection.renderer();

// 4) Selectores de formularios/inputs
const profilePopupSelector = ".popup";
const addImagePopupSelector = ".add-image-popup";
const changeProfileImagePopupSelector = ".change-profile-image-popup";

const profileFormEl = document.querySelector(".popup__form");
const addImageFormEl = document.querySelector(".add-image-popup__form");
const changeProfileImageFormEl = document.querySelector(
  ".change-profile-image-popup__form"
);

// Imagen de perfil en el header
const profileImageElement = document.querySelector(".header__profile-image");

const nameInput = document.querySelector(".popup__input_type_name");
const aboutInput = document.querySelector(".popup__input_type_about");

const titleInput = document.querySelector(".add-image-popup__input_type_title");
const urlInput = document.querySelector(".add-image-popup__input_type_url");

// 5) Popup editar perfil
const editProfilePopup = new PopupWithForm(profilePopupSelector, (formData) => {
  userInfo.setUserInfo(formData);
  editProfilePopup.close();
});
editProfilePopup.setEventListeners();

// Abrir popup de perfil y pre-rellenar
const editButton = document.querySelector(".header__edit-button");
editButton.addEventListener("click", () => {
  const current = userInfo.getUserInfo();
  // Rellenar los inputs con los datos actuales
  nameInput.value = current.name;
  aboutInput.value = current.about;

  // Resetear, validación y abrir
  profileValidator.resetValidation();
  editProfilePopup.open();
});

// 6) Popup añadir imagen

const addImagePopup = new PopupWithForm(addImagePopupSelector, (formData) => {
  const card = new Card(
    { name: formData.name, link: formData.link },
    templateSelector,
    ({ name, link }) => imagePopup.open({ name, link })
  );
  const cardElement = card.generateCard();
  cardSection.addItem(cardElement);

  addImagePopup.close();
});
addImagePopup.setEventListeners();

// Abrir popup "Nueva imagen"
const addButton = document.querySelector(".header__add-button");
addButton.addEventListener("click", () => {
  // Limpiar el form y deshabilitar submit hasta que sea válido
  addImageValidator.resetValidation();
  // Vaciar inputs
  titleInput.value = "";
  urlInput.value = "";

  addImagePopup.open();
});

// 7) Popup cambiar foto de perfil (solo front, sin API)

// Instancia del popup para cambiar la imagen de perfil
const changeProfileImagePopup = new PopupWithProfileImage(
  changeProfileImagePopupSelector,
  ({ link }) => {
    // Actualiza la imagen de perfil con la URL escrita en el input
    profileImageElement.src = link;
    changeProfileImagePopup.close();
  }
);

changeProfileImagePopup.setEventListeners();

// Botón que abre el popup (icono sobre la foto)
const changeImageButton = document.querySelector(
  ".header__change-image-button"
);

changeImageButton.addEventListener("click", () => {
  // Resetea errores y desactiva el botón hasta que el input sea válido
  changeProfileImageValidator.resetValidation();
  changeProfileImagePopup.open();
});

// 8) Validadores de formulario

const profileValidator = new FormValidator(
  {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save-button",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error_active",
  },
  profileFormEl
);
profileValidator.enableValidation();

const addImageValidator = new FormValidator(
  {
    inputSelector: ".add-image-popup__input",
    submitButtonSelector: ".add-image-popup__save-button",
    inputErrorClass: "add-image-popup__input_type_error",
    errorClass: "add-image-popup__input-error_active",
  },
  addImageFormEl
);
addImageValidator.enableValidation();

const changeProfileImageValidator = new FormValidator(
  {
    inputSelector: ".change-profile-image-popup__input",
    submitButtonSelector: ".change-profile-image-popup__save-button",
    inputErrorClass: "change-profile-image-popup__input_type_error",
    errorClass: "change-profile-image-popup__input-error_active",
  },
  changeProfileImageFormEl
);
changeProfileImageValidator.enableValidation();

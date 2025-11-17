// 1) Datos iniciales

import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import PopupWithProfileImage from "../components/PopupWithProfileImage.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";

/*
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
*/

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "995af76b-c320-41b0-b3d0-130cb52ff598",
    "Content-Type": "application/json",
  },
});

// 2) Instancias iniciales

const imagePopup = new PopupWithImage(".image-popup");
imagePopup.setEventListeners();

const userInfo = new UserInfo({
  userSelector: ".header__title",
  aboutSelector: ".header__subtitle",
});

const profileImageElement = document.querySelector(".header__profile-image");

// 3) Carga inicial desde la API: usuario + tarjetas

let currentUserId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    // Guardar id de usuario actual
    currentUserId = userData._id;

    // Cargar datos del usuario

    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
    });
    // Cargar avatar del servidor
    profileImageElement.src = userData.avatar;
    // Crear la Section con las tarjetas del servidor
    cardSection = new Section(
      {
        items: cards,
        renderer: (item) => {
          const cardElement = createCard(item);
          cardSection.addItem(cardElement);
        },
      },
      ".main__gallery"
    );

    // Renderizar las tarjetas
    cardSection.renderer();
  })
  .catch((err) => {
    console.log("Error cargando datos iniciales:", err);
  });

const confirmDeletePopup = new PopupWithConfirmation(".confirm-popup");
confirmDeletePopup.setEventListeners();

// 4) Tarjetas (renderer - card - addItem)

const templateSelector = "#card-template";
let cardSection;

function createCard(cardData) {
  const card = new Card(
    cardData,
    templateSelector,
    // callback para abrir el popup de imagen
    ({ name, link }) => imagePopup.open({ name, link }),
    // callback al hacer click en la papelera
    (cardInstance) => {
      confirmDeletePopup.setSubmitAction(() => {
        // 1) Llamamos a la API para borrar
        api
          .deleteCard(cardInstance.getId())
          .then(() => {
            // 2) Si todo va bien, quitamos la tarjeta del DOM
            cardInstance.removeCard();
            confirmDeletePopup.close();
          })
          .catch((err) => {
            console.log("Error al eliminar la tarjeta:", err);
          });
      });

      // Abrimos el popup de confirmación
      confirmDeletePopup.open();
    },

    // like / unlike
    (cardInstance) => {
      const cardId = cardInstance.getId();
      const request = cardInstance.isLiked()
        ? api.unlikeCard(cardId)
        : api.likeCard(cardId);
      request
        .then((updatedCard) => {
          cardInstance.setLikesState(updatedCard.isLiked);
        })
        .catch((err) => {
          console.log("Error updating like status:", err);
        });
    },
    currentUserId
  );

  return card.generateCard();
}

// 5) Selectores de formularios/inputs
const profilePopupSelector = ".popup";
const addImagePopupSelector = ".add-image-popup";
const changeProfileImagePopupSelector = ".change-profile-image-popup";

const profileFormEl = document.querySelector(".popup__form");
const addImageFormEl = document.querySelector(".add-image-popup__form");
const changeProfileImageFormEl = document.querySelector(
  ".change-profile-image-popup__form"
);

const nameInput = document.querySelector(".popup__input_type_name");
const aboutInput = document.querySelector(".popup__input_type_about");

const titleInput = document.querySelector(".add-image-popup__input_type_title");
const urlInput = document.querySelector(".add-image-popup__input_type_url");

// 6) Popup editar perfil
const editProfilePopup = new PopupWithForm(profilePopupSelector, (formData) => {
  editProfilePopup.setLoading(true);
  api
    .updateUserInfo({
      name: formData.name,
      about: formData.about,
    })
    .then((updateUser) => {
      userInfo.setUserInfo({
        name: updateUser.name,
        about: updateUser.about,
      });
      editProfilePopup.close();
    })
    .catch((err) => {
      console.log("Error updating user info:", err);
    })
    .finally(() => {
      editProfilePopup.setLoading(false);
    });
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

// 7) Popup añadir imagen

const addImagePopup = new PopupWithForm(addImagePopupSelector, (formData) => {
  addImagePopup.setLoading(true);
  api
    .addNewCard({
      name: formData.name,
      link: formData.link,
    })
    .then((newCard) => {
      const cardElement = createCard(newCard);
      cardSection.addItem(cardElement);
      addImagePopup.close();
    })
    .catch((err) => {
      console.log("Error adding new card:", err);
    })
    .finally(() => {
      addImagePopup.setLoading(false);
    });
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

// 8) Popup cambiar foto de perfil (solo front, sin API)

// Instancia del popup para cambiar la imagen de perfil
const changeProfileImagePopup = new PopupWithProfileImage(
  changeProfileImagePopupSelector,
  ({ link }) => {
    changeProfileImagePopup.setLoading(true);

    api
      .updateAvatar(link)
      .then((updatedUser) => {
        profileImageElement.src = updatedUser.avatar;
        changeProfileImagePopup.close();
      })
      .catch((err) => {
        console.log("Error updating profile image:", err);
      })
      .finally(() => {
        changeProfileImagePopup.setLoading(false);
      });
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

// 9) Validadores de formulario

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

// Inicializa el array de tarjetas con los datos proporcionados//

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

const template = document.querySelector("#card-template").content;
const gallery = document.querySelector(".main__gallery");

initialCards.forEach((card) => {
  const cardElement = template
    .querySelector(".main__gallery-item")
    .cloneNode(true);
  const nameImage = cardElement.querySelector(".main__gallery-photo-title");
  const linkImage = cardElement.querySelector(".main__gallery-image");
  const deleteButton = cardElement.querySelector(
    ".main__gallery-delete-button"
  );

  nameImage.textContent = card.name;
  linkImage.src = card.link;
  linkImage.alt = card.name;

  gallery.append(cardElement);

  deleteButton.addEventListener("click", () => {
    console.log("Delete button clicked");
    cardElement.remove();
  });

  const likeButton = cardElement.querySelector(".main__gallery-like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("main__gallery-like-button_active");
  });

  linkImage.addEventListener("mouseover", () => {
    linkImage.style.cursor = "pointer";
  });

   linkImage.addEventListener("click", () => {
    console.log("Image clicked");
    imagePopup.classList.remove("image-popup_closed");
    imagePopupLarge.src = linkImage.src;
    imagePopupLarge.alt = linkImage.alt;
    imagePopupLargeTitle.textContent = nameImage.textContent;
  });

});

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
// Botón para cerrar el popup //
const closeButton = document.querySelector(".popup__close-button");
closeButton.addEventListener("click", function () {
  popup.classList.add("popup_closed");
});
// Función para manejar el envío del formulario//
const formElement = document.querySelector(".popup__container");
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
  addImagePopup.classList.remove("add-image-popup_closed");
});

// Pop Up nueva imagen //

const titleInput = document.querySelector(".add-image-popup__input_title");
const urlInput = document.querySelector(".add-image-popup__input_url");
const imageFormElement = document.querySelector(".add-image-popup__container");
const imagePopup = document.querySelector(".image-popup");
const imagePopupLarge = document.querySelector(".image-popup__image");
const imagePopupLargeTitle = document.querySelector(".image-popup__title");
imageFormElement.addEventListener("submit", handleImageFormSubmit);

function handleImageFormSubmit(evt) {
  evt.preventDefault();

  const cardElement = template
    .querySelector(".main__gallery-item")
    .cloneNode(true);
  const nameImage = cardElement.querySelector(".main__gallery-photo-title");
  const linkImage = cardElement.querySelector(".main__gallery-image");
  const deleteButton = cardElement.querySelector(
    ".main__gallery-delete-button"
  );

  nameImage.textContent = titleInput.value;
  linkImage.src = urlInput.value;
  linkImage.alt = titleInput.value;

  gallery.prepend(cardElement);
  addImagePopup.classList.add("add-image-popup_closed");

  linkImage.addEventListener("mouseover", () => {
    linkImage.style.cursor = "pointer";
  });

  linkImage.addEventListener("click", () => {
    console.log("Image clicked");
    imagePopup.classList.remove("image-popup_closed");
    imagePopupLarge.src = linkImage.src;
    imagePopupLarge.alt = linkImage.alt;
    imagePopupLargeTitle.textContent = nameImage.textContent;
  });

  titleInput.value = "";
  urlInput.value = "";

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
}

// Botón para cerrar el popup de agregar imagen //

const imageCloseButton = document.querySelector(
  ".add-image-popup__close-button"
);
imageCloseButton.addEventListener("click", function () {
  addImagePopup.classList.add("add-image-popup_closed");
});

// Botón para cerrar el popup de imagen grande //

const imagePopupCloseButton = document.querySelector(
  ".image-popup__close-button"
);
imagePopupCloseButton.addEventListener("click", function () {
  imagePopup.classList.add("image-popup_closed");
});

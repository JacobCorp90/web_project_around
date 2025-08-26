// Inicializa el array de tarjetas con los datos proporcionados//

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
    alt: "Valle de Yosemite",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
    alt: "Lago Louise",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
    alt: "Montañas Calvas",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
    alt: "Latemar",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
    alt: "Parque Nacional de la Vanoise",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
    alt: "Lago di Braies",
  },
];

const templateGalleryItem = document.querySelector("#card-template").content;
const gallery = document.querySelector(".main__gallery");

initialCards.forEach((card) => {
  const cardElement = templateGalleryItem.cloneNode(true);

  const nameImage = cardElement.querySelector(".main__gallery-photo-title");
  const linkImage = cardElement.querySelector(".main__gallery-image");

  nameImage.textContent = card.name;
  linkImage.src = card.link;
  linkImage.alt = card.name;

  gallery.append(cardElement);
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

const imagePopup = document.querySelector(".image-popup");
const addButton = document.querySelector(".header__add-button");
addButton.addEventListener("click", function () {
  imagePopup.classList.remove("image-popup_closed");
});

// Pop Up nueva imagen //

const titleInput = document.querySelector(".image-popup__input_title");
const urlInput = document.querySelector(".image-popup__input_url");
const imageFormElement = document.querySelector(".image-popup__container");
imageFormElement.addEventListener("submit", handleImageFormSubmit);

function handleImageFormSubmit(evt) {
  evt.preventDefault();

  const cardElement = templateGalleryItem.cloneNode(true);
  const nameImage = cardElement.querySelector(".main__gallery-photo-title");
  const linkImage = cardElement.querySelector(".main__gallery-image");

  nameImage.textContent = titleInput.value;
  linkImage.src = urlInput.value;
  linkImage.alt = titleInput.value;

  gallery.prepend(cardElement);
  imagePopup.classList.add("image-popup_closed");

  titleInput.value = "";
  urlInput.value = "";
}


// Botón para cerrar el popup de agregar imagen //

const imageCloseButton = document.querySelector(".image-popup__close-button");
imageCloseButton.addEventListener("click", function () {
  imagePopup.classList.add("image-popup_closed");
});

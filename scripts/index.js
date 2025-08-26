const editButton = document.querySelector(".header__edit-button");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-button");
const nameInput = document.querySelector(".popup__input_name");
const aboutInput = document.querySelector(".popup__input_about");
const nameDisplay = document.querySelector(".header__title");
const aboutDisplay = document.querySelector(".header__subtitle");
const formElement = document.querySelector(".popup__container");




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
// Inicializa el array de tarjetas con los datos proporcionados//


  const templateGalleryItem = document.querySelector("#card-template").content;
  const gallery = document.querySelector(".main__gallery");

  initialCards.forEach(card => {
  const cardElement = templateGalleryItem.cloneNode(true);

  const nameImage = cardElement.querySelector(".main__gallery-photo-title");
  const linkImage = cardElement.querySelector(".main__gallery-image");


  nameImage.textContent = card.name;
  linkImage.src = card.link;
  linkImage.alt = card.name;

  gallery.append(cardElement);
});

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

// Pop Up nueva imagen //

const imagePopup = document.querySelector(".image-popup");
const imageCloseButton = document.querySelector(".image-popup__close-button");
const titleInput = document.querySelector(".image-popup__input_title");
const urlInput = document.querySelector(".image-popup__input_url");


// Botón para agregar imagen //


const addButton = document.querySelector(".header__add-button");
addButton.addEventListener("click", function () {
  titleInput.placeholder = nameDisplay.textContent;
  aboutInput.placeholder = aboutDisplay.textContent;
  popup.classList.remove("image-popup_opened");
});


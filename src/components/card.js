export default class Card {
  constructor(
    { name, link },
    templateSelector,
    handleCardClick,
    handleDeleteRequest
  ) {
    // Datos principales de la tarjeta
    this._name = name;
    this._link = link;

    // Template
    this._templateSelector = templateSelector;

    // Callback para abrir la imagen en popup
    this._handleCardClick = handleCardClick;

    // Callback para eliminar la tarjeta
    this._handleDeleteRequest = handleDeleteRequest;

    // Referencia interna al elemento del DOM
    this._element = this._getTemplate();

    // Demás referencias que se llenan con generateCard

    this._imageEl = this._element.querySelector(".main__gallery-image");
    this._titleEl = this._element.querySelector(".main__gallery-photo-title");
    this._deleteBtn = this._element.querySelector(
      ".main__gallery-delete-button"
    );
    this._likeBtn = this._element.querySelector(".main__gallery-like-button");
  }

  // Clona el contenido del template (privado)
  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".main__gallery-item")
      .cloneNode(true);

    return cardTemplate;
  }
  // Like, Delete, Popup (privado)
  _setEventListeners() {
    // like
    this._likeBtn.addEventListener("click", () => this._toggleLike());

    // delete
    this._deleteBtn.addEventListener("click", () => {
      this._deleteBtn.blur(); // quitar foco del botón
      if (this._handleDeleteRequest) {
        this._handleDeleteRequest(this);
      }
    });

    // popup imagen
    this._imageEl.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  }
  // like
  _toggleLike() {
    this._likeBtn.classList.toggle("main__gallery-like-button_active");
  }

  //Borrar tarjeta
  removeCard() {
    this._element.remove();
    this._element = null;
  }
  // Crea la tarjeta y asigna contenido
  generateCard() {
    this._imageEl.src = this._link;
    this._imageEl.alt = this._name;
    this._titleEl.textContent = this._name;
    this._setEventListeners();

    return this._element;
  }
}

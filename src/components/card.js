export default class Card {
  constructor({ name, link }, templateSelector, { onImageClick } = {}) {
    // Datos principales de la tarjeta
    this._name = name;
    this._link = link;

    // Template
    this._templateSelector = templateSelector;

    // Callback para abrir la imagen en popup
    this._onImageClick = onImageClick || null;

    // Demás referencias que se llenan con generateCard
    this._element = null;
    this._imageEl = null;
    this._titleEl = null;
    this._deleteBtn = null;
    this._likeBtn = null;
  }

  // Clona el contenido del template (privado)
  _getTemplate() {
    const template = document
      .querySelector(this._templateSelector)
      .content.querySelector(".main__gallery-item")
      .cloneNode(true);

    return template;
  }
  // Like, Delete, Popup (privado)
  _setEventListeners() {
    // like
    this._likeBtn.addEventListener("click", this._handleLike);

    // delete
    this._deleteBtn.addEventListener("click", this._handleDelete);

    // popup imagen
    this._imageEl.addEventListener("click", this._handleImageClick);
    this._imageEl.addEventListener("mouseover", () => {
      this._imageEl.style.cursor = "pointer";
    });
  }
  // like
  _handleLike = () => {
    this._likeBtn.classList.toggle("main__gallery-like-button_active");
  };
  // delete
  _handleDelete = () => {
    this._element.remove();
    this._element = null;
  };
  // popup imagen
  _handleImageClick = () => {
    if (typeof this._onImageClick === "function") {
      this._onImageClick({
        src: this._link,
        alt: this._name,
        title: this._name,
      });
    }
  };

  // Crea la tarjeta llenando todas las referencias (público)
  generateCard() {
    this._element = this._getTemplate();

    // Nodos
    this._imageEl = this._element.querySelector(".main__gallery-image");
    this._titleEl = this._element.querySelector(".main__gallery-photo-title");
    this._deleteBtn = this._element.querySelector(
      ".main__gallery-delete-button"
    );
    this._likeBtn = this._element.querySelector(".main__gallery-like-button");

    // Datos
    this._imageEl.src = this._link;
    this._imageEl.alt = this._name;
    this._titleEl.textContent = this._name;

    // Eventos

    this._setEventListeners();

    return this._element;
  }
}

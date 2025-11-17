export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleDeleteRequest,
    handleLikeClick,
    currentUserId
  ) {
    // Datos que vienen del servidor
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._ownerId = data.owner;
    this._isLiked = data.isLiked;

    // Callbacks
    this._handleCardClick = handleCardClick;
    this._handleDeleteRequest = handleDeleteRequest;
    this._handleLikeClick = handleLikeClick;

    // Id de usuario
    this._currentUserId = currentUserId;

    // Template
    this._templateSelector = templateSelector;

    // Clonar template y guardar referencias
    this._element = this._getTemplate();
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
    if (this._likeBtn) {
      this._likeBtn.addEventListener("click", () => {
        if (this._handleLikeClick) {
          this._handleLikeClick(this);
        }
      });
    }
    // delete
    if (this._deleteBtn) {
      this._deleteBtn.addEventListener("click", () => {
        // quitar foco del botón
        this._deleteBtn.blur();

        if (this._handleDeleteRequest) {
          this._handleDeleteRequest(this);
        }
      });
    }

    // popup imagen
    this._imageEl.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  }

  //Borrar tarjeta
  removeCard() {
    if (this._element) {
      this._element.remove();
      this._element = null;
    }
  }

  // Obtener id de la tarjeta
  getId() {
    return this._id;
  }

  // Ver si la tarjeta está likeada
  isLiked() {
    return this._isLiked;
  }

  // Actualizar estado de like
  setLikesState(isLiked) {
    this._isLiked = isLiked;
    if (this._likeBtn) {
      this._likeBtn.classList.toggle(
        "main__gallery-like-button_active",
        this._isLiked
      );
    }
  }

  // Crea la tarjeta y asigna contenido
  generateCard() {
    this._imageEl.src = this._link;
    this._imageEl.alt = this._name;
    this._titleEl.textContent = this._name;

    // Si el usuario no es el dueño, ocultar el botón de borrar
    if (this._ownerId !== this._currentUserId && this._deleteBtn) {
      this._deleteBtn.remove();
      this._deleteBtn = null;
    }

    this._setEventListeners();

    if (this._likeBtn) {
      this.setLikesState(this._isLiked);
    }

    return this._element;
  }
}

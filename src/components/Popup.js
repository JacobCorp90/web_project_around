export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() {
    this._popup.classList.remove("popup_closed");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._popup.classList.add("popup_closed");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      const clickedClose = evt.target.closest(".popup__close-button");
      if (evt.target === this._popup || clickedClose) {
        this.close();
      }
    });
  }
}

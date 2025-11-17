import Popup from "./Popup.js";
export default class PopupWithProfileImage extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".change-profile-image-popup__form");
    this._input = this._form.querySelector(
      ".change-profile-image-popup__input"
    );
    this._submitButton = this._form.querySelector("button[type='submit']");
    this._submitButtonText = this._submitButton
      ? this._submitButton.textContent
      : "";
  }

  _getInputValues() {
    return {
      link: this._input.value,
    };
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  setLoading(isLoading, loadingText = "Guardando...") {
    if (!this._submitButton) return;

    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  close() {
    super.close();
    this._form.reset();
  }
}

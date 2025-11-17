import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".confirm-popup__form");
    this._handleSubmit = null;
    this._submitButton = this._form.querySelector(
      ".confirm-popup__save-button"
    );
    this._submitButtonText = this._submitButton
      ? this._submitButton.textContent
      : "";
  }

  setSubmitAction(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (this._handleSubmit) {
        this._handleSubmit();
      }
    });
  }
  close() {
    super.close();
    this._form.reset();
  }
}

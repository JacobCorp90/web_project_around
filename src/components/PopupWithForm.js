import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector("form");
    this._submitButton = this._form.querySelector("button[type='submit']");
    this._submitButtonText = this._submitButton
      ? this._submitButton.textContent
      : "";
  }
  _getInputValues() {
    const inputs = Array.from(this._form.querySelectorAll("input"));
    const values = {};
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  // Loading state
  setLoading(isLoading, loadingText = "Loading...") {
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

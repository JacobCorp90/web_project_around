import Popup from "./Popup.js";
export default class PopupWithProfileImage extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".change-profile-image-popup__form");
    this._input = this._form.querySelector(".change-profile-image-popup__input");
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

  close() {
    super.close();
    this._form.reset();
  }
}

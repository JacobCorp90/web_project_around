import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector(".image-popup__image");
    this._titleElement = this._popup.querySelector(".image-popup__title");
  }
  open({ name, link }) {
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._titleElement.textContent = name;
    super.open();
  }
}

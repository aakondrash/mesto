import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupSelector.querySelector(".image__photo");
    this._imageDescription = this._popupSelector.querySelector(".image__description");
  }

  open(data) {
    super.open();
    this._image.src = data.link;
    this._image.alt = `Фото места ${data.name}`;
    this._imageDescription.textContent = `${data.name}`;
  }
}

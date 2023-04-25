export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupCloseButton = this._popupSelector.querySelector(".popup__close-button");
    this._handleEscKey = this._handleEscKey.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
  }

  open() {
    document.addEventListener("keyup", this._handleEscKey);
    this._popupSelector.addEventListener("click", this._handleOverlayClick);
    this._popupSelector.classList.add("popup_opened");
  }

  close() {
    document.removeEventListener("keyup", this._handleEscKey);
    this._popupSelector.removeEventListener("click", this._handleOverlayClick);
    this._popupSelector.classList.remove("popup_opened");
  }

  _handleEscKey(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClick(evt) {
    if (evt.target.classList.contains("popup_opened")) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener("click", () => {
      this.close();
    });
  }
}

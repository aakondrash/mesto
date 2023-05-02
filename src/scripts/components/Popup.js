export default class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._popupCloseButton = this._popupElement.querySelector(".popup__close-button");
    this._handleEscKey = this._handleEscKey.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
  }

  open() {
    document.addEventListener("keyup", this._handleEscKey);
    this._popupElement.classList.add("popup_opened");
  }

  close() {
    document.removeEventListener("keyup", this._handleEscKey);
    this._popupElement.classList.remove("popup_opened");
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
    this._popupElement.addEventListener("click", this._handleOverlayClick);
  }
}

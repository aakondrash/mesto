import Popup from "./Popup.js";

export default class ConfirmationPopup extends Popup {
  constructor(popupElement, submitWithCallback) {
    super(popupElement);
    this._submitWithCallback = submitWithCallback;
    this._formSubmition = this._formSubmition.bind(this);
    this._form = this._popupElement.querySelector(".edit-form");
    this._submitionButton = this._form.querySelector(".edit-form__submit-button");
  }

  _formSubmition(evt) {
    evt.preventDefault();
    this._submitWithCallback(this.data, this._submitionButton);
  }

  _enableSubmitButton() {
    this._submitionButton.classList.remove("edit-form__submit-button_disabled");
    this._submitionButton.removeAttribute("disabled");
  }

  setEventListeners() {
    super.setEventListeners();
    this._enableSubmitButton();
    this._form.addEventListener("submit", this._formSubmition);
  }
}

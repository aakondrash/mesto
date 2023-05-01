import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
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

  removeCard(data) {
    data.card.remove();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._formSubmition);
  }
}

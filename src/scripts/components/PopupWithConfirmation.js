import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._form = this._popupElement.querySelector(".edit-form");
    this._submitionButton = this._form.querySelector(".edit-form__submit-button");
    this._cardData = null;
    this._callbackFunc = null;
  }

  setSubmitionCallback(callbackFunc) {
    this._callbackFunc = callbackFunc;
  }

  setCardData(data) {
    this._cardData = data;
  }

  setButtonText(string) {
    this._submitionButton.textContent = string;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._callbackFunc();
    });
  }
}

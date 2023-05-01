import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupElement, submitWithCallback) {
    super(popupElement);
    this._submitWithCallback = submitWithCallback;
    this._formSubmition = this._formSubmition.bind(this);
    this._form = this._popupElement.querySelector(".edit-form");
    this._submitionButton = this._form.querySelector(".edit-form__submit-button");
    this._inputFields = Array.from(this._form.querySelectorAll(".edit-form__input"));
  }

  _formSubmition(evt) {
    evt.preventDefault();
    this._submitWithCallback(this._getValuesFromInputs(), this._submitionButton);
  }

  _getValuesFromInputs() {
    const data = {};
    this._inputFields.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._formSubmition);
  }
}

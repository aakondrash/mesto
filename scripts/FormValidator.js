class FormValidator {
  constructor(
    validationData,
    formToValidate
  ) {
    this._validationData = validationData;
    this._formToValidate = formToValidate;
    this._inputList = Array.from(this._formToValidate.querySelectorAll(`.${this._validationData.inputSelector}`));
    this._buttonElement = this._formToValidate.querySelector(this._validationData.submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
    const inputErrorElement = this._formToValidate.querySelector(`[name='${inputElement.name}']`);
    const inputErrorClass = document.getElementById(`${inputElement.name}__error`);
    inputErrorClass.classList.add(this._validationData.errorClass);
    inputErrorClass.textContent = errorMessage;
    inputErrorElement.classList.add(this._validationData.inputSelector + '_red');
  };

  _hideInputError(inputElement) {
    const inputErrorElement = this._formToValidate.querySelector(`[name='${inputElement.name}']`);
    const inputErrorClass = document.getElementById(`${inputElement.name}__error`);
    inputErrorClass.classList.remove(this._validationData.errorClass);
    inputErrorClass.textContent = "";
    inputErrorElement.classList.remove(this._validationData.inputSelector + '_red');
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _checkFormValidity() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _setButtonState() {
    if (this._checkFormValidity()) {
      this.disableSubmitButton();
    } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._validationData.inactiveButtonClass);
    }
  };

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', (evt) => {
        this._checkInputValidity(inputElement);
        this._setButtonState();
      });
    });
  };

  disableSubmitButton(button = this._buttonElement) {
    button.setAttribute('disabled', 'disabled');
    button.classList.add("edit-form__submit-button_disabled");
  };

  enableValidation() {
    this._formToValidate.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.disableSubmitButton();
    });
    this._setEventListeners();
  };

}

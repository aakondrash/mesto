class FormValidator {
  constructor(
    validationData,
    formToValidate
  ) {
    this._validationData = validationData;
    this._formToValidate = formToValidate;
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

  _checkFormValidity(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _setButtonState(inputList) {
    const buttonElement = this._formToValidate.querySelector(this._validationData.submitButtonSelector);
    if (this._checkFormValidity(inputList)) {
      buttonElement.setAttribute('disabled', 'disabled');
      buttonElement.classList.add(this._validationData.inactiveButtonClass);
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(this._validationData.inactiveButtonClass);
    }
  };

  _setEventListeners() {
    const inputList = Array.from(this._formToValidate.querySelectorAll(`.${this._validationData.inputSelector}`));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', (evt) => {
        this._checkInputValidity(inputElement);
        this._setButtonState(inputList);
      });
    });
  };

  enableValidation() {
    this._formToValidate.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };

}

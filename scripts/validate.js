const showInputError = (formElement, inputElement, errorMessage, validationData) => {
  const inputErrorElement = formElement.querySelector(`[name='${inputElement.name}']`);
  const inputErrorClass = document.getElementById(`${inputElement.name}__error`);
  inputErrorClass.classList.add(validationData.errorClass);
  inputErrorClass.textContent = errorMessage;
  inputErrorElement.classList.add(validationData.inputSelector + '_red');
};

const hideInputError = (formElement, inputElement, validationData) => {
  const inputErrorElement = formElement.querySelector(`[name='${inputElement.name}']`);
  const inputErrorClass = document.getElementById(`${inputElement.name}__error`);
  inputErrorClass.classList.remove(validationData.errorClass);
  inputErrorClass.textContent = "";
  inputErrorElement.classList.remove(validationData.inputSelector + '_red');
};

const checkInputValidity = (formElement, inputElement, validationData) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationData);
  } else {
    hideInputError(formElement, inputElement, validationData);
  }
};

const checkFormValidity = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const setButtonState = (formElement, inputList, validationData) => {
  const buttonElement = formElement.querySelector(validationData.submitButtonSelector);
  if (checkFormValidity(inputList)) {
    buttonElement.setAttribute('disabled', 'disabled');
    buttonElement.classList.add(validationData.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(validationData.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, validationData) => {
  const inputList = Array.from(formElement.querySelectorAll(`.${validationData.inputSelector}`));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationData);
      setButtonState(formElement, inputList, validationData);
    });
  });
};

const enableValidation = (validationData) => {
  const formList = Array.from(document.querySelectorAll(validationData.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationData);
  });
};

enableValidation({
  formSelector: '.edit-form',
  inputSelector: 'edit-form__input',
  submitButtonSelector: '.edit-form__submit-button',
  inactiveButtonClass: 'edit-form__submit-button_disabled',
  inputErrorClass: 'edit-form__input-error',
  errorClass: 'edit-form__input-error_visible'
});

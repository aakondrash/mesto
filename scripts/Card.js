class Card {
  constructor(
    cardData,
    cardTemplate,
    openPopupFunc,
    imagePopup,
    imagePopupPicture,
    imagePopupDescription
  ) {
    this._cardData = cardData;
    this._cardTemplate = cardTemplate;
    this._openPopupFunc = openPopupFunc;
    this._imagePopup = imagePopup;
    this._imagePopupPicture = imagePopupPicture;
    this._imagePopupDescription = imagePopupDescription;
  }

  _getCardTemplate() {
    const template = this._cardTemplate.querySelector(".element").cloneNode(true);
    return template;
  }

  _setEventListeners(element, elementPicture) {
    element.querySelector('.element__like-button').addEventListener('click', (event) => {
      event.currentTarget.classList.toggle('element__like-button_is-active');
    });
    element.querySelector('.element__delete-button').addEventListener('click', (event) => {
      element.remove();
    });
    elementPicture.addEventListener('click', () => {
      this._imagePopupDescription.textContent = this._cardData.name;
      this._imagePopupPicture.src = this._cardData.link;
      this._imagePopupPicture.alt = `Фото места ${this._cardData.name}`;
      this._openPopupFunc(this._imagePopup);
    });
  }

  createCard() {
    const element = this._getCardTemplate();
    const elementPicture = element.querySelector('.element__picture');
    elementPicture.src = this._cardData.link;
    elementPicture.alt = `Фото места ${this._cardData.name}`;
    element.querySelector('.element__text').textContent = this._cardData.name;
    this._setEventListeners(element, elementPicture);
    return element;
  }
}

class Card {
  constructor(
    cardData,
    cardTemplate,
    openPopupFunc,
    imagePopup
  ) {
    this._cardData = cardData;
    this._cardTemplate = cardTemplate;
    this._openPopupFunc = openPopupFunc;
    this._imagePopup = imagePopup;
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
      popupPic.querySelector(".image__description").textContent = this._cardData.name;
      popupPic.querySelector(".image__photo").src = this._cardData.link;
      popupPic.querySelector(".image__photo").alt = `Фото места ${this._cardData.name}`;
      this._openPopupFunc(popupPic);
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

export default class Card {
  constructor(
    cardData,
    cardTemplate,
    imagePopup,
    imagePopupPicture,
    imagePopupDescription,
    handleCardClick
  ) {
    this._cardData = cardData;
    this._cardTemplate = cardTemplate;
    this._imagePopup = imagePopup;
    this._imagePopupPicture = imagePopupPicture;
    this._imagePopupDescription = imagePopupDescription;
    this._handleCardClick = handleCardClick;
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
      this._handleCardClick(this._cardData);
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

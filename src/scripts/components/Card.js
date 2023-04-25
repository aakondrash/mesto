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
    this._isLiked = false;
    this._element = this._getCardTemplate();
    this._likeButton = this._element.querySelector('.element__like-button');
    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._elementPicture = this._element.querySelector('.element__picture');
  }

  _getCardTemplate() {
    const template = this._cardTemplate.querySelector(".element").cloneNode(true);
    return template;
  }

  _handleLikeClick() {
    if (!this._isLiked) {
      this._likeButton.classList.add('element__like-button_is-active');
      this._isLiked = true;
    } else {
      this._likeButton.classList.remove('element__like-button_is-active');
      this._isLiked = false;
    }
  }

  _handleDeleteBtnClick() {
    this._element.remove();
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._handleLikeClick());
    this._deleteButton.addEventListener('click', () => this._handleDeleteBtnClick());
    this._elementPicture.addEventListener('click', () => this._handleCardClick(this._cardData));
  }

  createCard() {
    this._elementPicture.src = this._cardData.link;
    this._elementPicture.alt = `Фото места ${this._cardData.name}`;
    this._element.querySelector('.element__text').textContent = this._cardData.name;
    this._setEventListeners();
    return this._element;
  }
}

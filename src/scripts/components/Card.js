export default class Card {
  constructor(
    cardData,
    cardTemplate,
    handleCardClick,
    userId,
    deleteCardFunc,
    addCardLikeFunc,
    deleteCardLikeFunc
  ) {
    this._cardData = cardData;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._element = this._getCardTemplate();
    this._likeButton = this._element.querySelector('.element__like-button');
    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._elementPicture = this._element.querySelector('.element__picture');
    this._cardId = this._cardData._id;
    this._userId = userId;
    this._cardOwnerId = this._cardData.owner._id;
    this._likeNumber = this._element.querySelector('.element__like-number');
    this._deleteCardFunc = deleteCardFunc;
    this._addCardLikeFunc = addCardLikeFunc;
    this._deleteCardLikeFunc = deleteCardLikeFunc;
  }

  _getCardTemplate() {
    const template = this._cardTemplate.querySelector(".element").cloneNode(true);
    return template;
  }

  _handleLikeClick() {
    if (!this._likeButton.classList.contains('element__like-button_is-active')) {
      this._addCardLikeFunc(this._cardId, this._data, this._likeNumber, this._likeButton);
    } else {
      this._deleteCardLikeFunc(this._cardId, this._data, this._likeNumber, this._likeButton);
    }
  }

  _handleDeleteBtnClick() {
    const data = {
      card: this._element,
      cardId: this._cardId,
    };
    this._deleteCardFunc(data);
  }

  _setLikesCounter() {
    if (this._cardData.likes.some(elem => elem._id === this._userId)) {
      this._likeButton.classList.add('element__like-button_is-active');
    }
  }

  _setEventListeners() {
    if (this._cardOwnerId === this._userId) {
      this._deleteButton.classList.add("element__delete-button_is-active");
      this._deleteButton.addEventListener('click', () => this._handleDeleteBtnClick());
    } else {
      this._deleteButton.setAttribute("disabled", "disabled");
    }
    this._likeButton.addEventListener('click', () => this._handleLikeClick());
    this._elementPicture.addEventListener('click', () => this._handleCardClick(this._cardData));
  }

  setLike(data) {
    this._cardData = data;
    this._likeNumber.textContent = data.likes.length;
    this._likeButton.classList.add('element__like-button_is-active');
  }

  unsetLike(data) {
    this._cardData = data;
    this._likeNumber.textContent = data.likes.length;
    this._likeButton.classList.remove('element__like-button_is-active');
  }

  createCard() {
    this._elementPicture.src = this._cardData.link;
    this._elementPicture.alt = `Фото места ${this._cardData.name}`;
    this._element.querySelector('.element__text').textContent = this._cardData.name;
    if (this._cardData.likes.length != 0) {
      this._likeNumber.textContent = this._cardData.likes.length;
    }
    this._setLikesCounter();
    this._setEventListeners();
    return this._element;
  }
}

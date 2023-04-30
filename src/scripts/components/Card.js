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
      this._addCardLikeFunc(this._cardId).then((res) => {
        this._data = res;
        this._likeNumber.textContent = res.likes.length;
        this._likeNumber.style.display = 'block';
        this._likeButton.classList.add('element__like-button_is-active');
      })
      .catch((err) => console.log(err));
    } else {
      this._deleteCardLikeFunc(this._cardId).then((res) => {
        this._data = res;
        this._likeNumber.textContent = res.likes.length;
        if (res.likes.length == 0) {
          this._likeNumber.style.display = 'none';
        }
        this._likeButton.classList.remove('element__like-button_is-active');
      })
      .catch((err) => console.log(err));
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
      this._deleteButton.addEventListener('click', () => this._handleDeleteBtnClick());
    } else {
      this._deleteButton.setAttribute("disabled", "disabled");
      this._deleteButton.style.display = "none";
    }
    this._likeButton.addEventListener('click', () => this._handleLikeClick());
    this._elementPicture.addEventListener('click', () => this._handleCardClick(this._cardData));
  }

  createCard() {
    this._elementPicture.src = this._cardData.link;
    this._elementPicture.alt = `Фото места ${this._cardData.name}`;
    this._element.querySelector('.element__text').textContent = this._cardData.name;
    if (this._cardData.likes.length != 0) {
      this._likeNumber.style.display = 'block';
      this._likeNumber.textContent = this._cardData.likes.length;
    }
    this._setLikesCounter();
    this._setEventListeners();
    return this._element;
  }
}

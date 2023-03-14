// ВСЕ ПЕРЕМЕННЫЕ
// - Переменные для попапа и информации о себе
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.profile__edit-button');
const editProfileElement =  document.querySelector("[name='editProfile']");
const editProfileCloseButton = editProfileElement.querySelector('.popup__close-button');
const editProfileOverlay = editProfileElement.querySelector('.popup__overlay');
const editProfileFormElement = editProfileElement.querySelector('.edit-form');
const editProfileNameInput = editProfileFormElement.querySelector("[name='name']");
const editProfileDescriptionInput = editProfileFormElement.querySelector("[name='job']");
// - Карточки и заполнение контентом
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const elementTemplate = document.querySelector('#element').content;
const elementsList = document.querySelector('.elements__list');
// - Переменные для попапа и добавления карточек
const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector("[name='addNewCard']");
const addCardPopupCloseButton = addCardPopup.querySelector('.popup__close-button');
const addCardPopupOverlay = addCardPopup.querySelector('.popup__overlay');
const addCardPopupFormElement = addCardPopup.querySelector('.edit-form');
const addCardPopupNameInput = addCardPopupFormElement.querySelector("[name='place_name']");
const addCardPopupLinkInput = addCardPopupFormElement.querySelector("[name='place_link']");
addCardButton.addEventListener('click', () => {
  addCardPopup.classList.toggle('popup_opened');
});
addCardPopupCloseButton.addEventListener('click', () => {
  addCardPopup.classList.toggle('popup_opened');
});
addCardPopupOverlay.addEventListener('click', () => {
  addCardPopup.classList.toggle('popup_opened');
});
// - Переменные для лайка карточки

// МЕХАНИКИ
// - Открытие и закрытие попапа, а также поля формы
profileEditButton.addEventListener('click', () => {
  editProfileNameInput.value = profileName.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;
  editProfileElement.classList.toggle('popup_opened');
});
editProfileCloseButton.addEventListener('click', () => {
  editProfileElement.classList.toggle('popup_opened');
});
editProfileOverlay.addEventListener('click', () => {
  editProfileElement.classList.toggle('popup_opened');
});

// - Редактирование имени и информации о себе
function handleProfileEditFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = editProfileNameInput.value;
    profileDescription.textContent = editProfileDescriptionInput.value;
    editProfileElement.classList.toggle('popup_opened');
}
editProfileFormElement.addEventListener('submit', handleProfileEditFormSubmit);

// - Добавление карточки
function handleAddCardSubmit (evt) {
  evt.preventDefault();
  initialCards.unshift({
    name: addCardPopupNameInput.value,
    link: addCardPopupLinkInput.value
  });
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__picture').src = initialCards[0].link;
  element.querySelector('.element__text').textContent = initialCards[0].name;
  element.querySelector('.element__like-button').addEventListener('click', () => {
    element.querySelector('.element__like-button').classList.toggle('element__like-button_is-active');
  });
  element.querySelector('.element__delete-button').addEventListener('click', () => {
    element.querySelector('.element__delete-button').parentElement.remove();
  });
  elementsList.insertBefore(element, elementsList.firstChild);
  addCardPopup.classList.toggle('popup_opened');
}
addCardPopupFormElement.addEventListener('submit', handleAddCardSubmit);

// - Шесть карточек «из коробки»
initialCards.forEach(item => {
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__picture').src = item.link;
  element.querySelector('.element__text').textContent = item.name;
  elementsList.append(element);
});

// - Лайк карточки
const likes = document.querySelectorAll('.element__like-button');
likes.forEach(like => {
  like.addEventListener('click', () => {
    like.classList.toggle('element__like-button_is-active');
  });
});

// - Удаление карточки
const trashes = document.querySelectorAll('.element__delete-button');
trashes.forEach(trash => {
  trash.addEventListener('click', () => {
    trash.parentElement.remove();
  });
});

// - Открытие попапа с картинкой
const pictures = document.querySelectorAll('.element__picture');
const fullScreenPic = document.querySelector('#openFullScreen');
const picPopupCloseButton = fullScreenPic.querySelector('.popup__close-button');
const picPopupOverlay = fullScreenPic.querySelector('.popup__overlay');
const picDescription = fullScreenPic.querySelector(".image__description");
const picImage = fullScreenPic.querySelector(".image__photo");
pictures.forEach(picture => {
  picture.addEventListener('click', () => {
    picDescription.textContent = picture.parentElement.querySelector(".element__text").textContent;
    picImage.src = picture.src;
    fullScreenPic.classList.toggle('popup_opened');
  });
});
picPopupCloseButton.addEventListener('click', () => {
  fullScreenPic.classList.toggle('popup_opened');
});
picPopupOverlay.addEventListener('click', () => {
  fullScreenPic.classList.toggle('popup_opened');
});

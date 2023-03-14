// ВСЕ ПЕРЕМЕННЫЕ
// - Переменные для попапа и информации о себе
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.profile__edit-button');
const editProfileElement =  document.querySelector("[name='editProfile']");
const editProfileCloseButton = editProfileElement.querySelector('.popup__close-button');
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
const addCardPopupFormElement = addCardPopup.querySelector('.edit-form');
const addCardPopupNameInput = addCardPopupFormElement.querySelector("[name='place_name']");
const addCardPopupLinkInput = addCardPopupFormElement.querySelector("[name='place_link']");
addCardButton.addEventListener('click', () => {
  addCardPopup.classList.toggle('popup_opened');
});
addCardPopupCloseButton.addEventListener('click', () => {
  addCardPopup.classList.toggle('popup_opened');
});
// addCardPopup.addEventListener('click', () => {
//   addCardPopup.classList.toggle('popup_opened');
// });
// - Переменные для широкого раскрытия картинок
const popupPic = document.querySelector('#openFullScreen');
const popupPicDescription = popupPic.querySelector(".image__description");
const popupPicImage = popupPic.querySelector(".image__photo");
const popupPicCloseButton = popupPic.querySelector(".popup__close-button");
// - Функции...
function openPopup(el) {
  el.classList.add('popup_opened');
}
function closePopup(el) {
  el.classList.remove('popup_opened');
}
function createCard(data) {
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__picture').src = data.link;
  element.querySelector('.element__text').textContent = data.name;
  element.querySelector('.element__like-button').addEventListener('click', (event) => {
    event.currentTarget.classList.toggle('element__like-button_is-active');
  });
  element.querySelector('.element__delete-button').addEventListener('click', (event) => {
    element.remove();
  });
  element.querySelector('.element__picture').addEventListener('click', () => {
    popupPicDescription.textContent = data.name;
    popupPicImage.src = data.link;
    openPopup(popupPic);
  });
  elementsList.prepend(element);
}
// МЕХАНИКИ
// - Открытие и закрытие попапа, а также поля формы
profileEditButton.addEventListener('click', () => {
  editProfileNameInput.value = profileName.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;
  openPopup(editProfileElement);
});
editProfileCloseButton.addEventListener('click', () => {
  closePopup(editProfileElement);
});
popupPicCloseButton.addEventListener('click', () => {
  closePopup(popupPic);
});
// editProfileElement.addEventListener('click', () => {
//   closePopup(editProfileElement);
// });

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
  createCard({
    name: addCardPopupNameInput.value,
    link: addCardPopupLinkInput.value
  });
  closePopup(addCardPopup);
}
addCardPopupFormElement.addEventListener('submit', handleAddCardSubmit);

// - Шесть карточек «из коробки»
initialCards.forEach(item => {
  createCard(item);
});

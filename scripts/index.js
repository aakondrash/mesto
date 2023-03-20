// ВСЕ ПЕРЕМЕННЫЕ
// - Переменные для попапа и информации о себе
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.profile__edit-button');
const editProfileElement =  document.querySelector("[name='editProfile']");
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
const addCardPopupFormElement = addCardPopup.querySelector('.edit-form');
const addCardPopupNameInput = addCardPopupFormElement.querySelector("[name='place_name']");
const addCardPopupLinkInput = addCardPopupFormElement.querySelector("[name='place_link']");
addCardButton.addEventListener('click', () => {
  openPopup(addCardPopup);
});
const closeButtons = document.querySelectorAll('.popup__close-button');
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

const allPopups = Array.from(document.querySelectorAll(".popup"));
function handleEscapeKey(evt) {
  if (evt.key === 'Escape') {
    allPopups.forEach(closePopup);
  }
}
function handleOverlayClick(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    allPopups.forEach(closePopup);
  }
}
// - Переменные для широкого раскрытия картинок
const popupPic = document.querySelector('#openFullScreen');
const popupPicDescription = popupPic.querySelector(".image__description");
const popupPicImage = popupPic.querySelector(".image__photo");
// - Функции...
function openPopup(el) {
  document.addEventListener('keydown', handleEscapeKey);
  el.addEventListener('click', handleOverlayClick);
  el.classList.add('popup_opened');
}
function closePopup(el) {
  document.removeEventListener('keydown', handleEscapeKey);
  el.removeEventListener('click', handleOverlayClick);
  el.classList.remove('popup_opened');
}
function createCard(data) {
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const elementPicture = element.querySelector('.element__picture');
  elementPicture.src = data.link;
  elementPicture.alt = `Фото места ${data.name}`;
  element.querySelector('.element__text').textContent = data.name;
  element.querySelector('.element__like-button').addEventListener('click', (event) => {
    event.currentTarget.classList.toggle('element__like-button_is-active');
  });
  element.querySelector('.element__delete-button').addEventListener('click', (event) => {
    element.remove();
  });
  elementPicture.addEventListener('click', () => {
    popupPicDescription.textContent = data.name;
    popupPicImage.src = data.link;
    popupPicImage.alt = `Фото места ${data.name}`;
    openPopup(popupPic);
  });
  return element;
}
const renderCard = data => elementsList.prepend(createCard(data));
// МЕХАНИКИ
// - Открытие и закрытие попапа, а также поля формы
profileEditButton.addEventListener('click', () => {
  editProfileNameInput.value = profileName.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;
  openPopup(editProfileElement);
});

// - Редактирование имени и информации о себе
function handleProfileEditFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = editProfileNameInput.value;
    profileDescription.textContent = editProfileDescriptionInput.value;
    closePopup(editProfileElement);
}
editProfileFormElement.addEventListener('submit', handleProfileEditFormSubmit);

// - Добавление карточки
function disableButton(button) {
  button.setAttribute('disabled', 'disabled');
  button.classList.add("edit-form__submit-button_disabled");
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  renderCard({
    name: addCardPopupNameInput.value,
    link: addCardPopupLinkInput.value
  });
  disableButton(evt.target.querySelector(".edit-form__submit-button"));
  evt.target.reset();
  closePopup(addCardPopup);
}
addCardPopupFormElement.addEventListener('submit', handleAddCardSubmit);

// - Шесть карточек «из коробки»
initialCards.forEach(renderCard);

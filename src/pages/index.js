import './index.css';

import FormValidator from '../scripts/components/FormValidator.js';
import Section from "../scripts/components/Section.js";
import Card from "../scripts/components/Card.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";

// ВСЕ ПЕРЕМЕННЫЕ
// - Переменные для попапа и информации о себе
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.profile__edit-button');
const editProfileElement =  document.querySelector('#editProfile');
const editProfileFormElement = editProfileElement.querySelector('.edit-form');
const editProfileNameInput = editProfileFormElement.querySelector("[name='name']");
const editProfileDescriptionInput = editProfileFormElement.querySelector("[name='job']");
const validationConfig = {
  formSelector: '.edit-form',
  inputSelector: 'edit-form__input',
  submitButtonSelector: '.edit-form__submit-button',
  inactiveButtonClass: 'edit-form__submit-button_disabled',
  inputErrorClass: 'edit-form__input-error',
  errorClass: 'edit-form__input-error_visible'
};

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
const addCardPopup = document.querySelector('#addNewCard');
const addCardPopupFormElement = addCardPopup.querySelector('.edit-form');
const addCardPopupNameInput = addCardPopupFormElement.querySelector("[name='place_name']");
const addCardPopupLinkInput = addCardPopupFormElement.querySelector("[name='place_link']");

// - Переменные для широкого раскрытия картинок
const popupPic = document.querySelector('#openFullScreen');
const popupPicImage = popupPic.querySelector(".image__photo");
const popupPicDescription = popupPic.querySelector(".image__description");

const popupWithImage = new PopupWithImage(popupPic);
popupWithImage.setEventListeners();

const openImagePopup = (evt) => {
  const data = {
    link: evt.link,
    name: evt.name,
  };
  popupWithImage.open(data);
};

function createNewCard(data) {
  const card = new Card(data, elementTemplate, popupPic, popupPicImage, popupPicDescription, openImagePopup);
  return card.createCard();
}

const section = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      section.addItem(createNewCard(data));
    },
  },
  elementsList
);
section.renderItems();

const userInfo = new UserInfo(profileName, profileDescription);

const editPopup = new PopupWithForm(
  editProfileElement,
  (data) => {
    userInfo.setUserInfo(data);
    editPopup.close();
  }
);
editPopup.setEventListeners();

const addNewCardPopup = new PopupWithForm(
  addCardPopup,
  (data) => {
    const item = {
      name: data.place_name,
      link: data.place_link,
    };
    section.addItem(createNewCard(item));
    addNewCardPopup.close();
  }
);
addNewCardPopup.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  editProfileNameInput.value = data.name;
  editProfileDescriptionInput.value = data.info;
  editPopup.open();
});
addCardButton.addEventListener("click", () => {
  addNewCardPopup.open();
});

const formList = Array.from(document.querySelectorAll(".edit-form"));
formList.forEach((formElement) => {
  const validation = new FormValidator(
    validationConfig,
    formElement
  );
  validation.enableValidation();
});

import './index.css';

import FormValidator from '../scripts/components/FormValidator.js';
import Section from "../scripts/components/Section.js";
import Card from "../scripts/components/Card.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Api from "../scripts/components/Api.js";
import ConfirmationPopup from '../scripts/components/ConfirmationPopup.js';

// ВСЕ ПЕРЕМЕННЫЕ
// - Переменные для попапа и информации о себе
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.profile__edit-button');
const editProfileElement =  document.querySelector('#editProfile');
const editProfileFormElement = editProfileElement.querySelector('.edit-form');
const editProfileNameInput = editProfileFormElement.querySelector("[name='name']");
const editProfileDescriptionInput = editProfileFormElement.querySelector("[name='job']");

const editAvatarElement = document.querySelector('#editAvatar');
const profileAvatar = document.querySelector(".profile__avatar-image");
const profileAvatarEditButton = document.querySelector(".profile__avatar-edit-button");

const validationConfig = {
  formSelector: '.edit-form',
  inputSelector: 'edit-form__input',
  submitButtonSelector: '.edit-form__submit-button',
  inactiveButtonClass: 'edit-form__submit-button_disabled',
  inputErrorClass: 'edit-form__input-error',
  errorClass: 'edit-form__input-error_visible'
};

// - Карточки и заполнение контентом

const elementTemplate = document.querySelector('#element').content;
const elementsList = document.querySelector('.elements__list');

// - Переменные для попапа и добавления карточек
const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('#addNewCard');

const confirmationForm = document.querySelector('#confirmation');

// - Переменные для широкого раскрытия картинок
const popupPic = document.querySelector('#openFullScreen');

const api = new Api({
  urlBody: "https://mesto.nomoreparties.co/v1/cohort-65/",
  token: "e4c79f11-22cf-45f3-b5e4-f082c834d861"
});

const profileInfoData = api.getProfileInfo();
const initialCardsData = api.getInitialCards();
let userId, likeCard, unlikeCard, deleteCard;

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
  const card = new Card(data, elementTemplate, openImagePopup, userId,
    (deleteCard = (data) => {
      deleteCardPopup.data = data;
      deleteCardPopup.open();
    }),
    (likeCard = (data) => {
      return api.handleCardLike(data);
    }),
    (unlikeCard = (data) => {
      return api.removeCardLike(data);
    })
  );
  return card.createCard();
}

const section = new Section(
  {
    renderer: (data) => {
      section.addItem(createNewCard(data));
    },
  },
  elementsList
);

const userInfo = new UserInfo(profileName, profileDescription, userId, profileAvatar);

const editPopup = new PopupWithForm(
  editProfileElement,
  (data, button) => {
    button.textContent = "Сохранение...";
    api.editProfileInfo(data)
      .then((res) => {
        userInfo.setUserInfo({
          name: res.name,
          job: res.about
        });
        editPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        button.textContent = "Сохранить";
      });
  },
);
editPopup.setEventListeners();

const editAvatar = new PopupWithForm(
  editAvatarElement,
  (data, button) => {
    button.textContent = "Сохранение...";
    api.editAvatar(data)
      .then((res) => {
        userInfo.setUserAvatar(res);
        editAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        button.textContent = "Сохранить";
      });
  },
);
editAvatar.setEventListeners();

const addNewCardPopup = new PopupWithForm(
  addCardPopup,
  (data, button) => {
    button.textContent = "Сохранение...";
    const item = {
      name: data.place_name,
      link: data.place_link,
    };
    api.addNewCard(item)
      .then((res) => {
        section.addItem(createNewCard(res));
        addNewCardPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        button.textContent = "Сохранить";
      });
  },
);
addNewCardPopup.setEventListeners();

const deleteCardPopup = new ConfirmationPopup(
  confirmationForm,
  (data, button) => {
    button.textContent = "Удаление...";
    api.deleteCard(data.cardId)
      .then(() => {
        deleteCardPopup.close();
      })
      .then(() => {
        data.card.remove();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        button.textContent = "Да";
      });
});
deleteCardPopup.setEventListeners();

const editPopupValidation = new FormValidator(validationConfig, editProfileElement);
const addPopupValidation = new FormValidator(validationConfig, addCardPopup);
const avatarEditPopopValidation = new FormValidator(validationConfig, editAvatarElement);

editPopupValidation.enableValidation();
addPopupValidation.enableValidation();
avatarEditPopopValidation.enableValidation();

profileEditButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  editProfileNameInput.value = data.name;
  editProfileDescriptionInput.value = data.info;
  editPopupValidation.disableSubmitButton();
  editPopup.open();
});
profileAvatarEditButton.addEventListener("click", () => {
  avatarEditPopopValidation.disableSubmitButton();
  editAvatar.open();
});
addCardButton.addEventListener("click", () => {
  addPopupValidation.disableSubmitButton();
  addNewCardPopup.open();
});

// const formList = Array.from(document.querySelectorAll(".edit-form"));
// formList.forEach((formElement) => {
//   const validation = new FormValidator(
//     validationConfig,
//     formElement
//   );
//   validation.enableValidation();
// });

Promise.all([profileInfoData, initialCardsData])
  .then(([profileData, cardsData]) => {
    userId = profileData._id;
    userInfo.setUserInfo({
      name: profileData.name,
      job: profileData.about
    });
    userInfo.setUserAvatar(profileData);
    section.renderItems(cardsData.reverse());
  })
  .catch((err) => console.log(err));

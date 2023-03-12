// Открытие и закрытие попапа, а также поля формы
let profileEditButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close-button');
let popupOverlay = document.querySelector('.popup__overlay');

let popupElement = document.querySelector('.popup');
let formElement = document.querySelector('.edit-form');
let nameInput = formElement.querySelector("[name='name']");
let jobInput = formElement.querySelector("[name='job']");

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

function popupWindow() {
  popupElement.classList.toggle('popup_opened');
}

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  popupWindow();
});
popupCloseButton.addEventListener('click', popupWindow);
popupOverlay.addEventListener('click', popupWindow);

// Редактирование имени и информации о себе
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    popupWindow();
}
formElement.addEventListener('submit', handleFormSubmit);

// Лайк

let likes = document.querySelectorAll('.element__like-button');
for (let i = 0; i < likes.length; i++) {
  likes[i].addEventListener('click', function () {
    likes[i].classList.toggle('element__like-button_is-active');
  });
}

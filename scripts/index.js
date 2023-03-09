// Открытие и закрытие попапа, а также поля формы
let edit_button = document.querySelector('.profile__edit-button');
let close_button = document.querySelector('.edit-form__close-button');
let overlay = document.querySelector('.edit__overlay');
edit_button.addEventListener('click', function() {
  document.querySelector("[name='name']").value = document.querySelector('.profile__name').innerHTML;
  document.querySelector("[name='job']").value = document.querySelector('.profile__description').innerHTML;
  document.querySelector('.edit').classList.add('edit_is-visible');
});

function closeEditWindow() {
  document.querySelector('.edit').classList.remove('edit_is-visible');
}
close_button.addEventListener('click', closeEditWindow);
overlay.addEventListener('click', closeEditWindow);

// Редактирование имени и информации о себе

let formElement = document.querySelector('.edit-form');
let nameInput = formElement.querySelector("[name='name']");
let jobInput = formElement.querySelector("[name='job']");
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    document.querySelector('.profile__name').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;
    closeEditWindow();
}
formElement.addEventListener('submit', handleFormSubmit);

// Лайк

let likes = document.querySelectorAll('.element__like-button');
for (let i = 0; i < likes.length; i++) {
  likes[i].addEventListener('click', function () {
    likes[i].classList.toggle('element__like-button_is-active');
  });
}

let profileBlock = document.querySelector('.profile');
let profileName = profileBlock.querySelector('.profile__name');
let profileDescription = profileBlock.querySelector('.profile__description');
let profileEditBtn = profileBlock.querySelector('.profile__edit-btn');

let popup = document.querySelector('.popup');
let popupCloseBtn = popup.querySelector('.popup__close-btn');
let formElement = popup.querySelector('.popup__container');
let formName = formElement.querySelector('#form-name');
let formDescription = formElement.querySelector('#form-description');

function showPopup() {
  popup.classList.toggle('popup_opened');

  formName.value = profileName.textContent;
  formDescription.value = profileDescription.textContent;
}

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = formName.value;
  profileDescription.textContent = formDescription.value;

  showPopup();
}

profileEditBtn.addEventListener('click', showPopup);

popupCloseBtn.addEventListener('click', () =>
  popup.classList.toggle('popup_opened')
);

formElement.addEventListener('submit', formSubmitHandler);

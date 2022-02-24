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

  formName.setAttribute(
    'value',
    profileName.textContent
  );

  formDescription.setAttribute(
    'value',
    profileDescription.textContent
  );
}

profileEditBtn.addEventListener('click', showPopup);

popupCloseBtn.addEventListener('click', () =>
  popup.classList.toggle('popup_opened')
);

function formSubmitHandler (evt) {
  evt.preventDefault();

  let inputName = formName.value;
  let inputDescription = formDescription.value;

  profileName.textContent = inputName;
  profileDescription.textContent = inputDescription;
  popup.classList.toggle('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);

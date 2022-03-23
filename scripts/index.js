const profileBlock = document.querySelector('.profile');
const profileName = profileBlock.querySelector('.profile__name');
const profileDescription = profileBlock.querySelector('.profile__description');
const profileEditBtn = profileBlock.querySelector('.profile__edit-btn');
const addCardBtn = profileBlock.querySelector('.profile__add-btn');

const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const editProfileForm = editProfilePopup.querySelector('.popup__container');
const editProfileFormName = editProfileForm.querySelector('#profile-name-input');
const editProfileFormDescription = editProfileForm.querySelector('#profile-description-input');
const editProfilePopupCloseBtn = editProfilePopup.querySelector('.popup__close-btn');
editProfileFormName.value = profileName.textContent;
editProfileFormDescription.value = profileDescription.textContent;

const cardTemplate = document.querySelector('#element-template').content;

const addCardPopup = document.querySelector('.popup_type_add-card');
const addCardForm = addCardPopup.querySelector('.popup__container');
const addCardFormPlaceName = addCardForm.querySelector('#place-name-input');
const addCardFormPlaceLink = addCardForm.querySelector('#place-link-input');
const addCardCloseBtn = addCardPopup.querySelector('.popup__close-btn');

const imagePopup = document.querySelector('.popup_type_image');
const img = imagePopup.querySelector('.popup__image');
const imagePopupCloseBtn = imagePopup.querySelector('.popup__close-btn');

const elementsContainer = document.querySelector('.elements');

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

const popups = Array.from(document.querySelectorAll('.popup'));
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup(evt.target);
    }
  });
});

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function showEditProfilePopup() {
  openPopup(editProfilePopup);
}

function editFormSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = editProfileFormName.value;
  profileDescription.textContent = editProfileFormDescription.value;

  closePopup(editProfilePopup);
}

function createCard(card) {
  const cardToAdd = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardToAdd.querySelector('.element__img');

  cardToAdd.querySelector('.element__title').textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardToAdd.querySelector('.element__popup-btn').addEventListener('click', () => {
    showImagePopup(card.name, card.link);
  });

  cardToAdd.querySelector('.element__like-btn').addEventListener('click', toggleLikeBtn);

  cardToAdd.querySelector('.element__trash-btn').addEventListener('click', removeCard);

  return cardToAdd;
}

function toggleLikeBtn(evt) {
  evt.target.classList.toggle('element__like-btn_active');
}

function removeCard(evt) {
  evt.target.closest('.element').remove();
}

function renderCard(card) {
  elementsContainer.prepend(createCard(card));
}

function showImagePopup(placeName, imageLink) {
  img.src = imageLink;
  img.alt = placeName;

  imagePopup.querySelector('.popup__img-caption').textContent = placeName;

  openPopup(imagePopup);
}

function addCardFormSubmitHandler(evt) {
  evt.preventDefault();

  renderCard({
    name: addCardFormPlaceName.value,
    link: addCardFormPlaceLink.value
  });

  closePopup(addCardPopup);
}

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add('popup__input-field_type_error');

  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove('popup__input-field_type_error');

  errorElement.textContent = '';
  errorElement.classList.remove('popup__input-error_active');
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input-field'));
  const buttonElement = formElement.querySelector('.popup__submit-btn');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__submit-btn_inactive');
    buttonElement.disabled = true;
  }
  else {
    buttonElement.classList.remove('popup__submit-btn_inactive');
    buttonElement.disabled = false;
  }
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  })
}

enableValidation();

initialCards.forEach((card) => {
  renderCard(card);
});

profileEditBtn.addEventListener('click', showEditProfilePopup);
editProfileForm.addEventListener('submit', editFormSubmitHandler);
editProfilePopupCloseBtn.addEventListener('click', () => {
  closePopup(editProfilePopup);
});

addCardBtn.addEventListener('click', () => {
  openPopup(addCardPopup);
});
addCardForm.addEventListener('submit', addCardFormSubmitHandler);
addCardCloseBtn.addEventListener('click', () => {
  closePopup(addCardPopup);
});

imagePopupCloseBtn.addEventListener('click', () => {
  closePopup(imagePopup);
});

import Card from "./Card.js"
import FormValidator from "./FormValidator.js";
import { initialCards } from "./data.js";

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-field',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input-field_type_error',
  errorClass: 'popup__input-error_active'
}

const elementsContainer = document.querySelector('.elements');

const profileElement = document.querySelector('.profile');
const profileName = profileElement.querySelector('.profile__name');
const profileDescription = profileElement.querySelector('.profile__description');
const profileEditButton = profileElement.querySelector('.profile__edit-btn');
const profileEditPopup = document.querySelector('.popup_type_edit-profile');
const profileEditForm = profileEditPopup.querySelector('.popup__container');
const profileEditFormName = profileEditForm.querySelector('#profile-name-input');
const profileEditFormDescription = profileEditForm.querySelector('#profile-description-input');
const profileEditFormCloseButton = profileEditPopup.querySelector('.popup__close-btn');

const cardCreateButton = profileElement.querySelector('.profile__add-btn');
const cardCreatePopup = document.querySelector('.popup_type_add-card');
const cardCreateForm = cardCreatePopup.querySelector('.popup__container');
const cardCreateFormPlaceName = cardCreateForm.querySelector('#place-name-input');
const cardCreateFormPlaceLink = cardCreateForm.querySelector('#place-link-input');
const cardCreateFormCloseButton = cardCreatePopup.querySelector('.popup__close-btn');
const cardCreateFormSubmitButton = cardCreateForm.querySelector('.popup__submit-btn');
const cardCreateFormInputsArray = Array.from(cardCreateForm.querySelectorAll(validationConfig.inputSelector));
const cardTemplateSelector = '#element-template';

const popups = Array.from(document.querySelectorAll('.popup'));
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close-btn');


// UTILITY FUNCTIONS:
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
}

const closePopupByEscape = (evt) => {
  if (evt.key === "Escape") {
    const popupToClose = document.querySelector('.popup_opened');
    closePopup(popupToClose);
  }
}

// Renders card element on the page
const renderCard = (cardElement) => {
  elementsContainer.prepend(cardElement);
}

const toggleCardCreateFormSubmitButton = () => {
  if (cardCreateFormInputsArray.some(input => !input.validity.valid)) {
    cardCreateFormSubmitButton
      .classList
      .add(validationConfig.inactiveButtonClass);
    cardCreateFormSubmitButton.disabled = true;
  } else {
    cardCreateFormSubmitButton
      .classList
      .remove(validationConfig.inactiveButtonClass);
    cardCreateFormSubmitButton.disabled = false;
  }
}


// PROFILE CALLBACKS:
const showProfileEditForm = () => {
  profileEditFormName.value = profileName.textContent;
  profileEditFormDescription.value = profileDescription.textContent;

  openPopup(profileEditPopup);
}

const handleProfileEditFormSubmit = (evt) => {
  evt.preventDefault();

  profileName.textContent = profileEditFormName.value;
  profileDescription.textContent = profileEditFormDescription.value;

  closePopup(profileEditPopup);
}


// CARD CALLBACKS:
const showCardCreateForm = () => {
  toggleCardCreateFormSubmitButton();
  openPopup(cardCreatePopup);
}

const handleCardCreateFormSubmit = (evt) => {
  evt.preventDefault();

  const cardData = {
    name: cardCreateFormPlaceName.value,
    link: cardCreateFormPlaceLink.value
  };

  const card = new Card(cardData, cardTemplateSelector);
  const cardElement = card.generateCard();

  renderCard(cardElement);

  closePopup(cardCreatePopup);
  cardCreateFormPlaceName.value = '';
  cardCreateFormPlaceLink.value = '';
}


// PROFILE CONFIGURATION
profileEditButton.addEventListener('click', showProfileEditForm);
profileEditForm.addEventListener('submit', handleProfileEditFormSubmit);
profileEditFormCloseButton.addEventListener('click', () => {
  closePopup(profileEditPopup);
});


// CARD CONFIGURATION
cardCreateButton.addEventListener('click', showCardCreateForm);
cardCreateForm.addEventListener('submit', handleCardCreateFormSubmit);
cardCreateFormCloseButton.addEventListener('click', () => {
  closePopup(cardCreatePopup);
});


// CARD IMAGE POPUP CONFIGURATION
imagePopupCloseButton.addEventListener('click', () => {
  closePopup(imagePopup);
});


// Add popup close event listener
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(evt.target);
    }
  });
});


// Render initial cards
initialCards.forEach((cardData) => {
  const card = new Card(cardData, cardTemplateSelector);
  const cardElement = card.generateCard();

  renderCard(cardElement);
});


// Enable form validation
const forms = Array.from(document.forms);
forms.forEach((form) => {
  const validator = new FormValidator(validationConfig, form);
  validator.enableValidation();
})

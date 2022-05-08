import Card from "../scripts/components/Card.js"
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import { openPopup, closePopup } from "../scripts/utils/utils.js";
import { initialCards } from "../scripts/utils/data.js";

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-field',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input-field_type_error',
  errorClass: 'popup__input-error_active'
}

const elementsContainer = document.querySelector('.elements');
const cardListSelector = '.elements';

const profileElement = document.querySelector('.profile');
const profileName = profileElement.querySelector('.profile__name');
const profileDescription = profileElement.querySelector('.profile__description');
const profileEditButton = profileElement.querySelector('.profile__edit-btn');
const profileEditPopup = document.querySelector('.popup_type_edit-profile');
const profileEditForm = document.forms.profileEditForm;
const profileEditFormName = profileEditForm.elements.profileName;
const profileEditFormDescription = profileEditForm.elements.profileDescription;
const profileEditFormCloseButton = profileEditPopup.querySelector('.popup__close-btn');
const profileEditFormValidator = new FormValidator(validationConfig, profileEditForm);

const cardCreateButton = profileElement.querySelector('.profile__add-btn');
const cardCreatePopup = document.querySelector('.popup_type_add-card');
const cardCreateForm = document.forms.cardCreateForm;
const cardCreateFormPlaceName = cardCreateForm.elements.placeName;
const cardCreateFormPlaceLink = cardCreateForm.elements.placeLink;
const cardCreateFormCloseButton = cardCreatePopup.querySelector('.popup__close-btn');
const cardCreateFormValidator = new FormValidator(validationConfig, cardCreateForm);
const cardTemplateSelector = '#element-template';

const popups = Array.from(document.querySelectorAll('.popup'));
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close-btn');


// PROFILE CALLBACKS:
const showProfileEditForm = () => {
  profileEditFormName.value = profileName.textContent;
  profileEditFormDescription.value = profileDescription.textContent;

  profileEditFormValidator.resetErrors();
  profileEditFormValidator.toggleButtonState();

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
  cardCreateFormValidator.toggleButtonState();
  openPopup(cardCreatePopup);
}

const handleCardCreateFormSubmit = (evt) => {
  evt.preventDefault();

  const cardData = {
    name: cardCreateFormPlaceName.value,
    link: cardCreateFormPlaceLink.value
  };

  const cardElement = createCard(cardData, cardTemplateSelector);
  renderCard(cardElement);

  closePopup(cardCreatePopup);
  cardCreateForm.reset();
}


// Creates card element
const createCard = (cardData, cardTemplateSelector) => {
  const card = new Card(cardData, cardTemplateSelector);
  return card.generateCard();
}

// Renders card element on the page
const renderCard = (cardElement) => {
  elementsContainer.prepend(cardElement);
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
// initialCards.forEach((cardData) => {
//   const cardElement = createCard(cardData, cardTemplateSelector);
//   renderCard(cardElement);
// });
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, cardTemplateSelector);
      cardList.addItem(card.generateCard());
    }
  },
  cardListSelector);

cardList.renderItems();


// Enable form validation
profileEditFormValidator.enableValidation();
cardCreateFormValidator.enableValidation();

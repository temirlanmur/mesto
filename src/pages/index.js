import './index.css';

import Card from "../scripts/components/Card.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Section from "../scripts/components/Section.js";
import FormValidator from "../scripts/components/FormValidator.js";
import { initialCards } from "../scripts/utils/data.js";

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-field',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input-field_type_error',
  errorClass: 'popup__input-error_active'
}

const cardListSelector = '.elements';
const cardAddPopupSelector = '.popup_type_add-card';
const cardTemplateSelector = '#element-template';
const profileEditPopupSelector = '.popup_type_edit-profile';
const profileNameSelector = '.profile__name';
const profileDescriptionSelector = '.profile__description';
const imagePopupSelector = '.popup_type_image';

const profileEditForm = document.forms.profileEditForm;
const profileEditFormName = profileEditForm.elements.profileName;
const profileEditFormDescription = profileEditForm.elements.profileDescription;
const profileEditButton = document.querySelector('.profile__edit-btn');
const profileEditFormValidator = new FormValidator(validationConfig, profileEditForm);

const cardAddForm = document.forms.cardCreateForm;
const cardAddButton = document.querySelector('.profile__add-btn');
const cardAddFormValidator = new FormValidator(validationConfig, cardAddForm);


/* VALIDATION */
profileEditFormValidator.enableValidation();
cardAddFormValidator.enableValidation();


/* PROFILE COMPONENT */
const userInfo = new UserInfo({
  profileNameSelector,
  profileDescriptionSelector
});

// Callback to open popup
const showProfileEditForm = () => {
  const profileData = userInfo.getUserInfo();
  profileEditFormName.value = profileData.profileName;
  profileEditFormDescription.value = profileData.profileDescription;

  profileEditFormValidator.resetErrors();
  profileEditFormValidator.toggleButtonState();
  profileEditPopup.open();
}

// Callback to handle form submit
const handleProfileEditFormSubmit = (profileData) => {
  userInfo.setUserInfo({
    profileName: profileData.profileName.value,
    profileDescription: profileData.profileDescription.value
  });
};

// Popup
const profileEditPopup = new PopupWithForm(
  handleProfileEditFormSubmit,
  profileEditPopupSelector
);
profileEditPopup.setEventListeners();
profileEditButton.addEventListener('click', () => {
  showProfileEditForm();
});


/* CARD COMPONENT */
// Callback to open popup
const showCardAddForm = () => {
  cardAddFormValidator.resetErrors();
  cardAddFormValidator.toggleButtonState();
  cardAddPopup.open();
}

// Callback to handle form submit
const handleCardAddFormSubmit = (cardData) => {
  const card = new Card({
    name: cardData.placeName.value,
    link: cardData.placeLink.value
  },
  handleCardClick,
  cardTemplateSelector);
  cardList.prependItem(card.generateCard());
}

// Callback to open image popup
const handleCardClick = (cardTitle, cardImageLink) => {
  imagePopup.open(cardTitle, cardImageLink);
}

const cardAddPopup = new PopupWithForm(handleCardAddFormSubmit, cardAddPopupSelector);
cardAddPopup.setEventListeners();
cardAddButton.addEventListener('click', () => {
  showCardAddForm();
});

const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();


/* CARDS RENDERING */
const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(cardData, handleCardClick, cardTemplateSelector);
      cardList.appendItem(card.generateCard());
    }
  },
  cardListSelector
);

cardList.renderItems();

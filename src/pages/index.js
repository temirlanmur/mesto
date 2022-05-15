import './index.css';

import Card from '../scripts/components/Card.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Section from '../scripts/components/Section.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithSubmit from '../scripts/components/PopupWithSubmit.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Api from '../scripts/components/Api.js';

import {
  cardPopupSelector,
  cardAddPopupSelector,
  cardDeletePopupSelector,
  cardTemplateSelector,
  cardsSectionSelector,
  profileEditPopupSelector,
  profileNameSelector,
  profileDescriptionSelector,
  validationConfig
} from '../scripts/utils/constants.js';


const cardAddForm = document.forms.cardCreateForm;
const cardAddButton = document.querySelector('.profile__add-btn');
const profileEditForm = document.forms.profileEditForm;
const profileEditFormName = profileEditForm.elements.profileName;
const profileEditFormDescription = profileEditForm.elements.profileDescription;
const profileEditButton = document.querySelector('.profile__edit-btn');

const cardAddFormValidator = new FormValidator(validationConfig, cardAddForm);
const cardsSection = new Section(cardsSectionSelector);
const cardPopup = new PopupWithImage(cardPopupSelector);
const cardDeletePopup = new PopupWithSubmit(cardDeletePopupSelector);
const profileEditFormValidator = new FormValidator(validationConfig, profileEditForm);
const userInfo = new UserInfo({ profileNameSelector, profileDescriptionSelector });
const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-40',
  headers: {
    authorization: '676c0732-35dd-41a8-a513-8cdd7e2d2f94',
    'Content-Type': 'application/json'
  }
});


/* PROFILE CALLBACKS */
// Opens 'profile edit' popup
const openProfileEditPopup = () => {
  const profileData = userInfo.getUserInfo();
  profileEditFormName.value = profileData.profileName;
  profileEditFormDescription.value = profileData.profileDescription;

  profileEditFormValidator.resetErrors();
  profileEditFormValidator.toggleButtonState();
  profileEditPopup.open();
}

// Handles 'profile edit' form submit
const handleProfileEditFormSubmit = (profileData) => {
  api.updateProfile({
    name: profileData.profileName,
    about: profileData.profileDescription
  })
    .then(userInfo.setUserInfo(profileData))
    .catch(err => console.log(err));
};

const profileEditPopup = new PopupWithForm(handleProfileEditFormSubmit, profileEditPopupSelector);


/* CARD CALLBACKS */
// Opens 'click card' popup
const openCardPopup = (name, link) => cardPopup.open(name, link)

// Opens 'add new card' popup
const openCardAddPopup = () => {
  cardAddFormValidator.resetErrors();
  cardAddFormValidator.toggleButtonState();

  cardAddPopup.open();
}

// Opens 'card delete confirmation' popup
const openCardDeletePopup = (cardId, removeCardElement) => {
  cardDeletePopup.setActionOnSubmit(_ => {
    if (cardId) {
      api.deleteCard(cardId)
        .catch(err => console.log(err));
    }
    removeCardElement();
  });
  cardDeletePopup.open();
}

// Handles 'add new card' form submit
const handleCardAddFormSubmit = (formData) => {
  api.addCard({ name: formData.placeName, link: formData.placeLink })
    .then(cardData => cardsSection.prependItem(generateCard(cardData, true)))
    .catch(err => console.log(err));
}

const cardAddPopup = new PopupWithForm(handleCardAddFormSubmit, cardAddPopupSelector);

// Returns card element with populated data
const generateCard = (cardData, isRemovable) => new Card({
  data: cardData,
  isRemovable: isRemovable,
  handleCardClick: openCardPopup,
  handleCardDelete: openCardDeletePopup
}, cardTemplateSelector).generateCard();


/* API CALL TO GET DATA */
api.getData()
  .then(data => {
    const profileData = data[0];
    const cardsArray = data[1];

    // set user profile information
    userInfo.setUserInfo({
      profileName: profileData.name,
      profileDescription: profileData.about
    })

    const userId = profileData._id;

    // load cards
    cardsSection.renderItems({
      items: cardsArray,
      renderer: (cardData) => {
        const isRemovable = userId === cardData.owner._id;
        const card = generateCard(cardData, isRemovable);
        cardsSection.appendItem(card);
      }
    });
  })
  .catch(err => {
    console.log(err);
  })


/* EVENT LISTENERS */
cardPopup.setEventListeners();
cardAddPopup.setEventListeners();
cardDeletePopup.setEventListeners();
cardAddButton.addEventListener('click', () => openCardAddPopup());
profileEditPopup.setEventListeners();
profileEditButton.addEventListener('click', () => openProfileEditPopup());

/* VALIDATORS INITIALIZATION */
cardAddFormValidator.enableValidation();
profileEditFormValidator.enableValidation();


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
  profileUpdateAvatarPopupSelector,
  profileNameSelector,
  profileDescriptionSelector,
  profileAvatarSelector,
  validationConfig
} from '../scripts/utils/constants.js';


const cardAddForm = document.forms.cardCreateForm;
const cardAddButton = document.querySelector('.profile__add-btn');
const profileEditForm = document.forms.profileEditForm;
const profileEditFormName = profileEditForm.elements.profileName;
const profileEditFormDescription = profileEditForm.elements.profileDescription;
const profileEditButton = document.querySelector('.profile__edit-btn');
const profileUpdateAvatarForm = document.forms.avatarUpdateForm;
const profileUpdateAvatarButton = document.querySelector('.profile__update-avatar-btn');

const cardAddFormValidator = new FormValidator(validationConfig, cardAddForm);
const cardsSection = new Section(cardsSectionSelector);
const cardPopup = new PopupWithImage(cardPopupSelector);
const cardDeletePopup = new PopupWithSubmit(cardDeletePopupSelector);
const profileEditFormValidator = new FormValidator(validationConfig, profileEditForm);
const profileUpdateAvatarFormValidator = new FormValidator(validationConfig, profileUpdateAvatarForm);
const userInfo = new UserInfo({ profileNameSelector, profileDescriptionSelector, profileAvatarSelector });
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
    .then(_ => {
      userInfo.setUserInfo(profileData);
      profileEditPopup.close();
    })
    .catch(err => console.log(err))
    .finally(_ => profileEditPopup.renderLoading(false));
};

const profileEditPopup = new PopupWithForm(handleProfileEditFormSubmit, profileEditPopupSelector);

// Opens 'update avatar form'
const openProfileUpdateAvatarPopup = () => {
  profileUpdateAvatarFormValidator.resetErrors();
  profileUpdateAvatarFormValidator.toggleButtonState();

  profileUpdateAvatarPopup.open();
}

// Handles 'update avatar' form submit
const handleProfileUpdateAvatar = (formData) => {
  api.updateProfileAvatar(formData.avatarLink)
    .then(response => {
      userInfo.setAvatar(response.avatar);
      profileUpdateAvatarPopup.close();
    })
    .catch(err => console.log(err))
    .finally(_ => profileUpdateAvatarPopup.renderLoading(false));
}

const profileUpdateAvatarPopup = new PopupWithForm(handleProfileUpdateAvatar, profileUpdateAvatarPopupSelector);

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
    api.deleteCard(cardId)
      .then(_ => {
        removeCardElement();
        cardDeletePopup.close();
      })
      .catch(err => console.log(err));
  });
  cardDeletePopup.open();
}

// Handles 'add new card' form submit
const handleCardAddFormSubmit = (formData) => {
  api.addCard({ name: formData.placeName, link: formData.placeLink })
    .then(cardData => {
      cardsSection.prependItem(generateCard(cardData, false, true));
      cardAddPopup.close();
    })
    .catch(err => console.log(err))
    .finally(_ => cardAddPopup.renderLoading(false));
}

const cardAddPopup = new PopupWithForm(handleCardAddFormSubmit, cardAddPopupSelector);

// Sends request to the server and updates card element
const likeCard = ({ cardId, isLiked, updateState }) => {
  if(isLiked) {
    api.deleteLikeFromCard(cardId)
      .then(cardData => updateState(cardData.likes.length, !isLiked))
      .catch(err => console.log(err));
  }
  else {
    api.addLikeToCard(cardId)
      .then(cardData => updateState(cardData.likes.length, !isLiked))
      .catch(err => console.log(err));
  }
}

// Returns card element with populated data
const generateCard = (cardData, isLiked, isRemovable) => new Card({
  data: cardData,
  isLiked: isLiked,
  isRemovable: isRemovable,
  handleCardClick: openCardPopup,
  handleCardLike: likeCard,
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
    userInfo.setAvatar(profileData.avatar);

    const currentUserId = profileData._id;

    // load cards
    cardsSection.renderItems({
      items: cardsArray,
      renderer: (cardData) => {
        const isLiked = cardData.likes.some(user => user._id === currentUserId);
        const isRemovable = cardData.owner._id === currentUserId;
        const card = generateCard(cardData, isLiked, isRemovable);
        cardsSection.appendItem(card);
      }
    });
  })
  .catch(err => console.log(err));


/* EVENT LISTENERS */
cardPopup.setEventListeners();
cardAddPopup.setEventListeners();
cardDeletePopup.setEventListeners();
cardAddButton.addEventListener('click', () => openCardAddPopup());
profileEditPopup.setEventListeners();
profileUpdateAvatarPopup.setEventListeners();
profileEditButton.addEventListener('click', () => openProfileEditPopup());
profileUpdateAvatarButton.addEventListener('click', () => openProfileUpdateAvatarPopup());

/* VALIDATORS INITIALIZATION */
cardAddFormValidator.enableValidation();
profileEditFormValidator.enableValidation();
profileUpdateAvatarFormValidator.enableValidation();


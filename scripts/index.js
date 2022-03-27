const profileBlock = document.querySelector('.profile');
const profileName = profileBlock.querySelector('.profile__name');
const profileDescription = profileBlock.querySelector('.profile__description');
const profileEditBtn = profileBlock.querySelector('.profile__edit-btn');
const addCardBtn = profileBlock.querySelector('.profile__add-btn');

const popups = Array.from(document.querySelectorAll('.popup'));

const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const editProfileForm = editProfilePopup.querySelector('.popup__container');
const editProfileFormName = editProfileForm.querySelector('#profile-name-input');
const editProfileFormDescription = editProfileForm.querySelector('#profile-description-input');
const editProfileFormSubmitBtn = editProfileForm.querySelector('.popup__submit-btn');
const editProfilePopupCloseBtn = editProfilePopup.querySelector('.popup__close-btn');

const cardTemplate = document.querySelector('#element-template').content;

const addCardPopup = document.querySelector('.popup_type_add-card');
const addCardForm = addCardPopup.querySelector('.popup__container');
const addCardFormPlaceName = addCardForm.querySelector('#place-name-input');
const addCardFormPlaceLink = addCardForm.querySelector('#place-link-input');
const addCardSubmitBtn = addCardPopup.querySelector('.popup__submit-btn');
const addCardCloseBtn = addCardPopup.querySelector('.popup__close-btn');

const imagePopup = document.querySelector('.popup_type_image');
const img = imagePopup.querySelector('.popup__image');
const imageCaption = imagePopup.querySelector('.popup__img-caption');
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

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscKey);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscKey);
}

function showEditProfilePopup() {
  editProfileFormName.value = profileName.textContent;
  editProfileFormDescription.value = profileDescription.textContent;

  const inputList = Array.from(editProfileForm.querySelectorAll(validationConfig.inputSelector));

  toggleButtonState(inputList, editProfileFormSubmitBtn, validationConfig.inactiveButtonClass);

  openPopup(editProfilePopup);
}

function handleSubmitEditForm(evt) {
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

  imageCaption.textContent = placeName;

  openPopup(imagePopup);
}

function showAddCardPopup() {
  const inputList = Array.from(addCardForm.querySelectorAll(validationConfig.inputSelector));

  toggleButtonState(inputList, addCardSubmitBtn, validationConfig.inactiveButtonClass)

  openPopup(addCardPopup);
}

function handleSubmitAddCardForm(evt) {
  evt.preventDefault();

  renderCard({
    name: addCardFormPlaceName.value,
    link: addCardFormPlaceLink.value
  });

  addCardFormPlaceName.value = '';
  addCardFormPlaceLink.value = '';

  closePopup(addCardPopup);
}

function handleEscKey(evt) {
  if (evt.key === "Escape") {
    popups.forEach((popup) => {
      closePopup(popup);
    });
  }
}

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup(evt.target);
    }
  });
});

initialCards.forEach((card) => {
  renderCard(card);
});

profileEditBtn.addEventListener('click', showEditProfilePopup);
editProfileForm.addEventListener('submit', handleSubmitEditForm);
editProfilePopupCloseBtn.addEventListener('click', () => {
  closePopup(editProfilePopup);
});

addCardBtn.addEventListener('click', showAddCardPopup);

addCardForm.addEventListener('submit', handleSubmitAddCardForm);

addCardCloseBtn.addEventListener('click', () => {
  closePopup(addCardPopup);
});

imagePopupCloseBtn.addEventListener('click', () => {
  closePopup(imagePopup);
});

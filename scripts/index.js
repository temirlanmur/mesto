const profileBlock = document.querySelector('.profile');
const profileName = profileBlock.querySelector('.profile__name');
const profileDescription = profileBlock.querySelector('.profile__description');
const profileEditBtn = profileBlock.querySelector('.profile__edit-btn');
const addCardBtn = profileBlock.querySelector('.profile__add-btn');

const editProfilePopup = document.querySelector('#editProfile');
const editProfileForm = editProfilePopup.querySelector('.popup__container');
const editProfileFormName = editProfileForm.querySelector('#editFormProfileName');
const editProfileFormDescription = editProfileForm.querySelector('#editFormProfileDescription');
const editProfilePopupCloseBtn = editProfilePopup.querySelector('.popup__close-btn');

const addCardPopup = document.querySelector('#addCard');
const addCardForm = addCardPopup.querySelector('.popup__container');
const addCardFormPlaceName = addCardForm.querySelector('#placeName');
const addCardFormPlaceLink = addCardForm.querySelector('#placeLink');
const addCardCloseBtn = addCardPopup.querySelector('.popup__close-btn');

const imagePopup = document.querySelector('#imagePopup');
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

function showEditProfilePopup() {
  editProfilePopup.classList.toggle('popup_opened');

  editProfileFormName.value = profileName.textContent;
  editProfileFormDescription.value = profileDescription.textContent;
}

function editFormSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = editProfileFormName.value;
  profileDescription.textContent = editProfileFormDescription.value;

  showEditProfilePopup();
}

function addCard(placeName, imageLink) {
  const cardTemplate = document.querySelector('#elementTemplate').content;
  const card = cardTemplate.querySelector('.element').cloneNode(true);

  card.querySelector('.element__title').textContent = placeName;
  const cardImage = card.querySelector('.element__img');
  cardImage.src = imageLink;
  cardImage.alt = placeName;

  card.querySelector('.element__popup-btn').addEventListener('click', () => {
    showImagePopup(placeName, imageLink);
  });

  card.querySelector('.element__like-btn').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like-btn_active');
  });

  card.querySelector('.element__trash-btn').addEventListener('click', () => {
    card.remove();
  });

  elementsContainer.prepend(card);
}

function showImagePopup(placeName, imageLink) {
  const img = imagePopup.querySelector('.popup__image');
  img.src = imageLink;
  img.alt = placeName;

  imagePopup.querySelector('.popup__img-caption').textContent = placeName;

  imagePopup.classList.toggle('popup_opened');
}

function showAddCardPopup() {
  addCardPopup.classList.toggle('popup_opened');
}

function addCardFormSubmitHandler(evt) {
  evt.preventDefault();

  addCard(addCardFormPlaceName.value, addCardFormPlaceLink.value);

  showAddCardPopup();
}

initialCards.forEach((card) => {
  addCard(card.name, card.link)
});

profileEditBtn.addEventListener('click', showEditProfilePopup);
editProfileForm.addEventListener('submit', editFormSubmitHandler);
editProfilePopupCloseBtn.addEventListener('click', () =>
  editProfilePopup.classList.toggle('popup_opened')
);

addCardBtn.addEventListener('click', showAddCardPopup);
addCardForm.addEventListener('submit', addCardFormSubmitHandler);
addCardCloseBtn.addEventListener('click', showAddCardPopup);

imagePopupCloseBtn.addEventListener('click', showImagePopup);

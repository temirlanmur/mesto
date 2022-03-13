const profileBlock = document.querySelector('.profile');
const profileName = profileBlock.querySelector('.profile__name');
const profileDescription = profileBlock.querySelector('.profile__description');
const profileEditBtn = profileBlock.querySelector('.profile__edit-btn');

const popup = document.querySelector('.popup');
const popupCloseBtn = popup.querySelector('.popup__close-btn');
const formElement = popup.querySelector('.popup__container');
const formName = formElement.querySelector('#form-name');
const formDescription = formElement.querySelector('#form-description');

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

function addCard(placeName, imageLink) {
  const cardTemplate = document.querySelector('#element-template').content;
  const card = cardTemplate.querySelector('.element').cloneNode(true);

  card.querySelector('.element__title').textContent = placeName;
  const cardImage = card.querySelector('.element__img');
  cardImage.src = imageLink;
  cardImage.alt = placeName;

  elementsContainer.append(card);
}

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

initialCards.forEach((card) => {
  addCard(card.name, card.link)
});

profileEditBtn.addEventListener('click', showPopup);

popupCloseBtn.addEventListener('click', () =>
  popup.classList.toggle('popup_opened')
);

formElement.addEventListener('submit', formSubmitHandler);

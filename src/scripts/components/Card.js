export default class Card {
  constructor({ placeName, placeLink }, handleCardClick, cardTemplateSelector) {
    this._title = placeName;
    this._imageLink = placeLink;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardTemplateSelector;
  }

  // returns html markup
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  }

  // adds listeners to markup
  _setEventListeners() {
    // open popup
    this._element
      .querySelector('.element__popup-btn')
      .addEventListener('click', () => {
        this._handleCardClick(this._title, this._imageLink);
      });

    // like card
    this._element
      .querySelector('.element__like-btn')
      .addEventListener('click', this._toggleLikeButton);

    // remove card
    this._element
      .querySelector('.element__trash-btn')
      .addEventListener('click', () => {
        this._removeCard()
      });
  }

  // callback func for event listener; likes card
  _toggleLikeButton(evt) {
    evt.target.classList.toggle('element__like-btn_active');
  }

  // callback func for event listener; removes card
  _removeCard() {
    this._element.remove();
  }

  // returns card markup with title & image, and added event listeners
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._cardImage = this._element.querySelector('.element__img');
    this._cardImage.src = this._imageLink;
    this._cardImage.alt = this._title;

    this._element
      .querySelector('.element__title')
      .textContent = this._title;

    return this._element;
  }
}

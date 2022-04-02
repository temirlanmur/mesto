export default class Card {
  popup = document.querySelector('.popup_type_image');
  popupImage = this.popup.querySelector('.popup__image');
  popupImageCaption = this.popup.querySelector('.popup__img-caption');

  constructor(cardData, cardTemplateSelector) {
    this._title = cardData.name;
    this._imageLink = cardData.link;
    this._cardSelector = cardTemplateSelector;
  }

  // returns html markup
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  // adds listeners to markup
  _setEventListeners() {
    // open popup
    this._element
      .querySelector('.element__popup-btn')
      .addEventListener('click', () => {
        this._showImagePopup()
      });

    // like card
    this._element
      .querySelector('.element__like-btn')
      .addEventListener('click', this._toggleLikeButton);

    // remove card
    this._element
      .querySelector('.element__trash-btn')
      .addEventListener('click', this._removeCard)
  }

  // callback func for event listener; opens image
  _showImagePopup() {
    this.popupImage.src = this._imageLink;
    this.popupImage.alt = this._title;

    this.popupImageCaption.textContent = this._title;

    this.popup.classList.add('popup_opened');
  }

  // callback func for event listener; likes card
  _toggleLikeButton(evt) {
    evt.target.classList.toggle('element__like-btn_active');
  }

  // callback func for event listener; removes card
  _removeCard(evt) {
    evt.target.closest('.element').remove();
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

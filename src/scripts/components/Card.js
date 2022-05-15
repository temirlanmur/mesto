export default class Card {

  constructor({
    data,
    isRemovable,              // data coming from API call
    handleCardClick,    // handles clicking on the card (opening the popup)
    handleCardDelete   // handles clicking on the trash icon (opening popup)
  },
  cardTemplateSelector) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._likesCount = data.likes.length;
    this._isRemovable = isRemovable;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
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
        this._handleCardClick(this._name, this._link);
      });

    // like card
    this._element
      .querySelector('.element__like-btn')
      .addEventListener('click', this._toggleLikeButton);

    // remove card
    if (this._isRemovable) {
      this._element
        .querySelector('.element__trash-btn')
        .addEventListener('click', () => {
          this._handleCardDelete(this._id, this._removeCard.bind(this));
        });
    }
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

    if (!this._isRemovable) {
      this._element
        .querySelector('.element__trash-btn')
        .remove();
    }

    this._cardImage = this._element.querySelector('.element__img');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._element
      .querySelector('.element__title')
      .textContent = this._name;

    this._element
      .querySelector('.element__like-count')
      .textContent = this._likesCount;

    this._setEventListeners();

    return this._element;
  }
}

export default class Card {

  constructor({
    data,               // data coming from API call
    isLiked,            // if the card should be displayed as 'liked'
    isRemovable,        // if the card should be displayed as 'removable'
    handleCardClick,    // handles clicking on the card (opening the popup)
    handleCardLike,     // handles liking the card
    handleCardDelete    // handles clicking on the trash icon (opening popup)
  },
  cardTemplateSelector) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._likesCount = data.likes.length;
    this._isLiked = isLiked;
    this._isRemovable = isRemovable;
    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    this._handleCardDelete = handleCardDelete;
    this._cardSelector = cardTemplateSelector;
  }

  // set likes count and liked state
  _setLikes({ likesCount, isLiked }) {
    this._likesCount = likesCount;
    this._isLiked = isLiked;
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
      .addEventListener('click', () => {
        this._handleCardLike({
          cardId: this._id,
          isLiked: this._isLiked,
          updateState: this._updateLikesState.bind(this)
        });
      });

    // remove card
    if (this._isRemovable) {
      this._element
        .querySelector('.element__trash-btn')
        .addEventListener('click', () => {
          this._handleCardDelete(this._id, this._removeCard.bind(this));
        });
    }
  }

  // callback func; sets card's state and updates rendering
  _updateLikesState(likesCount, isLiked) {
    this._setLikes({ likesCount, isLiked });
    this._updateLikes();
  }

  // removes card element
  _removeCard() {
    this._element.remove();
  }

  // returns card markup with added state and event listeners
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

    this._likesCountElement = this._element.querySelector('.element__like-count')
    this._likeButton = this._element.querySelector('.element__like-btn');
    this._updateLikes();

    this._setEventListeners();

    return this._element;
  }

  // updates likes count and toggles like button based on the current card state
  _updateLikes() {
    this._likesCountElement.textContent = this._likesCount;
    this._toggleLikeButton();
  }

  // toggles like button
  _toggleLikeButton() {
    if (this._isLiked) {
      this._likeButton.classList.add('element__like-btn_active');
    } else {
      this._likeButton.classList.remove('element__like-btn_active');
    }
  }
}

import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupImageCaption = this._popup.querySelector('.popup__img-caption');
  }

  open(imageTitle, imageLink) {
    this._popupImage.src = imageLink;
    this._popupImage.alt = imageTitle;
    this._popupImageCaption.textContent = imageTitle;
    super.open();
  }
}

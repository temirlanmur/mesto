import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor({ name, link }, popupSelector) {
    super(popupSelector);
    this._title = name;
    this._imageLink = link;
  }

  open() {
    const popupImage = this._popup.querySelector('.popup__image');
    const popupImageCaption = this._popup.querySelector('.popup__img-caption');

    popupImage.src = this._imageLink;
    popupImage.alt = this._title;

    popupImageCaption.textContent = this._title;
    super.open();
  }
}

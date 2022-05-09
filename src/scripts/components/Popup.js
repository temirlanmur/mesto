export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  // opens popup
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // closes popup
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // sets event listeners:
  //    on close button
  //    on click outside modal window
  setEventListeners() {
    this._popup.addEventListener('click', ((evt) => {
      if (evt.target.classList.contains('popup__close-btn')
        || evt.target.classList.contains('popup_opened')) {
          this.close();
      }
    }));
  }

  // callback to close popup on ESC key
  _handleEscClose = ((evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  }).bind(this);
}

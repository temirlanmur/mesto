export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  // opens popup
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', _handleEscClose);
  }

  // closes popup
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', _handleEscClose);
  }

  // sets event listeners:
  //    on close button
  //    on click outside modal window
  setEventListeners() {
    const popupCloseButton = this._popup.querySelector('.popup__close-btn');

    popupCloseButton.addEventListener('click', () => {
      this.close();
    });

    this._popup.addEventListener('click', ((evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
    }));
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
}

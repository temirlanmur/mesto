import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._submitButton = this._popup.querySelector('.popup__submit-btn');
  }

  // sets action on submit
  setActionOnSubmit(action) {
    this._actionOnSubmit = action;
  }

  // sets event listeners:
  //    on close button
  //    on click outside modal window
  //    on submit button
  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', evt => {
      this._actionOnSubmit();
      this.close();
    })
  }
}

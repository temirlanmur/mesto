import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(handleFormSubmit, popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this.handleFormSubmit(this._getInputValues);

      this.close();
    });
    super.setEventListeners();
  }

  close() {
    this._form.reset();
    super.close();
  }

  _getInputValues() {
    return this._form.elements;
  }
}

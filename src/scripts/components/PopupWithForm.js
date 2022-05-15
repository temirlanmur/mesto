import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(handleFormSubmit, popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._form.reset();
    super.close();
  }

  // sets event listeners:
  //    on close button
  //    on click outside modal window
  //    on form submit
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  _getInputValues() {
    this._formValues = {};
    Array.from(this._form.elements).forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }
}

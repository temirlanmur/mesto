export default class FormValidator {
  constructor(validationSettings, formElement) {
    this._settings = validationSettings;
    this._form = formElement;
  }

  // adds listeners to form
  _setEventListeners() {
    const formInputList = Array.from(
      this._form.querySelectorAll(this._settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    formInputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        this._checkInputValidity(inputElement);
        toggleButtonState(formInputList, buttonElement, settings.inactiveButtonClass);
      });
    });
  }

  // checks the validity of form input element,
  // and displays/hides validation message
  _checkInputValidity(formInputElement) {
    if (!formInputElement.validity.valid) {
      this._showInputError(formInputElement);
    } else {
      this._hideInputError(formInputElement);
    }
  }

  // shows validation message for the form input element
  _showInputError(formInputElement) {
    const errorElement = this._form.querySelector(`.${formInputElement.id}-error`);

    formInputElement.classList.add(this._settings.inputErrorClass);

    errorElement.textContent = formInputElement.validationMessage;
    errorElement.classList.add(this._settings.errorClass);
  }

  // hides validation message for the form input element
  _hideInputError(formInputElement) {
    const errorElement = this._form.querySelector(`.${formInputElement.id}-error`);

    formInputElement.classList.remove(this._settings.inputErrorClass);

    errorElement.textContent = '';
    errorElement.classList.remove(this._settings.errorClass);
  }

  // enables validation for the passed form
  enableValidation() {
    this._setEventListeners();
  }
}

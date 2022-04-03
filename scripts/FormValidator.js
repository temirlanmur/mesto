export default class FormValidator {
  constructor(validationSettings, formElement) {
    this._settings = validationSettings;
    this._form = formElement;
  }

  // adds listeners to form
  _setEventListeners() {
    const formInputList = Array.from(
      this._form.querySelectorAll(this._settings.inputSelector));
    const buttonElement = this._form.querySelector(this._settings.submitButtonSelector);

    formInputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(formInputList, buttonElement);
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

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._settings.inactiveButtonClass);
      buttonElement.disabled = true;
    }
    else {
      buttonElement.classList.remove(this._settings.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  // enables validation for the passed form
  enableValidation() {
    this._setEventListeners();
  }
}

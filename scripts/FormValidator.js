export default class FormValidator {
  constructor(validationSettings, formElement) {
    this._settings = validationSettings;
    this._form = formElement;
    this._formInputsArray = Array.from(
      formElement.querySelectorAll(validationSettings.inputSelector));
    this._formSubmitButton = formElement.querySelector(validationSettings.submitButtonSelector);
  }

  // adds listeners to form
  _setEventListeners() {
    this._formInputsArray.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
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

  // toggles form submit button based on input validity
  toggleButtonState() {
    if (this._hasInvalidInputState()) {
      this._formSubmitButton.classList.add(this._settings.inactiveButtonClass);
      this._formSubmitButton.disabled = true;
    }
    else {
      this._formSubmitButton.classList.remove(this._settings.inactiveButtonClass);
      this._formSubmitButton.disabled = false;
    }
  }

  _hasInvalidInputState() {
    return this._formInputsArray.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  // enables validation for the passed form
  enableValidation() {
    this._setEventListeners();
  }
}

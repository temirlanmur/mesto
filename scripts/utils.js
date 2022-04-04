export const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', _closePopupByEscape);
}

export const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', _closePopupByEscape);
}

const _closePopupByEscape = (evt) => {
  if (evt.key === "Escape") {
    const popupToClose = document.querySelector('.popup_opened');
    closePopup(popupToClose);
  }
}

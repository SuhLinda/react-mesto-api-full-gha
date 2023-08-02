// PopupWithForm.jsx

import React from 'react';
import usePopupClose from '../hooks/usePopupClose.js';

function PopupWithForm({name, title, children, buttonText, isOpen, onClose, onSubmit, onValidate, toggleButtonState}) {
  usePopupClose(isOpen, onClose);

  return (
    <div
      className={`popup popup_${name} ${isOpen ? 'popup_opened' : " "}`}>
      <div className="popup__container">
        <button
          className="popup__button-close"
          id={`popup__button-close_${name}`}
          type="button"
          aria-label="закрыть"
          onClick={onClose}>
        </button>
        <h2 className="popup__edit">{title}
        </h2>
        <form
          className="popup__form"
          name={name}
          noValidate
          onSubmit={onSubmit}
          onChange={onValidate}>{children}
          <button
            className={`popup__button-save ${toggleButtonState && 'popup__button-save_inactive'}`}
            type="submit"
            id={name}
            aria-label="#">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
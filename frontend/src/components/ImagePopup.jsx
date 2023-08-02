// ImagePopup.jsx
/////////
import React from 'react';
import usePopupClose from "../hooks/usePopupClose";

function ImagePopup({card, onClose}) {
  usePopupClose(card?.link, onClose);

  return (
    <div
      className={`popup popup-zoom ${card.link ? 'popup_opened' : " "}`}
      id="popup-zoom">
        <div className="popup-zoom__container">
          <button
            className="popup-zoom__close popup__button-close"
            onClick={onClose}
            id="popup-zoom__close"
            type="button"
            aria-label="закрыть">
          </button>
          <img
            className="popup-zoom__image"
            id="popup-zoom__image"
            src={card ? card.link : " "}
            alt={card.name}/>
          <h2
            className="popup-zoom__subtitle"
            id="popup-zoom__subtitle">{card.name}
          </h2>
        </div>
    </div>
  )
}

export default ImagePopup;
import usePopupClose from "../hooks/usePopupClose.js";

function InfoTooltip({name, image, text, isOpen, onClose}) {
  usePopupClose(isOpen, onClose);

  return(
    <>
      <div
        className={`popup popup_${name} ${isOpen ? 'popup_opened' : " "}`}>
        <div className="popup__info-tooltip_container">
          <button
            className="popup__button-close"
            id={`popup__button-close_${name}`}
            type="button"
            aria-label="закрыть"
            onClick={onClose}>
          </button>
          <img
            className="popup__info-tooltip"
            src={image}
            alt={text}/>
          <h2
            className="popup__info-tooltip_text">
              {text}
          </h2>
        </div>
      </div>
    </>
  )
}

export default InfoTooltip;
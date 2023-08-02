import React from 'react';

function usePopupClose(isOpen, closePopup) {
  React.useEffect(() => {
    if(!isOpen) return;

    const handleOverlay = (evt) => {
      if(evt.target.classList.contains('popup_opened')) {
        closePopup();
      }
    }

    const handleEscape = (evt) => {
      if(evt.key === 'Escape') {
        closePopup();
      }
    }

    document.addEventListener('mousedown', handleOverlay);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOverlay);
      document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, closePopup])
}

export default usePopupClose;
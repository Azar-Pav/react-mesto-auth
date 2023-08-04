import React, { useEffect } from 'react';

function ImagePopup({card, onClose, isOpen}) {
  function handleCloseByOverlay(e) {
    if (e.target.classList.contains('popup')) {
      onClose();
    }
  }

  useEffect(() => {
    if (!isOpen) return;

    function handleEscClose(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen]);

  return (
    <div className={`popup popup_type-js_image  ${isOpen ? `popup_opened` : ''}`} onMouseUp={handleCloseByOverlay}>
      <div className="popup__img-window">
        <button
          className="popup__close-button"
          type="button"
          name="Закрыть"
          onClick={onClose}
        ></button>
        <img src={card.link} alt={card.name} className="popup__image" />
        <p className="popup__card-text">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;

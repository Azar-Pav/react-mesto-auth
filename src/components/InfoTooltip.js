import React, {useEffect} from 'react';

function InfoTooltip({ isOpen, onClose, info }) {

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
    <div className={`popup ${isOpen ? `popup_opened`  : ''}`} onMouseUp={handleCloseByOverlay}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" name="Закрыть" onClick={onClose}></button>
        <div className={`popup__info-img ${info ? "popup__info-img_success" : "popup__info-img_fail"}`}></div>
        <h2 className="popup__info-text">{info ? "Вы успешно зарегистрировались" : "Что-то пошло не так! Попробуйте ещё раз"}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;

import React, {useEffect} from 'react';

function InfoTooltip({ isOpen, onClose, info }) {

  function handleMouseUpClose(e) {
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
    <div className={`popup ${isOpen && `popup_opened`}`} onMouseUp={handleMouseUpClose}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" name="Закрыть" onClick={onClose}></button>
        <h2 className="popup__legend">{info ? "Вы успешно зарегистрировались" : "Что-то пошло не так! Попробуйте ещё раз"}</h2>
        </div>
    </div>
  );
}

export default InfoTooltip;

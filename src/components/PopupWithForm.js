import React, {useEffect} from 'react';

function PopupWithForm({ name, title, buttonText, buttonTextLoad, onSubmit, isOpen, onClose, isLoading, children }) {
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
    <div className={`popup popup_type-js_${name} ${isOpen ? `popup_opened`  : ''}`} onMouseUp={handleCloseByOverlay}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" name="Закрыть" onClick={onClose}></button>
        <h2 className="popup__legend">{title}</h2>
        <form name={name} className="popup__edit-form" noValidate onSubmit={onSubmit}>
          <fieldset className="popup__edit">
            {children}
            <button className={`popup__save-button ${isLoading ? 'popup__save-button_disabled' : ''}`} type="submit" name="Сохранить" disabled={isLoading}>{isLoading ? buttonTextLoad : buttonText}</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;

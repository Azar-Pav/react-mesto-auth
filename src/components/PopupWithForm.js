import React, {useEffect} from 'react';

function PopupWithForm({ name, title, buttonText, onSubmit, isOpen, onClose, isLoading, children }) {
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
    <div className={`popup popup_type-js_${name} ${isOpen && `popup_opened`}`} onMouseUp={handleMouseUpClose}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" name="Закрыть" onClick={onClose}></button>
        <h2 className="popup__legend">{title}</h2>
        <form name={name} className="popup__edit-form" noValidate onSubmit={onSubmit}>
          <fieldset className="popup__edit">
            {children}
            <button className="popup__save-button" type="submit" name="Сохранить" disabled={isLoading}>{buttonText}</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;

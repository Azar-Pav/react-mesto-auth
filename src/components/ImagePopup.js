import React from 'react';

function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_type-js_image  ${card.name && `popup_opened`}`}>
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

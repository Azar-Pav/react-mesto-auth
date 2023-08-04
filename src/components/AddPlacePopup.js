import React, { useRef, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onAddPlace, onClose, isOpen, isLoading}) {
  const nameInputRef = useRef();
  const urlInputRef = useRef();

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({ name: nameInputRef.current.value, link: urlInputRef.current.value });
  }

  useEffect(() => {
    nameInputRef.current.value='';
    urlInputRef.current.value='';
  }, [isOpen]);

  return (
    <PopupWithForm name="addPlace" title="Новое место"
      buttonText={"Сохранить"}
      buttonTextLoad={"Сохранение..."}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
    >
      <input
        type="text"
        className="popup__text-field"
        id="input-name"
        name="name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        ref={nameInputRef}
      />
      <span className="input-name-error"></span>
      <input
        type="url"
        className="popup__text-field"
        id="input-link"
        name="link"
        placeholder="Ссылка на картинку"
        required
        ref={urlInputRef}
      />
      <span className="input-link-error"></span>
  </PopupWithForm>
  );
}

export default AddPlacePopup;

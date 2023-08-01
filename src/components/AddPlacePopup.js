import React, { useRef, useEffect, useContext } from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentButtonTextContext } from '../contexts/CurrentButtonTextContext';

function AddPlacePopup(props) {
  const currentButton = useContext(CurrentButtonTextContext);
  const nameInputRef = useRef();
  const urlInputRef = useRef();

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({ name: nameInputRef.current.value, link: urlInputRef.current.value });
  }

  useEffect(() => {
    nameInputRef.current.value='';
    urlInputRef.current.value='';
  }, [props.isOpen]);

  return (
    <>
      <PopupWithForm name="addPlace" title="Новое место"
        buttonText={currentButton.formPopup}
        onSubmit={handleSubmit}
        isOpen={props.isOpen}
        onClose={props.onClose}
        isLoading={currentButton.isLoading}
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
  </>
  );
}

export default AddPlacePopup;

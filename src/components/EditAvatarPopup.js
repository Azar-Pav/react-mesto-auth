import React, { useRef, useEffect, useContext } from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentButtonTextContext } from '../contexts/CurrentButtonTextContext';

function EditAvatarPopup(props) {
  const currentButton = useContext(CurrentButtonTextContext);
  const inputRef = useRef();

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы (страница не обновляется)
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateAvatar({ avatar: inputRef.current.value });
  }

  useEffect(() => {
    inputRef.current.value='';
  }, [props.isOpen]);

  return (
    <>
      <PopupWithForm name="editAvatar" title="Обновить аватар"
        buttonText={currentButton.formPopup}
        onSubmit={handleSubmit}
        isOpen={props.isOpen}
        onClose={props.onClose}
        isLoading={currentButton.isLoading}
      >
        <input
          type="url"
          className="popup__text-field"
          id="input-avatar"
          name="avatar"
          placeholder="Ссылка на аватарку"
          required
          ref={inputRef}
        />
        <span className="input-avatar-error"></span>
      </PopupWithForm>
    </>
  );
}

export default EditAvatarPopup;

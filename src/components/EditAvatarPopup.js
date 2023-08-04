import React, { useRef, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose, isLoading}) {
  const inputRef = useRef();

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы (страница не обновляется)
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateAvatar({ avatar: inputRef.current.value });
  }

  useEffect(() => {
    inputRef.current.value='';
  }, [isOpen]);

  return (
    <PopupWithForm name="editAvatar" title="Обновить аватар"
      buttonText={"Сохранить"}
      buttonTextLoad={"Сохранение..."}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
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
  );
}

export default EditAvatarPopup;

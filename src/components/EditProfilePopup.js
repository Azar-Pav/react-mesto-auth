import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ onUpdateUser, onClose, isOpen, isLoading}) {
  const currentUser = useContext(CurrentUserContext);

  const [values, setValues] = useState({ name: '', about: '' })
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
    ...prev,
    [name]: value
    }))
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы (страница не обновляется)
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser(values);
  }

  useEffect(() => {
    setValues({name: currentUser.name, about: currentUser.about});
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm name="editProfile" title="Редактировать профиль"
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
        placeholder="Имя профиля"
        required
        minLength="2"
        maxLength="40"
        onChange={handleChange}
        value={values.name}
      />
      <span className="input-name-error"></span>
      <input
        type="text"
        className="popup__text-field"
        id="input-about"
        name="about"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        onChange={handleChange}
        value={values.about}
      />
      <span className="input-about-error"></span>
  </PopupWithForm>
  );
}

export default EditProfilePopup;

import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CurrentButtonTextContext } from '../contexts/CurrentButtonTextContext';

function EditProfilePopup(props) {
  const [values, setValues] = useState({ name: '', about: '' })

  const currentUser = useContext(CurrentUserContext);
  const currentButton = useContext(CurrentButtonTextContext);

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
    props.onUpdateUser(values);
  }

  useEffect(() => {
    setValues({name: currentUser.name, about: currentUser.about});
  }, [currentUser, props.isOpen]);

  return (
    <>
      <PopupWithForm name="editProfile" title="Редактировать профиль"
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
  </>


  );
}

export default EditProfilePopup;

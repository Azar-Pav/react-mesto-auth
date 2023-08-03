import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
  const [values, setValues] = useState({ email: '', password: '' })
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
    ...prev,
    [name]: value
    }))
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(values);
  }

  return (
    <main className="auth">
      <h2 className="auth__legend">Регистрация</h2>
      <form noValidate onSubmit={handleSubmit}>
        <fieldset className="auth__inputs">
          <input
            type="email"
            className="auth__input"
            id="input-email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            value={values.email}
          />
          <span className="input-email-error"></span>
          <input
            type="password"
            className="auth__input"
            id="input-password"
            name="password"
            placeholder="Пароль"
            required
            onChange={handleChange}
            value={values.password}
          />
          <span className="input-password-error"></span>
        </fieldset>
        <button className="auth__save-button" type="submit" name="Войти">
          Зарегистрироваться
        </button>
      </form>
      <Link to={"/sign-in"} className="auth__action">Уже зарегистрированы? Войти</Link>
    </main>
  );
}

export default Register;

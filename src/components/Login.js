import React, { useState } from 'react';

function Login(props) {
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
    props.onLogin(values);
  }

  return (
    <main className="auth">
      <h2 className="auth__legend">Вход</h2>
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
          Войти
        </button>
      </form>
    </main>
  );
}

export default Login;

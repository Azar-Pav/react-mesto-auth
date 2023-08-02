import React, { useState } from 'react';
//TODO сисс
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
    <div className="popup__container">
        <h2 className="popup__legend">Login</h2>
        <form className="popup__edit-form" noValidate onSubmit={handleSubmit}>
          <fieldset className="popup__edit">
          <input
            type="email"
            className="auth__text-field"
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
            className="auth__text-field"
            id="input-password"
            name="password"
            placeholder="Пароль"
            required
            onChange={handleChange}
            value={values.password}
          />
          <span className="input-password-error"></span>
            <button className="popup__save-button" type="submit" name="Сохранить">Login</button>
          </fieldset>
        </form>
      </div>
  );
}

export default Login;

import React from 'react';

function Login() {

  return (
    <div className="popup__container">
        <h2 className="popup__legend">Login</h2>
        <form className="popup__edit-form" noValidate>
          <fieldset className="popup__edit">
          <input
            type="email"
            className="auth__text-field" input
            id="input-email"
            name="email"
            placeholder="Email"
            required
          />
          <span className="input-email-error"></span>
          <input
            type="password"
            className="auth__text-field"
            id="input-password"
            name="password"
            placeholder="Пароль"
            required
          />
          <span className="input-password-error"></span>
            <button className="popup__save-button" type="submit" name="Сохранить">Login</button>
          </fieldset>
        </form>
      </div>
  );
}

export default Login;

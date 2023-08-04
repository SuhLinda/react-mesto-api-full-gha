import React from 'react';
import Header from './Header.jsx';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmitRegister(evt) {
    evt.preventDefault();
    onRegister(email, password);
  }

  return (
    <>
      <Header buttonHeader={
        <Link
          to='/sign-in'
          className="login__button-enter">Войти
        </Link>
      } />
      <main className="content">
        <h2 className="login__title">Регистрация</h2>
        <form onSubmit={handleSubmitRegister}>
          <fieldset className="login__fieldset">
            <input
              className="login__fieldset-input"
              type="email"
              value={email || ""}
              onChange={handleChangeEmail}
              placeholder="Email"
              required/>
            <input
              className="login__fieldset-input"
              type="password"
              value={password || ""}
              onChange={handleChangePassword}
              placeholder="Пароль"
              required/>
          </fieldset>
          <button
            className="login__button-save"
            type="submit">Зарегистрироваться
          </button>
        </form>
        <p className="login__text">Уже зарегистрированы?
          <Link
            to='/sign-in'
            className="login__button-enter login__text"> Войти
          </Link>
        </p>
      </main>
    </>
  )
}

export default Register;

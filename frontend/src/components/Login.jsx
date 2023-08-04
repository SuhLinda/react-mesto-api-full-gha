import React, {useState} from 'react';
import Header from './Header.jsx';
import { Link } from 'react-router-dom';

function Login(
  {
    onLogin
  }
  ) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmitLogin(evt) {
    evt.preventDefault();
    onLogin(email, password);
  }

  return (
    <>
      <Header buttonHeader={
        <Link
          to='/sign-up'
          className="login__button-enter">Регистрация
        </Link>
      } />
      <main className="content">
        <h2 className="login__title">Вход</h2>
        <form
        onSubmit={handleSubmitLogin}>
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
            type="submit">Войти
          </button>
        </form>
      </main>
    </>
  )
}

export default Login;

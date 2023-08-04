import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Card from './Card.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

function Main(
  {
    cards,
    email,
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
    onCardLike,
    onCardDelete,
    logOut,
  }
  ) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <Header
        email={
          <p className="header__email-text">
            {email}
          </p>
        }
        buttonHeader={
          <button
            className="login__button-enter"
            type="button"
            onClick={logOut}>Выйти
          </button>
        } />
        <main className="content">
          <section className="profile">
            <img
              className="profile__image"
              src={currentUser.data.avatar || ''}
              alt="Имя"/>
            <button
              className="profile__image-button"
              type="button"
              onClick={onEditAvatar}>
            </button>
            <div className="profile__info">
              <h1 className="profile__info-title">{currentUser.data.name || ''}
              </h1>
              <button
                className="profile__info-edit"
                id="popup__edit"
                type="button"
                aria-label="редактировать профиль"
                onClick={onEditProfile}>
              </button>
              <p className="profile__info-subtitle">{currentUser.data.about || ''}
              </p>
            </div>
            <button
              className="profile__add-button"
              id="popup__card"
              type="button"
              aria-label="добавить"
              onClick={onAddPlace}>
            </button>
          </section>
          <section
            className="elements"
            aria-label="фото">
              {cards.map((card) => (
                <Card
                  card={card}
                  key={card._id}
                  name={card.name}
                  src={card.link}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}/>
              ))}
          </section>
        </main>
        <Footer />
    </>
  )
}

export default Main;

// Card.jsx

import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardDelete, onCardLike}) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `element__stroke ${isLiked && 'element__stroke_active'}`
  );;

  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return(
    <div className="element">
      <img
        id="element__image"
        className="element__image"
        onClick={handleClick}
        src={card.link}
        alt={card.name}/>
      {isOwn &&
        <button
          className="element__delete"
          type="button"
          aria-label="удалить"
          onClick={handleDeleteClick} />}
      <h2 className="element__text">{card.name}
      </h2>
      <button
        className={cardLikeButtonClassName}
        type="button"
        aria-label="лайк"
        onClick={handleLikeClick}>
      </button>
      <span className="element__likes-counter">{card.likes.length}
      </span>
    </div>
  )
}

export default Card;
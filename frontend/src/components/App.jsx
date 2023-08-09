import React, { useState, useEffect } from 'react';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import { AppContext } from '../contexts/AppContext.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import ProtectedRoute from './ProtectedRoute.jsx';
import Main from './Main.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import InfoTooltip from './InfoTooltip.jsx';
import ImagePopup from './ImagePopup.jsx';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import DeleteCardPopup from './DeleteCardPopup.jsx';
import { api } from '../utils/Api.js';
import { auth } from '../utils/auth.jsx';
import successfully from '../image/popup__info-tooltip_successfully.svg';
import unsuccessfully from '../image/popup__info-tooltip_unsuccessfully.svg';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteCard, setDeleteCard] = useState({});
  const [toggleButtonState, setToggleButtonState] = useState(false);
  const [toggleOfTheInputText, setToggleOfTheInputText] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [isSuccess, setSuccess] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [text, setText] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      api.getUserData()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => {
          console.log(`ошибка: ${err}`);
        })
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      api.getInitialCards()
        .then((cards) => {
          setCards(cards.reverse());
        })
        .catch((err) => {
          console.log(`ошибка: ${err}`);
        })
    }
  }, [isLoggedIn]);

  useEffect(() => {
    setToggleButtonState(true);
    setErrorMessage({});
    setToggleOfTheInputText(true);
  }, [isEditProfilePopupOpen, isEditAvatarPopupOpen, isAddPlacePopupOpen]);

  function isValid(evt) {
    if(!evt.currentTarget.checkValidity) {
      setToggleButtonState(true);
      setToggleOfTheInputText(true);
      setErrorMessage({
        ...errorMessage, [evt.target.name]: evt.target.validationMessage
      })
    } else {
      setToggleButtonState(false);
      setToggleOfTheInputText(false);
      setErrorMessage({});
    }
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  function handleBasketCardClick(card) {
    setDeleteCardPopupOpen(true);
    setDeleteCard(card);
  }

  function handleInfoTooltipClick() {
    setInfoTooltipPopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setDeleteCardPopupOpen(false);
    setInfoTooltipPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(card =>
      card === currentUser.data._id
    );
    // Отправляем запрос в API и получаем обновлённые данные карточки
    return api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((item) =>
            item._id === card._id ? newCard : item
          ));
      })
      .catch(console.error)
  }

  function handleSubmit(request) {
    setIsLoading(true);

    request()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }

  function handleCardDelete() {
    setIsLoading(true);

    function makeRequestCardDelete() {
      return api.deleteCard(isDeleteCard._id)
        .then(() => {
          setCards((state) =>
            state.filter((item) =>
              item._id !== isDeleteCard._id))
        })
        .catch(console.error)
    }
    handleSubmit(makeRequestCardDelete);
  }

  function handleUpdateUser(name, about) {
    function makeRequestUpdateUser() {
      return api.setUserData(name, about)
        .then(setCurrentUser)
        .catch(console.error)
    }
    handleSubmit(makeRequestUpdateUser);
  }

  function handleUpdateUserAvatar(avatar) {
    function makeRequestUpdateUserAvatar() {
      return api.setUserAvatar(avatar)
        .then(setCurrentUser)
        .catch(console.error)
    }
    handleSubmit(makeRequestUpdateUserAvatar);
  }

  function handleUpdateCards(data) {
    function makeRequestUpdateCards() {
      return api.addNewCard(data)
        .then((data) => {
          const newCard = {
            _id: data._id,
            name: data.name,
            link: data.link,
            likes: data.likes,
            owner: currentUser.data._id,
          };
          setCards([newCard, ...cards]);
        })
        .catch(console.error)
    }
    handleSubmit(makeRequestUpdateCards);
  }

  function onRegister(email, password) {
    auth.registration(email, password)
      .then((response) => {
        if (response) {
          setSuccess(true);
          setImage(successfully);
          setText("Вы успешно зарегистрировались!");
          navigate("sign-in", {replace: true});
        }
      })
      .catch((response) => {
        setSuccess(false);
        setImage(unsuccessfully);
        setText("Что-то пошло не так! Попробуйте ещё раз.");
        console.log((`Ошибка:${response}`));
      })
        .finally(handleInfoTooltipClick)
  }

  function onLogin(email, password) {
    auth.authorization(email, password)
      .then((response) => {
        if (response.token) {
          setSuccess(true);
          localStorage.setItem('token', response.token);
          setCurrentUser({
            data: {
              email,
              password,
              name: response.name,
              about: response.about,
              avatar: response.avatar,
              _id: response._id,
            }
          });
          setLoggedIn(true);
          setImage(successfully);
          setText("Вы успешно зарегистрировались!");
          navigate('/', {replace: true});
          setEmail(response.email);
        }
      })
      .catch((response) => {
        console.log((`Ошибка:${response}`));
        setImage(unsuccessfully);
        setText("Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(handleInfoTooltipClick)
  }

  function checkToken(){
    const token = localStorage.getItem('token');
    if (token) {
      auth.checkToken(token)
        .then((response) => {
          //console.log(response)
          setCurrentUser(response);
          setEmail(response.data.email);
          setLoggedIn(true);
          navigate('/', {replace: true});
        })
        .catch(console.error);
    }
  }

  function logOut() {
    localStorage.removeItem('token');
    navigate('/sign-up', {replace: true});
    setLoggedIn(false);
    setEmail('');
  }

  return (
    <AppContext.Provider value={{ isLoading, closeAllPopups }}>
      <CurrentUserContext.Provider value={currentUser || ''}>
        <div className="page">
          <Routes>
            <Route path='/' element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                element={Main}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardDelete={handleBasketCardClick}
                onCardLike={handleCardLike}
                email={email}
                logOut={logOut}
              />
            } />
            <Route path='/sign-up' element={
              <Register
                onRegister={onRegister}
              /> 
            } />
            <Route path='/sign-in' element={
              <Login
                onLogin={onLogin}
              /> 
            } />
            <Route path='*' element={
              isLoggedIn ? (
                <Navigate to='/' />
              ) : (
                <Navigate to='/sign-up' />
              )
            } />
          </Routes>
          <InfoTooltip
            name='infoTooltip'
            image={image}
            text={text}
            isSuccess={isSuccess}
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
            onValidate={isValid}
            toggleButtonState={toggleButtonState}
            errorMessage={errorMessage}
            toggleOfTheInputText={toggleOfTheInputText}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateUserAvatar={handleUpdateUserAvatar}
            isLoading={isLoading}
            onValidate={isValid}
            toggleButtonState={toggleButtonState}
            errorMessage={errorMessage}
            toggleOfTheInputText={toggleOfTheInputText}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onUpdateCards={handleUpdateCards}
            isLoading={isLoading}
            onValidate={isValid}
            toggleButtonState={toggleButtonState}
            errorMessage={errorMessage}
            toggleOfTheInputText={toggleOfTheInputText}
          />
          <DeleteCardPopup
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            onDeleteCard={handleCardDelete}
            isLoading={isLoading}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;

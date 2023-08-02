import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRouteElement from './ProtectedRoute';
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import Register from "./Register";
import Login from "./Login";
import api from '../utils/Api.js';
import * as auth from '../utils/auth.js'
import InfoTooltip from './InfoTooltip';
import { CurrentUserContext, loadingUser } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import { CurrentButtonTextContext, buttonText } from '../contexts/CurrentButtonTextContext';
import ImagePopup from "./ImagePopup";



function App() {
  const navigate = useNavigate();

  const [isEditAvatarPopupOpen,setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);

  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [infoTooltip, setInfoTooltip] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);

  const [currentButtonText, setCurrentButtonText] = useState('noLoading');
  const [currentUser, setCurrentUser] = useState(loadingUser);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    checkToken();

    Promise.all([ api.getUser(), api.getInitialCards() ])
    .then(([ userData, cardsData ]) => {
      setCurrentUser(userData);
      setCards(cardsData);
    })
    .catch((err) => {
      console.error(err);
    })
  }, [])

  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
      .then((res) => {
        if (res){
          setLoggedIn(true);
          navigate("/", {replace: true})
        }
      });
  }
  }

  function handleRegistration({password, email}) {
    auth.register(password, email)
      .then((res) => {
        setInfoTooltipOpen(true);
        setInfoTooltip(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        setInfoTooltipOpen(true);
        setInfoTooltip(false);
        console.error(err);
      });
  }

  function handleLogin({password, email}) {
    auth.authorize(password, email)
      .then((data) => {
        if (data) {
          setLoggedIn(true);
          navigate("/", { replace: true });
          if (!localStorage.getItem('jwt')) {
            localStorage.setItem('jwt', data.token);
            return data;
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  };
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  };
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function handleUpdateUser({ name, about }) {
    setCurrentButtonText('loading');
    api.patchUser({ name, about })
    .then((userData) => {
      setCurrentUser(userData);
      setCurrentButtonText('noLoading');
      closeAllPopups();
    })
    .catch((err) => {
      console.error(err);
    })
  };

  function handleUpdateAvatar({ avatar }) {
    setCurrentButtonText('loading');
    api.patchUserAvatar({ avatar })
    .then((userData) => {
      setCurrentUser(userData);
      setCurrentButtonText('noLoading');
      closeAllPopups();
    })
    .catch((err) => {
      console.error(err);
    })
  };

  function handleAddPlace({ name, link }) {
    setCurrentButtonText('loading');
    api.sendCard({ name, link })
    .then((newCard) => {
      setCards([newCard, ...cards]);
      setCurrentButtonText('noLoading');
      closeAllPopups();
    })
    .catch((err) => {
      console.error(err);
    })
  };

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({});
    setInfoTooltipOpen(false)
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const renderCard = (newCard) => {
      setCards((state) => state.map(
        (c) => c._id === card._id ? newCard : c
      ));
    }

    if (!isLiked) {
      api.putLike(card._id)
      .then((newCard) => renderCard(newCard))
      .catch((err) => {
        console.error(err);
      });
    } else {
      api.deleteLike(card._id)
      .then((newCard) => renderCard(newCard))
      .catch((err) => {
        console.error(err);
      });
    }
  }

  function handleCardDelete() {
    const cardsWithoutCard = cards.filter((c) => c._id !== selectedCard._id);
    setCurrentButtonText('loading');
    api.deleteCard(selectedCard._id)
    .then((res) => {
      setCards(cardsWithoutCard)
      setCurrentButtonText('noLoading');
      closeAllPopups()
    })
    .catch((err) => {
      console.error(err);
    });
  }

  return (
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={<Header pathTo={"/sign-in"} linkText={"Выйти"} onSignOut={handleLogout}/>}/>
          <Route path="/sign-up" element={<Header pathTo={"/sign-in"} linkText={"Войти"}/>}/>
          <Route path="/sign-in" element={<Header pathTo={"/sign-up"} linkText={"Регистрация"}/>}/>
        </Routes>
        <Routes>
          <Route path="/" element={
            <ProtectedRouteElement
              element={Main}
              loggedIn={loggedIn}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
            />}
          />
          <Route path="*" element={
            <ProtectedRouteElement
              element={Navigate}
              to={"/"}
              replace={true}
              loggedIn={loggedIn}
            />}
          />
          <Route path="/sign-up" element={<Register onRegister={handleRegistration}/>}/>
          <Route path="/sign-in" element={<Login onLogin={handleLogin}/>}/>
        </Routes>
        <Footer />
        <CurrentButtonTextContext.Provider value={buttonText[currentButtonText]}>
          <EditAvatarPopup name="editAvatar" title="Обновить аватар" buttonText="Сохранить"
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <EditProfilePopup name="editProfile" title="Редактировать профиль" buttonText="Сохранить"
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup name="addPlace" title="Новое место" buttonText="Сохранить"
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />
          <ConfirmDeletePopup name="deleteConfirm" title="Вы уверены?" buttonText="Да"
            onSubmit={handleCardDelete}
            isOpen={selectedCard}
            onClose={closeAllPopups}
          />
        </CurrentButtonTextContext.Provider>
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        <InfoTooltip info={infoTooltip} isOpen={isInfoTooltipOpen} onClose={closeAllPopups}/>
      </CurrentUserContext.Provider>
  );
}

export default App;

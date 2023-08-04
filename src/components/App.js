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
import ImagePopup from "./ImagePopup";



function App() {
  const navigate = useNavigate();

  const [isEditAvatarPopupOpen,setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);

  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [isSuccessInfoTooltipStatus, setIsSuccessInfoTooltipStatus] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);

  const [isProfilePopupLoading, setIsProfilePopupLoading] = useState(false);
  const [isAvatarPopupLoading, setIsAvatarPopupLoading] = useState(false);
  const [isAddPlacePopupLoading, setIsAddPlacePopupLoading] = useState(false);
  const [isConfirmPopupLoading, setIsConfirmPopupLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState(loadingUser);

  useEffect(() => {
    checkToken();
  }, [])

  useEffect(() => {
    if (loggedIn) {
      Promise.all([ api.getUser(), api.getInitialCards() ])
      .then(([ userData, cardsData ]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => {
        console.error(err);
      })
    }
  }, [loggedIn])

  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          navigate("/", {replace: true})
          setEmail(res.data.email);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  }

  function handleRegistration({password, email}) {
    auth.register(password, email)
      .then((res) => {
        setIsSuccessInfoTooltipStatus(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        setIsSuccessInfoTooltipStatus(false);
        console.error(err);
      })
      .finally((res) => setInfoTooltipOpen(true));
  }

  function handleLogin({password, email}) {
    auth.authorize(password, email)
      .then((data) => {

        setLoggedIn(true);
        navigate("/", { replace: true });
        setEmail(email);
        localStorage.setItem('jwt', data.token);

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

  function handleCardImageClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  function handleCardDeleteClick(card) {
    setSelectedCard(card);
    setIsConfirmPopupOpen(true);
  };

  function handleUpdateUser({ name, about }) {
    setIsProfilePopupLoading(true);
    api.patchUser({ name, about })
    .then((userData) => {
      setCurrentUser(userData);
      closeAllPopups();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally((res) => setIsProfilePopupLoading(false));
  };

  function handleUpdateAvatar({ avatar }) {
    setIsAvatarPopupLoading(true);
    api.patchUserAvatar({ avatar })
    .then((userData) => {
      setCurrentUser(userData);
      closeAllPopups();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally((res) => setIsAvatarPopupLoading(false));
  };

  function handleAddPlace({ name, link }) {
    setIsAddPlacePopupLoading(true);
    api.sendCard({ name, link })
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally((res) => setIsAddPlacePopupLoading(false));
  };

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsImagePopupOpen(false);
    setInfoTooltipOpen(false);
    setIsConfirmPopupOpen(false);
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
    const renderCardsWithoutCard = () => {
      setCards((state) => state.filter(
        (c) => c._id !== selectedCard._id
      ));
    }
    setIsConfirmPopupLoading(true);
    api.deleteCard(selectedCard._id)
    .then((res) => {
      renderCardsWithoutCard();
      closeAllPopups();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally((res) => setIsConfirmPopupLoading(false));
  }

  return (
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={<Header pathTo={"/sign-in"} linkText={"Выйти"} onSignOut={handleLogout} email={email}/>}/>
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
              onCardClick={handleCardImageClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDeleteClick}
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
        <EditAvatarPopup name="editAvatar" title="Обновить аватар" buttonText="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          isLoading={isAvatarPopupLoading}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup name="editProfile" title="Редактировать профиль" buttonText="Сохранить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          isLoading={isProfilePopupLoading}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup name="addPlace" title="Новое место" buttonText="Сохранить"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          isLoading={isAddPlacePopupLoading}
          onAddPlace={handleAddPlace}
        />
        <ConfirmDeletePopup name="deleteConfirm" title="Вы уверены?" buttonText="Да"
          onSubmit={handleCardDelete}
          isOpen={isConfirmPopupOpen}
          isLoading={isConfirmPopupLoading}
          onClose={closeAllPopups}
        />
        <ImagePopup isOpen={isImagePopupOpen} card={selectedCard} onClose={closeAllPopups}/>
        <InfoTooltip info={isSuccessInfoTooltipStatus} isOpen={isInfoTooltipOpen} onClose={closeAllPopups}/>
      </CurrentUserContext.Provider>
  );
}

export default App;

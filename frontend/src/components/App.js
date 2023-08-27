import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import Header from "./Header";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { autorisation, autentification, checkUser } from "../utils/auth";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [deleteCard, setDeleteCard] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [email, setEmail] = useState("");
  const [stateIsLogin, setIsStateLogin] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) {
      setIsLoading(true);
      api
        .getAppInfo(localStorage.jwt)
        .then(([dataCard, dataUser]) => {
          setCurrentUser(dataUser);
          setCards(dataCard);
        })
        .finally(() => setIsLoading(false))
        .catch((err) => console.log("Ошибка получения данных", err));
    }
  }, [isLogged]);

  useEffect(() => {
    if (localStorage.jwt)
      checkUser(localStorage.jwt)
        .then((res) => {
          setEmail(res.email);
          setIsLogged(true);
          navigate("/");
        })
        .catch((err) => console.log("Ошибка получения данных", err));
  }, [navigate]);

  function handleRegistration(email, pass) {
    setIsSubmit(true);
    autentification(email, pass)
      .then(() => {
        setIsLogged(true);
        setIsStateLogin("ok");
        navigate("/sign-in");
      })
      .finally(() => setIsSubmit(false))
      .catch((err) => {
        setIsStateLogin("error");
        console.log("Ошибка регистрации", err);
      });
  }

  function handleLogin(email, pass) {
    setIsSubmit(true);
    autorisation(email, pass)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLogged(true);
        navigate("/");
      })
      .finally(() => setIsSubmit(false))
      .catch((err) => {
        setIsStateLogin("error");
        console.log("Ошибка авторизации", err);
      });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard({});
  }

  function handleCloseInfoTooltip() {
    setIsStateLogin("");
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike({ card }) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked, localStorage.jwt)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log("Ошибка изменения лайка", err));
  }

  function handleDeletePopupOpen(id) {
    setDeleteCard(id);
    setIsDeleteCardPopupOpen(true);
  }

  function handleDeleteCard(e) {
    e.preventDefault();
    setIsSubmit(true);
    api
      .deleteCardItem(deleteCard, localStorage.jwt)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== deleteCard));
        closeAllPopups();
      })
      .finally(() => setIsSubmit(false))
      .catch((err) => console.log("Ошибка удаления карточки", err));
  }

  function handleUpdateUser(userData) {
    setIsSubmit(true);
    api
      .setUserInfo(userData, localStorage.jwt)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .finally(() => setIsSubmit(false))
      .catch((err) =>
        console.log("Ошибка обновления данных пользователя", err)
      );
  }

  function handleUpdateAvatar(userData, resetInputs) {
    setIsSubmit(true);
    api
      .setUserAvatar(userData, localStorage.jwt)
      .then((res) => {
        setCurrentUser(res);
        resetInputs();
      })
      .finally(() => setIsSubmit(false))
      .catch((err) =>
        console.log("Ошибка обновления аватара пользователя", err)
      );
  }

  function handleAddPlaceSubmit(dataCard, resetInputs) {
    setIsSubmit(true);
    api
      .addNewCard(dataCard, localStorage.jwt)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        resetInputs();
      })
      .finally(() => setIsSubmit(false))
      .catch((err) => console.log("Ошибка добавления новой карточки", err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="wrapper">
          <Header name={"/"} email={email} />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  handleEditAvatarClick={() => {
                    setIsEditAvatarPopupOpen(true);
                  }}
                  handleEditProfileClick={() => {
                    setIsEditProfilePopupOpen(true);
                  }}
                  handleAddPlaceClick={() => {
                    setIsAddPlacePopupOpen(true);
                  }}
                  handleDeleteCardClick={() => {
                    setIsDeleteCardPopupOpen(true);
                  }}
                  onCardClick={handleCardClick}
                  handleDeleteClick={handleDeletePopupOpen}
                  cards={cards}
                  onCardLike={handleCardLike}
                  isLoading={isLoading}
                  isLoggedIn={isLogged}
                  email={email}
                />
              }
            />
            <Route
              path="/sign-up"
              element={<Register onRegistration={handleRegistration} />}
            />
            <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isSubmit={isSubmit}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isSubmit={isSubmit}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isSubmit={isSubmit}
          />

          <PopupWithForm
            title="Вы уверены?"
            name="delete-card"
            formName="deleteCard"
            buttonText={"Да"}
            isOpen={isDeleteCardPopupOpen}
            onSubmit={handleDeleteCard}
            onClose={closeAllPopups}
            isSubmit={isSubmit}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip state={stateIsLogin} onClose={handleCloseInfoTooltip} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

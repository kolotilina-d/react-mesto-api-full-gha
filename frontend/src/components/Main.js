import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

function Main({
  handleEditAvatarClick,
  handleEditProfileClick,
  handleAddPlaceClick,
  onCardClick,
  handleDeleteClick,
  cards,
  onCardLike,
  isLoading,
  email,
}) {
  const currentUser = useContext(CurrentUserContext);
  function onLogOut() {
    localStorage.removeItem("jwt");
  }

  return (
    <main>
      <section className="profile">
        <div className="profile__logout">
          <div className="profile__logout__icon" />
          <div className="profile__logout__container">
          <span className="profile__logout__email">{email}</span>
          <Link
            to="sign-in"
            onClick={onLogOut}
            className="profile__logout__link"
          >
            Выйти
          </Link>
          </div>
        </div>
        <button
          type="button"
          className="profile__avatar-button"
          onClick={handleEditAvatarClick}
        >
          <img
            className="profile__photo"
            src={currentUser.avatar}
            alt="аватар пользователя"
          />
        </button>
        <div className="profile__info">
          <h2 className="profile__name">{currentUser.name}</h2>
          <p className="profile__profession">{currentUser.about}</p>
          <button
            type="button"
            className="profile__edit-button"
            onClick={handleEditProfileClick}
          ></button>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={handleAddPlaceClick}
        />
      </section>
      <div className="gallery">
        <ul className="gallery__elements">
          {isLoading ? (
            <Spinner />
          ) : (
            cards.map((item) => (
              <Card
                key={item._id}
                card={item}
                onCardClick={onCardClick}
                handleDeleteClick={handleDeleteClick}
                currentUser={currentUser}
                onCardLike={onCardLike}
              />
            ))
          )}
        </ul>
      </div>
    </main>
  );
}

export default Main;

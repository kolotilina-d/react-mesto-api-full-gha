import { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isSubmit }) {
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  function handleNameChange(e) {
    setUserName(e.target.value);
  }

  function handleAboutChange(e) {
    setDescription(e.target.value);
  }

  useEffect(() => {
    setUserName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name: userName, about: description });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="info"
      formName="profile"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
      isSubmit={isSubmit}
    >
      <input
        className="popup__input"
        type="text"
        id="username"
        name="username"
        placeholder="Имя"
        required
        minLength={2}
        maxLength={40}
        onChange={handleNameChange}
        value={userName || ""}
      />
      <span className="popup__error" id="username-error" />
      <input
        className="popup__input"
        type="text"
        id="profession"
        name="profession"
        placeholder="Вид деятельности"
        required
        minLength={2}
        maxLength={200}
        onChange={handleAboutChange}
        value={description || ""}
      />
      <span className="popup__error" id="profession-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;

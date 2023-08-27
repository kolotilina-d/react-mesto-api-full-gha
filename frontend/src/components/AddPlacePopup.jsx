import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isSubmit }) {
  const [place, setPlace] = useState("");
  const [link, setLink] = useState("");

  function handlePlaceChange(e) {
    setPlace(e.target.value);
  }
  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ place: place, link: link }, resetInputs);
  }

  function resetInputs() {
    onClose();
    setPlace("");
    setLink("");
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      formName="addCard"
      isOpen={isOpen}
      onClose={resetInputs}
      buttonText={"Создать"}
      onSubmit={handleSubmit}
      isSubmit={isSubmit}
    >
      <input
        type="text"
        className="popup__input"
        id="place"
        name="place"
        placeholder="Название"
        required
        minLength={2}
        maxLength={30}
        onChange={handlePlaceChange}
        value={place || ""}
      />
      <span className="popup__error" id="place-error" />
      <input
        type="url"
        className="popup__input"
        id="link"
        name="link"
        placeholder="Ссылка на картинку"
        required
        onChange={handleLinkChange}
        value={link || ""}
      />
      <span className="popup__error" id="link-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;

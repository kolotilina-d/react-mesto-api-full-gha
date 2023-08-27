import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ onClose, isOpen, onUpdateAvatar, isSubmit }) {
  const input = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(
      {
        avatar: input.current.value,
      },
      resetInputs
    );
  }

  function resetInputs() {
    onClose();
    input.current.value = "";
  }

  return (
    <PopupWithForm
      onClose={resetInputs}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      title="Обновить аватар"
      name="avatar"
      formName="addAvatar"
      buttonText={"Сохранить"}
      isSubmit={isSubmit}
    >
      <input
        type="url"
        className="popup__input"
        id="avatar"
        name="avatar"
        placeholder="Ссылка на картинку"
        required
        ref={input}
      />
      <span className="popup__error" id="avatar-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

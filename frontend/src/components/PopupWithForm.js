import React, { useEffect } from "react";

function PopupWithForm({
  name,
  title,
  formName,
  children,
  isOpen,
  onClose,
  buttonText,
  onSubmit,
  isSubmit,
}) {
  useEffect(() => {
    if (!isOpen) return;

    function closeByEsc(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", closeByEsc);
    return () => document.removeEventListener("keydown", closeByEsc);
  }, [isOpen, onClose]);

  return (
    <section
      className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}
      onClick={onClose}
    >
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        <form
          name={formName}
          className={`popup__info popup__info_${formName}`}
          onSubmit={onSubmit}
        >
          <h2
            className={`popup__title ${
              name === "delete-card" ? "popup__title_delete-card" : ""
            }`}
          >
            {title}
          </h2>
          {children}
          <input
            className={`popup__submit ${
              name === "delete-card" ? "popup__submit_delete-card" : ""
            }`}
            type="submit"
            value={isSubmit ? "Сохраняем..." : buttonText}
          />
        </form>
        <button type="button" className={`popup__close`} onClick={onClose} />
      </div>
    </section>
  );
}

export default PopupWithForm;

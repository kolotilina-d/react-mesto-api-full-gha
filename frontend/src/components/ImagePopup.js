import React from "react";
import { useEffect } from "react";

function ImagePopup({ card, onClose }) {
  useEffect(() => {
    if (card.link === undefined) return;

    function closeByEsc(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", closeByEsc);
    return () => document.removeEventListener("keydown", closeByEsc);
  }, [card, onClose]);

  return (
    <section
      className={`popup popup_photo ${
        card.link !== undefined ? "popup_opened" : ""
      }`}
      onClick={onClose}
    >
      <div className="popup__container popup__container_photo">
        <img
          className="popup__img"
          src={card.link}
          alt={card.name}
          onClick={(e) => e.stopPropagation()}
        />
        <figcaption className="popup__caption">{card.name}</figcaption>
        <button
          type="button"
          className="popup__close popup__close_photo"
          onClick={onClose}
        />
      </div>
    </section>
  );
}

export default ImagePopup;

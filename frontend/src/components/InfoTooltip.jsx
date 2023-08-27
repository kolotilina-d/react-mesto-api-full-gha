import React, { useEffect } from "react";

export default function InfoTooltip({ state, onClose }) {
  useEffect(() => {
    if (state === "") return;

    function closeByEsc(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", closeByEsc);
    return () => document.removeEventListener("keydown", closeByEsc);
  }, [state, onClose]);

  return (
    <section
      className={`popup popup_infotooltip ${
        state !== "" ? "popup_opened" : ""
      }`}
      onClick={onClose}
    >
      <div
        className="popup__container popup__container_infotooltip"
        onClick={(e) => e.stopPropagation()}
      >
        {state === "ok" ? (
          <div className="popup__img_infotooltip_ok" />
        ) : (
          <div className="popup__img_infotooltip_error" />
        )}
        <figcaption className="popup__caption_infotooltip">
          {state === "ok"
            ? "Вы успешно зарегистрировались"
            : "Что-то пошло не так! Попробуйте еще раз"}
        </figcaption>
        <button type="button" className="popup__close" onClick={onClose} />
      </div>
    </section>
  );
}

import React from "react";

function Card({
  card,
  handleDeleteClick,
  onCardClick,
  currentUser,
  onCardLike,
}) {
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `gallery__like ${
    isLiked && "gallery__like_liked"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike({ card });
  }

  return (
    <li className="gallery__element">
      <img
        src={card.link}
        alt={card.name}
        className="gallery__photo"
        onClick={() => handleClick()}
      />
      <div className="gallery__underscribe">
        <p className="gallery__place">{card.name}</p>
        <div className="gallery__card-reaction">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={() => handleLikeClick()}
          />
          <span className="gallery__like-counter">{card.likes.length}</span>
        </div>
        {isOwn && (
          <button
            type="button"
            className="gallery__delete"
            onClick={() => handleDeleteClick(card._id)}
          />
        )}
      </div>
    </li>
  );
}

export default Card;

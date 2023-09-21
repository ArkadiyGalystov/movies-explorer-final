import React from "react"
import btnRemoveMovie from "../../../images/removemovie.svg"
import { converterDurationMovie } from "../../../utils/functionHelpers.js"
import "./MoviesCard.css"

function MoviesCard({
  card,
  saved,
  savedMovies,
  isSavedFilms,
  getLikeMovie,
  onDeleteCard,
}) {
  function onCardClick() {
    if (saved) {
      onDeleteCard(savedMovies.filter((m) => m.movieId === card.id)[0])
    } else {
      getLikeMovie(card)
    }
  }

  function onDelete() {
    onDeleteCard(card)
  }

  const movieLikeBtnClassName = `${
    saved ? "card__like-button card__like-button_active" : "card__like-button"
  }`

  return (
    <>
      <li className="card" key={card.id}>
        <div className="card__wrapper">
          <a href={card.trailerLink} target="_blank" rel="noreferrer">
            <img
              className="card__image"
              alt={card.nameRU}
              src={
                isSavedFilms
                  ? card.image
                  : `https://api.nomoreparties.co/${card.image.url}`
              }
            />
          </a>
          {isSavedFilms ? (
            <button
              type="button"
              className="card__like-remove"
              onClick={onDelete}
            >
              <img
                className="card__like-remove"
                src={btnRemoveMovie}
                alt="кнопка закрытия"
              />
            </button>
          ) : (
            <button
              className={movieLikeBtnClassName}
              onClick={onCardClick}
              type="button"
            ></button>
          )}
          <div className="card__title-block">
            <h2 className="card__title">{card.nameRU}</h2>
            <span className="card__time">
              {converterDurationMovie(card.duration)}
            </span>
          </div>
        </div>
      </li>
    </>
  )
}

export default MoviesCard

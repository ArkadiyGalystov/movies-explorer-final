import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import MoviesCard from "../MoviesCard/MoviesCard.js"
import SearchError from "../../SearchError/SearchError.js"
import {
  DESKTOP_COUNTER_MOVIES,
  TABLET_COUNTER_MOVIES,
  MOBILE_COUNTER_MOVIES,
} from "../../../utils/constants.js"
import Preloader from "../Preloader/Preloader.js"
import "./MoviesCardList.css"

function MoviesCardList({
  cards,
  isLoading,
  isSavedFilms,
  savedMovies,
  isReqError,
  isNotFound,
  getLikeMovie,
  onDeleteCard,
}) {
  const { pathname } = useLocation()
  const [shownMovies, setShownMovies] = useState(0)

  function showMoviesDisplay() {
    const display = window.innerWidth
    if (display > 1023) {
      setShownMovies(12)
    } else if (display > 767) {
      setShownMovies(8)
    } else {
      setShownMovies(5)
    }
  }

  useEffect(() => {
    showMoviesDisplay()
  }, [cards])

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("resize", showMoviesDisplay)
    }, 500)
  })

  function getShowCountMovies() {
    const display = window.innerWidth
    if (display > 1023) {
      setShownMovies(shownMovies + DESKTOP_COUNTER_MOVIES)
    } else if (display > 767) {
      setShownMovies(shownMovies + TABLET_COUNTER_MOVIES)
    } else {
      setShownMovies(shownMovies + MOBILE_COUNTER_MOVIES)
    }
  }

  function getSavedMovieFromList(savedMovies, card) {
    return savedMovies.find((savedMovie) => savedMovie.movieId === card.id)
  }

  return (
    <section className="cards">
      {isLoading && <Preloader />}
      {isNotFound && !isLoading && (
        <SearchError errorText={"Ничего не найдено"} />
      )}
      {isReqError && !isLoading && (
        <SearchError
          errorText={
            "Во время поискового запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          }
        />
      )}
      {!isLoading && !isReqError && !isNotFound && (
        <>
          {pathname === "/saved-movies" ? (
            <>
              <ul className="cards__list">
                {cards.map((card) => (
                  <MoviesCard
                    key={isSavedFilms ? card._id : card.id}
                    card={card}
                    cards={cards}
                    saved={getSavedMovieFromList(savedMovies, card)}
                    getLikeMovie={getLikeMovie}
                    onDeleteCard={onDeleteCard}
                    isSavedFilms={isSavedFilms}
                    savedMovies={savedMovies}
                  />
                ))}
              </ul>
            </>
          ) : (
            <>
              <ul className="cards__list">
                {cards.slice(0, shownMovies).map((card) => (
                  <MoviesCard
                    key={isSavedFilms ? card._id : card.id}
                    saved={getSavedMovieFromList(savedMovies, card)}
                    cards={cards}
                    card={card}
                    getLikeMovie={getLikeMovie}
                    onDeleteCard={onDeleteCard}
                    isSavedFilms={isSavedFilms}
                    savedMovies={savedMovies}
                  />
                ))}
              </ul>
              <div className="cards__button-container">
                {cards.length > shownMovies ? (
                  <button className="cards__button" onClick={getShowCountMovies}>Ещё</button>
                ) : (
                  ""
                )}
              </div>
            </>
          )}
        </>
      )}
    </section>
  )
}

export default MoviesCardList

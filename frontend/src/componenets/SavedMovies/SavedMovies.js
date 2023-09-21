import React, { useState, useEffect } from "react"
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList.js"
import Header from "../Header/Header.js"
import Footer from "../Footer/Footer.js"
import {
  filterMovies,
  counterDurationMovie,
} from "../../utils/functionHelpers.js"
import SearchForm from "../SearchForm/SearchForm.js"

function SavedMovies({ loggedIn, onDeleteCard, savedMovies }) {
  const [isShortMovies, setisShortMovies] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredMovies, setFilteredMovies] = useState(savedMovies)
  const [isNotFound, setIsNotFound] = useState(false)

  useEffect(() => {
    if (filteredMovies.length === 0) {
      setIsNotFound(true)
    } else {
      setIsNotFound(false)
    }
  }, [filteredMovies])

  useEffect(() => {
    const moviesFilmList = filterMovies(savedMovies, searchQuery)
    setFilteredMovies(
      isShortMovies ? counterDurationMovie(moviesFilmList) : moviesFilmList
    )
  }, [savedMovies, isShortMovies, searchQuery])

  function searchMovies(query) {
    setSearchQuery(query)
  }

  function shortMoviesToggle() {
    setisShortMovies(!isShortMovies)
  }

  return (
    <section className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        onFilterMovies={shortMoviesToggle}
        searchMovies={searchMovies}
      />
      <MoviesCardList
        cards={filteredMovies}
        isSavedFilms={true}
        savedMovies={savedMovies}
        onDeleteCard={onDeleteCard}
        isNotFound={isNotFound}
      />
      <Footer />
    </section>
  )
}

export default SavedMovies

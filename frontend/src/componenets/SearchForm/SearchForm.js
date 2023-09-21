import React, { useState, useEffect } from "react"
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js"
import { useLocation } from "react-router-dom"
import "./SearchForm.css"

function SearchForm({ getSearchMovies, onFilterMovies, isShortMovies }) {
  const [isQueryError, setIsQueryError] = useState(false)
  const location = useLocation()
  const [query, setQuery] = useState("")

  useEffect(() => {
    if (
      location.pathname === "/movies" &&
      localStorage.getItem("movieSearch")
    ) {
      const localQuery = localStorage.getItem("movieSearch")
      setQuery(localQuery)
    }
  }, [location])

  function editProfileInfo(e) {
    e.preventDefault()
    if (query.trim().length === 0) {
      setIsQueryError(true)
    } else {
      setIsQueryError(false)
      getSearchMovies(query)
    }
  }

  function inputChange(e) {
    setQuery(e.target.value)
  }

  return (
    <section className="search">
      <form className="search__form" id="form" onSubmit={editProfileInfo}>
        <input className="search__form-input" name="query" placeholder="Фильм" type="text" value={query || ""}
          onChange={inputChange} required></input>
        <button className="search__form-button" type="submit"></button>
      </form>
      <FilterCheckbox
        onFilterMovies={onFilterMovies}
        isShortMovies={isShortMovies}
      />
      {isQueryError && (
        <span className="search__form-error">Нужно ввести ключевое слово</span>
      )}
      <div className="search__border-bottom"></div>
    </section>
  )
}

export default SearchForm

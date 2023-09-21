import React, { useState, useEffect } from "react"
import { Route, Routes, useNavigate, useLocation, Navigate } from "react-router-dom"

import "./App.css"

import Header from "../Header/Header"
import Main from "../Main/Main"
import Footer from "../Footer/Footer"

import Register from "../Register/Register"
import Login from "../Login/Login"
import Profile from "../Profile/Profile"

import Movies from "../Movies/Movies"
import SavedMovies from "../SavedMovies/SavedMovies"

import PageNotFound from "../PageNotFound/PageNotFound"
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"
import CurrentUserContext from "../../contexts/CurrentUserContext"
import * as api from "../../utils/MainApi"
import InfoTooltip from "../InfoToolTip/InfoToolTip"
import InfoTooltipEditProfile from "../InfoTooltipEditProfile/InfoTooltipEditProfile"

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [savedMovies, setSavedMovies] = useState([])
  const [isUpdate, setIsUpdate] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] = useState(false)
  const [
    isInfoTooltipEditProfilePopupOpen,
    setInfoTooltipEditProfilePopupOpen,
  ] = useState(false)
  const isOpen = isInfoToolTipPopupOpen || isInfoTooltipEditProfilePopupOpen

  function closeAllPopups() {
    setInfoToolTipPopupOpen(false)
    setInfoTooltipEditProfilePopupOpen(false)
  }

  useEffect(() => {
    function closeByEscapePopups(evt) {
      if (evt.key === "Escape") {
        closeAllPopups()
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscapePopups)
      return () => {
        document.removeEventListener("keydown", closeByEscapePopups)
      }
    }
  }, [isOpen])

  function closeByOverlayPopups(event) {
    if (event.target === event.currentTarget) {
      closeAllPopups()
    }
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt")
    if (jwt) {
      api
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true)
            localStorage.removeItem("allMovies")
          }
          navigate(path)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getUserInfo()
        .then((profileInfo) => {
          setCurrentUser(profileInfo)
        })
        .catch((error) => {
          console.log(error)
        })
      api
        .getMovies()
        .then((cardsSavedFilms) => {
          setSavedMovies(cardsSavedFilms.reverse())
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [isLoggedIn])

  // регистрация пользователя
  function registrationUser({ name, email, password }) {
    api
      .register(name, email, password)
      .then(() => {
        loginUser({ email, password })
        setInfoToolTipPopupOpen(true)
        setIsSuccess(true)
      })
      .catch((error) => {
        setInfoToolTipPopupOpen(true)
        setIsSuccess(false)
        console.log(error)
      })
  }

  // авторизация пользователя
  function loginUser({ email, password }) {
    setIsLoading(true)
    api
      .authorize(email, password)
      .then((res) => {
        if (res) {
          setIsSuccess(true)
          setInfoToolTipPopupOpen(true)
          localStorage.setItem("jwt", res.token)
          navigate("/movies", { replace: true })
          setIsLoggedIn(true)
        }
      })
      .catch((error) => {
        setInfoToolTipPopupOpen(true)
        setIsSuccess(false)
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  // редактирование профиля
  function updateProfileInfo(userInfo) {
    setIsLoading(true)
    api
      .editUserInfo(userInfo)
      .then((data) => {
        setInfoTooltipEditProfilePopupOpen(true)
        setIsUpdate(true)
        setCurrentUser(data)
      })
      .catch((error) => {
        setInfoTooltipEditProfilePopupOpen(true)
        setIsUpdate(false)
        console.log(error)
        authorizationError(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  // отмечаем фильм
  function likeMovie(card) {
    api
      .addCard(card)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies])
      })
      .catch((error) => {
        setIsSuccess(false)
        console.log(error)
        authorizationError(error)
      })
  }

  // удаление фильма
  function deleteMovie(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setSavedMovies((state) => state.filter((item) => item._id !== card._id))
      })
      .catch((error) => {
        setIsSuccess(false)
        console.log(error)
        authorizationError(error)
      })
  }

  // чистка данных в локальном хранилище
  const exitSite = () => {
    setIsLoggedIn(false)
    localStorage.removeItem("jwt")
    localStorage.removeItem("allMovies")
    localStorage.removeItem("movies")
    localStorage.removeItem("shortMovies")
    localStorage.removeItem("movieSearch")
    localStorage.clear()
    navigate("/")
  }

  // ошибки авторизации
  function authorizationError(error) {
    if (error === "Error: 401") {
      exitSite()
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="root__wrapper">
          <Routes>
            <Route
              path={"/"}
              element={
                <>
                  <Header loggedIn={isLoggedIn} />
                  <Main />
                  <Footer />
                </>
              }
            />
            <Route
              path={"/signin"}
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Login isLoading={isLoading} onAuthorization={loginUser} />
                )
              }
            />
            <Route
              path={"/signup"}
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Register
                    isLoading={isLoading}
                    registrationUser={registrationUser}
                  />
                )
              }
            />
            <Route path={"404"} element={<PageNotFound />} />
            <Route
              path={"/movies"}
              element={
                <ProtectedRoute
                  path="/movies"
                  loggedIn={isLoggedIn}
                  component={Movies}
                  onDeleteCard={deleteMovie}
                  savedMovies={savedMovies}
                  likeMovie={likeMovie}
                />
              }
            />
            <Route
              path={"/saved-movies"}
              element={
                <ProtectedRoute
                  path="/saved-movies"
                  loggedIn={isLoggedIn}
                  component={SavedMovies}
                  savedMovies={savedMovies}
                  onDeleteCard={deleteMovie}
                />
              }
            />
            <Route
              path={"/profile"}
              element={
                <ProtectedRoute
                  path="/profile"
                  loggedIn={isLoggedIn}
                  isLoading={isLoading}
                  onUpdateUser={updateProfileInfo}
                  component={Profile}
                  signOut={exitSite}
                />
              }
            />
          </Routes>
          <InfoTooltip
            isOpen={isInfoToolTipPopupOpen}
            isSuccess={isSuccess}
            onCloseOverlay={closeByOverlayPopups}
            onClose={closeAllPopups}
          />
          <InfoTooltipEditProfile
            isOpen={isInfoTooltipEditProfilePopupOpen}
            isUpdate={isUpdate}
            onCloseOverlay={closeByOverlayPopups}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App

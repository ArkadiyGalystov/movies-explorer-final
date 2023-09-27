import React, { useState, useEffect } from "react"
import { Route, Routes, useNavigate, useLocation, Navigate } from "react-router-dom"
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js"
import CurrentUserContext from "../../contexts/CurrentUserContext.js"
import Header from "../Header/Header.js"
import Main from "../Main/Main.js"
import Movies from "../Movies/Movies.js"
import SavedMovies from "../SavedMovies/SavedMovies.js"
import Footer from "../Footer/Footer.js"
import Login from "../Login/Login.js"
import Register from "../Register/Register.js"
import "./App.css"
import * as api from "../../utils/MainApi.js"
import Profile from "../Profile/Profile.js"
import PageNotFound from "../PageNotFound/PageNotFound.js"
import InfoTooltip from "../InfoToolTip/InfoToolTip.js"
import InfoTooltipEditProfile from "../InfoTooltipEditProfile/InfoTooltipEditProfile.js"

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

  // Регистрация
  function getRegistrationUser({ name, email, password }) {
    api
      .register(name, email, password)
      .then(() => {
        getLoginUser({ email, password })
        setInfoToolTipPopupOpen(true)
        setIsSuccess(true)
      })
      .catch((error) => {
        setInfoToolTipPopupOpen(true)
        setIsSuccess(false)
        console.log(error)
      })
  }

  // Логин
  function getLoginUser({ email, password }) {
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

  // Редактирования данных
  function getUpdateProfileInfo(userInfo) {
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
        getAuthorizationError(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  // Лайк фильма
  function getLikeMovie(card) {
    api
      .addCard(card)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies])
      })
      .catch((error) => {
        setIsSuccess(false)
        console.log(error)
        getAuthorizationError(error)
      })
  }

  // Удаление фильма
  function getDeleteMovie(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setSavedMovies((state) => state.filter((item) => item._id !== card._id))
      })
      .catch((error) => {
        setIsSuccess(false)
        console.log(error)
        getAuthorizationError(error)
      })
  }

  // При выходе из приложения чистка данных в локальном хранилище
  const getExitSite = () => {
    setIsLoggedIn(false)
    localStorage.removeItem("jwt")
    localStorage.removeItem("allMovies")
    localStorage.removeItem("movies")
    localStorage.removeItem("shortMovies")
    localStorage.removeItem("movieSearch")
    localStorage.clear()
    navigate("/")
  }

  // Обработка ошибки авторизации
  function getAuthorizationError(error) {
    if (error === "Error: 401") {
      getExitSite()
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
                  <Login isLoading={isLoading} onAuthorization={getLoginUser} />
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
                    getRegistrationUser={getRegistrationUser}
                  />
                )
              }
            />
            <Route path={"*"} element={<PageNotFound />} />
            <Route
              path={"/movies"}
              element={
                <ProtectedRoute
                  path="/movies"
                  loggedIn={isLoggedIn}
                  component={Movies}
                  onDeleteCard={getDeleteMovie}
                  savedMovies={savedMovies}
                  getLikeMovie={getLikeMovie}
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
                  onDeleteCard={getDeleteMovie}
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
                  onUpdateUser={getUpdateProfileInfo}
                  component={Profile}
                  signOut={getExitSite}
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

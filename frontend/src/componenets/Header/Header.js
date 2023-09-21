import React from "react"
import { Link, NavLink } from "react-router-dom"
import mobileMenu from "../../images/burger-menu.svg"
import headerLogo from "../../images/logo.svg"
import Navigation from "../Navigation/Navigation.js"
import "./Header.css"

function Header({ loggedIn }) {
  const [isClicked, setIsClicked] = React.useState(false)

  function handleOpenMobileMenu() {
    setIsClicked(true)
  }

  function handleCloseMobileMenu() {
    setIsClicked(false)
  }

  const activeColorHeaderLink = ({ isActive }) =>
    isActive ? "header__button_active" : "header__button"

  return (
    <>
      {!loggedIn ? (
        <header className="header" id="header">
          <Link to="/" className="form__logo"><img src={headerLogo} alt="Лого" /></Link>
          <div className="header__links">
            <Link to="/signup" className="header__button">Регистрация</Link>
            <Link to="/signin" className="header__button header__button-green">Войти</Link>
          </div>
        </header>
      ) : (
        <header className="header header__color-dark">
          <Link to="/" className="form__logo"><img src={headerLogo} alt="Лого" /></Link>

          <div className="header__links header__links_films">
            <NavLink to="/movies" className={activeColorHeaderLink}>Фильмы</NavLink>
            <NavLink to="/saved-movies" className={activeColorHeaderLink}>Сохранённые фильмы</NavLink>
          </div>

          <div className="header__links">
            <Link to="/profile" className="header__account-btn">Аккаунт</Link>
            <button className="header__mobile-btn" onClick={handleOpenMobileMenu}><img src={mobileMenu} alt="гамбургер-меню" /></button>
          </div>

          {isClicked ? (
            <Navigation handleCloseMobileMenu={handleCloseMobileMenu} />
          ) : (
            ""
          )}
        </header>
      )}
    </>
  )
}

export default Header

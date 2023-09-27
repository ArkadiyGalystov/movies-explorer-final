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
          <Link className="form__logo" to="/" > <img src={headerLogo} alt="Логотип" /></Link>
          <div className="header__links"> <Link className="header__button" to="/signup">Регистрация</Link>
            <Link className="header__button header__button-green" to="/signin">Войти</Link>
          </div>
        </header>
      ) : (
        <header className="header header__color-dark">
          <Link className="form__logo" to="/"> <img src={headerLogo} alt="Логотип" /></Link>
          <div className="header__links header__links_films"> <NavLink className={activeColorHeaderLink} to="/movies">Фильмы</NavLink>
            <NavLink className={activeColorHeaderLink} to="/saved-movies">Сохранённые фильмы</NavLink>
          </div>

          <div className="header__links">
            <Link className="header__account-btn" to="/profile">Аккаунт</Link>
            <button className="header__mobile-btn" onClick={handleOpenMobileMenu}> <img src={mobileMenu} alt="Бургер меню" /></button>
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

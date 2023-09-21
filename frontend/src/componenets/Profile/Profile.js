import React, { useEffect, useContext, useState } from "react"
import { Link } from "react-router-dom"
import Header from "../Header/Header.js"
import { EMAIL_REGEX } from "../../utils/constants.js"
import "./Profile.css"
import useForm from "../../hooks/useForm.js"
import CurrentUserContext from "../../contexts/CurrentUserContext.js"

function Profile({ loggedIn, isLoading, onUpdateUser, signOut }) {
  const currentUser = useContext(CurrentUserContext)

  const { enteredValues, errors, handleChangeInput, isFormValid, resetForm } =
    useForm()

  const [isLastValues, setIsLastValues] = useState(false)

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser)
    }
  }, [currentUser, resetForm])

  function editProfileInfo(evt) {
    evt.preventDefault()
    onUpdateUser({
      name: enteredValues.name,
      email: enteredValues.email,
    })
  }

  useEffect(() => {
    if (
      currentUser.name === enteredValues.name &&
      currentUser.email === enteredValues.email
    ) {
      setIsLastValues(true)
    } else {
      setIsLastValues(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enteredValues])

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="profile">
        <h3 className="profile__title">Привет, {currentUser.name}!</h3>
        <form
          id="form"
          className="profile__form"
          onSubmit={editProfileInfo}
          noValidate
        >
          <label className="profile__label">
            Имя
            <input
              name="name"
              className="profile__input"
              type="text"
              minLength="2"
              maxLength="40"
              onChange={handleChangeInput}
              value={enteredValues.name || ""}
              placeholder="имя"
              required
            />
            <span className="profile__input-error">{errors.name}</span>
          </label>

          <div className="profile__border"></div>
          <label className="profile__label">
            E-mail
            <input
              name="email"
              className="profile__input"
              type="email"
              onChange={handleChangeInput}
              pattern={EMAIL_REGEX}
              value={enteredValues.email || ""}
              placeholder="почта"
              required
            />
            <span className="profile__input-error">{errors.email}</span>
          </label>

          <button
            type="submit"
            disabled={!isFormValid ? true : false}
            className={
              !isFormValid || isLoading || isLastValues
                ? "profile__button-save form__button-save_inactive"
                : "profile__button-save"
            }>Редактировать</button>

          <Link to="/profile" className="profile__exit-link" onClick={signOut}>
            <button type="button" className="profile__exit-button">Выйти из аккаунта</button>
          </Link>
        </form>
      </section>
    </>
  )
}

export default Profile

import React from "react"
import "../Form/Form.css"
import Form from "../Form/Form"
import { EMAIL_REGEX } from "../../utils/constants.js"
import useForm from "../../hooks/useForm.js"

function Register({ isLoading, registrationUser }) {
  const { enteredValues, errors, handleChangeInput, isFormValid } = useForm()

  function editProfileInfo(evt) {
    evt.preventDefault()
    registrationUser({
      name: enteredValues.name,
      email: enteredValues.email,
      password: enteredValues.password,
    })
  }

  return (
    <Form
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      registrationPrompt="Уже зарегистрированы?"
      linkText=" Войти"
      link="/signin"
      onSubmit={editProfileInfo}
      isLoading={isLoading}
      isDisabledButton={!isFormValid}
    >
      <label className="form__label">Имя
        <input className="form__input" name="name" type="text" minLength="2" maxLength="40" value={enteredValues.name || ""}
          onChange={handleChangeInput} placeholder="Ваше имя" required />
        <span className="form__input-error">{errors.name}</span>
      </label>

      <label className="form__label">E-mail
        <input className="form__input" name="email" type="email" value={enteredValues.email || ""}
          onChange={handleChangeInput} pattern={EMAIL_REGEX} placeholder="Ваш e-mail" required />
        <span className="form__input-error">{errors.email}</span>
      </label>

      <label className="form__label">Пароль
        <input className="form__input form__input-data_error" name="password" type="password" value={enteredValues.password || ""}
          onChange={handleChangeInput} placeholder="Ваш пароль" minLength="4" maxLength="10" required />
        <span className="form__input-error">{errors.password}</span>
      </label>
    </Form>
  )
}

export default Register

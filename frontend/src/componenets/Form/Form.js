import React from "react"
import logo from "../../images/logo.svg"
import { Link } from "react-router-dom"
import "./Form.css"

function Form({
  title,
  children,
  linkText,
  buttonText,
  isLoading,
  link,
  onSubmit,
  registrationPrompt,
  isDisabledButton,
}) {
  return (
    <div className="form__block">
      <Link to="/" className="logo"> <img src={logo} alt="логотип" /></Link>
      <h3 className="form__title">{title}</h3>
      <form onSubmit={onSubmit} id="form" className="form" noValidate>
        {children}

        <button
          type="submit"
          className={
            isDisabledButton || isLoading
              ? "form__button-save form__button-save_inactive"
              : "form__button-save"
          }
          disabled={isDisabledButton ? true : false}
        >
          {buttonText}
        </button>
      </form>
      <p className="form__text"> {registrationPrompt} <Link to={link} className="form__link">{linkText}</Link></p>
    </div>
  )
}

export default Form

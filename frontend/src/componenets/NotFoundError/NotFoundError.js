import React from "react"
import "./NotFoundError.css"
import { useNavigate } from "react-router-dom"
import { Link } from "react-scroll"

function NotFoundError() {
  const navigate = useNavigate()
  function navigateBack() {
    navigate(-1)
  }

  return (
    <main>
      <section className="notfound-error">
        <h1 className="notfound-error__title">404</h1>
        <p className="notfound-error__subtitle">Страница не найдена</p>
        <Link onClick={navigateBack} className="notfound-error__link">Назад</Link>
      </section>
    </main>
  )
}

export default NotFoundError

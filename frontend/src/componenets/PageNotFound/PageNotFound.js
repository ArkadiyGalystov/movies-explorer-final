import React from "react"
import "./PageNotFound.css"
import { Link, useNavigate } from "react-router-dom"

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <main>
      <section className="notfound-error">
        <h1 className="notfound-error__title">404</h1>
        <p className="notfound-error__subtitle">Страница не найдена</p>
        <Link className="notfound-error__link" onClick={() => navigate(-1)}>Назад</Link>
      </section>
    </main>
  )
}

export default PageNotFound

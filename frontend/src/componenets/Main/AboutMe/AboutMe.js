import React from "react"
import "./AboutMe.css"
import studentPic from "../../../images/img__student.jpg"

function AboutMe() {
  return (
    <section className="about-me" id="aboutme">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__profile">
        <div className="about-me__content">
          <h3 className="about-me__name">Аркадий</h3>
          <p className="about-me__job">Фронтенд-разработчик, 30 года</p>
          <p className="about-me__text">
            текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст
            текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст
            текст текст текст текст текст текст текст текст текст текст
          </p>
          <a
            className="about-me__link"
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img className="about-me__pic" src={studentPic} alt="Аватар" />
      </div>
    </section>
  )
}

export default AboutMe

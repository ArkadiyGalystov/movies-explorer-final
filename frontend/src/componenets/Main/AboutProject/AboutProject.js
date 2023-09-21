import React from "react"
import "./AboutProject.css"

function AboutProject() {
  return (
    <section className="about-project" id="aboutproject">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__container">

        <div className="about-project__content">
          <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>

        <div className="about-project__content">
          <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>

      </div>
      <div className="about-project__timeline">
        <div className="about-project__week-one">
          <h4 className="about-project__timeline-title about-project__timeline-title_backend">1 неделя</h4>
          <p className="about-project__timeline-text">Back-end</p>
        </div>

        <div className="about-project__week-four">
          <h4 className="about-project__timeline-title about-project__timeline-title_frontend">4 недели</h4>
          <p className="about-project__timeline-text">Front-end</p>
        </div>
      </div>
    </section>
  )
}

export default AboutProject

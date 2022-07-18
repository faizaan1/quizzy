import React from 'react'
import { Link } from 'react-router-dom'
import { withTranslation } from 'react-i18next';
const Introslide2 = ({ t }) => {
    return (
        <div className="slide2">
            <div className="container position-relative">
                <div className="row align-items-center">
                    <div className="col-lg-8 col-12">
                        <div className="outer__slide1__img" style={{ backgroundImage: "url('" + process.env.PUBLIC_URL + "/images/introslider/doodle.png')" }}>
                            <img src={process.env.PUBLIC_URL + "/images/introslider/innerslider2.png"} alt="" />
                        </div>
                    </div>
                    <div className="col-lg-4 col-12">
                        <div className="slider__content" >
                            <h3>{t('Many')} <strong className="highlighttext"> &nbsp;{t('Quiz')} </strong >&nbsp;{t('lots of')} <strong className="highlighttext"><br />{t('Categories')}</strong></h3>
                            <p className="mb-4">{t('Intro2Text')}</p>
                        </div>
                        <Link to={"/Quizzone"} className="btn btn-primary slider1__btn me-2">{t('Lets Play')}</Link>
                        <Link to={"/contact-us"} className="btn slider1__btn2 text-white">{t('Contact Us')}</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withTranslation()(Introslide2);
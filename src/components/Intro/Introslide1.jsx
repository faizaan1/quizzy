import React from 'react';
import ReactTypingEffect from 'react-typing-effect';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
const Introslide1 = ({ t }) => {
    return (
        <div className="slide1">
            <div className="container position-relative">
                <div className="row align-items-center">
                    <div className="col-lg-8 col-12" data-aos="fade-right" >
                        <div className="outer__slide1__img" style={{ backgroundImage: "url('" + process.env.PUBLIC_URL + "/images/introslider/doodle.png')" }}>
                            <img src={process.env.PUBLIC_URL + "/images/introslider/innerslider.png"} alt="" />
                        </div>
                    </div>
                    <div className="col-lg-4 col-12" data-aos="fade-left">
                        <div className="slider__content" >
                            <h1>{t('Be')}&nbsp;
                                <span className="itypetext">
                                    <ReactTypingEffect
                                        text={[t("Smart"), t("Ready"), t("Noticed")]}
                                        speed={60}
                                        eraseDelay={1500}
                                        eraseSpeed={60}
                                        typingDelay={1500}
                                    />
                                </span>
                            </h1>
                            <p className="mb-3">{t('No one can stop you')}</p>
                        </div>
                        <Link to={"/Quizzone"} className="btn btn-primary slider1__btn me-2">{t('Lets Play')}</Link>
                        <Link to={"/contact-us"} className="btn slider1__btn2 text-white">{t('Contact Us')}</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withTranslation()(Introslide1);
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { FaCheck, FaTimes } from 'react-icons/fa';
import {
    CircularProgressbarWithChildren,
    buildStyles
} from "react-circular-progressbar";
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from '../../../utils/AnimatedProgressProvider';
import "react-circular-progressbar/dist/styles.css";

import { getUserData } from '../../../utils'
import config from '../../../utils/config';
function ShowScore({ t, score, totalQuestions, onPlayAgainClick, onReviewAnswersClick, onNextLevelClick, coins, quizScore, currentLevel, maxLevel }) {
    const history = useHistory();
    const percentage = (score * 100) / totalQuestions;
    const [user, setUser] = useState(null);
    const [perValue, setPerValue] = useState(0)
    useEffect(() => {
        setUser(getUserData());
    }, [])

    const goToHome = () => {
        history.push("/");
    }

    const goBack = () => {
        history.push("Quizzone");
    }
    return (
        <React.Fragment>
            <div className='score-section text-white text-center bold'>
                {percentage >= config.levelWinCheckPoint ?
                    <><h4 className='text-white'><b>{t("Winner")}</b></h4><h5 className='text-white'>{t("Congratulations")}</h5></>
                    :
                    <><h4 className='text-white'><b>{t("Defeat")}</b></h4><h5 className='text-white'>{t("Better Luck Next Time")}</h5></>
                }
            </div>
            <div className="row d-flex align-items-center">
                <div className="col-4 text-end text-white">
                    <h4 className='text-white score-circle-title'>{t("Coins")}</h4>
                    <div className="score-circle ml-auto">
                        <CircularProgressbarWithChildren value={0}>
                            <h4 className='text-white mb-0'>{coins ? coins : '0'}</h4>
                        </CircularProgressbarWithChildren>
                    </div>
                </div>

                <div className='col-4 score-section text-white text-center bold'>
                    <div className="d-inline-block">

                        <AnimatedProgressProvider
                            valueStart={0}
                            valueEnd={percentage}
                            duration={0.2}
                            easingFunction={easeQuadInOut}
                        >
                            {value => {
                                const roundedValue = Math.round(value);
                                setPerValue(roundedValue);
                                return (
                                    <CircularProgressbarWithChildren
                                        value={value}
                                        styles={buildStyles({
                                            pathTransition: "none",
                                            textColor: "#f68367",
                                            pathColor: percentage >= config.levelWinCheckPoint ? "#15ad5a" : "#df3529",
                                        })}
                                    >
                                    <img src={user && user.profile ? user.profile : process.env.PUBLIC_URL + "/images/user.png"} alt="user" className='showscore-userprofile' />
                                    </CircularProgressbarWithChildren>
                                );
                            }}
                        </AnimatedProgressProvider>
                    </div>
                </div>

                <div className="col-4 text-start text-white">
                    <h4 className='text-white score-circle-title'>{t("Score")}</h4>
                    <div className="score-circle">
                        <CircularProgressbarWithChildren value={0}>
                            <h4 className='text-white mb-0'>{quizScore ? quizScore : '0'}</h4>
                        </CircularProgressbarWithChildren>
                    </div>
                </div>

            </div>
            <div className="row mt-2 align-items-center d-flex">
                <div className="col-5 text-end" title={t('Incorrect Answers')}>
                    <h1 className="score-badge bg-danger mb-0"><FaTimes /> {(totalQuestions - score) + " / " + totalQuestions}</h1>
                </div>
                <div className="col-2 text-center">
                    <h1 className='text-white'>{perValue}%</h1>
                </div>
                <div className="col-5 text-start" title={t('Correct Answers')}>
                    <div className="score-badge bg-success">
                        <FaCheck />
                        <span className='mt-2'>&nbsp;&nbsp;{score + " / " + totalQuestions}</span>
                    </div>
                </div>
            </div>
            <div className="dashoptions row text-center">
                {percentage >= config.levelWinCheckPoint && String(maxLevel) !== String(currentLevel) ?
                    <div className="fifty__fifty col-12 col-sm-6 col-md-2">
                        <button className="btn w-100 mb-3" onClick={onNextLevelClick}>{t("Next Level")}</button>
                    </div>
                    :
                    <div className="fifty__fifty col-12 col-sm-6 col-md-2">
                        <button className="btn w-100 mb-3" onClick={onPlayAgainClick}>{t('Play Again')}</button>
                    </div>
                }
                <div className="audience__poll col-12 col-sm-6 col-md-2">
                    <button className="btn w-100 mb-3" onClick={onReviewAnswersClick}>{t('Review Answers')}</button>
                </div>
                <div className="resettimer col-12 col-sm-6 col-md-2">
                    <button className="btn w-100 mb-3" onClick={goBack}>{t('Back')}</button>
                </div>
                <div className="skip__questions col-12 col-sm-6 col-md-2">
                    <button className="btn w-100 mb-3" onClick={goToHome}>{t('Home')}</button>
                </div>
            </div>
        </React.Fragment>
    )
}

ShowScore.propTypes = {
    score: PropTypes.number.isRequired,
    totalQuestions: PropTypes.number.isRequired,
    coins: PropTypes.number.isRequired,
    quizScore: PropTypes.number.isRequired,
    onPlayAgainClick: PropTypes.func.isRequired,
    onReviewAnswersClick: PropTypes.func.isRequired,
    onNextLevelClick: PropTypes.func.isRequired,
}
export default withTranslation()(ShowScore)
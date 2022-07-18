import React, { useState } from "react";
import { Redirect } from 'react-router-dom'
import { toast } from "react-toastify";
import SEO from "../components/SEO";
import TopHeader from "../components/smalltopheader/TopHeader";
import Header from '../partials/header/Header';

const Quizplay = () => {

    const data1 = [
        {
            id: 1,
            image: "images/quizplay/quizzone_icon@2x.png",
            quizname: "Quiz Zone",
        },
        {
            id: 2,
            image: "images/quizplay/dailyquiz_icon@2x.png",
            quizname: "daily quiz",
        },
        {
            id: 3,
            image: "images/quizplay/truefalse_icon@2x.png",
            quizname: "true & false",
            disabled: !false,
            text: "coming soon"
        },
        {
            id: 4,
            image: "images/quizplay/contestplay_icon@2x.png",
            quizname: "contest play",
            disabled: !false,
            text: "coming soon"
        },
        {
            id: 5,
            image: "images/quizplay/battlequiz_icon@2x.png",
            quizname: "battle quiz",
            disabled: !false,
            text: "coming soon"
        },
        {
            id: 6,
            image: "images/quizplay/funlearn_icon@2x.png",
            quizname: "furn & learn",
            disabled: !false,
            text: "coming soon"
        },
        {
            id: 7,
            image: "images/quizplay/selfchallenge_icon@2x.png",
            quizname: "self challenge",
            disabled: !false,
            text: "coming soon"
        },
        {
            id: 8,
            image: "images/quizplay/groupplay_icon@2x.png",
            quizname: "group play",
            disabled: !false,
            text: "coming soon"
        },
        {
            id: 9,
            image: "images/quizplay/guess_the_word@2x.png",
            quizname: "Guess the word",
            disabled: !false,
            text: "coming soon"
        },
    ];

    const [redirectId, setRedirectId] = useState(null);

    if (redirectId === 1) {
        return (
            <Redirect
                to={{
                    pathname: '/QuizZone',
                }}
            />
        );
    } else if (redirectId === 2) {
        return (
            <Redirect
                to={{
                    pathname: '/DailyQuizDashboard',
                }}
            />
        )
    }

    const redirectdata = (data) => {
        if (!data.disabled) {
            setRedirectId(data.id)
        }else{
            toast.error("Coming Soon")
        }
    }

    return (
        <React.Fragment>
            <SEO title="Quizplay" />
            <TopHeader />
            <Header />
            <div className='Quizzone wrapper'>
                <div className='container'>
                    <ul className='row justify-content-center'>
                        {data1.map((quiz) => (
                            <li onClick={() => redirectdata(quiz)} className='col-xl-2 col-lg-3 col-md-3 col-sm-6 col-6 small__div' key={quiz.id}>
                                <div className='inner__Quizzone'>
                                    {quiz.disabled ?
                                        <div className="card_disabled">
                                            <div className='card__icon'>
                                                <img src={quiz.image} alt='icon' />
                                            </div>
                                            <div className='title__card'>
                                                <h5 className='inner__title'>
                                                    {quiz.quizname}
                                                </h5>
                                            </div>
                                        </div>
                                        :
                                        <div className="card">
                                            <div className='card__icon'>
                                                <img src={quiz.image} alt='icon' />
                                            </div>
                                            <div className='title__card'>
                                                <h5 className='inner__title'>
                                                    {quiz.quizname}
                                                </h5>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </React.Fragment>
    );
};
export default Quizplay;
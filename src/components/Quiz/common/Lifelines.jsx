import React, { useState } from 'react'
import { FaUsers, FaRegPlayCircle, FaRegClock } from "react-icons/fa";
import PropTypes from 'prop-types';
import * as api from '../../../utils/api';
import config from '../../../utils/config';
import { getUserData, updateUserData } from '../../../utils';
import { toast } from 'react-toastify';
import { withTranslation } from 'react-i18next';
function Lifelines({ handleFiftFifty, handleAudiencePoll, handleResetTime, handleSkipQuestion,t }) {
    const [status, setStatus] = useState({ fifty_fifty: false, audience_poll: false, reset_time: false, skip_question: false })
    const lifeLineClick = (type) => {
        var update;
        if (type === "Fifty Fifty") {
            if (checkIfUserhasCoins() && handleFiftFifty()) {
                if (deductCoins()) {
                    update = { ...status, fifty_fifty: true };
                    setStatus(update);
                }
            }
        } else if (type === "Audience Poll") {
            if (deductCoins()) {
                update = { ...status, audience_poll: true };
                handleAudiencePoll();
                setStatus(update);
            }
        } else if (type === "Reset Time") {
            if (deductCoins()) {
                update = { ...status, reset_time: true };
                handleResetTime();
                setStatus(update);
            }
        } else if (type === "Skip Question") {
            if (deductCoins()) {
                update = { ...status, skip_question: true };
                handleSkipQuestion();
                setStatus(update);
            }
        }
    }

    const deductCoins = () => {
        if (checkIfUserhasCoins()) {
            var coins = "-" + config.deductLifeLineCoins;
            api.setUserCoinScore(coins, null, null, "Lifeline", "1").then(response => {
                if (!response.error) {
                    updateUserData(response.data);
                }
            });
            return true;
        } else {
            return false;
        }

    }

    const checkIfUserhasCoins = () => {
        var user = getUserData();
        if (user.coins < config.deductLifeLineCoins) {
            toast.error(t("You Don't have enough coins"));
            return false;
        } else {
            return true;
        }
    }
    return (
        <div className="dashoptions row">
            <div className="fifty__fifty col-3 col-sm-3 col-md-2">
                <button className={`btn w-100 p-2 ${status.fifty_fifty && "disabled"}`} onClick={() => lifeLineClick("Fifty Fifty")}>50/50</button>
            </div>
            <div className="audience__poll col-3 col-sm-3 col-md-2">
                <button className={`btn w-100 p-2 ${status.audience_poll && "disabled"}`} onClick={() => lifeLineClick("Audience Poll")}><FaUsers /></button>
            </div>
            <div className="resettimer col-3 col-sm-3 col-md-2">
                <button className={`btn w-100 p-2 ${status.reset_time && "disabled"}`} onClick={() => lifeLineClick("Reset Time")}><FaRegClock /></button>
            </div>
            <div className="skip__questions col-3 col-sm-3 col-md-2">
                <button className={`btn w-100 p-2 ${status.skip_question && "disabled"}`} onClick={() => lifeLineClick("Skip Question")}><FaRegPlayCircle /></button>
            </div>
        </div>
    )
}
Lifelines.propTypes = {
    handleFiftFifty: PropTypes.func.isRequired,
    handleAudiencePoll: PropTypes.func.isRequired,
    handleResetTime: PropTypes.func.isRequired,
    handleSkipQuestion: PropTypes.func.isRequired,
}
export default withTranslation()(Lifelines)
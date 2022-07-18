
import axios from 'axios';
import config from './config.js';
const access_key = config.apiAccessKey;
const apiUrl = config.apiUrl;

/** API ROUTES */
const USER_SIGNUP = "user_signup";
const GET_CATEGORIES = "get_categories";
const GET_SUBCATEGORIES = "get_subcategory_by_maincategory";
const GET_LANGUAGES = "get_languages";
const GET_LEVEL_DATA = "get_level_data";
const GET_QUESTIONS = "get_questions_by_level";
const GET_USER = "get_user_by_id";
const UPDATE_PROFILE = "update_profile";
const UPDATE_PROFILE_IMAGE = "upload_profile_image";
const SET_BOOKMARK = "set_bookmark";
const GET_BOOKMARK = "get_bookmark";
const GET_DAILY_LEADERBOARD = "get_daily_leaderboard";
const GET_MONTHLY_LEADERBOARD = "get_monthly_leaderboard";
const GET_GLOBLE_LEADERBOARD = "get_globle_leaderboard";
const GET_NOTIFICATIONS = "get_notifications";
const GET_USER_STATISTICS = "get_users_statistics";
const DELETE_USER_ACCOUNT = "delete_user_account";
const GET_SETTINGS = "get_settings";
const SET_USER_COIN_SCORE = "set_user_coin_score";
const REPORT_QUESITON = "report_question";
const SET_LEVEL_DATA = "set_level_data";
const SET_USER_STATISTICS = "set_users_statistics";
const CHECK_USER_EXISTS = "check_user_exists";
const GET_SYSTEM_CONFIGURATIONS = "get_system_configurations";
const GET_SLIDERS = "get_sliders";
const Daily_Quiz = "get_daily_quiz";

const getLanguage = ()=>{
    var language = localStorage.getItem("language");
    if (language) {
        return JSON.parse(language);

    }
    return false;
}

const getUser = () => {
    var user = localStorage.getItem("user");
    if (user) {
        try {
            return JSON.parse(user);
        } catch (error) {
            return false;
        }

    }

    return false;
}

export async function userAuth(firebase_id, type, username, email, image_url, mobile, fcm_id, friends_code) {
    /**
     * @param
     * type : email / gmail / fb / mobile / apple
     */

    const requestOptions = {
        access_key: access_key,
        firebase_id: firebase_id,
        type: type,
        name: username,
        email: email,
        profile: image_url,
        mobile: mobile,
        fcm_id: fcm_id,
        friends_code: friends_code,
    };

    var response = await axios.post(
        apiUrl + USER_SIGNUP,
        requestOptions
    );

    return response.data;
}
export const getCategories = async () => {
    var { api_token } = getUser();
    var {id:language_id} = getLanguage();
    const requestOptions = {
        access_key: access_key,
        language_id: language_id,
        type: 1, //type : Quiz Zone
    };

    let response = await axios.post(
        apiUrl + GET_CATEGORIES,
        requestOptions,
        {
            headers: {
                Authorization:
                    "Bearer " + api_token,
            },
        }
    );
    return response.data;
}

//getsubcategories slider middle sec
export const getSubcategories = async (category_id, subcategory_id) => {
    var { api_token } = getUser();
    var {id:language_id} = getLanguage();
    const requestOptions = {
        access_key: access_key,
        language_id: language_id,
        category: category_id,
        subcategory: subcategory_id,
    };
    let response = await axios.post(
        apiUrl + GET_SUBCATEGORIES,
        requestOptions,
        {
            headers: {
                Authorization:
                    "Bearer " + api_token,
            },
        }
    );
    return response.data;
}

//Get Languages
export const getLanguages = async (language_id) => {
    var { api_token } = getUser();
    const requestOptions = {
        access_key: access_key,
        language_id: language_id,
    };
    let response = await axios.post(
        apiUrl + GET_LANGUAGES,
        requestOptions,
        {
            headers: {
                Authorization:
                    "Bearer " + api_token,
            },
        }
    );
    return response.data;
}

export const getLevelData = async (category_id, subcategory_id) => {
    var { api_token } = getUser();
    const requestOptions = {
        access_key: access_key,
        category: category_id,
        subcategory: subcategory_id,
    };
    let response = await axios.post(
        apiUrl + GET_LEVEL_DATA,
        requestOptions,
        {
            headers: {
                Authorization:
                    "Bearer " + api_token,
            },
        }
    );
    return response.data;
}

//get questions bottom sec
export const getQuestions = async (category_id, subcategory_id, level) => {
    var { api_token } = getUser();
    var {id:language_id} = getLanguage();
    const requestOptions = {
        access_key: access_key,
        language_id: language_id,
        category: category_id,
        subcategory: subcategory_id,
        level: level,
    };
    let request = axios.post(apiUrl + GET_QUESTIONS, requestOptions,
        {
            headers: {
                Authorization:
                    "Bearer " + api_token,
            },
        });
    return request;
}

export const getUserProfile = async () => {
    var { api_token, id, firebase_id } = getUser();
    const requestOptions = {
        access_key: access_key,
        get_user_by_id: id,
        firebase_id: firebase_id
    };

    let response = await axios.post(
        apiUrl + GET_USER,
        requestOptions,
        {
            headers: {
                Authorization:
                    "Bearer " + api_token,
            },
        }
    );
    return response.data;
}

export const updateUserProfile = async (name, mobile) => {
    var { api_token } = getUser();
    const requestOptions = {
        access_key: access_key,
        name: name,
        mobile: mobile,
    };

    let response = await axios.post(
        apiUrl + UPDATE_PROFILE,
        requestOptions,
        {
            headers: {
                Authorization:
                    "Bearer " + api_token,
            },
        }
    );
    if (!response.data.error) {
        return getUserProfile();
    } else {
        return response.data;
    }
}

export const updateUserProfileImage = async (image) => {
    var { api_token } = getUser();
    //To upload the file formdata is used
    let requestOptions = new FormData();
    requestOptions.append('access_key', access_key);
    // requestOptions.append('user_id', user.id);
    requestOptions.append("image", image);
    let response = await axios.post(
        apiUrl + UPDATE_PROFILE_IMAGE,
        requestOptions,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: "Bearer " + api_token,
            },
        }
    );
    return response.data;
}

export const setBookmark = async (question_id, bookmark, type) => {
    var { api_token } = getUser();
    const requestOptions = {
        access_key: access_key,
        question_id: question_id,
        status: bookmark,   //1-bookmark,0-unmark
        type: type, //1-quiz_zone, 3-guess_the_word, 4-audio_question
    };

    let response = await axios.post(
        apiUrl + SET_BOOKMARK,
        requestOptions,
        {
            headers: {
                Authorization: "Bearer " + api_token,
            },
        }
    );
    return response.data;
}

export const getBookmark = async (type) => {
    var { api_token } = getUser();
    const requestOptions = {
        access_key: access_key,
        type: type, //1-quiz_zone, 3-guess_the_word, 4-audio_question
    };

    let response = await axios.post(
        apiUrl + GET_BOOKMARK,
        requestOptions,
        {
            headers: {
                Authorization: "Bearer " + api_token,
            },
        }
    );
    return response.data;
}

export const getDailyLeaderBoard = async (offset, limit) => {
    var { api_token } = getUser();
    const requestOptions = {
        access_key: access_key,
        offset: offset,// {optional} - starting position
        limit: limit,// {optional} - Number of records per page
    };

    let response = await axios.post(
        apiUrl + GET_DAILY_LEADERBOARD,
        requestOptions,
        {
            headers: {
                Authorization: "Bearer " + api_token,
            },
        }
    );
    return response.data;
}

export const getMonthlyLeaderBoard = async (offset, limit) => {
    var { api_token } = getUser();
    const requestOptions = {
        access_key: access_key,
        offset: offset,// {optional} - starting position
        limit: limit,// {optional} - Number of records per page
    };

    let response = await axios.post(
        apiUrl + GET_MONTHLY_LEADERBOARD,
        requestOptions,
        {
            headers: {
                Authorization: "Bearer " + api_token,
            },
        }
    );
    return response.data;
}

export const getGlobleLeaderBoard = async (offset, limit) => {
    var { api_token } = getUser();
    const requestOptions = {
        access_key: access_key,
        offset: offset,// {optional} - starting position
        limit: limit,// {optional} - Number of records per page
    };

    let response = await axios.post(
        apiUrl + GET_GLOBLE_LEADERBOARD,
        requestOptions,
        {
            headers: {
                Authorization: "Bearer " + api_token,
            },
        }
    );
    return response.data;
}

export const getNotifications = async (id, order, offset, limit) => {
    var { api_token } = getUser();
    const requestOptions = {
        access_key: access_key,
        sort: id,       // {optional} - id / users / type
        order: order,    // {optional} - DESC / ASC
        offset: offset,      // {optional} - Starting position
        limit: limit,      // {optional} - number of records per page
    };
    let response = await axios.post(
        apiUrl + GET_NOTIFICATIONS,
        requestOptions,
        {
            headers: {
                Authorization: "Bearer " + api_token,
            },
        }
    );
    return response.data;
}

export const getUserStatistics = async () => {
    var { api_token } = getUser();
    const requestOptions = {
        access_key: access_key,
    };

    let response = await axios.post(
        apiUrl + GET_USER_STATISTICS,
        requestOptions,
        {
            headers: {
                Authorization: "Bearer " + api_token,
            },
        }
    );
    return response.data;
}

export const deleteUserAccount = async () => {
    var { api_token } = getUser();
    const requestOptions = {
        access_key: access_key,
    };

    let response = await axios.post(
        apiUrl + DELETE_USER_ACCOUNT,
        requestOptions,
        {
            headers: {
                Authorization: "Bearer " + api_token,
            },
        }
    );
    return response.data;
}

export const getSettings = async type => {
    var { api_token } = getUser();
    const requestOptions = {
        access_key: access_key,
        type: type, //about_us / privacy_policy / terms_conditions / contact_us / instructions
    };

    let response = await axios.post(
        apiUrl + GET_SETTINGS,
        requestOptions,
        {
            headers: {
                Authorization: "Bearer " + api_token,
            },
        }
    );
    return response.data;
}

export const setUserCoinScore = async (coins, score, type, title, status) => {
    var { api_token } = getUser();
    const requestOptions = {
        access_key: access_key,
        coins: coins,     //if deduct coin than set with minus sign -2
        score: score,
        type: type,      // (dashing_debut, combat_winner, clash_winner, most_wanted_winner, ultimate_player, quiz_warrior, super_sonic, flashback, brainiac, big_thing, elite, thirsty, power_elite, sharing_caring, streak)
        title: title,
        status: status   //0-add coin, 1-deduct coin
    };

    let response = await axios.post(
        apiUrl + SET_USER_COIN_SCORE,
        requestOptions,
        {
            headers: {
                Authorization: "Bearer " + api_token,
            },
        }
    );
    return response.data;
}

export const reportQuestion = async (question_id, message) => {
    var { api_token } = getUser();
    const requestOptions = {
        access_key: access_key,
        question_id: question_id,
        message: message
    };

    let response = await axios.post(
        apiUrl + REPORT_QUESITON,
        requestOptions,
        {
            headers: {
                Authorization: "Bearer " + api_token,
            },
        }
    );
    return response.data;
}

export const setLevelData = async (category_id, subcategory_id, level) => {
    var { api_token } = getUser();
    const requestOptions = {
        access_key: access_key,
        category: category_id,
        subcategory: subcategory_id,
        level: level,
    };

    let response = await axios.post(
        apiUrl + SET_LEVEL_DATA,
        requestOptions,
        {
            headers: {
                Authorization: "Bearer " + api_token,
            },
        }
    );
    return response.data;
}

export const setUserStatistics = async (questions_answered, correct_answers, category_id, percentage) => {
    var { api_token } = getUser();
    const requestOptions = {
        access_key: access_key,
        questions_answered: questions_answered,
        correct_answers: correct_answers,
        category_id: category_id, //(id of category which user played)
        ratio: percentage, // (In percenatge)
    };

    let response = await axios.post(
        apiUrl + SET_USER_STATISTICS,
        requestOptions,
        {
            headers: {
                Authorization: "Bearer " + api_token,
            },
        }
    );
    return response.data;
}

export const checkUserExists = async (firebase_id) => {
    var { api_token } = getUser();
    const requestOptions = {
        access_key: access_key,
        firebase_id: firebase_id,
    };

    let response = await axios.post(
        apiUrl + CHECK_USER_EXISTS,
        requestOptions,
        {
            headers: {
                Authorization: "Bearer " + api_token,
            },
        }
    );
    return response.data;
}

export const getSystemConfigurations = async () => {
    const requestOptions = {
        access_key: access_key,
    };

    let response = await axios.post(
        apiUrl + GET_SYSTEM_CONFIGURATIONS,
        requestOptions,
    );
    return response.data;
}

export const getSliders = async () => {
    var {id:language_id} = getLanguage();
    const requestOptions = {
        access_key: access_key,
        language_id: language_id,
    };

    let response = await axios.post(
        apiUrl + GET_SLIDERS,
        requestOptions,
    );

    return response.data;

}


// dailyquiz
export const dailyQuiz = async () => {
    var { api_token } = getUser();
    var {id:language_id} = getLanguage();
    const requestOptions = {
        access_key: access_key,
        language_id: language_id,
    };

    let response = await axios.post(
        apiUrl + Daily_Quiz,
        requestOptions,
        {
            headers: {
                Authorization:
                    "Bearer " + api_token,
            },
        }
    );
    return response.data;
}

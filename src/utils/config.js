var config = {

    demo:true, // Set the Demo Version

    //SEO Configurations
    appName: "Elite Quiz",
    metaDescription: "Elite Quiz is a Web Quiz Application",
    metaKeyWords: "Elite Quiz,Quiz,Questions,Answers,Online Quiz",

    //API Configurations
    apiAccessKey: 8525,
    apiUrl: "https://elitequiz.wrteam.in/api/",
    // apiUrl: "http://flutterquiz.thewrteam.in/api/",

    //Language Configurations
    // Get Your Language Codes ---> https://developers.google.com/admin-sdk/directory/v1/languages
    supportedLanguages:["en","hi","ur"],
    defaultLanguage:"en",
    /**
     * If your Default Language is not in supportedLanguages then add there first and after that set the defaultLanguage.
     */


    //Quiz Configurations
    questionTimerSeconds: 15,
    levelWinCheckPoint: 30,         // Above 30% is required to Clear the Quiz Level
    maxWinningCoins:4,              // This will give user the coins if user will clear the level
    deductReviewAnswerCoins: 10,    // 10 coins will be deducted if user Review the Answer
    addCorrectAnswerScore:2,        // This will increase the user score after each correct answer
    deductIncorrectAnswerScore:1,   // This will deduct the points if user will give wrong answer
    deductLifeLineCoins:1,          // Deduct Coins when using Life Line


    DefaultCountrySelectedInMobile: "in",   //Default Country Selected in Mobile Login Screen

    //Firebase Configurations
    apiKey: "AIzaSyAO_zgaFbek9EZIjvV1QjRIVFxWPypcN1w",
    authDomain: "quiz-flutter-new.firebaseapp.com",
    projectId: "quiz-flutter-new",
    storageBucket: "quiz-flutter-new.appspot.com",
    messagingSenderId: "322915959213",
    appId: "1:322915959213:web:faea1ba0d6c3375342e124",
    measurementId: "G-P6RYH0TNCK"
};

export default config;
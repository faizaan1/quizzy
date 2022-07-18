var config = {
    //SEO Configurations
    appName: "Elite Quiz",
    metaDescription: "Elite Quiz is a Web Quiz Application.",
    metaKeyWords: "Elite Quiz,Quiz,Questions,Answers,Online Quiz",

    //API Configurations
    apiAccessKey: 8525,
    apiUrl : "https://elitequiz.wrteam.in/api/",

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
    apiKey: "XXXXXXXXXXXXXXXXXXXXX",
    authDomain: "XXXXXXXXXXXXXXXXX",
    projectId: "XXXXXXXXXXXXXXXXXX",
    storageBucket: "XXXXXXXXXXXXXX",
    messagingSenderId: "XXXXXXXXXX",
    appId: "XXXXXXXXXXXXXXXXXXXXXX",
    measurementId: "XXXXXXXXXXXXXX",
};

export default config;
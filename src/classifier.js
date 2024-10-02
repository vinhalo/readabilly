'use strict';

const NUMBER_OF_LEVELS = 10;

class Classifier {
    // Array of messages to be displayed depending on reading ease
    constructor() {
        this.difficultyText = [
            "Very difficuilt to read",  // Score of 0-10
            "Very difficuilt to read",  // Score of 10-20
            "Very difficuilt to read",  // Score of 20-30
            "Difficult to read",    // Score of 30-40
            "Difficult to read",    // Score of 40-50
            "Fairly difficult to read", // Score of 50-60
            "Easily understood by 13-15 year old students", // Score of 60-70
            "Fairly easy to read",  // Score of 70-80
            "Easy to read", // Score of 80-90
            "Very easy to read", // Score of 90-100
        ];

        this.recommendationText = [
            "Shit show",  // Score of 0-10
            "Stop trying to be clever",  // Score of 10-20
            "You don't have to sound smart",  // Score of 20-30
            "Use less fancy words",    // Score of 30-40
            "Assume your audience is dumb",    // Score of 40-50
            "Nearly ok!", // Score of 50-60
            "Pretty good going", // Score of 60-70
            "Nice writing!",  // Score of 70-80
            "That's how you do it", // Score of 80-90
            "Wow, everyone shoulbe be able to understand this!", // Score of 90-100
        ];
    }

    getDifficultyText(readingLevel) {
        let simplifiedLevel = (Math.floor(readingLevel) % 10);

        if (simplifiedLevel < 0 || simplifiedLevel >= NUMBER_OF_LEVELS) {
            return "Something's gone wrong";
        }

        return this.difficultyText[simplifiedLevel];
    }

    getDifficultyRecommendation(readingLevel) {
        let simplifiedLevel = (Math.floor(readingLevel) % 10);

        if (simplifiedLevel < 0 || simplifiedLevel >= NUMBER_OF_LEVELS) {
            return "Something's gone wrong";
        }

        return this.recommendationText[simplifiedLevel];
    }
}

const classifier = new Classifier()
export default classifier;
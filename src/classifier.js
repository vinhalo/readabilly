'use strict';

const NUMBER_OF_LEVELS = 10;

class Classifier {
    // Array of messages to be displayed depending on reading ease
    constructor() {
        this.difficultyText = [
            "Extremely difficult to read",  // Score of 0-10
            "Extremely difficult to read",  // Score of 10-20
            "Extremely difficult to read",  // Score of 20-30
            "Difficult to read",    // Score of 30-40
            "Difficult to read",    // Score of 40-50
            "Fairly difficult to read", // Score of 50-60
            "Understandable", // Score of 60-70
            "Relatively easy to read",  // Score of 70-80
            "Easy to read", // Score of 80-90
            "Extremely easy to read", // Score of 90-100
            "Extremely easy to read", // Score of 100
        ];

        this.recommendationText = [
            "This probably needs a full rewrite, unless it's a very tough academic or technical document.",  // Score of 0-10
            "This probably needs a full rewrite, unless it's a very tough academic or technical document.",  // Score of 10-20
            "This probably needs a full rewrite, unless it's a very tough academic or technical document.",  // Score of 20-30
            "Maybe this needs to be a dense text to read, but otherwise check if you can simplify the writing.",    // Score of 30-40
            "Maybe this needs to be a dense text to read, but otherwise check if you can simplify the writing.",    // Score of 40-50
            "It's using some elaborate words and sentences, it might be worth editing to simplify a bit.", // Score of 50-60
            "It's good to go, but you might consider reading the text to review more complex words.", // Score of 60-70
            "No changes needed, but you can check for longer sentences and complex words if you want to improve it.",  // Score of 70-80
            "This is the ideal spot of readability, reaching a good balance and keeping it understandable for most people and states of mind.", // Score of 80-90
            "This writing is understandable by the largest audience possible, further changes might make it sound too simple.", // Score of 90-100
            "This writing is understandable by the largest audience possible, further changes might make it sound too simple.", // Score of 100
        ];

        this.scoreColours = [
            "#F3B7BE",  // Score of 0-10
            "#F3B7BE",  // Score of 10-20
            "#F3B7BE",  // Score of 20-30
            "#FDD3A6",    // Score of 30-40
            "#FDD3A6",    // Score of 40-50
            "#FDE1A6", // Score of 50-60
            "#C2F3E1", // Score of 60-70
            "#A8EED5",  // Score of 70-80
            "#A6D3BB", // Score of 80-90
            "#A6D0EC", // Score of 90-100
            "#A6D0EC", // Score of 100
        ];
    }

    getDifficultyText(fleschReadingEase) {
        let simplifiedLevel = (Math.floor(fleschReadingEase/10));

        if (simplifiedLevel < 0 || simplifiedLevel > NUMBER_OF_LEVELS) {
            return "Something's gone wrong";
        }

        return this.difficultyText[simplifiedLevel];
    }

    getDifficultyRecommendation(fleschReadingEase) {
        let simplifiedLevel = (Math.floor(fleschReadingEase/10));

        if (simplifiedLevel < 0 || simplifiedLevel > NUMBER_OF_LEVELS) {
            return "Something's gone wrong";
        }

        return this.recommendationText[simplifiedLevel];
    }

    getScoreColour(fleschReadingEase) {
        let simplifiedLevel = (Math.floor(fleschReadingEase/10));

        if (simplifiedLevel < 0 || simplifiedLevel > NUMBER_OF_LEVELS) {
            return "#000000";
        }

        return this.scoreColours[simplifiedLevel];
    }
}

const classifier = new Classifier()
export default classifier;
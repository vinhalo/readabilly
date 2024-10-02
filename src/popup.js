'use strict';

import './popup.css';
import classifier from './classifier';

(function () {
  // Get the reading level from storage
  chrome.storage.local.get('readingLevel', function(data) {
    var readingLevel = data.readingLevel;

    // Update the popup with the reading level
    var readingLevelElement = document.getElementById('readingLevel');
    readingLevelElement.innerText = readingLevel;

    // Update the popup with the difficulty text
    var difficultyElement = document.getElementById('readingDifficultyText');
    difficultyElement.innerText = classifier.getDifficultyText(readingLevel);

    // Update the popup with the difficulty recommendation
    var recommendationElement = document.getElementById('recommendationText');
    recommendationElement.innerText = classifier.getDifficultyRecommendation(readingLevel);
  });
})();

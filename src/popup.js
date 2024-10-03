'use strict';

import './popup.css';
import classifier from './classifier';

(function () {
  // check if it's google docs
  chrome.storage.local.get('isGoogleDocs', function(data) {
      var isGoogleDocs = data.isGoogleDocs;
      
      if (isGoogleDocs) {
        var selectedTextElement = document.getElementById('analysisScope');
        selectedTextElement.innerText = "Google Docs are currently not supported";
        return;
      }

      // Get the selected text from storage
    chrome.storage.local.get('selectedText', function(data) {
      var selectedText = data.selectedText;
        // Update the popup with the selected text
        var selectedTextElement = document.getElementById('analysisScope');
        selectedTextElement.innerText = selectedText? "Selected text" : "Full page";
    });

    // Get the word count from storage
    chrome.storage.local.get('wordCount', function(data) {
      var wordCount = data.wordCount;
        // Update the popup with the word count
        var wordCountElement = document.getElementById('wordsAnalysed');
        wordCountElement.innerText = wordCount + " words analysed";
    });

    // Get the reading level from storage
    chrome.storage.local.get('fleschReadingEase', function(data) {
      var fleschReadingEase = data.fleschReadingEase;

      if (fleschReadingEase >= 0) {
        // Valid Flesch Reading Ease score
        // Update the popup with the reading level
        var fleschReadingEaseElement = document.getElementById('fleschReadingEase');
        fleschReadingEaseElement.innerText = fleschReadingEase;

        // Update the popup with the difficulty text
        var difficultyElement = document.getElementById('readingDifficultyText');
        difficultyElement.innerText = classifier.getDifficultyText(fleschReadingEase);

        // Update the popup with the difficulty recommendation
        var recommendationElement = document.getElementById('recommendationText');
        recommendationElement.innerText = classifier.getDifficultyRecommendation(fleschReadingEase);
      }
      else {
        // Invalid Flesch Reading Ease Score
        var fleschReadingEaseElement = document.getElementById('fleschReadingEase');
        fleschReadingEaseElement.innerText = "Unable to provide reading level, please try selecting a section of text";
      }
    });
  });
})();

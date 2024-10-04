'use strict';

import './popup.css';
import classifier from './classifier';

(function () {
  function showInvalidMessage(message) {
    //show message in wordsAnalysed element
    var wordsAnalysedElement = document.getElementById('wordsAnalysed');
    wordsAnalysedElement.innerText = message;

    //hide the result element
    var resultElement = document.getElementById('result');
    resultElement.style.display = "none";
  }

  document.addEventListener('DOMContentLoaded', function () {
    // check if it's google docs
    chrome.storage.local.get('isGoogleDocs', function(data) {
      var isGoogleDocs = data.isGoogleDocs;
      
      if (isGoogleDocs) {
        showInvalidMessage("Google Docs are currently not supported");
        return;
      }

      // Get the reading level from storage
      chrome.storage.local.get('fleschReadingEase', function(data) {
        var fleschReadingEase = data.fleschReadingEase;

        if (fleschReadingEase >= 0) {
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
          
          // Valid Flesch Reading Ease score
          // Update the popup with the reading level
          var fleschReadingEaseElement = document.getElementById('fleschReadingEase');
          fleschReadingEaseElement.innerText = Math.round(fleschReadingEase);
          fleschReadingEaseElement.classList.add(classifier.getScoreClassName(fleschReadingEase));

          // Update the popup with the difficulty text
          var difficultyElement = document.getElementById('readingDifficultyText');
          difficultyElement.innerText = classifier.getDifficultyText(fleschReadingEase);

          // Update the popup with the difficulty recommendation
          var recommendationElement = document.getElementById('recommendationText');
          recommendationElement.innerText = classifier.getDifficultyRecommendation(fleschReadingEase);
        }
        else {
          // Invalid Flesch Reading Ease Score
          showInvalidMessage("Unable to provide reading level, please try selecting a section of text");
        }
      });
    });
  });
})();

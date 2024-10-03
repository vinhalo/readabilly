'use strict';

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

import readability from 'text-readability';

function sendAnalysisMessage() {
	// Check if any text is selected
	let selectedText = window.getSelection().toString();
	let textToAnalyse = selectedText.length > 0 ? selectedText : document.body.innerText;

	// Remove all URLs from textToAnalyse
	textToAnalyse = textToAnalyse.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');

	let wordCount = readability.lexiconCount(textToAnalyse);
	let fleschReadingEase = readability.fleschReadingEase(textToAnalyse);

	console.log('Text analysed: ' + textToAnalyse);

	chrome.runtime.sendMessage({
		selectedText: selectedText.length > 0,
		wordCount: wordCount,
		fleschReadingEase: fleschReadingEase
	});
}

// Add event listener for document selection changed event
document.addEventListener('selectionchange', sendAnalysisMessage);

// Send the initial analysis message
sendAnalysisMessage();


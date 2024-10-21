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

function setIconColour() {
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
	  const iconVariant = e.matches ? "_dark" : "";
	
	  browser.browserAction.setIcon({
		  path: {
			  16: `icons/icon${iconVariant}_16.png`,
			  32: `icons/icon${iconVariant}_32.png`,
			  48: `icons/icon${iconVariant}_48.png`,
			  128: `icons/icon${iconVariant}_128.png`
		  },
	  });
	});
  }

function sendAnalysisMessage()
{
	// Check URL to see if it's a google doc
	let url = window.location.href;
	if (url.includes("docs.google.com")) {
		console.log("This is a google doc");
		sendGoogleDocsAnalysisMessage();
		return;
	}

	//default
	sendStandardAnalysisMessage();
}

function sendStandardAnalysisMessage()
{
	// Check if any text is selected
	let selectedText = window.getSelection().toString();
	let textToAnalyse = selectedText.length > 0 ? selectedText : document.body.innerText;

	// Remove all URLs from textToAnalyse
	textToAnalyse = textToAnalyse.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');

	let wordCount = readability.lexiconCount(textToAnalyse);
	let fleschReadingEase = readability.fleschReadingEase(textToAnalyse);

	// Cap the Flesch Reading Ease score at 100
	fleschReadingEase = Math.min(fleschReadingEase, 100);

	chrome.runtime.sendMessage({
		isGoogleDocs: false,
		selectedText: selectedText.length > 0,
		wordCount: wordCount,
		fleschReadingEase: fleschReadingEase
	});
}

function sendGoogleDocsAnalysisMessage() {
	chrome.runtime.sendMessage({
		isGoogleDocs: true
	});
}

// Add event listener for document selection changed event
document.addEventListener('selectionchange', sendAnalysisMessage);

setIconColour();

// Send the initial analysis message
sendAnalysisMessage();


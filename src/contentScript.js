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
let pageText = document.body.innerText;
let readingEase = readability.fleschReadingEase(pageText);

console.log(readingEase);

chrome.runtime.sendMessage({
	readingLevel: readingEase
});
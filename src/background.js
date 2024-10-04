'use strict';

// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages
import classifier from './classifier';

const COLOR_DEFAULT = "";

class Readabilly {
  constructor() {
    this.colorManual = COLOR_DEFAULT;
    chrome.storage.sync.get(null, function(data) {
      this.colorManual = data.colorManual;
    }.bind(this));
    chrome.storage.onChanged.addListener(this.onOptionsChange.bind(this));

    // Update when the page ends loading
    chrome.runtime.onMessage.addListener(this.onContentUpdate.bind(this));
    // Update when switching tabs
    chrome.tabs.onActivated.addListener(this.executeContentScript.bind(this));
    // Update when switching windows
    chrome.windows.onFocusChanged.addListener(this.executeContentScript.bind(this));
  
    // Run on icon click
    chrome.action.onClicked.addListener((function(tab) { this.executeContentScript(); }).bind(this) );
  }

  executeContentScript() {
    this.setExtensionBadge("")
    chrome.tabs.query({ active: true, lastFocusedWindow: true }).then(function([tab]) {
      if (tab && tab.id) {
        // skip urls like "chrome://" to avoid extension error
        if (tab.url?.startsWith("chrome://")) return undefined;

        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: [ "contentScript.js" ]
        })  
      }
    });
  }

  onContentUpdate(request, sender, sendResponse) {
    let fleschReadingEase = request.fleschReadingEase;

    // Update the icon with the rounded reading level
    var badgeText = (request.isGoogleDocs || fleschReadingEase < 0) ? "" : Math.round(fleschReadingEase);
    this.setExtensionBadge(badgeText);

    // Save to storage for popup
    chrome.storage.local.set({ isGoogleDocs: request.isGoogleDocs });
    chrome.storage.local.set({ selectedText: request.selectedText });
    chrome.storage.local.set({ wordCount: request.wordCount });
    chrome.storage.local.set({ fleschReadingEase: fleschReadingEase });
  }

  onOptionsChange(changes, areaName) {
    if (changes.colorManual) {
      if (this.colorManual == "") {
        this.colorManual = "606368";
      } else {
        this.colorManual = changes.colorManual.newValue;
      }
    }
  }

  setExtensionBadge(badgeText) {
    // Set extension badge to badge text
    chrome.action.setBadgeText({ text: badgeText.toString() });

    // Set extension badge background color
    if (badgeText != "") {
      chrome.action.setBadgeBackgroundColor({ color: classifier.getScoreColour(badgeText) });
    }
  }
}

let readabilly = new Readabilly();

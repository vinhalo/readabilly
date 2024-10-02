'use strict';

// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

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
    this.setExtensionIcon("·");
    chrome.tabs.query({ active: true, lastFocusedWindow: true }).then(function([tab]) {
      if (tab && tab.id) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: [ "contentScript.js" ]
        })  
      }
    });
  }

  onContentUpdate(request, sender, sendResponse) {
    // Update the icon with the rounded reading level
    var label = Math.round(request.readingLevel);
    label += "ʳ";

    this.setExtensionIcon(label);
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

  setExtensionIcon(label) {
    this.canvas = new OffscreenCanvas(32, 32);
    this.context = this.canvas.getContext('2d');

    // Set size depending on label length
    switch (label.length) {
      case 2:
        this.context.font = "30px Helvetica";
        break;
      case 3:
        this.context.font = "25px Helvetica";
        break;
      default:
        this.context.font = "18px Helvetica";
    }

    
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    if (this.colorManual == COLOR_DEFAULT) {
      this.context.fillStyle = "#606368";
      //this.context.fillStyle = (window.matchMedia('(prefers-color-scheme: dark)').matches ? "#f2f3f4" : "#606368");
    } else {
      this.context.fillStyle = "#" + this.colorManual;
    }
    this.context.fillText(label, 17, 17);

    chrome.action.setIcon({
      imageData: this.context.getImageData(0, 0, 32, 32)
    });
  }
}

let readabilly = new Readabilly();

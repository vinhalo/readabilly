import {goo} from './goo.js';
import {Toolbar} from './goo.toolbar.js';

const COLOR_DEFAULT = "606368";
const COLOR_SET = {
  'Light': "f2f3f4",
  'Dark': COLOR_DEFAULT
};

export class Options {
  constructor() {
    this.colorManual = COLOR_DEFAULT;

    chrome.storage.sync.get(null, function(data) {
      this.colorManual = data.colorManual;
      goo.refresh(this);
    }.bind(this));
  }

  render() {
    return `
      ${goo.render(Toolbar)}
      <div class="basic-page">
        <h2>Options</h2>
        <card>
          <div class="card-row">
            <label>Label color</label>
            <div class="content">
              ${this.renderColorSet()}
            </div>
          </div>
          <div class="card-row">
            <div class="content">
              <button class="card-button" ${goo.onClick(this.onClickSave.bind(this))}>Save options</button>
            </div>
          </div>
        </card>
      </div>
    `;
  }

  renderColorSet() {
    let htmlColorSet = "";
    if (this.colorManual == "") this.colorManual = COLOR_DEFAULT;

    for (let key in COLOR_SET) {
      htmlColorSet += `<option value="${COLOR_SET[key]}" ${COLOR_SET[key] == this.colorManual ? 'selected' : ''}>${key}</option>`;
    }

    return '<select id="colorManual">' + htmlColorSet + '</select>';
  }

  onClickSave() {
    let colorManual = document.getElementById('colorManual').value;
    chrome.storage.sync.set({'colorManual': colorManual});
    console.log("Saved colorManual: " + colorManual);
  }
}


import { Component } from 'preact';
import { html } from '../html.js'

export class Shortcuts extends Component {

  emulateKeyPress(key) {
    document.dispatchEvent(new KeyboardEvent('keydown', {key}));
    document.getElementById('shortcuts').focus();
  }

  render () {
    return html`
      <div id="shortcuts">
        <div>
          <p><span>'space'</span> = show/hide details</p><button onclick="${() => this.emulateKeyPress(' ')}" aria-label="Hide page details">Hide Details</button>
        </div>
        <div>
          <p><span>'enter'</span> = stop/start color pattern</p><button onclick="${() => this.emulateKeyPress('Enter')}" aria-label="Stop the color pattern">Stop Color Pattern</button>
        </div>
        <div>
          <p><span>'e'</span> = stop/start note equalizer</p><button onclick="${() => this.emulateKeyPress('e')}" aria-label="Stop the note equalizer">Stop Note Equalizer</button>
        </div>
          ${
            document.fullscreenEnabled
              ? html`<p><span>'f'</span> = enter/leave fullscreen</p><button  onclick="${() => this.emulateKeyPress('f')}" aria-label="Enter fullscreen mode">Enter Fullscreen</button>`
              : ''
          }
      </div>
    `
  }
}

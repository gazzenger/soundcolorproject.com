
import { Component } from 'preact';
import { html } from '../html.js'

export class Shortcuts extends Component {

  emulateKeyPress(key, e) {
    document.dispatchEvent(new KeyboardEvent('keydown', {key}));
    e.currentTarget.blur()
  }

  render () {
    return html`
      <div id="shortcuts">
        <div>
          <p><span>'space'</span> = show/hide details</p><button onclick="${(e) => this.emulateKeyPress(' ', e)}" aria-label="Hide page details">Hide Details</button>
        </div>
        <div>
          <p><span>'enter'</span> = stop/start color pattern</p><button onclick="${(e) => this.emulateKeyPress('Enter', e)}" aria-label="Stop the color pattern">Stop Color Pattern</button>
        </div>
        <div>
          <p><span>'e'</span> = stop/start note equalizer</p><button onclick="${(e) => this.emulateKeyPress('e', e)}" aria-label="Stop the note equalizer">Stop Note Equalizer</button>
        </div>
          ${
            document.fullscreenEnabled
              ? html`<p><span>'f'</span> = enter/leave fullscreen</p><button  onclick="${(e) => this.emulateKeyPress('f', e)}" aria-label="Enter fullscreen mode">Enter Fullscreen</button>`
              : ''
          }
      </div>
    `
  }
}

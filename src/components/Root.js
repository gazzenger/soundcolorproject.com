
import { Component } from 'preact';
import { html } from '../html.js'
import { injectAndObserve } from '../state/injectAndObserve.js'
import { PatternPicker } from './PatternPicker.js'
import { ColorRenderer } from './ColorRenderer.js'
import { DeviceChooser } from './DeviceChooser.js'
import { SoundDetails } from './SoundDetails.js'
import { Shortcuts } from './Shortcuts.js'
import { Footer } from './Footer.js'
import { MiniAnalyser } from './MiniAnalyser.js'
import { NoteEqualizer } from './NoteEqualizer.js'
import { Sliders } from './Sliders.js'

export const Root = injectAndObserve(
  ({ media, renderState }) => ({ media, renderState }),
  class Root extends Component {
    render ({ media, renderState: { showText } }) {
      if (media.ready) {
        return html`
          <div id="details-view">
            <${ColorRenderer}/>
            <h1 class="${showText ? '' : 'hidden'}">SoundColor</h1>
            <p class="${showText ? '' : 'hidden'}">Select a color pattern:</p>
            <div class="${showText ? '' : 'hidden'}">
              <${PatternPicker}/>
              <${SoundDetails}/>
              <${MiniAnalyser}/>
            </div>
            <${NoteEqualizer}/>
            <div id='spreader'/>
            <div class="${showText ? '' : 'hidden'}">
              <${DeviceChooser}/>
              <${Footer}>
                <${Shortcuts}/>
                <${Sliders}/>
              </${Footer}>
              <div id="info">
                <a aria-label="About Sound Color Project" href="/info.html">Info</a>
              </div>
            </div>
          </div>
        `
      } else if (media.error) {
        return html`
          <div id="details-view">
            <h1>SoundColor</h1>
            <p>Something went wrong while initializing your microphone.</p>
            <p>Please allow microphone access and refresh the page.</p>
          </div>
        `
      } else {
        return html`
          <div id="details-view">
            <h1>SoundColor</h1>
            <p>Please allow microphone access to begin.</p>
          </div>
        `
      }
    }
  }
)

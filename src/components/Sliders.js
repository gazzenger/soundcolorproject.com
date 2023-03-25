
import { action } from 'mobx'
import { Component } from 'preact';
import { html } from '../html.js'
import { injectAndObserve } from '../state/injectAndObserve.js'

export const Sliders = injectAndObserve(
  ({ patterns }) => ({ patterns }),
  class Sliders extends Component {
    _setters = {}
    setValue = (name) => {
      if (!this._setters[name]) {
        const func = (ev) => {
          this.props.patterns[name] = parseFloat(ev.target.value)
        }
        this._setters[name] = action(`set:${name}`, func)
      }

      return this._setters[name]
    }

    render ({ patterns: { transitionSpeed, noiseMultiplier, vibranceMultiplier, toneSigma, timeSmoothing } }) {
      return html`
        <div id="sliders">
          <label>
            Color Transition Speed
            <input
              type="range" min="0.1" step="0.01" max="1"
              value=${transitionSpeed}
              oninput=${this.setValue('transitionSpeed')}
            />
          </label>
          <label>
            Brightness
            <input
              type="range" min="0" step="0.01" max="5"
              value=${vibranceMultiplier}
              oninput=${this.setValue('vibranceMultiplier')}
            />
          </label>
          <label>
            Noise Desaturation
            <input
              type="range" min="-0.01" step="0.01" max="10"
              value=${noiseMultiplier}
              oninput=${this.setValue('noiseMultiplier')}
            />
          </label>
          <!-- <label>
            Required tone strength
            <input
              type="range" min="0" step="0.01" max="10"
              value=${toneSigma}
              oninput=${this.setValue('toneSigma')}
            />
          </label> -->
          <label>
            Time Smoothing
            <input
              type="range" min="0" step="0.01" max="0.99"
              value=${timeSmoothing}
              oninput=${this.setValue('timeSmoothing')}
            />
          </label>
        </div>
      `
    }
  },
)

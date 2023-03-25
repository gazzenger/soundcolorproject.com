
import { Component, Fragment } from 'preact';
import { html } from '../html.js'
import { injectAndObserve } from '../state/injectAndObserve.js'
import { resume } from '../audio/context.js'
import { ColorPicker } from './ColorPicker.js'

export const PatternPicker = injectAndObserve(
  ({ patterns }) => ({ patterns }),
  class PatternPicker extends Component {
    setPattern (pattern) {
      resume()
      this.props.patterns.currentPattern = pattern
    }

    renderCustomButtons () {
      if (this.props.patterns.currentPattern === 'custom') {
        return html`
          <div id="custom-colors">
            ${
              this.props.patterns.notes.map(note => html`
                <${ColorPicker} note=${note} />
              `)
            }
            <button
              type="button"
              role="button"
              aria-label="reset custom colors"
              onclick="${this.props.patterns.patternData.custom.colors.reset}"
            >
              Reset
            </button>
          </div>
        `
      }
    }

    render ({ patterns }) {
      const { currentPattern, patternData, monochrome } = patterns
      const possiblePatterns = Object.keys(patternData)
      return html`
        <${Fragment}>
          <div>
            ${
              possiblePatterns.map(pattern => html`
                <button type="button" onclick="${() => this.setPattern(pattern)}" disabled=${pattern === currentPattern}>
                  ${patternData[pattern].label}
                </button>
              `)
            }
            ${this.renderCustomButtons()}
          </div>
          <label id="monochromatic">
              <input
                type="checkbox"
                checked=${monochrome}
                onchange=${() => patterns.monochrome = !monochrome}
              />
              Monochromatic
          </label>
        </${Fragment}>
      `
    }
  },
)

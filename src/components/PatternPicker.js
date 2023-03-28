
import { Component, Fragment } from 'preact';
import { html } from '../html.js'
import { injectAndObserve } from '../state/injectAndObserve.js'
import { resume } from '../audio/context.js'
import { ColorPicker } from './ColorPicker.js'
import { referenceA0, noteToFrequency, setA0Reference } from '../audio/getNoteInformation.js'


export const PatternPicker = injectAndObserve(
  ({ patterns }) => ({ patterns }),
  class PatternPicker extends Component {

    state = {
      a0Reference: referenceA0, // default
      changingNote: null, // default
      changingNoteValue: null // default
    }
  
    //https://stackoverflow.com/a/53678175
    handleA0UpdateCall = (ev, note) => {
      // update a0Reference
      const a0Reference = setA0Reference(note, ev.target.value);
      this.setState({
        a0Reference,
        changingNote: note,
        changingNoteValue: ev.target.value,
      })
    }

    setPattern (pattern) {
      resume()
      this.props.patterns.currentPattern = pattern
    }

    renderCustomButtons (a0Reference, changingNote, changingNoteValue) {
      if (this.props.patterns.currentPattern === 'custom') {
        return html`
          <div id="custom-colors">
            ${
              this.props.patterns.notes.map(note => html`
                <${ColorPicker} note=${note} handleA0UpdateCall=${this.handleA0UpdateCall}
                frequency=${note === changingNote ? changingNoteValue : noteToFrequency(note, a0Reference)} />
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
      const { a0Reference, changingNote, changingNoteValue } = this.state
      const { currentPattern, patternData, monochrome } = patterns
      const possiblePatterns = Object.keys(patternData)
      return html`
        <${Fragment}>
          <div class="color-selector">
            <div>
              ${
                possiblePatterns.map(pattern => html`
                  <button type="button" onclick="${() => this.setPattern(pattern)}" disabled=${pattern === currentPattern}>
                    ${patternData[pattern].label}
                  </button>
                `)
              }
            </div>
            ${this.renderCustomButtons(a0Reference, changingNote, changingNoteValue)}
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

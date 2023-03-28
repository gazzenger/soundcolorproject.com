
import { Component } from 'preact';
import { html } from '../html.js'
import { injectAndObserve } from '../state/injectAndObserve.js'
import { context } from '../audio/context.js'
import { hexToHsv, hsvToHex } from '../color/colorHelpers.js'

import '@simonwep/pickr/dist/themes/nano.min.css';      // 'nano' theme
import Pickr from '@simonwep/pickr';

export const ColorPicker = injectAndObserve(
  ({ patterns }) => ({ patterns }),
  class ColorPicker extends Component {
    componentWillReceiveProps (newProps) {

    }
    createPicker = (el) => {
      if (this.picker) {
        return
      }
      const { patterns, note } = this.props
      const customColors = patterns.patternData.custom.colors
      this.picker = Pickr.create({
        el: el,
        theme: 'nano',
        useAsButton: true,
        default: hsvToHex(customColors[note]),
        components: {
          palette: false,
          preview: true,
          opacity: false,
          hue: true,
          interaction: {
            input: true,
            save: true,
            cancel: true,
          },
        },
      })
      
      this.picker.on('cancel', (instance) => {
        instance.hide()
      })

      this.picker.on('save', (color, instance) => {
        customColors[note] = hexToHsv(color.toHEXA().toString())
        instance.hide()
      })
    }

    render ({ note, patterns, handleA0UpdateCall, frequency  }) {
      const customColors = patterns.patternData.custom.colors
      const noteDesc = note.indexOf('#') > 1
        ? `${note[0]} Sharp`
        : note
      return html`
        <div>
          <button
            ref=${this.createPicker}
            type="button"
            role="button"
            aria-label="custom color for note ${noteDesc}"
            style="background: ${hsvToHex(customColors[note])}"
          >
            ${note}
          </button>
          <input type="number" min="20" max="20000" step="0.1" value="${frequency}" onchange=${(ev) => handleA0UpdateCall(ev, note)}/>
        </div>
      `
    }
  },
)
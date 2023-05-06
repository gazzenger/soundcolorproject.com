
import { Component } from 'preact';
import { html } from '../html.js'
import { injectAndObserve } from '../state/injectAndObserve.js'
import { hsvToHex } from '../color/colorHelpers.js'
import { patternsStore } from '../state/patternsStore.js'

import { context } from '../audio/context.js'
import { getFft, fftSize } from '../audio/analyzer.js'
import { getNoteInformation } from '../audio/getNoteInformation.js'

import * as d3 from "d3";

const BASE = 1.5
export const NoteEqualizer = injectAndObserve(
  ({ analysis, renderState }) => ({ analysis, renderState }),
  class NoteEqualizer extends Component {

    // map the note to the currently select color
    colorMapper(note, currentColorPattern) {
      return hsvToHex(currentColorPattern[note])
    }

    // convert density into a % height for a given note
    densityMapper(note, densities, minDensity, maxDensity) {
      return (densities.find(density => density.note === note)?.maxDensity - minDensity) / (maxDensity - minDensity) * 100 ;
    }

    render ({ analysis, renderState: { showNoteEqualizer } }) {
      if (!analysis.tones || !patternsStore.currentPattern || !showNoteEqualizer) {
        return; // required in order to force-re-render on update
      } 
      const fftData = getFft()
      const heights = [...fftData].map(dB => (BASE ** (dB / 10)) * 100)

      const currentColorPattern = patternsStore.patternData[patternsStore.currentPattern || 'custom'].colors

      const maxDensities = Array.from(
        d3.rollup(
          heights,
          v => ({
            maxDensity: d3.max(v, e => e),
          }),
          (_,i) => getNoteInformation((i+1) * (context.sampleRate) / fftSize).note
        ), ([note, data]) => ({
          note,
          maxDensity: data.maxDensity,
        })
      );

      const minDensity = d3.min(maxDensities, e => e.maxDensity);
      const maxDensity = d3.max(maxDensities, e => e.maxDensity);

      return html`
        <div id="note-equalizer">
          <table style="">
            <thead>
              <tr class="note-row">
                <th><div style="background-color: ${this.colorMapper('A', currentColorPattern)}; height:${this.densityMapper('A', maxDensities, minDensity, maxDensity)}%;"></div></th>
                <th><div style="background-color: ${this.colorMapper('A#', currentColorPattern)}; height:${this.densityMapper('A#', maxDensities, minDensity, maxDensity)}%;"></div></th>
                <th><div style="background-color: ${this.colorMapper('B', currentColorPattern)}; height:${this.densityMapper('B', maxDensities, minDensity, maxDensity)}%;"></div></th>
                <th><div style="background-color: ${this.colorMapper('C', currentColorPattern)}; height:${this.densityMapper('C', maxDensities, minDensity, maxDensity)}%;"></div></th>
                <th><div style="background-color: ${this.colorMapper('C#', currentColorPattern)}; height:${this.densityMapper('C#', maxDensities, minDensity, maxDensity)}%;"></div></th>
                <th><div style="background-color: ${this.colorMapper('D', currentColorPattern)}; height:${this.densityMapper('D', maxDensities, minDensity, maxDensity)}%;"></div></th>
                <th><div style="background-color: ${this.colorMapper('D#', currentColorPattern)}; height:${this.densityMapper('D#', maxDensities, minDensity, maxDensity)}%;"></div></th>
                <th><div style="background-color: ${this.colorMapper('E', currentColorPattern)}; height:${this.densityMapper('E', maxDensities, minDensity, maxDensity)}%;"></div></th>
                <th><div style="background-color: ${this.colorMapper('F', currentColorPattern)}; height:${this.densityMapper('F', maxDensities, minDensity, maxDensity)}%;"></div></th>
                <th><div style="background-color: ${this.colorMapper('F#', currentColorPattern)}; height:${this.densityMapper('F#', maxDensities, minDensity, maxDensity)}%;"></div></th>
                <th><div style="background-color: ${this.colorMapper('G', currentColorPattern)}; height:${this.densityMapper('G', maxDensities, minDensity, maxDensity)}%;"></div></th>
                <th><div style="background-color: ${this.colorMapper('G#', currentColorPattern)}; height:${this.densityMapper('G#', maxDensities, minDensity, maxDensity)}%;"></div></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A</td>
                <td>A#</td>
                <td>B</td>
                <td>C</td>
                <td>C#</td>
                <td>D</td>
                <td>D#</td>
                <td>E</td>
                <td>F</td>
                <td>F#</td>
                <td>G</td>
                <td>G#</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    }
  },
)

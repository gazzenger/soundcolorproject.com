
import { Component } from 'preact';
import { html } from '../html.js'
import { injectAndObserve } from '../state/injectAndObserve.js'
import { dBtoVolume } from '../audio/getAnalysis.js'
import { hsvToHex } from '../color/colorHelpers.js'
import { patternsStore } from '../state/patternsStore.js'

import { context } from '../audio/context.js'
// import { fftSize } from '../audio/miniAnalyser.js'
import { getFft, fftSize } from '../audio/analyzer.js'
import { getNoteInformation } from '../audio/getNoteInformation.js'

import * as d3 from "d3";

const BASE = 1.5
export const NoteEqualizer = injectAndObserve(
  ({ analysis }) => ({ analysis }),
  class NoteEqualizer extends Component {


    colorMapper(note, currentColorPattern) {
      return hsvToHex(currentColorPattern[note])
    }

    densityMapper(note, densities, minDensity, maxDensity) {
      return (densities.find(density => density.note === note)?.summedDensity - minDensity) / (maxDensity - minDensity) * 100 ;
    }

    render ({ analysis }) {
      if (!analysis.tones) {
        return; // required in order to force-re-render on update
      } 

      const currentColorPattern = patternsStore.patternData[patternsStore.currentPattern || 'custom'].colors

      // const { miniFft } = analysis

      // console.log(
      //   JSON.stringify(patternsStore.patternData[patternsStore.currentPattern || 'custom'].colors['C'], undefined, 2)
      // );

      // console.log(getFft())
      const miniFft = getFft()

      const heights = [...miniFft].map(dB => (BASE ** (dB / 10)) * 100)
      // const frequencies = heights.map((_,i) => (i+1) * (context.sampleRate) / fftSize)


      const summedDensities = Array.from(
        d3.rollup(
          heights,
          v => ({
            summedDensity: d3.sum(v, e => e),
          }),
          (_,i) => getNoteInformation(i+1).note
        ), ([note, data]) => ({
          note,
          summedDensity: data.summedDensity,
        })
      );

      const minDensity = d3.min(summedDensities, e => e.summedDensity);
      const maxDensity = d3.max(summedDensities, e => e.summedDensity);

      return html`
        <div id="note-equalizer">
          <table style="">
            <thead>
              <tr class="note-row">
                <th><div style="background-color: ${this.colorMapper('A', currentColorPattern)}; height:${this.densityMapper('A', summedDensities, minDensity, maxDensity)}%;"></div></th>
                <th><div style="background-color: ${this.colorMapper('A#', currentColorPattern)}; height:${this.densityMapper('A#', summedDensities, minDensity, maxDensity)}%;"></div></th>
                <th><div style="background-color: ${this.colorMapper('B', currentColorPattern)}; height:${this.densityMapper('B', summedDensities, minDensity, maxDensity)}%;"></div></th>
                <th><div style="background-color: ${this.colorMapper('C', currentColorPattern)}; height:${this.densityMapper('C', summedDensities, minDensity, maxDensity)}%;"></div></th>
                <th><div style="background-color: ${this.colorMapper('C#', currentColorPattern)}; height:${this.densityMapper('C#', summedDensities, minDensity, maxDensity)}%;"></div></th>
                <th><div style="background-color: ${this.colorMapper('D', currentColorPattern)}; height:${this.densityMapper('D', summedDensities, minDensity, maxDensity)}%;"></div></th>
                <th><div style="background-color: ${this.colorMapper('D#', currentColorPattern)}; height:${this.densityMapper('D#', summedDensities, minDensity, maxDensity)}%;"></div></th>
                <th><div style="background-color: ${this.colorMapper('E', currentColorPattern)}; height:${this.densityMapper('E', summedDensities, minDensity, maxDensity)}%;"></div></th>
                <th><div style="background-color: ${this.colorMapper('F', currentColorPattern)}; height:${this.densityMapper('F', summedDensities, minDensity, maxDensity)}%;"></div></th>
                <th><div style="background-color: ${this.colorMapper('F#', currentColorPattern)}; height:${this.densityMapper('F#', summedDensities, minDensity, maxDensity)}%;"></div></th>
                <th><div style="background-color: ${this.colorMapper('G', currentColorPattern)}; height:${this.densityMapper('G', summedDensities, minDensity, maxDensity)}%;"></div></th>
                <th><div style="background-color: ${this.colorMapper('G#', currentColorPattern)}; height:${this.densityMapper('G#', summedDensities, minDensity, maxDensity)}%;"></div></th>
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

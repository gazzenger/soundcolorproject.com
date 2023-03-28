
import { Component } from 'preact';
import { html } from '../html.js'
import { injectAndObserve } from '../state/injectAndObserve.js'

export const DeviceChooser = injectAndObserve(
  ({ media }) => ({ media }),
  class DeviceChooser extends Component {

    onDeviceChange = (ev) => {
      this.props.media.currentDeviceId = ev.target.value
    }

    updateAudioSelector = () => {
      this.props.media.audioMicSelected = !this.props.media.audioMicSelected
    }

    render ({ media }) {
      return html`
        <h1>Audio Selector</h1>
        <div class="audio-selector-container">
          <table>
            <colgroup>
              <col width="40%"/>
              <col width="10%"/>
              <col width="40%"/>
            </colgroup>
            <thead>
              <tr>
                <th>
                  <label>Audio File</label>
                </th>
                <th>
                  <label>Audio Selector</label>
                </th>
                <th>
                  <label>Microphone / Input Device</label>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <audio id="audio"
                  controls
                  src="SoundHelix-Song-1.mp3">
                    <a href="SoundHelix-Song-1.mp3">
                        Download audio
                    </a>
                  </audio>
                </td>
                <td id="device-chooser">
                  <div>
                    <label class="switch">
                      <input type="checkbox" checked="${media.audioMicSelected}" onchange=${this.updateAudioSelector} />
                      <span class="slider round"></span>
                    </label>
                  </div>
                </td>
                <td>
                  <select value=${media.currentDeviceId} onchange=${this.onDeviceChange} disabled=${media.audioMicSelected ? '' : 'disabled'}>
                  ${
                    media.possibleDevices.map(({ deviceId, label }) => html`
                      <option value=${deviceId}>${label}</option>
                    `)
                  }
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    }
  }
)

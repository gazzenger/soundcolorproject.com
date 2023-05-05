
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

    onFileSelect = () => {
      let reader = new FileReader();
      reader.onload = (e) => {
        const buffer = e.target.result
        const fileBlob = new Blob([new Uint8Array(buffer)])

        const fileURL = window.URL.createObjectURL(fileBlob)
        this.audioElement.src = fileURL
      };
      const [file] = this.inputElement.files
      reader.readAsArrayBuffer(file)
    }

    onLoopSelect = (ev) => {
      this.audioElement.loop = ev.target.checked
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
                  <div>
                    <audio id="audio"
                      ref="${audio => this.audioElement = audio}"
                      controls
                      src=""
                    >
                    </audio>
                    <div>
                      <input type="checkbox" id="loop" onchange=${this.onLoopSelect}/>
                      <label for="loop">Loop</label>
                    </div>
                  </div>
                  <input
                    type="file"
                    ref="${input => this.inputElement = input}"
                    id="upload"
                    onchange=${this.onFileSelect}
                    accept=".mp3,audio/*"
                  />
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

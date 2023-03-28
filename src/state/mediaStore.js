
import { observable, reaction } from 'mobx'
import { getUserMedia, getAudioSource } from '../audio/microphoneSource.js'
import { setSource as setSource1 } from '../audio/analyzer.js'
import { setSource as setSource2 } from '../audio/miniAnalyser.js'
import { context } from '../audio/context.js'

export const mediaStore = observable({
  ready: false,
  error: false,
  possibleDevices: [],
  currentDeviceId: 'default',
  audioMicSelected: true
})

async function setDevice (newDeviceId) {
  const newAudioSource = await getAudioSource(newDeviceId)
  setSource1(newAudioSource)
  setSource2(newAudioSource)

  // important to allow playback, but should only be used when MIC NOT SELECTED
  if (!mediaStore.audioMicSelected) {
    newAudioSource.connect(context.destination)
  }
}

async function selectAudioSource (audioMicSelected) {
  const deviceId = audioMicSelected ? mediaStore.currentDeviceId : null;
  setDevice(deviceId)
}

reaction(
  () => mediaStore.audioMicSelected,
  selectAudioSource,
)

reaction(
  () => mediaStore.currentDeviceId,
  setDevice,
)

getUserMedia().then(() => {
  mediaStore.ready = true
}).catch(() => {
  mediaStore.error = true
})

async function updateDevices() {
  const devices = await navigator.mediaDevices.enumerateDevices()
  const possibleDevices = devices.filter(({ kind }) => kind === 'audioinput')
  mediaStore.possibleDevices = possibleDevices
  const currentDeviceId = mediaStore.currentDeviceId
  if (!possibleDevices.some(({ deviceId }) => deviceId === currentDeviceId)) {
    mediaStore.currentDeviceId = 'default'
  } else {
    setDevice(mediaStore.currentDeviceId)
  }
}

navigator.mediaDevices.addEventListener('devicechange', updateDevices)
updateDevices()

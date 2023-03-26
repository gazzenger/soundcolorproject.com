
import { context, resumePromise } from './context.js'

export async function getUserMedia(deviceId = 'default') {
  return navigator.mediaDevices.getUserMedia({
    audio: {
      deviceId: { exact: await getDefaultOrDeviceId(deviceId) },
      echoCancellation: false,
      autoGainControl: false,
      noiseSuppression: false,
    }
  })
}

export async function getAudioSource(deviceId = 'default') {
  const stream = await getUserMedia(deviceId)
  await resumePromise
  return context.createMediaStreamSource(stream)
}

const getDefaultOrDeviceId = async (deviceId) => {
  if (deviceId && deviceId !== 'default') {
    return deviceId;
  }

  return await navigator.mediaDevices.enumerateDevices()
  .then(devices =>
    devices.find(({
      kind, label, groupId
    }) => label === "Monitor of Built-in Audio Analog Stereo" // Firefox
          || kind === "audiooutput" && groupId !== "default" // Chromium
    ))
    .deviceId
}
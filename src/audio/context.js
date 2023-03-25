import { renderStateStore } from '../state/renderStateStore.js'

export const sampleRate = 44100
export const context = new AudioContext({
  latencyHint: 'playback',
  sampleRate: sampleRate,
})

let onResume
export const resumePromise = new Promise(resolve => {
  onResume = resolve
})

let internalResumePromise
export function resume() {
  if (!internalResumePromise) {
    renderStateStore.showColors = true
    internalResumePromise = context.resume().then(onResume)
  }

  return internalResumePromise
}

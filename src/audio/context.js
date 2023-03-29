import { renderStateStore } from '../state/renderStateStore.js'

export const context = new AudioContext({
  latencyHint: 'playback',
})

let onResume
export const resumePromise = new Promise(resolve => {
  onResume = resolve
})

export async function initResumePromise () {
  await resumePromise // init the promise
  await resumePromise // return the resolved promise
}

let internalResumePromise
export function resume() {
  if (!internalResumePromise) {
    renderStateStore.showColors = true
    internalResumePromise = context.resume().then(onResume)
  }

  return internalResumePromise
}

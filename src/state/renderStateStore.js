
import { observable, action } from 'mobx'
import { resume } from '../audio/context.js'

import { patternsStore } from './patternsStore.js'

export const renderStateStore = observable({
  showText: true,
  showColors: false,
})

document.addEventListener('keydown', (ev) => {
  if (ev.key === ' ') {
    renderStateStore.showText = !renderStateStore.showText
  } else if (ev.key === 'Enter') {
    if (!patternsStore.currentPattern) {
      patternsStore.currentPattern = 'chakras'
    }
    renderStateStore.showColors = !renderStateStore.showColors
    resume()
  } else if (ev.key === 'f') {
    if (document.fullscreenEnabled) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        document.body.requestFullscreen({
          navigationUI: 'hide',
        })
      }
    }
  }
})

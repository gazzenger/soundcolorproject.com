
import { observable, action } from 'mobx'
import { getAnalysis } from '../audio/getAnalysis.js'
import { getMiniFft } from '../audio/miniAnalyser.js'

export const analysisStore = observable({
  noise: 0,
  tones: [],
  miniFft: [],
})

const setAnalysis = action('setAnalysis', ({ noise, tones }, miniFft) => {
  analysisStore.noise = noise
  analysisStore.tones = tones
  analysisStore.miniFft = miniFft
})

async function requestAnalysis() {
  setAnalysis(getAnalysis(), getMiniFft())
  requestAnimationFrame(requestAnalysis)
}

requestAnalysis()

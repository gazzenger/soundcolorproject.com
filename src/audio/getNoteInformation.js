
const NOTES = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']

const defaultReferenceA0 = 27.5;
export let referenceA0 = defaultReferenceA0;

export const noteToFrequency = (note, a0Reference=referenceA0) => {
  return +(Math.pow(2,4) * a0Reference * Math.pow(2,NOTES.indexOf(note)/12)).toFixed(2)
}

export const setA0Reference = (note, newFrequency) => {
  if (!newFrequency) {
    referenceA0 = defaultReferenceA0
  }
  else {
    referenceA0 = +(newFrequency / Math.pow(2,NOTES.indexOf(note)/12) / Math.pow(2,4)).toFixed(2)
  }
  return referenceA0
}

export function getNoteInformation (frequency) {
  let noteVal = Math.log2(frequency / referenceA0) * 12
  if (noteVal < 0) {
    noteVal += 12 * Math.floor((noteVal / -12) + 1)
  }
  const noteNumber = Math.round(noteVal)
  const cents = (noteVal - noteNumber) * 100
  const note = NOTES[(noteNumber + 12) % 12]
  const octave = Math.floor(noteNumber / 12)

  return {
    note: note,
    cents: cents,
    octave: octave,
  }
}

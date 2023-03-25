
import { Component } from 'preact';
import { html } from '../html.js'
import { injectAndObserve } from '../state/injectAndObserve.js'

export const TextHider = injectAndObserve(
  ({ renderState }) => ({ renderState }),
  class TextHider extends Component {
    render ({ children, renderState: { showText } }) {
      return html`
        <div id="text-hider" class="${showText ? '' : 'hidden'}">
          ${children}
        </div>
      `
    }
  }
)

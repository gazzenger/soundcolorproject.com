import { Component } from 'preact';
import { StateProvider } from '../state/StateProvider.js'
import { Root } from './Root.js'
import { html } from '../html.js'

export class App extends Component {
  render (props, state) {
    return html`
      <${StateProvider}>
        <${Root} />
      </${StateProvider}>
    `
  }
}

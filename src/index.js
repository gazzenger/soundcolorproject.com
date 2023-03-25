import { render } from 'preact';
import { App } from './components/app.js'
import { html } from './html.js'

render(html`<${App} />`, document.body, document.getElementById('root'))


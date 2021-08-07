import { html } from "./imports/Preact.js"
import ReactDOM from "react-dom"
// import "./common/NodejsCompatibilityPolyfill.js"

import { Editor } from "./components/Editor.js"

// it's like a Rube Goldberg machine
ReactDOM.render(html`<${Editor} />`, document.body)

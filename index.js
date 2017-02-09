require("babel-register")
const Immutable = require("immutable")

const installDevTools = require("immutable-devtools")
installDevTools(Immutable)

import init from "./src/main"

window.init = init

export default init
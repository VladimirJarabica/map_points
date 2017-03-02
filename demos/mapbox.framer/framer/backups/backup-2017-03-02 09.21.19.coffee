###
	Document: Map Concept
	Author: Martin Halik, @martinhalik
	Description: Trying to remove all that's neccessary and keep all functionality when it's usefull. Developing for huge user testing.
###

# replace map UI with pics
sketch = Framer.Importer.load("imported/prototype-light-map-form@1x")

###
VARIABLES
###
window["sketch"] = sketch

window["screenWidth"] = Framer.Device.screen.width
window["screenHeight"] = Framer.Device.screen.height

window["animationsTime"] = 1
window["animationsEasing"] = "spring(250,25,0)"
window["font"] = "Circular Pro, Helvetica"
window["fontSize1"] = "200px"
window["fontSize2"] = "100px"
window["fontSize3"] = "28px"
window["fontSize4"] = "24px"
window["fontSize5"] = "20px"
window["fontSize6"] = "16px"
window["fontSize7"] = "14px"
window["fontSize8"] = "12px"

window["kiwiPrimary300"] = "#b2f3eb"
window["kiwiPrimary400"] = "#00d7bd"
window["kiwiPrimary500"] = "#00d7bd"
window["kiwiPrimary600"] = "#08c1aa"
window["kiwiPrimary700"] = "#07b19c"

window["kiwiAccent300"] = "#64aaff"
window["kiwiAccent400"] = "#2a8aff"
window["kiwiAccent500"] = "#0073ff"
window["kiwiAccent600"] = "#0065e1"
window["kiwiAccent700"] = "#0051b5"

window["typoDark300"] = "#91a1b2"
window["typoDark400"] = "#5c6772"
window["typoDark500"] = "#444d55"
window["typoDark600"] = "#394148"
window["typoDark700"] = "#30373d"

window["mapBlue"] = "rgba(131,173,216,1)"

# equal 500 variant
window["kiwiPrimary"] = "#00d7bd"
window["kiwiAccent"] = "#0073ff"
window["typoDark"] = "#444d55"

###
UI
-----------------------------------------------
###
# Map
mapUI = require "mapUI"
formUI = require "formUI"

###
INTERACTIONS
-------------------------------------
###
mapInteractions = require "map-interactions"
formInteractions = require "form-interactions"

###
Views
-----------------------------------------------
###
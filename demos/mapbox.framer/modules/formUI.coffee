# White Background
mapOverlay = new Layer
	index: 4
	backgroundColor: "white"
	width: Screen.width
	height: Screen.height
	opacity: 0

# destination input
textInputLayer = new Layer
	width: 475
	height: 83
	y: 200
	x: Align.center
	backgroundColor: "#FFFFFF"
	shadowY: 10
	shadowBlur: 20
	shadowColor: "rgba(0,0,0,0.22)"
	borderRadius: "3px"
	style:
		padding: "0px 24px"

# This creates a text input and adds some styling in plain JS
inputElement = document.createElement("input")

styleInputElement = (status) ->
	if status == "big"
		inputElement.style.width = "#{textInputLayer.width-24}px"
		inputElement.style.height ="83px"
		inputElement.style.position = "relative"
		inputElement.style.left = "0px"
		inputElement.style["font"] = window["font"]
		inputElement.style["fontSize"] =  window["fontSize3"]
		inputElement.style["-webkit-user-select"] = "text"
		inputElement.style["outline"] = "none"
		inputElement.style["color"] = window["typoDark"]
		inputElement.style[":-webkit-input-placeholder"] = window["typoDark"]
		inputElement.style["backgroundColor"] = "transparent"
	else if status == "small"
		inputElement.style.width = "#{textInputLayer.width-24}px"
		inputElement.style.height ="43px"
		inputElement.style.position = "relative"
		inputElement.style.left = "-8px"
		inputElement.style["font"] = window["font"]
		inputElement.style["fontSize"] =  window["fontSize6"]
		inputElement.style["-webkit-user-select"] = "text"
		inputElement.style["outline"] = "none"
		inputElement.style["color"] = window["typoDark"]
		inputElement.style[":-webkit-input-placeholder"] = window["typoDark"]
		inputElement.style["backgroundColor"] = "transparent"

styleInputElement("big")

# Set the value, focus and listen for changes
inputElement.placeholder = "Where to?"
inputElement.value = ""
Utils.delay 1, ->
# 	inputElement.focus() TODO

# Place input layer on screen
textInputLayer._element.appendChild(inputElement)

# Position plane icon on input
ic_plane = window["sketch"].ic_plane
ic_plane.visible = true

ic_plane.parent = textInputLayer
ic_plane.x = Align.right(-20)
ic_plane.y = Align.center

ic_plane.oldX = ic_plane.x


# PlacePicker
placePickerList = new Layer
	parent: textInputLayer
	y: 96
	width: textInputLayer.width
	backgroundColor: "transparent"

# placepicker item template
placePickerItem = new Layer
	parent: placePickerList
	width: textInputLayer.width
	height: 52
	html: "Amsterdam"
	backgroundColor: "transparent"
	color: window["typoDark"]
	style:
		fontSize: window["fontSize3"]
		fontFamily: window["font"]
		paddingLeft: "24px"
		paddingTop: "12px"

placePickerItem.visible = false

# ------
# Style the name etc.
css = """
.city {
	font-family: Circular Pro, Helvetica;
	font-size: 24px;
	font-style: normal;
	font-stretch: normal;
	line-height: 0.83;
	letter-spacing: normal;
	text-align: left;
	color: #272b30;
}

.country {
	font-family: Circular Pro, Helvetica;
	font-size: 14px;
	font-weight: normal;
	font-style: normal;
	font-stretch: normal;
	line-height: 1.43;
	letter-spacing: normal;
	color: #79818a;
}

.flag {
	margin: 0px 8px;
	width: 24px;
	height: 17px;
	position: relative;
	top: 2px;
	box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.04), inset 0 1px 0 0 rgba(255, 255, 255, 0.12);
}

"""
Utils.insertCSS(css)


#--------------
# export to other modules
# mapLayer.id = "mapLayer"
window["formUI"] = {}
window.formUI.textInputLayer = textInputLayer
window.formUI.inputElement = inputElement
window.formUI.ic_plane = ic_plane
window.formUI.mapOverlay = mapOverlay
window.formUI.placePickerList = placePickerList
window.formUI.placePickerItem = placePickerItem

window.formUI.styleInputElement = styleInputElement

#--------------
# export to app.coffee
exports.textInputLayer = textInputLayer
exports.mapOverlay = mapOverlay
exports.placePickerList = placePickerList

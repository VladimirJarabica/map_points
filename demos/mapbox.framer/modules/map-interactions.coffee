# load only when map is downloaded
window.mapUI.map.on "load", ->

	window.mapUI.mapLayer.animate
		opacity: 1
	window.mapUI.homePoint.animate
		opacity: 1

# Switch between form and map
focusOnMap = new Animation window.formUI.textInputLayer,
	y: 10
	scaleY: 1.00
	height: 44
	width: 250
	x: (Screen.width-250) /2
	borderRadius: 3
	shadowY: 4
	shadowBlur: 8
	shadowSpread: 1
	shadowColor: "rgba(0,0,0,0.12)"
	opacity: 1
	options:
		time: 0.8
		curve: Spring(damping: 1)

focusOnInput = focusOnMap.reverse()

# modify input on map
makeInputSmall = () ->
	focusOnMap.start()

	window.formUI.styleInputElement("small")
	window.formUI.ic_plane.animate "small"

makeInputNormal = () ->
	focusOnInput.start()

	window.formUI.styleInputElement("big")
	window.formUI.ic_plane.animate "default"

# switch between input view and map view
window.mapUI.mapLayer.on Events.Click, ->
	if window.formUI.mapOverlay.opacity == 0
		window.mapUI.showMapControls(true)
		makeInputSmall()

window.formUI.textInputLayer.on Events.Click, ->
	if window.formUI.mapOverlay.opacity == 0
		window.mapUI.showMapControls(false)
		makeInputNormal()

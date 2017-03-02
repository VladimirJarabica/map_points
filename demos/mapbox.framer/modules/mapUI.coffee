# create map layer
mapLayer = new Layer
  width: window["screenWidth"]
  height: window["screenHeight"]
  backgroundColor: null
  opacity: 0

mapLayer.classList.add("mapLayer")
document.getElementsByClassName("mapLayer")[0].setAttribute("id", "mapLayer")

mapLayer.ignoreEvents = false

# put mapbox inside map layer
mapboxgl.accessToken = "pk.eyJ1IjoidmxhZG8xMiIsImEiOiJjaXJic3Bkd3owMDZhaWVubnRoYWx0MnBoIn0.CzQtrmXJS7bUgzb3BC7amQ";

map = new mapboxgl.Map({
  container: "mapLayer"
  style: "mapbox://styles/vlado12/ciz6dxio400de2rp80cx7ubik"
  center: [-73.9978, 40.7209]
  zoom: 2
})

# before map is loaded show ocean blue
mapBackground = new Layer
  backgroundColor: "rgba(131,173,216,1)"
  index: 1
  width: window["screenWidth"]
  height: window["screenHeight"]


# map controls
# window["sketch"] map elements
logo = window["sketch"].logo
bottomRightMenu = window["sketch"].bottomRight_menu
dates = window["sketch"].dates
passengers = window["sketch"].passengers
filters = window["sketch"].filters

elementsAboveMap = [logo, bottomRightMenu, dates, filters, passengers]
window["sketch"].Home.index = 0

mapControls = new Layer
	width: Screen.width
	height: Screen.height
	backgroundColor: "rgba(0,0,0,0)"

# placement of elements
for layer in elementsAboveMap
	layer.parent = mapControls

logo.x = Align.right(-16)
logo.y = Align.top(10)

bottomRightMenu.x = Align.right(-16)
bottomRightMenu.y = Align.bottom(-24)

filters.y = Align.bottom(-24)

# what layers are hidden when form is in the middle
hiddenWithForm = [dates, filters, passengers]

for layer in hiddenWithForm
	layer.states =
		hidden:
			opacity: 0
		shown:
			opacity: 1
	layer.states.animationOptions =
		time: window["animationsTime"]
		curve: window["animationsEasing"]

showMapControls = (boolean) ->
	if boolean
		for layer in hiddenWithForm
			layer.animate "shown"
	else
		for layer in hiddenWithForm
			layer.animate "hidden"

for layer in hiddenWithForm
	layer.stateSwitch "hidden"

###
My location
###

# place mark of my location on map
myLocation = []

# get user"s location
Utils.domLoadData("https://ipapi.co/json", (err, response) ->
	if err
		return
	data = JSON.parse response

	myLocation = data

	map.setCenter([parseInt(myLocation["longitude"]) , parseInt(myLocation["latitude"]) ])
	map.setZoom(2)

	createHomePoint()

	)

# create marker on map
homePoint = new Layer
	opacity: 0
	width: 40
	height: 40
	backgroundColor: null
homePoint.classList.add("marker")

# in index.html update mapbox to support Marker
createHomePoint = () ->
	el = document.getElementsByClassName("marker")[0]
	el.style.position = "relative"
	el.style.left = "-20px"
	el.style.top = "-20px"

	point = new mapboxgl.Marker(el).setLngLat([
		myLocation["longitude"]
		myLocation["latitude"]
	]).addTo map

# style marker
markerRadius = new Layer
	parent: homePoint
	width: 12
	height: 12
	borderRadius: 100
	x: Align.center
	y: Align.center
	backgroundColor: null
	opacity: 1.00
	borderWidth: 1
	borderColor: "rgba(66,121,255,1)"

markerRadiusStable = new Layer
	parent: homePoint
	width: 24
	height: 24
	borderRadius: 100
	x: Align.center
	y: Align.center
	backgroundColor: "#1C6CCD"
	opacity: 0.2


markerPoint = new Layer
	parent: homePoint
	width: 12
	height: 12
	x: Align.center
	y: Align.center
	borderRadius: 12
	backgroundColor: "#1C6CCD"
	shadowY: 1
	shadowBlur: 2
	shadowColor: "rgba(0,0,0,0.2)"

# animate marker
pulsing = new Animation markerRadius,
	width: 36
	height: 36
# 	scale: 4
	opacity: 0
# 	originX: 0
# 	originY: 0
	x: 2
	y: 2
	options:
		time: 3
		curve: "ease-in-out"
		repeat: 100

pulsing.start()

#--------------
# export to other modules
# mapLayer.id = "mapLayer"
window["mapUI"] = {}
window.mapUI.mapLayer = mapLayer
window.mapUI.map = map
window.mapUI.homePoint = homePoint
window.mapUI.showMapControls = showMapControls

#--------------
# export to app.coffee
exports.mapLayer = mapLayer
exports.map = map
exports.mapBackground = mapBackground

exports.homePoint = homePoint
exports.markerRadius = markerRadius
exports.markerRadiusStable = markerRadiusStable
exports.markerPoint = markerPoint

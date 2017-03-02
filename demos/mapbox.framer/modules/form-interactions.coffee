###
states
###
window.formUI.placePickerList.states =
	default:
		opacity: 1
	hidden:
		opacity: 0
window.formUI.placePickerList.states.animationOptions =
	time: window["animationsTime"]
	curve: window["animationsEasing"]

window.formUI.mapOverlay.states =
	default:
		opacity: 0
	shown:
		opacity: 1
window.formUI.mapOverlay.animationOptions =
	time: window["animationsTime"]
	curve: window["animationsEasing"]

window.formUI.textInputLayer.states =
	default:
		backgroundColor: window.formUI.textInputLayer.backgroundColor
		shadowY: window.formUI.textInputLayer.shadowY
		shadowBlur: window.formUI.textInputLayer.shadowBlur
		shadowColor: window.formUI.textInputLayer.shadowColor
		borderRadius: window.formUI.textInputLayer.borderRadius
	typing:
		backgroundColor: "#F3F3F4"
		shadowY: 0
		shadowBlur: 0
		shadowColor: "rgba(0,0,0,0.22)"
window.formUI.textInputLayer.animationOptions =
	time: window["animationsTime"]
	curve: window["animationsEasing"]

window.formUI.textInputLayer.stateSwitch "default"

# Enables plane animation there and forth
window.formUI.ic_plane.states =
	default:
		x: window.formUI.ic_plane.oldX
		y: 24
		opacity: 1
		scale: 1
	hide:
		x: window.formUI.ic_plane.oldX + 20
		opacity: 0
	small:
		x: 210
		y: 2
		scale: 0.5

window.formUI.ic_plane.animationOptions =
	time: window["animationsTime"]
	curve: window["animationsEasing"]

###
# PlacePicker
-------------
###

# variables
destinations = {}
destinations.recommendations = []
destinations.countriesOnly = []
destinations.airportsOnly = []
destinations.citiesOnly = []

# Get country name this way: countries['countryCode']
countries = JSON.parse Utils.domLoadDataSync "data/countries.json"


# get top 3 cities, airports belown
sortPlacesBasedOnType = (data) ->

	# clear past results
	destinations.countriesOnly = []
	destinations.airportsOnly = []
	destinations.citiesOnly = []

	data.forEach (item) ->
		switch item.type
			when 0
				destinations.airportsOnly.push item
			when 1
				destinations.countriesOnly.push item
			when 2
				destinations.citiesOnly.push item
		return

	destinations.citiesOnly.sort (x, y) ->
	  if x.population <= y.population
	    return 1
	  return -1

# update prices in list
updatePlacepickerItems = (dataArray) ->
	if window.formUI.placePickerList.children[3]
		for i in [0...3]
			if dataArray[i]
				#print dataArray[i]["value"]
				window.formUI.placePickerList.children[i+1].html = "<span class='city'>" + dataArray[i]["value"] + "</span>" + "<img src='images/flags/#{dataArray[i]["parentId"]}@2x.png' class='flag'>" + "<span class='country'>" + countries[dataArray[i]["parentId"]] + "</span>"
			else
				#print "emptying"
				window.formUI.placePickerList.children[i+1].html = " "
	else
		createPlacePickerItems(destinations.citiesOnly)

# get places from API
updatePlaces = (value, autofillBool) ->
	Utils.domLoadData("https://api.skypicker.com/places?term=#{value}&locale=us", (err, response) ->
		if err
			return
		data = JSON.parse response
		data = data.slice(0, 20)

		# for i in [0...data.length]
		#	print data[i]["value"] + ", " + data[i]["parentId"]

		# if we don't have new recommendations keep old one.
		if Object.keys(data).length != 0
			destinations.recommendations = data

			sortPlacesBasedOnType(destinations.recommendations)
			if autofillBool
				autofillInput(destinations.citiesOnly)

			updatePlacepickerItems(destinations.citiesOnly)
	)

# create placepicker items
createPlacePickerItems = (dataArray) ->
	for i in [0...3]
		placePickerItem = window.formUI.placePickerItem.copy()
		placePickerItem.visible = true
		placePickerItem.parent = window.formUI.placePickerList
		placePickerItem.y = i * placePickerItem.height
		placePickerItem.html = "<span class='city'>" + dataArray[i]["value"] + "</span>" + "<img src='images/flags/#{dataArray[i]["parentId"]}@2x.png' class='flag'>" + "<span class='country'>" + countries[dataArray[i]["parentId"]] + "</span>"

#
autofillInput = (dataArray) ->
	# handles no recommendations error
	if !dataArray[0]
		return
	# check if autofill contains what you've written
	else if dataArray[0]["value"].toLowerCase().indexOf( window.formUI.inputElement.value.toLowerCase() ) > -1
		currentLength = window.formUI.inputElement.value.length
		window.formUI.inputElement.value = dataArray[0]["value"] + ", " + countries[dataArray[0]["parentId"]]
		newLength = window.formUI.inputElement.value.length

		createSelection(window.formUI.inputElement, currentLength, newLength)

# mark autofilled text
createSelection = (field, start, end) ->
  if field.createTextRange
    selRange = field.createTextRange()
    selRange.collapse true
    selRange.moveStart 'character', start
    selRange.moveEnd 'character', end
    selRange.select()
    field.focus()
  else if field.setSelectionRange
    field.focus()
    field.setSelectionRange start, end
  else if typeof field.selectionStart != 'undefined'
    field.selectionStart = start
    field.selectionEnd = end
    field.focus()
  return


###
Events
-----------
###

# what user have written and execute actions
window.formUI.inputElement.onkeyup = (e) ->
	# escape key
	if e.keyCode == 27 && this.value == ""
			# window.formUI.ic_plane.x = window.formUI.ic_plane.oldX
			window.formUI.ic_plane.animate "default"

			window.formUI.mapOverlay.animate "default"
			window.formUI.textInputLayer.animate "default"

			window.formUI.placePickerList.animate "hidden"
	# enter key
	else if e.keyCode == 13 && this.value != ""
		#print "transforming"
	else
		# arrows, etc. -> do nothing
		if e.keyCode == ( 37 || 38 || 39 || 40)
			return
		else
			window.formUI.ic_plane.animate "hide"

			window.formUI.mapOverlay.animate "shown"
			window.formUI.textInputLayer.animate "typing"

			window.formUI.placePickerList.animate "default"
			if e.keyCode == 8 or ( e.keyCode == 68 && e.ctrlKey == true )
				updatePlaces(this.value,false)
			else
				updatePlaces(this.value,true)

// exports.mapPoints = "ABC"

// const fetch = require("./fetch")
console.log("mapPoints 1")
const mapPointsInit = require('../../../lib/main')
console.log(mapPointsInit.default)

mapPointsInit.default({
	placesUrl: 'https://api.skypicker.com/places?v=2&active=0&type=2&locale=en',
	pricesUrl: 'https://api.skypicker.com/flights?v=2&sort=quality&asc=1&locale=en&daysInDestinationFrom=&daysInDestinationTo=&affilid=&children=0&infants=0&flyFrom=52-0-250km&to=anywhere&featureName=aggregateResults&dateFrom=09/02/2017&dateTo=09/03/2017&typeFlight=oneway&returnFrom=&returnTo=&one_per_date=0&oneforcity=1&wait_for_refresh=0&adults=1&limit=1000',
	fromLatLngToDivPixel: function(latLng) { return map.project(latLng)},
}, map)
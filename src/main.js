import Immutable from "immutable"
import installDevTools from "immutable-devtools"

installDevTools(Immutable)

import 'whatwg-fetch'

import placesStoreInit from "./places/index"
import placesIndexInit from "./placesIndex/index"
import pointsInit from "./points/index"

const init = (options) => {
	const placesStore = placesStoreInit(options)
	
	const placesIndex = placesIndexInit(placesStore)
	
	const pointsByBounds = pointsInit(placesIndex, options.fromLatLngToDivPixel)
	
	// const bounds = {
	// 	wLng: -23.708007812499147,
	// 	eLng: 27.708007812499716,
	// 	sLat: 33.31128667182389,
	// 	nLat: 62.405151805436134
	// }
	//
	// window.placesIndex = placesIndex
	// window.bounds = bounds
	// window.pointsByBounds = pointsByBounds
	return {
		pointsByBounds,
		placesStore,
	}
}
export default init
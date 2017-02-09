import placesStoreInit from "./places/index"

import placesIndexInit from "./placesIndex/index"

const init = (options) => {
	const placesStore = placesStoreInit(options)
	
	const placesIndex = placesIndexInit(placesStore)
	
	const bounds = {
		wLng: -23.708007812499147,
		eLng: 27.708007812499716,
		sLat: 33.31128667182389,
		nLat: 62.405151805436134
	}
	
	window.placesIndex = placesIndex
	window.bounds = bounds
}
export default init
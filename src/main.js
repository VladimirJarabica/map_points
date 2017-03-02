import initPlacesStore from "./placesStore"
import initView from "./view"

const init = (opts, map) => {
	const { placesStore, pointsByBounds } = initPlacesStore(opts)
	
	initView(placesStore, pointsByBounds, map)
}

export default init
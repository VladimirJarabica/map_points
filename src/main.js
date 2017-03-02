import initPlacesStore from "./placesStore"

const init = (opts, map) => {
	const { placesStore, getByBounds } = initPlacesStore(opts)
	
	placesStore.subscribe(() => {
		console.log("subscribe", placesStore.getState())
	})
}

export default init

// export const placesStore = initPlacesStore
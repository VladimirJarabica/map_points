import placesStoreInit from "./places/index"

const init = (options) => {
	const placesStore = placesStoreInit(options)
	
	const { dispatch } = placesStore
	
	dispatch()
	
}
export default init
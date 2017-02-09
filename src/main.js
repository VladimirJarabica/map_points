import placesStore from "./places/index"

const init = (options) => {
	const { placesUrl } = options
	
	const places = placesStore({
		placesUrl,
	})
	
}
export default init
import MapPlacesIndex from "../tools/MapPlacesIndex"

const index = (placesStore) => {
	const mapPlacesIndex = new MapPlacesIndex()
	
	placesStore.subscribe(() => {
		const { places } = placesStore.getState()
		
		mapPlacesIndex.insertPlaces(places)
	})
	
	return mapPlacesIndex
}

export default index
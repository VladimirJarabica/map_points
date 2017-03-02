import Quadtree from "./quadtree.js"

function boundsToSelector(latLngBounds) {
	var bounds = latLngBounds
	//if map has 180lng view scope than show only the bigger part of shown planet
	if (bounds.eLng - bounds.wLng < 0) {
		// what is more far from zero, it is smaller
		if (Math.abs(bounds.eLng) > Math.abs(bounds.wLng)) {
			bounds.eLng = 180
		} else {
			bounds.wLng = -180
		}
	}
	return {
		x: bounds.wLng + 180,
		y: bounds.sLat + 90,
		w: bounds.eLng - bounds.wLng,
		h: bounds.nLat - bounds.sLat,
	}
}


/* structure to store mapPlaces and index them by id and by lat lng position */
export default class MapPlacesIndex {
	constructor() {
		this.mapPlacesIndex = {}
		this.pointsTree = Quadtree.init({
			x: 0,
			y: 0,
			w: 360,
			h: 180,
			maxDepth: 12,
		})
	}
	
	getById(id) {
		if (this.mapPlacesIndex[id]) {
			return this.mapPlacesIndex[id].mapPlace
		}
		return null
	}
	
	getByBounds(latLngBounds) {
		var treeSelector = boundsToSelector(latLngBounds)
		var mapPlaces = []
		this.pointsTree.retrieve(treeSelector, (item) => {
			mapPlaces.push(item.mapPlace)
		})
		return mapPlaces
	}
	
	insertPlaces(mapPlaces) {
		mapPlaces.forEach((mapPlace) => {
			if (!this.mapPlacesIndex[mapPlace.id]) {
				var placeContainer = {
					x: mapPlace.lng + 180,
					y: mapPlace.lat + 90,
					w: 0.00001,
					h: 0.00001,
					mapPlace: mapPlace,
				}
				this.mapPlacesIndex[mapPlace.id] = placeContainer
				this.pointsTree.insert(placeContainer)
			} else if (this.mapPlacesIndex[mapPlace.id].mapPlace.get("price") !== mapPlace.get("price")) {
				this.mapPlacesIndex[mapPlace.id].mapPlace = mapPlace
			}
		})
	}
	
	cleanPrices() {
		Object.keys(this.mapPlacesIndex).forEach((id) => {
			this.mapPlacesIndex[id].mapPlace = this.mapPlacesIndex[id].mapPlace.set("price", null)
		})
	}
	/**
	 * Edit
	 * @param mapPlace
	 */
	editPlace(mapPlace) {
		var ref = this.mapPlacesIndex[mapPlace.id]
		ref.x = mapPlace.lng + 180
		ref.y = mapPlace.lat + 90
		ref.mapPlace = mapPlace
	}
}

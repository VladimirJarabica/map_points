import MapPlacesIndex from "../tools/MapPlacesIndex"
import Quadtree from "../tools/quadtree"

import Point from "./Point"

const flatBounds = bounds => {
	const ne = bounds.getNorthEast()
	const sw = bounds.getSouthWest()
	return {
		wLng: sw.lng,
		eLng: ne.lng,
		sLat: sw.lat,
		nLat: ne.lat,
	}
}

const isCollide = (a, b) => {
	return !(
		((a.y + a.h) < (b.y)) ||
		(a.y > (b.y + b.h)) ||
		((a.x + a.w) < b.x) ||
		(a.x > (b.x + b.w))
	)
}

class Points {
	constructor() {
		this.pricePoints = []
		this.noPricePoints = []
	}
}

const labelsBoundsTree = Quadtree.init({
	x: 0,
	y: 0,
	w: 5000, //big enough screen size
	h: 5000,
	maxDepth: 20,
})

const populationComparator = (a, b) => {
	return (a.population < b.population) ? 1 : -1
}

const getSortedPlaces = (places, placesToSlice = 150) => {
	const withPrice = []
	const withoutPrice = []
	
	places.forEach(place => {
		if (place.price) {
			withPrice.push(place)
		} else {
			withoutPrice.push(place)
		}
	})
	
	let ret = []
	
	withPrice.sort(populationComparator)
	if (withPrice.length < placesToSlice) {
		withoutPrice.sort(populationComparator)
		ret = withPrice.concat(withoutPrice).slice(0, placesToSlice)
	} else {
		ret = withPrice.slice(0, placesToSlice)
	}
	
	return ret
}

const mapPlacesToPoints = (mapPlaces, fromLatLngToDivPixel) => {
	let places = mapPlaces
	labelsBoundsTree.clear()
	if (!places || places.length <= 0) return []
	
	const points = new Points()
	
	places.forEach((mapPlace) => {
		let latLng = {lat: mapPlace.lat, lng: mapPlace.lng}
		const position = fromLatLngToDivPixel(latLng)
		
		const item = {
			x: position.x,
			y: position.y,
			w: 80,
			h: 50,
		}
		
		let collisions = 0
		labelsBoundsTree.retrieve(item, (checkingItem) => {
			if (isCollide(item, checkingItem)) {
				collisions += 1
			}
		})
		
		let showFullLabel = false
		if (collisions === 0) {
			showFullLabel = true
			item.mapPlace = mapPlace
			labelsBoundsTree.insert(item)
		}
		
		const point = new Point({
			mapPlace: mapPlace,
			position: position,
			showFullLabel: showFullLabel,
		})
		if (point.showFullLabel) {
			if (point.mapPlace.price) {
				point.type = "PRICE_POINT"
				points.pricePoints.push(point)
			} else {
				point.type = "NO_PRICE_POINT"
				points.noPricePoints.push(point)
			}
		}
	})
	return points
}

const init = (placesIndex: MapPlacesIndex, fromLatLngToDivPixel) => (bounds, placesToSlice) => {
	const places = placesIndex.getByBounds(flatBounds(bounds))
	
	const sortedPlaces = getSortedPlaces(places, placesToSlice)
	
	const points = mapPlacesToPoints(sortedPlaces, fromLatLngToDivPixel)
	
	return points
}

export default init
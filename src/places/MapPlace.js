import { Record } from "immutable"

const MapPlaceRecord = Record({
	id: "",
	lat: null,
	lng: null,
	population: null,
	rank: null,
	value: "",
	price: null,
	pricePerKm: null,
	distance: null,
})

export default class MapPlace extends MapPlaceRecord {
	
	static fromPlainJS(plain) {
		return new MapPlace(plain)
	}
}
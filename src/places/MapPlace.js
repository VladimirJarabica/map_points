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
	// id: string;
	// lat: number;
	// lng: number;
	// population: number;
	// rank: number;
	// value: string;
	// price: number;
	// pricePerKm: number;
	// distance: number;
	
	static fromPlainJS(plain): MapPlace {
		return new MapPlace(plain)
	}
}
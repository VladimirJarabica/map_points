import Point from "./Point"

export default class NoPricePoint extends Point {
	constructor(map, point) {
		const el = document.createElement("div")
		super(el, point)
		el.className += " NoPricePoint"
		el.innerHTML = point.mapPlace.value
		
		this.setLngLat([point.mapPlace.lng, point.mapPlace.lat])
		this.addTo(map)
	}
	unmount() {
		this.remove()
	}
}

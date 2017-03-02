export default class PricePoint extends mapboxgl.Marker {
	constructor(el, point) {
		el.className = "marker"
		super(el)
		
		this.point = point
	}
	unmount() {
		this.remove()
	}
}

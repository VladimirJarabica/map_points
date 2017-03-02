import Point from "./Point"

export default class NoPricePoint extends Point {
	constructor(map, point) {
		// Wrapper for centering point
		const marker = document.createElement("div")
		marker.className = "no-price-point-marker"
		
		const wrapper = document.createElement("div")
		wrapper.className = "no-price-point-wrapper"
		marker.appendChild(wrapper)
		
		// Price point for :after triangle
		const noPricePoint = document.createElement("div")
		noPricePoint.className = "no-price-point"
		wrapper.appendChild(noPricePoint)
		
		// Actual content for being over the :after triangle in Price point
		const element = document.createElement("div")
		element.className = "no-price-point-content"
		noPricePoint.appendChild(element)
		
		const icon = document.createElement("i")
		icon.className = "no-price-point-icon "
		icon.className += "spIcon ic_location_city"
		
		element.appendChild(icon)
		
		// Back content for being over the :after triangle in Price point
		const elementBack = document.createElement("div")
		elementBack.className = "no-price-point-content-back"
		noPricePoint.appendChild(elementBack)
		
		const title = document.createElement("div")
		title.className = "no-price-point-title"
		title.innerHTML = "<span>" + point.mapPlace.value + "</span>"
		elementBack.appendChild(title)
		super(marker, point)
		
		this.setLngLat([point.mapPlace.lng, point.mapPlace.lat])
		this.addTo(map)
	}
	unmount() {
		this.remove()
	}
}

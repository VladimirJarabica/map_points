import Point from "./Point"

export default class PricePoint extends Point {
	constructor(map, point) {
		const marker = document.createElement("div")
		marker.className = "price-point-marker"
		
		const wrapper = document.createElement("div")
		wrapper.className = "price-point-wrapper"
		// TODO: Highlighted
		if (point.type === "HIGHLIGHTED") {
			wrapper.className += " highlighted"
		}
		marker.appendChild(wrapper)
		
		// Price point for :after triangle
		const pricePoint = document.createElement("div")
		pricePoint.className = "price-point"
		wrapper.appendChild(pricePoint)
		
		// Actual content for being over the :after triangle in Price point
		const element = document.createElement("div")
		element.className = "price-point-content"
		pricePoint.appendChild(element)
		// Back content for being over the :after triangle in Price point
		const elementBack = document.createElement("div")
		elementBack.className = "price-point-content-back"
		pricePoint.appendChild(elementBack)
		
		const title = document.createElement("div")
		title.className = "price-point-title"
		title.innerHTML = "<span>" + point.mapPlace.value + "</span>"
		elementBack.appendChild(title)
		super(marker, point)
		
		if (point.mapPlace.price) {
			let priceFront = document.createElement("div")
			priceFront.className = "price-point-price"
			priceFront.innerHTML = "<span>" + point.mapPlace.price + "&#8202;$</span>"
			
			element.appendChild(priceFront)
			
			let priceBack = document.createElement("div")
			priceBack.className = "price-point-price"
			priceBack.innerHTML = "<span>" + point.mapPlace.price + "&#8202;$</span>"
			
			elementBack.appendChild(priceBack)
		}
		window.point = point
		
		this.setLngLat([point.mapPlace.lng, point.mapPlace.lat])
		this.addTo(map)
	}
	unmount() {
		this.remove()
	}
}

import { List } from "immutable"

import NoPricePoint from "./NoPricePoint"
import PricePoint from "./PricePoint"

export default class Points {
	constructor(map) {
		this.map = map
		this.pointMarkers = List()
	}
	
	updatePoints(newPoints) {
		this.pointMarkers.forEach(marker => {
			marker.remove()
		})
		this.pointMarkers = List()
		newPoints.noPricePoints.forEach(point => {
			const marker = new NoPricePoint(this.map, point)
			this.pointMarkers = this.pointMarkers.push(marker)
		})
		newPoints.pricePoints.forEach(point => {
			const marker = new PricePoint(this.map, point)
			this.pointMarkers = this.pointMarkers.push(marker)
		})
	}
	
}

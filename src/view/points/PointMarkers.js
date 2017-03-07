import { Map, List } from "immutable"

import NoPricePoint from "./NoPricePoint"
import PricePoint from "./PricePoint"

export default class Points {
	constructor(map) {
		this.map = map
		this.pointMarkers = Map()
	}
	
	updatePoints(newPoints, showNoPricePoints = false) {
		if (!newPoints.noPricePoints && !newPoints.pricePoints) {
			return
		}
		
		let oldMarkers = this.pointMarkers
		this.pointMarkers = new Map()
		
		
		newPoints.pricePoints.forEach(point => {
			const pointId = point.getId() + "-price-point"
			if(oldMarkers.has(pointId)) {
				const marker = oldMarkers.get(pointId)
				oldMarkers = oldMarkers.delete(pointId)
				this.pointMarkers = this.pointMarkers.set(pointId, marker)
			} else {
				const marker = new PricePoint(this.map, point)
				this.pointMarkers = this.pointMarkers.set(pointId, marker)
			}
		})
		if (showNoPricePoints) {
			newPoints.noPricePoints.forEach(point => {
				const pointId = point.getId() + "-no-price-point"
				if(oldMarkers.has(pointId)) {
					const marker = oldMarkers.get(pointId)
					oldMarkers = oldMarkers.delete(pointId)
					this.pointMarkers = this.pointMarkers.set(pointId, marker)
				} else {
					const marker = new NoPricePoint(this.map, point)
					this.pointMarkers = this.pointMarkers.set(pointId, marker)
				}
			})
		}
		oldMarkers.forEach(marker => {
			marker.remove()
		})
	}
}

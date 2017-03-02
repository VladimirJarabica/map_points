import PointMarkers from "./points/PointMarkers"

const NUMBER_OF_POINTS = 150

const initView = (placesStore, pointsByBounds, map) => {
	const pointsMarkers = new PointMarkers(map)
	placesStore.subscribe(() => {
		const points = pointsByBounds(map.getBounds(), NUMBER_OF_POINTS)
		pointsMarkers.updatePoints(points)
	})
	
	map.on("moveend", () => {
		const points = pointsByBounds(map.getBounds(), NUMBER_OF_POINTS)
		pointsMarkers.updatePoints(points)
	})
	
	map.on("zoomend", () => {
		const points = pointsByBounds(map.getBounds(), NUMBER_OF_POINTS)
		pointsMarkers.updatePoints(points)
	})
}

export default initView

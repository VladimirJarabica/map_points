export default class Point {
	constructor(plain) {
		this.mapPlace = plain.mapPlace
		this.position = plain.position
		this.showFullLabel = plain.showFullLabel
		this.hover = plain.hover
	}
	
	/* expects that there is no two labels with same place */
	getId() {
		return this.mapPlace.id
	}
}

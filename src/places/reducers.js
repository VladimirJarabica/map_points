import { Map } from "immutable"

import { combineReducers } from "redux"

const setPricesToPlaces = (places, prices) => {
	let pricesMap = Map()
	prices.forEach(price => {
		const savedPrice = pricesMap.get(price.get("toId"))
		if (!savedPrice || price.get("price") < savedPrice) {
			pricesMap = pricesMap.set(price.get("toId"), price.get("price"))
		}
	})
	
	console.log("pricesMap", pricesMap)
	
	return places.map(placeItem => {
		// Delete prices
		let place = placeItem.set("price", null)
		if (pricesMap.has(place.get("id"))) {
			return place.set("price", pricesMap.get(place.get("id")))
		}
		return place
	})
}

const places = (state = Map(), action) => {
	switch (action.type) {
		case "SET_PLACES":
			return action.places
		case "SET_PRICES_TO_PLACES":
			return setPricesToPlaces(state, action.prices)
		default: return state
	}
}

// const state = (state = Map(), action) => {
// 	switch (action.type) {
// 		case "SET_PRICES_URL"
// 	}
// }

export default combineReducers({
	places,
	// state,
})
import { Map } from "immutable"
import MapPlace from "./MapPlace"
import { createStore, applyMiddleware } from "redux"
import thunk from 'redux-thunk'

import reducers from "./reducers"
import { fetchPrices } from "./actions"


const placesStore = (options) => {
	const store = createStore(
		reducers,
		applyMiddleware(thunk)
	)
	
	const { placesUrl, pricesUrl } = options
	fetch(placesUrl)
		.then(response => {
			response.json()
				.then(json => {
					const places = Map(json.map(place => ([place.id, MapPlace.fromPlainJS(place)])))
					console.log("places", places)
					store.dispatch({
						type: "SET_PLACES",
						places,
					})
					window.store = store
					
					store.dispatch(fetchPrices(pricesUrl))
					
					// fetch(pricesUrl)
					// 	.then(response => {
					// 		response.json()
					// 			.then(json => {
					// 				const prices = List(json.data.map(dataToPrice))
					// 				console.log("prices", prices)
					// 				store.dispatch({
					// 					type: "SET_PRICES_TO_PLACES",
					// 					prices,
					// 				})
					// 			})
					// 	})
				})
		})
	
	return store
}
console.log("placesStore to export", placesStore)
export default placesStore
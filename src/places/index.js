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
					store.dispatch({
						type: "SET_PLACES",
						places,
					})
					window.store = store
					
					store.dispatch(fetchPrices(pricesUrl))
				})
		})
	
	return store
}

export default placesStore
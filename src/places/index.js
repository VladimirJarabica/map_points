import { Map, List } from "immutable"
import MapPlace from "./MapPlace"
import { createStore, applyMiddleware } from "redux"
import thunk from 'redux-thunk'

import reducers from "./reducers"

async function fetchData(placesUrl, pricesUrl, dispatch) {
	const placesResponse = await fetch(placesUrl)
	const placesData = await placesResponse.json()

	const places = Map(placesData.map(place => ([place.id, MapPlace.fromPlainJS(place)])))
	dispatch({
		type: "SET_PLACES",
		places,
	})

	const pricesResponse = await fetch(pricesUrl)
	const pricesData = await pricesResponse.json()

	const prices = List(pricesData.data.map(dataToPrice))
	dispatch({
		type: "SET_PRICES_TO_PLACES",
		prices,
	})

}


const placesStore = (options) => {
	const store = createStore(
		reducers,
		applyMiddleware(thunk)
	)

	const { placesUrl, pricesUrl } = options

	fetchData(placesUrl, pricesUrl, store.dispatch)

	return store
}

export default placesStore

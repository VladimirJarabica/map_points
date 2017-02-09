import { List, Map } from "immutable"

const dataToPrice = price => (Map({
	toId: price.mapIdto,
	price: price.price,
}))

export const fetchPrices = (pricesUrl) => {
	return (dispatch) => {
		return fetch(pricesUrl)
			.then(response => response.json())
			.then(json =>
			
				dispatch({
					type: "SET_PRICES_TO_PLACES",
					prices: List(json.data.map(dataToPrice)),
				})
			)
	}
}
// import { createStore } from "redux"
//
// const reducers = () => {}
//
// const store = createStore(reducers)


const places = (options) => {
	const { placesUrl } = options
	fetch(placesUrl)
		.then(response => {
			response.json()
				.then(json => {
					console.log("json data", json)
				})
		})
}

export default places
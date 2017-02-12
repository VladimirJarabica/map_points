import { List, Map } from "immutable"

const dataToPrice = price => (Map({
	toId: price.mapIdto,
	price: price.price,
}))

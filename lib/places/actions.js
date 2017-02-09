"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.fetchPrices = undefined;

var _immutable = require("immutable");

var dataToPrice = function dataToPrice(price) {
	return (0, _immutable.Map)({
		toId: price.mapIdto,
		price: price.price
	});
};

var fetchPrices = exports.fetchPrices = function fetchPrices(pricesUrl) {
	return function (dispatch) {
		return fetch(pricesUrl).then(function (response) {
			return response.json();
		}).then(function (json) {
			return dispatch({
				type: "SET_PRICES_TO_PLACES",
				prices: (0, _immutable.List)(json.data.map(dataToPrice))
			});
		});
	};
};
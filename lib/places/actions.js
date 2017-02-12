"use strict";

var _immutable = require("immutable");

var dataToPrice = function dataToPrice(price) {
	return (0, _immutable.Map)({
		toId: price.mapIdto,
		price: price.price
	});
};
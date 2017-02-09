"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _index = require("./places/index");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("./placesIndex/index");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("./points/index");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var init = function init(options) {
	var placesStore = (0, _index2.default)(options);

	var placesIndex = (0, _index4.default)(placesStore);

	var pointsByBounds = (0, _index6.default)(placesIndex, options.fromLatLngToDivPixel);

	// const bounds = {
	// 	wLng: -23.708007812499147,
	// 	eLng: 27.708007812499716,
	// 	sLat: 33.31128667182389,
	// 	nLat: 62.405151805436134
	// }
	//
	// window.placesIndex = placesIndex
	// window.bounds = bounds
	// window.pointsByBounds = pointsByBounds
	return {
		pointsByBounds: pointsByBounds,
		placesStore: placesStore
	};
};
exports.default = init;
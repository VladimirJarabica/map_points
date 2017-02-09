"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _MapPlacesIndex = require("../tools/MapPlacesIndex");

var _MapPlacesIndex2 = _interopRequireDefault(_MapPlacesIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var index = function index(placesStore) {
	var mapPlacesIndex = new _MapPlacesIndex2.default();

	placesStore.subscribe(function () {
		var _placesStore$getState = placesStore.getState(),
		    places = _placesStore$getState.places;

		mapPlacesIndex.insertPlaces(places);
	});

	return mapPlacesIndex;
};

exports.default = index;
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _placesStore = require("./placesStore");

var _placesStore2 = _interopRequireDefault(_placesStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var init = function init(opts, map) {
	var _initPlacesStore = (0, _placesStore2.default)(opts),
	    placesStore = _initPlacesStore.placesStore,
	    getByBounds = _initPlacesStore.getByBounds;

	placesStore.subscribe(function () {
		console.log("subscribe", placesStore.getState());
	});
};

exports.default = init;

// export const placesStore = initPlacesStore
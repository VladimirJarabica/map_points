"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _placesStore = require("./placesStore");

var _placesStore2 = _interopRequireDefault(_placesStore);

var _view = require("./view");

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var init = function init(opts, map) {
	var _initPlacesStore = (0, _placesStore2.default)(opts),
	    placesStore = _initPlacesStore.placesStore,
	    pointsByBounds = _initPlacesStore.pointsByBounds;

	(0, _view2.default)(placesStore, pointsByBounds, map);
};

exports.default = init;
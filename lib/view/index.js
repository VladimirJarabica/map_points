"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _PointMarkers = require("./points/PointMarkers");

var _PointMarkers2 = _interopRequireDefault(_PointMarkers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NUMBER_OF_POINTS = 150;

var initView = function initView(placesStore, pointsByBounds, map) {
	var pointsMarkers = new _PointMarkers2.default(map);
	placesStore.subscribe(function () {
		var points = pointsByBounds(map.getBounds(), NUMBER_OF_POINTS);
		pointsMarkers.updatePoints(points);
	});

	map.on("moveend", function () {
		var points = pointsByBounds(map.getBounds(), NUMBER_OF_POINTS);
		pointsMarkers.updatePoints(points);
	});

	map.on("zoomend", function () {
		var points = pointsByBounds(map.getBounds(), NUMBER_OF_POINTS);
		pointsMarkers.updatePoints(points);
	});
};

exports.default = initView;
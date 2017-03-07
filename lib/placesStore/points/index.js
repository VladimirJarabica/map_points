"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _MapPlacesIndex = require("../tools/MapPlacesIndex");

var _MapPlacesIndex2 = _interopRequireDefault(_MapPlacesIndex);

var _quadtree = require("../tools/quadtree");

var _quadtree2 = _interopRequireDefault(_quadtree);

var _Point = require("./Point");

var _Point2 = _interopRequireDefault(_Point);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var flatBounds = function flatBounds(bounds) {
	var ne = bounds.getNorthEast();
	var sw = bounds.getSouthWest();
	return {
		wLng: sw.lng,
		eLng: ne.lng,
		sLat: sw.lat,
		nLat: ne.lat
	};
};

var isCollide = function isCollide(a, b) {
	return !(a.y + a.h < b.y || a.y > b.y + b.h || a.x + a.w < b.x || a.x > b.x + b.w);
};

var Points = function Points() {
	_classCallCheck(this, Points);

	this.pricePoints = [];
	this.noPricePoints = [];
};

var labelsBoundsTree = _quadtree2.default.init({
	x: 0,
	y: 0,
	w: 5000, //big enough screen size
	h: 5000,
	maxDepth: 20
});

var populationComparator = function populationComparator(a, b) {
	return a.population < b.population ? 1 : -1;
};

var getSortedPlaces = function getSortedPlaces(places) {
	var placesToSlice = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 150;

	var withPrice = [];
	var withoutPrice = [];

	places.forEach(function (place) {
		if (place.price) {
			withPrice.push(place);
		} else {
			withoutPrice.push(place);
		}
	});

	var ret = [];

	withPrice.sort(populationComparator);
	if (withPrice.length < placesToSlice) {
		withoutPrice.sort(populationComparator);
		ret = withPrice.concat(withoutPrice).slice(0, placesToSlice);
	} else {
		ret = withPrice.slice(0, placesToSlice);
	}

	return ret;
};

var mapPlacesToPoints = function mapPlacesToPoints(mapPlaces, fromLatLngToDivPixel) {
	var places = mapPlaces;
	labelsBoundsTree.clear();
	if (!places || places.length <= 0) return [];

	var points = new Points();

	places.forEach(function (mapPlace) {
		var latLng = { lat: mapPlace.lat, lng: mapPlace.lng };
		var position = fromLatLngToDivPixel(latLng);

		var item = {
			x: position.x,
			y: position.y,
			w: 80,
			h: 50
		};

		var collisions = 0;
		labelsBoundsTree.retrieve(item, function (checkingItem) {
			if (isCollide(item, checkingItem)) {
				collisions += 1;
			}
		});

		var showFullLabel = false;
		if (collisions === 0) {
			showFullLabel = true;
			item.mapPlace = mapPlace;
			labelsBoundsTree.insert(item);
		}

		var point = new _Point2.default({
			mapPlace: mapPlace,
			position: position,
			showFullLabel: showFullLabel
		});
		if (point.showFullLabel) {
			if (point.mapPlace.price) {
				point.type = "PRICE_POINT";
				points.pricePoints.push(point);
			} else {
				point.type = "NO_PRICE_POINT";
				points.noPricePoints.push(point);
			}
		}
	});
	return points;
};

var init = function init(placesIndex, fromLatLngToDivPixel) {
	return function (bounds, placesToSlice) {
		var places = placesIndex.getByBounds(flatBounds(bounds));

		var sortedPlaces = getSortedPlaces(places, placesToSlice);

		var points = mapPlacesToPoints(sortedPlaces, fromLatLngToDivPixel);

		return points;
	};
};

exports.default = init;
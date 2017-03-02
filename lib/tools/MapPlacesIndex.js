"use strict";

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _defineProperty = require("babel-runtime/core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; (0, _defineProperty2.default)(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _quadtree = require("./quadtree.js");

var _quadtree2 = _interopRequireDefault(_quadtree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function boundsToSelector(latLngBounds) {
	var bounds = latLngBounds;
	//if map has 180lng view scope than show only the bigger part of shown planet
	if (bounds.eLng - bounds.wLng < 0) {
		// what is more far from zero, it is smaller
		if (Math.abs(bounds.eLng) > Math.abs(bounds.wLng)) {
			bounds.eLng = 180;
		} else {
			bounds.wLng = -180;
		}
	}
	return {
		x: bounds.wLng + 180,
		y: bounds.sLat + 90,
		w: bounds.eLng - bounds.wLng,
		h: bounds.nLat - bounds.sLat
	};
}

/* structure to store mapPlaces and index them by id and by lat lng position */

var MapPlacesIndex = function () {
	function MapPlacesIndex() {
		_classCallCheck(this, MapPlacesIndex);

		this.mapPlacesIndex = {};
		this.pointsTree = _quadtree2.default.init({
			x: 0,
			y: 0,
			w: 360,
			h: 180,
			maxDepth: 12
		});
	}

	_createClass(MapPlacesIndex, [{
		key: "getById",
		value: function getById(id) {
			if (this.mapPlacesIndex[id]) {
				return this.mapPlacesIndex[id].mapPlace;
			}
			return null;
		}
	}, {
		key: "getByBounds",
		value: function getByBounds(latLngBounds) {
			var treeSelector = boundsToSelector(latLngBounds);
			var mapPlaces = [];
			this.pointsTree.retrieve(treeSelector, function (item) {
				mapPlaces.push(item.mapPlace);
			});
			return mapPlaces;
		}
	}, {
		key: "insertPlaces",
		value: function insertPlaces(mapPlaces) {
			var _this = this;

			mapPlaces.forEach(function (mapPlace) {
				if (!_this.mapPlacesIndex[mapPlace.id]) {
					var placeContainer = {
						x: mapPlace.lng + 180,
						y: mapPlace.lat + 90,
						w: 0.00001,
						h: 0.00001,
						mapPlace: mapPlace
					};
					_this.mapPlacesIndex[mapPlace.id] = placeContainer;
					_this.pointsTree.insert(placeContainer);
				} else if (_this.mapPlacesIndex[mapPlace.id].mapPlace.get("price") !== mapPlace.get("price")) {
					_this.mapPlacesIndex[mapPlace.id].mapPlace = mapPlace;
				}
			});
		}
	}, {
		key: "cleanPrices",
		value: function cleanPrices() {
			var _this2 = this;

			(0, _keys2.default)(this.mapPlacesIndex).forEach(function (id) {
				_this2.mapPlacesIndex[id].mapPlace = _this2.mapPlacesIndex[id].mapPlace.set("price", null);
			});
		}
		/**
   * Edit
   * @param mapPlace
   */

	}, {
		key: "editPlace",
		value: function editPlace(mapPlace) {
			var ref = this.mapPlacesIndex[mapPlace.id];
			ref.x = mapPlace.lng + 180;
			ref.y = mapPlace.lat + 90;
			ref.mapPlace = mapPlace;
		}
	}]);

	return MapPlacesIndex;
}();

exports.default = MapPlacesIndex;
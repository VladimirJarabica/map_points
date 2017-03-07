"use strict";

var _defineProperty = require("babel-runtime/core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; (0, _defineProperty2.default)(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require("immutable");

var _NoPricePoint = require("./NoPricePoint");

var _NoPricePoint2 = _interopRequireDefault(_NoPricePoint);

var _PricePoint = require("./PricePoint");

var _PricePoint2 = _interopRequireDefault(_PricePoint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Points = function () {
	function Points(map) {
		_classCallCheck(this, Points);

		this.map = map;
		this.pointMarkers = (0, _immutable.Map)();
	}

	_createClass(Points, [{
		key: "updatePoints",
		value: function updatePoints(newPoints) {
			var _this = this;

			var showNoPricePoints = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			if (!newPoints.noPricePoints && !newPoints.pricePoints) {
				return;
			}

			var oldMarkers = this.pointMarkers;
			this.pointMarkers = new _immutable.Map();

			newPoints.pricePoints.forEach(function (point) {
				var pointId = point.getId() + "-price-point";
				if (oldMarkers.has(pointId)) {
					var marker = oldMarkers.get(pointId);
					oldMarkers = oldMarkers.delete(pointId);
					_this.pointMarkers = _this.pointMarkers.set(pointId, marker);
				} else {
					var _marker = new _PricePoint2.default(_this.map, point);
					_this.pointMarkers = _this.pointMarkers.set(pointId, _marker);
				}
			});
			if (showNoPricePoints) {
				newPoints.noPricePoints.forEach(function (point) {
					var pointId = point.getId() + "-no-price-point";
					if (oldMarkers.has(pointId)) {
						var marker = oldMarkers.get(pointId);
						oldMarkers = oldMarkers.delete(pointId);
						_this.pointMarkers = _this.pointMarkers.set(pointId, marker);
					} else {
						var _marker2 = new _NoPricePoint2.default(_this.map, point);
						_this.pointMarkers = _this.pointMarkers.set(pointId, _marker2);
					}
				});
			}
			oldMarkers.forEach(function (marker) {
				marker.remove();
			});
		}
	}]);

	return Points;
}();

exports.default = Points;
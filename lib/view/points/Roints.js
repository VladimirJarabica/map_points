"use strict";

var _defineProperty = require("babel-runtime/core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Points = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; (0, _defineProperty2.default)(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require("immutable");

var _NoPricePoint = require("./NoPricePoint");

var _NoPricePoint2 = _interopRequireDefault(_NoPricePoint);

var _PricePoint = require("./PricePoint");

var _PricePoint2 = _interopRequireDefault(_PricePoint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Points = exports.Points = function () {
	function Points(map) {
		_classCallCheck(this, Points);

		this.map = map;
		this.pointMarkers = (0, _immutable.List)();
	}

	_createClass(Points, [{
		key: "updatePoints",
		value: function updatePoints(newPoints) {
			var _this = this;

			this.pointMarkers.forEach(function (marker) {
				marker.remove();
			});
			this.pointMarkers = (0, _immutable.List)();
			newPoints.noPricePoints.forEach(function (point) {
				var marker = new _NoPricePoint2.default(_this.map, point);
				_this.pointMarkers = _this.pointMarkers.push(marker);
			});
			newPoints.pricePoints.forEach(function (point) {
				var marker = new _PricePoint2.default(_this.map, point);
				_this.pointMarkers = _this.pointMarkers.push(marker);
			});
		}
	}]);

	return Points;
}();
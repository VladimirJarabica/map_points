"use strict";

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _setPrototypeOf = require("babel-runtime/core-js/object/set-prototype-of");

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _defineProperty = require("babel-runtime/core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; (0, _defineProperty2.default)(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Point2 = require("./Point");

var _Point3 = _interopRequireDefault(_Point2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass; }

var PricePoint = function (_Point) {
	_inherits(PricePoint, _Point);

	function PricePoint(map, point) {
		_classCallCheck(this, PricePoint);

		var marker = document.createElement("div");
		marker.className = "price-point-marker";

		var wrapper = document.createElement("div");
		wrapper.className = "price-point-wrapper";
		// TODO: Highlighted
		if (point.type === "HIGHLIGHTED") {
			wrapper.className += " highlighted";
		}
		marker.appendChild(wrapper);

		// Price point for :after triangle
		var pricePoint = document.createElement("div");
		pricePoint.className = "price-point";
		wrapper.appendChild(pricePoint);

		// Actual content for being over the :after triangle in Price point
		var element = document.createElement("div");
		element.className = "price-point-content";
		pricePoint.appendChild(element);
		// Back content for being over the :after triangle in Price point
		var elementBack = document.createElement("div");
		elementBack.className = "price-point-content-back";
		pricePoint.appendChild(elementBack);

		var title = document.createElement("div");
		title.className = "price-point-title";
		title.innerHTML = "<span>" + point.mapPlace.value + "</span>";
		elementBack.appendChild(title);

		var _this = _possibleConstructorReturn(this, (PricePoint.__proto__ || (0, _getPrototypeOf2.default)(PricePoint)).call(this, marker, point));

		if (point.mapPlace.price) {
			var priceFront = document.createElement("div");
			priceFront.className = "price-point-price";
			priceFront.innerHTML = "<span>" + point.mapPlace.price + "</span>";

			element.appendChild(priceFront);

			var priceBack = document.createElement("div");
			priceBack.className = "price-point-price";
			priceBack.innerHTML = "<span>" + point.mapPlace.price + "</span>";

			elementBack.appendChild(priceBack);
		}
		window.point = point;

		_this.setLngLat([point.mapPlace.lng, point.mapPlace.lat]);
		_this.addTo(map);
		return _this;
	}

	_createClass(PricePoint, [{
		key: "unmount",
		value: function unmount() {
			this.remove();
		}
	}]);

	return PricePoint;
}(_Point3.default);

exports.default = PricePoint;
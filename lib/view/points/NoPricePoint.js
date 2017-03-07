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

var NoPricePoint = function (_Point) {
	_inherits(NoPricePoint, _Point);

	function NoPricePoint(map, point) {
		_classCallCheck(this, NoPricePoint);

		// Wrapper for centering point
		var marker = document.createElement("div");
		marker.className = "no-price-point-marker";

		var wrapper = document.createElement("div");
		wrapper.className = "no-price-point-wrapper";
		marker.appendChild(wrapper);

		// Price point for :after triangle
		var noPricePoint = document.createElement("div");
		noPricePoint.className = "no-price-point";
		wrapper.appendChild(noPricePoint);

		// Actual content for being over the :after triangle in Price point
		var element = document.createElement("div");
		element.className = "no-price-point-content";
		noPricePoint.appendChild(element);

		var icon = document.createElement("i");
		icon.className = "no-price-point-icon ";
		icon.className += "spIcon ic_location_city";

		element.appendChild(icon);

		// Back content for being over the :after triangle in Price point
		var elementBack = document.createElement("div");
		elementBack.className = "no-price-point-content-back";
		noPricePoint.appendChild(elementBack);

		var title = document.createElement("div");
		title.className = "no-price-point-title";
		title.innerHTML = "<span>" + point.mapPlace.value + "</span>";
		elementBack.appendChild(title);

		var _this = _possibleConstructorReturn(this, (NoPricePoint.__proto__ || (0, _getPrototypeOf2.default)(NoPricePoint)).call(this, marker, point));

		_this.setLngLat([point.mapPlace.lng, point.mapPlace.lat]);
		_this.addTo(map);
		return _this;
	}

	_createClass(NoPricePoint, [{
		key: "unmount",
		value: function unmount() {
			this.remove();
		}
	}]);

	return NoPricePoint;
}(_Point3.default);

exports.default = NoPricePoint;
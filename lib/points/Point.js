"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = function () {
	function Point(plain) {
		_classCallCheck(this, Point);

		this.mapPlace = plain.mapPlace;
		this.position = plain.position;
		this.showFullLabel = plain.showFullLabel;
		this.hover = plain.hover;
	}

	/* expects that there is no two labels with same place */


	_createClass(Point, [{
		key: "getId",
		value: function getId() {
			return this.mapPlace.id;
		}
	}]);

	return Point;
}();

exports.default = Point;
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var fetchData = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(placesUrl, pricesUrl, dispatch) {
		var placesResponse, placesData, places, pricesResponse, pricesData, prices;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.next = 2;
						return fetch(placesUrl);

					case 2:
						placesResponse = _context.sent;
						_context.next = 5;
						return placesResponse.json();

					case 5:
						placesData = _context.sent;
						places = (0, _immutable.Map)(placesData.map(function (place) {
							return [place.id, _MapPlace2.default.fromPlainJS(place)];
						}));

						dispatch({
							type: "SET_PLACES",
							places: places
						});

						_context.next = 10;
						return fetch(pricesUrl);

					case 10:
						pricesResponse = _context.sent;
						_context.next = 13;
						return pricesResponse.json();

					case 13:
						pricesData = _context.sent;
						prices = (0, _immutable.List)(pricesData.data.map(dataToPrice));

						dispatch({
							type: "SET_PRICES_TO_PLACES",
							prices: prices
						});

					case 16:
					case "end":
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	return function fetchData(_x, _x2, _x3) {
		return _ref.apply(this, arguments);
	};
}();

var _immutable = require("immutable");

var _MapPlace = require("./MapPlace");

var _MapPlace2 = _interopRequireDefault(_MapPlace);

var _redux = require("redux");

var _reduxThunk = require("redux-thunk");

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reducers = require("./reducers");

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var dataToPrice = function dataToPrice(price) {
	return (0, _immutable.Map)({
		toId: price.mapIdto,
		price: price.price
	});
};

var placesStore = function placesStore(options) {
	var store = (0, _redux.createStore)(_reducers2.default, (0, _redux.applyMiddleware)(_reduxThunk2.default));

	var placesUrl = options.placesUrl,
	    pricesUrl = options.pricesUrl;


	fetchData(placesUrl, pricesUrl, store.dispatch);

	return store;
};

exports.default = placesStore;
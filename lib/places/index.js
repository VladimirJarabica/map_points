"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _immutable = require("immutable");

var _MapPlace = require("./MapPlace");

var _MapPlace2 = _interopRequireDefault(_MapPlace);

var _redux = require("redux");

var _reduxThunk = require("redux-thunk");

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reducers = require("./reducers");

var _reducers2 = _interopRequireDefault(_reducers);

var _actions = require("./actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var placesStore = function placesStore(options) {
	var store = (0, _redux.createStore)(_reducers2.default, (0, _redux.applyMiddleware)(_reduxThunk2.default));

	var placesUrl = options.placesUrl,
	    pricesUrl = options.pricesUrl;

	fetch(placesUrl).then(function (response) {
		response.json().then(function (json) {
			var places = (0, _immutable.Map)(json.map(function (place) {
				return [place.id, _MapPlace2.default.fromPlainJS(place)];
			}));
			store.dispatch({
				type: "SET_PLACES",
				places: places
			});
			window.store = store;

			store.dispatch((0, _actions.fetchPrices)(pricesUrl));
		});
	});

	return store;
};

exports.default = placesStore;
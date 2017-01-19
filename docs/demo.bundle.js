webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _infact = __webpack_require__(2);
	
	var _demo = __webpack_require__(168);
	
	var _demo2 = _interopRequireDefault(_demo);
	
	__webpack_require__(190);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_infact.ReactDOM.render(_infact.React.createElement(_demo2.default, null), document.getElementById('root'));

/***/ },

/***/ 2:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// // infact = inferno + react
	
	if (false) {
	    exports.Inferno = require('inferno');
	    exports.ReactDOM = exports.Inferno;
	    exports.Component = require('inferno-component');
	    exports.PropTypes = {};
	}
	if (true) {
	    exports.React = __webpack_require__(3);
	    exports.ReactDOM = __webpack_require__(30);
	    exports.Component = exports.React.Component;
	    exports.PropTypes = exports.React.PropTypes;
	}

/***/ },

/***/ 168:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _infact = __webpack_require__(2);
	
	var _infact2 = __webpack_require__(169);
	
	var _infact3 = _interopRequireDefault(_infact2);
	
	var _pigeonCluster = __webpack_require__(175);
	
	var _pigeonCluster2 = _interopRequireDefault(_pigeonCluster);
	
	var _infact4 = __webpack_require__(183);
	
	var _infact5 = _interopRequireDefault(_infact4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Demo = function (_Component) {
	    _inherits(Demo, _Component);
	
	    function Demo() {
	        _classCallCheck(this, Demo);
	
	        return _possibleConstructorReturn(this, (Demo.__proto__ || Object.getPrototypeOf(Demo)).apply(this, arguments));
	    }
	
	    _createClass(Demo, [{
	        key: 'render',
	        value: function render() {
	            return _infact.React.createElement(
	                'div',
	                { style: { textAlign: 'center', marginTop: 50 } },
	                _infact.React.createElement(
	                    _infact3.default,
	                    { center: [50.879, 4.6997],
	                        zoom: 11,
	                        width: 600,
	                        height: 400 },
	                    _infact.React.createElement(
	                        _pigeonCluster2.default,
	                        null,
	                        _infact.React.createElement(_infact5.default, { key: 'm1', anchor: [50.889, 4.6997], payload: 1 }),
	                        _infact.React.createElement(_infact5.default, { key: 'm2', anchor: [50.879, 4.7], payload: 1 }),
	                        _infact.React.createElement(_infact5.default, { key: 'm3', anchor: [50.869, 4.72], payload: 1 })
	                    )
	                )
	            );
	        }
	    }]);
	
	    return Demo;
	}(_infact.Component);
	
	exports.default = Demo;

/***/ },

/***/ 169:
/***/ function(module, exports, __webpack_require__) {

	if (false) {
	  module.exports = require('./lib/inferno/index.js')
	}
	if (true) {
	  module.exports = __webpack_require__(170)
	}


/***/ },

/***/ 170:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();
	
	var _infact = __webpack_require__(171);
	
	var _parentPosition = __webpack_require__(172);
	
	var _parentPosition2 = _interopRequireDefault(_parentPosition);
	
	var _parentHasClass = __webpack_require__(173);
	
	var _parentHasClass2 = _interopRequireDefault(_parentHasClass);
	
	var _debounce = __webpack_require__(174);
	
	var _debounce2 = _interopRequireDefault(_debounce);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	function _toConsumableArray(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }return arr2;
	  } else {
	    return Array.from(arr);
	  }
	}
	
	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}
	
	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}
	
	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}
	
	var ANIMATION_TIME = 300;
	var DIAGONAL_THROW_TIME = 1500;
	var SCROLL_PIXELS_FOR_ZOOM_LEVEL = 150;
	var MIN_DRAG_FOR_THROW = 40;
	var CLICK_TOLERANCE = 2;
	var DOUBLE_CLICK_DELAY = 300;
	var DEBOUNCE_DELAY = 60;
	
	var NOOP = function () {};
	
	function wikimedia(x, y, z) {
	  var retina = typeof window !== 'undefined' && window.devicePixelRatio >= 2;
	  return 'https://maps.wikimedia.org/osm-intl/' + z + '/' + x + '/' + y + (retina ? '@2x' : '') + '.png';
	}
	
	// https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames
	var lng2tile = function (lon, zoom) {
	  return (lon + 180) / 360 * Math.pow(2, zoom);
	};
	var lat2tile = function (lat, zoom) {
	  return (1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom);
	};
	
	function tile2lng(x, z) {
	  return x / Math.pow(2, z) * 360 - 180;
	}
	
	function tile2lat(y, z) {
	  var n = Math.PI - 2 * Math.PI * y / Math.pow(2, z);
	  return 180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
	}
	
	function getMousePixel(dom, event) {
	  var parent = (0, _parentPosition2.default)(dom);
	  return [event.clientX - parent.x, event.clientY - parent.y];
	}
	
	function easeOutQuad(t) {
	  return t * (2 - t);
	}
	
	var minLng = tile2lng(0, 10);
	var minLat = tile2lat(Math.pow(2, 10), 10);
	
	var maxLng = tile2lng(Math.pow(2, 10), 10);
	var maxLat = tile2lat(0, 10);
	
	var Map = function (_Component) {
	  _inherits(Map, _Component);
	
	  function Map(props) {
	    _classCallCheck(this, Map);
	
	    var _this = _possibleConstructorReturn(this, (Map.__proto__ || Object.getPrototypeOf(Map)).call(this, props));
	
	    _this.setCenterZoomTarget = function (center, zoom, fromProps) {
	      var zoomAround = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
	      var animationDuration = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : ANIMATION_TIME;
	
	      // TODO: if center diff is more than 2 screens, no animation
	      if (_this.props.animate) {
	        if (_this._isAnimating) {
	          window.cancelAnimationFrame(_this._animFrame);
	
	          var _this$animationStep = _this.animationStep(window.performance.now()),
	              centerStep = _this$animationStep.centerStep,
	              zoomStep = _this$animationStep.zoomStep;
	
	          _this._centerStart = centerStep;
	          _this._zoomStart = zoomStep;
	        } else {
	          _this._isAnimating = true;
	          _this._centerStart = _this.limitCenterAtZoom([_this._lastCenter[0], _this._lastCenter[1]], _this._lastZoom);
	          _this._zoomStart = _this._lastZoom;
	        }
	
	        _this._animationStart = window.performance.now();
	        _this._animationEnd = _this._animationStart + animationDuration;
	
	        if (zoomAround) {
	          _this._zoomAround = zoomAround;
	          _this._centerTarget = _this.calculateZoomCenter(_this._lastCenter, zoomAround, _this._lastZoom, zoom);
	        } else {
	          _this._zoomAround = null;
	          _this._centerTarget = center;
	        }
	        _this._zoomTarget = zoom;
	
	        _this._animFrame = window.requestAnimationFrame(_this.animate);
	      } else {
	        if (zoomAround) {
	          var _center = _this.calculateZoomCenter(_this._lastCenter, zoomAround, _this._lastZoom, zoom);
	          _this.setCenterZoom(_center, zoom, fromProps);
	        } else {
	          _this.setCenterZoom(center, zoom, fromProps);
	        }
	      }
	    };
	
	    _this.animationStep = function (timestamp) {
	      var length = _this._animationEnd - _this._animationStart;
	      var progress = Math.max(timestamp - _this._animationStart, 0);
	      var percentage = easeOutQuad(progress / length);
	
	      var zoomDiff = (_this._zoomTarget - _this._zoomStart) * percentage;
	      var zoomStep = _this._zoomStart + zoomDiff;
	
	      if (_this._zoomAround) {
	        var centerStep = _this.calculateZoomCenter(_this._centerStart, _this._zoomAround, _this._zoomStart, zoomStep);
	
	        return { centerStep: centerStep, zoomStep: zoomStep };
	      } else {
	        var _centerStep = [_this._centerStart[0] + (_this._centerTarget[0] - _this._centerStart[0]) * percentage, _this._centerStart[1] + (_this._centerTarget[1] - _this._centerStart[1]) * percentage];
	
	        return { centerStep: _centerStep, zoomStep: zoomStep };
	      }
	    };
	
	    _this.animate = function (timestamp) {
	      if (timestamp >= _this._animationEnd) {
	        _this._isAnimating = false;
	        _this.setCenterZoom(_this._centerTarget, _this._zoomTarget);
	      } else {
	        var _this$animationStep2 = _this.animationStep(timestamp),
	            centerStep = _this$animationStep2.centerStep,
	            zoomStep = _this$animationStep2.zoomStep;
	
	        _this.setCenterZoom(centerStep, zoomStep);
	        _this._animFrame = window.requestAnimationFrame(_this.animate);
	      }
	    };
	
	    _this.stopAnimating = function () {
	      if (_this._isAnimating) {
	        _this._isAnimating = false;
	        window.cancelAnimationFrame(_this._animFrame);
	      }
	    };
	
	    _this.limitCenterAtZoom = function (center) {
	      // TODO: use zoom to hide the gray area of the map - adjust the center
	      return [Math.max(Math.min(isNaN(center[0]) ? _this.state.center[0] : center[0], maxLat), minLat), Math.max(Math.min(isNaN(center[1]) ? _this.state.center[1] : center[1], maxLng), minLng)];
	    };
	
	    _this.setCenterZoom = function (center, zoom) {
	      var limitedCenter = _this.limitCenterAtZoom(center, zoom);
	
	      if (Math.round(_this.state.zoom) !== Math.round(zoom)) {
	        (function () {
	          var tileValues = _this.tileValues(_this.props, _this.state);
	          var nextValues = _this.tileValues(_this.props, { center: limitedCenter, zoom: zoom });
	          var oldTiles = _this.state.oldTiles;
	
	          _this.setState({
	            oldTiles: oldTiles.filter(function (o) {
	              return o.roundedZoom !== tileValues.roundedZoom;
	            }).concat(tileValues)
	          }, NOOP);
	
	          var loadTracker = {};
	
	          for (var x = nextValues.tileMinX; x <= nextValues.tileMaxX; x++) {
	            for (var y = nextValues.tileMinY; y <= nextValues.tileMaxY; y++) {
	              var key = x + '-' + y + '-' + nextValues.roundedZoom;
	              loadTracker[key] = false;
	            }
	          }
	
	          _this._loadTracker = loadTracker;
	        })();
	      }
	
	      _this.setState({ center: limitedCenter, zoom: zoom }, NOOP);
	
	      var maybeZoom = _this.props.zoom ? _this.props.zoom : _this._lastZoom;
	      var maybeCenter = _this.props.center ? _this.props.center : _this._lastCenter;
	      if (Math.abs(maybeZoom - zoom) > 0.001 || Math.abs(maybeCenter[0] - limitedCenter[0]) > 0.00001 || Math.abs(maybeCenter[1] - limitedCenter[1]) > 0.00001) {
	        _this._lastZoom = zoom;
	        _this._lastCenter = [].concat(_toConsumableArray(limitedCenter));
	        _this.syncToProps(limitedCenter, zoom);
	      }
	    };
	
	    _this.imageLoaded = function (key) {
	      if (_this._loadTracker && key in _this._loadTracker) {
	        _this._loadTracker[key] = true;
	
	        var unloadedCount = Object.keys(_this._loadTracker).filter(function (k) {
	          return !_this._loadTracker[k];
	        }).length;
	
	        if (unloadedCount === 0) {
	          _this.setState({ oldTiles: [] }, NOOP);
	        }
	      }
	    };
	
	    _this.handleTouchStart = function (event) {
	      var _this$props = _this.props,
	          width = _this$props.width,
	          height = _this$props.height;
	
	      if (event.touches.length === 1) {
	        var touch = event.touches[0];
	        var pixel = getMousePixel(_this._containerRef, touch);
	
	        if (pixel[0] >= 0 && pixel[1] >= 0 && pixel[0] < width && pixel[1] < height) {
	          _this._touchStartCoords = [[touch.clientX, touch.clientY]];
	
	          _this.stopAnimating();
	          event.preventDefault();
	
	          if (_this._lastTap && window.performance.now() - _this._lastTap < DOUBLE_CLICK_DELAY) {
	            var latLngNow = _this.pixelToLatLng(_this._touchStartCoords[0]);
	            _this.setCenterZoomTarget(null, Math.max(1, Math.min(_this.state.zoom + 1, 18)), false, latLngNow);
	          } else {
	            _this._lastTap = window.performance.now();
	            _this.startTrackingMoveEvents(pixel);
	          }
	        }
	        // added second finger and first one was in the area
	      } else if (event.touches.length === 2 && _this._touchStartCoords) {
	        event.preventDefault();
	
	        _this.stopTrackingMoveEvents();
	
	        if (_this.state.pixelDelta || _this.state.zoomDelta) {
	          _this.sendDeltaChange();
	        }
	
	        var t1 = event.touches[0];
	        var t2 = event.touches[1];
	
	        _this._touchStartCoords = [[t1.clientX, t1.clientY], [t2.clientX, t2.clientY]];
	        _this._touchStartMidPoint = [(t1.clientX + t2.clientX) / 2, (t1.clientY + t2.clientY) / 2];
	        _this._touchStartDistance = Math.sqrt(Math.pow(t1.clientX - t2.clientX, 2) + Math.pow(t1.clientY - t2.clientY, 2));
	      }
	    };
	
	    _this.handleTouchMove = function (event) {
	      if (event.touches.length === 1 && _this._touchStartCoords) {
	        event.preventDefault();
	        var touch = event.touches[0];
	        var pixel = getMousePixel(_this._containerRef, touch);
	        _this.trackMoveEvents(pixel);
	
	        _this.setState({
	          pixelDelta: [touch.clientX - _this._touchStartCoords[0][0], touch.clientY - _this._touchStartCoords[0][1]]
	        }, NOOP);
	      } else if (event.touches.length === 2 && _this._touchStartCoords) {
	        var _this$props2 = _this.props,
	            width = _this$props2.width,
	            height = _this$props2.height;
	        var zoom = _this.state.zoom;
	
	        event.preventDefault();
	
	        var t1 = event.touches[0];
	        var t2 = event.touches[1];
	
	        var parent = (0, _parentPosition2.default)(_this._containerRef);
	
	        var midPoint = [(t1.clientX + t2.clientX) / 2, (t1.clientY + t2.clientY) / 2];
	        var midPointDiff = [midPoint[0] - _this._touchStartMidPoint[0], midPoint[1] - _this._touchStartMidPoint[1]];
	
	        var distance = Math.sqrt(Math.pow(t1.clientX - t2.clientX, 2) + Math.pow(t1.clientY - t2.clientY, 2));
	
	        var zoomDelta = Math.min(18, zoom + Math.log2(distance / _this._touchStartDistance)) - zoom;
	        var scale = Math.pow(2, zoomDelta);
	
	        var centerDiffDiff = [(parent.x + width / 2 - midPoint[0]) * (scale - 1), (parent.y + height / 2 - midPoint[1]) * (scale - 1)];
	
	        _this.setState({
	          zoomDelta: zoomDelta,
	          pixelDelta: [centerDiffDiff[0] + midPointDiff[0] * scale, centerDiffDiff[1] + midPointDiff[1] * scale]
	        }, NOOP);
	      }
	    };
	
	    _this.handleTouchEnd = function (event) {
	      if (_this._touchStartCoords) {
	        event.preventDefault();
	
	        var _this$sendDeltaChange = _this.sendDeltaChange(),
	            center = _this$sendDeltaChange.center,
	            zoom = _this$sendDeltaChange.zoom;
	
	        if (event.touches.length === 0) {
	          _this._touchStartCoords = null;
	          var pixel = getMousePixel(_this._containerRef, event.changedTouches[0]);
	          _this.throwAfterMoving(pixel, center, zoom);
	        } else if (event.touches.length === 1) {
	          var touch = event.touches[0];
	          var _pixel = getMousePixel(_this._containerRef, touch);
	
	          _this._touchStartCoords = [[touch.clientX, touch.clientY]];
	          _this.startTrackingMoveEvents(_pixel);
	        }
	      }
	    };
	
	    _this.handleMouseDown = function (event) {
	      var _this$props3 = _this.props,
	          width = _this$props3.width,
	          height = _this$props3.height;
	
	      var pixel = getMousePixel(_this._containerRef, event);
	
	      if (event.button === 0 && !(0, _parentHasClass2.default)(event.target, 'pigeon-drag-block') && pixel[0] >= 0 && pixel[1] >= 0 && pixel[0] < width && pixel[1] < height) {
	        _this.stopAnimating();
	        event.preventDefault();
	
	        if (_this._lastClick && window.performance.now() - _this._lastClick < DOUBLE_CLICK_DELAY) {
	          var latLngNow = _this.pixelToLatLng(_this._mousePosition);
	          _this.setCenterZoomTarget(null, Math.max(1, Math.min(_this.state.zoom + 1, 18)), false, latLngNow);
	        } else {
	          _this._lastClick = window.performance.now();
	
	          _this._mouseDown = true;
	          _this._dragStart = pixel;
	          _this.startTrackingMoveEvents(pixel);
	        }
	      }
	    };
	
	    _this.handleMouseMove = function (event) {
	      _this._mousePosition = getMousePixel(_this._containerRef, event);
	
	      if (_this._mouseDown && _this._dragStart) {
	        _this.trackMoveEvents(_this._mousePosition);
	        _this.setState({
	          pixelDelta: [_this._mousePosition[0] - _this._dragStart[0], _this._mousePosition[1] - _this._dragStart[1]]
	        }, NOOP);
	      }
	    };
	
	    _this.handleMouseUp = function (event) {
	      var pixelDelta = _this.state.pixelDelta;
	
	      if (_this._mouseDown) {
	        _this._mouseDown = false;
	
	        var pixel = getMousePixel(_this._containerRef, event);
	
	        if (_this.props.onClick && !(0, _parentHasClass2.default)(event.target, 'pigeon-click-block') && (!pixelDelta || Math.abs(pixelDelta[0]) + Math.abs(pixelDelta[1]) <= CLICK_TOLERANCE)) {
	          var latLng = _this.pixelToLatLng(pixel);
	          _this.props.onClick({ event: event, latLng: latLng, pixel: pixel });
	          _this.setState({ pixelDelta: null }, NOOP);
	        } else {
	          var _this$sendDeltaChange2 = _this.sendDeltaChange(),
	              center = _this$sendDeltaChange2.center,
	              zoom = _this$sendDeltaChange2.zoom;
	
	          _this.throwAfterMoving(pixel, center, zoom);
	        }
	      }
	    };
	
	    _this.startTrackingMoveEvents = function (coords) {
	      _this._moveEvents = [{ timestamp: window.performance.now(), coords: coords }];
	    };
	
	    _this.stopTrackingMoveEvents = function () {
	      _this._moveEvents = [];
	    };
	
	    _this.trackMoveEvents = function (coords) {
	      var timestamp = window.performance.now();
	
	      if (timestamp - _this._moveEvents[_this._moveEvents.length - 1].timestamp > 40) {
	        _this._moveEvents.push({ timestamp: timestamp, coords: coords });
	        if (_this._moveEvents.length > 2) {
	          _this._moveEvents.shift();
	        }
	      }
	    };
	
	    _this.throwAfterMoving = function (coords, center, zoom) {
	      var _this$props4 = _this.props,
	          width = _this$props4.width,
	          height = _this$props4.height,
	          animate = _this$props4.animate;
	
	      var timestamp = window.performance.now();
	      var lastEvent = _this._moveEvents.shift();
	
	      if (lastEvent && animate) {
	        var deltaMs = Math.max(timestamp - lastEvent.timestamp, 1);
	
	        var delta = [(coords[0] - lastEvent.coords[0]) / deltaMs * 120, (coords[1] - lastEvent.coords[1]) / deltaMs * 120];
	
	        var distance = Math.sqrt(delta[0] * delta[0] + delta[1] * delta[1]);
	
	        if (distance > MIN_DRAG_FOR_THROW) {
	          var diagonal = Math.sqrt(width * width + height * height);
	
	          var lng = tile2lng(lng2tile(center[1], zoom) - delta[0] / 256.0, zoom);
	          var lat = tile2lat(lat2tile(center[0], zoom) - delta[1] / 256.0, zoom);
	
	          _this.setCenterZoomTarget([lat, lng], zoom, false, null, DIAGONAL_THROW_TIME * distance / diagonal);
	        }
	      }
	
	      _this.stopTrackingMoveEvents();
	    };
	
	    _this.sendDeltaChange = function () {
	      var _this$state = _this.state,
	          center = _this$state.center,
	          zoom = _this$state.zoom,
	          pixelDelta = _this$state.pixelDelta,
	          zoomDelta = _this$state.zoomDelta;
	
	      var lat = center[0];
	      var lng = center[1];
	
	      if (pixelDelta || zoomDelta !== 0) {
	        lng = tile2lng(lng2tile(center[1], zoom + zoomDelta) - (pixelDelta ? pixelDelta[0] / 256.0 : 0), zoom + zoomDelta);
	        lat = tile2lat(lat2tile(center[0], zoom + zoomDelta) - (pixelDelta ? pixelDelta[1] / 256.0 : 0), zoom + zoomDelta);
	        _this.setCenterZoom([lat, lng], zoom + zoomDelta);
	      }
	
	      _this.setState({
	        pixelDelta: null,
	        zoomDelta: 0
	      }, NOOP);
	
	      return {
	        center: _this.limitCenterAtZoom([lat, lng], zoom + zoomDelta),
	        zoom: zoom + zoomDelta
	      };
	    };
	
	    _this.getBounds = function () {
	      var center = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.center;
	      var zoom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.zoomPlusDelta();
	      var _this$props5 = _this.props,
	          width = _this$props5.width,
	          height = _this$props5.height;
	
	      return {
	        ne: _this.pixelToLatLng([width - 1, 0], center, zoom),
	        sw: _this.pixelToLatLng([0, height - 1], center, zoom)
	      };
	    };
	
	    _this.syncToProps = function () {
	      var center = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.center;
	      var zoom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.state.zoom;
	      var onBoundsChanged = _this.props.onBoundsChanged;
	
	      if (onBoundsChanged) {
	        var bounds = _this.getBounds(center, zoom);
	
	        onBoundsChanged({ center: center, zoom: zoom, bounds: bounds, initial: !_this._boundsSynced });
	
	        _this._boundsSynced = true;
	      }
	    };
	
	    _this.handleWheel = function (event) {
	      event.preventDefault();
	
	      var addToZoom = -event.deltaY / SCROLL_PIXELS_FOR_ZOOM_LEVEL;
	
	      if (_this._zoomTarget) {
	        var stillToAdd = _this._zoomTarget - _this.state.zoom;
	        _this.zoomAroundMouse(addToZoom + stillToAdd);
	      } else {
	        _this.zoomAroundMouse(addToZoom);
	      }
	    };
	
	    _this.zoomAroundMouse = function (zoomDiff) {
	      var zoom = _this.state.zoom;
	
	      if (!_this._mousePosition || zoom === 1 && zoomDiff < 0 || zoom === 18 && zoomDiff > 0) {
	        return;
	      }
	
	      var latLngNow = _this.pixelToLatLng(_this._mousePosition);
	
	      _this.setCenterZoomTarget(null, Math.max(1, Math.min(zoom + zoomDiff, 18)), false, latLngNow);
	    };
	
	    _this.zoomPlusDelta = function () {
	      return _this.state.zoom + _this.state.zoomDelta;
	    };
	
	    _this.pixelToLatLng = function (pixel) {
	      var center = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.state.center;
	      var zoom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _this.zoomPlusDelta();
	      var _this$props6 = _this.props,
	          width = _this$props6.width,
	          height = _this$props6.height;
	      var pixelDelta = _this.state.pixelDelta;
	
	      var pointDiff = [(pixel[0] - width / 2 - (pixelDelta ? pixelDelta[0] : 0)) / 256.0, (pixel[1] - height / 2 - (pixelDelta ? pixelDelta[1] : 0)) / 256.0];
	
	      var tileX = lng2tile(center[1], zoom) + pointDiff[0];
	      var tileY = lat2tile(center[0], zoom) + pointDiff[1];
	
	      return _this.limitCenterAtZoom([tile2lat(tileY, zoom), tile2lng(tileX, zoom)], zoom);
	    };
	
	    _this.latLngToPixel = function (latLng) {
	      var center = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.state.center;
	      var zoom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _this.zoomPlusDelta();
	      var _this$props7 = _this.props,
	          width = _this$props7.width,
	          height = _this$props7.height;
	      var pixelDelta = _this.state.pixelDelta;
	
	      var limitedCenter = _this.limitCenterAtZoom(center);
	
	      var tileCenterX = lng2tile(limitedCenter[1], zoom);
	      var tileCenterY = lat2tile(limitedCenter[0], zoom);
	
	      var tileX = lng2tile(latLng[1], zoom);
	      var tileY = lat2tile(latLng[0], zoom);
	
	      return [(tileX - tileCenterX) * 256.0 + width / 2 + (pixelDelta ? pixelDelta[0] : 0), (tileY - tileCenterY) * 256.0 + height / 2 + (pixelDelta ? pixelDelta[1] : 0)];
	    };
	
	    _this.calculateZoomCenter = function (center, coords, oldZoom, newZoom) {
	      var _this$props8 = _this.props,
	          width = _this$props8.width,
	          height = _this$props8.height;
	
	      var pixelBefore = _this.latLngToPixel(coords, center, oldZoom);
	      var pixelAfter = _this.latLngToPixel(coords, center, newZoom);
	
	      var newCenter = _this.pixelToLatLng([width / 2 + pixelAfter[0] - pixelBefore[0], height / 2 + pixelAfter[1] - pixelBefore[1]], center, newZoom);
	
	      return _this.limitCenterAtZoom(newCenter, newZoom);
	    };
	
	    _this.setRef = function (dom) {
	      _this._containerRef = dom;
	    };
	
	    _this.syncToProps = (0, _debounce2.default)(_this.syncToProps, DEBOUNCE_DELAY);
	
	    _this._mousePosition = null;
	    _this._dragStart = null;
	    _this._mouseDown = false;
	    _this._moveEvents = [];
	    _this._lastClick = null;
	    _this._lastTap = null;
	    _this._touchStartCoords = null;
	
	    _this._isAnimating = false;
	    _this._animationStart = null;
	    _this._animationEnd = null;
	    _this._centerTarget = null;
	    _this._zoomTarget = null;
	
	    // When users are using uncontrolled components we have to keep this
	    // so we can know if we should call onBoundsChanged
	    _this._lastZoom = props.defaultZoom ? props.defaultZoom : props.zoom;
	    _this._lastCenter = props.defaultCenter ? props.defaultCenter : props.center;
	    _this._boundsSynced = false;
	
	    _this.state = {
	      zoom: _this._lastZoom,
	      center: _this._lastCenter,
	      zoomDelta: 0,
	      pixelDelta: null,
	      oldTiles: []
	    };
	    return _this;
	  }
	
	  _createClass(Map, [{
	    key: 'componentDidMount',
	    value: function () {
	      var wa = window.addEventListener;
	      wa('mousedown', this.handleMouseDown);
	      wa('mouseup', this.handleMouseUp);
	      wa('mousemove', this.handleMouseMove);
	
	      wa('touchstart', this.handleTouchStart);
	      wa('touchmove', this.handleTouchMove);
	      wa('touchend', this.handleTouchEnd);
	
	      this.syncToProps();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function () {
	      var wr = window.removeEventListener;
	      wr('mousedown', this.handleMouseDown);
	      wr('mouseup', this.handleMouseUp);
	      wr('mousemove', this.handleMouseMove);
	
	      wr('touchstart', this.handleTouchStart);
	      wr('touchmove', this.handleTouchMove);
	      wr('touchend', this.handleTouchEnd);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function (nextProps) {
	      if (!nextProps.center && !nextProps.zoom) {
	        // if the user isn't controlling neither zoom nor center we don't have to update.
	        return;
	      }
	      var maybeCenter = nextProps.center ? nextProps.center : this.state.center;
	      var maybeZoom = nextProps.zoom ? nextProps.zoom : this.state.zoom;
	      if (Math.abs(maybeZoom - this.state.zoom) > 0.001 || Math.abs(maybeCenter[0] - this.state.center[0]) > 0.0001 || Math.abs(maybeCenter[1] - this.state.center[1]) > 0.0001) {
	        this.setCenterZoomTarget(maybeCenter, maybeZoom, true);
	      }
	    }
	
	    // main logic when changing coordinates
	
	
	    // https://www.bennadel.com/blog/1856-using-jquery-s-animate-step-callback-function-to-create-custom-animations.htm
	
	
	    // tools
	
	    // ref
	
	  }, {
	    key: 'tileValues',
	
	    // data to display the tiles
	
	    value: function (props, state) {
	      var width = props.width,
	          height = props.height;
	      var center = state.center,
	          zoom = state.zoom,
	          pixelDelta = state.pixelDelta,
	          zoomDelta = state.zoomDelta;
	
	      var roundedZoom = Math.round(zoom + (zoomDelta || 0));
	
	
	      var scale = Math.pow(2, zoom + (zoomDelta || 0) - roundedZoom);
	      var scaleWidth = width / scale;
	      var scaleHeight = height / scale;
	
	      var tileCenterX = lng2tile(center[1], roundedZoom) - (pixelDelta ? pixelDelta[0] / 256.0 / scale : 0);
	      var tileCenterY = lat2tile(center[0], roundedZoom) - (pixelDelta ? pixelDelta[1] / 256.0 / scale : 0);
	
	      var halfWidth = scaleWidth / 2 / 256.0;
	      var halfHeight = scaleHeight / 2 / 256.0;
	
	      var tileMinX = Math.floor(tileCenterX - halfWidth);
	      var tileMaxX = Math.floor(tileCenterX + halfWidth);
	
	      var tileMinY = Math.floor(tileCenterY - halfHeight);
	      var tileMaxY = Math.floor(tileCenterY + halfHeight);
	
	      return {
	        tileMinX: tileMinX,
	        tileMaxX: tileMaxX,
	        tileMinY: tileMinY,
	        tileMaxY: tileMaxY,
	        tileCenterX: tileCenterX,
	        tileCenterY: tileCenterY,
	        roundedZoom: roundedZoom,
	        zoomDelta: zoomDelta || 0,
	        scaleWidth: scaleWidth,
	        scaleHeight: scaleHeight,
	        scale: scale
	      };
	    }
	
	    // display the tiles
	
	  }, {
	    key: 'renderTiles',
	    value: function () {
	      var _this2 = this;
	
	      var oldTiles = this.state.oldTiles;
	
	      var mapUrl = this.props.provider || wikimedia;
	
	      var _tileValues = this.tileValues(this.props, this.state),
	          tileMinX = _tileValues.tileMinX,
	          tileMaxX = _tileValues.tileMaxX,
	          tileMinY = _tileValues.tileMinY,
	          tileMaxY = _tileValues.tileMaxY,
	          tileCenterX = _tileValues.tileCenterX,
	          tileCenterY = _tileValues.tileCenterY,
	          roundedZoom = _tileValues.roundedZoom,
	          scaleWidth = _tileValues.scaleWidth,
	          scaleHeight = _tileValues.scaleHeight,
	          scale = _tileValues.scale;
	
	      var tiles = [];
	
	      for (var i = 0; i < oldTiles.length; i++) {
	        var old = oldTiles[i];
	        var zoomDiff = old.roundedZoom - roundedZoom;
	
	        if (Math.abs(zoomDiff) > 4 || zoomDiff === 0) {
	          continue;
	        }
	
	        var pow = 1 / Math.pow(2, zoomDiff);
	        var xDiff = -(tileMinX - old.tileMinX * pow) * 256;
	        var yDiff = -(tileMinY - old.tileMinY * pow) * 256;
	
	        var _xMin = Math.max(old.tileMinX, 0);
	        var _yMin = Math.max(old.tileMinY, 0);
	        var _xMax = Math.min(old.tileMaxX, Math.pow(2, old.roundedZoom) - 1);
	        var _yMax = Math.min(old.tileMaxY, Math.pow(2, old.roundedZoom) - 1);
	
	        for (var x = _xMin; x <= _xMax; x++) {
	          for (var y = _yMin; y <= _yMax; y++) {
	            tiles.push({
	              key: x + '-' + y + '-' + old.roundedZoom,
	              url: mapUrl(x, y, old.roundedZoom),
	              left: xDiff + (x - old.tileMinX) * 256 * pow,
	              top: yDiff + (y - old.tileMinY) * 256 * pow,
	              width: 256 * pow,
	              height: 256 * pow,
	              active: false
	            });
	          }
	        }
	      }
	
	      var xMin = Math.max(tileMinX, 0);
	      var yMin = Math.max(tileMinY, 0);
	      var xMax = Math.min(tileMaxX, Math.pow(2, roundedZoom) - 1);
	      var yMax = Math.min(tileMaxY, Math.pow(2, roundedZoom) - 1);
	
	      for (var _x11 = xMin; _x11 <= xMax; _x11++) {
	        for (var _y = yMin; _y <= yMax; _y++) {
	          tiles.push({
	            key: _x11 + '-' + _y + '-' + roundedZoom,
	            url: mapUrl(_x11, _y, roundedZoom),
	            left: (_x11 - tileMinX) * 256,
	            top: (_y - tileMinY) * 256,
	            width: 256,
	            height: 256,
	            active: true
	          });
	        }
	      }
	
	      return _infact.React.createElement('div', { style: {
	          width: scaleWidth,
	          height: scaleHeight,
	          position: 'absolute',
	          top: 0,
	          left: 0,
	          overflow: 'hidden',
	          willChange: 'transform',
	          transform: 'scale(' + scale + ', ' + scale + ')',
	          transformOrigin: 'top left'
	        } }, _infact.React.createElement('div', { style: {
	          position: 'absolute',
	          width: (tileMaxX - tileMinX + 1) * 256,
	          height: (tileMaxY - tileMinY + 1) * 256,
	          willChange: 'transform',
	          transform: 'translate(' + -((tileCenterX - tileMinX) * 256 - scaleWidth / 2) + 'px, ' + -((tileCenterY - tileMinY) * 256 - scaleHeight / 2) + 'px)'
	        } }, tiles.map(function (tile) {
	        return _infact.React.createElement('img', { key: tile.key,
	          src: tile.url,
	          width: tile.width,
	          height: tile.height,
	          onLoad: function () {
	            return _this2.imageLoaded(tile.key);
	          },
	          style: { position: 'absolute', left: tile.left, top: tile.top, willChange: 'transform', transform: tile.transform, transformOrigin: 'top left', opacity: 1 } });
	      })));
	    }
	  }, {
	    key: 'renderOverlays',
	    value: function () {
	      var _this3 = this;
	
	      var _props = this.props,
	          width = _props.width,
	          height = _props.height;
	      var center = this.state.center;
	
	      var mapState = {
	        bounds: this.getBounds(),
	        zoom: this.zoomPlusDelta(),
	        center: center,
	        width: width,
	        height: height
	      };
	
	      var childrenWithProps = void 0;
	
	      childrenWithProps = _infact.React.Children.map(this.props.children, function (child) {
	        var _child$props = child.props,
	            anchor = _child$props.anchor,
	            position = _child$props.position,
	            offset = _child$props.offset;
	
	        var c = _this3.latLngToPixel(anchor || position || center);
	
	        return _infact.React.cloneElement(child, {
	          left: c[0] - (offset ? offset[0] : 0),
	          top: c[1] - (offset ? offset[1] : 0),
	          latLngToPixel: _this3.latLngToPixel,
	          pixelToLatLng: _this3.pixelToLatLng,
	          mapState: mapState
	        });
	      });
	      var childrenChecked;
	
	
	      return _infact.React.createElement('div', { style: {
	          position: 'absolute',
	          width: width,
	          height: height,
	          top: 0,
	          left: 0
	        } }, childrenWithProps);
	    }
	  }, {
	    key: 'renderAttribution',
	    value: function () {
	      var _props2 = this.props,
	          attribution = _props2.attribution,
	          attributionPrefix = _props2.attributionPrefix;
	
	      if (attribution === false) {
	        return null;
	      }
	
	      var linkStyle = {
	        color: '#0078A8',
	        textDecoration: 'none'
	      };
	
	      return _infact.React.createElement('div', { key: 'attr', className: 'pigeon-attribution', style: {
	          position: 'absolute',
	          bottom: 0,
	          right: 0,
	          fontSize: '11px',
	          padding: '2px 5px',
	          background: 'rgba(255, 255, 255, 0.7)',
	          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
	          color: '#333'
	        } }, attributionPrefix === false ? null : _infact.React.createElement('span', null, attributionPrefix || _infact.React.createElement('a', { href: 'https://github.com/mariusandra/pigeon-maps', style: linkStyle }, 'Pigeon'), ' | '), attribution || _infact.React.createElement('span', null, ' © ', _infact.React.createElement('a', { href: 'https://www.openstreetmap.org/copyright', style: linkStyle }, 'OpenStreetMap'), ' contributors'));
	    }
	  }, {
	    key: 'render',
	    value: function () {
	      var _props3 = this.props,
	          width = _props3.width,
	          height = _props3.height;
	
	      return _infact.React.createElement('div', { style: {
	          width: width,
	          height: height,
	          position: 'relative',
	          display: 'inline-block',
	          overflow: 'hidden',
	          background: '#dddddd'
	        },
	        ref: this.setRef,
	        onWheel: this.handleWheel }, this.renderTiles(), this.renderOverlays(), this.renderAttribution());
	    }
	  }]);
	
	  return Map;
	}(_infact.Component);
	
	Map.propTypes = {
	  center: _infact.PropTypes.array,
	  defaultCenter: _infact.PropTypes.array,
	  zoom: _infact.PropTypes.number,
	  defaultZoom: _infact.PropTypes.number,
	  width: _infact.PropTypes.number,
	  height: _infact.PropTypes.number,
	  provider: _infact.PropTypes.func,
	  children: _infact.PropTypes.node,
	  animate: _infact.PropTypes.bool,
	  attribution: _infact.PropTypes.any,
	  attributionPrefix: _infact.PropTypes.any,
	
	  onClick: _infact.PropTypes.func,
	  onBoundsChanged: _infact.PropTypes.func
	};
	Map.defaultProps = {
	  animate: true
	};
	exports.default = Map;

/***/ },

/***/ 171:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// // infact = inferno + react
	
	exports.React = __webpack_require__(3);
	exports.ReactDOM = __webpack_require__(30);
	exports.Component = exports.React.Component;
	exports.PropTypes = exports.React.PropTypes;

/***/ },

/***/ 172:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = parentPosition;
	function parentPosition(element) {
	  var x = 0;
	  var y = 0;
	  var first = true;
	
	  while (element) {
	    x += element.offsetLeft - (first ? 0 : element.scrollLeft) + element.clientLeft;
	    y += element.offsetTop - (first ? 0 : element.scrollTop) + element.clientTop;
	    element = element.offsetParent;
	    first = false;
	  }
	
	  return { x: x, y: y };
	}

/***/ },

/***/ 173:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = parentHasClass;
	function parentHasClass(element, className) {
	  while (element) {
	    if (element.classList.contains(className)) {
	      return true;
	    }
	    element = element.offsetParent;
	  }
	
	  return false;
	}

/***/ },

/***/ 174:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = debounce;
	function debounce(func, wait) {
	  var timeout = void 0;
	  return function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    var context = this;
	    clearTimeout(timeout);
	    timeout = setTimeout(function () {
	      return func.apply(context, args);
	    }, wait);
	  };
	}

/***/ },

/***/ 175:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Cluster = __webpack_require__(176);
	
	var _Cluster2 = _interopRequireDefault(_Cluster);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Cluster2.default;

/***/ },

/***/ 176:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = Cluster;
	
	var _infact = __webpack_require__(2);
	
	var _supercluster = __webpack_require__(177);
	
	var _supercluster2 = _interopRequireDefault(_supercluster);
	
	var _DefaultClusterMarker = __webpack_require__(182);
	
	var _DefaultClusterMarker2 = _interopRequireDefault(_DefaultClusterMarker);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var cloneElement = false ? _infact.Inferno.cloneVNode : _infact.React.cloneElement;
	
	var iLNG = 0,
	    iLAT = 1;
	function Cluster(props) {
	    if (!Array.isArray(props.children)) {
	        return props.children;
	    }
	    var mapState = props.mapState,
	        pixelToLatLng = props.pixelToLatLng,
	        latLngToPixel = props.latLngToPixel,
	        children = props.children,
	        _props$clusterMarkerR = props.clusterMarkerRadius,
	        clusterMarkerRadius = _props$clusterMarkerR === undefined ? 100 : _props$clusterMarkerR,
	        _props$maxZoom = props.maxZoom,
	        maxZoom = _props$maxZoom === undefined ? 16 : _props$maxZoom;
	
	
	    var markers = children.map(function (marker) {
	        var pixel = latLngToPixel(marker.props.anchor);
	        return cloneElement(marker, {
	            pixelToLatLng: pixelToLatLng,
	            latLngToPixel: latLngToPixel,
	            left: pixel[0],
	            top: pixel[1]
	        });
	    });
	
	    var pointsForClustering = markers.map(function (marker) {
	        return {
	            vNode: marker,
	            geometry: {
	                coordinates: marker.props.anchor
	            }
	        };
	    });
	
	    var index = (0, _supercluster2.default)({
	        radius: clusterMarkerRadius,
	        maxZoom: maxZoom
	    });
	
	    index.load(pointsForClustering);
	    var _mapState$bounds = mapState.bounds,
	        ne = _mapState$bounds.ne,
	        sw = _mapState$bounds.sw;
	    var _ref = [sw[iLNG], sw[iLAT], ne[iLNG], ne[iLAT]],
	        westLng = _ref[0],
	        southLat = _ref[1],
	        eastLng = _ref[2],
	        northLat = _ref[3];
	
	    var markersAndClusters = index.getClusters([westLng, southLat, eastLng, northLat], Math.floor(mapState.zoom));
	
	    var displayElements = markersAndClusters.map(function (markerOrCluster) {
	        var displayElement = void 0;
	        var isCluster = markerOrCluster && markerOrCluster.properties && markerOrCluster.properties.cluster;
	        if (isCluster) {
	            var pixelOffset = latLngToPixel(markerOrCluster.geometry.coordinates);
	            var clusterElementKey = markerOrCluster.geometry.coordinates.toString();
	            displayElement = _infact.React.createElement(_DefaultClusterMarker2.default, { key: clusterElementKey,
	                count: markerOrCluster.properties.point_count,
	                pixelOffset: pixelOffset });
	        } else {
	            displayElement = markerOrCluster.vNode;
	        }
	        return displayElement;
	    });
	
	    return _infact.React.createElement(
	        'div',
	        { className: props.className || '',
	            style: { position: 'absolute', height: mapState.height, width: mapState.width } },
	        displayElements
	    );
	}

/***/ },

/***/ 177:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var kdbush = __webpack_require__(178);
	
	module.exports = supercluster;
	
	function supercluster(options) {
	    return new SuperCluster(options);
	}
	
	function SuperCluster(options) {
	    this.options = extend(Object.create(this.options), options);
	    this.trees = new Array(this.options.maxZoom + 1);
	}
	
	SuperCluster.prototype = {
	    options: {
	        minZoom: 0,   // min zoom to generate clusters on
	        maxZoom: 16,  // max zoom level to cluster the points on
	        radius: 40,   // cluster radius in pixels
	        extent: 512,  // tile extent (radius is calculated relative to it)
	        nodeSize: 64, // size of the KD-tree leaf node, affects performance
	        log: false    // whether to log timing info
	    },
	
	    load: function (points) {
	        var log = this.options.log;
	
	        if (log) console.time('total time');
	
	        var timerId = 'prepare ' + points.length + ' points';
	        if (log) console.time(timerId);
	
	        this.points = points;
	
	        // generate a cluster object for each point
	        var clusters = points.map(createPointCluster);
	        if (log) console.timeEnd(timerId);
	
	        // cluster points on max zoom, then cluster the results on previous zoom, etc.;
	        // results in a cluster hierarchy across zoom levels
	        for (var z = this.options.maxZoom; z >= this.options.minZoom; z--) {
	            var now = +Date.now();
	
	            // index input points into a KD-tree
	            this.trees[z + 1] = kdbush(clusters, getX, getY, this.options.nodeSize, Float32Array);
	
	            clusters = this._cluster(clusters, z); // create a new set of clusters for the zoom
	
	            if (log) console.log('z%d: %d clusters in %dms', z, clusters.length, +Date.now() - now);
	        }
	
	        // index top-level clusters
	        this.trees[this.options.minZoom] = kdbush(clusters, getX, getY, this.options.nodeSize, Float32Array);
	
	        if (log) console.timeEnd('total time');
	
	        return this;
	    },
	
	    getClusters: function (bbox, zoom) {
	        var tree = this.trees[this._limitZoom(zoom)];
	        var ids = tree.range(lngX(bbox[0]), latY(bbox[3]), lngX(bbox[2]), latY(bbox[1]));
	        var clusters = [];
	        for (var i = 0; i < ids.length; i++) {
	            var c = tree.points[ids[i]];
	            clusters.push(c.id !== -1 ? this.points[c.id] : getClusterJSON(c));
	        }
	        return clusters;
	    },
	
	    getTile: function (z, x, y) {
	        var tree = this.trees[this._limitZoom(z)];
	        var z2 = Math.pow(2, z);
	        var extent = this.options.extent;
	        var r = this.options.radius;
	        var p = r / extent;
	        var top = (y - p) / z2;
	        var bottom = (y + 1 + p) / z2;
	
	        var tile = {
	            features: []
	        };
	
	        this._addTileFeatures(
	            tree.range((x - p) / z2, top, (x + 1 + p) / z2, bottom),
	            tree.points, x, y, z2, tile);
	
	        if (x === 0) {
	            this._addTileFeatures(
	                tree.range(1 - p / z2, top, 1, bottom),
	                tree.points, z2, y, z2, tile);
	        }
	        if (x === z2 - 1) {
	            this._addTileFeatures(
	                tree.range(0, top, p / z2, bottom),
	                tree.points, -1, y, z2, tile);
	        }
	
	        return tile.features.length ? tile : null;
	    },
	
	    _addTileFeatures: function (ids, points, x, y, z2, tile) {
	        for (var i = 0; i < ids.length; i++) {
	            var c = points[ids[i]];
	            tile.features.push({
	                type: 1,
	                geometry: [[
	                    Math.round(this.options.extent * (c.x * z2 - x)),
	                    Math.round(this.options.extent * (c.y * z2 - y))
	                ]],
	                tags: c.id !== -1 ? this.points[c.id].properties : getClusterProperties(c)
	            });
	        }
	    },
	
	    _limitZoom: function (z) {
	        return Math.max(this.options.minZoom, Math.min(z, this.options.maxZoom + 1));
	    },
	
	    _cluster: function (points, zoom) {
	        var clusters = [];
	        var r = this.options.radius / (this.options.extent * Math.pow(2, zoom));
	
	        // loop through each point
	        for (var i = 0; i < points.length; i++) {
	            var p = points[i];
	            // if we've already visited the point at this zoom level, skip it
	            if (p.zoom <= zoom) continue;
	            p.zoom = zoom;
	
	            // find all nearby points
	            var tree = this.trees[zoom + 1];
	            var neighborIds = tree.within(p.x, p.y, r);
	
	            var foundNeighbors = false;
	            var numPoints = p.numPoints;
	            var wx = p.x * numPoints;
	            var wy = p.y * numPoints;
	
	            for (var j = 0; j < neighborIds.length; j++) {
	                var b = tree.points[neighborIds[j]];
	                // filter out neighbors that are too far or already processed
	                if (zoom < b.zoom) {
	                    foundNeighbors = true;
	                    b.zoom = zoom; // save the zoom (so it doesn't get processed twice)
	                    wx += b.x * b.numPoints; // accumulate coordinates for calculating weighted center
	                    wy += b.y * b.numPoints;
	                    numPoints += b.numPoints;
	                }
	            }
	
	            clusters.push(foundNeighbors ? createCluster(wx / numPoints, wy / numPoints, numPoints, -1) : p);
	        }
	
	        return clusters;
	    }
	};
	
	function createCluster(x, y, numPoints, id) {
	    return {
	        x: x, // weighted cluster center
	        y: y,
	        zoom: Infinity, // the last zoom the cluster was processed at
	        id: id, // index of the source feature in the original input array
	        numPoints: numPoints
	    };
	}
	
	function createPointCluster(p, i) {
	    var coords = p.geometry.coordinates;
	    return createCluster(lngX(coords[0]), latY(coords[1]), 1, i);
	}
	
	function getClusterJSON(cluster) {
	    return {
	        type: 'Feature',
	        properties: getClusterProperties(cluster),
	        geometry: {
	            type: 'Point',
	            coordinates: [xLng(cluster.x), yLat(cluster.y)]
	        }
	    };
	}
	
	function getClusterProperties(cluster) {
	    var count = cluster.numPoints;
	    var abbrev = count >= 10000 ? Math.round(count / 1000) + 'k' :
	                 count >= 1000 ? (Math.round(count / 100) / 10) + 'k' : count;
	    return {
	        cluster: true,
	        point_count: count,
	        point_count_abbreviated: abbrev
	    };
	}
	
	// longitude/latitude to spherical mercator in [0..1] range
	function lngX(lng) {
	    return lng / 360 + 0.5;
	}
	function latY(lat) {
	    var sin = Math.sin(lat * Math.PI / 180),
	        y = (0.5 - 0.25 * Math.log((1 + sin) / (1 - sin)) / Math.PI);
	    return y < 0 ? 0 :
	           y > 1 ? 1 : y;
	}
	
	// spherical mercator to longitude/latitude
	function xLng(x) {
	    return (x - 0.5) * 360;
	}
	function yLat(y) {
	    var y2 = (180 - y * 360) * Math.PI / 180;
	    return 360 * Math.atan(Math.exp(y2)) / Math.PI - 90;
	}
	
	function extend(dest, src) {
	    for (var id in src) dest[id] = src[id];
	    return dest;
	}
	
	function getX(p) {
	    return p.x;
	}
	function getY(p) {
	    return p.y;
	}


/***/ },

/***/ 178:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var sort = __webpack_require__(179);
	var range = __webpack_require__(180);
	var within = __webpack_require__(181);
	
	module.exports = kdbush;
	
	function kdbush(points, getX, getY, nodeSize, ArrayType) {
	    return new KDBush(points, getX, getY, nodeSize, ArrayType);
	}
	
	function KDBush(points, getX, getY, nodeSize, ArrayType) {
	    getX = getX || defaultGetX;
	    getY = getY || defaultGetY;
	    ArrayType = ArrayType || Array;
	
	    this.nodeSize = nodeSize || 64;
	    this.points = points;
	
	    this.ids = new ArrayType(points.length);
	    this.coords = new ArrayType(points.length * 2);
	
	    for (var i = 0; i < points.length; i++) {
	        this.ids[i] = i;
	        this.coords[2 * i] = getX(points[i]);
	        this.coords[2 * i + 1] = getY(points[i]);
	    }
	
	    sort(this.ids, this.coords, this.nodeSize, 0, this.ids.length - 1, 0);
	}
	
	KDBush.prototype = {
	    range: function (minX, minY, maxX, maxY) {
	        return range(this.ids, this.coords, minX, minY, maxX, maxY, this.nodeSize);
	    },
	
	    within: function (x, y, r) {
	        return within(this.ids, this.coords, x, y, r, this.nodeSize);
	    }
	};
	
	function defaultGetX(p) { return p[0]; }
	function defaultGetY(p) { return p[1]; }


/***/ },

/***/ 179:
/***/ function(module, exports) {

	'use strict';
	
	module.exports = sortKD;
	
	function sortKD(ids, coords, nodeSize, left, right, depth) {
	    if (right - left <= nodeSize) return;
	
	    var m = Math.floor((left + right) / 2);
	
	    select(ids, coords, m, left, right, depth % 2);
	
	    sortKD(ids, coords, nodeSize, left, m - 1, depth + 1);
	    sortKD(ids, coords, nodeSize, m + 1, right, depth + 1);
	}
	
	function select(ids, coords, k, left, right, inc) {
	
	    while (right > left) {
	        if (right - left > 600) {
	            var n = right - left + 1;
	            var m = k - left + 1;
	            var z = Math.log(n);
	            var s = 0.5 * Math.exp(2 * z / 3);
	            var sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
	            var newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
	            var newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
	            select(ids, coords, k, newLeft, newRight, inc);
	        }
	
	        var t = coords[2 * k + inc];
	        var i = left;
	        var j = right;
	
	        swapItem(ids, coords, left, k);
	        if (coords[2 * right + inc] > t) swapItem(ids, coords, left, right);
	
	        while (i < j) {
	            swapItem(ids, coords, i, j);
	            i++;
	            j--;
	            while (coords[2 * i + inc] < t) i++;
	            while (coords[2 * j + inc] > t) j--;
	        }
	
	        if (coords[2 * left + inc] === t) swapItem(ids, coords, left, j);
	        else {
	            j++;
	            swapItem(ids, coords, j, right);
	        }
	
	        if (j <= k) left = j + 1;
	        if (k <= j) right = j - 1;
	    }
	}
	
	function swapItem(ids, coords, i, j) {
	    swap(ids, i, j);
	    swap(coords, 2 * i, 2 * j);
	    swap(coords, 2 * i + 1, 2 * j + 1);
	}
	
	function swap(arr, i, j) {
	    var tmp = arr[i];
	    arr[i] = arr[j];
	    arr[j] = tmp;
	}


/***/ },

/***/ 180:
/***/ function(module, exports) {

	'use strict';
	
	module.exports = range;
	
	function range(ids, coords, minX, minY, maxX, maxY, nodeSize) {
	    var stack = [0, ids.length - 1, 0];
	    var result = [];
	    var x, y;
	
	    while (stack.length) {
	        var axis = stack.pop();
	        var right = stack.pop();
	        var left = stack.pop();
	
	        if (right - left <= nodeSize) {
	            for (var i = left; i <= right; i++) {
	                x = coords[2 * i];
	                y = coords[2 * i + 1];
	                if (x >= minX && x <= maxX && y >= minY && y <= maxY) result.push(ids[i]);
	            }
	            continue;
	        }
	
	        var m = Math.floor((left + right) / 2);
	
	        x = coords[2 * m];
	        y = coords[2 * m + 1];
	
	        if (x >= minX && x <= maxX && y >= minY && y <= maxY) result.push(ids[m]);
	
	        var nextAxis = (axis + 1) % 2;
	
	        if (axis === 0 ? minX <= x : minY <= y) {
	            stack.push(left);
	            stack.push(m - 1);
	            stack.push(nextAxis);
	        }
	        if (axis === 0 ? maxX >= x : maxY >= y) {
	            stack.push(m + 1);
	            stack.push(right);
	            stack.push(nextAxis);
	        }
	    }
	
	    return result;
	}


/***/ },

/***/ 181:
/***/ function(module, exports) {

	'use strict';
	
	module.exports = within;
	
	function within(ids, coords, qx, qy, r, nodeSize) {
	    var stack = [0, ids.length - 1, 0];
	    var result = [];
	    var r2 = r * r;
	
	    while (stack.length) {
	        var axis = stack.pop();
	        var right = stack.pop();
	        var left = stack.pop();
	
	        if (right - left <= nodeSize) {
	            for (var i = left; i <= right; i++) {
	                if (sqDist(coords[2 * i], coords[2 * i + 1], qx, qy) <= r2) result.push(ids[i]);
	            }
	            continue;
	        }
	
	        var m = Math.floor((left + right) / 2);
	
	        var x = coords[2 * m];
	        var y = coords[2 * m + 1];
	
	        if (sqDist(x, y, qx, qy) <= r2) result.push(ids[m]);
	
	        var nextAxis = (axis + 1) % 2;
	
	        if (axis === 0 ? qx - r <= x : qy - r <= y) {
	            stack.push(left);
	            stack.push(m - 1);
	            stack.push(nextAxis);
	        }
	        if (axis === 0 ? qx + r >= x : qy + r >= y) {
	            stack.push(m + 1);
	            stack.push(right);
	            stack.push(nextAxis);
	        }
	    }
	
	    return result;
	}
	
	function sqDist(ax, ay, bx, by) {
	    var dx = ax - bx;
	    var dy = ay - by;
	    return dx * dx + dy * dy;
	}


/***/ },

/***/ 182:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = DefaultClusterMarker;
	
	var _infact = __webpack_require__(2);
	
	var colors = {
	    small: ['rgba(181, 226, 140, 0.6)', 'rgba(110, 204, 57, 0.7)'],
	    medium: ['rgba(241, 211, 87, 0.6)', 'rgba(240, 194, 12, 0.7)'],
	    big: ['rgba(253, 156, 115, 0.6)', 'rgba(241, 128, 23, 0.7)']
	};
	var defaultCountToColor = function defaultCountToColor(count) {
	    return count > 20 ? colors.big : count > 7 ? colors.medium : colors.small;
	};
	
	var styleFromCount = function styleFromCount(count) {
	    var colors = defaultCountToColor(count);
	    return {
	        width: 30,
	        height: 30,
	        borderRadius: '50%',
	        borderWidth: 3,
	        borderColor: colors[0],
	        borderStyle: 'solid',
	        background: colors[1],
	        position: 'absolute',
	        display: 'flex',
	        flexDirection: 'column',
	        justifyContent: 'center',
	        textAlign: 'center',
	        cursor: 'default'
	    };
	};
	
	function DefaultClusterMarker(_ref) {
	    var pixelOffset = _ref.pixelOffset,
	        count = _ref.count;
	
	    return _infact.React.createElement(
	        'div',
	        { style: Object.assign(styleFromCount(count), {
	                left: pixelOffset[0],
	                top: pixelOffset[1]
	            }) },
	        count
	    );
	}

/***/ },

/***/ 183:
/***/ function(module, exports, __webpack_require__) {

	if (false) {
	  module.exports = require('./lib/inferno/index.js')
	}
	if (true) {
	  module.exports = __webpack_require__(184)
	}


/***/ },

/***/ 184:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();
	
	var _infact = __webpack_require__(185);
	
	var _pin = __webpack_require__(186);
	
	var _pin2 = _interopRequireDefault(_pin);
	
	var _pin2x = __webpack_require__(187);
	
	var _pin2x2 = _interopRequireDefault(_pin2x);
	
	var _pinHover = __webpack_require__(188);
	
	var _pinHover2 = _interopRequireDefault(_pinHover);
	
	var _pinHover2x = __webpack_require__(189);
	
	var _pinHover2x2 = _interopRequireDefault(_pinHover2x);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}
	
	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}
	
	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}
	
	var imageOffset = {
	  left: 15,
	  top: 31
	};
	
	var Marker = function (_Component) {
	  _inherits(Marker, _Component);
	
	  function Marker(props) {
	    _classCallCheck(this, Marker);
	
	    var _this = _possibleConstructorReturn(this, (Marker.__proto__ || Object.getPrototypeOf(Marker)).call(this, props));
	
	    _this.eventParameters = function (event) {
	      return {
	        event: event,
	        anchor: _this.props.anchor,
	        payload: _this.props.payload
	      };
	    };
	
	    _this.handleClick = function () {
	      _this.props.onClick && _this.props.onClick(_this.eventParameters());
	    };
	
	    _this.handleContextMenu = function () {
	      _this.props.onContextMenu && _this.props.onContextMenu(_this.eventParameters());
	    };
	
	    _this.handleMouseOver = function () {
	      _this.props.onMouseOver && _this.props.onMouseOver(_this.eventParameters());
	      _this.setState({ hover: true });
	    };
	
	    _this.handleMouseOut = function () {
	      _this.props.onMouseOut && _this.props.onMouseOut(_this.eventParameters());
	      _this.setState({ hover: false });
	    };
	
	    _this.state = {
	      hover: false
	    };
	    return _this;
	  }
	
	  // what do you expect to get back with the event
	
	
	  _createClass(Marker, [{
	    key: 'isRetina',
	
	    // controls
	    value: function () {
	      return typeof window !== 'undefined' && window.devicePixelRatio >= 2;
	    }
	
	    // modifiers
	
	  }, {
	    key: 'isHover',
	    value: function () {
	      return typeof this.props.hover === 'boolean' ? this.props.hover : this.state.hover;
	    }
	  }, {
	    key: 'image',
	    value: function () {
	      return this.isRetina() ? this.isHover() ? _pinHover2x2.default : _pin2x2.default : this.isHover() ? _pinHover2.default : _pin2.default;
	    }
	
	    // lifecycle
	
	  }, {
	    key: 'componentDidMount',
	    value: function () {
	      var images = this.isRetina() ? [_pin2x2.default, _pinHover2x2.default] : [_pin2.default, _pinHover2.default];
	
	      images.forEach(function (image) {
	        var img = new window.Image();
	        img.src = image;
	      });
	    }
	
	    // delegators
	
	  }, {
	    key: 'render',
	
	    // render
	
	    value: function () {
	      var _props = this.props,
	          left = _props.left,
	          top = _props.top,
	          onClick = _props.onClick;
	
	      var style = {
	        position: 'absolute',
	        transform: 'translate(' + (left - imageOffset.left) + 'px, ' + (top - imageOffset.top) + 'px)',
	        cursor: onClick ? 'pointer' : 'default'
	      };
	
	      return _infact.React.createElement('div', { style: style,
	        className: 'pigeon-click-block',
	        onClick: this.handleClick,
	        onContextMenu: this.handleContextMenu,
	        onMouseOver: this.handleMouseOver,
	        onMouseOut: this.handleMouseOut }, _infact.React.createElement('img', { src: this.image(), width: 29, height: 34, alt: '' }));
	    }
	  }]);
	
	  return Marker;
	}(_infact.Component);
	
	Marker.propTypes = {
	  // input, passed to events
	  anchor: _infact.PropTypes.array.isRequired,
	  payload: _infact.PropTypes.any,
	
	  // optional modifiers
	  hover: _infact.PropTypes.bool,
	
	  // callbacks
	  onClick: _infact.PropTypes.func,
	  onContextMenu: _infact.PropTypes.func,
	  onMouseOver: _infact.PropTypes.func,
	  onMouseOut: _infact.PropTypes.func,
	
	  // pigeon variables
	  left: _infact.PropTypes.number,
	  top: _infact.PropTypes.number,
	
	  // pigeon functions
	  latLngToPixel: _infact.PropTypes.func,
	  pixelToLatLng: _infact.PropTypes.func
	};
	exports.default = Marker;

/***/ },

/***/ 185:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// // infact = inferno + react
	
	exports.React = __webpack_require__(3);
	exports.ReactDOM = __webpack_require__(30);
	exports.Component = exports.React.Component;
	exports.PropTypes = exports.React.PropTypes;

/***/ },

/***/ 186:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "pin.png";

/***/ },

/***/ 187:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "pin@2x.png";

/***/ },

/***/ 188:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "pin-hover.png";

/***/ },

/***/ 189:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "pin-hover@2x.png";

/***/ },

/***/ 190:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "index.html";

/***/ }

});
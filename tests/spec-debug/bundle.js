/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _zapBaseDomElementTransition = __webpack_require__(1);

	var _zapBaseDomElementTransition2 = _interopRequireDefault(_zapBaseDomElementTransition);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe('zap-base-dom-transition', function () {
	    var styleTag = document.createElement('style');
	    var style = '\n        .example {\n            display: none;\n            position: absolute;\n            top: 0;\n            left: 0;\n            width: 100px;\n            height: 100px;\n            opacity: 0;\n            background-color: red;\n            -webkit-transition: opacity .4s ease-in-out;\n            transition: opacity .4s ease-in-out;\n        }\n        .example.zap-transition--transition-on,\n        .example.zap-transition--transition-off {\n            display: block;\n        }\n        .example.zap-transition--transition-on-start,\n        .example.zap-transition--transition-on-end {\n            opacity: 1;\n        }\n        .example.zap-transition--transition-off {\n            opacity: 1;\n        }\n        .example.zap-transition--transition-off-start {\n            opacity: 0;\n        }\n        .example.zap-transition--transition-off-end {\n            opacity: 0;\n        }\n    ';
	    styleTag.textContent = style;
	    document.body.appendChild(styleTag);

	    beforeEach(function () {});

	    afterEach(function () {});

	    describe('should export the following', function () {
	        it('Transition', function () {
	            expect(_zapBaseDomElementTransition2.default).toEqual(jasmine.any(Function));
	        });
	    });

	    describe('Transition', function () {
	        var onCompleteSpy = jasmine.createSpy('onCompleteSpy');
	        var element = document.createElement('div');
	        element.className = 'example';
	        document.body.appendChild(element);

	        var transition = new _zapBaseDomElementTransition2.default(element, {
	            onComplete: function onComplete(on) {
	                onCompleteSpy(on);
	            }
	        });

	        it('turnOn should fire onComplete', function (done) {
	            transition.turnOn();

	            setTimeout(function () {
	                expect(onCompleteSpy).toHaveBeenCalledWith(true);
	                done();
	            }, 500);
	        });

	        it('turnOff should fire onComplete', function (done) {
	            onCompleteSpy.calls.reset();
	            transition.turnOff();

	            setTimeout(function () {
	                expect(onCompleteSpy).toHaveBeenCalledWith(false);
	                done();
	            }, 500);
	        });
	    });
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _zapBaseDomElement = __webpack_require__(2);

	var _zapBaseJsClass = __webpack_require__(6);

	var _zapBaseJsClass2 = _interopRequireDefault(_zapBaseJsClass);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _class = function (_ZapClass) {
	    _inherits(_class, _ZapClass);

	    // onStart (isOn)
	    // onStop
	    // onComplete (isOn)


	    /**
	     * @param {Element} target
	     * @param {Object} [options]
	     */

	    function _class(target) {
	        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	        _classCallCheck(this, _class);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this, options));

	        _this.element = target;
	        _this.onSwitch = false;
	        _this.eventAdded = false;
	        _this.lockedOn = false;
	        _this.lockedOff = false;

	        _this.initEvents();
	        return _this;
	    }

	    /**
	     * @access private
	     */

	    /**
	     * @var Object
	     */


	    _createClass(_class, [{
	        key: 'initEvents',
	        value: function initEvents() {
	            var _this2 = this;

	            this.transitionEndEvent = function (event) {
	                var eventTarget = event.target;
	                var optionsEventTarget = _this2.options.eventTarget;
	                var optionsEventPropertyName = _this2.options.eventProperty !== null ? (0, _zapBaseDomElement.getSupportedVendorProperty)(_this2.options.eventProperty) : null;
	                var eventPropertyName = event.propertyName;
	                var classNames = _this2.options.classNames;
	                var classNamePrefix = classNames.prefix;
	                var classNamePrefixShowNormal = classNamePrefix + classNames.on.normal;
	                var classNamePrefixShowStart = classNamePrefix + classNames.on.start;
	                var classNamePrefixShowEnd = classNamePrefix + classNames.on.end;
	                var classNamePrefixHideNormal = classNamePrefix + classNames.off.normal;
	                var classNamePrefixHideStart = classNamePrefix + classNames.off.start;
	                var classNamePrefixHideEnd = classNamePrefix + classNames.off.end;
	                var elementClassList = _this2.element.classList;

	                if (typeof event === 'undefined' || optionsEventTarget && eventTarget === optionsEventTarget || !optionsEventTarget && eventTarget === _this2.element) {
	                    if (_this2.options.completeCondition(event) && (optionsEventPropertyName === null || optionsEventPropertyName === eventPropertyName)) {
	                        if (_this2.element.classList.contains(classNamePrefixShowNormal)) {
	                            _this2.onSwitch = true;

	                            elementClassList.remove(classNamePrefixShowStart);
	                            elementClassList.remove(classNamePrefixHideNormal);
	                            elementClassList.remove(classNamePrefixHideStart);
	                            elementClassList.remove(classNamePrefixHideEnd);
	                            elementClassList.add(classNamePrefixShowEnd);

	                            _this2.fireEvent('complete', [true]);
	                        } else {
	                            _this2.onSwitch = false;

	                            elementClassList.remove(classNamePrefixHideStart);
	                            elementClassList.remove(classNamePrefixShowNormal);
	                            elementClassList.remove(classNamePrefixShowStart);
	                            elementClassList.remove(classNamePrefixShowEnd);
	                            elementClassList.add(classNamePrefixHideEnd);

	                            _this2.fireEvent('complete', [false]);
	                        }
	                    }
	                }
	            };
	        }

	        /**
	         * @access public
	         * @param {Boolean} [isOn]
	         * @param {Boolean} [animate]
	         */

	    }, {
	        key: 'start',
	        value: function start() {
	            var _this3 = this;

	            var isOn = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	            var animate = arguments.length <= 1 || arguments[1] === undefined ? this.options.animate : arguments[1];

	            var classNames = this.options.classNames;
	            var classNamePrefix = classNames.prefix;
	            var classNamePrefixShowNormal = classNamePrefix + classNames.on.normal;
	            var classNamePrefixShowStart = classNamePrefix + classNames.on.start;
	            var classNamePrefixShowEnd = classNamePrefix + classNames.on.end;
	            var classNamePrefixHideNormal = classNamePrefix + classNames.off.normal;
	            var classNamePrefixHideStart = classNamePrefix + classNames.off.start;
	            var classNamePrefixHideEnd = classNamePrefix + classNames.off.end;
	            var doTransition = _zapBaseDomElement.cssTransitionSupported && animate;
	            var onTriggerFunction = function onTriggerFunction() {
	                var elementClassList = _this3.element.classList;

	                elementClassList.add(classNamePrefixShowStart);
	                elementClassList.remove(classNamePrefixShowEnd);
	                elementClassList.remove(classNamePrefixHideStart);
	                elementClassList.remove(classNamePrefixHideEnd);
	                elementClassList.remove(classNamePrefixHideNormal);
	            };
	            var offTriggerFunction = function offTriggerFunction() {
	                var elementClassList = _this3.element.classList;

	                elementClassList.add(classNamePrefixHideStart);
	                elementClassList.remove(classNamePrefixHideEnd);
	                elementClassList.remove(classNamePrefixShowStart);
	                elementClassList.remove(classNamePrefixShowEnd);
	                elementClassList.remove(classNamePrefixShowNormal);
	            };

	            this.fireEvent('start', [isOn]);

	            if (isOn) {
	                if (!this.lockedOn) {
	                    this.lockedOn = true;
	                    this.lockedOff = false;

	                    this.element.classList.add(classNamePrefixShowNormal);

	                    if (doTransition) {
	                        clearTimeout(this.onTO);
	                        this.onTO = setTimeout(function () {
	                            onTriggerFunction();
	                        }, 20);
	                    } else {
	                        onTriggerFunction();
	                    }
	                }
	            } else {
	                if (!this.lockedOff) {
	                    this.lockedOn = false;
	                    this.lockedOff = true;

	                    this.element.classList.add(classNamePrefixHideNormal);

	                    if (doTransition) {
	                        clearTimeout(this.offTO);
	                        this.offTO = setTimeout(function () {
	                            offTriggerFunction();
	                        }, 20);
	                    } else {
	                        offTriggerFunction();
	                    }
	                }
	            }

	            if (doTransition) {
	                if (!this.eventAdded) {
	                    this.eventAdded = true;
	                    (0, _zapBaseDomElement.addEvent)(this.element, 'transitionend', this.transitionEndEvent);
	                }
	            } else {
	                this.transitionEndEvent({
	                    target: this.element
	                });
	            }
	        }

	        /**
	         * @access public
	         */

	    }, {
	        key: 'stop',
	        value: function stop() {
	            this.fireEvent('stop');
	            this.eventAdded = false;
	            (0, _zapBaseDomElement.removeEvent)(this.element, 'transitionend', this.transitionEndEvent);
	        }

	        /**
	         * @access public
	         * @param {Boolean} [animate]
	         */

	    }, {
	        key: 'turnOn',
	        value: function turnOn() {
	            var animate = arguments.length <= 0 || arguments[0] === undefined ? this.options.animate : arguments[0];

	            this.start(true, animate);
	        }

	        /**
	         * @access public
	         * @param {Boolean} [animate]
	         */

	    }, {
	        key: 'turnOff',
	        value: function turnOff() {
	            var animate = arguments.length <= 0 || arguments[0] === undefined ? this.options.animate : arguments[0];

	            this.start(false, animate);
	        }

	        /**
	         * @access public
	         * @return {Boolean}
	         */

	    }, {
	        key: 'isOn',
	        value: function isOn() {
	            return this.onSwitch;
	        }

	        /**
	         * @access public
	         * @return {Boolean}
	         */

	    }, {
	        key: 'isOff',
	        value: function isOff() {
	            return !this.isOn();
	        }

	        /**
	         * @access public
	         */

	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            this.eventAdded = false;
	            (0, _zapBaseDomElement.removeEvent)(this.element, 'transitionend', this.transitionEndEvent);
	        }
	    }]);

	    return _class;
	}(_zapBaseJsClass2.default);

	_class.defaultOptions = {
	    eventTarget: null,
	    eventProperty: null,
	    animate: true,
	    completeCondition: function completeCondition() {
	        return true;
	    },
	    classNames: {
	        prefix: 'zap-transition',
	        on: {
	            normal: '--transition-on',
	            start: '--transition-on-start',
	            end: '--transition-on-end'
	        },
	        off: {
	            normal: '--transition-off',
	            start: '--transition-off-start',
	            end: '--transition-off-end'
	        }
	    } };
	exports.default = _class;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.cssTransformSupported = exports.cssTransitionSupported = undefined;
	exports.create = create;
	exports.replace = replace;
	exports.clear = clear;
	exports.remove = remove;
	exports.destroy = destroy;
	exports.prepend = prepend;
	exports.append = append;
	exports.before = before;
	exports.after = after;
	exports.addEvent = addEvent;
	exports.addEvents = addEvents;
	exports.removeEvent = removeEvent;
	exports.fireEvent = fireEvent;
	exports.getSupportedVendorProperty = getSupportedVendorProperty;
	exports.getSize = getSize;
	exports.getPosition = getPosition;
	exports.getScroll = getScroll;
	exports.setStyles = setStyles;
	exports.getStyle = getStyle;
	exports.setVendorStyle = setVendorStyle;

	var _zapBaseDomData = __webpack_require__(3);

	var _zapBaseJsNumber = __webpack_require__(4);

	var _zapBaseJsString = __webpack_require__(5);

	/**
	 * @type {Element}
	 */
	var document = window.document;

	/**
	 * @type {CSSStyleDeclaration}
	 */
	var dummyStyle = document.createElement('div').style;

	/**
	 * @type {Number}
	 */
	var uniqueID = 0;

	/**
	 * @type {Object}
	 */
	var specialEvents = {
	    transitionend: {
	        'supportCheck': 'transition',
	        '': 'transitionend',
	        'webkit': 'webkitTransitionEnd',
	        'Moz': 'transitionend',
	        'ms': 'MSTransitionEnd',
	        'O': 'otransitionend'
	    },
	    animationstart: {
	        'supportCheck': 'animation',
	        '': 'animationstart',
	        'webkit': 'webkitAnimationStart',
	        'Moz': 'animationstart',
	        'ms': 'MSAnimationStart',
	        'O': 'oanimationstart'
	    },
	    animationend: {
	        'supportCheck': 'animation',
	        '': 'animationend',
	        'webkit': 'webkitAnimationEnd',
	        'Moz': 'animationend',
	        'ms': 'MSAnimationEnd',
	        'O': 'oanimationend'
	    },
	    animationiteration: {
	        'supportCheck': 'animation',
	        '': 'animationiteration',
	        'webkit': 'webkitIteration',
	        'Moz': 'animationiteration',
	        'ms': 'MSAnimationIteration',
	        'O': 'oanimationiteration'
	    }
	};

	/**
	 * @param {Element} element
	 * @returns {Number|undefined}
	 */
	function _uniqueID(element) {
	    return element.zapBaseUID || (element.zapBaseUID = uniqueID++);
	}

	/**
	 * @param {String} tagName
	 * @param {Object} [options]
	 * @returns {Element}
	 */
	function create(tagName, options) {
	    var element = document.createElement(tagName);

	    _uniqueID(element);

	    if (typeof options !== 'undefined') {
	        if (typeof options.text !== 'undefined') {
	            element.textContent = options.text;
	        }

	        if (typeof options.id !== 'undefined') {
	            element.setAttribute('id', options.id);
	        }

	        if (typeof options.classes !== 'undefined') {
	            element.className = options.classes.join(' ');
	        }

	        if (typeof options.attributes !== 'undefined') {
	            for (var attribute in options.attributes) {
	                if (options.attributes.hasOwnProperty(attribute)) {
	                    element.setAttribute(attribute, options.attributes[attribute]);
	                }
	            }
	        }

	        if (typeof options.styles !== 'undefined') {
	            setStyles(element, options.styles);
	        }

	        if (typeof options.events !== 'undefined') {
	            addEvents(element, options.events);
	        }
	    }

	    return element;
	}

	/**
	 * @param {Element} element
	 * @param {Element} target
	 * @returns void
	 */
	function replace(element, target) {
	    target.parentNode.replaceChild(element, target);
	}

	/**
	 * @param {Element} element
	 * @returns void
	 */
	function clear(element) {
	    var firstChild = undefined;

	    while (firstChild = element.firstChild) {
	        // eslint-disable-line no-cond-assign
	        element.removeChild(firstChild);
	    }
	}

	/**
	 * @param {Element} element
	 * @returns void
	 */
	function remove(element) {
	    var parent = element.parentNode;

	    if (parent) {
	        parent.removeChild(element);
	    }
	}

	/**
	 * @param {Element} element
	 * @returns void
	 */
	function destroy(element) {
	    removeEvent(element);
	    (0, _zapBaseDomData.clear)(element, 'zapEvents');

	    var children = element.children;

	    for (var i = children.length - 1; i >= 0; --i) {
	        destroy(children[i]);
	    }

	    remove(element);
	}

	/**
	 * @param {Element} element
	 * @param {Element} target
	 * @returns void
	 */
	function prepend(element, target) {
	    target.insertBefore(element, target.firstChild);
	}

	/**
	 * @param {Element} element
	 * @param {Element} target
	 * @returns void
	 */
	function append(element, target) {
	    target.appendChild(element);
	}

	/**
	 * @param {Element} element
	 * @param {Element} target
	 * @returns void
	 */
	function before(element, target) {
	    var parent = target.parentNode;

	    if (parent) {
	        parent.insertBefore(element, target);
	    }
	}

	/**
	 * @param {Element} element
	 * @param {Element} target
	 * @returns void
	 */
	function after(element, target) {
	    var parent = target.parentNode;

	    if (parent) {
	        parent.insertBefore(element, target.nextSibling);
	    }
	}

	/**
	 * @access static
	 * @param {Element} element
	 * @param {String} eventName
	 * @param {Function} eventFunction
	 * @param {Object} [options]
	 * @returns void
	 */
	function addEvent(element, eventName, eventFunction) {
	    var options = arguments.length <= 3 || arguments[3] === undefined ? {
	        call: false
	    } : arguments[3];

	    _uniqueID(element);

	    var events = (0, _zapBaseDomData.retrieve)(element, 'zapEvents');

	    if (!events) {
	        events = {};
	        (0, _zapBaseDomData.store)(element, 'zapEvents', events);
	    }

	    if (typeof specialEvents[eventName] !== 'undefined') {
	        var vendor = getSupportedVendorProperty(specialEvents[eventName].supportCheck, true);

	        if (vendor !== false) {
	            eventName = specialEvents[eventName][vendor]; // eslint-disable-line no-param-reassign
	        }
	    }

	    if (!events[eventName]) {
	        events[eventName] = [];
	    }

	    if (events[eventName].indexOf(eventFunction) !== -1) {
	        return;
	    }

	    events[eventName].push(eventFunction);

	    element.addEventListener(eventName, eventFunction, false);

	    if (options.call) {
	        eventFunction();
	    }
	}

	/**
	 * @param {Element} element
	 * @param {Object} events
	 * @returns void
	 */
	function addEvents(element, events) {
	    for (var event in events) {
	        if (events.hasOwnProperty(event)) {
	            addEvent(element, event, events[event]);
	        }
	    }
	}

	/**
	 * @param {Element} element
	 * @param {String} [eventName]
	 * @param {Function} [eventFunction]
	 * @returns void
	 */
	function removeEvent(element, eventName, eventFunction) {
	    var events = (0, _zapBaseDomData.retrieve)(element, 'zapEvents');

	    if (!events) {
	        events = {};
	        (0, _zapBaseDomData.store)(element, 'zapEvents', events);
	    }

	    if (eventName) {
	        if (typeof specialEvents[eventName] !== 'undefined') {
	            var vendor = getSupportedVendorProperty(specialEvents[eventName].supportCheck, true);

	            if (vendor !== false) {
	                eventName = specialEvents[eventName][vendor]; // eslint-disable-line no-param-reassign
	            }
	        }

	        if (events[eventName]) {
	            if (eventFunction) {
	                var i = events[eventName].indexOf(eventFunction);

	                if (i !== -1) {
	                    element.removeEventListener(eventName, eventFunction, false);
	                    events[eventName].splice(i, 1);
	                }
	            } else {
	                var eventsLength = events[eventName].length;

	                for (var i = 0; i < eventsLength; ++i) {
	                    element.removeEventListener(eventName, events[eventName][i], false);
	                }

	                delete events[eventName];
	            }
	        }
	    } else {
	        for (var i in events) {
	            if (events.hasOwnProperty(i)) {
	                var eventsLength = events[i].length;

	                for (var j = 0; j < eventsLength; ++j) {
	                    element.removeEventListener(i, events[i][j], false);
	                }

	                delete events[i];
	            }
	        }
	    }
	}

	/**
	 * TODO: real events?
	 * @param {Element} element
	 * @param {String} eventName
	 * @param {*} [args]
	 */
	function fireEvent(element, eventName, args) {
	    var events = (0, _zapBaseDomData.retrieve)(element, 'zapEvents');

	    if (!events) {
	        events = {};
	        (0, _zapBaseDomData.store)(element, 'zapEvents', events);
	    }

	    if (typeof specialEvents[eventName] !== 'undefined') {
	        var vendor = getSupportedVendorProperty(specialEvents[eventName].supportCheck, true);

	        if (vendor !== false) {
	            eventName = specialEvents[eventName][vendor]; // eslint-disable-line no-param-reassign
	        }
	    }

	    if (!events || !events[eventName]) {
	        return;
	    }

	    var eventsLength = events[eventName].length;

	    for (var i = 0; i < eventsLength; ++i) {
	        events[eventName][i](args);
	    }
	}

	/**
	 * example: zapBaseElement.getSupportedVendorProperty('transform'); -> webkitTransform
	 * @param {String} property
	 * @param {Boolean} [getVendor] just get the vendor prefix (like webkit)
	 * @returns {Boolean|String}
	 */
	function getSupportedVendorProperty(property) {
	    var getVendor = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	    var vendors = ['', 'webkit', 'Moz', 'ms', 'O'];
	    var vendorsLength = vendors.length;

	    for (var i = 0; i < vendorsLength; ++i) {
	        var finalPropertyName = i ? vendors[i] + (0, _zapBaseJsString.capitalizeFirstLetter)(property) : property;

	        if (finalPropertyName in dummyStyle) {
	            return getVendor ? vendors[i] : finalPropertyName;
	        }
	    }

	    return false;
	}

	/**
	 * @param {Element} element
	 * @returns {{x: Number, y: Number}}
	 */
	function getSize(element) {
	    var doc = document;
	    var win = window;
	    var size = undefined;

	    if (element === doc || element === win || element === doc.documentElement || element === doc.body) {
	        var html = doc.documentElement;

	        size = {
	            x: html.clientWidth,
	            y: html.clientHeight
	        };
	    } else {
	        size = {
	            x: element.offsetWidth,
	            y: element.offsetHeight
	        };
	    }

	    return size;
	}

	/**
	 * @param {Element} element
	 * @param {Object} [options]
	 * @returns {{x, y}}
	 */
	function getPosition(element, options) {
	    var getBoundingClientRect = element.getBoundingClientRect();
	    var relativePositions = undefined;
	    var relativeToElement = false;
	    var ignoreBorder = false;
	    var addBodyScroll = true;
	    var xPosition = (0, _zapBaseJsNumber.parseInt)(getBoundingClientRect.left);
	    var yPosition = (0, _zapBaseJsNumber.parseInt)(getBoundingClientRect.top);

	    if (typeof options !== 'undefined') {
	        if (typeof options.ignoreBorder !== 'undefined') {
	            ignoreBorder = options.ignoreBorder;
	        }

	        if (typeof options.relativeTo !== 'undefined') {
	            relativeToElement = options.relativeTo;
	        }

	        if (typeof options.ignoreBodyScroll !== 'undefined') {
	            addBodyScroll = !options.ignoreBodyScroll;
	        }
	    }

	    if (addBodyScroll) {
	        var bodyScroll = getScroll(document.body);
	        xPosition += bodyScroll.x;
	        yPosition += bodyScroll.y;
	    }

	    if (relativeToElement) {
	        relativePositions = getPosition(relativeToElement);
	        xPosition -= relativePositions.x;
	        yPosition -= relativePositions.y;
	    }

	    if (ignoreBorder) {
	        xPosition += getStyle(element, 'borderLeftWidth', true);
	        yPosition += getStyle(element, 'borderTopWidth', true);
	    }

	    return {
	        x: xPosition,
	        y: yPosition
	    };
	}

	/**
	 * @param {Element} element
	 * @returns {{x: Number, y: Number}}
	 */
	function getScroll(element) {
	    var doc = document;
	    var win = window;
	    var body = document.body;
	    var scroll = {
	        x: 0,
	        y: 0
	    };

	    if (element === doc || element === win || element === doc.documentElement || element === body) {
	        scroll.x = win.pageXOffset || body.scrollLeft;
	        scroll.y = win.pageYOffset || body.scrollTop;
	    } else {
	        scroll.x = element.scrollLeft;
	        scroll.y = element.scrollTop;
	    }

	    return scroll;
	}

	/**
	 * @param {Element} element
	 * @param {Object} styles
	 * @param {Boolean} [checkForVendorStyles]
	 * @returns void
	 */
	function setStyles(element, styles) {
	    var checkForVendorStyles = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

	    var finalPropertyName = undefined;

	    for (var property in styles) {
	        if (styles.hasOwnProperty(property)) {
	            finalPropertyName = checkForVendorStyles ? getSupportedVendorProperty(property) : property;

	            if (!checkForVendorStyles || finalPropertyName) {
	                element.style[finalPropertyName] = styles[property];
	            }
	        }
	    }
	}

	// TODO: if only one parameter, return the getComputedStyle object?? or another extra function for getComputedStyle
	/**
	 * @param {Element} element
	 * @param {String} property
	 * @param {Boolean} [parseIntVal]
	 * @returns {String|Number}
	 */
	function getStyle(element, property) {
	    var parseIntVal = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

	    var value = element.style[property] || window.getComputedStyle(element, null)[property];

	    return parseIntVal ? (0, _zapBaseJsNumber.parseInt)(value) : value;
	}

	/**
	 * @param {Element} element
	 * @param {String} property
	 * @param {String|Number|null} value
	 * @returns void
	 */
	function setVendorStyle(element, property, value) {
	    var uppercaseProperty = (0, _zapBaseJsString.capitalizeFirstLetter)(property);

	    if (value === null) {
	        element.style.removeProperty((0, _zapBaseJsString.dasherize)('-webkit' + uppercaseProperty));
	        element.style.removeProperty((0, _zapBaseJsString.dasherize)('-moz' + uppercaseProperty));
	        element.style.removeProperty((0, _zapBaseJsString.dasherize)('-ms' + uppercaseProperty));
	        element.style.removeProperty((0, _zapBaseJsString.dasherize)(property));
	    } else {
	        element.style['webkit' + uppercaseProperty] = value;
	        element.style['moz' + uppercaseProperty] = value;
	        element.style['ms' + uppercaseProperty] = value;
	        element.style[property] = value;
	    }
	}

	/**
	 * @var {Boolean}
	 */
	var cssTransitionSupported = exports.cssTransitionSupported = function transitionSupported() {
	    return getSupportedVendorProperty('transition') !== false;
	}();

	/**
	 * @var {Boolean}
	 */
	var cssTransformSupported = exports.cssTransformSupported = function transformSupported() {
	    return getSupportedVendorProperty('transform') !== false;
	}();

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.store = store;
	exports.retrieve = retrieve;
	exports.clear = clear;

	/**
	 * @param {Element} element
	 * @param {String} name
	 * @param {*} value
	 * @returns void
	 */
	function store(element, name, value) {
	    if (typeof element.zapData === 'undefined') {
	        element.zapData = {};
	    }

	    var storage = element.zapData;
	    storage[name] = value;
	}

	/**
	 * @param {Element} element
	 * @param {String} name
	 * @param {*} [defaultValue]
	 * @returns {*}
	 */
	function retrieve(element, name, defaultValue) {
	    if (typeof element.zapData === 'undefined') {
	        element.zapData = {};
	    }

	    var storage = element.zapData;
	    var value = storage[name];

	    if (typeof value === 'undefined' && typeof defaultValue !== 'undefined') {
	        value = defaultValue;
	    }

	    return value;
	}

	/**
	 * @param {Element} element
	 * @param {String} [name]
	 * @returns void
	 */
	function clear(element, name) {
	    if (typeof element.zapData !== 'undefined') {
	        var storage = element.zapData;

	        if (typeof name !== 'undefined') {
	            delete storage[name];
	        } else {
	            element.zapData = {};
	        }
	    }
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.random = random;

	/**
	 * @param {String|Number|null} value
	 * @returns {Number}
	 */
	function customParseInt(value) {
	    var intVal = parseInt(value, 10);

	    return isNaN(intVal) ? 0 : intVal;
	}

	exports.parseInt = customParseInt;

	/**
	 * @param {String|Number|null} value
	 * @returns {Number}
	 */

	function customParseFloat(value) {
	    var floatVal = parseFloat(value);

	    return isNaN(floatVal) ? 0 : floatVal;
	}

	exports.parseFloat = customParseFloat;

	/**
	 * @param {Number} min
	 * @param {Number} max
	 * @returns {Number}
	 */

	function random(min, max) {
	    return Math.floor(Math.random() * (max - min + 1) + min);
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.capitalize = capitalize;
	exports.capitalizeFirstLetter = capitalizeFirstLetter;
	exports.camelize = camelize;
	exports.dasherize = dasherize;

	/**
	 * @param {String} value
	 * @returns {String}
	 */
	function capitalize(value) {
	    return value.replace(/(?:^|\s)\S/g, function (letter) {
	        return letter.toUpperCase();
	    });
	}

	/**
	 * @param {String} value
	 * @returns {String}
	 */
	function capitalizeFirstLetter(value) {
	    return value.charAt(0).toUpperCase() + value.slice(1);
	}

	/**
	 * @param {String} value
	 * @returns {String}
	 */
	function camelize(value) {
	    // thanks to zeptojs
	    return value.replace(/-+(.)?/g, function (match, newValue) {
	        return newValue ? newValue.toUpperCase() : '';
	    });
	}

	/**
	 * @param {String} value
	 * @returns {String}
	 */
	function dasherize(value) {
	    // thanks to zeptojs
	    return value.replace(/::/g, '/').replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2').replace(/([a-z\d])([A-Z])/g, '$1_$2').replace(/_/g, '-').toLowerCase();
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i];for (var key in source) {
	            if (Object.prototype.hasOwnProperty.call(source, key)) {
	                target[key] = source[key];
	            }
	        }
	    }return target;
	};

	var _createClass = function () {
	    function defineProperties(target, props) {
	        for (var i = 0; i < props.length; i++) {
	            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	        }
	    }return function (Constructor, protoProps, staticProps) {
	        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	    };
	}();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _zapBaseJsObject = __webpack_require__(7);

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

	var removeOn = function removeOn(string) {
	    return string.replace(/^on([A-Z])/, function (full, first) {
	        return first.toLowerCase();
	    });
	};

	var _class = function () {

	    /**
	     * @param {Object} [options]
	     */

	    /**
	     * @type {Object}
	     */

	    function _class() {
	        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	        _classCallCheck(this, _class);

	        this.options = {};
	        this.$events = {};

	        this.setOptions(options);
	    }

	    /**
	     * @access public
	     * @param {Object} options
	     * @returns void
	     */

	    /**
	     * @type {Object}
	     */

	    /**
	     * @type {Object}
	     */

	    _createClass(_class, [{
	        key: 'setOptions',
	        value: function setOptions(options) {
	            this.options = _extends({}, this.constructor.defaultOptions, options);

	            for (var option in this.options) {
	                if (this.options.hasOwnProperty(option) && typeof this.options[option] === 'function' && /^on[A-Z]/.test(option)) {
	                    this.addEvent(removeOn(option), this.options[option]);
	                    delete this.options[option];
	                }
	            }
	        }

	        /**
	         * @access public
	         * @param {String} type
	         * @param {Function} fn
	         * @returns void
	         */

	    }, {
	        key: 'addEvent',
	        value: function addEvent(type, fn) {
	            var eventType = removeOn(type);

	            if (!this.$events) {
	                this.$events = {};
	            }

	            var events = this.$events[eventType] || [];

	            if (events.indexOf(fn) === -1) {
	                events.push(fn);
	                this.$events[eventType] = events;
	            }
	        }

	        /**
	         * @access public
	         * @param {Object} events
	         * @returns void
	         */

	    }, {
	        key: 'addEvents',
	        value: function addEvents(events) {
	            for (var type in events) {
	                if (events.hasOwnProperty(type)) {
	                    this.addEvent(removeOn(type), events[type]);
	                }
	            }
	        }

	        /**
	         * @access public
	         * @param {String} type
	         * @param {Array} args
	         * @returns void
	         */

	    }, {
	        key: 'fireEvent',
	        value: function fireEvent(type) {
	            var args = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

	            var eventType = removeOn(type);
	            var events = this.$events && this.$events[eventType];

	            if (events) {
	                events.forEach(function (fn) {
	                    fn.apply(undefined, _toConsumableArray(args));
	                });
	            }
	        }

	        /**
	         * @access public
	         * @param {String} type
	         * @param {Function} fn
	         * @returns void
	         */

	    }, {
	        key: 'removeEvent',
	        value: function removeEvent(type, fn) {
	            var eventType = removeOn(type);
	            var events = this.$events[eventType];

	            if (events) {
	                var index = events.indexOf(fn);

	                if (index !== -1) {
	                    events.splice(index, 1);

	                    if (!(0, _zapBaseJsObject.length)(this.$events[eventType])) {
	                        delete this.$events[eventType];
	                    }
	                }
	            }
	        }

	        /**
	         * @access public
	         * @param {Object} [events]
	         * @returns void
	         */

	    }, {
	        key: 'removeEvents',
	        value: function removeEvents(events) {
	            if (typeof events === 'undefined') {
	                var $events = this.$events;

	                for (var type in $events) {
	                    if ($events.hasOwnProperty(type)) {
	                        var length = $events[type].length;

	                        for (var i = 0; i < length; ++i) {
	                            this.removeEvent(type, $events[type][i]);
	                        }
	                    }
	                }
	            } else {
	                for (var type in events) {
	                    if (events.hasOwnProperty(type)) {
	                        this.removeEvent(type, events[type]);
	                    }
	                }
	            }
	        }

	        /**
	         * @access public
	         * @returns void
	         */

	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            this.removeEvents();
	        }
	    }]);

	    return _class;
	}();

	_class.defaultOptions = {};
	exports.default = _class;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.assign = assign;
	exports.clone = clone;
	exports.each = each;
	exports.length = length;

	/**
	 * @param {...Object} [obj]
	 * @returns {Object}
	 */
	function assign() {
	  return _extends.apply(undefined, [{}].concat(Array.prototype.slice.call(arguments)));
	}

	/**
	 * @param {Object} obj
	 * @returns {Object}
	 */
	function clone(obj) {
	  return _extends({}, obj);
	}

	/**
	 * @alias of assign
	 * @param {...Object} [obj]
	 * @returns {Object}
	 */
	exports.extend = assign;

	/**
	 * @param {object} obj
	 * @param {Function} fn
	 */

	function each(obj, fn) {
	  Object.keys(obj).forEach(function (key) {
	    fn(obj[key], key);
	  });
	}

	/**
	 * @alias of each
	 * @param {object} obj
	 * @param {Function} fn
	 */
	exports.forEach = each;

	/**
	 * @param {Object} obj
	 * @returns {Number}
	 */

	function length(obj) {
	  return Object.keys(obj).length;
	}

/***/ }
/******/ ]);
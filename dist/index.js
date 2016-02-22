'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _zapBaseDomElement = require('zap-base-dom-element');

var _zapBaseJsClass = require('zap-base-js-class');

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
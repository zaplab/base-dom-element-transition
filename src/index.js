
import {
    addEvent as zapElementAddEvent,
    removeEvent as zapElementRemoveEvent,
    getSupportedVendorProperty as zapElementGetSupportedVendorProperty,
    cssTransitionSupported as zapElementCssTransitionSupported,
} from 'zap-base-dom-element';

import ZapClass from 'zap-base-js-class';

export default class extends ZapClass {
    /**
     * @var Object
     */
    static defaultOptions = {
        eventTarget: null,
        eventProperty: null,
        animate: true,
        completeCondition: () => true,
        classNames: {
            prefix: 'zap-transition',
            on: {
                normal: '--transition-on',
                start: '--transition-on-start',
                end: '--transition-on-end',
            },
            off: {
                normal: '--transition-off',
                start: '--transition-off-start',
                end: '--transition-off-end',
            },
        },
        // onStart (isOn)
        // onStop
        // onComplete (isOn)
    };

    /**
     * @param {Element} target
     * @param {Object} [options]
     */
    constructor(target, options = {}) {
        super(options);

        this.element = target;
        this.onSwitch = false;
        this.eventAdded = false;
        this.lockedOn = false;
        this.lockedOff = false;

        this.initEvents();
    }

    /**
     * @access private
     */
    initEvents() {
        this.transitionEndEvent = event => {
            const eventTarget = event.target;
            const optionsEventTarget = this.options.eventTarget;
            const optionsEventPropertyName = (this.options.eventProperty !== null) ? zapElementGetSupportedVendorProperty(this.options.eventProperty) : null;
            const eventPropertyName = event.propertyName;
            const classNames = this.options.classNames;
            const classNamePrefix = classNames.prefix;
            const classNamePrefixShowNormal = classNamePrefix + classNames.on.normal;
            const classNamePrefixShowStart = classNamePrefix + classNames.on.start;
            const classNamePrefixShowEnd = classNamePrefix + classNames.on.end;
            const classNamePrefixHideNormal = classNamePrefix + classNames.off.normal;
            const classNamePrefixHideStart = classNamePrefix + classNames.off.start;
            const classNamePrefixHideEnd = classNamePrefix + classNames.off.end;
            const elementClassList = this.element.classList;

            if ((typeof event === 'undefined') || ((optionsEventTarget && (eventTarget === optionsEventTarget)) || (!optionsEventTarget && (eventTarget === this.element)))) {
                if (this.options.completeCondition(event) && ((optionsEventPropertyName === null) || (optionsEventPropertyName === eventPropertyName))) {
                    if (this.element.classList.contains(classNamePrefixShowNormal)) {
                        this.onSwitch = true;

                        elementClassList.remove(classNamePrefixShowStart);
                        elementClassList.remove(classNamePrefixHideNormal);
                        elementClassList.remove(classNamePrefixHideStart);
                        elementClassList.remove(classNamePrefixHideEnd);
                        elementClassList.add(classNamePrefixShowEnd);

                        this.fireEvent('complete', [true]);
                    } else {
                        this.onSwitch = false;

                        elementClassList.remove(classNamePrefixHideStart);
                        elementClassList.remove(classNamePrefixShowNormal);
                        elementClassList.remove(classNamePrefixShowStart);
                        elementClassList.remove(classNamePrefixShowEnd);
                        elementClassList.add(classNamePrefixHideEnd);

                        this.fireEvent('complete', [false]);
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
    start(isOn = true, animate = this.options.animate) {
        const classNames = this.options.classNames;
        const classNamePrefix = classNames.prefix;
        const classNamePrefixShowNormal = classNamePrefix + classNames.on.normal;
        const classNamePrefixShowStart = classNamePrefix + classNames.on.start;
        const classNamePrefixShowEnd = classNamePrefix + classNames.on.end;
        const classNamePrefixHideNormal = classNamePrefix + classNames.off.normal;
        const classNamePrefixHideStart = classNamePrefix + classNames.off.start;
        const classNamePrefixHideEnd = classNamePrefix + classNames.off.end;
        const doTransition = (zapElementCssTransitionSupported && animate);
        const onTriggerFunction = () => {
            const elementClassList = this.element.classList;

            elementClassList.add(classNamePrefixShowStart);
            elementClassList.remove(classNamePrefixShowEnd);
            elementClassList.remove(classNamePrefixHideStart);
            elementClassList.remove(classNamePrefixHideEnd);
            elementClassList.remove(classNamePrefixHideNormal);
        };
        const offTriggerFunction = () => {
            const elementClassList = this.element.classList;

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
                    this.onTO = setTimeout(() => {
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
                    this.offTO = setTimeout(() => {
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
                zapElementAddEvent(this.element, 'transitionend', this.transitionEndEvent);
            }
        } else {
            this.transitionEndEvent({
                target: this.element,
            });
        }
    }

    /**
     * @access public
     */
    stop() {
        this.fireEvent('stop');
        this.eventAdded = false;
        zapElementRemoveEvent(this.element, 'transitionend', this.transitionEndEvent);
    }

    /**
     * @access public
     * @param {Boolean} [animate]
     */
    turnOn(animate = this.options.animate) {
        this.start(true, animate);
    }

    /**
     * @access public
     * @param {Boolean} [animate]
     */
    turnOff(animate = this.options.animate) {
        this.start(false, animate);
    }

    /**
     * @access public
     * @return {Boolean}
     */
    isOn() {
        return this.onSwitch;
    }

    /**
     * @access public
     * @return {Boolean}
     */
    isOff() {
        return !this.isOn();
    }

    /**
     * @access public
     */
    destroy() {
        this.eventAdded = false;
        zapElementRemoveEvent(this.element, 'transitionend', this.transitionEndEvent);
    }
}

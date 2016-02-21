
import Transition from 'zap-base-dom-element-transition';

describe('zap-base-dom-transition', () => {
    const styleTag = document.createElement('style');
    const style = `
        .example {
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            width: 100px;
            height: 100px;
            opacity: 0;
            background-color: red;
            -webkit-transition: opacity .4s ease-in-out;
            transition: opacity .4s ease-in-out;
        }
        .example.zap-transition--transition-on,
        .example.zap-transition--transition-off {
            display: block;
        }
        .example.zap-transition--transition-on-start,
        .example.zap-transition--transition-on-end {
            opacity: 1;
        }
        .example.zap-transition--transition-off {
            opacity: 1;
        }
        .example.zap-transition--transition-off-start {
            opacity: 0;
        }
        .example.zap-transition--transition-off-end {
            opacity: 0;
        }
    `;
    styleTag.textContent = style;
    document.body.appendChild(styleTag);

    beforeEach(() => {});

    afterEach(() => {});

    describe('should export the following', () => {
        it('Transition', function () {
            expect(Transition).toEqual(jasmine.any(Function));
        });
    });

    describe('Transition', () => {
        const onCompleteSpy = jasmine.createSpy('onCompleteSpy');
        const element = document.createElement('div');
        element.className = 'example';
        document.body.appendChild(element);

        const transition = new Transition(element, {
            onComplete: function (on) {
                onCompleteSpy(on);
            },
        });

        it('turnOn should fire onComplete', (done) => {
            transition.turnOn();

            setTimeout(function () {
                expect(onCompleteSpy).toHaveBeenCalledWith(true);
                done();
            }, 500);
        });

        it('turnOff should fire onComplete', (done) => {
            onCompleteSpy.calls.reset();
            transition.turnOff();

            setTimeout(function () {
                expect(onCompleteSpy).toHaveBeenCalledWith(false);
                done();
            }, 500);
        });
    });
});

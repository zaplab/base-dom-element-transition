# zap-base-dom-element-transition

just extracting and translating some old code to ES6,
nothing to see here ;-)
a javascript "hook" for css transitions (transitionend event) i wrote in 2013.

## Install
```
$ npm install zap-base-dom-element-transition
```

## Usage
```js
import Transition from 'zap-base-dom-element-transition';
```

```js
const transition = new Transition(DOMElement, {
    eventTarget: null,
    eventProperty: null,
    animate: true,
    completeCondition: event => true,
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
    onComplete: onOrOff => {},
    onStart: onOrOff => {},
    onStop: () => {},
});

transition.turnOn();
```

## whats going on?

```html
<div class="example">
    <h1>Example</h1>
</div>
```

```transition.turnOn();``` will add ```'zap-transition--transition-on zap-transition--transition-on-start'```
to the elements class attribute.

```html
<div class="example zap-transition--transition-on zap-transition--transition-on-start">
    <h1>Example</h1>
</div>
```

and ```'zap-transition--transition-on zap-transition--transition-on-end'``` when the transition is done.

```html
<div class="example zap-transition--transition-on zap-transition--transition-on-end">
    <h1>Example</h1>
</div>
```

```transition.turnOff();``` will add ```'zap-transition--transition-off zap-transition--transition-off-start'```
to the elements class attribute.

```html
<div class="example zap-transition--transition-off zap-transition--transition-off-start">
    <h1>Example</h1>
</div>
```

and ```'zap-transition--transition-off zap-transition--transition-off-end'``` when the transition is done.

```html
<div class="example zap-transition--transition-off zap-transition--transition-off-end">
    <h1>Example</h1>
</div>
```

## whats does this solve?
if i remember correctly ;) i did this to:
1. to transition ```display: none;``` elements

```css
.example {
    display: none;
    opacity: 0;
    transition: opacity .4s ease-in-out;
}

.example.zap-transition--transition-on,
.example.zap-transition--transition-off {
    display: block;
}

.example.zap-transition--transition-on-start,
.example.zap-transition--transition-on-end,
.example.zap-transition--transition-off {
    opacity: 1;
}
.example.zap-transition--transition-off-start,
.example.zap-transition--transition-off-end {
    opacity: 0;
}
.example.zap-transition--transition-off-end {
    display: none;
}
```

2. to set the transition speed and type via CSS and not in javascript

...
of course there are limits to this .. and probably its total shit ;) but i still use it somewhere ;)

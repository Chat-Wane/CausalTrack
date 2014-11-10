# CausalTrack

<i>Keywords: Causality tracking, version vectors, interval version vectors, version vector with exceptions</i>

This project provides two structures for causality tracking. The first one is
the well-known version vector which allows to characterize on-the-fly
causality between events. The second one is the interval version vector [1]
which provides a tracking of semantically dependent events. Therefore,
independant events are non-blocking to each other. The last one is a version
vector with exceptions [2] which provides the same features than the latter
with a different structure.

## Installation

```
$ npm install causaltrack
```

## Usage

The module has been [browserified](http://browserify.org/) and
[uglified](https://github.com/mishoo/UglifyJS). To include CausalTrack within
your browser, put the following line in your html:

```html
<script src="./causaltrack.bundle.js"></script>
```

Then, whether you use the browserified version or nodejs:

```js
var VV = require('causaltrack').VV;   // version vector
var IVV = require('causaltrack').IVV; // interval version vector
var VVwE = require('causaltrack').VVwE; // version vector with exceptions

// #1 Initialize the causality tracking structure with the unique site
// identifier 42
var vv = new VV(42);
var ivv = new IVV(42);
var vvwe = new VVwE(42);

// #2 Update the local entry of the local vector. Return a pair
// {_e:entry, _c:counter} of the sender which uniquely identifies the operation
var ecVV = vv.increment();
var ecIVV = ivv.increment();
var ecVVwE = vvwe.increment();

// #3 Check if the operation has already been integrated
vv.isLower(ecVV);
ivv.isLower(ecIVV);
vvwe.isLower(ecVVwE);

// #4 Check if the operation is ready to be integrated
vv.isRdy(rvv); // rvv instance of VV
ivv.isRdy(ecIVV); // ecIVV the entry clock specifying a dependency to an op
vvwe.isRdy(ecVVwE); // ecVVwE the entry clock specifying a dependency to an op

// #5 Increment the local vector with the entry clock of the received
// operation supposedly ready
vv.incrementFrom(ecVV);
ivv.incrementFrom(ecIVV);
vvwe.incrementFrom(ecVVwE);
```

## References

[1] [Optimized OR-Sets without Ordering Constraints](http://link.springer.com/chapter/10.1007/978-3-642-45249-9_15)

[2] [Concise version vectors in WinFS](http://link.springer.com/chapter/10.1007/11561927_25)
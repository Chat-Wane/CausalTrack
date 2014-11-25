# CausalTrack

<i>Keywords: Causality tracking, version vectors, interval version vectors, version vector with exceptions</i>

This project provides structures for causality tracking. The first one is the
well-known <i>version vector (VV)</i> which allows to characterise on-the-fly
causality between events.

The second one is the <i>interval version vector (IVV)</i> [1] which provides a
tracking of semantically dependent events. Therefore, independent events are
non-blocking to each other.

The next one is a <i>version vector with exceptions (VVwE)</i> [2] which
provides the same features than the IVV. Nevertheless, it does not use the same
underlying structure.

We provide another version of the VVwE called <i>perishing version vector with
exceptions (PVVwE)</i> where exceptions disappear over time by design. Such
vector is useful in practice since messages are expected to arrive within
defined range of time. Also, the site identifiers that are not used anymore
tend to disappear.

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
var PVVwE = require('causaltrack').PVVwE; // perishing VVwE

// #1 Initialize the causality tracking structure with the unique site
// identifier 42
var vv = new VV(42);
var ivv = new IVV(42);
var vvwe = new VVwE(42);
var pvvwe = new PVVwE(42);

// #2 Update the local entry of the local vector. Return a pair
// {_e:entry, _c:counter} of the sender which uniquely identifies the operation
var ecVV = vv.increment();
var ecIVV = ivv.increment();
var ecVVwE = vvwe.increment();
var ecPVVwE = pvvwe.increment();

// #3 Check if the operation has already been integrated
vv.isLower(ecVV);
ivv.isLower(ecIVV);
vvwe.isLower(ecVVwE);
pvvwe.isLower(ecPVVwE);

// #4 Check if the operation is ready to be integrated
vv.isRdy(rvv); // rvv instance of VV
ivv.isRdy(ecIVV); // ecIVV the entry clock specifying a dependency to an o
vvwe.isRdy(ecVVwE); // ecVVwE the entry clock specifying a dependency to an op
pvvwe.isRdy(ecPVVwE);

// #5 Increment the local vector with the entry clock of the received
// operation supposedly ready
vv.incrementFrom(ecVV);
ivv.incrementFrom(ecIVV);
vvwe.incrementFrom(ecVVwE);
pvvwe.incrementFrom(ecPVVwE);
```

## References

[1] [Optimized OR-Sets without Ordering Constraints](http://link.springer.com/chapter/10.1007/978-3-642-45249-9_15)

[2] [Concise version vectors in WinFS](http://link.springer.com/chapter/10.1007/11561927_25)
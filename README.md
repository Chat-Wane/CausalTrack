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

//#1 init a version vector with the local entry 42
var vversion = new VV(42);
var ivversion = new IVV(42);
var vvwe = new VVwE(42);

//#2 update the local entry of the local vector
vversion.increment();
ivversion.increment();
vvwe.increment();

//#3 increment with data received from other sites supposedly ready
vversion.incrementFrom(rvv); // rvv of type VV
ivversion.incrementFrom(ec); // couple {_e: entry, _c: counter } of the sender
vvweversion.incrementFrom(ec);// couple {_e: entry, _c: counter } of the sender

//#4 verify if the data are ready regards to the local vector
vversion.isRdy(rvv); // rvv of type VV
ivversion.isRdy(ec); // targeted semantically dependant event.
		     // couple {_e: entry, _c: counter} of dependant event
vvwe.isRdy(ec); // targeted semantically dependant event.
		// couple {_e: entry, _c: counter} of dependant event

//#5 verify if the data are already included in the vector
vversion.isLower(rvv); // rvv of type VV
ivversion.isLower(ec); // unique identifier of the remote event
		       // couple {_e: entry, _c: counter} of dependant event
vvwe.isLower(ec); // unique identifier of the remote event
		       // couple {_e: entry, _c: counter} of dependant event
```

## References

[1] [Optimized OR-Sets without Ordering Constraints](http://link.springer.com/chapter/10.1007/978-3-642-45249-9_15)

[2] [Concise version vectors in WinFS](http://link.springer.com/chapter/10.1007/11561927_25)
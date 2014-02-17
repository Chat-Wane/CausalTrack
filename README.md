# CausalTrack

<i>Keywords: Causality tracking, version vectors, interval version vectors </i>

This project provides two structures for causality tracking. The first one is
the well-known version vector which allows to characterize on-the-fly causality
between events. The second one is the interval version vector which provides a
tracking of semantically dependent events. Therefore, independant events are
non-blocking to each other.

## Installation

```
$ npm install causaltrack
```

## Usage

```js
var VV = require('causaltrack').VV;   // version vector
var IVV = require('causaltrack').IVV; // interval version vector

//#1 init a version vector of size 37 with the local entry 13
var vversion = new VV(13,37);
var ivversion = new IVV(13,37);

//#2 update the local entry of the local vector
vversion.increment();
ivversion.increment();

//#3 increment with data received from other sites supposedly ready
vversion.incrementFrom(rvv); // rvv of type VV
ivversion.incrementFrom(ec); // couple {_e: entry, _c: counter } of the sender

//#4 verify if the data are ready regards to the local vector
vversion.isRdy(rvv); // rvv of type VV
ivversion.isRdy(ec); // targeted semantically dependant event.
		     // couple {_e: entry, _c: counter} of dependant event

//#5 verify if the data are already included in the vector
vversion.isLower(rvv); // rvv of type VV
ivversion.isLower(ec); // unique identifier of the remote event
		       // couple {_e: entry, _c: counter} of dependant event
```

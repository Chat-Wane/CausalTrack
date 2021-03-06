var expect = require('expect.js');
var Mocha = require('mocha');


var VV = require('../lib/vv.js');

describe('vv.js', function() {

    describe('increment', function(){
	it('increment the entry', function(){
	    var vv = new VV(13);
	    vv.increment();
	    expect(vv._v[vv._e]).to.be.eql(1);
	});
    });

    describe('incrementfrom', function(){
	it('increment the entry from another vv', function(){
	    var vv = new VV(13);
	    var remoteVV = new VV(4);
	    var ec = remoteVV.increment();
	    vv.incrementFrom(ec);
	    expect(remoteVV._v[remoteVV._e]).to.be.eql(1);
	    expect(vv._v[remoteVV._e]).to.be.eql(remoteVV._v[remoteVV._e]);
	});
    });
    
    describe('isReady', function(){
	it('check if the vv is ready', function(){
	    var vv = new VV(13);
	    var vv2 = new VV(0);
	    vv2.increment();
	    expect(vv.isRdy(vv2)).to.be.ok();
	    vv2.increment();
	    expect(vv.isRdy(vv2)).to.not.be.ok();
	});
    });

    describe('isLower', function(){
	it('check if the vv has been seen before or not', function(){
	    var vv = new VV(13);
	    var vv2 = new VV(0);
	    var ec = vv2.increment();
	    expect(vv.isLower(ec)).to.not.be.ok();
	    vv.incrementFrom(ec);
	    expect(vv.isLower(ec)).to.be.ok();
	});
    });
});

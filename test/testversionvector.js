var expect = require('expect.js');
var Mocha = require('mocha');
var assert = require('assert');

var VV = require('../lib/versionvector.js');

describe('versionvector.js', function() {

    describe('vv', function(){
	it('the size', function(){
	    var vv = new VV(13,37);
	    expect(vv._v).to.have.length(37);
	});
	
	it('init the entries to zero', function(){
	    var vv = new VV(13,37);
	    for (var i=0; i<vv._v.length; ++i){
		expect(vv._v[i]).to.be.eql(0);
	    };
	});
    });

    describe('increment', function(){
	it('increment the entry', function(){
	    var vv = new VV(13,37);
	    vv.increment();
	    expect(vv._v[vv._e]).to.be.eql(1);
	});
    });

    describe('incrementfrom', function(){
	it('increment the entry from another vv', function(){
	    var vv = new VV(13,37);
	    var remoteVV = new VV(4,37);
	    remoteVV.increment();
	    expect(vv._v[remoteVV._e]).to.be.eql(0);
	    vv.incrementFrom(remoteVV);
	    expect(remoteVV._v[remoteVV._e]).to.be.eql(1);
	    expect(vv._v[remoteVV._e]).to.be.eql(remoteVV._v[remoteVV._e]);
	});
    });
    
    describe('isReady', function(){
	it('check if the vv is ready', function(){
	    var vv = new VV(13,37);
	    var vv2 = new VV(0,37);
	    vv2.increment();
	    expect(vv2.isRdy(vv)).to.be.ok();
	    vv2.increment();
	    expect(vv2.isRdy(vv)).to.not.be.ok();
	});
    });
});

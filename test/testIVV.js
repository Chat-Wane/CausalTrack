var expect = require('expect.js');
var Mocha = require('mocha');

var IVV = require('../lib/intervalversionvector.js');

describe('intervalversionvector.js', function() {

    describe('ivv', function(){
	it('the size', function(){
	    var ivv = new IVV(13,37);
	    expect(ivv._v).to.have.length(37);
	    expect(ivv._o).to.have.length(37);
	});
	
	it('init the entries to zero', function(){
	    var ivv = new IVV(13,37);
	    for (var i=0; i< ivv._v.length; ++i){
		expect(ivv._v[i]).to.be.eql(0);
	    };
	    for (var i=0; i< ivv._v.length; ++i){
		expect(ivv._v[i]).to.be.eql(0);
	    };
	});
    });

    describe('increment', function(){
	it('increment the entry', function(){
	    var ivv = new IVV(13,37);
	    ivv.increment();
	    expect(ivv._v[ivv._e]).to.be.eql(1);
	});

	it('omen vector stay equal to zero for my entry', function(){
	    var ivv = new IVV(13,37);
	    ivv.increment();
	    ivv.increment();
	    expect(ivv._o[ivv._e]).to.be.eql(0);
	});
    });

    describe('incrementfrom', function(){
	it('increment the entry from another vv', function(){
	    var ivv = new IVV(13,37);
	    var rIVV = new IVV(4,37);
	    rIVV.increment();
	    expect(ivv._v[rIVV._e]).to.be.eql(0);
	    ivv.incrementFrom({_e: rIVV._e, _c:rIVV._v[rIVV._e] });
	    expect(rIVV._v[rIVV._e]).to.be.eql(1);
	    expect(ivv._v[rIVV._e]).to.be.eql(rIVV._v[rIVV._e]);
	});

	it('increment from anywhere does not affect my entry', function(){
	    var ivv = new IVV(13,37);
	    var rIVV = new IVV(4,37);
	    rIVV.increment();
	    ivv.incrementFrom({_e: rIVV._e, _c:rIVV._v[rIVV._e] });
	    expect(ivv._v[ivv._e]).to.be.eql(0);
	});

	it('a message is lost, omen takes a little advance', function(){
	    var ivv = new IVV(13,37);
	    var rIVV = new IVV(4,37);
	    rIVV.increment();
	    rIVV.increment();
	    expect(ivv._v[rIVV._e]).to.be.eql(0);
	    expect(rIVV._v[rIVV._e]).to.be.eql(2);
	    ivv.incrementFrom({_e: rIVV._e, _c:rIVV._v[rIVV._e] });
	    expect(ivv._v[rIVV._e]).to.be.eql(0);
	    expect(ivv._o[rIVV._e]).to.be.eql(2); // 00010 <-
	});
    });
    
    describe('isReady', function(){
	it('check if an operation depending on another is ready', function(){
	    var ivv = new IVV(13,37);
	    ivv.increment();
	    var target = {_e:ivv._e, _c:ivv._v[ivv._e]};
	    expect(ivv.isRdy(target)).to.be.ok();
	    var target2 = {_e:ivv._e, _c:(ivv._v[ivv._e]+1)}; // does not exist
	    expect(ivv.isRdy(target2)).to.not.be.ok();
	});
	
	it('check if an operation independant of any other is rdy',function(){
	});
    });
});

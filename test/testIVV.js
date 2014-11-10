var expect = require('expect.js');
var Mocha = require('mocha');

var IVV = require('../lib/intervalversionvector.js');
var BI = require("BigInt");

describe('intervalversionvector.js', function() {

    describe('ivv', function(){
	it('init the entries to zero', function(){
	    var ivv = new IVV(42);
	    expect(ivv.vector[0].e).to.be.eql(42);
	    expect(ivv.vector[0].v).to.be.eql(0);
	    expect(BI.isZero(ivv.vector[0].o)).to.be.ok();
	});
    });
    
    describe('increment', function(){
	it('increment the entry', function(){
	    var ivv = new IVV(42);
	    ivv.increment();
	    expect(ivv.vector[0].v).to.be.eql(1);
	});

	it('omen vector stay equal to zero for my entry', function(){
	    var ivv = new IVV(42);
	    ivv.increment();
	    ivv.increment();
	    expect(BI.isZero(ivv.vector[0].o)).to.be.ok();
	});
    });

    describe('incrementfrom', function(){
	it('increment the entry from another vv', function(){
	    var ivv = new IVV(13);
	    var rIVV = new IVV(42);
	    rIVV.increment();
	    ivv.incrementFrom({_e: rIVV.local.e, _c:rIVV.local.v });
	    expect(rIVV.vector[0].v).to.be.eql(1);
	    expect(ivv.vector[1].v).to.be.eql(rIVV.local.v);
	});

	it('increment from anywhere does not affect my entry', function(){
	    var ivv = new IVV(13);
	    var rIVV = new IVV(42);
	    rIVV.increment();
	    ivv.incrementFrom({_e: rIVV.local.e, _c:rIVV.local.v });
	    expect(ivv.local.v).to.be.eql(0);
	});

	it('a message is lost, omen takes a little advance', function(){
	    var ivv = new IVV(13);
	    var rIVV = new IVV(42);
	    rIVV.increment();
	    rIVV.increment();
	    expect(rIVV.local.v).to.be.eql(2);
	    ivv.incrementFrom({_e: rIVV.local.e, _c:rIVV.local.v });
	    expect(BI.modInt(ivv.vector[1].o,1337)).to.be.eql(2); // 00010 <-
	});

	it('a lot of messages are lost, omen must handle it',function(){
	    var ivv = new IVV(13);
	    var rIVV = new IVV(42);
	    for (var i = 0; i< 1000; ++i){
		rIVV.increment();
	    }
	    expect(rIVV.local.v).to.be.eql(1000);
	    ivv.incrementFrom({_e: rIVV.local.e, _c:rIVV.local.v });
	    var duplicate = BI.dup(ivv.vector[1].o);
	    BI.rightShift_(duplicate,999);
	    expect(BI.modInt(duplicate,1337)).to.be.eql(1); // 00010 <-
	});
    });
    
    describe('isReady', function(){
	it('check if an operation depending on another is ready', function(){
	    var ivv = new IVV(42);
	    ivv.increment();
	    // exist
	    var target = {_e:ivv.local.e, _c:ivv.local.v};
	    expect(ivv.isRdy(target)).to.be.ok();
	     // does not exist
	    var target2 = {_e:ivv.local.e, _c:(ivv.local.v+1)};
	    expect(ivv.isRdy(target2)).to.not.be.ok();
	});
	
	it('check if an operation independant of any other is rdy',function(){
	    var ivv = new IVV(42);
	    var c = null;
	    expect(ivv.isRdy(c)).to.be.ok();
	});

	it('check in the omen vector for target operation', function(){
	    var ivv = new IVV(42);
	    var ivv2 = new IVV(13);
	    ivv2.increment();
	    ivv2.increment();
	    var c = {_e: ivv2.local.e, _c: ivv2.local.v};
	    ivv.incrementFrom(c);
	    // another operation arrive depending on operation identifier by c;
	    expect(ivv.isRdy(c)).to.be.ok();
	});
    });
    
    describe('isLower', function(){
	it('check if the ev has been seen before or not', function(){
            var ivv = new IVV(13);
            var ivv2 = new IVV(42);
	    ivv2.increment();
	    var c = {_e : ivv2.local.e , _c:ivv2.local.v};
            expect(ivv.isLower(c)).to.not.be.ok();
            ivv.incrementFrom(c);
            expect(ivv.isLower(c)).to.be.ok();
        });

	it('check in the omen if the ev has been seen', function(){
            var ivv = new IVV(13);
            var ivv2 = new IVV(42);
	    ivv2.increment();
	    ivv2.increment();
	    var c = {_e : ivv2.local.e , _c:ivv2.local.v};
            expect(ivv.isLower(c)).to.not.be.ok();
            ivv.incrementFrom(c);
            expect(ivv.isLower(c)).to.be.ok();
	});
    });
    
});

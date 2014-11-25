var expect = require('expect.js');
var Mocha = require('mocha');

var PVVwE = require('../lib/pvvwe.js');

describe('pvvwe.js', function() {

    describe('pvvwe', function(){
	it('init the entries to zero', function(){
	    var pvvwe = new PVVwE(42)
	    expect(pvvwe.local.e).to.be.eql(42);
	    expect(pvvwe.local.v).to.be.eql(0);
	});
    });
    
    describe('increment', function(){
	it('increment the entry', function(){
	    var pvvwe = new PVVwE(42);
	    pvvwe.increment();
	    expect(pvvwe.local.v).to.be.eql(1);
	});	
    });
    
    describe('incrementfrom', function(){
	it('increment the entry from another vv', function(){
	    var pvvwe = new PVVwE(13);
	    var rpvvwe = new PVVwE(42);
	    rpvvwe.increment();
	    pvvwe.incrementFrom({_e: rpvvwe.local.e, _c:rpvvwe.local.v });
	    expect(rpvvwe.local.v).to.be.eql(1);
	    expect(pvvwe.vector.get(rpvvwe.local.e).v).to.be.eql(
		rpvvwe.local.v);
	});

	it('increment from anywhere does not affect my entry', function(){
	    var pvvwe = new PVVwE(13);
	    var rpvvwe = new PVVwE(42);
	    rpvvwe.increment();
	    pvvwe.incrementFrom({_e: rpvvwe.local.e, _c:rpvvwe.local.v });
	    expect(pvvwe.local.v).to.be.eql(0);
	});

	it('a message is lost, exception is made', function(){
	    var pvvwe = new PVVwE(13);
	    var rpvvwe = new PVVwE(42);
	    rpvvwe.increment();
	    rpvvwe.increment();
	    expect(rpvvwe.local.v).to.be.eql(2);
	    pvvwe.incrementFrom({_e: rpvvwe.local.e, _c:rpvvwe.local.v });
	    expect(pvvwe.vector.get(rpvvwe.local.e).x).to.have.length(1);
	    expect(pvvwe.vector.get(rpvvwe.local.e).x.has(1)).to.be.ok();
	});
    });
    
    describe('isReady', function(){
	it('check if an operation depending on another is ready', function(){
	    var pvvwe = new PVVwE(42);
	    var target = pvvwe.increment();
	    expect(pvvwe.isRdy(target)).to.be.ok();
	    var target2 = {_e:target._e, _c:(target._c+1)};
	    expect(pvvwe.isRdy(target2)).to.not.be.ok();
	});
	
	it('check if an operation independant of any other is rdy',function(){
	    var pvvwe = new PVVwE(42);
	    var c = null;
	    expect(pvvwe.isRdy(c)).to.be.ok();
	});

	it('check in the omen vector for target operation', function(){
	    var pvvwe = new PVVwE(42);
	    var pvvwe2 = new PVVwE(13);
	    pvvwe2.increment();
	    pvvwe2.increment();
	    var c = {_e: pvvwe2.local.e, _c: pvvwe2.local.v};
	    pvvwe.incrementFrom(c);
	    // another operation arrive depending on operation identifier by c;
	    expect(pvvwe.isRdy(c)).to.be.ok();
	});
    });
    
    describe('isLower', function(){
	it('check if the ev has been seen before or not', function(){
            var pvvwe = new PVVwE(42);
            var pvvwe2 = new PVVwE(13);
	    var target = pvvwe2.increment();
            expect(pvvwe.isLower(target)).to.not.be.ok();
            pvvwe.incrementFrom(target);
            expect(pvvwe.isLower(target)).to.be.ok();
        });

	it('check in the omen if the ev has been seen', function(){
            var pvvwe = new PVVwE(42);
            var pvvwe2 = new PVVwE(13);
	    pvvwe2.increment();
	    pvvwe2.increment();
	    var c = {_e : pvvwe2.local.e , _c : pvvwe2.local.v};
            expect(pvvwe.isLower(c)).to.not.be.ok();
            pvvwe.incrementFrom(c);
            expect(pvvwe.isLower(c)).to.be.ok();
	});
    });
    
});

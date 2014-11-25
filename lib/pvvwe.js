var LRU = require('lru-cache');

/*!
 * \class Perishable Version Vector with Exceptions
 * \brief objet that represents a version vector with exceptions. However, 
 * exceptions are slowly disappearing over time. Eventually, the exceptions
 * are considered as delivered messages. Also, each entry of the vector also
 * tends to disappear if it has not been used for a while. This kind of vector
 * is usefull in contexts not fully asynchronous, i.e., there is a bounded 
 * period of time between the generation of a message and its reception.
 * \param uid the unique site identifier holding this version vector
 * \param options the options that intialize the perishable paramters. For more
 * informations, check the lru-cache module.
 */
function PVVwE(uid, options){
    // #1 initialize the underlying parameters
    // #1a the vector of perishable data
    this.options = options || { maxAge: 1000*60*60 }; // default 1h
    this.vector = LRU(this.options);
    // #1b the local data which are not perishable
    this.local = {e:uid, v:0};
    // #2 regularly discard stale data
    var self = this;
    setInterval(function(){
	self.vector.forEach(function(value,key,cache){self.vector.get(key);});
    }, this.options.maxAge);
};


/**
 * \brief increment the entry of the vector on local update
 * \return {_e: entry, _c: counter} uniquely identifying the operation
 */
PVVwE.prototype.increment = function(){
    this.local.v += 1;
    return {_e:this.local.e, _c:this.local.v};
};

/**
 * \brief increment from a remote operation
 * \param ec the entry and clock of the received event to add supposedly rdy
 * the type is {_e: entry, _c: counter}
 */
PVVwE.prototype.incrementFrom = function(ec){
    // #1 check if the entry in the vector exist, if not create it
    if (!this.vector.has(ec._e)){
	this.vector.set(ec._e, {v: 0, x: LRU(this.options)} );
    };
    // #2 get the value and increment it normally, as in vvwe.incrementFrom
    // #2a if the counter is included in exceptions
    var vwe = this.vector.get(ec._e);
    if (ec._c < vwe.v){
	if (vwe.x.has(ec._c)){
	    vwe.x.del(ec._c);
	};
    };
    // #2b if the counter is value+1, i.e., contiguous to current vector
    if (ec._c == (vwe.v + 1)){
	vwe.v += 1;
    };
    // #2c otherwise, add the exception inbetween previous value and counter
    if (ec._c > vwe.v + 1){
	for (var i = (vwe.v  + 1); i<ec._c; ++i){
	    vwe.x.set(i,null);
	};
	vwe.v = ec._c;
    };
    // #3 update the value in vector
    this.vector.set(ec._e, vwe); 
};

/**
 * \brief check if the argument are causally ready regards to this vector
 * \param ec the site clock that happen-before the current event
 */
PVVwE.prototype.isRdy = function(ec){
    var ready = (ec === null ||
		 ((this.local.e == ec._e) && (this.local.v >= ec._c)) ||
		 ((this.local.e != ec._e) && (!this.vector.has(ec._e))));
    if (!ready && this.local.e != ec._e){
	// #1 if the entry in the pvvwe does not exist, it is not ready
	var vwe = this.vector.get(ec._e);
	ready = (ec._c <= vwe.v) && (!vwe.x.has(ec._c));
    };
    return ready;
};

/**
 * \brief check if the message contains information already delivered
 * \param ec the site clock to check
 */
PVVwE.prototype.isLower = function(ec){
    var lower = (ec !== null ||
		 (ec._e == this.local.e && ec._c <= this.local.v));
    if (lower){
	if (!(this.vector.has(ec._e))){
	    lower = false;
	} else {
	    var vwe = this.vector.get(ec._e);
	    lower = (ec._c <= vwe.v) && (!vwe.x.has(ec._c));
	};
    };
    return lower;
};

module.exports = PVVwE;

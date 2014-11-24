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
    var opt = options || { maxAge: 1000*60*60 }; // default 1h
    this.v = LRU(opt);
    // #1b the local data which are not perishable
    this.local = {e:uid, c:0};
    // #2 regularly discard stale data
    var self = this;
    setInterval(function(){
	self.v.forEach(function(value,key,cache){ self.v.get(key); });
    }, opt.maxAge);
};


/**
 * \brief increment the entry of the vector on local update
 * \return {_e: entry, _c: counter} uniquely identifying the operation
 */
PVVwE.prototype.increment = function(){
    this.local.c += 1;
    return {_e:this.local.e, _c:this.local.c};
};

/**
 * \brief increment from a remote operation
 * \param ec the entry and clock of the received event to add supposedly rdy
 * the type is {_e: entry, _c: counter}
 */
PVVwE.prototype.incrementFrom = function(ec){
    // #1 check if the entry in the vector exist, if not create it
    // #2 check if the counter in the vector exist, if not, create it
};

/**
 * \brief check if the argument are causally ready regards to this vector
 * \param ec the site clock that happen-before the current event
 */
PVVwE.prototype.isRdy = function(ec){
    
};

/**
 * \brief check if the message contains information already delivered
 * \param ec the site clock to check
 */
PVVwE.prototype.isLower = function(ec){
};

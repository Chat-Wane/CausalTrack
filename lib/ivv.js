var IVVEntry = require('./ivventry.js');
require('./util.js');

/**
 * \class IVV
 * \brief the interval version vector useful for tracking semantically
 * dependent events only. Making independant events non-blocking 
 * \param e the entry chosen by the local site (1 entry <-> 1 site)
 */
function IVV(e){
    this.local = new IVVEntry(e);
    this.vector = [];
    this.vector.push(this.local);
};


/**
 * \brief increment the entry of the vector on local update
 * \return {_e: entry, _c: counter} uniquely identifying the operation
 */
IVV.prototype.increment = function(){
    this.local.increment();
    return {_e: this.local.e, _c: this.local.v};
};


/**
 * \brief increment from a remote operation
 * \param ec the entry and clock of the received event to add supposedly rdy
 * the type is {_e: entry, _c: counter}
 */
IVV.prototype.incrementFrom = function (ec){
    // #0 find the entry within the array of IVVEntries
    var position = this.vector.binaryIndexOf(ec._e);
    // #1 if the entry does not exist, initialize it
    if (position < 0 || (position==0 && this.vector[0].compare(ec._e)!=0)){
	this.vector.splice(-position, 0, new IVVEntry(ec._e));
	position = -position;
    };
    // #2 increment the entry
    this.vector[position].incrementFrom(ec._c);
};


/**
 * \brief check if this vector is causally ready 
 * \param ec the site clock that happen-before the current event
 */
IVV.prototype.isRdy = function(ec){
    var rdy = (ec === null);
    if (!rdy){
	var position = this.vector.binaryIndexOf(ec._e);
	if (position>0 || (position==0 && this.vector[0].compare(ec._e)==0)) {
	    rdy = this.vector[position].contains(ec._c);
	};
    };
    return rdy;
};

/**
 * \brief check if the message contains information already delivered
 * \param ec the site clock to check
 */
IVV.prototype.isLower = function(ec){
    return (ec!==null) && (this.isRdy(ec));
};

module.exports = IVV;


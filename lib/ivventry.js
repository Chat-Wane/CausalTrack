var BI = require('BigInt');

/*!
  \brief create an entry of the interval version vector containing the
  index of the entry, the value v that creates a contiguous interval
  from 0 to v, a bit array that define whether or not the operation has been
  received
  \param e the entry in the interval version vector
*/
function IVVEntry(e){
    this.e = e;
    this.v = 0;
    this.o = new BI.int2bigInt(0,0,0);
};

/*!
 * \brief local counter incremented
 */
IVVEntry.prototype.increment = function(){
    this.v += 1;
};

/**
 * \brief increment from a remote operation
 * \param c the counter of the operation to add to this 
 */
IVVEntry.prototype.incrementFrom = function(c){
    // #1 update the omen vector
    if (c > this.v){
	var power = BI.int2bigInt(1, c-this.v, 1);
	BI.leftShift_(power, c-this.v-1);
	this.o = BI.add(this.o, power);
    };
    // #2 shift if the lowest bit is set to 1
    while(!BI.isZero(this.o) && (BI.modInt(this.o,2)!=0)){
	this.v += 1;
	BI.rightShift_(this.o, 1);
    };
};

/*!
 * \brief check if this entry contains the counter in argument
 * \return true if it contains the counter, false otherwise
 */
IVVEntry.prototype.contains = function(c){
    // #1 is the counter within the interval 0..v
    var contains = (c <= this.v);
    // #2 is the counter within the bit array
    if (!contains){
	var duplicate = BI.dup(this.o);
	BI.rightShift_(duplicate, c-this.v-1);
	contains = (BI.modInt(duplicate,2)==1);
    };
    return contains;
};

/*!
 * \brief function that allow to order entries in the array and search an entry
 * \param o the other IVVEntry or an entry to find
 */
IVVEntry.prototype.compare = function(o){
    var otherEntry = null;
    if (o instanceof IVVEntry) {otherEntry = o.e;} else {otherEntry = o;}
    if (this.e < otherEntry){ return -1; }
    if (this.e > otherEntry){ return  1; }
    return 0;
};

module.exports = IVVEntry;


/*!
  \brief create an entry of the version vector with exceptions containing the
  index of the entry, the value v that creates a contiguous interval
  from 0 to v, an array of integers that contain the operations lower to v that
  have not been received yet
  \param e the entry in the interval version vector
*/
function VVwEEntry(e){
    this.e = e;   
    this.v = 0;
    this.x = [];
};

/*!
 * \brief local counter incremented
 */
VVwEEntry.prototype.increment = function(){
    this.v += 1;
};

/**
 * \brief increment from a remote operation
 * \param c the counter of the operation to add to this 
 */
VVwEEntry.prototype.incrementFrom = function(c){
    // #1 check if the counter is included in the exceptions
    if (c < this.v){
	var index = this.x.indexOf(c);
	if (index>=0){ // the exception is found
	    this.x.splice(index, 1);
	};
    };
    // #2 if the value is +1 compared to the current value of the vector
    if (c == (this.v + 1)){
	this.v += 1;
    };
    // #3 otherwise exception are made
    if (c > (this.v + 1)){
	for (var i = (this.v + 1); i<c; ++i){
	    this.x.push(i);
	};
	this.v = c;
    };
};

/*!
 * \brief function that allows to order the entries in the array and search
 * an entry
 * \param o the other VVwEEntry or an entry to find
 */
VVwEEntry.prototype.compare = function(o){
    var otherEntry = null;
    if (o instanceof VVwEEntry) {otherEntry = o.e;} else {otherEntry = o;}
    if (this.e < otherEntry){ return -1; }
    if (this.e > otherEntry){ return  1; }
    return 0;
};

module.exports = VVwEEntry;

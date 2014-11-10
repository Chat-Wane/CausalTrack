var VVwEEntry = require('./vvweentry.js');
require('./util.js');

/**
 * \class VVwE
 * \brief class version vector with exception keeps track of events in a 
 * concise way
 * \param e the entry chosen by the local site (1 entry <-> 1 site)
 */
function VVwE(e){
    this.local = new VVwEEntry(e);
    this.vector = [];
    this.vector.push(this.local);
};


/**
 * \brief increment the entry of the vector on local update
 */
VVwE.prototype.increment = function(){
    this.local.increment();
};


/**
 * \brief increment from a remote operation
 * \param ec the entry and clock of the received event to add supposedly rdy
 * the type is {_e: entry, _c: counter}
 */
VVwE.prototype.incrementFrom = function (ec){
    // #0 find the entry within the array of VVwEntries
    var position = this.vector.binaryIndexOf(ec._e);
    // #1 if the entry does not exist, initialize it
    if (position < 0 || (position==0 && this.vector[0].compare(ec._e)!=0)){
	this.vector.splice(-position, 0, new VVwEEntry(ec._e));
	position = -position;
    };
    // #2 increment the entry
    this.vector[position].incrementFrom(ec._c);
};


/**
 * \brief check if the argument are causally ready regards to this vector
 * \param ec the site clock that happen-before the current event
 */
VVwE.prototype.isRdy = function(ec){
    var ready = (ec===null);
    if (!ready){
	var position = this.vector.binaryIndexOf(ec._e);
	ready =((position>0||(position==0 && this.vector[position].e==ec._e))&&
		((ec._c <= this.vector[position].v) &&
		 (this.vector[position].x.indexOf(ec._c)<0)));
    };
    return ready;
};

/**
 * \brief check if the message contains information already delivered
 * \param ec the site clock to check
 */
VVwE.prototype.isLower = function(ec){
    return ((ec!==null) && this.isRdy(ec));
};

module.exports = VVwE;


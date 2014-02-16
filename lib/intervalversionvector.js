
/**
 * \class IVV
 * \brief the interval version vector useful for tracking semantically
 * dependent events only. Making independant events non-blocking 
 * \param e the entry chosen by the local site (1 entry <-> 1 site)
 * \param s the size of the version vector
 */
function IVV(e,s){
    this._e = e;
    this._v = []; // vector
    this._o = []; // omen
    for (var i=0; i < s ; ++i){ // init the vector
	this._v[i] = 0;
	this._o[i] = 0;
    };
};


/**
 * \brief increment the entry of the vector on local update
 */
IVV.prototype.increment = function(){
    this._v[this._e] = this._v[this._e] + 1;
};


/**
 * \brief increment from a remote operation
 * \param ec the entry and clock of the received event to add supposedly rdy
 */
IVV.prototype.incrementFrom = function (ec){
    if (ec._c > this._v[ec._e]){
	this._o[ec._e] += Math.pow(2,ec._c-this._v[ec._e]-1);//set bit @ index
    }
    while(this._o[ec._e] % 2 != 0 && this._o[ec._e] != 0 ){
	this._v[ec._e] = this._v[ec._e] + 1;
	this._o[ec._e] = Math.floor(this._o[ec._e] / 2);
    };
};


/**
 * \brief check if this vector is causally ready 
 * \param sc the site clock that happen-before the current event
 */
IVV.prototype.isRdy = function(ec){
    return ((ec === null) ||
	    (this._v[ec._e] >= ec._c) ||
	    ((this._o[ec._e]*Math.pow(2,ec._c-this._v[ec._s]-1))%2 == 1 ));
};

module.exports = IVV;


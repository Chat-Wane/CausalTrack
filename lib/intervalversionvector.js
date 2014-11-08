var BI = require("BigInt");

/**
 * \class IVV
 * \brief the interval version vector useful for tracking semantically
 * dependent events only. Making independant events non-blocking 
 * \param e the entry chosen by the local site (1 entry <-> 1 site)
 */
function IVV(e){
    this._e = e;
    this._v = []; // vector
    this._o = []; // omen
    this._v[e] = 0;
    this._o[e] = new BI.int2bigInt(0,0,0);
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
    // #1 if the entry does not exist, initialize it
    if (!(ec._e in this._v)){
	this._v[ec._e]= new Number(0);
	this._o[ec._e]= new BI.int2bigInt(0,0,1);
    };
    // #2 update the omen vector
    if (ec._c > this._v[ec._e]){
	var power = BI.int2bigInt(1, ec._c-this._v[ec._e], 1);
	BI.leftShift_(power, ec._c-this._v[ec._e]-1);
	this._o[ec._e] = BI.add(this._o[ec._e], power);
	//	this._o[ec._e] = this._o[ec._e] +
	//	    Math.pow(2,ec._c-this._v[ec._e]-1);//set bit @ index
    };
    // #3 shift if the lowest bit is set to 1
    while(!BI.isZero(this._o[ec._e]) && (BI.modInt(this._o[ec._e],2)!=0)){
	this._v[ec._e] = this._v[ec._e] + 1;
	BI.rightShift_(this._o[ec._e], 1);
    };
};


/**
 * \brief check if this vector is causally ready 
 * \param ec the site clock that happen-before the current event
 */
IVV.prototype.isRdy = function(ec){
    var rdy = (ec === null);
    if (!rdy && ec._e in this._v){
	rdy = (this._v[ec._e] >= ec._c);
	if (!rdy){
	    var duplicate = BI.dup(this._o[ec._e]);
	    BI.rightShift_(duplicate, ec._c-this._v[ec._e]-1);
	    rdy = (BI.modInt(duplicate,2)==1);
	};
    };
    return rdy;
};

/**
 * \brief check if the message contains information already delivered
 * \param ec the site clock to check
 */
IVV.prototype.isLower = function(ec){
    var rdy = false;
    if (ec._e in this._v){
	rdy = (this._v[ec._e] <= ec._c);
	if (!rdy){
	    var duplicate = BI.dup(this._o[ec._e]);
	    BI.rightShift_(duplicate, ec._c-this._v[ec._e]-1);
	    rdy = (BI.modInt(duplicate,2)==1);
	};
    };
    return rdy;
};

module.exports = IVV;


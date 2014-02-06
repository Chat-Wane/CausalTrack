
/**
 * \class VV
 * \brief the well-known version vector that characterizes causality between
 * updates
 * \param e the entry chosen by the local site (1 entry <-> 1 site)
 * \param s the size of the version vector
 */
function VV(e,s){
    this._e = e;
    this._v = [];
    for (var i=0; i < s ; ++i){ // init the vector
	this._v[i] = 0;
    };
};


/**
 * \brief increment the entry of the vector on local update
 */
VV.prototype.increment = function(){
    this._v[this._e] = this._v[this._e] + 1;
};


/**
 * \brief increment from a remote version vector supposedly ready
 * \param vv the received version vector
 */
VV.prototype.incrementFrom = function (vv){
    this._v[vv._e] = vv._v[vv._e]; // if ready, it means + 1 on the entry
};


/**
 * \brief check if this vector is causally ready 
 * \param ref the reference version vector to compare with
 */
VV.prototype.isRdy = function(ref){
    var ready = true;
    var e = 0;
    
    while (ready && e<this._v.length){ 
	if (!((e==this._e && this._v[e]==(ref._v[e] + 1)) ||
	      (e!=this._e && this._v[e]<=(ref._v[e])))){
	    ready = false;
	}
	++e;
    };
    return ready;
};

module.exports = VV;

// quick tests
//var vv0 = new VV([0,0,0],0);
//var vv1 = new VV([0,0,0],1);
//vv0.increment();
//console.log(vv0);
//console.log(vv0.isRdy(vv1));
//vv1.incrementFrom(vv0);
//console.log(vv1); // [1,0,0]

//var vv2 = new VV([0,0,1],2);
//console.log(vv2.isRdy(vv1));

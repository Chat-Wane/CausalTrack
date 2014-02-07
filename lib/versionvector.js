
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
 * \brief check if the target VV is causally ready 
 * \param vv the version vector to check
 */
VV.prototype.isRdy = function(vv){
    var ready = true;
    var e = 0;
    
    while (ready && e<vv._v.length){ 
	if (!((e==vv._e && vv._v[e]==(this._v[e] + 1)) ||
	      (e!=vv._e && vv._v[e]<=(this._v[e])))){
	    ready = false;
	}
	++e;
    };
    return ready;
};

module.exports = VV;

require=function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){function IVV(e){this._e=e;this._v=[];this._o=[];this._v[e]=new Number(0);this._o[e]=new Number(0)}IVV.prototype.increment=function(){this._v[this._e]=this._v[this._e]+1};IVV.prototype.incrementFrom=function(ec){if(!(ec._e in this._v)){this._v[ec._e]=new Number(0);this._o[ec._e]=new Number(0)}if(ec._c>this._v[ec._e]){this._o[ec._e]=this._o[ec._e]+Math.pow(2,ec._c-this._v[ec._e]-1)}while(this._o[ec._e]%2!=0&&this._o[ec._e]!=0){this._v[ec._e]=this._v[ec._e]+1;this._o[ec._e]=Math.floor(this._o[ec._e]/2)}};IVV.prototype.isRdy=function(ec){return ec===null||ec._e in this._v&&(this._v[ec._e]>=ec._c||this._o[ec._e]/Math.pow(2,ec._c-this._v[ec._e]-1)%2==1)};IVV.prototype.isLower=function(ec){return ec._e in this._v&&(ec._c<=this._v[ec._e]||this._o[ec._e]/Math.pow(2,ec._c-this._v[ec._e]-1)%2==1)};IVV.prototype.toString=function(){var keys=Object.keys(this._v);var result="";for(var i=0;i<keys.length;++i){result=result+"("+keys[i]+": "+this._v[keys[i]]+", "+this._o[keys[i]]+")"}return result};module.exports=IVV},{}],2:[function(require,module,exports){function VV(e){this._e=e;this._v=[]}VV.prototype.increment=function(){if(!(this._e in this._v)){this._v[this._e]=0}this._v[this._e]=this._v[this._e]+1};VV.prototype.incrementFrom=function(vv){if(!(vv._e in this._v)){this._v[vv._e]=0}this._v[vv._e]=vv._v[vv._e]};VV.prototype.isRdy=function(vv){var ready=true;var keys=Object.keys(this._v);var i=0;while(ready&&i<keys.length){if(!(keys[i]in vv._v)||this._v[keys[i]]>vv._v[keys[i]]){ready=false}++i}var keys=Object.keys(vv._v);var i=0;while(ready&&i<keys.length){if(keys[i]!=vv._e&&(!(keys[i]in this._v)||this._v[keys[i]]>vv._v[keys[i]])){ready=false}++i}ready=ready&&(vv._v[vv._e]==1||vv._e in this._v&&vv._v[vv._e]==this._v[vv._e]+1);return ready};VV.prototype.isLower=function(vv){return vv._e in this._v&&vv._v[vv._e]<=this._v[vv._e]};module.exports=VV},{}],3:[function(require,module,exports){function VVwE(e){this._e=e;this._v=[];this._x=[];this._v[this._e]=0;this._x[this._e]=[]}VVwE.prototype.increment=function(){this._v[this._e]=this._v[this._e]+1};VVwE.prototype.incrementFrom=function(ec){if(!(ec._e in this._v)){this._v[ec._e]=0;this._x[ec._e]=[]}if(ec._c<this._v[ec._e]){var index=this._x[ec._e].indexOf(ec._c);if(index>=0){this._x[ec._e].splice(index,1)}}if(ec._c==this._v[ec._e]+1){this._v[ec._e]+=1}if(ec._c>this._v[ec._e]+1){for(var i=this._v[ec._e]+1;i<ec._c;++i){this._x[ec._e].push(i)}this._v[ec._e]=ec._c}};VVwE.prototype.isRdy=function(ec){return ec===null||ec._e in this._v&&(ec._c<=this._v[ec._e]&&this._x[ec._e].indexOf(ec._c)<0)};VVwE.prototype.isLower=function(ec){return ec._e in this._v&&(ec._c<=this._v[ec._e]&&this._x[ec._e].indexOf(ec._c)<0)};VVwE.prototype.toString=function(){var keys=Object.keys(this._v);var result="";for(var i=0;i<keys.length;++i){result=result+"("+keys[i]+": "+this._v[keys[i]]+", "+JSON.stringify(this._x[keys[i]])+")"}return result};module.exports=VVwE},{}],causaltrack:[function(require,module,exports){module.exports.VV=require("./lib/versionvector.js");module.exports.IVV=require("./lib/intervalversionvector.js");module.exports.VVwE=require("./lib/versionvectorwithexcept.js")},{"./lib/intervalversionvector.js":1,"./lib/versionvector.js":2,"./lib/versionvectorwithexcept.js":3}]},{},[]);
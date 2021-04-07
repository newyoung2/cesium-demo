define(["exports","./when-208fe5b0","./Check-d18af7c4","./Math-4e53b694","./WebGLConstants-76bb35d1"],function(e,r,t,N,n){
"use strict";var E = {UNSIGNED_BYTE: n.WebGLConstants.UNSIGNED_BYTE,UNSIGNED_SHORT: n.WebGLConstants.UNSIGNED_SHORT,UNSIGNED_INT: n.WebGLConstants.UNSIGNED_INT,getSizeInBytes: function(e){
switch(e){
case E.UNSIGNED_BYTE:return Uint8Array.BYTES_PER_ELEMENT;case E.UNSIGNED_SHORT:return Uint16Array.BYTES_PER_ELEMENT;case E.UNSIGNED_INT:return Uint32Array.BYTES_PER_ELEMENT;
}
},fromSizeInBytes: function(e){
switch(e){
case 2:return E.UNSIGNED_SHORT;case 4:return E.UNSIGNED_INT;case 1:return E.UNSIGNED_BYTE;
}
},validate: function(e){
return r.defined(e) && (e === E.UNSIGNED_BYTE || e === E.UNSIGNED_SHORT || e === E.UNSIGNED_INT);
},createTypedArray: function(e,r){
return new(e >= N.CesiumMath.SIXTY_FOUR_KILOBYTES ? Uint32Array : Uint16Array)(r);
},createTypedArrayFromArrayBuffer: function(e,r,t,n){
return new(e >= N.CesiumMath.SIXTY_FOUR_KILOBYTES ? Uint32Array : Uint16Array)(r,t,n);
}},n = Object.freeze(E);e.IndexDatatype = n;
});

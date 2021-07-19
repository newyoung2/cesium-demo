define(["exports","./Cartesian2-8417ca3d","./Check-d18af7c4","./when-208fe5b0","./Math-4e53b694","./RuntimeError-7f634f5d"],function(e,A,o,R,F,L){
"use strict";function t(e){
this._ellipsoid = R.defaultValue(e,A.Ellipsoid.WGS84),this._semimajorAxis = this._ellipsoid.maximumRadius,this._oneOverSemimajorAxis = 1 / this._semimajorAxis;
}Object.defineProperties(t.prototype,{ellipsoid: {get: function(){
return this._ellipsoid;
}}}),t.prototype.project = function(e,t){
var n = this._semimajorAxis,r = e.longitude * n,n = e.latitude * n,e = e.height;return R.defined(t) ? (t.x = r,t.y = n,t.z = e,t) : new A.Cartesian3(r,n,e);
},t.prototype.unproject = function(e,t){
var n = this._oneOverSemimajorAxis,r = e.x * n,n = e.y * n,e = e.z;return R.defined(t) ? (t.longitude = r,t.latitude = n,t.height = e,t) : new A.Cartographic(r,n,e);
};var a = Object.freeze({OUTSIDE: -1,INTERSECTING: 0,INSIDE: 1});function i(e,t){
this.start = R.defaultValue(e,0),this.stop = R.defaultValue(t,0);
}function B(e,t,n,r,a,i,s,o,u){
this[0] = R.defaultValue(e,0),this[1] = R.defaultValue(r,0),this[2] = R.defaultValue(s,0),this[3] = R.defaultValue(t,0),this[4] = R.defaultValue(a,0),this[5] = R.defaultValue(o,0),this[6] = R.defaultValue(n,0),this[7] = R.defaultValue(i,0),this[8] = R.defaultValue(u,0);
}B.packedLength = 9,B.pack = function(e,t,n){
return n = R.defaultValue(n,0),t[n++] = e[0],t[n++] = e[1],t[n++] = e[2],t[n++] = e[3],t[n++] = e[4],t[n++] = e[5],t[n++] = e[6],t[n++] = e[7],t[n++] = e[8],t;
},B.unpack = function(e,t,n){
return t = R.defaultValue(t,0),(n = !R.defined(n) ? new B : n)[0] = e[t++],n[1] = e[t++],n[2] = e[t++],n[3] = e[t++],n[4] = e[t++],n[5] = e[t++],n[6] = e[t++],n[7] = e[t++],n[8] = e[t++],n;
},B.clone = function(e,t){
if(R.defined(e))return R.defined(t) ? (t[0] = e[0],t[1] = e[1],t[2] = e[2],t[3] = e[3],t[4] = e[4],t[5] = e[5],t[6] = e[6],t[7] = e[7],t[8] = e[8],t) : new B(e[0],e[3],e[6],e[1],e[4],e[7],e[2],e[5],e[8]);
},B.fromArray = function(e,t,n){
return t = R.defaultValue(t,0),(n = !R.defined(n) ? new B : n)[0] = e[t],n[1] = e[t + 1],n[2] = e[t + 2],n[3] = e[t + 3],n[4] = e[t + 4],n[5] = e[t + 5],n[6] = e[t + 6],n[7] = e[t + 7],n[8] = e[t + 8],n;
},B.fromColumnMajorArray = function(e,t){
return B.clone(e,t);
},B.fromRowMajorArray = function(e,t){
return R.defined(t) ? (t[0] = e[0],t[1] = e[3],t[2] = e[6],t[3] = e[1],t[4] = e[4],t[5] = e[7],t[6] = e[2],t[7] = e[5],t[8] = e[8],t) : new B(e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8]);
},B.fromQuaternion = function(e,t){
var n = e.x * e.x,r = e.x * e.y,a = e.x * e.z,i = e.x * e.w,s = e.y * e.y,o = e.y * e.z,u = e.y * e.w,l = e.z * e.z,c = e.z * e.w,d = e.w * e.w,f = n - s - l + d,h = 2 * (r - c),p = 2 * (a + u),e = 2 * (r + c),r = s - n - l + d,c = 2 * (o - i),u = 2 * (a - u),i = 2 * (o + i),d = -n - s + l + d;return R.defined(t) ? (t[0] = f,t[1] = e,t[2] = u,t[3] = h,t[4] = r,t[5] = i,t[6] = p,t[7] = c,t[8] = d,t) : new B(f,h,p,e,r,c,u,i,d);
},B.fromHeadingPitchRoll = function(e,t){
var n = Math.cos(-e.pitch),r = Math.cos(-e.heading),a = Math.cos(e.roll),i = Math.sin(-e.pitch),s = Math.sin(-e.heading),o = Math.sin(e.roll),u = n * r,l = -a * s + o * i * r,c = o * s + a * i * r,d = n * s,e = a * r + o * i * s,s = -o * r + a * i * s,i = -i,o = o * n,n = a * n;return R.defined(t) ? (t[0] = u,t[1] = d,t[2] = i,t[3] = l,t[4] = e,t[5] = o,t[6] = c,t[7] = s,t[8] = n,t) : new B(u,l,c,d,e,s,i,o,n);
},B.fromScale = function(e,t){
return R.defined(t) ? (t[0] = e.x,t[1] = 0,t[2] = 0,t[3] = 0,t[4] = e.y,t[5] = 0,t[6] = 0,t[7] = 0,t[8] = e.z,t) : new B(e.x,0,0,0,e.y,0,0,0,e.z);
},B.fromUniformScale = function(e,t){
return R.defined(t) ? (t[0] = e,t[1] = 0,t[2] = 0,t[3] = 0,t[4] = e,t[5] = 0,t[6] = 0,t[7] = 0,t[8] = e,t) : new B(e,0,0,0,e,0,0,0,e);
},B.fromCrossProduct = function(e,t){
return R.defined(t) ? (t[0] = 0,t[1] = e.z,t[2] = -e.y,t[3] = -e.z,t[4] = 0,t[5] = e.x,t[6] = e.y,t[7] = -e.x,t[8] = 0,t) : new B(0,-e.z,e.y,e.z,0,-e.x,-e.y,e.x,0);
},B.fromRotationX = function(e,t){
var n = Math.cos(e),e = Math.sin(e);return R.defined(t) ? (t[0] = 1,t[1] = 0,t[2] = 0,t[3] = 0,t[4] = n,t[5] = e,t[6] = 0,t[7] = -e,t[8] = n,t) : new B(1,0,0,0,n,-e,0,e,n);
},B.fromRotationY = function(e,t){
var n = Math.cos(e),e = Math.sin(e);return R.defined(t) ? (t[0] = n,t[1] = 0,t[2] = -e,t[3] = 0,t[4] = 1,t[5] = 0,t[6] = e,t[7] = 0,t[8] = n,t) : new B(n,0,e,0,1,0,-e,0,n);
},B.fromRotationZ = function(e,t){
var n = Math.cos(e),e = Math.sin(e);return R.defined(t) ? (t[0] = n,t[1] = e,t[2] = 0,t[3] = -e,t[4] = n,t[5] = 0,t[6] = 0,t[7] = 0,t[8] = 1,t) : new B(n,-e,0,e,n,0,0,0,1);
},B.toArray = function(e,t){
return R.defined(t) ? (t[0] = e[0],t[1] = e[1],t[2] = e[2],t[3] = e[3],t[4] = e[4],t[5] = e[5],t[6] = e[6],t[7] = e[7],t[8] = e[8],t) : [e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8]];
},B.getElementIndex = function(e,t){
return 3 * e + t;
},B.getColumn = function(e,t,n){
var r = 3 * t,a = e[r],t = e[1 + r],r = e[2 + r];return n.x = a,n.y = t,n.z = r,n;
},B.setColumn = function(e,t,n,r){
t *= 3;return(r = B.clone(e,r))[t] = n.x,r[1 + t] = n.y,r[2 + t] = n.z,r;
},B.getRow = function(e,t,n){
var r = e[t],a = e[t + 3],t = e[t + 6];return n.x = r,n.y = a,n.z = t,n;
},B.setRow = function(e,t,n,r){
return(r = B.clone(e,r))[t] = n.x,r[t + 3] = n.y,r[t + 6] = n.z,r;
};var n = new A.Cartesian3;B.getScale = function(e,t){
return t.x = A.Cartesian3.magnitude(A.Cartesian3.fromElements(e[0],e[1],e[2],n)),t.y = A.Cartesian3.magnitude(A.Cartesian3.fromElements(e[3],e[4],e[5],n)),t.z = A.Cartesian3.magnitude(A.Cartesian3.fromElements(e[6],e[7],e[8],n)),t;
};var r = new A.Cartesian3;B.getMaximumScale = function(e){
return B.getScale(e,r),A.Cartesian3.maximumComponent(r);
},B.multiply = function(e,t,n){
var r = e[0] * t[0] + e[3] * t[1] + e[6] * t[2],a = e[1] * t[0] + e[4] * t[1] + e[7] * t[2],i = e[2] * t[0] + e[5] * t[1] + e[8] * t[2],s = e[0] * t[3] + e[3] * t[4] + e[6] * t[5],o = e[1] * t[3] + e[4] * t[4] + e[7] * t[5],u = e[2] * t[3] + e[5] * t[4] + e[8] * t[5],l = e[0] * t[6] + e[3] * t[7] + e[6] * t[8],c = e[1] * t[6] + e[4] * t[7] + e[7] * t[8],t = e[2] * t[6] + e[5] * t[7] + e[8] * t[8];return n[0] = r,n[1] = a,n[2] = i,n[3] = s,n[4] = o,n[5] = u,n[6] = l,n[7] = c,n[8] = t,n;
},B.add = function(e,t,n){
return n[0] = e[0] + t[0],n[1] = e[1] + t[1],n[2] = e[2] + t[2],n[3] = e[3] + t[3],n[4] = e[4] + t[4],n[5] = e[5] + t[5],n[6] = e[6] + t[6],n[7] = e[7] + t[7],n[8] = e[8] + t[8],n;
},B.subtract = function(e,t,n){
return n[0] = e[0] - t[0],n[1] = e[1] - t[1],n[2] = e[2] - t[2],n[3] = e[3] - t[3],n[4] = e[4] - t[4],n[5] = e[5] - t[5],n[6] = e[6] - t[6],n[7] = e[7] - t[7],n[8] = e[8] - t[8],n;
},B.multiplyByVector = function(e,t,n){
var r = t.x,a = t.y,i = t.z,s = e[0] * r + e[3] * a + e[6] * i,t = e[1] * r + e[4] * a + e[7] * i,i = e[2] * r + e[5] * a + e[8] * i;return n.x = s,n.y = t,n.z = i,n;
},B.multiplyByScalar = function(e,t,n){
return n[0] = e[0] * t,n[1] = e[1] * t,n[2] = e[2] * t,n[3] = e[3] * t,n[4] = e[4] * t,n[5] = e[5] * t,n[6] = e[6] * t,n[7] = e[7] * t,n[8] = e[8] * t,n;
},B.multiplyByScale = function(e,t,n){
return n[0] = e[0] * t.x,n[1] = e[1] * t.x,n[2] = e[2] * t.x,n[3] = e[3] * t.y,n[4] = e[4] * t.y,n[5] = e[5] * t.y,n[6] = e[6] * t.z,n[7] = e[7] * t.z,n[8] = e[8] * t.z,n;
},B.negate = function(e,t){
return t[0] = -e[0],t[1] = -e[1],t[2] = -e[2],t[3] = -e[3],t[4] = -e[4],t[5] = -e[5],t[6] = -e[6],t[7] = -e[7],t[8] = -e[8],t;
},B.transpose = function(e,t){
var n = e[0],r = e[3],a = e[6],i = e[1],s = e[4],o = e[7],u = e[2],l = e[5],e = e[8];return t[0] = n,t[1] = r,t[2] = a,t[3] = i,t[4] = s,t[5] = o,t[6] = u,t[7] = l,t[8] = e,t;
};var s = new A.Cartesian3(1,1,1);B.getRotation = function(e,t){
var n = A.Cartesian3.divideComponents(s,B.getScale(e,r),r);return t = B.multiplyByScale(e,n,t);
};var d = [1,0,0],f = [2,2,1];var u = new B,l = new B;B.computeEigenDecomposition = function(e,t){
for(var n = F.CesiumMath.EPSILON20,r = 0,a = 0,i = (t = !R.defined(t) ? {} : t).unitary = B.clone(B.IDENTITY,t.unitary),s = t.diagonal = B.clone(e,t.diagonal),o = n * function(e){
for(var t = 0,n = 0;n < 9;++n){
var r = e[n];t += r * r;
}return Math.sqrt(t);
}(s);a < 10 && function(e){
for(var t = 0,n = 0;n < 3;++n){
var r = e[B.getElementIndex(f[n],d[n])];t += 2 * r * r;
}return Math.sqrt(t);
}(s) > o;)!function(e,t){
for(var n = F.CesiumMath.EPSILON15,r = 0,a = 1,i = 0;i < 3;++i){
var s = Math.abs(e[B.getElementIndex(f[i],d[i])]);r < s && (a = i,r = s);
}var o = 1,u = 0,l = d[a],c = f[a];Math.abs(e[B.getElementIndex(c,l)]) > n && (u = (n = (n = (e[B.getElementIndex(c,c)] - e[B.getElementIndex(l,l)]) / 2 / e[B.getElementIndex(c,l)]) < 0 ? -1 / (-n + Math.sqrt(1 + n * n)) : 1 / (n + Math.sqrt(1 + n * n))) * (o = 1 / Math.sqrt(1 + n * n))),(t = B.clone(B.IDENTITY,t))[B.getElementIndex(l,l)] = t[B.getElementIndex(c,c)] = o,t[B.getElementIndex(c,l)] = u,t[B.getElementIndex(l,c)] = -u;
}(s,u),B.transpose(u,l),B.multiply(s,u,s),B.multiply(l,s,s),B.multiply(i,u,i),2 < ++r && (++a,r = 0);return t;
},B.abs = function(e,t){
return t[0] = Math.abs(e[0]),t[1] = Math.abs(e[1]),t[2] = Math.abs(e[2]),t[3] = Math.abs(e[3]),t[4] = Math.abs(e[4]),t[5] = Math.abs(e[5]),t[6] = Math.abs(e[6]),t[7] = Math.abs(e[7]),t[8] = Math.abs(e[8]),t;
},B.determinant = function(e){
var t = e[0],n = e[3],r = e[6],a = e[1],i = e[4],s = e[7],o = e[2],u = e[5],e = e[8];return t * (i * e - u * s) + a * (u * r - n * e) + o * (n * s - i * r);
},B.inverse = function(e,t){
var n = e[0],r = e[1],a = e[2],i = e[3],s = e[4],o = e[5],u = e[6],l = e[7],c = e[8],e = B.determinant(e);return t[0] = s * c - l * o,t[1] = l * a - r * c,t[2] = r * o - s * a,t[3] = u * o - i * c,t[4] = n * c - u * a,t[5] = i * a - n * o,t[6] = i * l - u * s,t[7] = u * r - n * l,t[8] = n * s - i * r,B.multiplyByScalar(t,1 / e,t);
};var c = new B;function W(e,t,n,r){
this.x = R.defaultValue(e,0),this.y = R.defaultValue(t,0),this.z = R.defaultValue(n,0),this.w = R.defaultValue(r,0);
}B.inverseTranspose = function(e,t){
return B.inverse(B.transpose(e,c),t);
},B.equals = function(e,t){
return e === t || R.defined(e) && R.defined(t) && e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3] && e[4] === t[4] && e[5] === t[5] && e[6] === t[6] && e[7] === t[7] && e[8] === t[8];
},B.equalsEpsilon = function(e,t,n){
return n = R.defaultValue(n,0),e === t || R.defined(e) && R.defined(t) && Math.abs(e[0] - t[0]) <= n && Math.abs(e[1] - t[1]) <= n && Math.abs(e[2] - t[2]) <= n && Math.abs(e[3] - t[3]) <= n && Math.abs(e[4] - t[4]) <= n && Math.abs(e[5] - t[5]) <= n && Math.abs(e[6] - t[6]) <= n && Math.abs(e[7] - t[7]) <= n && Math.abs(e[8] - t[8]) <= n;
},B.IDENTITY = Object.freeze(new B(1,0,0,0,1,0,0,0,1)),B.ZERO = Object.freeze(new B(0,0,0,0,0,0,0,0,0)),B.COLUMN0ROW0 = 0,B.COLUMN0ROW1 = 1,B.COLUMN0ROW2 = 2,B.COLUMN1ROW0 = 3,B.COLUMN1ROW1 = 4,B.COLUMN1ROW2 = 5,B.COLUMN2ROW0 = 6,B.COLUMN2ROW1 = 7,B.COLUMN2ROW2 = 8,Object.defineProperties(B.prototype,{length: {get: function(){
return B.packedLength;
}}}),B.prototype.clone = function(e){
return B.clone(this,e);
},B.prototype.equals = function(e){
return B.equals(this,e);
},B.equalsArray = function(e,t,n){
return e[0] === t[n] && e[1] === t[n + 1] && e[2] === t[n + 2] && e[3] === t[n + 3] && e[4] === t[n + 4] && e[5] === t[n + 5] && e[6] === t[n + 6] && e[7] === t[n + 7] && e[8] === t[n + 8];
},B.prototype.equalsEpsilon = function(e,t){
return B.equalsEpsilon(this,e,t);
},B.prototype.toString = function(){
return"(" + this[0] + ", " + this[3] + ", " + this[6] + ")\n(" + this[1] + ", " + this[4] + ", " + this[7] + ")\n(" + this[2] + ", " + this[5] + ", " + this[8] + ")";
},W.fromElements = function(e,t,n,r,a){
return R.defined(a) ? (a.x = e,a.y = t,a.z = n,a.w = r,a) : new W(e,t,n,r);
},W.fromColor = function(e,t){
return R.defined(t) ? (t.x = e.red,t.y = e.green,t.z = e.blue,t.w = e.alpha,t) : new W(e.red,e.green,e.blue,e.alpha);
},W.clone = function(e,t){
if(R.defined(e))return R.defined(t) ? (t.x = e.x,t.y = e.y,t.z = e.z,t.w = e.w,t) : new W(e.x,e.y,e.z,e.w);
},W.packedLength = 4,W.pack = function(e,t,n){
return n = R.defaultValue(n,0),t[n++] = e.x,t[n++] = e.y,t[n++] = e.z,t[n] = e.w,t;
},W.unpack = function(e,t,n){
return t = R.defaultValue(t,0),(n = !R.defined(n) ? new W : n).x = e[t++],n.y = e[t++],n.z = e[t++],n.w = e[t],n;
},W.packArray = function(e,t){
var n = e.length,r = 4 * n;if(R.defined(t)){
if(!Array.isArray(t) && t.length !== r)throw new o.DeveloperError("If result is a typed array, it must have exactly array.length * 4 elements");t.length !== r && (t.length = r);
}else t = new Array(r);for(var a = 0;a < n;++a)W.pack(e[a],t,4 * a);return t;
},W.unpackArray = function(e,t){
var n = e.length;R.defined(t) ? t.length = n / 4 : t = new Array(n / 4);for(var r = 0;r < n;r += 4){
var a = r / 4;t[a] = W.unpack(e,r,t[a]);
}return t;
},W.fromArray = W.unpack,W.maximumComponent = function(e){
return Math.max(e.x,e.y,e.z,e.w);
},W.minimumComponent = function(e){
return Math.min(e.x,e.y,e.z,e.w);
},W.minimumByComponent = function(e,t,n){
return n.x = Math.min(e.x,t.x),n.y = Math.min(e.y,t.y),n.z = Math.min(e.z,t.z),n.w = Math.min(e.w,t.w),n;
},W.maximumByComponent = function(e,t,n){
return n.x = Math.max(e.x,t.x),n.y = Math.max(e.y,t.y),n.z = Math.max(e.z,t.z),n.w = Math.max(e.w,t.w),n;
},W.magnitudeSquared = function(e){
return e.x * e.x + e.y * e.y + e.z * e.z + e.w * e.w;
},W.magnitude = function(e){
return Math.sqrt(W.magnitudeSquared(e));
};var h = new W;W.distance = function(e,t){
return W.subtract(e,t,h),W.magnitude(h);
},W.distanceSquared = function(e,t){
return W.subtract(e,t,h),W.magnitudeSquared(h);
},W.normalize = function(e,t){
var n = W.magnitude(e);return t.x = e.x / n,t.y = e.y / n,t.z = e.z / n,t.w = e.w / n,t;
},W.dot = function(e,t){
return e.x * t.x + e.y * t.y + e.z * t.z + e.w * t.w;
},W.multiplyComponents = function(e,t,n){
return n.x = e.x * t.x,n.y = e.y * t.y,n.z = e.z * t.z,n.w = e.w * t.w,n;
},W.divideComponents = function(e,t,n){
return n.x = e.x / t.x,n.y = e.y / t.y,n.z = e.z / t.z,n.w = e.w / t.w,n;
},W.add = function(e,t,n){
return n.x = e.x + t.x,n.y = e.y + t.y,n.z = e.z + t.z,n.w = e.w + t.w,n;
},W.subtract = function(e,t,n){
return n.x = e.x - t.x,n.y = e.y - t.y,n.z = e.z - t.z,n.w = e.w - t.w,n;
},W.multiplyByScalar = function(e,t,n){
return n.x = e.x * t,n.y = e.y * t,n.z = e.z * t,n.w = e.w * t,n;
},W.divideByScalar = function(e,t,n){
return n.x = e.x / t,n.y = e.y / t,n.z = e.z / t,n.w = e.w / t,n;
},W.negate = function(e,t){
return t.x = -e.x,t.y = -e.y,t.z = -e.z,t.w = -e.w,t;
},W.abs = function(e,t){
return t.x = Math.abs(e.x),t.y = Math.abs(e.y),t.z = Math.abs(e.z),t.w = Math.abs(e.w),t;
};var p = new W;W.lerp = function(e,t,n,r){
return W.multiplyByScalar(t,n,p),r = W.multiplyByScalar(e,1 - n,r),W.add(p,r,r);
};var m = new W;W.mostOrthogonalAxis = function(e,t){
e = W.normalize(e,m);return W.abs(e,e),t = e.x <= e.y ? e.x <= e.z ? e.x <= e.w ? W.clone(W.UNIT_X,t) : W.clone(W.UNIT_W,t) : e.z <= e.w ? W.clone(W.UNIT_Z,t) : W.clone(W.UNIT_W,t) : e.y <= e.z ? e.y <= e.w ? W.clone(W.UNIT_Y,t) : W.clone(W.UNIT_W,t) : e.z <= e.w ? W.clone(W.UNIT_Z,t) : W.clone(W.UNIT_W,t);
},W.equals = function(e,t){
return e === t || R.defined(e) && R.defined(t) && e.x === t.x && e.y === t.y && e.z === t.z && e.w === t.w;
},W.equalsArray = function(e,t,n){
return e.x === t[n] && e.y === t[n + 1] && e.z === t[n + 2] && e.w === t[n + 3];
},W.equalsEpsilon = function(e,t,n,r){
return e === t || R.defined(e) && R.defined(t) && F.CesiumMath.equalsEpsilon(e.x,t.x,n,r) && F.CesiumMath.equalsEpsilon(e.y,t.y,n,r) && F.CesiumMath.equalsEpsilon(e.z,t.z,n,r) && F.CesiumMath.equalsEpsilon(e.w,t.w,n,r);
},W.ZERO = Object.freeze(new W(0,0,0,0)),W.UNIT_X = Object.freeze(new W(1,0,0,0)),W.UNIT_Y = Object.freeze(new W(0,1,0,0)),W.UNIT_Z = Object.freeze(new W(0,0,1,0)),W.UNIT_W = Object.freeze(new W(0,0,0,1)),W.prototype.clone = function(e){
return W.clone(this,e);
},W.prototype.equals = function(e){
return W.equals(this,e);
},W.prototype.equalsEpsilon = function(e,t,n){
return W.equalsEpsilon(this,e,t,n);
},W.prototype.toString = function(){
return"(" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ")";
};var y = new Float32Array(1),w = new Uint8Array(y.buffer),C = new Uint32Array([287454020]),v = 68 === new Uint8Array(C.buffer)[0];function j(e,t,n,r,a,i,s,o,u,l,c,d,f,h,p,m){
this[0] = R.defaultValue(e,0),this[1] = R.defaultValue(a,0),this[2] = R.defaultValue(u,0),this[3] = R.defaultValue(f,0),this[4] = R.defaultValue(t,0),this[5] = R.defaultValue(i,0),this[6] = R.defaultValue(l,0),this[7] = R.defaultValue(h,0),this[8] = R.defaultValue(n,0),this[9] = R.defaultValue(s,0),this[10] = R.defaultValue(c,0),this[11] = R.defaultValue(p,0),this[12] = R.defaultValue(r,0),this[13] = R.defaultValue(o,0),this[14] = R.defaultValue(d,0),this[15] = R.defaultValue(m,0);
}W.packFloat = function(e,t){
return R.defined(t) || (t = new W),y[0] = e,v ? (t.x = w[0],t.y = w[1],t.z = w[2],t.w = w[3]) : (t.x = w[3],t.y = w[2],t.z = w[1],t.w = w[0]),t;
},W.unpackFloat = function(e){
return v ? (w[0] = e.x,w[1] = e.y,w[2] = e.z,w[3] = e.w) : (w[0] = e.w,w[1] = e.z,w[2] = e.y,w[3] = e.x),y[0];
},j.packedLength = 16,j.pack = function(e,t,n){
return n = R.defaultValue(n,0),t[n++] = e[0],t[n++] = e[1],t[n++] = e[2],t[n++] = e[3],t[n++] = e[4],t[n++] = e[5],t[n++] = e[6],t[n++] = e[7],t[n++] = e[8],t[n++] = e[9],t[n++] = e[10],t[n++] = e[11],t[n++] = e[12],t[n++] = e[13],t[n++] = e[14],t[n] = e[15],t;
},j.unpack = function(e,t,n){
return t = R.defaultValue(t,0),(n = !R.defined(n) ? new j : n)[0] = e[t++],n[1] = e[t++],n[2] = e[t++],n[3] = e[t++],n[4] = e[t++],n[5] = e[t++],n[6] = e[t++],n[7] = e[t++],n[8] = e[t++],n[9] = e[t++],n[10] = e[t++],n[11] = e[t++],n[12] = e[t++],n[13] = e[t++],n[14] = e[t++],n[15] = e[t],n;
},j.clone = function(e,t){
if(R.defined(e))return R.defined(t) ? (t[0] = e[0],t[1] = e[1],t[2] = e[2],t[3] = e[3],t[4] = e[4],t[5] = e[5],t[6] = e[6],t[7] = e[7],t[8] = e[8],t[9] = e[9],t[10] = e[10],t[11] = e[11],t[12] = e[12],t[13] = e[13],t[14] = e[14],t[15] = e[15],t) : new j(e[0],e[4],e[8],e[12],e[1],e[5],e[9],e[13],e[2],e[6],e[10],e[14],e[3],e[7],e[11],e[15]);
},j.fromArray = j.unpack,j.fromColumnMajorArray = function(e,t){
return j.clone(e,t);
},j.fromRowMajorArray = function(e,t){
return R.defined(t) ? (t[0] = e[0],t[1] = e[4],t[2] = e[8],t[3] = e[12],t[4] = e[1],t[5] = e[5],t[6] = e[9],t[7] = e[13],t[8] = e[2],t[9] = e[6],t[10] = e[10],t[11] = e[14],t[12] = e[3],t[13] = e[7],t[14] = e[11],t[15] = e[15],t) : new j(e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8],e[9],e[10],e[11],e[12],e[13],e[14],e[15]);
},j.fromRotationTranslation = function(e,t,n){
return t = R.defaultValue(t,A.Cartesian3.ZERO),R.defined(n) ? (n[0] = e[0],n[1] = e[1],n[2] = e[2],n[3] = 0,n[4] = e[3],n[5] = e[4],n[6] = e[5],n[7] = 0,n[8] = e[6],n[9] = e[7],n[10] = e[8],n[11] = 0,n[12] = t.x,n[13] = t.y,n[14] = t.z,n[15] = 1,n) : new j(e[0],e[3],e[6],t.x,e[1],e[4],e[7],t.y,e[2],e[5],e[8],t.z,0,0,0,1);
},j.fromTranslationQuaternionRotationScale = function(e,t,n,r){
R.defined(r) || (r = new j);var a = n.x,i = n.y,s = n.z,o = t.x * t.x,u = t.x * t.y,l = t.x * t.z,c = t.x * t.w,d = t.y * t.y,f = t.y * t.z,h = t.y * t.w,p = t.z * t.z,m = t.z * t.w,y = t.w * t.w,w = o - d - p + y,C = 2 * (u - m),n = 2 * (l + h),t = 2 * (u + m),u = d - o - p + y,m = 2 * (f - c),h = 2 * (l - h),c = 2 * (f + c),y = -o - d + p + y;return r[0] = w * a,r[1] = t * a,r[2] = h * a,r[3] = 0,r[4] = C * i,r[5] = u * i,r[6] = c * i,r[7] = 0,r[8] = n * s,r[9] = m * s,r[10] = y * s,r[11] = 0,r[12] = e.x,r[13] = e.y,r[14] = e.z,r[15] = 1,r;
},j.fromTranslationRotationScale = function(e,t){
return j.fromTranslationQuaternionRotationScale(e.translation,e.rotation,e.scale,t);
},j.fromTranslation = function(e,t){
return j.fromRotationTranslation(B.IDENTITY,e,t);
},j.fromScale = function(e,t){
return R.defined(t) ? (t[0] = e.x,t[1] = 0,t[2] = 0,t[3] = 0,t[4] = 0,t[5] = e.y,t[6] = 0,t[7] = 0,t[8] = 0,t[9] = 0,t[10] = e.z,t[11] = 0,t[12] = 0,t[13] = 0,t[14] = 0,t[15] = 1,t) : new j(e.x,0,0,0,0,e.y,0,0,0,0,e.z,0,0,0,0,1);
},j.fromUniformScale = function(e,t){
return R.defined(t) ? (t[0] = e,t[1] = 0,t[2] = 0,t[3] = 0,t[4] = 0,t[5] = e,t[6] = 0,t[7] = 0,t[8] = 0,t[9] = 0,t[10] = e,t[11] = 0,t[12] = 0,t[13] = 0,t[14] = 0,t[15] = 1,t) : new j(e,0,0,0,0,e,0,0,0,0,e,0,0,0,0,1);
};var g = new A.Cartesian3,x = new A.Cartesian3,E = new A.Cartesian3;j.fromCamera = function(e,t){
var n = e.position,r = e.direction,a = e.up;A.Cartesian3.normalize(r,g),A.Cartesian3.normalize(A.Cartesian3.cross(g,a,x),x),A.Cartesian3.normalize(A.Cartesian3.cross(x,g,E),E);var i = x.x,s = x.y,o = x.z,u = g.x,l = g.y,c = g.z,d = E.x,f = E.y,h = E.z,p = n.x,e = n.y,r = n.z,a = i * -p + s * -e + o * -r,n = d * -p + f * -e + h * -r,r = u * p + l * e + c * r;return R.defined(t) ? (t[0] = i,t[1] = d,t[2] = -u,t[3] = 0,t[4] = s,t[5] = f,t[6] = -l,t[7] = 0,t[8] = o,t[9] = h,t[10] = -c,t[11] = 0,t[12] = a,t[13] = n,t[14] = r,t[15] = 1,t) : new j(i,s,o,a,d,f,h,n,-u,-l,-c,r,0,0,0,1);
},j.computePerspectiveFieldOfView = function(e,t,n,r,a){
var i = 1 / Math.tan(.5 * e),e = i / t,t = (r + n) / (n - r),r = 2 * r * n / (n - r);return a[0] = e,a[1] = 0,a[2] = 0,a[3] = 0,a[4] = 0,a[5] = i,a[6] = 0,a[7] = 0,a[8] = 0,a[9] = 0,a[10] = t,a[11] = -1,a[12] = 0,a[13] = 0,a[14] = r,a[15] = 0,a;
},j.computeOrthographicOffCenter = function(e,t,n,r,a,i,s){
var o = 1 / (t - e),u = 1 / (r - n),l = 1 / (i - a),e = -(t + e) * o,n = -(r + n) * u,a = -(i + a) * l;return o *= 2,u *= 2,l *= -2,s[0] = o,s[1] = 0,s[2] = 0,s[3] = 0,s[4] = 0,s[5] = u,s[6] = 0,s[7] = 0,s[8] = 0,s[9] = 0,s[10] = l,s[11] = 0,s[12] = e,s[13] = n,s[14] = a,s[15] = 1,s;
},j.computePerspectiveOffCenter = function(e,t,n,r,a,i,s){
var o = 2 * a / (t - e),u = 2 * a / (r - n),e = (t + e) / (t - e),r = (r + n) / (r - n),n = -(i + a) / (i - a),a = -2 * i * a / (i - a);return s[0] = o,s[1] = 0,s[2] = 0,s[3] = 0,s[4] = 0,s[5] = u,s[6] = 0,s[7] = 0,s[8] = e,s[9] = r,s[10] = n,s[11] = -1,s[12] = 0,s[13] = 0,s[14] = a,s[15] = 0,s;
},j.computeInfinitePerspectiveOffCenter = function(e,t,n,r,a,i){
var s = 2 * a / (t - e),o = 2 * a / (r - n),e = (t + e) / (t - e),n = (r + n) / (r - n),a = -2 * a;return i[0] = s,i[1] = 0,i[2] = 0,i[3] = 0,i[4] = 0,i[5] = o,i[6] = 0,i[7] = 0,i[8] = e,i[9] = n,i[10] = -1,i[11] = -1,i[12] = 0,i[13] = 0,i[14] = a,i[15] = 0,i;
},j.computeViewportTransformation = function(e,t,n,r){
R.defined(r) || (r = new j),e = R.defaultValue(e,R.defaultValue.EMPTY_OBJECT);var a = R.defaultValue(e.x,0),i = R.defaultValue(e.y,0),s = R.defaultValue(e.width,0),o = R.defaultValue(e.height,0);t = R.defaultValue(t,0);var u = .5 * s,e = .5 * o,s = .5 * ((n = R.defaultValue(n,1)) - t),o = e,n = s,a = a + u,e = i + e,s = t + s;return r[0] = u,r[1] = 0,r[2] = 0,r[3] = 0,r[4] = 0,r[5] = o,r[6] = 0,r[7] = 0,r[8] = 0,r[9] = 0,r[10] = n,r[11] = 0,r[12] = a,r[13] = e,r[14] = s,r[15] = 1,r;
},j.computeView = function(e,t,n,r,a){
return a[0] = r.x,a[1] = n.x,a[2] = -t.x,a[3] = 0,a[4] = r.y,a[5] = n.y,a[6] = -t.y,a[7] = 0,a[8] = r.z,a[9] = n.z,a[10] = -t.z,a[11] = 0,a[12] = -A.Cartesian3.dot(r,e),a[13] = -A.Cartesian3.dot(n,e),a[14] = A.Cartesian3.dot(t,e),a[15] = 1,a;
},j.toArray = function(e,t){
return R.defined(t) ? (t[0] = e[0],t[1] = e[1],t[2] = e[2],t[3] = e[3],t[4] = e[4],t[5] = e[5],t[6] = e[6],t[7] = e[7],t[8] = e[8],t[9] = e[9],t[10] = e[10],t[11] = e[11],t[12] = e[12],t[13] = e[13],t[14] = e[14],t[15] = e[15],t) : [e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8],e[9],e[10],e[11],e[12],e[13],e[14],e[15]];
},j.getElementIndex = function(e,t){
return 4 * e + t;
},j.getColumn = function(e,t,n){
var r = 4 * t,a = e[r],i = e[1 + r],t = e[2 + r],r = e[3 + r];return n.x = a,n.y = i,n.z = t,n.w = r,n;
},j.setColumn = function(e,t,n,r){
t *= 4;return(r = j.clone(e,r))[t] = n.x,r[1 + t] = n.y,r[2 + t] = n.z,r[3 + t] = n.w,r;
},j.setTranslation = function(e,t,n){
return n[0] = e[0],n[1] = e[1],n[2] = e[2],n[3] = e[3],n[4] = e[4],n[5] = e[5],n[6] = e[6],n[7] = e[7],n[8] = e[8],n[9] = e[9],n[10] = e[10],n[11] = e[11],n[12] = t.x,n[13] = t.y,n[14] = t.z,n[15] = e[15],n;
};var O = new A.Cartesian3;j.setScale = function(e,t,n){
var r = j.getScale(e,O),r = A.Cartesian3.divideComponents(t,r,O);return j.multiplyByScale(e,r,n);
},j.getRow = function(e,t,n){
var r = e[t],a = e[t + 4],i = e[t + 8],t = e[t + 12];return n.x = r,n.y = a,n.z = i,n.w = t,n;
},j.setRow = function(e,t,n,r){
return(r = j.clone(e,r))[t] = n.x,r[t + 4] = n.y,r[t + 8] = n.z,r[t + 12] = n.w,r;
};var _ = new A.Cartesian3;j.getScale = function(e,t){
return t.x = A.Cartesian3.magnitude(A.Cartesian3.fromElements(e[0],e[1],e[2],_)),t.y = A.Cartesian3.magnitude(A.Cartesian3.fromElements(e[4],e[5],e[6],_)),t.z = A.Cartesian3.magnitude(A.Cartesian3.fromElements(e[8],e[9],e[10],_)),t;
};var S = new A.Cartesian3;j.getMaximumScale = function(e){
return j.getScale(e,S),A.Cartesian3.maximumComponent(S);
},j.multiply = function(e,t,n){
var r = e[0],a = e[1],i = e[2],s = e[3],o = e[4],u = e[5],l = e[6],c = e[7],d = e[8],f = e[9],h = e[10],p = e[11],m = e[12],y = e[13],w = e[14],C = e[15],v = t[0],g = t[1],x = t[2],E = t[3],O = t[4],_ = t[5],S = t[6],b = t[7],M = t[8],A = t[9],R = t[10],T = t[11],q = t[12],z = t[13],I = t[14],P = t[15],D = r * v + o * g + d * x + m * E,e = a * v + u * g + f * x + y * E,t = i * v + l * g + h * x + w * E,v = s * v + c * g + p * x + C * E,g = r * O + o * _ + d * S + m * b,x = a * O + u * _ + f * S + y * b,E = i * O + l * _ + h * S + w * b,O = s * O + c * _ + p * S + C * b,_ = r * M + o * A + d * R + m * T,S = a * M + u * A + f * R + y * T,b = i * M + l * A + h * R + w * T,T = s * M + c * A + p * R + C * T,m = r * q + o * z + d * I + m * P,y = a * q + u * z + f * I + y * P,w = i * q + l * z + h * I + w * P,P = s * q + c * z + p * I + C * P;return n[0] = D,n[1] = e,n[2] = t,n[3] = v,n[4] = g,n[5] = x,n[6] = E,n[7] = O,n[8] = _,n[9] = S,n[10] = b,n[11] = T,n[12] = m,n[13] = y,n[14] = w,n[15] = P,n;
},j.add = function(e,t,n){
return n[0] = e[0] + t[0],n[1] = e[1] + t[1],n[2] = e[2] + t[2],n[3] = e[3] + t[3],n[4] = e[4] + t[4],n[5] = e[5] + t[5],n[6] = e[6] + t[6],n[7] = e[7] + t[7],n[8] = e[8] + t[8],n[9] = e[9] + t[9],n[10] = e[10] + t[10],n[11] = e[11] + t[11],n[12] = e[12] + t[12],n[13] = e[13] + t[13],n[14] = e[14] + t[14],n[15] = e[15] + t[15],n;
},j.subtract = function(e,t,n){
return n[0] = e[0] - t[0],n[1] = e[1] - t[1],n[2] = e[2] - t[2],n[3] = e[3] - t[3],n[4] = e[4] - t[4],n[5] = e[5] - t[5],n[6] = e[6] - t[6],n[7] = e[7] - t[7],n[8] = e[8] - t[8],n[9] = e[9] - t[9],n[10] = e[10] - t[10],n[11] = e[11] - t[11],n[12] = e[12] - t[12],n[13] = e[13] - t[13],n[14] = e[14] - t[14],n[15] = e[15] - t[15],n;
},j.multiplyTransformation = function(e,t,n){
var r = e[0],a = e[1],i = e[2],s = e[4],o = e[5],u = e[6],l = e[8],c = e[9],d = e[10],f = e[12],h = e[13],p = e[14],m = t[0],y = t[1],w = t[2],C = t[4],v = t[5],g = t[6],x = t[8],E = t[9],O = t[10],_ = t[12],S = t[13],b = t[14],e = r * m + s * y + l * w,t = a * m + o * y + c * w,m = i * m + u * y + d * w,y = r * C + s * v + l * g,w = a * C + o * v + c * g,C = i * C + u * v + d * g,v = r * x + s * E + l * O,g = a * x + o * E + c * O,O = i * x + u * E + d * O,f = r * _ + s * S + l * b + f,h = a * _ + o * S + c * b + h,p = i * _ + u * S + d * b + p;return n[0] = e,n[1] = t,n[2] = m,n[3] = 0,n[4] = y,n[5] = w,n[6] = C,n[7] = 0,n[8] = v,n[9] = g,n[10] = O,n[11] = 0,n[12] = f,n[13] = h,n[14] = p,n[15] = 1,n;
},j.multiplyByMatrix3 = function(e,t,n){
var r = e[0],a = e[1],i = e[2],s = e[4],o = e[5],u = e[6],l = e[8],c = e[9],d = e[10],f = t[0],h = t[1],p = t[2],m = t[3],y = t[4],w = t[5],C = t[6],v = t[7],g = t[8],x = r * f + s * h + l * p,t = a * f + o * h + c * p,f = i * f + u * h + d * p,h = r * m + s * y + l * w,p = a * m + o * y + c * w,w = i * m + u * y + d * w,l = r * C + s * v + l * g,c = a * C + o * v + c * g,g = i * C + u * v + d * g;return n[0] = x,n[1] = t,n[2] = f,n[3] = 0,n[4] = h,n[5] = p,n[6] = w,n[7] = 0,n[8] = l,n[9] = c,n[10] = g,n[11] = 0,n[12] = e[12],n[13] = e[13],n[14] = e[14],n[15] = e[15],n;
},j.multiplyByTranslation = function(e,t,n){
var r = t.x,a = t.y,i = t.z,s = r * e[0] + a * e[4] + i * e[8] + e[12],t = r * e[1] + a * e[5] + i * e[9] + e[13],i = r * e[2] + a * e[6] + i * e[10] + e[14];return n[0] = e[0],n[1] = e[1],n[2] = e[2],n[3] = e[3],n[4] = e[4],n[5] = e[5],n[6] = e[6],n[7] = e[7],n[8] = e[8],n[9] = e[9],n[10] = e[10],n[11] = e[11],n[12] = s,n[13] = t,n[14] = i,n[15] = e[15],n;
};var b = new A.Cartesian3;j.multiplyByUniformScale = function(e,t,n){
return b.x = t,b.y = t,b.z = t,j.multiplyByScale(e,b,n);
},j.multiplyByScale = function(e,t,n){
var r = t.x,a = t.y,t = t.z;return 1 === r && 1 === a && 1 === t ? j.clone(e,n) : (n[0] = r * e[0],n[1] = r * e[1],n[2] = r * e[2],n[3] = 0,n[4] = a * e[4],n[5] = a * e[5],n[6] = a * e[6],n[7] = 0,n[8] = t * e[8],n[9] = t * e[9],n[10] = t * e[10],n[11] = 0,n[12] = e[12],n[13] = e[13],n[14] = e[14],n[15] = 1,n);
},j.multiplyByVector = function(e,t,n){
var r = t.x,a = t.y,i = t.z,s = t.w,o = e[0] * r + e[4] * a + e[8] * i + e[12] * s,u = e[1] * r + e[5] * a + e[9] * i + e[13] * s,t = e[2] * r + e[6] * a + e[10] * i + e[14] * s,s = e[3] * r + e[7] * a + e[11] * i + e[15] * s;return n.x = o,n.y = u,n.z = t,n.w = s,n;
},j.multiplyByPointAsVector = function(e,t,n){
var r = t.x,a = t.y,i = t.z,s = e[0] * r + e[4] * a + e[8] * i,t = e[1] * r + e[5] * a + e[9] * i,i = e[2] * r + e[6] * a + e[10] * i;return n.x = s,n.y = t,n.z = i,n;
},j.multiplyByPoint = function(e,t,n){
var r = t.x,a = t.y,i = t.z,s = e[0] * r + e[4] * a + e[8] * i + e[12],t = e[1] * r + e[5] * a + e[9] * i + e[13],e = e[2] * r + e[6] * a + e[10] * i + e[14];return n.x = s,n.y = t,n.z = e,n;
},j.multiplyByScalar = function(e,t,n){
return n[0] = e[0] * t,n[1] = e[1] * t,n[2] = e[2] * t,n[3] = e[3] * t,n[4] = e[4] * t,n[5] = e[5] * t,n[6] = e[6] * t,n[7] = e[7] * t,n[8] = e[8] * t,n[9] = e[9] * t,n[10] = e[10] * t,n[11] = e[11] * t,n[12] = e[12] * t,n[13] = e[13] * t,n[14] = e[14] * t,n[15] = e[15] * t,n;
},j.negate = function(e,t){
return t[0] = -e[0],t[1] = -e[1],t[2] = -e[2],t[3] = -e[3],t[4] = -e[4],t[5] = -e[5],t[6] = -e[6],t[7] = -e[7],t[8] = -e[8],t[9] = -e[9],t[10] = -e[10],t[11] = -e[11],t[12] = -e[12],t[13] = -e[13],t[14] = -e[14],t[15] = -e[15],t;
},j.transpose = function(e,t){
var n = e[1],r = e[2],a = e[3],i = e[6],s = e[7],o = e[11];return t[0] = e[0],t[1] = e[4],t[2] = e[8],t[3] = e[12],t[4] = n,t[5] = e[5],t[6] = e[9],t[7] = e[13],t[8] = r,t[9] = i,t[10] = e[10],t[11] = e[14],t[12] = a,t[13] = s,t[14] = o,t[15] = e[15],t;
},j.abs = function(e,t){
return t[0] = Math.abs(e[0]),t[1] = Math.abs(e[1]),t[2] = Math.abs(e[2]),t[3] = Math.abs(e[3]),t[4] = Math.abs(e[4]),t[5] = Math.abs(e[5]),t[6] = Math.abs(e[6]),t[7] = Math.abs(e[7]),t[8] = Math.abs(e[8]),t[9] = Math.abs(e[9]),t[10] = Math.abs(e[10]),t[11] = Math.abs(e[11]),t[12] = Math.abs(e[12]),t[13] = Math.abs(e[13]),t[14] = Math.abs(e[14]),t[15] = Math.abs(e[15]),t;
},j.equals = function(e,t){
return e === t || R.defined(e) && R.defined(t) && e[12] === t[12] && e[13] === t[13] && e[14] === t[14] && e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[4] === t[4] && e[5] === t[5] && e[6] === t[6] && e[8] === t[8] && e[9] === t[9] && e[10] === t[10] && e[3] === t[3] && e[7] === t[7] && e[11] === t[11] && e[15] === t[15];
},j.equalsEpsilon = function(e,t,n){
return n = R.defaultValue(n,0),e === t || R.defined(e) && R.defined(t) && Math.abs(e[0] - t[0]) <= n && Math.abs(e[1] - t[1]) <= n && Math.abs(e[2] - t[2]) <= n && Math.abs(e[3] - t[3]) <= n && Math.abs(e[4] - t[4]) <= n && Math.abs(e[5] - t[5]) <= n && Math.abs(e[6] - t[6]) <= n && Math.abs(e[7] - t[7]) <= n && Math.abs(e[8] - t[8]) <= n && Math.abs(e[9] - t[9]) <= n && Math.abs(e[10] - t[10]) <= n && Math.abs(e[11] - t[11]) <= n && Math.abs(e[12] - t[12]) <= n && Math.abs(e[13] - t[13]) <= n && Math.abs(e[14] - t[14]) <= n && Math.abs(e[15] - t[15]) <= n;
},j.getTranslation = function(e,t){
return t.x = e[12],t.y = e[13],t.z = e[14],t;
},j.getMatrix3 = function(e,t){
return t[0] = e[0],t[1] = e[1],t[2] = e[2],t[3] = e[4],t[4] = e[5],t[5] = e[6],t[6] = e[8],t[7] = e[9],t[8] = e[10],t;
};var k = new B,Y = new B,Z = new W,X = new W(0,0,0,1);j.inverse = function(e,t){
var n = e[0],r = e[4],a = e[8],i = e[12],s = e[1],o = e[5],u = e[9],l = e[13],c = e[2],d = e[6],f = e[10],h = e[14],p = e[3],m = e[7],y = e[11],w = e[15],C = f * w,v = h * y,g = d * w,x = h * m,E = d * y,O = f * m,_ = c * w,S = h * p,b = c * y,M = f * p,A = c * m,R = d * p,T = C * o + x * u + E * l - (v * o + g * u + O * l),q = v * s + _ * u + M * l - (C * s + S * u + b * l),z = g * s + S * o + A * l - (x * s + _ * o + R * l),I = O * s + b * o + R * u - (E * s + M * o + A * u),P = v * r + g * a + O * i - (C * r + x * a + E * i),D = C * n + S * a + b * i - (v * n + _ * a + M * i),U = x * n + _ * r + R * i - (g * n + S * r + A * i),N = E * n + M * r + A * a - (O * n + b * r + R * a),V = (C = a * l) * m + (x = i * o) * y + (E = r * u) * w - ((v = i * u) * m + (g = r * l) * y + (O = a * o) * w),u = v * p + (_ = n * l) * y + (M = a * s) * w - (C * p + (S = i * s) * y + (b = n * u) * w),w = g * p + S * m + (A = n * o) * w - (x * p + _ * m + (R = r * s) * w),m = O * p + b * m + R * y - (E * p + M * m + A * y),y = g * f + O * h + v * d - (E * h + C * d + x * f),v = b * h + C * c + S * f - (_ * f + M * h + v * c),S = _ * d + R * h + x * c - (A * h + g * c + S * d),c = A * f + E * c + M * d - (b * d + R * f + O * c),i = n * T + r * q + a * z + i * I;if(Math.abs(i) < F.CesiumMath.EPSILON21){
if(B.equalsEpsilon(j.getMatrix3(e,k),Y,F.CesiumMath.EPSILON7) && W.equals(j.getRow(e,3,Z),X))return t[0] = 0,t[1] = 0,t[2] = 0,t[3] = 0,t[4] = 0,t[5] = 0,t[6] = 0,t[7] = 0,t[8] = 0,t[9] = 0,t[10] = 0,t[11] = 0,t[12] = -e[12],t[13] = -e[13],t[14] = -e[14],t[15] = 1,t;throw new L.RuntimeError("matrix is not invertible because its determinate is zero.");
}return i = 1 / i,t[0] = T * i,t[1] = q * i,t[2] = z * i,t[3] = I * i,t[4] = P * i,t[5] = D * i,t[6] = U * i,t[7] = N * i,t[8] = V * i,t[9] = u * i,t[10] = w * i,t[11] = m * i,t[12] = y * i,t[13] = v * i,t[14] = S * i,t[15] = c * i,t;
},j.inverseTransformation = function(e,t){
var n = e[0],r = e[1],a = e[2],i = e[4],s = e[5],o = e[6],u = e[8],l = e[9],c = e[10],d = e[12],f = e[13],h = e[14],p = -n * d - r * f - a * h,e = -i * d - s * f - o * h,h = -u * d - l * f - c * h;return t[0] = n,t[1] = i,t[2] = u,t[3] = 0,t[4] = r,t[5] = s,t[6] = l,t[7] = 0,t[8] = a,t[9] = o,t[10] = c,t[11] = 0,t[12] = p,t[13] = e,t[14] = h,t[15] = 1,t;
};var M = new j;function T(e,t){
this.center = A.Cartesian3.clone(R.defaultValue(e,A.Cartesian3.ZERO)),this.radius = R.defaultValue(t,0);
}j.inverseTranspose = function(e,t){
return j.inverse(j.transpose(e,M),t);
},j.IDENTITY = Object.freeze(new j(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)),j.ZERO = Object.freeze(new j(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)),j.COLUMN0ROW0 = 0,j.COLUMN0ROW1 = 1,j.COLUMN0ROW2 = 2,j.COLUMN0ROW3 = 3,j.COLUMN1ROW0 = 4,j.COLUMN1ROW1 = 5,j.COLUMN1ROW2 = 6,j.COLUMN1ROW3 = 7,j.COLUMN2ROW0 = 8,j.COLUMN2ROW1 = 9,j.COLUMN2ROW2 = 10,j.COLUMN2ROW3 = 11,j.COLUMN3ROW0 = 12,j.COLUMN3ROW1 = 13,j.COLUMN3ROW2 = 14,j.COLUMN3ROW3 = 15,Object.defineProperties(j.prototype,{length: {get: function(){
return j.packedLength;
}}}),j.prototype.clone = function(e){
return j.clone(this,e);
},j.prototype.equals = function(e){
return j.equals(this,e);
},j.equalsArray = function(e,t,n){
return e[0] === t[n] && e[1] === t[n + 1] && e[2] === t[n + 2] && e[3] === t[n + 3] && e[4] === t[n + 4] && e[5] === t[n + 5] && e[6] === t[n + 6] && e[7] === t[n + 7] && e[8] === t[n + 8] && e[9] === t[n + 9] && e[10] === t[n + 10] && e[11] === t[n + 11] && e[12] === t[n + 12] && e[13] === t[n + 13] && e[14] === t[n + 14] && e[15] === t[n + 15];
},j.prototype.equalsEpsilon = function(e,t){
return j.equalsEpsilon(this,e,t);
},j.prototype.toString = function(){
return"(" + this[0] + ", " + this[4] + ", " + this[8] + ", " + this[12] + ")\n(" + this[1] + ", " + this[5] + ", " + this[9] + ", " + this[13] + ")\n(" + this[2] + ", " + this[6] + ", " + this[10] + ", " + this[14] + ")\n(" + this[3] + ", " + this[7] + ", " + this[11] + ", " + this[15] + ")";
};var q = new A.Cartesian3,z = new A.Cartesian3,I = new A.Cartesian3,P = new A.Cartesian3,D = new A.Cartesian3,U = new A.Cartesian3,N = new A.Cartesian3,V = new A.Cartesian3,H = new A.Cartesian3,J = new A.Cartesian3,G = new A.Cartesian3,Q = new A.Cartesian3,K = 4 / 3 * F.CesiumMath.PI;T.fromPoints = function(e,t){
if(R.defined(t) || (t = new T),!R.defined(e) || 0 === e.length)return t.center = A.Cartesian3.clone(A.Cartesian3.ZERO,t.center),t.radius = 0,t;for(var n = A.Cartesian3.clone(e[0],N),r = A.Cartesian3.clone(n,q),a = A.Cartesian3.clone(n,z),i = A.Cartesian3.clone(n,I),s = A.Cartesian3.clone(n,P),o = A.Cartesian3.clone(n,D),u = A.Cartesian3.clone(n,U),l = e.length,c = 1;c < l;c++){
A.Cartesian3.clone(e[c],n);var d = n.x,f = n.y,h = n.z;d < r.x && A.Cartesian3.clone(n,r),d > s.x && A.Cartesian3.clone(n,s),f < a.y && A.Cartesian3.clone(n,a),f > o.y && A.Cartesian3.clone(n,o),h < i.z && A.Cartesian3.clone(n,i),h > u.z && A.Cartesian3.clone(n,u);
}var p = A.Cartesian3.magnitudeSquared(A.Cartesian3.subtract(s,r,V)),m = A.Cartesian3.magnitudeSquared(A.Cartesian3.subtract(o,a,V)),y = A.Cartesian3.magnitudeSquared(A.Cartesian3.subtract(u,i,V)),w = r,C = s,p = p;p < m && (p = m,w = a,C = o),p < y && (p = y,w = i,C = u);var v = H;v.x = .5 * (w.x + C.x),v.y = .5 * (w.y + C.y),v.z = .5 * (w.z + C.z);var g = A.Cartesian3.magnitudeSquared(A.Cartesian3.subtract(C,v,V)),x = Math.sqrt(g),w = J;w.x = r.x,w.y = a.y,w.z = i.z;C = G;C.x = s.x,C.y = o.y,C.z = u.z;var E = A.Cartesian3.midpoint(w,C,Q),O = 0;for(c = 0;c < l;c++){
A.Cartesian3.clone(e[c],n);var _ = A.Cartesian3.magnitude(A.Cartesian3.subtract(n,E,V));O < _ && (O = _);var S = A.Cartesian3.magnitudeSquared(A.Cartesian3.subtract(n,v,V));g < S && (g = (x = .5 * (x + (_ = Math.sqrt(S)))) * x,S = _ - x,v.x = (x * v.x + S * n.x) / _,v.y = (x * v.y + S * n.y) / _,v.z = (x * v.z + S * n.z) / _);
}return x < O ? (A.Cartesian3.clone(v,t.center),t.radius = x) : (A.Cartesian3.clone(E,t.center),t.radius = O),t;
};var $ = new t,ee = new A.Cartesian3,te = new A.Cartesian3,ne = new A.Cartographic,re = new A.Cartographic;T.fromRectangle2D = function(e,t,n){
return T.fromRectangleWithHeights2D(e,t,0,0,n);
},T.fromRectangleWithHeights2D = function(e,t,n,r,a){
if(R.defined(a) || (a = new T),!R.defined(e))return a.center = A.Cartesian3.clone(A.Cartesian3.ZERO,a.center),a.radius = 0,a;t = R.defaultValue(t,$),A.Rectangle.southwest(e,ne),ne.height = n,A.Rectangle.northeast(e,re),re.height = r;var i = t.project(ne,ee),n = t.project(re,te),e = n.x - i.x,r = n.y - i.y,t = n.z - i.z;a.radius = .5 * Math.sqrt(e * e + r * r + t * t);n = a.center;return n.x = i.x + .5 * e,n.y = i.y + .5 * r,n.z = i.z + .5 * t,a;
};var ae = [];T.fromRectangle3D = function(e,t,n,r){
if(t = R.defaultValue(t,A.Ellipsoid.WGS84),n = R.defaultValue(n,0),R.defined(r) || (r = new T),!R.defined(e))return r.center = A.Cartesian3.clone(A.Cartesian3.ZERO,r.center),r.radius = 0,r;n = A.Rectangle.subsample(e,t,n,ae);return T.fromPoints(n,r);
},T.fromVertices = function(e,t,n,r){
if(R.defined(r) || (r = new T),!R.defined(e) || 0 === e.length)return r.center = A.Cartesian3.clone(A.Cartesian3.ZERO,r.center),r.radius = 0,r;t = R.defaultValue(t,A.Cartesian3.ZERO),n = R.defaultValue(n,3);var a = N;a.x = e[0] + t.x,a.y = e[1] + t.y,a.z = e[2] + t.z;for(var i = A.Cartesian3.clone(a,q),s = A.Cartesian3.clone(a,z),o = A.Cartesian3.clone(a,I),u = A.Cartesian3.clone(a,P),l = A.Cartesian3.clone(a,D),c = A.Cartesian3.clone(a,U),d = e.length,f = 0;f < d;f += n){
var h = e[f] + t.x,p = e[f + 1] + t.y,m = e[f + 2] + t.z;a.x = h,a.y = p,a.z = m,h < i.x && A.Cartesian3.clone(a,i),h > u.x && A.Cartesian3.clone(a,u),p < s.y && A.Cartesian3.clone(a,s),p > l.y && A.Cartesian3.clone(a,l),m < o.z && A.Cartesian3.clone(a,o),m > c.z && A.Cartesian3.clone(a,c);
}var y = A.Cartesian3.magnitudeSquared(A.Cartesian3.subtract(u,i,V)),w = A.Cartesian3.magnitudeSquared(A.Cartesian3.subtract(l,s,V)),C = A.Cartesian3.magnitudeSquared(A.Cartesian3.subtract(c,o,V)),v = i,g = u,y = y;y < w && (y = w,v = s,g = l),y < C && (y = C,v = o,g = c);var x = H;x.x = .5 * (v.x + g.x),x.y = .5 * (v.y + g.y),x.z = .5 * (v.z + g.z);var E = A.Cartesian3.magnitudeSquared(A.Cartesian3.subtract(g,x,V)),O = Math.sqrt(E),v = J;v.x = i.x,v.y = s.y,v.z = o.z;g = G;g.x = u.x,g.y = l.y,g.z = c.z;var _ = A.Cartesian3.midpoint(v,g,Q),S = 0;for(f = 0;f < d;f += n){
a.x = e[f] + t.x,a.y = e[f + 1] + t.y,a.z = e[f + 2] + t.z;var b = A.Cartesian3.magnitude(A.Cartesian3.subtract(a,_,V));S < b && (S = b);var M = A.Cartesian3.magnitudeSquared(A.Cartesian3.subtract(a,x,V));E < M && (E = (O = .5 * (O + (b = Math.sqrt(M)))) * O,M = b - O,x.x = (O * x.x + M * a.x) / b,x.y = (O * x.y + M * a.y) / b,x.z = (O * x.z + M * a.z) / b);
}return O < S ? (A.Cartesian3.clone(x,r.center),r.radius = O) : (A.Cartesian3.clone(_,r.center),r.radius = S),r;
},T.fromEncodedCartesianVertices = function(e,t,n){
if(R.defined(n) || (n = new T),!R.defined(e) || !R.defined(t) || e.length !== t.length || 0 === e.length)return n.center = A.Cartesian3.clone(A.Cartesian3.ZERO,n.center),n.radius = 0,n;var r = N;r.x = e[0] + t[0],r.y = e[1] + t[1],r.z = e[2] + t[2];for(var a = A.Cartesian3.clone(r,q),i = A.Cartesian3.clone(r,z),s = A.Cartesian3.clone(r,I),o = A.Cartesian3.clone(r,P),u = A.Cartesian3.clone(r,D),l = A.Cartesian3.clone(r,U),c = e.length,d = 0;d < c;d += 3){
var f = e[d] + t[d],h = e[d + 1] + t[d + 1],p = e[d + 2] + t[d + 2];r.x = f,r.y = h,r.z = p,f < a.x && A.Cartesian3.clone(r,a),f > o.x && A.Cartesian3.clone(r,o),h < i.y && A.Cartesian3.clone(r,i),h > u.y && A.Cartesian3.clone(r,u),p < s.z && A.Cartesian3.clone(r,s),p > l.z && A.Cartesian3.clone(r,l);
}var m = A.Cartesian3.magnitudeSquared(A.Cartesian3.subtract(o,a,V)),y = A.Cartesian3.magnitudeSquared(A.Cartesian3.subtract(u,i,V)),w = A.Cartesian3.magnitudeSquared(A.Cartesian3.subtract(l,s,V)),C = a,v = o,m = m;m < y && (m = y,C = i,v = u),m < w && (m = w,C = s,v = l);var g = H;g.x = .5 * (C.x + v.x),g.y = .5 * (C.y + v.y),g.z = .5 * (C.z + v.z);var x = A.Cartesian3.magnitudeSquared(A.Cartesian3.subtract(v,g,V)),E = Math.sqrt(x),C = J;C.x = a.x,C.y = i.y,C.z = s.z;v = G;v.x = o.x,v.y = u.y,v.z = l.z;var O = A.Cartesian3.midpoint(C,v,Q),_ = 0;for(d = 0;d < c;d += 3){
r.x = e[d] + t[d],r.y = e[d + 1] + t[d + 1],r.z = e[d + 2] + t[d + 2];var S = A.Cartesian3.magnitude(A.Cartesian3.subtract(r,O,V));_ < S && (_ = S);var b = A.Cartesian3.magnitudeSquared(A.Cartesian3.subtract(r,g,V));x < b && (x = (E = .5 * (E + (S = Math.sqrt(b)))) * E,b = S - E,g.x = (E * g.x + b * r.x) / S,g.y = (E * g.y + b * r.y) / S,g.z = (E * g.z + b * r.z) / S);
}return E < _ ? (A.Cartesian3.clone(g,n.center),n.radius = E) : (A.Cartesian3.clone(O,n.center),n.radius = _),n;
},T.fromCornerPoints = function(e,t,n){
R.defined(n) || (n = new T);e = A.Cartesian3.midpoint(e,t,n.center);return n.radius = A.Cartesian3.distance(e,t),n;
},T.fromEllipsoid = function(e,t){
return R.defined(t) || (t = new T),A.Cartesian3.clone(A.Cartesian3.ZERO,t.center),t.radius = e.maximumRadius,t;
};var ie = new A.Cartesian3;T.fromBoundingSpheres = function(e,t){
if(R.defined(t) || (t = new T),!R.defined(e) || 0 === e.length)return t.center = A.Cartesian3.clone(A.Cartesian3.ZERO,t.center),t.radius = 0,t;var n = e.length;if(1 === n)return T.clone(e[0],t);if(2 === n)return T.union(e[0],e[1],t);for(var r = [],a = 0;a < n;a++)r.push(e[a].center);var i = (t = T.fromPoints(r,t)).center,s = t.radius;for(a = 0;a < n;a++)var o = e[a],s = Math.max(s,A.Cartesian3.distance(i,o.center,ie) + o.radius);return t.radius = s,t;
};var se = new A.Cartesian3,oe = new A.Cartesian3,ue = new A.Cartesian3;T.fromOrientedBoundingBox = function(e,t){
R.defined(t) || (t = new T);var n = e.halfAxes,r = B.getColumn(n,0,se),a = B.getColumn(n,1,oe),n = B.getColumn(n,2,ue);return A.Cartesian3.add(r,a,r),A.Cartesian3.add(r,n,r),t.center = A.Cartesian3.clone(e.center,t.center),t.radius = A.Cartesian3.magnitude(r),t;
},T.clone = function(e,t){
if(R.defined(e))return R.defined(t) ? (t.center = A.Cartesian3.clone(e.center,t.center),t.radius = e.radius,t) : new T(e.center,e.radius);
},T.packedLength = 4,T.pack = function(e,t,n){
n = R.defaultValue(n,0);var r = e.center;return t[n++] = r.x,t[n++] = r.y,t[n++] = r.z,t[n] = e.radius,t;
},T.unpack = function(e,t,n){
t = R.defaultValue(t,0);var r = (n = !R.defined(n) ? new T : n).center;return r.x = e[t++],r.y = e[t++],r.z = e[t++],n.radius = e[t],n;
};var le = new A.Cartesian3,ce = new A.Cartesian3;T.union = function(e,t,n){
R.defined(n) || (n = new T);var r = e.center,a = e.radius,i = t.center,s = t.radius,o = A.Cartesian3.subtract(i,r,le),i = A.Cartesian3.magnitude(o);if(i + s <= a)return e.clone(n),n;if(i + a <= s)return t.clone(n),n;s = .5 * (a + i + s),i = A.Cartesian3.multiplyByScalar(o,(s - a) / i,ce);return A.Cartesian3.add(i,r,i),A.Cartesian3.clone(i,n.center),n.radius = s,n;
};var de = new A.Cartesian3;T.expand = function(e,t,n){
n = T.clone(e,n);t = A.Cartesian3.magnitude(A.Cartesian3.subtract(t,n.center,de));return t > n.radius && (n.radius = t),n;
},T.intersectPlane = function(e,t){
var n = e.center,r = e.radius,e = t.normal,t = A.Cartesian3.dot(e,n) + t.distance;return t < -r ? a.OUTSIDE : t < r ? a.INTERSECTING : a.INSIDE;
},T.transform = function(e,t,n){
return(n = !R.defined(n) ? new T : n).center = j.multiplyByPoint(t,e.center,n.center),n.radius = j.getMaximumScale(t) * e.radius,n;
};var fe = new A.Cartesian3;T.distanceSquaredTo = function(e,t){
t = A.Cartesian3.subtract(e.center,t,fe);return A.Cartesian3.magnitudeSquared(t) - e.radius * e.radius;
},T.transformWithoutScale = function(e,t,n){
return(n = !R.defined(n) ? new T : n).center = j.multiplyByPoint(t,e.center,n.center),n.radius = e.radius,n;
};var he = new A.Cartesian3;T.computePlaneDistances = function(e,t,n,r){
R.defined(r) || (r = new i);t = A.Cartesian3.subtract(e.center,t,he),t = A.Cartesian3.dot(n,t);return r.start = t - e.radius,r.stop = t + e.radius,r;
};for(var pe = new A.Cartesian3,me = new A.Cartesian3,ye = new A.Cartesian3,we = new A.Cartesian3,Ce = new A.Cartesian3,ve = new A.Cartographic,ge = new Array(8),xe = 0;xe < 8;++xe)ge[xe] = new A.Cartesian3;var Ee,Oe = new t;T.projectTo2D = function(e,t,n){
var r = (t = R.defaultValue(t,Oe)).ellipsoid,a = e.center,i = e.radius,s = A.Cartesian3.equals(a,A.Cartesian3.ZERO) ? A.Cartesian3.clone(A.Cartesian3.UNIT_X,pe) : r.geodeticSurfaceNormal(a,pe),o = A.Cartesian3.cross(A.Cartesian3.UNIT_Z,s,me);A.Cartesian3.normalize(o,o);var u = A.Cartesian3.cross(s,o,ye);A.Cartesian3.normalize(u,u),A.Cartesian3.multiplyByScalar(s,i,s),A.Cartesian3.multiplyByScalar(u,i,u),A.Cartesian3.multiplyByScalar(o,i,o);var l = A.Cartesian3.negate(u,Ce),e = A.Cartesian3.negate(o,we),c = ge,i = c[0];A.Cartesian3.add(s,u,i),A.Cartesian3.add(i,o,i),i = c[1],A.Cartesian3.add(s,u,i),A.Cartesian3.add(i,e,i),i = c[2],A.Cartesian3.add(s,l,i),A.Cartesian3.add(i,e,i),i = c[3],A.Cartesian3.add(s,l,i),A.Cartesian3.add(i,o,i),A.Cartesian3.negate(s,s),i = c[4],A.Cartesian3.add(s,u,i),A.Cartesian3.add(i,o,i),i = c[5],A.Cartesian3.add(s,u,i),A.Cartesian3.add(i,e,i),i = c[6],A.Cartesian3.add(s,l,i),A.Cartesian3.add(i,e,i),i = c[7],A.Cartesian3.add(s,l,i),A.Cartesian3.add(i,o,i);for(var d = c.length,f = 0;f < d;++f){
var h = c[f];A.Cartesian3.add(a,h,h);var p = r.cartesianToCartographic(h,ve);t.project(p,h);
}l = (a = (n = T.fromPoints(c,n)).center).x,o = a.y,i = a.z;return a.x = i,a.y = l,a.z = o,n;
},T.isOccluded = function(e,t){
return!t.isBoundingSphereVisible(e);
},T.equals = function(e,t){
return e === t || R.defined(e) && R.defined(t) && A.Cartesian3.equals(e.center,t.center) && e.radius === t.radius;
},T.prototype.intersectPlane = function(e){
return T.intersectPlane(this,e);
},T.prototype.distanceSquaredTo = function(e){
return T.distanceSquaredTo(this,e);
},T.prototype.computePlaneDistances = function(e,t,n){
return T.computePlaneDistances(this,e,t,n);
},T.prototype.isOccluded = function(e){
return T.isOccluded(this,e);
},T.prototype.equals = function(e){
return T.equals(this,e);
},T.prototype.clone = function(e){
return T.clone(this,e);
},T.prototype.volume = function(){
var e = this.radius;return K * e * e * e;
};var _e,Se,be,Me,Ae,Re,Te,qe,ze,Ie,Pe,De,Ue,Ne,Ve,Fe,Le,Be = {requestFullscreen: void 0,exitFullscreen: void 0,fullscreenEnabled: void 0,fullscreenElement: void 0,fullscreenchange: void 0,fullscreenerror: void 0},We = {};function je(e){
for(var t = e.split("."),n = 0,r = t.length;n < r;++n)t[n] = parseInt(t[n],10);return t;
}function ke(){
var e;return R.defined(Se) || (Se = !1,He() || null !== (e = / Chrome\/([\.0-9]+)/.exec(_e.userAgent)) && (Se = !0,be = je(e[1]))),Se;
}function Ye(){
var e;return R.defined(Me) || (Me = !1,ke() || He() || !/ Safari\/[\.0-9]+/.test(_e.userAgent) || null !== (e = / Version\/([\.0-9]+)/.exec(_e.userAgent)) && (Me = !0,Ae = je(e[1]))),Me;
}function Ze(){
var e;return R.defined(Re) || (Re = !1,null !== (e = / AppleWebKit\/([\.0-9]+)(\+?)/.exec(_e.userAgent)) && (Re = !0,(Te = je(e[1])).isNightly = !!e[2])),Re;
}function Xe(){
var e;return R.defined(qe) || (qe = !1,"Microsoft Internet Explorer" === _e.appName ? null !== (e = /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(_e.userAgent)) && (qe = !0,ze = je(e[1])) : "Netscape" === _e.appName && null !== (e = /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(_e.userAgent)) && (qe = !0,ze = je(e[1]))),qe;
}function He(){
var e;return R.defined(Ie) || (Ie = !1,null !== (e = / Edge\/([\.0-9]+)/.exec(_e.userAgent)) && (Ie = !0,Pe = je(e[1]))),Ie;
}function Je(){
var e;return R.defined(De) || (De = !1,null !== (e = /Firefox\/([\.0-9]+)/.exec(_e.userAgent)) && (De = !0,Ue = je(e[1]))),De;
}function Ge(){
var e;return R.defined(Le) || ((e = document.createElement("canvas")).setAttribute("style","image-rendering: -moz-crisp-edges;image-rendering: pixelated;"),e = e.style.imageRendering,(Le = R.defined(e) && "" !== e) && (Fe = e)),Le;
}function Qe(){
return Qe._result;
}Object.defineProperties(We,{element: {get: function(){
if(We.supportsFullscreen())return document[Be.fullscreenElement];
}},changeEventName: {get: function(){
if(We.supportsFullscreen())return Be.fullscreenchange;
}},errorEventName: {get: function(){
if(We.supportsFullscreen())return Be.fullscreenerror;
}},enabled: {get: function(){
if(We.supportsFullscreen())return document[Be.fullscreenEnabled];
}},fullscreen: {get: function(){
if(We.supportsFullscreen())return null !== We.element;
}}}),We.supportsFullscreen = function(){
if(R.defined(Ee))return Ee;Ee = !1;var e = document.body;if("function" == typeof e.requestFullscreen)return Be.requestFullscreen = "requestFullscreen",Be.exitFullscreen = "exitFullscreen",Be.fullscreenEnabled = "fullscreenEnabled",Be.fullscreenElement = "fullscreenElement",Be.fullscreenchange = "fullscreenchange",Be.fullscreenerror = "fullscreenerror",Ee = !0;for(var t = ["webkit","moz","o","ms","khtml"],n = 0,r = t.length;n < r;++n){
var a,i = t[n];"function" != typeof e[a = i + "RequestFullscreen"] && "function" != typeof e[a = i + "RequestFullScreen"] || (Be.requestFullscreen = a,Ee = !0),a = i + "ExitFullscreen","function" == typeof document[a] ? Be.exitFullscreen = a : (a = i + "CancelFullScreen","function" == typeof document[a] && (Be.exitFullscreen = a)),a = i + "FullscreenEnabled",void 0 !== document[a] ? Be.fullscreenEnabled = a : (a = i + "FullScreenEnabled",void 0 !== document[a] && (Be.fullscreenEnabled = a)),a = i + "FullscreenElement",void 0 !== document[a] ? Be.fullscreenElement = a : (a = i + "FullScreenElement",void 0 !== document[a] && (Be.fullscreenElement = a)),a = i + "fullscreenchange",void 0 !== document["on" + a] && ("ms" === i && (a = "MSFullscreenChange"),Be.fullscreenchange = a),a = i + "fullscreenerror",void 0 !== document["on" + a] && ("ms" === i && (a = "MSFullscreenError"),Be.fullscreenerror = a);
}return Ee;
},We.requestFullscreen = function(e,t){
We.supportsFullscreen() && e[Be.requestFullscreen]({vrDisplay: t});
},We.exitFullscreen = function(){
We.supportsFullscreen() && document[Be.exitFullscreen]();
},We._names = Be,_e = "undefined" != typeof navigator ? navigator : {},Qe._promise = void 0,Qe._result = void 0,Qe.initialize = function(){
if(R.defined(Qe._promise))return Qe._promise;var e = R.when.defer();if(Qe._promise = e.promise,He())return Qe._result = !1,e.resolve(Qe._result),e.promise;var t = new Image;return t.onload = function(){
Qe._result = 0 < t.width && 0 < t.height,e.resolve(Qe._result);
},t.onerror = function(){
Qe._result = !1,e.resolve(Qe._result);
},t.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",e.promise;
},Object.defineProperties(Qe,{initialized: {get: function(){
return R.defined(Qe._result);
}}});C = [];"undefined" != typeof ArrayBuffer && (C.push(Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array),"undefined" != typeof Uint8ClampedArray && C.push(Uint8ClampedArray),"undefined" != typeof Uint8ClampedArray && C.push(Uint8ClampedArray));var Ke = {isChrome: ke,chromeVersion: function(){
return ke() && be;
},isSafari: Ye,safariVersion: function(){
return Ye() && Ae;
},isWebkit: Ze,webkitVersion: function(){
return Ze() && Te;
},isInternetExplorer: Xe,internetExplorerVersion: function(){
return Xe() && ze;
},isEdge: He,edgeVersion: function(){
return He() && Pe;
},isFirefox: Je,firefoxVersion: function(){
return Je() && Ue;
},isWindows: function(){
return Ne = !R.defined(Ne) ? /Windows/i.test(_e.appVersion) : Ne;
},hardwareConcurrency: R.defaultValue(_e.hardwareConcurrency,3),supportsPointerEvents: function(){
return Ve = !R.defined(Ve) ? !Je() && "undefined" != typeof PointerEvent && (!R.defined(_e.pointerEnabled) || _e.pointerEnabled) : Ve;
},supportsImageRenderingPixelated: Ge,supportsWebP: Qe,imageRenderingValue: function(){
return Ge() ? Fe : void 0;
},typedArrayTypes: C};function $e(e,t,n,r){
this.x = R.defaultValue(e,0),this.y = R.defaultValue(t,0),this.z = R.defaultValue(n,0),this.w = R.defaultValue(r,0);
}Ke.supportsFullscreen = function(){
return We.supportsFullscreen();
},Ke.supportsTypedArrays = function(){
return"undefined" != typeof ArrayBuffer;
},Ke.supportsWebWorkers = function(){
return"undefined" != typeof Worker;
},Ke.supportsWebAssembly = function(){
return"undefined" != typeof WebAssembly && !Ke.isEdge();
};var et = new A.Cartesian3;$e.fromAxisAngle = function(e,t,n){
var r = t / 2,a = Math.sin(r),t = (et = A.Cartesian3.normalize(e,et)).x * a,e = et.y * a,a = et.z * a,r = Math.cos(r);return R.defined(n) ? (n.x = t,n.y = e,n.z = a,n.w = r,n) : new $e(t,e,a,r);
};var tt = [1,2,0],nt = new Array(3);$e.fromRotationMatrix = function(e,t){
var n,r,a,i,s = e[B.COLUMN0ROW0],o = e[B.COLUMN1ROW1],u = e[B.COLUMN2ROW2],l = s + o + u,c = 0 < l ? (a = .5 * (i = Math.sqrt(l + 1)),i = .5 / i,n = (e[B.COLUMN1ROW2] - e[B.COLUMN2ROW1]) * i,r = (e[B.COLUMN2ROW0] - e[B.COLUMN0ROW2]) * i,(e[B.COLUMN0ROW1] - e[B.COLUMN1ROW0]) * i) : (o = tt[s = tt[u = s < u && o < u ? 2 : s < o ? 1 : 0]],i = Math.sqrt(e[B.getElementIndex(u,u)] - e[B.getElementIndex(s,s)] - e[B.getElementIndex(o,o)] + 1),(c = nt)[u] = .5 * i,i = .5 / i,a = (e[B.getElementIndex(o,s)] - e[B.getElementIndex(s,o)]) * i,c[s] = (e[B.getElementIndex(s,u)] + e[B.getElementIndex(u,s)]) * i,c[o] = (e[B.getElementIndex(o,u)] + e[B.getElementIndex(u,o)]) * i,n = -c[0],r = -c[1],-c[2]);return R.defined(t) ? (t.x = n,t.y = r,t.z = c,t.w = a,t) : new $e(n,r,c,a);
};var rt = new $e,at = new $e,it = new $e,st = new $e;$e.fromHeadingPitchRoll = function(e,t){
return st = $e.fromAxisAngle(A.Cartesian3.UNIT_X,e.roll,rt),it = $e.fromAxisAngle(A.Cartesian3.UNIT_Y,-e.pitch,t),t = $e.multiply(it,st,it),at = $e.fromAxisAngle(A.Cartesian3.UNIT_Z,-e.heading,rt),$e.multiply(at,t,t);
};var ot = new A.Cartesian3,ut = new A.Cartesian3,lt = new $e,ct = new $e,dt = new $e;$e.packedLength = 4,$e.pack = function(e,t,n){
return n = R.defaultValue(n,0),t[n++] = e.x,t[n++] = e.y,t[n++] = e.z,t[n] = e.w,t;
},$e.unpack = function(e,t,n){
return t = R.defaultValue(t,0),(n = !R.defined(n) ? new $e : n).x = e[t],n.y = e[t + 1],n.z = e[t + 2],n.w = e[t + 3],n;
},$e.packedInterpolationLength = 3,$e.convertPackedArrayForInterpolation = function(e,t,n,r){
$e.unpack(e,4 * n,dt),$e.conjugate(dt,dt);for(var a = 0,i = n - t + 1;a < i;a++){
var s = 3 * a;$e.unpack(e,4 * (t + a),lt),$e.multiply(lt,dt,lt),lt.w < 0 && $e.negate(lt,lt),$e.computeAxis(lt,ot);var o = $e.computeAngle(lt);(r = !R.defined(r) ? [] : r)[s] = ot.x * o,r[1 + s] = ot.y * o,r[2 + s] = ot.z * o;
}
},$e.unpackInterpolationResult = function(e,t,n,r,a){
R.defined(a) || (a = new $e),A.Cartesian3.fromArray(e,0,ut);e = A.Cartesian3.magnitude(ut);return $e.unpack(t,4 * r,ct),0 === e ? $e.clone($e.IDENTITY,lt) : $e.fromAxisAngle(ut,e,lt),$e.multiply(lt,ct,a);
},$e.clone = function(e,t){
if(R.defined(e))return R.defined(t) ? (t.x = e.x,t.y = e.y,t.z = e.z,t.w = e.w,t) : new $e(e.x,e.y,e.z,e.w);
},$e.conjugate = function(e,t){
return t.x = -e.x,t.y = -e.y,t.z = -e.z,t.w = e.w,t;
},$e.magnitudeSquared = function(e){
return e.x * e.x + e.y * e.y + e.z * e.z + e.w * e.w;
},$e.magnitude = function(e){
return Math.sqrt($e.magnitudeSquared(e));
},$e.normalize = function(e,t){
var n = 1 / $e.magnitude(e),r = e.x * n,a = e.y * n,i = e.z * n,n = e.w * n;return t.x = r,t.y = a,t.z = i,t.w = n,t;
},$e.inverse = function(e,t){
var n = $e.magnitudeSquared(e);return t = $e.conjugate(e,t),$e.multiplyByScalar(t,1 / n,t);
},$e.add = function(e,t,n){
return n.x = e.x + t.x,n.y = e.y + t.y,n.z = e.z + t.z,n.w = e.w + t.w,n;
},$e.subtract = function(e,t,n){
return n.x = e.x - t.x,n.y = e.y - t.y,n.z = e.z - t.z,n.w = e.w - t.w,n;
},$e.negate = function(e,t){
return t.x = -e.x,t.y = -e.y,t.z = -e.z,t.w = -e.w,t;
},$e.dot = function(e,t){
return e.x * t.x + e.y * t.y + e.z * t.z + e.w * t.w;
},$e.multiply = function(e,t,n){
var r = e.x,a = e.y,i = e.z,s = e.w,o = t.x,u = t.y,l = t.z,c = t.w,d = s * o + r * c + a * l - i * u,e = s * u - r * l + a * c + i * o,t = s * l + r * u - a * o + i * c,l = s * c - r * o - a * u - i * l;return n.x = d,n.y = e,n.z = t,n.w = l,n;
},$e.multiplyByScalar = function(e,t,n){
return n.x = e.x * t,n.y = e.y * t,n.z = e.z * t,n.w = e.w * t,n;
},$e.divideByScalar = function(e,t,n){
return n.x = e.x / t,n.y = e.y / t,n.z = e.z / t,n.w = e.w / t,n;
},$e.computeAxis = function(e,t){
var n = e.w;if(Math.abs(n - 1) < F.CesiumMath.EPSILON6)return t.x = t.y = t.z = 0,t;n = 1 / Math.sqrt(1 - n * n);return t.x = e.x * n,t.y = e.y * n,t.z = e.z * n,t;
},$e.computeAngle = function(e){
return Math.abs(e.w - 1) < F.CesiumMath.EPSILON6 ? 0 : 2 * Math.acos(e.w);
};var ft = new $e;$e.lerp = function(e,t,n,r){
return ft = $e.multiplyByScalar(t,n,ft),r = $e.multiplyByScalar(e,1 - n,r),$e.add(ft,r,r);
};var ht = new $e,pt = new $e,mt = new $e;$e.slerp = function(e,t,n,r){
var a = $e.dot(e,t),i = t;if(a < 0 && (a = -a,i = ht = $e.negate(t,ht)),1 - a < F.CesiumMath.EPSILON6)return $e.lerp(e,i,n,r);a = Math.acos(a);return pt = $e.multiplyByScalar(e,Math.sin((1 - n) * a),pt),mt = $e.multiplyByScalar(i,Math.sin(n * a),mt),r = $e.add(pt,mt,r),$e.multiplyByScalar(r,1 / Math.sin(a),r);
},$e.log = function(e,t){
var n = F.CesiumMath.acosClamped(e.w),r = 0;return 0 !== n && (r = n / Math.sin(n)),A.Cartesian3.multiplyByScalar(e,r,t);
},$e.exp = function(e,t){
var n = A.Cartesian3.magnitude(e),r = 0;return 0 !== n && (r = Math.sin(n) / n),t.x = e.x * r,t.y = e.y * r,t.z = e.z * r,t.w = Math.cos(n),t;
};var yt = new A.Cartesian3,wt = new A.Cartesian3,Ct = new $e,vt = new $e;$e.computeInnerQuadrangle = function(e,t,n,r){
var a = $e.conjugate(t,Ct);$e.multiply(a,n,vt);n = $e.log(vt,yt);$e.multiply(a,e,vt);e = $e.log(vt,wt);return A.Cartesian3.add(n,e,n),A.Cartesian3.multiplyByScalar(n,.25,n),A.Cartesian3.negate(n,n),$e.exp(n,Ct),$e.multiply(t,Ct,r);
},$e.squad = function(e,t,n,r,a,i){
t = $e.slerp(e,t,a,Ct),r = $e.slerp(n,r,a,vt);return $e.slerp(t,r,2 * a * (1 - a),i);
};for(var gt = new $e,C = 1.9011074535173003,xt = Ke.supportsTypedArrays() ? new Float32Array(8) : [],Et = Ke.supportsTypedArrays() ? new Float32Array(8) : [],Ot = Ke.supportsTypedArrays() ? new Float32Array(8) : [],_t = Ke.supportsTypedArrays() ? new Float32Array(8) : [],St = 0;St < 7;++St){
var bt = St + 1,Mt = 2 * bt + 1;xt[St] = 1 / (bt * Mt),Et[St] = bt / Mt;
}function At(e,t,n){
for(var r,a,i = 0,s = e.length - 1;i <= s;)if((a = n(e[r = ~~((i + s) / 2)],t)) < 0)i = 1 + r;else{
if(!(0 < a))return r;s = r - 1;
}return~(s + 1);
}function Rt(e,t,n,r,a){
this.xPoleWander = e,this.yPoleWander = t,this.xPoleOffset = n,this.yPoleOffset = r,this.ut1MinusUtc = a;
}function Tt(){
function v(e,t,n,r){
return n = n || " ",n = e.length >= t ? "" : Array(1 + t - e.length >>> 0).join(n),r ? e + n : n + e;
}function g(e,t,n,r,a,i){
var s = r - e.length;return e = 0 < s ? n || !a ? v(e,r,i,n) : e.slice(0,t.length) + v("",s,"0",!0) + e.slice(t.length) : e;
}function x(e,t,n,r,a,i,s){
var o = e >>> 0;return e = (n = n && o && {2: "0b",8: "0",16: "0x"}[t] || "") + v(o.toString(t),i || 0,"0",!1),g(e,n,r,a,s);
}function E(e,t,n,r,a,i){
return null != r && (e = e.slice(0,r)),g(e,"",t,n,a,i);
}var O = arguments,_ = 0,e = O[_++];return e.replace(/%%|%(\d+\$)?([-+\'#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuideEfFgG])/g,function(e,t,n,r,a,i,s){
var o,u,l,c,d;if("%%" == e)return"%";for(var f = !1,h = "",p = !1,m = !1,y = " ",w = n.length,C = 0;n && C < w;C++)switch(n.charAt(C)){
case" ":h = " ";break;case"+":h = "+";break;case"-":f = !0;break;case"'":y = n.charAt(C + 1);break;case"0":p = !0;break;case"#":m = !0;
}if((r = r ? "*" == r ? +O[_++] : "*" == r.charAt(0) ? +O[r.slice(1,-1)] : +r : 0) < 0 && (r = -r,f = !0),!isFinite(r))throw new Error("sprintf: (minimum-)width must be finite");switch(i = i ? "*" == i ? +O[_++] : "*" == i.charAt(0) ? +O[i.slice(1,-1)] : +i : -1 < "fFeE".indexOf(s) ? 6 : "d" == s ? 0 : void 0,d = t ? O[t.slice(0,-1)] : O[_++],s){
case"s":return E(String(d),f,r,i,p,y);case"c":return E(String.fromCharCode(+d),f,r,i,p);case"b":return x(d,2,m,f,r,i,p);case"o":return x(d,8,m,f,r,i,p);case"x":return x(d,16,m,f,r,i,p);case"X":return x(d,16,m,f,r,i,p).toUpperCase();case"u":return x(d,10,m,f,r,i,p);case"i":case"d":return o = +d || 0,d = (u = (o = Math.round(o - o % 1)) < 0 ? "-" : h) + v(String(Math.abs(o)),i,"0",!1),g(d,u,f,r,p);case"e":case"E":case"f":case"F":case"g":case"G":return u = (o = +d) < 0 ? "-" : h,l = ["toExponential","toFixed","toPrecision"]["efg".indexOf(s.toLowerCase())],c = ["toString","toUpperCase"]["eEfFgG".indexOf(s) % 2],d = u + Math.abs(o)[l](i),g(d,u,f,r,p)[c]();default:return e;
}
});
}function qt(e,t,n,r,a,i,s,o){
this.year = e,this.month = t,this.day = n,this.hour = r,this.minute = a,this.second = i,this.millisecond = s,this.isLeapSecond = o;
}function zt(e){
return e % 4 == 0 && e % 100 != 0 || e % 400 == 0;
}function It(e,t){
this.julianDate = e,this.offset = t;
}xt[7] = C / 136,Et[7] = 8 * C / 17,$e.fastSlerp = function(e,t,n,r){
var a,i = $e.dot(e,t);0 <= i ? a = 1 : (a = -1,i = -i);for(var s = i - 1,i = 1 - n,o = n * n,u = i * i,l = 7;0 <= l;--l)Ot[l] = (xt[l] * o - Et[l]) * s,_t[l] = (xt[l] * u - Et[l]) * s;n = a * n * (1 + Ot[0] * (1 + Ot[1] * (1 + Ot[2] * (1 + Ot[3] * (1 + Ot[4] * (1 + Ot[5] * (1 + Ot[6] * (1 + Ot[7])))))))),i *= 1 + _t[0] * (1 + _t[1] * (1 + _t[2] * (1 + _t[3] * (1 + _t[4] * (1 + _t[5] * (1 + _t[6] * (1 + _t[7]))))))),i = $e.multiplyByScalar(e,i,gt);return $e.multiplyByScalar(t,n,r),$e.add(i,r,r);
},$e.fastSquad = function(e,t,n,r,a,i){
t = $e.fastSlerp(e,t,a,Ct),r = $e.fastSlerp(n,r,a,vt);return $e.fastSlerp(t,r,2 * a * (1 - a),i);
},$e.equals = function(e,t){
return e === t || R.defined(e) && R.defined(t) && e.x === t.x && e.y === t.y && e.z === t.z && e.w === t.w;
},$e.equalsEpsilon = function(e,t,n){
return n = R.defaultValue(n,0),e === t || R.defined(e) && R.defined(t) && Math.abs(e.x - t.x) <= n && Math.abs(e.y - t.y) <= n && Math.abs(e.z - t.z) <= n && Math.abs(e.w - t.w) <= n;
},$e.ZERO = Object.freeze(new $e(0,0,0,0)),$e.IDENTITY = Object.freeze(new $e(0,0,0,1)),$e.prototype.clone = function(e){
return $e.clone(this,e);
},$e.prototype.equals = function(e){
return $e.equals(this,e);
},$e.prototype.equalsEpsilon = function(e,t){
return $e.equalsEpsilon(this,e,t);
},$e.prototype.toString = function(){
return"(" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ")";
};var Pt = Object.freeze({SECONDS_PER_MILLISECOND: .001,SECONDS_PER_MINUTE: 60,MINUTES_PER_HOUR: 60,HOURS_PER_DAY: 24,SECONDS_PER_HOUR: 3600,MINUTES_PER_DAY: 1440,SECONDS_PER_DAY: 86400,DAYS_PER_JULIAN_CENTURY: 36525,PICOSECOND: 1e-9,MODIFIED_JULIAN_DATE_DIFFERENCE: 2400000.5}),Dt = Object.freeze({UTC: 0,TAI: 1}),Ut = new qt,Nt = [31,28,31,30,31,30,31,31,30,31,30,31];function Vt(e,t){
return Kt.compare(e.julianDate,t.julianDate);
}var Ft = new It;function Lt(e){
Ft.julianDate = e;var t = Kt.leapSeconds,n = At(t,Ft,Vt),r = t[n = (n = n < 0 ? ~n : n) >= t.length ? t.length - 1 : n].offset;0 < n && r < Kt.secondsDifference(t[n].julianDate,e) && (r = t[--n].offset),Kt.addSeconds(e,r,e);
}function Bt(e,t){
Ft.julianDate = e;var n = Kt.leapSeconds,r = At(n,Ft,Vt);if(0 === (r = r < 0 ? ~r : r))return Kt.addSeconds(e,-n[0].offset,t);if(r >= n.length)return Kt.addSeconds(e,-n[r - 1].offset,t);var a = Kt.secondsDifference(n[r].julianDate,e);return 0 === a ? Kt.addSeconds(e,-n[r].offset,t) : a <= 1 ? void 0 : Kt.addSeconds(e,-n[--r].offset,t);
}function Wt(e,t,n){
var r = t / Pt.SECONDS_PER_DAY | 0;return e += r,(t -= Pt.SECONDS_PER_DAY * r) < 0 && (e--,t += Pt.SECONDS_PER_DAY),n.dayNumber = e,n.secondsOfDay = t,n;
}function jt(e,t,n,r,a,i,s){
var o = (t - 14) / 12 | 0,e = e + 4800 + o,n = (1461 * e / 4 | 0) + (367 * (t - 2 - 12 * o) / 12 | 0) - (3 * ((e + 100) / 100 | 0) / 4 | 0) + n - 32075;(r -= 12) < 0 && (r += 24);s = i + (r * Pt.SECONDS_PER_HOUR + a * Pt.SECONDS_PER_MINUTE + s * Pt.SECONDS_PER_MILLISECOND);return 43200 <= s && --n,[n,s];
}var kt = /^(\d{4})$/,Yt = /^(\d{4})-(\d{2})$/,Zt = /^(\d{4})-?(\d{3})$/,Xt = /^(\d{4})-?W(\d{2})-?(\d{1})?$/,Ht = /^(\d{4})-?(\d{2})-?(\d{2})$/,C = /([Z+\-])?(\d{2})?:?(\d{2})?$/,Jt = /^(\d{2})(\.\d+)?/.source + C.source,Gt = /^(\d{2}):?(\d{2})(\.\d+)?/.source + C.source,Qt = /^(\d{2}):?(\d{2}):?(\d{2})(\.\d+)?/.source + C.source;function Kt(e,t,n){
this.dayNumber = void 0,this.secondsOfDay = void 0,e = R.defaultValue(e,0),t = R.defaultValue(t,0),n = R.defaultValue(n,Dt.UTC);var r = 0 | e;Wt(r,t += (e - r) * Pt.SECONDS_PER_DAY,this),n === Dt.UTC && Lt(this);
}Kt.fromGregorianDate = function(e,t){
e = jt(e.year,e.month,e.day,e.hour,e.minute,e.second,e.millisecond);return R.defined(t) ? (Wt(e[0],e[1],t),Lt(t),t) : new Kt(e[0],e[1],Dt.UTC);
},Kt.fromDate = function(e,t){
e = jt(e.getUTCFullYear(),e.getUTCMonth() + 1,e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds(),e.getUTCMilliseconds());return R.defined(t) ? (Wt(e[0],e[1],t),Lt(t),t) : new Kt(e[0],e[1],Dt.UTC);
},Kt.fromIso8601 = function(e,t){
var n,r,a,i,s,o = (e = e.replace(",",".")).split("T"),u = 1,l = 1,c = 0,d = 0,f = 0,h = 0,p = o[0],e = o[1];if(null !== (o = p.match(Ht)) ? (a = +o[1],u = +o[2],l = +o[3]) : null !== (o = p.match(Yt)) ? (a = +o[1],u = +o[2]) : null !== (o = p.match(kt)) ? a = +o[1] : (null !== (o = p.match(Zt)) ? (a = +o[1],i = +o[2],r = zt(a)) : null !== (o = p.match(Xt)) && (a = +o[1],i = 7 * +o[2] + (+o[3] || 0) - new Date(Date.UTC(a,0,4)).getUTCDay() - 3),(n = new Date(Date.UTC(a,0,1))).setUTCDate(i),u = n.getUTCMonth() + 1,l = n.getUTCDate()),r = zt(a),R.defined(e)){
null !== (o = e.match(Qt)) ? (c = +o[1],d = +o[2],f = +o[3],h = 1e3 * +(o[4] || 0),s = 5) : null !== (o = e.match(Gt)) ? (c = +o[1],d = +o[2],f = 60 * +(o[3] || 0),s = 4) : null !== (o = e.match(Jt)) && (c = +o[1],d = 60 * +(o[2] || 0),s = 3);var m = o[s],y = +o[s + 1],w = +(o[s + 2] || 0);switch(m){
case"+":c -= y,d -= w;break;case"-":c += y,d += w;break;case"Z":break;default:d += new Date(Date.UTC(a,u - 1,l,c,d)).getTimezoneOffset();
}
}m = 60 === f;for(m && f--;60 <= d;)d -= 60,c++;for(;24 <= c;)c -= 24,l++;for(n = r && 2 === u ? 29 : Nt[u - 1];n < l;)l -= n,12 < ++u && (u -= 12,a++),n = r && 2 === u ? 29 : Nt[u - 1];for(;d < 0;)d += 60,c--;for(;c < 0;)c += 24,l--;for(;l < 1;)--u < 1 && (u += 12,a--),l += n = r && 2 === u ? 29 : Nt[u - 1];h = jt(a,u,l,c,d,f,h);return R.defined(t) ? (Wt(h[0],h[1],t),Lt(t)) : t = new Kt(h[0],h[1],Dt.UTC),m && Kt.addSeconds(t,1,t),t;
},Kt.now = function(e){
return Kt.fromDate(new Date,e);
};var $t = new Kt(0,0,Dt.TAI);function en(e){
e instanceof en ? (this.scheme = e.scheme,this.authority = e.authority,this.path = e.path,this.query = e.query,this.fragment = e.fragment) : e && (e = tn.exec(e),this.scheme = e[1],this.authority = e[2],this.path = e[3],this.query = e[4],this.fragment = e[5]);
}Kt.toGregorianDate = function(e,t){
var n = !1,r = Bt(e,$t);R.defined(r) || (Kt.addSeconds(e,-1,$t),r = Bt($t,$t),n = !0);var a = r.dayNumber,i = r.secondsOfDay;43200 <= i && (a += 1);var s = a + 68569 | 0,o = 4 * s / 146097 | 0,u = 4e3 * (1 + (s = s - ((146097 * o + 3) / 4 | 0) | 0)) / 1461001 | 0,e = 80 * (s = s - (1461 * u / 4 | 0) + 31 | 0) / 2447 | 0,r = s - (2447 * e / 80 | 0) | 0,a = 2 + e - 12 * (s = e / 11 | 0) | 0,e = 100 * (o - 49) + u + s | 0,o = i / Pt.SECONDS_PER_HOUR | 0,u = i - o * Pt.SECONDS_PER_HOUR,s = u / Pt.SECONDS_PER_MINUTE | 0,i = 0 | (u -= s * Pt.SECONDS_PER_MINUTE),u = (u - i) / Pt.SECONDS_PER_MILLISECOND;return 23 < (o += 12) && (o -= 24),n && (i += 1),R.defined(t) ? (t.year = e,t.month = a,t.day = r,t.hour = o,t.minute = s,t.second = i,t.millisecond = u,t.isLeapSecond = n,t) : new qt(e,a,r,o,s,i,u,n);
},Kt.toDate = function(e){
var t = Kt.toGregorianDate(e,Ut),e = t.second;return t.isLeapSecond && --e,new Date(Date.UTC(t.year,t.month - 1,t.day,t.hour,t.minute,e,t.millisecond));
},Kt.toIso8601 = function(e,t){
var n = Kt.toGregorianDate(e,Ut),r = n.year,a = n.month,i = n.day,s = n.hour,o = n.minute,e = n.second,n = n.millisecond;return 1e4 === r && 1 === a && 1 === i && 0 === s && 0 === o && 0 === e && 0 === n && (r = 9999,a = 12,i = 31,s = 24),R.defined(t) || 0 === n ? R.defined(t) && 0 !== t ? Tt("%04d-%02d-%02dT%02d:%02d:%02d.%sZ",r,a,i,s,o,e,(.01 * n).toFixed(t).replace(".","").slice(0,t)) : Tt("%04d-%02d-%02dT%02d:%02d:%02dZ",r,a,i,s,o,e) : Tt("%04d-%02d-%02dT%02d:%02d:%02d.%sZ",r,a,i,s,o,e,(.01 * n).toString().replace(".",""));
},Kt.clone = function(e,t){
if(R.defined(e))return R.defined(t) ? (t.dayNumber = e.dayNumber,t.secondsOfDay = e.secondsOfDay,t) : new Kt(e.dayNumber,e.secondsOfDay,Dt.TAI);
},Kt.compare = function(e,t){
var n = e.dayNumber - t.dayNumber;return 0 != n ? n : e.secondsOfDay - t.secondsOfDay;
},Kt.equals = function(e,t){
return e === t || R.defined(e) && R.defined(t) && e.dayNumber === t.dayNumber && e.secondsOfDay === t.secondsOfDay;
},Kt.equalsEpsilon = function(e,t,n){
return n = R.defaultValue(n,0),e === t || R.defined(e) && R.defined(t) && Math.abs(Kt.secondsDifference(e,t)) <= n;
},Kt.totalDays = function(e){
return e.dayNumber + e.secondsOfDay / Pt.SECONDS_PER_DAY;
},Kt.secondsDifference = function(e,t){
return(e.dayNumber - t.dayNumber) * Pt.SECONDS_PER_DAY + (e.secondsOfDay - t.secondsOfDay);
},Kt.daysDifference = function(e,t){
return e.dayNumber - t.dayNumber + (e.secondsOfDay - t.secondsOfDay) / Pt.SECONDS_PER_DAY;
},Kt.computeTaiMinusUtc = function(e){
Ft.julianDate = e;var t = Kt.leapSeconds,e = At(t,Ft,Vt);return e < 0 && (e = ~e,--e < 0 && (e = 0)),t[e].offset;
},Kt.addSeconds = function(e,t,n){
return Wt(e.dayNumber,e.secondsOfDay + t,n);
},Kt.addMinutes = function(e,t,n){
t = e.secondsOfDay + t * Pt.SECONDS_PER_MINUTE;return Wt(e.dayNumber,t,n);
},Kt.addHours = function(e,t,n){
t = e.secondsOfDay + t * Pt.SECONDS_PER_HOUR;return Wt(e.dayNumber,t,n);
},Kt.addDays = function(e,t,n){
return Wt(e.dayNumber + t,e.secondsOfDay,n);
},Kt.lessThan = function(e,t){
return Kt.compare(e,t) < 0;
},Kt.lessThanOrEquals = function(e,t){
return Kt.compare(e,t) <= 0;
},Kt.greaterThan = function(e,t){
return 0 < Kt.compare(e,t);
},Kt.greaterThanOrEquals = function(e,t){
return 0 <= Kt.compare(e,t);
},Kt.prototype.clone = function(e){
return Kt.clone(this,e);
},Kt.prototype.equals = function(e){
return Kt.equals(this,e);
},Kt.prototype.equalsEpsilon = function(e,t){
return Kt.equalsEpsilon(this,e,t);
},Kt.prototype.toString = function(){
return Kt.toIso8601(this);
},Kt.leapSeconds = [new It(new Kt(2441317,43210,Dt.TAI),10),new It(new Kt(2441499,43211,Dt.TAI),11),new It(new Kt(2441683,43212,Dt.TAI),12),new It(new Kt(2442048,43213,Dt.TAI),13),new It(new Kt(2442413,43214,Dt.TAI),14),new It(new Kt(2442778,43215,Dt.TAI),15),new It(new Kt(2443144,43216,Dt.TAI),16),new It(new Kt(2443509,43217,Dt.TAI),17),new It(new Kt(2443874,43218,Dt.TAI),18),new It(new Kt(2444239,43219,Dt.TAI),19),new It(new Kt(2444786,43220,Dt.TAI),20),new It(new Kt(2445151,43221,Dt.TAI),21),new It(new Kt(2445516,43222,Dt.TAI),22),new It(new Kt(2446247,43223,Dt.TAI),23),new It(new Kt(2447161,43224,Dt.TAI),24),new It(new Kt(2447892,43225,Dt.TAI),25),new It(new Kt(2448257,43226,Dt.TAI),26),new It(new Kt(2448804,43227,Dt.TAI),27),new It(new Kt(2449169,43228,Dt.TAI),28),new It(new Kt(2449534,43229,Dt.TAI),29),new It(new Kt(2450083,43230,Dt.TAI),30),new It(new Kt(2450630,43231,Dt.TAI),31),new It(new Kt(2451179,43232,Dt.TAI),32),new It(new Kt(2453736,43233,Dt.TAI),33),new It(new Kt(2454832,43234,Dt.TAI),34),new It(new Kt(2456109,43235,Dt.TAI),35),new It(new Kt(2457204,43236,Dt.TAI),36),new It(new Kt(2457754,43237,Dt.TAI),37)],en.prototype.scheme = null,en.prototype.authority = null,en.prototype.path = "",en.prototype.query = null,en.prototype.fragment = null;var tn = new RegExp("^(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*)(?:\\?([^#]*))?(?:#(.*))?$");en.prototype.getScheme = function(){
return this.scheme;
},en.prototype.getAuthority = function(){
return this.authority;
},en.prototype.getPath = function(){
return this.path;
},en.prototype.getQuery = function(){
return this.query;
},en.prototype.getFragment = function(){
return this.fragment;
},en.prototype.isAbsolute = function(){
return!!this.scheme && !this.fragment;
},en.prototype.isSameDocumentAs = function(e){
return e.scheme == this.scheme && e.authority == this.authority && e.path == this.path && e.query == this.query;
},en.prototype.equals = function(e){
return this.isSameDocumentAs(e) && e.fragment == this.fragment;
},en.prototype.normalize = function(){
this.removeDotSegments(),this.scheme && (this.scheme = this.scheme.toLowerCase()),this.authority && (this.authority = this.authority.replace(an,on).replace(nn,sn)),this.path && (this.path = this.path.replace(nn,sn)),this.query && (this.query = this.query.replace(nn,sn)),this.fragment && (this.fragment = this.fragment.replace(nn,sn));
};var nn = /%[0-9a-z]{2}/gi,rn = /[a-zA-Z0-9\-\._~]/,an = /(.*@)?([^@:]*)(:.*)?/;function sn(e){
var t = unescape(e);return rn.test(t) ? t : e.toUpperCase();
}function on(e,t,n,r){
return(t || "") + n.toLowerCase() + (r || "");
}function un(e,t){
if(null === e || "object" != typeof e)return e;t = R.defaultValue(t,!1);var n,r,a = new e.constructor;for(n in e)e.hasOwnProperty(n) && (r = e[n],t && (r = un(r,t)),a[n] = r);return a;
}function ln(e,t,n){
n = R.defaultValue(n,!1);var r,a,i,s = {},o = R.defined(e),u = R.defined(t);if(o)for(r in e)e.hasOwnProperty(r) && (a = e[r],u && n && "object" == typeof a && t.hasOwnProperty(r) ? (i = t[r],s[r] = "object" == typeof i ? ln(a,i,n) : a) : s[r] = a);if(u)for(r in t)t.hasOwnProperty(r) && !s.hasOwnProperty(r) && (i = t[r],s[r] = i);return s;
}function cn(e,t){
var n;return"undefined" != typeof document && (n = document),cn._implementation(e,t,n);
}en.prototype.resolve = function(e){
var t = new en;return this.scheme ? (t.scheme = this.scheme,t.authority = this.authority,t.path = this.path,t.query = this.query) : (t.scheme = e.scheme,this.authority ? (t.authority = this.authority,t.path = this.path,t.query = this.query) : (t.authority = e.authority,"" == this.path ? (t.path = e.path,t.query = this.query || e.query) : ("/" == this.path.charAt(0) ? t.path = this.path : e.authority && "" == e.path ? t.path = "/" + this.path : t.path = e.path.substring(0,e.path.lastIndexOf("/") + 1) + this.path,t.removeDotSegments(),t.query = this.query))),t.fragment = this.fragment,t;
},en.prototype.removeDotSegments = function(){
var e,t = this.path.split("/"),n = [],r = "" == t[0];for(r && t.shift(),"" == t[0] && t.shift();t.length;)".." == (e = t.shift()) ? n.pop() : "." != e && n.push(e);"." != e && ".." != e || n.push(""),r && n.unshift(""),this.path = n.join("/");
},en.prototype.toString = function(){
var e = "";return this.scheme && (e += this.scheme + ":"),this.authority && (e += "//" + this.authority),e += this.path,this.query && (e += "?" + this.query),this.fragment && (e += "#" + this.fragment),e;
},cn._implementation = function(e,t,n){
if(!R.defined(t)){
if(void 0 === n)return e;t = R.defaultValue(n.baseURI,n.location.href);
}t = new en(t);return new en(e).resolve(t).toString();
};var dn,fn = /^blob:/i;function hn(e){
return fn.test(e);
}var pn = /^data:/i;function mn(e){
return pn.test(e);
}var yn = Object.freeze({UNISSUED: 0,ISSUED: 1,ACTIVE: 2,RECEIVED: 3,CANCELLED: 4,FAILED: 5}),wn = Object.freeze({TERRAIN: 0,IMAGERY: 1,TILES3D: 2,OTHER: 3});function Cn(e){
e = R.defaultValue(e,R.defaultValue.EMPTY_OBJECT);var t = R.defaultValue(e.throttleByServer,!1),n = R.defaultValue(e.throttle,!1);this.url = e.url,this.requestFunction = e.requestFunction,this.cancelFunction = e.cancelFunction,this.priorityFunction = e.priorityFunction,this.priority = R.defaultValue(e.priority,0),this.throttle = n,this.throttleByServer = t,this.type = R.defaultValue(e.type,wn.OTHER),this.serverKey = void 0,this.state = yn.UNISSUED,this.deferred = void 0,this.cancelled = !1;
}function vn(e,t,n){
this.statusCode = e,this.response = t,this.responseHeaders = n,"string" == typeof this.responseHeaders && (this.responseHeaders = function(e){
var t = {};if(!e)return t;for(var n = e.split("\r\n"),r = 0;r < n.length;++r){
var a,i = n[r],s = i.indexOf(": ");0 < s && (a = i.substring(0,s),s = i.substring(s + 2),t[a] = s);
}return t;
}(this.responseHeaders));
}function gn(){
this._listeners = [],this._scopes = [],this._toRemove = [],this._insideRaiseEvent = !1;
}function xn(e,t){
return t - e;
}function En(e){
this._comparator = e.comparator,this._array = [],this._length = 0,this._maximumLength = void 0;
}function On(e,t,n){
var r = e[t];e[t] = e[n],e[n] = r;
}Cn.prototype.cancel = function(){
this.cancelled = !0;
},Cn.prototype.clone = function(e){
return R.defined(e) ? (e.url = this.url,e.requestFunction = this.requestFunction,e.cancelFunction = this.cancelFunction,e.priorityFunction = this.priorityFunction,e.priority = this.priority,e.throttle = this.throttle,e.throttleByServer = this.throttleByServer,e.type = this.type,e.serverKey = this.serverKey,e.state = this.RequestState.UNISSUED,e.deferred = void 0,e.cancelled = !1,e) : new Cn(this);
},vn.prototype.toString = function(){
var e = "Request has failed.";return R.defined(this.statusCode) && (e += " Status Code: " + this.statusCode),e;
},Object.defineProperties(gn.prototype,{numberOfListeners: {get: function(){
return this._listeners.length - this._toRemove.length;
}}}),gn.prototype.addEventListener = function(e,t){
this._listeners.push(e),this._scopes.push(t);var n = this;return function(){
n.removeEventListener(e,t);
};
},gn.prototype.removeEventListener = function(e,t){
for(var n = this._listeners,r = this._scopes,a = -1,i = 0;i < n.length;i++)if(n[i] === e && r[i] === t){
a = i;break;
}return-1 !== a && (this._insideRaiseEvent ? (this._toRemove.push(a),n[a] = void 0,r[a] = void 0) : (n.splice(a,1),r.splice(a,1)),!0);
},gn.prototype.raiseEvent = function(){
this._insideRaiseEvent = !0;for(var e = this._listeners,t = this._scopes,n = e.length,r = 0;r < n;r++){
var a = e[r];R.defined(a) && e[r].apply(t[r],arguments);
}var i = this._toRemove;if(0 < (n = i.length)){
for(i.sort(xn),r = 0;r < n;r++){
var s = i[r];e.splice(s,1),t.splice(s,1);
}i.length = 0;
}this._insideRaiseEvent = !1;
},Object.defineProperties(En.prototype,{length: {get: function(){
return this._length;
}},internalArray: {get: function(){
return this._array;
}},maximumLength: {get: function(){
return this._maximumLength;
},set: function(e){
var t = this._length;if(e < t){
for(var n = this._array,r = e;r < t;++r)n[r] = void 0;this._length = e,n.length = e;
}this._maximumLength = e;
}},comparator: {get: function(){
return this._comparator;
}}}),En.prototype.reserve = function(e){
e = R.defaultValue(e,this._length),this._array.length = e;
},En.prototype.heapify = function(e){
e = R.defaultValue(e,0);for(var t = this._length,n = this._comparator,r = this._array,a = -1,i = !0;i;){
var s = 2 * (e + 1),o = s - 1,a = o < t && n(r[o],r[e]) < 0 ? o : e;(a = s < t && n(r[s],r[a]) < 0 ? s : a) !== e ? (On(r,a,e),e = a) : i = !1;
}
},En.prototype.resort = function(){
for(var e = this._length,t = Math.ceil(e / 2);0 <= t;--t)this.heapify(t);
},En.prototype.insert = function(e){
var t,n = this._array,r = this._comparator,a = this._maximumLength,i = this._length++;for(i < n.length ? n[i] = e : n.push(e);0 !== i;){
var s = Math.floor((i - 1) / 2);if(!(r(n[i],n[s]) < 0))break;On(n,i,s),i = s;
}return R.defined(a) && this._length > a && (t = n[a],this._length = a),t;
},En.prototype.pop = function(e){
if(e = R.defaultValue(e,0),0 !== this._length){
var t = this._array,n = t[e];return On(t,e,--this._length),this.heapify(e),t[this._length] = void 0,n;
}
};var _n = {numberOfAttemptedRequests: 0,numberOfActiveRequests: 0,numberOfCancelledRequests: 0,numberOfCancelledActiveRequests: 0,numberOfFailedRequests: 0,numberOfActiveRequestsEver: 0,lastNumberOfActiveRequests: 0},Sn = 20,bn = new En({comparator: function(e,t){
return e.priority - t.priority;
}});bn.maximumLength = Sn,bn.reserve(Sn);var Mn = [],An = {},Rn = "undefined" != typeof document ? new en(document.location.href) : new en,Tn = new gn;function qn(){}function zn(e){
R.defined(e.priorityFunction) && (e.priority = e.priorityFunction());
}function In(e){
var t = R.defaultValue(qn.requestsByServer[e],qn.maximumRequestsPerServer);return An[e] < t;
}function Pn(e){
return e.state === yn.UNISSUED && (e.state = yn.ISSUED,e.deferred = R.when.defer()),e.deferred.promise;
}function Dn(e){
var t,n,r = Pn(e);return e.state = yn.ACTIVE,Mn.push(e),++_n.numberOfActiveRequests,++_n.numberOfActiveRequestsEver,++An[e.serverKey],e.requestFunction().then((n = e,function(e){
var t;n.state !== yn.CANCELLED && (t = n.deferred,--_n.numberOfActiveRequests,--An[n.serverKey],Tn.raiseEvent(),n.state = yn.RECEIVED,n.deferred = void 0,t.resolve(e));
})).otherwise((t = e,function(e){
t.state !== yn.CANCELLED && (++_n.numberOfFailedRequests,--_n.numberOfActiveRequests,--An[t.serverKey],Tn.raiseEvent(e),t.state = yn.FAILED,t.deferred.reject(e));
})),r;
}function Un(e){
var t,n = e.state === yn.ACTIVE;e.state = yn.CANCELLED,++_n.numberOfCancelledRequests,R.defined(e.deferred) && (t = e.deferred,e.deferred = void 0,t.reject()),n && (--_n.numberOfActiveRequests,--An[e.serverKey],++_n.numberOfCancelledActiveRequests),R.defined(e.cancelFunction) && e.cancelFunction();
}qn.maximumRequests = 50,qn.maximumRequestsPerServer = 6,qn.requestsByServer = {"api.cesium.com:443": 18,"assets.cesium.com:443": 18},qn.throttleRequests = !0,qn.debugShowStatistics = !1,qn.requestCompletedEvent = Tn,Object.defineProperties(qn,{statistics: {get: function(){
return _n;
}},priorityHeapLength: {get: function(){
return Sn;
},set: function(e){
if(e < Sn)for(;bn.length > e;)Un(bn.pop());Sn = e,bn.maximumLength = e,bn.reserve(e);
}}}),qn.update = function(){
for(var e,t = 0,n = Mn.length,r = 0;r < n;++r)(e = Mn[r]).cancelled && Un(e),e.state === yn.ACTIVE ? 0 < t && (Mn[r - t] = e) : ++t;Mn.length -= t;var a = bn.internalArray,i = bn.length;for(r = 0;r < i;++r)zn(a[r]);bn.resort();for(var s = Math.max(qn.maximumRequests - Mn.length,0),o = 0;o < s && 0 < bn.length;)!(e = bn.pop()).cancelled && (!e.throttleByServer || In(e.serverKey)) ? (Dn(e),++o) : Un(e);!function(){
if(!qn.debugShowStatistics)return;0 === _n.numberOfActiveRequests && 0 < _n.lastNumberOfActiveRequests && (0 < _n.numberOfAttemptedRequests && (console.log("Number of attempted requests: " + _n.numberOfAttemptedRequests),_n.numberOfAttemptedRequests = 0),0 < _n.numberOfCancelledRequests && (console.log("Number of cancelled requests: " + _n.numberOfCancelledRequests),_n.numberOfCancelledRequests = 0),0 < _n.numberOfCancelledActiveRequests && (console.log("Number of cancelled active requests: " + _n.numberOfCancelledActiveRequests),_n.numberOfCancelledActiveRequests = 0),0 < _n.numberOfFailedRequests && (console.log("Number of failed requests: " + _n.numberOfFailedRequests),_n.numberOfFailedRequests = 0));_n.lastNumberOfActiveRequests = _n.numberOfActiveRequests;
}();
},qn.getServerKey = function(e){
var t = new en(e).resolve(Rn);t.normalize();e = t.authority;/:/.test(e) || (e = e + ":" + ("https" === t.scheme ? "443" : "80"));t = An[e];return R.defined(t) || (An[e] = 0),e;
},qn.request = function(e){
if(mn(e.url) || hn(e.url))return Tn.raiseEvent(),e.state = yn.RECEIVED,e.requestFunction();if(++_n.numberOfAttemptedRequests,R.defined(e.serverKey) || (e.serverKey = qn.getServerKey(e.url)),!qn.throttleRequests || !e.throttleByServer || In(e.serverKey)){
if(!qn.throttleRequests || !e.throttle)return Dn(e);if(!(Mn.length >= qn.maximumRequests)){
zn(e);var t = bn.insert(e);if(R.defined(t)){
if(t === e)return;Un(t);
}return Pn(e);
}
}
},qn.clearForSpecs = function(){
for(;0 < bn.length;)Un(bn.pop());for(var e = Mn.length,t = 0;t < e;++t)Un(Mn[t]);Mn.length = 0,An = {},_n.numberOfAttemptedRequests = 0,_n.numberOfActiveRequests = 0,_n.numberOfCancelledRequests = 0,_n.numberOfCancelledActiveRequests = 0,_n.numberOfFailedRequests = 0,_n.numberOfActiveRequestsEver = 0,_n.lastNumberOfActiveRequests = 0;
},qn.numberOfActiveRequestsByServer = function(e){
return An[e];
},qn.requestHeap = bn;var Nn = {},Vn = {};Nn.add = function(e,t){
t = e.toLowerCase() + ":" + t;R.defined(Vn[t]) || (Vn[t] = !0);
},Nn.remove = function(e,t){
t = e.toLowerCase() + ":" + t;R.defined(Vn[t]) && delete Vn[t];
},Nn.contains = function(e){
e = function(e){
var t = new en(e);if(t.normalize(),e = t.getAuthority(),R.defined(e)){
if(-1 === (e = -1 !== e.indexOf("@") ? e.split("@")[1] : e).indexOf(":")){
t = t.getScheme();if("http" === (t = !R.defined(t) ? (t = window.location.protocol).substring(0,t.length - 1) : t))e += ":80";else{
if("https" !== t)return;e += ":443";
}
}return e;
}
}(e);return!(!R.defined(e) || !R.defined(Vn[e]));
},Nn.clear = function(){
Vn = {};
};var Fn,Ln = function(){
try{
var e = new XMLHttpRequest;return e.open("GET","#",!0),(e.responseType = "blob") === e.responseType;
}catch(e){
return!1;
}
}();function Bn(e,t,n,r){
var a,i = e.query;if(!R.defined(i) || 0 === i.length)return 1;i = -1 === i.indexOf("=") ? ((a = {})[i] = void 0,a) : function(e){
var t = {};if("" === e)return t;for(var n = e.replace(/\+/g,"%20").split(/[&;]/),r = 0,a = n.length;r < a;++r){
var i = n[r].split("="),s = decodeURIComponent(i[0]),o = i[1],o = R.defined(o) ? decodeURIComponent(o) : "",i = t[s];"string" == typeof i ? t[s] = [i,o] : Array.isArray(i) ? i.push(o) : t[s] = o;
}return t;
}(i),t._queryParameters = n ? Yn(i,t._queryParameters,r) : i,e.query = void 0;
}function Wn(e,t){
var n = t._queryParameters,t = Object.keys(n);1 !== t.length || R.defined(n[t[0]]) ? e.query = function(e){
var t,n = "";for(t in e)if(e.hasOwnProperty(t)){
var r = e[t],a = encodeURIComponent(t) + "=";if(Array.isArray(r))for(var i = 0,s = r.length;i < s;++i)n += a + encodeURIComponent(r[i]) + "&";else n += a + encodeURIComponent(r) + "&";
}return n = n.slice(0,-1);
}(n) : e.query = t[0];
}function jn(e,t){
return R.defined(e) ? R.defined(e.clone) ? e.clone() : un(e) : t;
}function kn(e){
if(e.state === yn.ISSUED || e.state === yn.ACTIVE)throw new L.RuntimeError("The Resource is already being fetched.");e.state = yn.UNISSUED,e.deferred = void 0;
}function Yn(e,t,n){
if(!n)return ln(e,t);var r,a,i,s = un(e,!0);for(r in t)t.hasOwnProperty(r) && (a = s[r],i = t[r],R.defined(a) ? (Array.isArray(a) || (a = s[r] = [a]),s[r] = a.concat(i)) : s[r] = Array.isArray(i) ? i.slice() : i);return s;
}function Zn(e){
"string" == typeof(e = R.defaultValue(e,R.defaultValue.EMPTY_OBJECT)) && (e = {url: e}),this._url = void 0,this._templateValues = jn(e.templateValues,{}),this._queryParameters = jn(e.queryParameters,{}),this.headers = jn(e.headers,{}),this.request = R.defaultValue(e.request,new Cn),this.proxy = e.proxy,this.retryCallback = e.retryCallback,this.retryAttempts = R.defaultValue(e.retryAttempts,0),this._retryCount = 0;e = new en(e.url);Bn(e,this,!0,!0),e.fragment = void 0,this._url = e.toString();
}function Xn(e){
var n = e.resource,r = e.flipY,a = e.preferImageBitmap,i = n.request;i.url = n.url,i.requestFunction = function(){
var e = !1;n.isDataUri || n.isBlobUri || (e = n.isCrossOriginUrl);var t = R.when.defer();return Zn._Implementations.createImage(i,e,t,r,a),t.promise;
};e = qn.request(i);if(R.defined(e))return e.otherwise(function(t){
return i.state !== yn.FAILED ? R.when.reject(t) : n.retryOnError(t).then(function(e){
return e ? (i.state = yn.UNISSUED,i.deferred = void 0,Xn({resource: n,flipY: r,preferImageBitmap: a})) : R.when.reject(t);
});
});
}Zn.createIfNeeded = function(e){
return e instanceof Zn ? e.getDerivedResource({request: e.request}) : "string" != typeof e ? e : new Zn({url: e});
},Zn.supportsImageBitmapOptions = function(){
if(R.defined(Fn))return Fn;if("function" != typeof createImageBitmap)return Fn = R.when.resolve(!1);return Fn = Zn.fetchBlob({url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWP4////fwAJ+wP9CNHoHgAAAABJRU5ErkJggg=="}).then(function(e){
return createImageBitmap(e,{imageOrientation: "flipY",premultiplyAlpha: "none"});
}).then(function(e){
return!0;
}).otherwise(function(){
return!1;
});
},Object.defineProperties(Zn,{isBlobSupported: {get: function(){
return Ln;
}}}),Object.defineProperties(Zn.prototype,{queryParameters: {get: function(){
return this._queryParameters;
}},templateValues: {get: function(){
return this._templateValues;
}},url: {get: function(){
return this.getUrlComponent(!0,!0);
},set: function(e){
e = new en(e);Bn(e,this,!1),e.fragment = void 0,this._url = e.toString();
}},extension: {get: function(){
return e = this._url,(t = new en(e)).normalize(),e = t.path,e = -1 === (t = (e = -1 !== (t = e.lastIndexOf("/")) ? e.substr(t + 1) : e).lastIndexOf(".")) ? "" : e.substr(t + 1);var e,t;
}},isDataUri: {get: function(){
return mn(this._url);
}},isBlobUri: {get: function(){
return hn(this._url);
}},isCrossOriginUrl: {get: function(){
return function(e){
(dn = !R.defined(dn) ? document.createElement("a") : dn).href = window.location.href;var t = dn.host,n = dn.protocol;return dn.href = e,dn.href = dn.href,n !== dn.protocol || t !== dn.host;
}(this._url);
}},hasHeaders: {get: function(){
return 0 < Object.keys(this.headers).length;
}}}),Zn.prototype.toString = function(){
return this.getUrlComponent(!0,!0);
},Zn.prototype.getUrlComponent = function(e,t){
if(this.isDataUri)return this._url;var n = new en(this._url);e && Wn(n,this);var n = n.toString().replace(/%7B/g,"{").replace(/%7D/g,"}"),r = this._templateValues,n = n.replace(/{(.*?)}/g,function(e,t){
t = r[t];return R.defined(t) ? encodeURIComponent(t) : e;
});return n = t && R.defined(this.proxy) ? this.proxy.getURL(n) : n;
},Zn.prototype.setQueryParameters = function(e,t){
this._queryParameters = t ? Yn(this._queryParameters,e,!1) : Yn(e,this._queryParameters,!1);
},Zn.prototype.appendQueryParameters = function(e){
this._queryParameters = Yn(e,this._queryParameters,!0);
},Zn.prototype.setTemplateValues = function(e,t){
this._templateValues = t ? ln(this._templateValues,e) : ln(e,this._templateValues);
},Zn.prototype.getDerivedResource = function(e){
var t,n = this.clone();return n._retryCount = 0,R.defined(e.url) && (Bn(t = new en(e.url),n,!0,R.defaultValue(e.preserveQueryParameters,!1)),t.fragment = void 0,n._url = t.resolve(new en(cn(this._url))).toString()),R.defined(e.queryParameters) && (n._queryParameters = ln(e.queryParameters,n._queryParameters)),R.defined(e.templateValues) && (n._templateValues = ln(e.templateValues,n.templateValues)),R.defined(e.headers) && (n.headers = ln(e.headers,n.headers)),R.defined(e.proxy) && (n.proxy = e.proxy),R.defined(e.request) && (n.request = e.request),R.defined(e.retryCallback) && (n.retryCallback = e.retryCallback),R.defined(e.retryAttempts) && (n.retryAttempts = e.retryAttempts),n;
},Zn.prototype.retryOnError = function(e){
var t = this.retryCallback;if("function" != typeof t || this._retryCount >= this.retryAttempts)return R.when(!1);var n = this;return R.when(t(this,e)).then(function(e){
return++n._retryCount,e;
});
},Zn.prototype.clone = function(e){
return(e = !R.defined(e) ? new Zn({url: this._url}) : e)._url = this._url,e._queryParameters = un(this._queryParameters),e._templateValues = un(this._templateValues),e.headers = un(this.headers),e.proxy = this.proxy,e.retryCallback = this.retryCallback,e.retryAttempts = this.retryAttempts,e._retryCount = 0,e.request = this.request.clone(),e;
},Zn.prototype.getBaseUri = function(e){
return t = this.getUrlComponent(e),n = e,r = "",-1 !== (e = t.lastIndexOf("/")) && (r = t.substring(0,e + 1)),n && (t = new en(t),R.defined(t.query) && (r += "?" + t.query),R.defined(t.fragment) && (r += "#" + t.fragment)),r;var t,n,r;
},Zn.prototype.appendForwardSlash = function(){
var e;this._url = (0 !== (e = this._url).length && "/" === e[e.length - 1] || (e += "/"),e);
},Zn.prototype.fetchArrayBuffer = function(){
return this.fetch({responseType: "arraybuffer"});
},Zn.fetchArrayBuffer = function(e){
return new Zn(e).fetchArrayBuffer();
},Zn.prototype.fetchBlob = function(){
return this.fetch({responseType: "blob"});
},Zn.fetchBlob = function(e){
return new Zn(e).fetchBlob();
},Zn.prototype.fetchImage = function(e){
e = R.defaultValue(e,R.defaultValue.EMPTY_OBJECT);var t = R.defaultValue(e.preferImageBitmap,!1),n = R.defaultValue(e.preferBlob,!1),r = R.defaultValue(e.flipY,!1);if(kn(this.request),!Ln || this.isDataUri || this.isBlobUri || !this.hasHeaders && !n)return Xn({resource: this,flipY: r,preferImageBitmap: t});var a,i,s,o = this.fetchBlob();return R.defined(o) ? Zn.supportsImageBitmapOptions().then(function(e){
return a = e && t,o;
}).then(function(e){
if(R.defined(e)){
if(s = e,a)return Zn.createImageBitmapFromBlob(e,{flipY: r,premultiplyAlpha: !1});e = window.URL.createObjectURL(e);return Xn({resource: i = new Zn({url: e}),flipY: r,preferImageBitmap: !1});
}
}).then(function(e){
if(R.defined(e))return e.blob = s,a || window.URL.revokeObjectURL(i.url),e;
}).otherwise(function(e){
return R.defined(i) && window.URL.revokeObjectURL(i.url),e.blob = s,R.when.reject(e);
}) : void 0;
},Zn.fetchImage = function(e){
return new Zn(e).fetchImage({flipY: e.flipY,preferBlob: e.preferBlob,preferImageBitmap: e.preferImageBitmap});
},Zn.prototype.fetchText = function(){
return this.fetch({responseType: "text"});
},Zn.fetchText = function(e){
return new Zn(e).fetchText();
},Zn.prototype.fetchJson = function(){
var e = this.fetch({responseType: "text",headers: {Accept: "application/json,*/*;q=0.01"}});if(R.defined(e))return e.then(function(e){
if(R.defined(e))return JSON.parse(e);
});
},Zn.fetchJson = function(e){
return new Zn(e).fetchJson();
},Zn.prototype.fetchXML = function(){
return this.fetch({responseType: "document",overrideMimeType: "text/xml"});
},Zn.fetchXML = function(e){
return new Zn(e).fetchXML();
},Zn.prototype.fetchJsonp = function(e){
var t;for(e = R.defaultValue(e,"callback"),kn(this.request);t = "loadJsonp" + Math.random().toString().substring(2,8),R.defined(window[t]););return function n(r,a,i){
var e = {};e[a] = i;r.setQueryParameters(e);var s = r.request;s.url = r.url;s.requestFunction = function(){
var t = R.when.defer();return window[i] = function(e){
t.resolve(e);try{
delete window[i];
}catch(e){
window[i] = void 0;
}
},Zn._Implementations.loadAndExecuteScript(r.url,i,t),t.promise;
};var e = qn.request(s);if(!R.defined(e))return;return e.otherwise(function(t){
return s.state !== yn.FAILED ? R.when.reject(t) : r.retryOnError(t).then(function(e){
return e ? (s.state = yn.UNISSUED,s.deferred = void 0,n(r,a,i)) : R.when.reject(t);
});
});
}(this,e,t);
},Zn.fetchJsonp = function(e){
return new Zn(e).fetchJsonp(e.callbackParameterName);
},Zn.prototype._makeRequest = function(o){
var u = this;kn(u.request);var l = u.request;l.url = u.url,l.requestFunction = function(){
var e = o.responseType,t = ln(o.headers,u.headers),n = o.overrideMimeType,r = o.method,a = o.data,i = R.when.defer(),s = Zn._Implementations.loadWithXhr(u.url,e,r,a,t,i,n);return R.defined(s) && R.defined(s.abort) && (l.cancelFunction = function(){
s.abort();
}),i.promise;
};var e = qn.request(l);if(R.defined(e))return e.then(function(e){
return l.cancelFunction = void 0,e;
}).otherwise(function(t){
return l.cancelFunction = void 0,l.state !== yn.FAILED ? R.when.reject(t) : u.retryOnError(t).then(function(e){
return e ? (l.state = yn.UNISSUED,l.deferred = void 0,u.fetch(o)) : R.when.reject(t);
});
});
};var Hn = /^data:(.*?)(;base64)?,(.*)$/;function Jn(e,t){
t = decodeURIComponent(t);return e ? atob(t) : t;
}function Gn(e,t){
for(var n = Jn(e,t),t = new ArrayBuffer(n.length),r = new Uint8Array(t),a = 0;a < n.length;a++)r[a] = n.charCodeAt(a);return t;
}function Qn(e,t){
switch(t){
case"text":return e.toString("utf8");case"json":return JSON.parse(e.toString("utf8"));default:return new Uint8Array(e).buffer;
}
}Zn.prototype.fetch = function(e){
return(e = jn(e,{})).method = "GET",this._makeRequest(e);
},Zn.fetch = function(e){
return new Zn(e).fetch({responseType: e.responseType,overrideMimeType: e.overrideMimeType});
},Zn.prototype.delete = function(e){
return(e = jn(e,{})).method = "DELETE",this._makeRequest(e);
},Zn.delete = function(e){
return new Zn(e).delete({responseType: e.responseType,overrideMimeType: e.overrideMimeType,data: e.data});
},Zn.prototype.head = function(e){
return(e = jn(e,{})).method = "HEAD",this._makeRequest(e);
},Zn.head = function(e){
return new Zn(e).head({responseType: e.responseType,overrideMimeType: e.overrideMimeType});
},Zn.prototype.options = function(e){
return(e = jn(e,{})).method = "OPTIONS",this._makeRequest(e);
},Zn.options = function(e){
return new Zn(e).options({responseType: e.responseType,overrideMimeType: e.overrideMimeType});
},Zn.prototype.post = function(e,t){
return o.Check.defined("data",e),(t = jn(t,{})).method = "POST",t.data = e,this._makeRequest(t);
},Zn.post = function(e){
return new Zn(e).post(e.data,{responseType: e.responseType,overrideMimeType: e.overrideMimeType});
},Zn.prototype.put = function(e,t){
return o.Check.defined("data",e),(t = jn(t,{})).method = "PUT",t.data = e,this._makeRequest(t);
},Zn.put = function(e){
return new Zn(e).put(e.data,{responseType: e.responseType,overrideMimeType: e.overrideMimeType});
},Zn.prototype.patch = function(e,t){
return o.Check.defined("data",e),(t = jn(t,{})).method = "PATCH",t.data = e,this._makeRequest(t);
},Zn.patch = function(e){
return new Zn(e).patch(e.data,{responseType: e.responseType,overrideMimeType: e.overrideMimeType});
},(Zn._Implementations = {}).createImage = function(i,s,o,u,l){
var c = i.url;Zn.supportsImageBitmapOptions().then(function(e){
if(!e || !l)return r = c,e = s,t = o,(n = new Image).onload = function(){
t.resolve(n);
},n.onerror = function(e){
t.reject(e);
},e && (Nn.contains(r) ? n.crossOrigin = "use-credentials" : n.crossOrigin = ""),void(n.src = r);var t,n,r = R.when.defer(),a = Zn._Implementations.loadWithXhr(c,"blob","GET",void 0,void 0,r,void 0,void 0,void 0);return R.defined(a) && R.defined(a.abort) && (i.cancelFunction = function(){
a.abort();
}),r.promise.then(function(e){
return R.defined(e) ? Zn.createImageBitmapFromBlob(e,{flipY: u,premultiplyAlpha: !1}) : void o.reject(new L.RuntimeError("Successfully retrieved " + c + " but it contained no content."));
}).then(o.resolve);
}).otherwise(o.reject);
},Zn.createImageBitmapFromBlob = function(e,t){
return o.Check.defined("options",t),o.Check.typeOf.bool("options.flipY",t.flipY),o.Check.typeOf.bool("options.premultiplyAlpha",t.premultiplyAlpha),createImageBitmap(e,{imageOrientation: t.flipY ? "flipY" : "none",premultiplyAlpha: t.premultiplyAlpha ? "premultiply" : "none"});
};var Kn = "undefined" == typeof XMLHttpRequest;function $n(e){
var t,n;e = R.defaultValue(e,R.defaultValue.EMPTY_OBJECT),this._dates = void 0,this._samples = void 0,this._dateColumn = -1,this._xPoleWanderRadiansColumn = -1,this._yPoleWanderRadiansColumn = -1,this._ut1MinusUtcSecondsColumn = -1,this._xCelestialPoleOffsetRadiansColumn = -1,this._yCelestialPoleOffsetRadiansColumn = -1,this._taiMinusUtcSecondsColumn = -1,this._columnCount = 0,this._lastIndex = -1,this._downloadPromise = void 0,this._dataError = void 0,this._addNewLeapSeconds = R.defaultValue(e.addNewLeapSeconds,!0),R.defined(e.data) ? tr(this,e.data) : R.defined(e.url) ? (t = Zn.createIfNeeded(e.url),(n = this)._downloadPromise = t.fetchJson().then(function(e){
tr(n,e);
}).otherwise(function(){
n._dataError = "An error occurred while retrieving the EOP data from the URL " + t.url + ".";
})) : tr(this,{columnNames: ["dateIso8601","modifiedJulianDateUtc","xPoleWanderRadians","yPoleWanderRadians","ut1MinusUtcSeconds","lengthOfDayCorrectionSeconds","xCelestialPoleOffsetRadians","yCelestialPoleOffsetRadians","taiMinusUtcSeconds"],samples: []});
}function er(e,t){
return Kt.compare(e.julianDate,t);
}function tr(e,t){
if(R.defined(t.columnNames))if(R.defined(t.samples)){
var n = t.columnNames.indexOf("modifiedJulianDateUtc"),r = t.columnNames.indexOf("xPoleWanderRadians"),a = t.columnNames.indexOf("yPoleWanderRadians"),i = t.columnNames.indexOf("ut1MinusUtcSeconds"),s = t.columnNames.indexOf("xCelestialPoleOffsetRadians"),o = t.columnNames.indexOf("yCelestialPoleOffsetRadians"),u = t.columnNames.indexOf("taiMinusUtcSeconds");if(n < 0 || r < 0 || a < 0 || i < 0 || s < 0 || o < 0 || u < 0)e._dataError = "Error in loaded EOP data: The columnNames property must include modifiedJulianDateUtc, xPoleWanderRadians, yPoleWanderRadians, ut1MinusUtcSeconds, xCelestialPoleOffsetRadians, yCelestialPoleOffsetRadians, and taiMinusUtcSeconds columns";else{
var l,c = e._samples = t.samples,d = e._dates = [];e._dateColumn = n,e._xPoleWanderRadiansColumn = r,e._yPoleWanderRadiansColumn = a,e._ut1MinusUtcSecondsColumn = i,e._xCelestialPoleOffsetRadiansColumn = s,e._yCelestialPoleOffsetRadiansColumn = o,e._taiMinusUtcSecondsColumn = u,e._columnCount = t.columnNames.length,e._lastIndex = void 0;for(var f = e._addNewLeapSeconds,h = 0,p = c.length;h < p;h += e._columnCount){
var m,y = c[h + n],w = c[h + u],C = new Kt(y + Pt.MODIFIED_JULIAN_DATE_DIFFERENCE,w,Dt.TAI);d.push(C),f && (w === l || !R.defined(l) || (y = At(m = Kt.leapSeconds,C,er)) < 0 && (C = new It(C,w),m.splice(~y,0,C)),l = w);
}
}
}else e._dataError = "Error in loaded EOP data: The samples property is required.";else e._dataError = "Error in loaded EOP data: The columnNames property is required.";
}function nr(e,t,n,r,a){
r *= n;a.xPoleWander = t[r + e._xPoleWanderRadiansColumn],a.yPoleWander = t[r + e._yPoleWanderRadiansColumn],a.xPoleOffset = t[r + e._xCelestialPoleOffsetRadiansColumn],a.yPoleOffset = t[r + e._yCelestialPoleOffsetRadiansColumn],a.ut1MinusUtc = t[r + e._ut1MinusUtcSecondsColumn];
}function rr(e,t,n){
return t + e * (n - t);
}function ar(e,t,n,r,a,i,s){
var o = e._columnCount;if(i > t.length - 1)return s.xPoleWander = 0,s.yPoleWander = 0,s.xPoleOffset = 0,s.yPoleOffset = 0,s.ut1MinusUtc = 0,s;var u = t[a],l = t[i];if(u.equals(l) || r.equals(u))return nr(e,n,a,o,s),s;if(r.equals(l))return nr(e,n,i,o,s),s;var c = Kt.secondsDifference(r,u) / Kt.secondsDifference(l,u),d = a * o,t = i * o,u = n[d + e._ut1MinusUtcSecondsColumn],a = n[t + e._ut1MinusUtcSecondsColumn],i = a - u;return!(.5 < i || i < -.5) || (o = n[d + e._taiMinusUtcSecondsColumn]) !== (i = n[t + e._taiMinusUtcSecondsColumn]) && (l.equals(r) ? u = a : a -= i - o),s.xPoleWander = rr(c,n[d + e._xPoleWanderRadiansColumn],n[t + e._xPoleWanderRadiansColumn]),s.yPoleWander = rr(c,n[d + e._yPoleWanderRadiansColumn],n[t + e._yPoleWanderRadiansColumn]),s.xPoleOffset = rr(c,n[d + e._xCelestialPoleOffsetRadiansColumn],n[t + e._xCelestialPoleOffsetRadiansColumn]),s.yPoleOffset = rr(c,n[d + e._yCelestialPoleOffsetRadiansColumn],n[t + e._yCelestialPoleOffsetRadiansColumn]),s.ut1MinusUtc = rr(c,u,a),s;
}function ir(e,t,n){
this.heading = R.defaultValue(e,0),this.pitch = R.defaultValue(t,0),this.roll = R.defaultValue(n,0);
}Zn._Implementations.loadWithXhr = function(e,a,i,t,n,s,r){
var o = Hn.exec(e);if(null === o){
if(Kn)return u = e,l = a,c = i,d = n,f = s,h = require("url").parse(u),u = "https:" === h.protocol ? require("https") : require("http"),p = require("zlib"),d = {protocol: h.protocol,hostname: h.hostname,port: h.port,path: h.path,query: h.query,method: c,headers: d},void u.request(d).on("response",function(t){
var n;t.statusCode < 200 || 300 <= t.statusCode ? f.reject(new vn(t.statusCode,t,t.headers)) : (n = [],t.on("data",function(e){
n.push(e);
}),t.on("end",function(){
var e = Buffer.concat(n);"gzip" === t.headers["content-encoding"] ? p.gunzip(e,function(e,t){
e ? f.reject(new L.RuntimeError("Error decompressing response.")) : f.resolve(Qn(t,l));
}) : f.resolve(Qn(e,l));
}));
}).on("error",function(e){
f.reject(new vn);
}).end();var u,l,c,d,f,h,p,m = new XMLHttpRequest;if(Nn.contains(e) && (m.withCredentials = !0),m.open(i,e,!0),R.defined(r) && R.defined(m.overrideMimeType) && m.overrideMimeType(r),R.defined(n))for(var y in n)n.hasOwnProperty(y) && m.setRequestHeader(y,n[y]);R.defined(a) && (m.responseType = a);var w = !1;return"string" == typeof e && (w = 0 === e.indexOf("file://") || "undefined" != typeof window && "file://" === window.location.origin),m.onload = function(){
if(!(m.status < 200 || 300 <= m.status) || w && 0 === m.status){
var e = m.response,t = m.responseType;if("HEAD" === i || "OPTIONS" === i){
var n = m.getAllResponseHeaders().trim().split(/[\r\n]+/),r = {};return n.forEach(function(e){
var t = e.split(": "),e = t.shift();r[e] = t.join(": ");
}),void s.resolve(r);
}if(204 === m.status)s.resolve();else if(!R.defined(e) || R.defined(a) && t !== a)if("json" === a && "string" == typeof e)try{
s.resolve(JSON.parse(e));
}catch(e){
s.reject(e);
}else("" === t || "document" === t) && R.defined(m.responseXML) && m.responseXML.hasChildNodes() ? s.resolve(m.responseXML) : "" !== t && "text" !== t || !R.defined(m.responseText) ? s.reject(new L.RuntimeError("Invalid XMLHttpRequest response type.")) : s.resolve(m.responseText);else s.resolve(e);
}else s.reject(new vn(m.status,m.response,m.getAllResponseHeaders()));
},m.onerror = function(e){
s.reject(new vn);
},m.send(t),m;
}s.resolve(function(e,t){
t = R.defaultValue(t,"");var n = e[1],r = !!e[2],a = e[3];switch(t){
case"":case"text":return Jn(r,a);case"arraybuffer":return Gn(r,a);case"blob":var i = Gn(r,a);return new Blob([i],{type: n});case"document":return(new DOMParser).parseFromString(Jn(r,a),n);case"json":return JSON.parse(Jn(r,a));
}
}(o,a));
},Zn._Implementations.loadAndExecuteScript = function(e,t,n){
return function(e){
var t = R.when.defer(),n = document.createElement("script");n.async = !0,n.src = e;var r = document.getElementsByTagName("head")[0];return n.onload = function(){
n.onload = void 0,r.removeChild(n),t.resolve();
},n.onerror = function(e){
t.reject(e);
},r.appendChild(n),t.promise;
}(e).otherwise(n.reject);
},(Zn._DefaultImplementations = {}).createImage = Zn._Implementations.createImage,Zn._DefaultImplementations.loadWithXhr = Zn._Implementations.loadWithXhr,Zn._DefaultImplementations.loadAndExecuteScript = Zn._Implementations.loadAndExecuteScript,Zn.DEFAULT = Object.freeze(new Zn({url: "undefined" == typeof document ? "" : document.location.href.split("?")[0]})),$n.NONE = Object.freeze({getPromiseToLoad: function(){
return R.when.resolve();
},compute: function(e,t){
return R.defined(t) ? (t.xPoleWander = 0,t.yPoleWander = 0,t.xPoleOffset = 0,t.yPoleOffset = 0,t.ut1MinusUtc = 0) : t = new Rt(0,0,0,0,0),t;
}}),$n.prototype.getPromiseToLoad = function(){
return R.when(this._downloadPromise);
},$n.prototype.compute = function(e,t){
if(R.defined(this._samples)){
if(R.defined(t) || (t = new Rt(0,0,0,0,0)),0 === this._samples.length)return t.xPoleWander = 0,t.yPoleWander = 0,t.xPoleOffset = 0,t.yPoleOffset = 0,t.ut1MinusUtc = 0,t;var n = this._dates,r = this._lastIndex,a = 0,i = 0;if(R.defined(r)){
var s = n[r],o = n[r + 1],u = Kt.lessThanOrEquals(s,e),l = !R.defined(o),s = l || Kt.greaterThanOrEquals(o,e);if(u && s)return a = r,!l && o.equals(e) && ++a,i = a + 1,ar(this,n,this._samples,e,a,i,t),t;
}o = At(n,e,Kt.compare,this._dateColumn);return 0 <= o ? (o < n.length - 1 && n[o + 1].equals(e) && ++o,i = a = o) : (a = (i = ~o) - 1) < 0 && (a = 0),this._lastIndex = a,ar(this,n,this._samples,e,a,i,t),t;
}if(R.defined(this._dataError))throw new L.RuntimeError(this._dataError);
},ir.fromQuaternion = function(e,t){
R.defined(t) || (t = new ir);var n = 2 * (e.w * e.y - e.z * e.x),r = 1 - 2 * (e.x * e.x + e.y * e.y),a = 2 * (e.w * e.x + e.y * e.z),i = 1 - 2 * (e.y * e.y + e.z * e.z),e = 2 * (e.w * e.z + e.x * e.y);return t.heading = -Math.atan2(e,i),t.roll = Math.atan2(a,r),t.pitch = -F.CesiumMath.asinClamped(n),t;
},ir.fromDegrees = function(e,t,n,r){
return(r = !R.defined(r) ? new ir : r).heading = e * F.CesiumMath.RADIANS_PER_DEGREE,r.pitch = t * F.CesiumMath.RADIANS_PER_DEGREE,r.roll = n * F.CesiumMath.RADIANS_PER_DEGREE,r;
},ir.clone = function(e,t){
if(R.defined(e))return R.defined(t) ? (t.heading = e.heading,t.pitch = e.pitch,t.roll = e.roll,t) : new ir(e.heading,e.pitch,e.roll);
},ir.equals = function(e,t){
return e === t || R.defined(e) && R.defined(t) && e.heading === t.heading && e.pitch === t.pitch && e.roll === t.roll;
},ir.equalsEpsilon = function(e,t,n,r){
return e === t || R.defined(e) && R.defined(t) && F.CesiumMath.equalsEpsilon(e.heading,t.heading,n,r) && F.CesiumMath.equalsEpsilon(e.pitch,t.pitch,n,r) && F.CesiumMath.equalsEpsilon(e.roll,t.roll,n,r);
},ir.prototype.clone = function(e){
return ir.clone(this,e);
},ir.prototype.equals = function(e){
return ir.equals(this,e);
},ir.prototype.equalsEpsilon = function(e,t,n){
return ir.equalsEpsilon(this,e,t,n);
},ir.prototype.toString = function(){
return"(" + this.heading + ", " + this.pitch + ", " + this.roll + ")";
};var sr,or,ur,lr = /((?:.*\/)|^)Cesium\.js(?:\?|\#|$)/;function cr(e){
return"undefined" == typeof document ? e : ((sr = !R.defined(sr) ? document.createElement("a") : sr).href = e,sr.href = sr.href,sr.href);
}function dr(){
if(R.defined(or))return or;var e = "undefined" != typeof CESIUM_BASE_URL ? CESIUM_BASE_URL : "object" == typeof define && R.defined(define.amd) && !define.amd.toUrlUndefined && R.defined(require.toUrl) ? cn("..",pr("Core/buildModuleUrl.js")) : function(){
for(var e = document.getElementsByTagName("script"),t = 0,n = e.length;t < n;++t){
var r = e[t].getAttribute("src"),r = lr.exec(r);if(null !== r)return r[1];
}
}();return(or = new Zn({url: cr(e)})).appendForwardSlash(),or;
}function fr(e){
return cr(require.toUrl("../" + e));
}function hr(e){
return dr().getDerivedResource({url: e}).url;
}function pr(e){
return(ur = !R.defined(ur) ? "object" == typeof define && R.defined(define.amd) && !define.amd.toUrlUndefined && R.defined(require.toUrl) ? fr : hr : ur)(e);
}function mr(e,t,n){
this.x = e,this.y = t,this.s = n;
}function yr(e){
e = R.defaultValue(e,R.defaultValue.EMPTY_OBJECT),this._xysFileUrlTemplate = Zn.createIfNeeded(e.xysFileUrlTemplate),this._interpolationOrder = R.defaultValue(e.interpolationOrder,9),this._sampleZeroJulianEphemerisDate = R.defaultValue(e.sampleZeroJulianEphemerisDate,2442396.5),this._sampleZeroDateTT = new Kt(this._sampleZeroJulianEphemerisDate,0,Dt.TAI),this._stepSizeDays = R.defaultValue(e.stepSizeDays,1),this._samplesPerXysFile = R.defaultValue(e.samplesPerXysFile,1e3),this._totalSamples = R.defaultValue(e.totalSamples,27426),this._samples = new Array(3 * this._totalSamples),this._chunkDownloadsInProgress = [];for(var t = this._interpolationOrder,n = this._denominators = new Array(t + 1),r = this._xTable = new Array(t + 1),a = Math.pow(this._stepSizeDays,t),i = 0;i <= t;++i){
n[i] = a,r[i] = i * this._stepSizeDays;for(var s = 0;s <= t;++s)s !== i && (n[i] *= i - s);n[i] = 1 / n[i];
}this._work = new Array(t + 1),this._coef = new Array(t + 1);
}pr._cesiumScriptRegex = lr,pr._buildModuleUrlFromBaseUrl = hr,pr._clearBaseResource = function(){
or = void 0;
},pr.setBaseUrl = function(e){
or = Zn.DEFAULT.getDerivedResource({url: e});
},pr.getCesiumBaseUrl = dr;var wr = new Kt(0,0,Dt.TAI);function Cr(e,t,n){
var r = wr;return r.dayNumber = t,r.secondsOfDay = n,Kt.daysDifference(r,e._sampleZeroDateTT);
}function vr(s,o){
if(s._chunkDownloadsInProgress[o])return s._chunkDownloadsInProgress[o];var u = R.when.defer();s._chunkDownloadsInProgress[o] = u;var e = s._xysFileUrlTemplate,e = R.defined(e) ? e.getDerivedResource({templateValues: {0: o}}) : new Zn({url: pr("Assets/IAU2006_XYS/IAU2006_XYS_" + o + ".json")});return R.when(e.fetchJson(),function(e){
s._chunkDownloadsInProgress[o] = !1;for(var t = s._samples,n = e.samples,r = o * s._samplesPerXysFile * 3,a = 0,i = n.length;a < i;++a)t[r + a] = n[a];u.resolve();
}),u.promise;
}yr.prototype.preload = function(e,t,n,r){
t = Cr(this,e,t),r = Cr(this,n,r),t = t / this._stepSizeDays - this._interpolationOrder / 2 | 0;t < 0 && (t = 0);r = r / this._stepSizeDays - this._interpolationOrder / 2 | 0 + this._interpolationOrder;r >= this._totalSamples && (r = this._totalSamples - 1);for(var t = t / this._samplesPerXysFile | 0,a = r / this._samplesPerXysFile | 0,i = [],s = t;s <= a;++s)i.push(vr(this,s));return R.when.all(i);
},yr.prototype.computeXysRadians = function(e,t,n){
var r = Cr(this,e,t);if(!(r < 0)){
e = r / this._stepSizeDays | 0;if(!(e >= this._totalSamples)){
var a = this._interpolationOrder,i = e - (a / 2 | 0),t = (i = i < 0 ? 0 : i) + a;t >= this._totalSamples && (i = (t = this._totalSamples - 1) - a) < 0 && (i = 0);var e = !1,s = this._samples;if(R.defined(s[3 * i]) || (vr(this,i / this._samplesPerXysFile | 0),e = !0),R.defined(s[3 * t]) || (vr(this,t / this._samplesPerXysFile | 0),e = !0),!e){
R.defined(n) ? (n.x = 0,n.y = 0,n.s = 0) : n = new mr(0,0,0);for(var o,u = r - i * this._stepSizeDays,l = this._work,c = this._denominators,d = this._coef,f = this._xTable,h = 0;h <= a;++h)l[h] = u - f[h];for(h = 0;h <= a;++h){
for(d[h] = 1,o = 0;o <= a;++o)o !== h && (d[h] *= l[o]);d[h] *= c[h];var p = 3 * (i + h);n.x += d[h] * s[p++],n.y += d[h] * s[p++],n.s += d[h] * s[p];
}return n;
}
}
}
};var gr = {},xr = {up: {south: "east",north: "west",west: "south",east: "north"},down: {south: "west",north: "east",west: "north",east: "south"},south: {up: "west",down: "east",west: "down",east: "up"},north: {up: "east",down: "west",west: "up",east: "down"},west: {up: "north",down: "south",north: "down",south: "up"},east: {up: "south",down: "north",north: "up",south: "down"}},Er = {north: [-1,0,0],east: [0,1,0],up: [0,0,1],south: [1,0,0],west: [0,-1,0],down: [0,0,-1]},Or = {},_r = {east: new A.Cartesian3,north: new A.Cartesian3,up: new A.Cartesian3,west: new A.Cartesian3,south: new A.Cartesian3,down: new A.Cartesian3},Sr = new A.Cartesian3,br = new A.Cartesian3,Mr = new A.Cartesian3;gr.localFrameToFixedFrameGenerator = function(a,i){
if(!xr.hasOwnProperty(a) || !xr[a].hasOwnProperty(i))throw new o.DeveloperError("firstAxis and secondAxis must be east, north, up, west, south or down.");var e,s = xr[a][i],t = a + i;return R.defined(Or[t]) ? e = Or[t] : (e = function(e,t,n){
var r;return R.defined(n) || (n = new j),A.Cartesian3.equalsEpsilon(e,A.Cartesian3.ZERO,F.CesiumMath.EPSILON14) ? (A.Cartesian3.unpack(Er[a],0,Sr),A.Cartesian3.unpack(Er[i],0,br),A.Cartesian3.unpack(Er[s],0,Mr)) : F.CesiumMath.equalsEpsilon(e.x,0,F.CesiumMath.EPSILON14) && F.CesiumMath.equalsEpsilon(e.y,0,F.CesiumMath.EPSILON14) ? (r = F.CesiumMath.sign(e.z),A.Cartesian3.unpack(Er[a],0,Sr),"east" !== a && "west" !== a && A.Cartesian3.multiplyByScalar(Sr,r,Sr),A.Cartesian3.unpack(Er[i],0,br),"east" !== i && "west" !== i && A.Cartesian3.multiplyByScalar(br,r,br),A.Cartesian3.unpack(Er[s],0,Mr),"east" !== s && "west" !== s && A.Cartesian3.multiplyByScalar(Mr,r,Mr)) : ((t = R.defaultValue(t,A.Ellipsoid.WGS84)).geodeticSurfaceNormal(e,_r.up),r = _r.up,(t = _r.east).x = -e.y,t.y = e.x,t.z = 0,A.Cartesian3.normalize(t,_r.east),A.Cartesian3.cross(r,t,_r.north),A.Cartesian3.multiplyByScalar(_r.up,-1,_r.down),A.Cartesian3.multiplyByScalar(_r.east,-1,_r.west),A.Cartesian3.multiplyByScalar(_r.north,-1,_r.south),Sr = _r[a],br = _r[i],Mr = _r[s]),n[0] = Sr.x,n[1] = Sr.y,n[2] = Sr.z,n[3] = 0,n[4] = br.x,n[5] = br.y,n[6] = br.z,n[7] = 0,n[8] = Mr.x,n[9] = Mr.y,n[10] = Mr.z,n[11] = 0,n[12] = e.x,n[13] = e.y,n[14] = e.z,n[15] = 1,n;
},Or[t] = e),e;
},gr.eastNorthUpToFixedFrame = gr.localFrameToFixedFrameGenerator("east","north"),gr.northEastDownToFixedFrame = gr.localFrameToFixedFrameGenerator("north","east"),gr.northUpEastToFixedFrame = gr.localFrameToFixedFrameGenerator("north","up"),gr.northWestUpToFixedFrame = gr.localFrameToFixedFrameGenerator("north","west");var Ar = new $e,Rr = new A.Cartesian3(1,1,1),Tr = new j;gr.headingPitchRollToFixedFrame = function(e,t,n,r,a){
r = R.defaultValue(r,gr.eastNorthUpToFixedFrame);t = $e.fromHeadingPitchRoll(t,Ar),t = j.fromTranslationQuaternionRotationScale(A.Cartesian3.ZERO,t,Rr,Tr);return a = r(e,n,a),j.multiply(a,t,a);
};var qr = new j,zr = new B;gr.headingPitchRollQuaternion = function(e,t,n,r,a){
r = gr.headingPitchRollToFixedFrame(e,t,n,r,qr),r = j.getMatrix3(r,zr);return $e.fromRotationMatrix(r,a);
};var Ir = new A.Cartesian3(1,1,1),Pr = new A.Cartesian3,Dr = new j,Ur = new j,Nr = new B,Vr = new $e;gr.fixedFrameToHeadingPitchRoll = function(e,t,n,r){
t = R.defaultValue(t,A.Ellipsoid.WGS84),n = R.defaultValue(n,gr.eastNorthUpToFixedFrame),R.defined(r) || (r = new ir);var a = j.getTranslation(e,Pr);if(A.Cartesian3.equals(a,A.Cartesian3.ZERO))return r.heading = 0,r.pitch = 0,r.roll = 0,r;t = j.inverseTransformation(n(a,t,Dr),Dr),e = j.setScale(e,Ir,Ur),e = j.setTranslation(e,A.Cartesian3.ZERO,e),t = j.multiply(t,e,t),t = $e.fromRotationMatrix(j.getMatrix3(t,Nr),Vr),t = $e.normalize(t,t);return ir.fromQuaternion(t,r);
};var Fr = F.CesiumMath.TWO_PI / 86400,Lr = new Kt;gr.computeTemeToPseudoFixedMatrix = function(e,t){
var n = (Lr = Kt.addSeconds(e,-Kt.computeTaiMinusUtc(e),Lr)).dayNumber,r = Lr.secondsOfDay,e = n - 2451545,e = 43200 <= r ? (.5 + e) / Pt.DAYS_PER_JULIAN_CENTURY : (e - .5) / Pt.DAYS_PER_JULIAN_CENTURY,n = (24110.54841 + e * (8640184.812866 + e * (.093104 + -62e-7 * e))) * Fr % F.CesiumMath.TWO_PI + (72921158553e-15 + 11772758384668e-32 * (n - 2451545.5)) * ((r + .5 * Pt.SECONDS_PER_DAY) % Pt.SECONDS_PER_DAY),r = Math.cos(n),n = Math.sin(n);return R.defined(t) ? (t[0] = r,t[1] = -n,t[2] = 0,t[3] = n,t[4] = r,t[5] = 0,t[6] = 0,t[7] = 0,t[8] = 1,t) : new B(r,n,0,-n,r,0,0,0,1);
},gr.iau2006XysData = new yr,gr.earthOrientationParameters = $n.NONE;var Br = 32.184;gr.preloadIcrfFixed = function(e){
var t = e.start.dayNumber,n = e.start.secondsOfDay + Br,r = e.stop.dayNumber,e = e.stop.secondsOfDay + Br,r = gr.iau2006XysData.preload(t,n,r,e),e = gr.earthOrientationParameters.getPromiseToLoad();return R.when.all([r,e]);
},gr.computeIcrfToFixedMatrix = function(e,t){
R.defined(t) || (t = new B);e = gr.computeFixedToIcrfMatrix(e,t);if(R.defined(e))return B.transpose(e,t);
};var Wr = new mr(0,0,0),jr = new Rt(0,0,0,0,0),kr = new B,Yr = new B;gr.computeFixedToIcrfMatrix = function(e,t){
R.defined(t) || (t = new B);var n = gr.earthOrientationParameters.compute(e,jr);if(R.defined(n)){
var r = e.dayNumber,a = e.secondsOfDay + Br,i = gr.iau2006XysData.computeXysRadians(r,a,Wr);if(R.defined(i)){
var s = i.x + n.xPoleOffset,o = i.y + n.yPoleOffset,u = 1 / (1 + Math.sqrt(1 - s * s - o * o)),l = kr;l[0] = 1 - u * s * s,l[3] = -u * s * o,l[6] = s,l[1] = -u * s * o,l[4] = 1 - u * o * o,l[7] = o,l[2] = -s,l[5] = -o,l[8] = 1 - u * (s * s + o * o);s = B.fromRotationZ(-i.s,Yr),o = B.multiply(l,s,kr),i = e.dayNumber - 2451545,l = (e.secondsOfDay - Kt.computeTaiMinusUtc(e) + n.ut1MinusUtc) / Pt.SECONDS_PER_DAY,s = (s = .779057273264 + l + .00273781191135448 * (i + l)) % 1 * F.CesiumMath.TWO_PI,e = B.fromRotationZ(s,Yr),i = B.multiply(o,e,kr),l = Math.cos(n.xPoleWander),s = Math.cos(n.yPoleWander),o = Math.sin(n.xPoleWander),e = Math.sin(n.yPoleWander),n = r - 2451545 + a / Pt.SECONDS_PER_DAY,r = -47e-6 * (n /= 36525) * F.CesiumMath.RADIANS_PER_DEGREE / 3600,a = Math.cos(r),n = Math.sin(r),r = Yr;return r[0] = l * a,r[1] = l * n,r[2] = o,r[3] = -s * n + e * o * a,r[4] = s * a + e * o * n,r[5] = -e * l,r[6] = -e * n - s * o * a,r[7] = e * a - s * o * n,r[8] = s * l,B.multiply(i,r,t);
}
}
};var Zr = new W;gr.pointToWindowCoordinates = function(e,t,n,r){
return(r = gr.pointToGLWindowCoordinates(e,t,n,r)).y = 2 * t[5] - r.y,r;
},gr.pointToGLWindowCoordinates = function(e,t,n,r){
R.defined(r) || (r = new A.Cartesian2);var a = Zr;return j.multiplyByVector(e,W.fromElements(n.x,n.y,n.z,1,a),a),W.multiplyByScalar(a,1 / a.w,a),j.multiplyByVector(t,a,a),A.Cartesian2.fromCartesian4(a,r);
};var Xr = new A.Cartesian3,Hr = new A.Cartesian3,Jr = new A.Cartesian3;gr.rotationMatrixFromPositionVelocity = function(e,t,n,r){
n = R.defaultValue(n,A.Ellipsoid.WGS84).geodeticSurfaceNormal(e,Xr),e = A.Cartesian3.cross(t,n,Hr);A.Cartesian3.equalsEpsilon(e,A.Cartesian3.ZERO,F.CesiumMath.EPSILON6) && (e = A.Cartesian3.clone(A.Cartesian3.UNIT_X,e));n = A.Cartesian3.cross(e,t,Jr);return A.Cartesian3.normalize(n,n),A.Cartesian3.cross(t,n,e),A.Cartesian3.negate(e,e),A.Cartesian3.normalize(e,e),(r = !R.defined(r) ? new B : r)[0] = t.x,r[1] = t.y,r[2] = t.z,r[3] = e.x,r[4] = e.y,r[5] = e.z,r[6] = n.x,r[7] = n.y,r[8] = n.z,r;
};var Gr = new j(0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,1),Qr = new A.Cartographic,Kr = new A.Cartesian3,$r = new A.Cartesian3,ea = new B,ta = new j,na = new j;gr.basisTo2D = function(e,t,n){
var r = j.getTranslation(t,$r),a = e.ellipsoid,i = a.cartesianToCartographic(r,Qr),i = e.project(i,Kr);A.Cartesian3.fromElements(i.z,i.x,i.y,i);a = gr.eastNorthUpToFixedFrame(r,a,ta),a = j.inverseTransformation(a,na),t = j.getMatrix3(t,ea),t = j.multiplyByMatrix3(a,t,n);return j.multiply(Gr,t,n),j.setTranslation(n,i,n),n;
},gr.wgs84To2DModelMatrix = function(e,t,n){
var r = e.ellipsoid,a = gr.eastNorthUpToFixedFrame(t,r,ta),a = j.inverseTransformation(a,na),t = r.cartesianToCartographic(t,Qr),t = e.project(t,Kr);A.Cartesian3.fromElements(t.z,t.x,t.y,t);t = j.fromTranslation(t,ta);return j.multiply(Gr,a,n),j.multiply(t,n,n),n;
},e.BoundingSphere = T,e.Cartesian4 = W,e.FeatureDetection = Ke,e.GeographicProjection = t,e.Intersect = a,e.Interval = i,e.Matrix3 = B,e.Matrix4 = j,e.Quaternion = $e,e.Resource = Zn,e.Transforms = gr,e.buildModuleUrl = pr;
});

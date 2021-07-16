define(["exports","./Cartesian2-8417ca3d","./Transforms-a73b3b3b","./EllipsoidTangentPlane-9123a53b","./Math-4e53b694","./PolylinePipeline-232a4d9a"],function(a,O,f,m,N,V){
"use strict";var G = Object.freeze({ROUNDED: 0,MITERED: 1,BEVELED: 2}),R = [new O.Cartesian3,new O.Cartesian3],I = new O.Cartesian3,L = new O.Cartesian3,j = new O.Cartesian3,Q = new O.Cartesian3,F = new O.Cartesian3,U = new O.Cartesian3,_ = new O.Cartesian3,q = new O.Cartesian3,Y = new O.Cartesian3,Z = new O.Cartesian3,g = new O.Cartesian3,k = {},H = new O.Cartographic;function J(a,e,r,n){
var t = a[0],a = a[1],a = O.Cartesian3.angleBetween(t,a),i = Math.ceil(a / n),s = new Array(i);if(e === r){
for(l = 0;l < i;l++)s[l] = e;return s.push(r),s;
}for(var o = (r - e) / i,l = 1;l < i;l++){
var C = e + l * o;s[l] = C;
}return s[0] = e,s.push(r),s;
}var d = new O.Cartesian3,p = new O.Cartesian3;var w = new O.Cartesian3(-1,0,0),h = new f.Matrix4,v = new f.Matrix4,x = new f.Matrix3,P = f.Matrix3.IDENTITY.clone(),E = new O.Cartesian3,M = new f.Cartesian4,T = new O.Cartesian3;function K(a,e,r,n,t,i,s,o){
var l = E,C = M;h = f.Transforms.eastNorthUpToFixedFrame(a,t,h),l = f.Matrix4.multiplyByPointAsVector(h,w,l);var l = O.Cartesian3.normalize(l,l),e = (l = l,e = e,a = a,t = t,t = new m.EllipsoidTangentPlane(a,t),l = t.projectPointOntoPlane(O.Cartesian3.add(a,l,d),d),a = t.projectPointOntoPlane(O.Cartesian3.add(a,e,p),p),e = O.Cartesian2.angleBetween(l,a),0 <= a.x * l.y - a.y * l.x ? -e : e);x = f.Matrix3.fromRotationZ(e,x),T.z = i,h = f.Matrix4.multiplyTransformation(h,f.Matrix4.fromRotationTranslation(x,T,v),h);var c = P;c[0] = s;for(var u = 0;u < o;u++)for(var y = 0;y < r.length;y += 3)C = O.Cartesian3.fromArray(r,y,C),C = f.Matrix3.multiplyByVector(c,C,C),C = f.Matrix4.multiplyByPoint(h,C,C),n.push(C.x,C.y,C.z);return n;
}var l = new O.Cartesian3;function W(a,e,r,n,t,i,s){
for(var o = 0;o < a.length;o += 3)n = K(O.Cartesian3.fromArray(a,o,l),e,r,n,t,i[o / 3],s,1);return n;
}function X(a,e){
for(var r = a.length,n = new Array(3 * r),t = 0,i = e.x + e.width / 2,s = e.y + e.height / 2,o = 0;o < r;o++)n[t++] = a[o].x - i,n[t++] = 0,n[t++] = a[o].y - s;return n;
}var B = new f.Quaternion,b = new O.Cartesian3,z = new f.Matrix3;function $(a,e,r,n,t,i,s,o,l,C){
var c,u = O.Cartesian3.angleBetween(O.Cartesian3.subtract(e,a,Z),O.Cartesian3.subtract(r,a,g)),y = n === G.BEVELED ? 0 : Math.ceil(u / N.CesiumMath.toRadians(5)),m = t ? f.Matrix3.fromQuaternion(f.Quaternion.fromAxisAngle(O.Cartesian3.negate(a,Z),u / (y + 1),B),z) : f.Matrix3.fromQuaternion(f.Quaternion.fromAxisAngle(a,u / (y + 1),B),z);if(e = O.Cartesian3.clone(e,b),0 < y)for(var d = C ? 2 : 1,p = 0;p < y;p++)e = f.Matrix3.multiplyByVector(m,e,e),c = O.Cartesian3.subtract(e,a,Z),c = O.Cartesian3.normalize(c,c),t || (c = O.Cartesian3.negate(c,c)),s = K(i.scaleToGeodeticSurface(e,g),c,o,s,i,l,1,d);else c = O.Cartesian3.subtract(e,a,Z),c = O.Cartesian3.normalize(c,c),t || (c = O.Cartesian3.negate(c,c)),s = K(i.scaleToGeodeticSurface(e,g),c,o,s,i,l,1,1),r = O.Cartesian3.clone(r,b),c = O.Cartesian3.subtract(r,a,Z),c = O.Cartesian3.normalize(c,c),t || (c = O.Cartesian3.negate(c,c)),s = K(i.scaleToGeodeticSurface(r,g),c,o,s,i,l,1,1);return s;
}k.removeDuplicatesFromShape = function(a){
for(var e = a.length,r = [],n = e - 1,t = 0;t < e;n = t++){
var i = a[n],s = a[t];O.Cartesian2.equals(i,s) || r.push(s);
}return r;
},k.angleIsGreaterThanPi = function(a,e,r,n){
n = new m.EllipsoidTangentPlane(r,n),a = n.projectPointOntoPlane(O.Cartesian3.add(r,a,d),d),e = n.projectPointOntoPlane(O.Cartesian3.add(r,e,p),p);return 0 <= e.x * a.y - e.y * a.x;
};var aa = new O.Cartesian3,ea = new O.Cartesian3;k.computePositions = function(a,e,r,n,t){
var i = n._ellipsoid,s = function(a,e){
for(var r = new Array(a.length),n = 0;n < a.length;n++){
var t = a[n];H = e.cartesianToCartographic(t,H),r[n] = H.height,a[n] = e.scaleToGeodeticSurface(t,t);
}return r;
}(a,i),o = n._granularity,l = n._cornerType,C = (t ? function(a,e){
var r = a.length,n = new Array(6 * r),t = 0,i = e.x + e.width / 2,s = e.y + e.height / 2,o = a[0];n[t++] = o.x - i,n[t++] = 0,n[t++] = o.y - s;for(var l = 1;l < r;l++){
var C = (o = a[l]).x - i,c = o.y - s;n[t++] = C,n[t++] = 0,n[t++] = c,n[t++] = C,n[t++] = 0,n[t++] = c;
}return o = a[0],n[t++] = o.x - i,n[t++] = 0,n[t++] = o.y - s,n;
} : X)(e,r),e = t ? X(e,r) : void 0,c = r.height / 2,u = r.width / 2,y = a.length,m = [],r = t ? [] : void 0,d = I,p = L,f = j,g = Q,w = F,h = U,v = _,x = q,P = Y,E = a[0],M = a[1];g = i.geodeticSurfaceNormal(E,g),d = O.Cartesian3.subtract(M,E,d),d = O.Cartesian3.normalize(d,d),x = O.Cartesian3.cross(g,d,x);var T,x = O.Cartesian3.normalize(x,x),B = s[0],b = s[1];t && (r = K(E,x,e,r,i,B + c,1,1)),P = O.Cartesian3.clone(E,P),E = M,p = O.Cartesian3.negate(d,p);for(var z = 1;z < y - 1;z++){
var S = t ? 2 : 1,M = a[z + 1],d = O.Cartesian3.subtract(M,E,d);d = O.Cartesian3.normalize(d,d),f = O.Cartesian3.add(d,p,f),f = O.Cartesian3.normalize(f,f);var g = i.geodeticSurfaceNormal(E,g),A = O.Cartesian3.multiplyByScalar(g,O.Cartesian3.dot(d,g),aa);O.Cartesian3.subtract(d,A,A),O.Cartesian3.normalize(A,A);var D = O.Cartesian3.multiplyByScalar(g,O.Cartesian3.dot(p,g),ea);O.Cartesian3.subtract(p,D,D),O.Cartesian3.normalize(D,D),!N.CesiumMath.equalsEpsilon(Math.abs(O.Cartesian3.dot(A,D)),1,N.CesiumMath.EPSILON7) ? (f = O.Cartesian3.cross(f,g,f),f = O.Cartesian3.cross(g,f,f),f = O.Cartesian3.normalize(f,f),A = 1 / Math.max(.25,O.Cartesian3.magnitude(O.Cartesian3.cross(f,p,Z))),(D = k.angleIsGreaterThanPi(d,p,E,i)) ? (w = O.Cartesian3.add(E,O.Cartesian3.multiplyByScalar(f,A * u,f),w),h = O.Cartesian3.add(w,O.Cartesian3.multiplyByScalar(x,u,h),h),R[0] = O.Cartesian3.clone(P,R[0]),R[1] = O.Cartesian3.clone(h,R[1]),T = J(R,B + c,b + c,o),m = W(V.PolylinePipeline.generateArc({positions: R,granularity: o,ellipsoid: i}),x,C,m,i,T,1),x = O.Cartesian3.cross(g,d,x),x = O.Cartesian3.normalize(x,x),v = O.Cartesian3.add(w,O.Cartesian3.multiplyByScalar(x,u,v),v),l === G.ROUNDED || l === G.BEVELED ? $(w,h,v,l,D,i,m,C,b + c,t) : m = K(E,f = O.Cartesian3.negate(f,f),C,m,i,b + c,A,S)) : (w = O.Cartesian3.add(E,O.Cartesian3.multiplyByScalar(f,A * u,f),w),h = O.Cartesian3.add(w,O.Cartesian3.multiplyByScalar(x,-u,h),h),R[0] = O.Cartesian3.clone(P,R[0]),R[1] = O.Cartesian3.clone(h,R[1]),T = J(R,B + c,b + c,o),m = W(V.PolylinePipeline.generateArc({positions: R,granularity: o,ellipsoid: i}),x,C,m,i,T,1),x = O.Cartesian3.cross(g,d,x),x = O.Cartesian3.normalize(x,x),v = O.Cartesian3.add(w,O.Cartesian3.multiplyByScalar(x,-u,v),v),l === G.ROUNDED || l === G.BEVELED ? $(w,h,v,l,D,i,m,C,b + c,t) : m = K(E,f,C,m,i,b + c,A,S)),P = O.Cartesian3.clone(v,P),p = O.Cartesian3.negate(d,p)) : (m = K(P,x,C,m,i,B + c,1,1),P = E),B = b,b = s[z + 1],E = M;
}R[0] = O.Cartesian3.clone(P,R[0]),R[1] = O.Cartesian3.clone(E,R[1]),T = J(R,B + c,b + c,o),m = W(V.PolylinePipeline.generateArc({positions: R,granularity: o,ellipsoid: i}),x,C,m,i,T,1),t && (r = K(E,x,e,r,i,b + c,1,1));y = m.length,e = t ? y + r.length : y,e = new Float64Array(e);return e.set(m),t && e.set(r,y),e;
},a.CornerType = G,a.PolylineVolumeGeometryLibrary = k;
});

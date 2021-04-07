define(["./AttributeCompression-f02ec82f","./Cartesian2-8417ca3d","./IndexDatatype-d47ad6f6","./Math-4e53b694","./createTaskProcessorWorker","./Check-d18af7c4","./when-208fe5b0","./WebGLConstants-76bb35d1"],function(P,L,S,_,a,e,r,n){
"use strict";var G = 32767,W = new L.Cartographic,B = new L.Cartesian3;var z = new L.Rectangle,H = new L.Ellipsoid,O = new L.Cartesian3,Y = {min: void 0,max: void 0};var Z = new L.Cartesian3,j = new L.Cartesian3,q = new L.Cartesian3,J = new L.Cartesian3,K = new L.Cartesian3;return a(function(a,e){
var r = new Uint16Array(a.positions),n = new Uint16Array(a.widths),t = new Uint32Array(a.counts),i = new Uint16Array(a.batchIds);!function(a){
a = new Float64Array(a);var e = 0;Y.min = a[e++],Y.max = a[e++],L.Rectangle.unpack(a,2,z),e += L.Rectangle.packedLength,L.Ellipsoid.unpack(a,e,H),e += L.Ellipsoid.packedLength,L.Cartesian3.unpack(a,e,O);
}(a.packedBuffer);for(var s = O,u = function(a,e,r,n,t){
var i = a.length / 3,s = a.subarray(0,i),u = a.subarray(i,2 * i),c = a.subarray(2 * i,3 * i);P.AttributeCompression.zigZagDeltaDecode(s,u,c);for(var o = new Float64Array(a.length),f = 0;f < i;++f){
var p = s[f],C = u[f],d = c[f],p = _.CesiumMath.lerp(e.west,e.east,p / G),C = _.CesiumMath.lerp(e.south,e.north,C / G),d = _.CesiumMath.lerp(r,n,d / G),d = L.Cartographic.fromRadians(p,C,d,W),d = t.cartographicToCartesian(d,B);L.Cartesian3.pack(d,o,3 * f);
}return o;
}(r,z,Y.min,Y.max,H),r = 4 * (a = u.length / 3) - 4,c = new Float32Array(3 * r),o = new Float32Array(3 * r),f = new Float32Array(3 * r),p = new Float32Array(2 * r),C = new Uint16Array(r),d = 0,b = 0,w = 0,h = 0,l = t.length,y = 0;y < l;++y){
for(var k,v = t[y],A = n[y],g = i[y],m = 0;m < v;++m){
0 === m ? (E = L.Cartesian3.unpack(u,3 * h,Z),x = L.Cartesian3.unpack(u,3 * (h + 1),j),k = L.Cartesian3.subtract(E,x,q),L.Cartesian3.add(E,k,k)) : k = L.Cartesian3.unpack(u,3 * (h + m - 1),q);var x,E,D,I = L.Cartesian3.unpack(u,3 * (h + m),J);m === v - 1 ? (x = L.Cartesian3.unpack(u,3 * (h + v - 1),Z),E = L.Cartesian3.unpack(u,3 * (h + v - 2),j),D = L.Cartesian3.subtract(x,E,K),L.Cartesian3.add(x,D,D)) : D = L.Cartesian3.unpack(u,3 * (h + m + 1),K),L.Cartesian3.subtract(k,s,k),L.Cartesian3.subtract(I,s,I),L.Cartesian3.subtract(D,s,D);for(var T = m === v - 1 ? 2 : 4,U = 0 === m ? 2 : 0;U < T;++U){
L.Cartesian3.pack(I,c,d),L.Cartesian3.pack(k,o,d),L.Cartesian3.pack(D,f,d),d += 3;var F = U - 2 < 0 ? -1 : 1;p[b++] = U % 2 * 2 - 1,p[b++] = F * A,C[w++] = g;
}
}h += v;
}var N = S.IndexDatatype.createTypedArray(r,6 * a - 6),R = 0,M = 0,l = a - 1;for(y = 0;y < l;++y)N[M++] = R,N[M++] = R + 2,N[M++] = R + 1,N[M++] = R + 1,N[M++] = R + 2,N[M++] = R + 3,R += 4;return e.push(c.buffer,o.buffer,f.buffer),e.push(p.buffer,C.buffer,N.buffer),{indexDatatype: 2 === N.BYTES_PER_ELEMENT ? S.IndexDatatype.UNSIGNED_SHORT : S.IndexDatatype.UNSIGNED_INT,currentPositions: c.buffer,previousPositions: o.buffer,nextPositions: f.buffer,expandAndWidth: p.buffer,batchIds: C.buffer,indices: N.buffer};
});
});

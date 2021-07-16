define(["./AttributeCompression-f02ec82f","./Cartesian2-8417ca3d","./Math-4e53b694","./createTaskProcessorWorker","./Check-d18af7c4","./when-208fe5b0"],function(d,g,b,a,e,r){
"use strict";var w = 32767,k = new g.Cartographic,v = new g.Cartesian3,y = new g.Rectangle,A = new g.Ellipsoid,M = {min: void 0,max: void 0};return a(function(a,e){
var r = new Uint16Array(a.positions);!function(a){
a = new Float64Array(a);var e = 0;M.min = a[e++],M.max = a[e++],g.Rectangle.unpack(a,2,y),e += g.Rectangle.packedLength,g.Ellipsoid.unpack(a,e,A);
}(a.packedBuffer);var t = y,n = A,i = M.min,s = M.max,o = r.length / 3,c = r.subarray(0,o),u = r.subarray(o,2 * o),p = r.subarray(2 * o,3 * o);d.AttributeCompression.zigZagDeltaDecode(c,u,p);for(var f = new Float64Array(r.length),h = 0;h < o;++h){
var l = c[h],m = u[h],C = p[h],l = b.CesiumMath.lerp(t.west,t.east,l / w),m = b.CesiumMath.lerp(t.south,t.north,m / w),C = b.CesiumMath.lerp(i,s,C / w),C = g.Cartographic.fromRadians(l,m,C,k),C = n.cartographicToCartesian(C,v);g.Cartesian3.pack(C,f,3 * h);
}return e.push(f.buffer),{positions: f.buffer};
});
});

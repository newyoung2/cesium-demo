define(["./when-208fe5b0","./PrimitivePipeline-5ce755e1","./createTaskProcessorWorker","./Transforms-a73b3b3b","./Cartesian2-8417ca3d","./Check-d18af7c4","./Math-4e53b694","./RuntimeError-7f634f5d","./ComponentDatatype-9204e9f6","./WebGLConstants-76bb35d1","./GeometryAttribute-04a19cfe","./GeometryAttributes-b0b294d8","./GeometryPipeline-5e672526","./AttributeCompression-f02ec82f","./EncodedCartesian3-874933de","./IndexDatatype-d47ad6f6","./IntersectionTests-7d224a2f","./Plane-4aa8974d","./WebMercatorProjection-ffb6b9f8"],function(c,d,e,r,t,n,a,o,i,f,s,u,b,m,p,l,y,P,k){
"use strict";var C = {};return e(function(e,r){
for(var t = e.subTasks,n = t.length,a = new Array(n),o = 0;o < n;o++){
var i = t[o],f = i.geometry,s = i.moduleName;c.defined(s) ? (s = function(e){
var r = C[e];return c.defined(r) || ("object" == typeof exports ? C[r] = r = require("Workers/" + e) : require(["Workers/" + e],function(e){
C[r = e] = e;
})),r;
}(s),a[o] = s(f,i.offset)) : a[o] = f;
}return c.when.all(a,function(e){
return d.PrimitivePipeline.packCreateGeometryResults(e,r);
});
});
});
define(["./when-208fe5b0","./Transforms-a73b3b3b","./Cartesian2-8417ca3d","./Check-d18af7c4","./ComponentDatatype-9204e9f6","./GeometryAttribute-04a19cfe","./GeometryAttributes-b0b294d8","./Math-4e53b694","./RuntimeError-7f634f5d","./WebGLConstants-76bb35d1"],function(r,a,i,e,o,u,c,t,n,s){
"use strict";function y(){
this._workerName = "createPlaneOutlineGeometry";
}y.packedLength = 0,y.pack = function(e,t){
return t;
},y.unpack = function(e,t,n){
return r.defined(n) ? n : new y;
};var b = new i.Cartesian3(-.5,-.5,0),m = new i.Cartesian3(.5,.5,0);return y.createGeometry = function(){
var e = new c.GeometryAttributes,t = new Uint16Array(8),n = new Float64Array(12);return n[0] = b.x,n[1] = b.y,n[2] = b.z,n[3] = m.x,n[4] = b.y,n[5] = b.z,n[6] = m.x,n[7] = m.y,n[8] = b.z,n[9] = b.x,n[10] = m.y,n[11] = b.z,e.position = new u.GeometryAttribute({componentDatatype: o.ComponentDatatype.DOUBLE,componentsPerAttribute: 3,values: n}),t[0] = 0,t[1] = 1,t[2] = 1,t[3] = 2,t[4] = 2,t[5] = 3,t[6] = 3,t[7] = 0,new u.Geometry({attributes: e,indices: t,primitiveType: u.PrimitiveType.LINES,boundingSphere: new a.BoundingSphere(i.Cartesian3.ZERO,Math.sqrt(2))});
},function(e,t){
return r.defined(t) && (e = y.unpack(e,t)),y.createGeometry(e);
};
});

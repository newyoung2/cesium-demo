define(["./when-208fe5b0","./Cartesian2-8417ca3d","./Check-d18af7c4","./EllipsoidOutlineGeometry-dd7f7ad1","./Math-4e53b694","./GeometryOffsetAttribute-def3b741","./Transforms-a73b3b3b","./RuntimeError-7f634f5d","./ComponentDatatype-9204e9f6","./WebGLConstants-76bb35d1","./GeometryAttribute-04a19cfe","./GeometryAttributes-b0b294d8","./IndexDatatype-d47ad6f6"],function(r,n,e,s,i,t,o,a,d,l,u,c,m){
"use strict";function p(e){
var i = r.defaultValue(e.radius,1),e = {radii: new n.Cartesian3(i,i,i),stackPartitions: e.stackPartitions,slicePartitions: e.slicePartitions,subdivisions: e.subdivisions};this._ellipsoidGeometry = new s.EllipsoidOutlineGeometry(e),this._workerName = "createSphereOutlineGeometry";
}p.packedLength = s.EllipsoidOutlineGeometry.packedLength,p.pack = function(e,i,t){
return s.EllipsoidOutlineGeometry.pack(e._ellipsoidGeometry,i,t);
};var f = new s.EllipsoidOutlineGeometry,y = {radius: void 0,radii: new n.Cartesian3,stackPartitions: void 0,slicePartitions: void 0,subdivisions: void 0};return p.unpack = function(e,i,t){
i = s.EllipsoidOutlineGeometry.unpack(e,i,f);return y.stackPartitions = i._stackPartitions,y.slicePartitions = i._slicePartitions,y.subdivisions = i._subdivisions,r.defined(t) ? (n.Cartesian3.clone(i._radii,y.radii),t._ellipsoidGeometry = new s.EllipsoidOutlineGeometry(y),t) : (y.radius = i._radii.x,new p(y));
},p.createGeometry = function(e){
return s.EllipsoidOutlineGeometry.createGeometry(e._ellipsoidGeometry);
},function(e,i){
return r.defined(i) && (e = p.unpack(e,i)),p.createGeometry(e);
};
});

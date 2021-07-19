define(["./when-208fe5b0","./Cartesian2-8417ca3d","./Check-d18af7c4","./EllipsoidGeometry-cb484b79","./VertexFormat-e8cbf5b3","./Math-4e53b694","./GeometryOffsetAttribute-def3b741","./Transforms-a73b3b3b","./RuntimeError-7f634f5d","./ComponentDatatype-9204e9f6","./WebGLConstants-76bb35d1","./GeometryAttribute-04a19cfe","./GeometryAttributes-b0b294d8","./IndexDatatype-d47ad6f6"],function(i,a,e,o,n,t,r,s,d,c,l,m,u,p){
"use strict";function f(e){
var t = i.defaultValue(e.radius,1),e = {radii: new a.Cartesian3(t,t,t),stackPartitions: e.stackPartitions,slicePartitions: e.slicePartitions,vertexFormat: e.vertexFormat};this._ellipsoidGeometry = new o.EllipsoidGeometry(e),this._workerName = "createSphereGeometry";
}f.packedLength = o.EllipsoidGeometry.packedLength,f.pack = function(e,t,r){
return o.EllipsoidGeometry.pack(e._ellipsoidGeometry,t,r);
};var y = new o.EllipsoidGeometry,G = {radius: void 0,radii: new a.Cartesian3,vertexFormat: new n.VertexFormat,stackPartitions: void 0,slicePartitions: void 0};return f.unpack = function(e,t,r){
t = o.EllipsoidGeometry.unpack(e,t,y);return G.vertexFormat = n.VertexFormat.clone(t._vertexFormat,G.vertexFormat),G.stackPartitions = t._stackPartitions,G.slicePartitions = t._slicePartitions,i.defined(r) ? (a.Cartesian3.clone(t._radii,G.radii),r._ellipsoidGeometry = new o.EllipsoidGeometry(G),r) : (G.radius = t._radii.x,new f(G));
},f.createGeometry = function(e){
return o.EllipsoidGeometry.createGeometry(e._ellipsoidGeometry);
},function(e,t){
return i.defined(t) && (e = f.unpack(e,t)),f.createGeometry(e);
};
});
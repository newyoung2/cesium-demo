define(["./arrayRemoveDuplicates-0f62a181","./Transforms-a73b3b3b","./Cartesian2-8417ca3d","./Check-d18af7c4","./ComponentDatatype-9204e9f6","./CoplanarPolygonGeometryLibrary-6c63fe5e","./when-208fe5b0","./GeometryAttribute-04a19cfe","./GeometryAttributes-b0b294d8","./GeometryInstance-d919cab6","./GeometryPipeline-5e672526","./IndexDatatype-d47ad6f6","./PolygonGeometryLibrary-d175a7f1","./Math-4e53b694","./RuntimeError-7f634f5d","./WebGLConstants-76bb35d1","./OrientedBoundingBox-18b4901f","./EllipsoidTangentPlane-9123a53b","./IntersectionTests-7d224a2f","./Plane-4aa8974d","./AttributeCompression-f02ec82f","./EncodedCartesian3-874933de","./ArcType-dc1c5aee","./EllipsoidRhumbLine-8cb2e5a4","./PolygonPipeline-bfd1975b"],function(i,y,l,e,c,p,o,s,u,d,m,f,b,t,r,n,a,g,h,P,G,v,L,C,T){
"use strict";function E(e){
e = (e = o.defaultValue(e,o.defaultValue.EMPTY_OBJECT)).polygonHierarchy;this._polygonHierarchy = e,this._workerName = "createCoplanarPolygonOutlineGeometry",this.packedLength = b.PolygonGeometryLibrary.computeHierarchyPackedLength(e) + 1;
}E.fromPositions = function(e){
return new E({polygonHierarchy: {positions: (e = o.defaultValue(e,o.defaultValue.EMPTY_OBJECT)).positions}});
},E.pack = function(e,t,r){
return r = o.defaultValue(r,0),t[r = b.PolygonGeometryLibrary.packPolygonHierarchy(e._polygonHierarchy,t,r)] = e.packedLength,t;
};var k = {polygonHierarchy: {}};return E.unpack = function(e,t,r){
t = o.defaultValue(t,0);var n = b.PolygonGeometryLibrary.unpackPolygonHierarchy(e,t);t = n.startingIndex,delete n.startingIndex;t = e[t];return(r = !o.defined(r) ? new E(k) : r)._polygonHierarchy = n,r.packedLength = t,r;
},E.createGeometry = function(e){
var t = e._polygonHierarchy,e = t.positions,e = i.arrayRemoveDuplicates(e,l.Cartesian3.equalsEpsilon,!0);if(!(e.length < 3) && p.CoplanarPolygonGeometryLibrary.validOutline(e)){
var r = b.PolygonGeometryLibrary.polygonOutlinesFromHierarchy(t,!1);if(0 !== r.length){
for(var n = [],o = 0;o < r.length;o++){
var a = new d.GeometryInstance({geometry: function(e){
for(var t = e.length,r = new Float64Array(3 * t),n = f.IndexDatatype.createTypedArray(t,2 * t),o = 0,a = 0,i = 0;i < t;i++){
var y = e[i];r[o++] = y.x,r[o++] = y.y,r[o++] = y.z,n[a++] = i,n[a++] = (i + 1) % t;
}var l = new u.GeometryAttributes({position: new s.GeometryAttribute({componentDatatype: c.ComponentDatatype.DOUBLE,componentsPerAttribute: 3,values: r})});return new s.Geometry({attributes: l,indices: n,primitiveType: s.PrimitiveType.LINES});
}(r[o])});n.push(a);
}e = m.GeometryPipeline.combineInstances(n)[0],t = y.BoundingSphere.fromPoints(t.positions);return new s.Geometry({attributes: e.attributes,indices: e.indices,primitiveType: e.primitiveType,boundingSphere: t});
}
}
},function(e,t){
return(e = o.defined(t) ? E.unpack(e,t) : e)._ellipsoid = l.Ellipsoid.clone(e._ellipsoid),E.createGeometry(e);
};
});

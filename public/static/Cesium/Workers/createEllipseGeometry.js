define(["./Cartesian2-8417ca3d","./when-208fe5b0","./EllipseGeometry-42ee4ae7","./Check-d18af7c4","./Math-4e53b694","./GeometryOffsetAttribute-def3b741","./Transforms-a73b3b3b","./RuntimeError-7f634f5d","./ComponentDatatype-9204e9f6","./WebGLConstants-76bb35d1","./EllipseGeometryLibrary-2412418f","./GeometryAttribute-04a19cfe","./GeometryAttributes-b0b294d8","./GeometryInstance-d919cab6","./GeometryPipeline-5e672526","./AttributeCompression-f02ec82f","./EncodedCartesian3-874933de","./IndexDatatype-d47ad6f6","./IntersectionTests-7d224a2f","./Plane-4aa8974d","./VertexFormat-e8cbf5b3"],function(r,n,a,e,t,i,o,s,d,f,b,c,l,m,p,y,u,G,C,E,A){
"use strict";return function(e,t){
return(e = n.defined(t) ? a.EllipseGeometry.unpack(e,t) : e)._center = r.Cartesian3.clone(e._center),e._ellipsoid = r.Ellipsoid.clone(e._ellipsoid),a.EllipseGeometry.createGeometry(e);
};
});

define(["./Cartesian2-8417ca3d","./when-208fe5b0","./EllipseOutlineGeometry-ab13c628","./Check-d18af7c4","./Math-4e53b694","./GeometryOffsetAttribute-def3b741","./Transforms-a73b3b3b","./RuntimeError-7f634f5d","./ComponentDatatype-9204e9f6","./WebGLConstants-76bb35d1","./EllipseGeometryLibrary-2412418f","./GeometryAttribute-04a19cfe","./GeometryAttributes-b0b294d8","./IndexDatatype-d47ad6f6"],function(r,n,i,e,t,a,o,l,s,b,f,d,c,u){
"use strict";return function(e,t){
return(e = n.defined(t) ? i.EllipseOutlineGeometry.unpack(e,t) : e)._center = r.Cartesian3.clone(e._center),e._ellipsoid = r.Ellipsoid.clone(e._ellipsoid),i.EllipseOutlineGeometry.createGeometry(e);
};
});

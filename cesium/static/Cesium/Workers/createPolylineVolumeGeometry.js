define(["./when-208fe5b0","./Cartesian2-8417ca3d","./arrayRemoveDuplicates-0f62a181","./BoundingRectangle-7ee12c46","./Transforms-a73b3b3b","./ComponentDatatype-9204e9f6","./PolylineVolumeGeometryLibrary-a2a20b2b","./Check-d18af7c4","./GeometryAttribute-04a19cfe","./GeometryAttributes-b0b294d8","./GeometryPipeline-5e672526","./IndexDatatype-d47ad6f6","./Math-4e53b694","./PolygonPipeline-bfd1975b","./VertexFormat-e8cbf5b3","./RuntimeError-7f634f5d","./WebGLConstants-76bb35d1","./EllipsoidTangentPlane-9123a53b","./IntersectionTests-7d224a2f","./Plane-4aa8974d","./PolylinePipeline-232a4d9a","./EllipsoidGeodesic-8015072b","./EllipsoidRhumbLine-8cb2e5a4","./AttributeCompression-f02ec82f","./EncodedCartesian3-874933de"],function(u,c,r,a,G,A,o,e,R,D,I,O,i,S,g,t,n,l,s,p,d,y,m,h,f){
"use strict";var b = {};function B(e,t){
u.defined(b[e]) || (b[e] = !0,console.warn(u.defaultValue(t,e)));
}function v(e){
var t = (e = u.defaultValue(e,u.defaultValue.EMPTY_OBJECT)).polylinePositions,n = e.shapePositions;this._positions = t,this._shape = n,this._ellipsoid = c.Ellipsoid.clone(u.defaultValue(e.ellipsoid,c.Ellipsoid.WGS84)),this._cornerType = u.defaultValue(e.cornerType,o.CornerType.ROUNDED),this._vertexFormat = g.VertexFormat.clone(u.defaultValue(e.vertexFormat,g.VertexFormat.DEFAULT)),this._granularity = u.defaultValue(e.granularity,i.CesiumMath.RADIANS_PER_DEGREE),this._workerName = "createPolylineVolumeGeometry";t = 1 + t.length * c.Cartesian3.packedLength;t += 1 + n.length * c.Cartesian2.packedLength,this.packedLength = t + c.Ellipsoid.packedLength + g.VertexFormat.packedLength + 2;
}B.geometryOutlines = "Entity geometry outlines are unsupported on terrain. Outlines will be disabled. To enable outlines, disable geometry terrain clamping by explicitly setting height to 0.",B.geometryZIndex = "Entity geometry with zIndex are unsupported when height or extrudedHeight are defined.  zIndex will be ignored",B.geometryHeightReference = "Entity corridor, ellipse, polygon or rectangle with heightReference must also have a defined height.  heightReference will be ignored",B.geometryExtrudedHeightReference = "Entity corridor, ellipse, polygon or rectangle with extrudedHeightReference must also have a defined extrudedHeight.  extrudedHeightReference will be ignored",v.pack = function(e,t,n){
var i;n = u.defaultValue(n,0);var r = e._positions,a = r.length;for(t[n++] = a,i = 0;i < a;++i,n += c.Cartesian3.packedLength)c.Cartesian3.pack(r[i],t,n);var o = e._shape,a = o.length;for(t[n++] = a,i = 0;i < a;++i,n += c.Cartesian2.packedLength)c.Cartesian2.pack(o[i],t,n);return c.Ellipsoid.pack(e._ellipsoid,t,n),n += c.Ellipsoid.packedLength,g.VertexFormat.pack(e._vertexFormat,t,n),n += g.VertexFormat.packedLength,t[n++] = e._cornerType,t[n] = e._granularity,t;
};var E = c.Ellipsoid.clone(c.Ellipsoid.UNIT_SPHERE),P = new g.VertexFormat,_ = {polylinePositions: void 0,shapePositions: void 0,ellipsoid: E,vertexFormat: P,cornerType: void 0,granularity: void 0};v.unpack = function(e,t,n){
t = u.defaultValue(t,0);for(var i = e[t++],r = new Array(i),a = 0;a < i;++a,t += c.Cartesian3.packedLength)r[a] = c.Cartesian3.unpack(e,t);var i = e[t++],o = new Array(i);for(a = 0;a < i;++a,t += c.Cartesian2.packedLength)o[a] = c.Cartesian2.unpack(e,t);var l = c.Ellipsoid.unpack(e,t,E);t += c.Ellipsoid.packedLength;var s = g.VertexFormat.unpack(e,t,P);t += g.VertexFormat.packedLength;var p = e[t++],d = e[t];return u.defined(n) ? (n._positions = r,n._shape = o,n._ellipsoid = c.Ellipsoid.clone(l,n._ellipsoid),n._vertexFormat = g.VertexFormat.clone(s,n._vertexFormat),n._cornerType = p,n._granularity = d,n) : (_.polylinePositions = r,_.shapePositions = o,_.cornerType = p,_.granularity = d,new v(_));
};var x = new a.BoundingRectangle;return v.createGeometry = function(e){
var t = e._positions,n = r.arrayRemoveDuplicates(t,c.Cartesian3.equalsEpsilon),i = e._shape,i = o.PolylineVolumeGeometryLibrary.removeDuplicatesFromShape(i);if(!(n.length < 2 || i.length < 3)){
S.PolygonPipeline.computeWindingOrder2D(i) === S.WindingOrder.CLOCKWISE && i.reverse();t = a.BoundingRectangle.fromPoints(i,x);return function(e,t,n,i){
var r = new D.GeometryAttributes;i.position && (r.position = new R.GeometryAttribute({componentDatatype: A.ComponentDatatype.DOUBLE,componentsPerAttribute: 3,values: e}));var a,o,l,s,p,d = t.length,u = e.length / 3,c = (u - 2 * d) / (2 * d),g = S.PolygonPipeline.triangulate(t),y = (c - 1) * d * 6 + 2 * g.length,m = O.IndexDatatype.createTypedArray(u,y),h = 2 * d,f = 0;for(C = 0;C < c - 1;C++){
for(a = 0;a < d - 1;a++)p = (o = 2 * a + C * d * 2) + h,s = (l = o + 1) + h,m[f++] = l,m[f++] = o,m[f++] = s,m[f++] = s,m[f++] = o,m[f++] = p;s = (l = (o = 2 * d - 2 + C * d * 2) + 1) + h,p = o + h,m[f++] = l,m[f++] = o,m[f++] = s,m[f++] = s,m[f++] = o,m[f++] = p;
}if(i.st || i.tangent || i.bitangent){
for(var b,v,E = new Float32Array(2 * u),P = 1 / (c - 1),_ = 1 / n.height,x = n.height / 2,k = 0,C = 0;C < c;C++){
for(b = C * P,v = _ * (t[0].y + x),E[k++] = b,E[k++] = v,a = 1;a < d;a++)v = _ * (t[a].y + x),E[k++] = b,E[k++] = v,E[k++] = b,E[k++] = v;v = _ * (t[0].y + x),E[k++] = b,E[k++] = v;
}for(a = 0;a < d;a++)b = 0,v = _ * (t[a].y + x),E[k++] = b,E[k++] = v;for(a = 0;a < d;a++)b = (c - 1) * P,v = _ * (t[a].y + x),E[k++] = b,E[k++] = v;r.st = new R.GeometryAttribute({componentDatatype: A.ComponentDatatype.FLOAT,componentsPerAttribute: 2,values: new Float32Array(E)});
}var V = u - 2 * d;for(C = 0;C < g.length;C += 3){
var L = g[C] + V,w = g[C + 1] + V,F = g[C + 2] + V;m[f++] = L,m[f++] = w,m[f++] = F,m[f++] = F + d,m[f++] = w + d,m[f++] = L + d;
}var T = new R.Geometry({attributes: r,indices: m,boundingSphere: G.BoundingSphere.fromVertices(e),primitiveType: R.PrimitiveType.TRIANGLES});if(i.normal && (T = I.GeometryPipeline.computeNormal(T)),i.tangent || i.bitangent){
try{
T = I.GeometryPipeline.computeTangentAndBitangent(T);
}catch(e){
B("polyline-volume-tangent-bitangent","Unable to compute tangents and bitangents for polyline volume geometry");
}i.tangent || (T.attributes.tangent = void 0),i.bitangent || (T.attributes.bitangent = void 0),i.st || (T.attributes.st = void 0);
}return T;
}(o.PolylineVolumeGeometryLibrary.computePositions(n,i,t,e,!0),i,t,e._vertexFormat);
}
},function(e,t){
return(e = u.defined(t) ? v.unpack(e,t) : e)._ellipsoid = c.Ellipsoid.clone(e._ellipsoid),v.createGeometry(e);
};
});

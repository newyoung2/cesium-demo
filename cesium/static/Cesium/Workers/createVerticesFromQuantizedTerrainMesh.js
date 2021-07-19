define(["./AttributeCompression-f02ec82f","./EllipsoidTangentPlane-9123a53b","./Transforms-a73b3b3b","./Cartesian2-8417ca3d","./when-208fe5b0","./TerrainEncoding-73cbc4e6","./IndexDatatype-d47ad6f6","./Math-4e53b694","./OrientedBoundingBox-18b4901f","./Check-d18af7c4","./WebMercatorProjection-ffb6b9f8","./createTaskProcessorWorker","./IntersectionTests-7d224a2f","./Plane-4aa8974d","./RuntimeError-7f634f5d","./ComponentDatatype-9204e9f6","./WebGLConstants-76bb35d1"],function(ie,oe,ae,se,de,ce,ue,he,le,e,Ie,t,r,n,i,o,a){
"use strict";function me(){
e.DeveloperError.throwInstantiationError();
}Object.defineProperties(me.prototype,{errorEvent: {get: e.DeveloperError.throwInstantiationError},credit: {get: e.DeveloperError.throwInstantiationError},tilingScheme: {get: e.DeveloperError.throwInstantiationError},ready: {get: e.DeveloperError.throwInstantiationError},readyPromise: {get: e.DeveloperError.throwInstantiationError},hasWaterMask: {get: e.DeveloperError.throwInstantiationError},hasVertexNormals: {get: e.DeveloperError.throwInstantiationError},availability: {get: e.DeveloperError.throwInstantiationError}});var s = [];me.getRegularGridIndices = function(e,t){
var r = s[e];de.defined(r) || (s[e] = r = []);var n = r[t];return de.defined(n) || m(e,t,n = e * t < he.CesiumMath.SIXTY_FOUR_KILOBYTES ? r[t] = new Uint16Array((e - 1) * (t - 1) * 6) : r[t] = new Uint32Array((e - 1) * (t - 1) * 6),0),n;
};var d = [];me.getRegularGridIndicesAndEdgeIndices = function(e,t){
var r = d[e];de.defined(r) || (d[e] = r = []);var n,i,o,a,s = r[t];return de.defined(s) || (n = me.getRegularGridIndices(e,t),i = (a = I(e,t)).westIndicesSouthToNorth,o = a.southIndicesEastToWest,e = a.eastIndicesNorthToSouth,a = a.northIndicesWestToEast,s = r[t] = {indices: n,westIndicesSouthToNorth: i,southIndicesEastToWest: o,eastIndicesNorthToSouth: e,northIndicesWestToEast: a}),s;
};var l = [];function I(e,t){
for(var r = new Array(t),n = new Array(e),i = new Array(t),o = new Array(e),a = 0;a < e;++a)n[o[a] = a] = e * t - 1 - a;for(a = 0;a < t;++a)i[a] = (a + 1) * e - 1,r[a] = (t - a - 1) * e;return{westIndicesSouthToNorth: r,southIndicesEastToWest: n,eastIndicesNorthToSouth: i,northIndicesWestToEast: o};
}function m(e,t,r,n){
for(var i = 0,o = 0;o < t - 1;++o){
for(var a = 0;a < e - 1;++a){
var s = i + e,d = s + 1,c = i + 1;r[n++] = i,r[n++] = s,r[n++] = c,r[n++] = c,r[n++] = s,r[n++] = d,++i;
}++i;
}
}function c(e,t,r,n){
for(var i = e[0],o = e.length,a = 1;a < o;++a){
var s = e[a];r[n++] = i,r[n++] = s,r[n++] = t,r[n++] = t,r[n++] = s,r[n++] = t + 1,i = s,++t;
}return n;
}me.getRegularGridAndSkirtIndicesAndEdgeIndices = function(e,t){
var r = l[e];de.defined(r) || (l[e] = r = []);var n,i,o,a,s,d,c,u,h = r[t];return de.defined(h) || (o = (n = e * t) + (d = 2 * e + 2 * t),u = (i = (e - 1) * (t - 1) * 6) + 6 * Math.max(0,d - 4),a = (c = I(e,t)).westIndicesSouthToNorth,s = c.southIndicesEastToWest,d = c.eastIndicesNorthToSouth,c = c.northIndicesWestToEast,m(e,t,u = ue.IndexDatatype.createTypedArray(o,u),0),me.addSkirtIndices(a,s,d,c,n,u,i),h = r[t] = {indices: u,westIndicesSouthToNorth: a,southIndicesEastToWest: s,eastIndicesNorthToSouth: d,northIndicesWestToEast: c,indexCountWithoutSkirts: i}),h;
},me.addSkirtIndices = function(e,t,r,n,i,o,a){
a = c(e,i,o,a),a = c(t,i += e.length,o,a),a = c(r,i += t.length,o,a),c(n,i += r.length,o,a);
},me.heightmapTerrainQuality = .25,me.getEstimatedLevelZeroGeometricErrorForAHeightmap = function(e,t,r){
return 2 * e.maximumRadius * Math.PI * me.heightmapTerrainQuality / (t * r);
},me.prototype.requestTileGeometry = e.DeveloperError.throwInstantiationError,me.prototype.getLevelMaximumGeometricError = e.DeveloperError.throwInstantiationError,me.prototype.getTileDataAvailable = e.DeveloperError.throwInstantiationError,me.prototype.loadTileDataAvailability = e.DeveloperError.throwInstantiationError;var ge = 32767,Te = new se.Cartesian3,pe = new se.Cartesian3,fe = new se.Cartesian3,Ee = new se.Cartographic,ye = new se.Cartesian2,ve = new se.Cartesian3,Ne = new ae.Matrix4,we = new ae.Matrix4;function xe(e,t,r,n,i,o,a,s,d){
var c = Number.POSITIVE_INFINITY,u = i.north,h = i.south,l = i.east,I = i.west;l < I && (l += he.CesiumMath.TWO_PI);for(var m = e.length,g = 0;g < m;++g){
var T = e[g],p = r[T],T = n[T];Ee.longitude = he.CesiumMath.lerp(I,l,T.x),Ee.latitude = he.CesiumMath.lerp(h,u,T.y),Ee.height = p - t;p = o.cartographicToCartesian(Ee,Te);ae.Matrix4.multiplyByPoint(a,p,p),se.Cartesian3.minimumByComponent(p,s,s),se.Cartesian3.maximumByComponent(p,d,d),c = Math.min(c,Ee.height);
}return c;
}function be(e,t,r,n,i,o,a,s,d,c,u,h,l,I,m){
var g = de.defined(a),T = d.north,p = d.south,f = d.east,E = d.west;f < E && (f += he.CesiumMath.TWO_PI);for(var y = r.length,v = 0;v < y;++v){
var N = r[v],w = i[N],x = o[N];Ee.longitude = he.CesiumMath.lerp(E,f,x.x) + I,Ee.latitude = he.CesiumMath.lerp(p,T,x.y) + m,Ee.height = w - c;var b,M,C = s.cartographicToCartesian(Ee,Te);g && (b = 2 * N,ye.x = a[b],ye.y = a[1 + b],1 !== u && (w = ie.AttributeCompression.octDecode(ye.x,ye.y,ve),N = ae.Transforms.eastNorthUpToFixedFrame(Te,s,we),b = ae.Matrix4.inverseTransformation(N,Ne),ae.Matrix4.multiplyByPointAsVector(b,w,w),w.z *= u,se.Cartesian3.normalize(w,w),ae.Matrix4.multiplyByPointAsVector(N,w,w),se.Cartesian3.normalize(w,w),ie.AttributeCompression.octEncode(w,ye))),n.hasWebMercatorT && (M = (Ie.WebMercatorProjection.geodeticLatitudeToMercatorAngle(Ee.latitude) - h) * l),t = n.encode(e,t,C,x,Ee.height,ye,M);
}
}function Me(e,t){
var r;return"function" == typeof e.slice && "function" != typeof(r = e.slice()).sort && (r = void 0),(r = !de.defined(r) ? Array.prototype.slice.call(e) : r).sort(t),r;
}return t(function(e,t){
var r,n,i = (ne = e.quantizedVertices).length / 3,o = e.octEncodedNormals,a = e.westIndices.length + e.eastIndices.length + e.southIndices.length + e.northIndices.length,s = e.includeWebMercatorT,d = se.Rectangle.clone(e.rectangle),c = d.west,u = d.south,h = d.east,l = d.north,I = se.Ellipsoid.clone(e.ellipsoid),m = e.exaggeration,g = e.minimumHeight * m,T = e.maximumHeight * m,p = e.relativeToCenter,f = ae.Transforms.eastNorthUpToFixedFrame(p,I),E = ae.Matrix4.inverseTransformation(f,new ae.Matrix4);s && (r = Ie.WebMercatorProjection.geodeticLatitudeToMercatorAngle(u),n = 1 / (Ie.WebMercatorProjection.geodeticLatitudeToMercatorAngle(l) - r));var y = ne.subarray(0,i),v = ne.subarray(i,2 * i),N = ne.subarray(2 * i,3 * i),w = de.defined(o),x = new Array(i),b = new Array(i),M = new Array(i),C = s ? new Array(i) : [],S = pe;S.x = Number.POSITIVE_INFINITY,S.y = Number.POSITIVE_INFINITY,S.z = Number.POSITIVE_INFINITY;var A = fe;A.x = Number.NEGATIVE_INFINITY,A.y = Number.NEGATIVE_INFINITY,A.z = Number.NEGATIVE_INFINITY;for(var P = Number.POSITIVE_INFINITY,W = Number.NEGATIVE_INFINITY,D = Number.POSITIVE_INFINITY,B = Number.NEGATIVE_INFINITY,F = 0;F < i;++F){
var k = y[F],V = v[F],_ = k / ge,H = V / ge,k = he.CesiumMath.lerp(g,T,N[F] / ge);Ee.longitude = he.CesiumMath.lerp(c,h,_),Ee.latitude = he.CesiumMath.lerp(u,l,H),Ee.height = k;P = Math.min(Ee.longitude,P),W = Math.max(Ee.longitude,W),D = Math.min(Ee.latitude,D),B = Math.max(Ee.latitude,B),V = I.cartographicToCartesian(Ee);x[F] = new se.Cartesian2(_,H),b[F] = k,M[F] = V,s && (C[F] = (Ie.WebMercatorProjection.geodeticLatitudeToMercatorAngle(Ee.latitude) - r) * n),ae.Matrix4.multiplyByPoint(E,V,Te),se.Cartesian3.minimumByComponent(Te,S,S),se.Cartesian3.maximumByComponent(Te,A,A);
}var O,G,Y,z = Me(e.westIndices,function(e,t){
return x[e].y - x[t].y;
}),R = Me(e.eastIndices,function(e,t){
return x[t].y - x[e].y;
}),L = Me(e.southIndices,function(e,t){
return x[t].x - x[e].x;
}),U = Me(e.northIndices,function(e,t){
return x[e].x - x[t].x;
});1 !== m && (G = ae.BoundingSphere.fromPoints(M),O = le.OrientedBoundingBox.fromRectangle(d,g,T,I)),(1 !== m || g < 0) && (Y = new ce.EllipsoidalOccluder(I).computeHorizonCullingPointPossiblyUnderEllipsoid(p,M,g));var j = g,j = Math.min(j,xe(e.westIndices,e.westSkirtHeight,b,x,d,I,E,S,A));j = Math.min(j,xe(e.southIndices,e.southSkirtHeight,b,x,d,I,E,S,A)),j = Math.min(j,xe(e.eastIndices,e.eastSkirtHeight,b,x,d,I,E,S,A)),j = Math.min(j,xe(e.northIndices,e.northSkirtHeight,b,x,d,I,E,S,A));for(var q,Q,K,X = new oe.AxisAlignedBoundingBox(S,A,p),Z = new ce.TerrainEncoding(X,j,T,f,w,s),J = Z.getStride(),$ = new Float32Array(i * J + a * J),ee = 0,te = 0;te < i;++te)w && (K = 2 * te,ye.x = o[K],ye.y = o[1 + K],1 !== m && (q = ie.AttributeCompression.octDecode(ye.x,ye.y,ve),Q = ae.Transforms.eastNorthUpToFixedFrame(M[te],I,we),K = ae.Matrix4.inverseTransformation(Q,Ne),ae.Matrix4.multiplyByPointAsVector(K,q,q),q.z *= m,se.Cartesian3.normalize(q,q),ae.Matrix4.multiplyByPointAsVector(Q,q,q),se.Cartesian3.normalize(q,q),ie.AttributeCompression.octEncode(q,ye))),ee = Z.encode($,ee,M[te],x[te],b[te],ye,C[te]);var re = Math.max(0,2 * (a - 4)),ne = e.indices.length + 3 * re;return(X = ue.IndexDatatype.createTypedArray(i + a,ne)).set(e.indices,0),re = -(j = 1e-4 * (W - P)),a = j,j = -(ne = f = 1e-4 * (B - D)),be($,f = i * J,z,Z,b,x,o,I,d,e.westSkirtHeight,m,r,n,re,0),be($,f += e.westIndices.length * J,L,Z,b,x,o,I,d,e.southSkirtHeight,m,r,n,0,j),be($,f += e.southIndices.length * J,R,Z,b,x,o,I,d,e.eastSkirtHeight,m,r,n,a,0),be($,f += e.eastIndices.length * J,U,Z,b,x,o,I,d,e.northSkirtHeight,m,r,n,0,ne),me.addSkirtIndices(z,L,R,U,i,X,e.indices.length),t.push($.buffer,X.buffer),{vertices: $.buffer,indices: X.buffer,westIndicesSouthToNorth: z,southIndicesEastToWest: L,eastIndicesNorthToSouth: R,northIndicesWestToEast: U,vertexStride: J,center: p,minimumHeight: g,maximumHeight: T,boundingSphere: G,orientedBoundingBox: O,occludeePointInScaledSpace: Y,encoding: Z,indexCountWithoutSkirts: e.indices.length};
});
});

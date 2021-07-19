define(["./Transforms-a73b3b3b","./Cartesian2-8417ca3d","./Check-d18af7c4","./when-208fe5b0","./Math-4e53b694","./ArcType-dc1c5aee","./arrayRemoveDuplicates-0f62a181","./ComponentDatatype-9204e9f6","./EllipsoidGeodesic-8015072b","./EllipsoidRhumbLine-8cb2e5a4","./EncodedCartesian3-874933de","./GeometryAttribute-04a19cfe","./IntersectionTests-7d224a2f","./Plane-4aa8974d","./WebMercatorProjection-ffb6b9f8","./RuntimeError-7f634f5d","./WebGLConstants-76bb35d1"],function(Oe,be,e,B,Pe,j,G,ke,M,V,Ae,Le,Y,r,a,t,n){
"use strict";function i(e){
e = B.defaultValue(e,B.defaultValue.EMPTY_OBJECT),this._ellipsoid = B.defaultValue(e.ellipsoid,be.Ellipsoid.WGS84),this._rectangle = B.defaultValue(e.rectangle,be.Rectangle.MAX_VALUE),this._projection = new Oe.GeographicProjection(this._ellipsoid),this._numberOfLevelZeroTilesX = B.defaultValue(e.numberOfLevelZeroTilesX,2),this._numberOfLevelZeroTilesY = B.defaultValue(e.numberOfLevelZeroTilesY,1);
}Object.defineProperties(i.prototype,{ellipsoid: {get: function(){
return this._ellipsoid;
}},rectangle: {get: function(){
return this._rectangle;
}},projection: {get: function(){
return this._projection;
}}}),i.prototype.getNumberOfXTilesAtLevel = function(e){
return this._numberOfLevelZeroTilesX << e;
},i.prototype.getNumberOfYTilesAtLevel = function(e){
return this._numberOfLevelZeroTilesY << e;
},i.prototype.rectangleToNativeRectangle = function(e,a){
var t = Pe.CesiumMath.toDegrees(e.west),n = Pe.CesiumMath.toDegrees(e.south),i = Pe.CesiumMath.toDegrees(e.east),e = Pe.CesiumMath.toDegrees(e.north);return B.defined(a) ? (a.west = t,a.south = n,a.east = i,a.north = e,a) : new be.Rectangle(t,n,i,e);
},i.prototype.tileXYToNativeRectangle = function(e,a,t,n){
n = this.tileXYToRectangle(e,a,t,n);return n.west = Pe.CesiumMath.toDegrees(n.west),n.south = Pe.CesiumMath.toDegrees(n.south),n.east = Pe.CesiumMath.toDegrees(n.east),n.north = Pe.CesiumMath.toDegrees(n.north),n;
},i.prototype.tileXYToRectangle = function(e,a,t,n){
var i = this._rectangle,r = this.getNumberOfXTilesAtLevel(t),s = this.getNumberOfYTilesAtLevel(t),t = i.width / r,r = e * t + i.west,e = (e + 1) * t + i.west,t = i.height / s,s = i.north - a * t,t = i.north - (a + 1) * t;return(n = !B.defined(n) ? new be.Rectangle(r,t,e,s) : n).west = r,n.south = t,n.east = e,n.north = s,n;
},i.prototype.positionToTileXY = function(e,a,t){
var n = this._rectangle;if(be.Rectangle.contains(n,e)){
var i = this.getNumberOfXTilesAtLevel(a),r = this.getNumberOfYTilesAtLevel(a),s = n.width / i,o = n.height / r,a = e.longitude;n.east < n.west && (a += Pe.CesiumMath.TWO_PI);s = (a - n.west) / s | 0;i <= s && (s = i - 1);o = (n.north - e.latitude) / o | 0;return(r <= o && (o = r - 1),B.defined(t)) ? (t.x = s,t.y = o,t) : new be.Cartesian2(s,o);
}
};var s = new be.Cartesian3,o = new be.Cartesian3,l = new be.Cartographic,u = new be.Cartesian3,c = new be.Cartesian3,C = new Oe.BoundingSphere,p = new i,d = [new be.Cartographic,new be.Cartographic,new be.Cartographic,new be.Cartographic],h = new be.Cartesian2,Se = {};function g(e){
be.Cartographic.fromRadians(e.east,e.north,0,d[0]),be.Cartographic.fromRadians(e.west,e.north,0,d[1]),be.Cartographic.fromRadians(e.east,e.south,0,d[2]),be.Cartographic.fromRadians(e.west,e.south,0,d[3]);for(var a = 0,t = 0,n = 0,i = 0,r = Se._terrainHeightsMaxLevel,s = 0;s <= r;++s){
for(var o = !1,l = 0;l < 4;++l){
var u = d[l];if(p.positionToTileXY(u,s,h),0 === l)n = h.x,i = h.y;else if(n !== h.x || i !== h.y){
o = !0;break;
}
}if(o)break;a = n,t = i;
}if(0 !== s)return{x: a,y: t,level: r < s ? r : s - 1};
}Se.initialize = function(){
var e = Se._initPromise;return B.defined(e) ? e : (e = Oe.Resource.fetchJson(Oe.buildModuleUrl("Assets/approximateTerrainHeights.json")).then(function(e){
Se._terrainHeights = e;
}),Se._initPromise = e);
},Se.getMinimumMaximumHeights = function(e,a){
a = B.defaultValue(a,be.Ellipsoid.WGS84);var t = g(e),n = Se._defaultMinTerrainHeight,i = Se._defaultMaxTerrainHeight;return B.defined(t) && (t = t.level + "-" + t.x + "-" + t.y,t = Se._terrainHeights[t],B.defined(t) && (n = t[0],i = t[1]),a.cartographicToCartesian(be.Rectangle.northeast(e,l),s),a.cartographicToCartesian(be.Rectangle.southwest(e,l),o),be.Cartesian3.midpoint(o,s,u),a = a.scaleToGeodeticSurface(u,c),n = B.defined(a) ? (a = be.Cartesian3.distance(u,a),Math.min(n,-a)) : Se._defaultMinTerrainHeight),{minimumTerrainHeight: n = Math.max(Se._defaultMinTerrainHeight,n),maximumTerrainHeight: i};
},Se.getBoundingSphere = function(e,a){
a = B.defaultValue(a,be.Ellipsoid.WGS84);var t = g(e),n = Se._defaultMaxTerrainHeight;B.defined(t) && (i = t.level + "-" + t.x + "-" + t.y,i = Se._terrainHeights[i],B.defined(i) && (n = i[1]));var i = Oe.BoundingSphere.fromRectangle3D(e,a,0);return Oe.BoundingSphere.fromRectangle3D(e,a,n,C),Oe.BoundingSphere.union(i,C,i);
},Se._terrainHeightsMaxLevel = 6,Se._defaultMaxTerrainHeight = 9e3,Se._defaultMinTerrainHeight = -1e5,Se._terrainHeights = void 0,Se._initPromise = void 0,Object.defineProperties(Se,{initialized: {get: function(){
return B.defined(Se._terrainHeights);
}}});var F = [Oe.GeographicProjection,a.WebMercatorProjection],f = F.length,Ie = Math.cos(Pe.CesiumMath.toRadians(30)),m = Math.cos(Pe.CesiumMath.toRadians(150)),q = 0,X = 1e3;function w(e){
var a = (e = B.defaultValue(e,B.defaultValue.EMPTY_OBJECT)).positions;this.width = B.defaultValue(e.width,1),this._positions = a,this.granularity = B.defaultValue(e.granularity,9999),this.loop = B.defaultValue(e.loop,!1),this.arcType = B.defaultValue(e.arcType,j.ArcType.GEODESIC),this._ellipsoid = be.Ellipsoid.WGS84,this._projectionIndex = 0,this._workerName = "createGroundPolylineGeometry",this._scene3DOnly = !1;
}Object.defineProperties(w.prototype,{packedLength: {get: function(){
return 1 + 3 * this._positions.length + 1 + 1 + 1 + be.Ellipsoid.packedLength + 1 + 1;
}}}),w.setProjectionAndEllipsoid = function(e,a){
for(var t = 0,n = 0;n < f;n++)if(a instanceof F[n]){
t = n;break;
}e._projectionIndex = t,e._ellipsoid = a.ellipsoid;
};var y = new be.Cartesian3,v = new be.Cartesian3,T = new be.Cartesian3;function W(e,a,t,n,i){
var r = Z(n,e,0,y),t = Z(n,e,t,v),a = Z(n,a,0,T),t = xe(t,r,v),r = xe(a,r,T);return be.Cartesian3.cross(r,t,i),be.Cartesian3.normalize(i,i);
}var E = new be.Cartographic,_ = new be.Cartesian3,O = new be.Cartesian3,b = new be.Cartesian3;function U(e,a,t,n,i,r,s,o,l,u,c){
if(0 !== i){
var C;r === j.ArcType.GEODESIC ? C = new M.EllipsoidGeodesic(e,a,s) : r === j.ArcType.RHUMB && (C = new V.EllipsoidRhumbLine(e,a,s));r = C.surfaceDistance;if(!(r < i))for(var p = W(e,a,n,s,b),i = Math.ceil(r / i),d = r / i,h = d,g = i - 1,f = o.length,m = 0;m < g;m++){
var w = C.interpolateUsingSurfaceDistance(h,E),y = Z(s,w,t,_),v = Z(s,w,n,O);be.Cartesian3.pack(p,o,f),be.Cartesian3.pack(y,l,f),be.Cartesian3.pack(v,u,f),c.push(w.latitude),c.push(w.longitude),f += 3,h += d;
}
}
}var P = new be.Cartographic;function Z(e,a,t,n){
return be.Cartographic.clone(a,P),P.height = t,be.Cartographic.toCartesian(P,e,n);
}function xe(e,a,t){
return be.Cartesian3.subtract(e,a,t),be.Cartesian3.normalize(t,t),t;
}function k(e,a,t,n){
return n = xe(e,a,n),n = be.Cartesian3.cross(n,t,n),n = be.Cartesian3.normalize(n,n),n = be.Cartesian3.cross(t,n,n);
}w.pack = function(e,a,t){
var n = B.defaultValue(t,0),i = e._positions,r = i.length;a[n++] = r;for(var s = 0;s < r;++s){
var o = i[s];be.Cartesian3.pack(o,a,n),n += 3;
}return a[n++] = e.granularity,a[n++] = e.loop ? 1 : 0,a[n++] = e.arcType,be.Ellipsoid.pack(e._ellipsoid,a,n),n += be.Ellipsoid.packedLength,a[n++] = e._projectionIndex,a[n++] = e._scene3DOnly ? 1 : 0,a;
},w.unpack = function(e,a,t){
for(var n = B.defaultValue(a,0),i = e[n++],r = new Array(i),s = 0;s < i;s++)r[s] = be.Cartesian3.unpack(e,n),n += 3;var o = e[n++],l = 1 === e[n++],u = e[n++],c = be.Ellipsoid.unpack(e,n);n += be.Ellipsoid.packedLength;var C = e[n++],a = 1 === e[n++];return(t = !B.defined(t) ? new w({positions: r}) : t)._positions = r,t.granularity = o,t.loop = l,t.arcType = u,t._ellipsoid = c,t._projectionIndex = C,t._scene3DOnly = a,t;
};var A = new be.Cartesian3,L = new be.Cartesian3,S = new be.Cartesian3,I = new be.Cartesian3;function J(e,a,t,n,i){
t = xe(t,a,I),e = k(e,a,t,A),a = k(n,a,t,L);if(Pe.CesiumMath.equalsEpsilon(be.Cartesian3.dot(e,a),-1,Pe.CesiumMath.EPSILON5))return i = be.Cartesian3.cross(t,e,i),i = be.Cartesian3.normalize(i,i);i = be.Cartesian3.add(a,e,i),i = be.Cartesian3.normalize(i,i);t = be.Cartesian3.cross(t,i,S);return i = be.Cartesian3.dot(a,t) < 0 ? be.Cartesian3.negate(i,i) : i;
}var Q = r.Plane.fromPointNormal(be.Cartesian3.ZERO,be.Cartesian3.UNIT_Y),K = new be.Cartesian3,$ = new be.Cartesian3,ee = new be.Cartesian3,ae = new be.Cartesian3,te = new be.Cartesian3,ne = new be.Cartesian3,ie = new be.Cartographic,re = new be.Cartographic,se = new be.Cartographic;w.createGeometry = function(e){
var a,t,n,i,r,s = !e._scene3DOnly,o = e.loop,l = e._ellipsoid,u = e.granularity,c = e.arcType,C = new F[e._projectionIndex](l),p = q,d = X,h = e._positions,g = h.length;2 === g && (o = !1);for(var f,m,w,y = new V.EllipsoidRhumbLine(void 0,void 0,l),v = [h[0]],M = 0;M < g - 1;M++)t = h[M],n = h[M + 1],f = Y.IntersectionTests.lineSegmentPlane(t,n,Q,ne),!B.defined(f) || be.Cartesian3.equalsEpsilon(f,t,Pe.CesiumMath.EPSILON7) || be.Cartesian3.equalsEpsilon(f,n,Pe.CesiumMath.EPSILON7) || (e.arcType === j.ArcType.GEODESIC ? v.push(be.Cartesian3.clone(f)) : e.arcType === j.ArcType.RHUMB && (w = l.cartesianToCartographic(f,ie).longitude,i = l.cartesianToCartographic(t,ie),r = l.cartesianToCartographic(n,re),y.setEndPoints(i,r),m = y.findIntersectionWithLongitude(w,se),f = l.cartographicToCartesian(m,ne),!B.defined(f) || be.Cartesian3.equalsEpsilon(f,t,Pe.CesiumMath.EPSILON7) || be.Cartesian3.equalsEpsilon(f,n,Pe.CesiumMath.EPSILON7) || v.push(be.Cartesian3.clone(f)))),v.push(n);o && (t = h[g - 1],n = h[0],f = Y.IntersectionTests.lineSegmentPlane(t,n,Q,ne),!B.defined(f) || be.Cartesian3.equalsEpsilon(f,t,Pe.CesiumMath.EPSILON7) || be.Cartesian3.equalsEpsilon(f,n,Pe.CesiumMath.EPSILON7) || (e.arcType === j.ArcType.GEODESIC ? v.push(be.Cartesian3.clone(f)) : e.arcType === j.ArcType.RHUMB && (w = l.cartesianToCartographic(f,ie).longitude,i = l.cartesianToCartographic(t,ie),r = l.cartesianToCartographic(n,re),y.setEndPoints(i,r),m = y.findIntersectionWithLongitude(w,se),f = l.cartographicToCartesian(m,ne),!B.defined(f) || be.Cartesian3.equalsEpsilon(f,t,Pe.CesiumMath.EPSILON7) || be.Cartesian3.equalsEpsilon(f,n,Pe.CesiumMath.EPSILON7) || v.push(be.Cartesian3.clone(f)))));var T = v.length,E = new Array(T);for(M = 0;M < T;M++){
var _ = be.Cartographic.fromCartesian(v[M],l);_.height = 0,E[M] = _;
}if(!((T = (E = G.arrayRemoveDuplicates(E,be.Cartographic.equalsEpsilon)).length) < 2)){
var O = [],b = [],P = [],k = [],A = K,L = $,S = ee,I = ae,x = te,N = E[0],R = E[1];for(A = Z(l,E[T - 1],p,A),I = Z(l,R,p,I),L = Z(l,N,p,L),S = Z(l,N,d,S),x = o ? J(A,L,S,I,x) : W(N,R,d,l,x),be.Cartesian3.pack(x,b,0),be.Cartesian3.pack(L,P,0),be.Cartesian3.pack(S,k,0),O.push(N.latitude),O.push(N.longitude),U(N,R,p,d,u,c,l,b,P,k,O),M = 1;M < T - 1;++M){
var A = be.Cartesian3.clone(L,A),L = be.Cartesian3.clone(I,L),D = E[M];Z(l,D,d,S),Z(l,E[M + 1],p,I),J(A,L,S,I,x),a = b.length,be.Cartesian3.pack(x,b,a),be.Cartesian3.pack(L,P,a),be.Cartesian3.pack(S,k,a),O.push(D.latitude),O.push(D.longitude),U(E[M],E[M + 1],p,d,u,c,l,b,P,k,O);
}var z = E[T - 1],H = E[T - 2];if(L = Z(l,z,p,L),S = Z(l,z,d,S),x = o ? (R = E[0],J(A = Z(l,H,p,A),L,S,I = Z(l,R,p,I),x)) : W(H,z,d,l,x),a = b.length,be.Cartesian3.pack(x,b,a),be.Cartesian3.pack(L,P,a),be.Cartesian3.pack(S,k,a),O.push(z.latitude),O.push(z.longitude),o){
for(U(z,N,p,d,u,c,l,b,P,k,O),a = b.length,M = 0;M < 3;++M)b[a + M] = b[M],P[a + M] = P[M],k[a + M] = k[M];O.push(N.latitude),O.push(N.longitude);
}return function(e,a,t,n,i,r,s){
var o,l,u,c,C,p,d = a._ellipsoid,h = t.length / 3 - 1,g = 8 * h,f = 4 * g,m = 36 * h,w = new(65535 < g ? Uint32Array : Uint16Array)(m),y = new Float64Array(3 * g),v = new Float32Array(f),M = new Float32Array(f),T = new Float32Array(f),E = new Float32Array(f),_ = new Float32Array(f);s && (u = new Float32Array(f),c = new Float32Array(f),C = new Float32Array(f),p = new Float32Array(2 * g));var O = r.length / 2,b = 0,P = He;P.height = 0;var k = Be;k.height = 0;var A = je,L = Ge;if(s)for(l = 0,o = 1;o < O;o++)P.latitude = r[l],P.longitude = r[l + 1],k.latitude = r[l + 2],k.longitude = r[l + 3],A = a.project(P,A),L = a.project(k,L),b += be.Cartesian3.distance(A,L),l += 2;var S = n.length / 3;L = be.Cartesian3.unpack(n,0,L);var I,x = 0;for(l = 3,o = 1;o < S;o++)A = be.Cartesian3.clone(L,A),L = be.Cartesian3.unpack(n,l,L),x += be.Cartesian3.distance(A,L),l += 3;l = 3;var N = 0,R = 0,D = 0,z = 0,H = !1,B = be.Cartesian3.unpack(t,0,Ye),j = be.Cartesian3.unpack(n,0,Ge),G = be.Cartesian3.unpack(i,0,qe);e && (_e = be.Cartesian3.unpack(t,t.length - 6,Ve),Ne(G,_e,B,j) && (G = be.Cartesian3.negate(G,G)));var V,Y,F,q,X,W,U,Z = 0,J = 0,Q = 0;for(o = 0;o < h;o++){
var K = be.Cartesian3.clone(B,Ve),$ = be.Cartesian3.clone(j,je),ee = be.Cartesian3.clone(G,Fe);H && (ee = be.Cartesian3.negate(ee,ee)),B = be.Cartesian3.unpack(t,l,Ye),j = be.Cartesian3.unpack(n,l,Ge),G = be.Cartesian3.unpack(i,l,qe),H = Ne(G,K,B,j),P.latitude = r[N],P.longitude = r[N + 1],k.latitude = r[N + 2],k.longitude = r[N + 3],s && (Me = function(e,a){
var t = Math.abs(e.longitude),n = Math.abs(a.longitude);{if(Pe.CesiumMath.equalsEpsilon(t,Pe.CesiumMath.PI,Pe.CesiumMath.EPSILON11)){
var i = Pe.CesiumMath.sign(a.longitude);return e.longitude = i * (t - Pe.CesiumMath.EPSILON11),1;
}if(Pe.CesiumMath.equalsEpsilon(n,Pe.CesiumMath.PI,Pe.CesiumMath.EPSILON11)){
e = Pe.CesiumMath.sign(e.longitude);return a.longitude = e * (n - Pe.CesiumMath.EPSILON11),2;
}}return 0;
}(P,k),V = a.project(P,Ke),(pe = xe(Y = a.project(k,$e),V,ca)).y = Math.abs(pe.y),F = ea,q = aa,0 === Me || be.Cartesian3.dot(pe,be.Cartesian3.UNIT_Y) > Ie ? (F = Re(a,P,ee,V,ea),q = Re(a,k,G,Y,aa)) : 1 === Me ? (q = Re(a,k,G,Y,aa),F.x = 0,F.y = Pe.CesiumMath.sign(P.longitude - Math.abs(k.longitude)),F.z = 0) : (F = Re(a,P,ee,V,ea),q.x = 0,q.y = Pe.CesiumMath.sign(P.longitude - k.longitude),q.z = 0));var ae = be.Cartesian3.distance($,j),te = Ae.EncodedCartesian3.fromCartesian(K,la),ne = be.Cartesian3.subtract(B,K,ta),ie = be.Cartesian3.normalize(ne,ra),re = be.Cartesian3.subtract($,K,na);re = be.Cartesian3.normalize(re,re);var se = be.Cartesian3.cross(ie,re,ra);se = be.Cartesian3.normalize(se,se);var oe = be.Cartesian3.cross(re,ee,sa);oe = be.Cartesian3.normalize(oe,oe);var le = be.Cartesian3.subtract(j,B,ia);le = be.Cartesian3.normalize(le,le);var ue = be.Cartesian3.cross(G,le,oa);ue = be.Cartesian3.normalize(ue,ue);var ce = ae / x,Ce = Z / x,pe = 0,de = 0,he = 0;for(s && (pe = be.Cartesian3.distance(V,Y),X = Ae.EncodedCartesian3.fromCartesian(V,ua),W = be.Cartesian3.subtract(Y,V,ca),Te = (U = be.Cartesian3.normalize(W,Ca)).x,U.x = U.y,U.y = -Te,de = pe / b,he = J / b),I = 0;I < 8;I++){
var ge = z + 4 * I,fe = R + 2 * I,me = ge + 3,we = I < 4 ? 1 : -1,ye = 2 === I || 3 === I || 6 === I || 7 === I ? 1 : -1;be.Cartesian3.pack(te.high,v,ge),v[me] = ne.x,be.Cartesian3.pack(te.low,M,ge),M[me] = ne.y,be.Cartesian3.pack(oe,T,ge),T[me] = ne.z,be.Cartesian3.pack(ue,E,ge),E[me] = ce * we,be.Cartesian3.pack(se,_,ge);var ve = Ce * ye;0 === ve && ye < 0 && (ve = 9),_[me] = ve,s && (u[ge] = X.high.x,u[ge + 1] = X.high.y,u[ge + 2] = X.low.x,u[ge + 3] = X.low.y,C[ge] = -F.y,C[ge + 1] = F.x,C[ge + 2] = q.y,C[ge + 3] = -q.x,c[ge] = W.x,c[ge + 1] = W.y,c[ge + 2] = U.x,c[ge + 3] = U.y,p[fe] = de * we,0 === (ve = he * ye) && ye < 0 && (ve = 9),p[fe + 1] = ve);
}var Me = Je,ie = Qe,re = Ue,ee = Ze,le = be.Rectangle.fromCartographicArray(Xe,We),Te = Se.getMinimumMaximumHeights(le,d),le = Te.minimumTerrainHeight,Te = Te.maximumTerrainHeight;Q += le,Q += Te,De(K,$,le,Te,Me,re),De(B,j,le,Te,ie,ee);Te = be.Cartesian3.multiplyByScalar(se,Pe.CesiumMath.EPSILON5,pa);be.Cartesian3.add(Me,Te,Me),be.Cartesian3.add(ie,Te,ie),be.Cartesian3.add(re,Te,re),be.Cartesian3.add(ee,Te,ee),ze(Me,ie),ze(re,ee),be.Cartesian3.pack(Me,y,D),be.Cartesian3.pack(ie,y,D + 3),be.Cartesian3.pack(ee,y,D + 6),be.Cartesian3.pack(re,y,D + 9),Te = be.Cartesian3.multiplyByScalar(se,-2 * Pe.CesiumMath.EPSILON5,pa),be.Cartesian3.add(Me,Te,Me),be.Cartesian3.add(ie,Te,ie),be.Cartesian3.add(re,Te,re),be.Cartesian3.add(ee,Te,ee),ze(Me,ie),ze(re,ee),be.Cartesian3.pack(Me,y,D + 12),be.Cartesian3.pack(ie,y,D + 15),be.Cartesian3.pack(ee,y,D + 18),be.Cartesian3.pack(re,y,D + 21),N += 2,l += 3,R += 16,D += 24,z += 32,Z += ae,J += pe;
}var Ee = l = 0;for(o = 0;o < h;o++){
for(I = 0;I < ga;I++)w[l + I] = ha[I] + Ee;Ee += 8,l += ga;
}e = da;Oe.BoundingSphere.fromVertices(t,be.Cartesian3.ZERO,3,e[0]),Oe.BoundingSphere.fromVertices(n,be.Cartesian3.ZERO,3,e[1]);var _e = Oe.BoundingSphere.fromBoundingSpheres(e);_e.radius += Q / (2 * h);e = {position: new Le.GeometryAttribute({componentDatatype: ke.ComponentDatatype.DOUBLE,componentsPerAttribute: 3,normalize: !1,values: y}),startHiAndForwardOffsetX: fa(v),startLoAndForwardOffsetY: fa(M),startNormalAndForwardOffsetZ: fa(T),endNormalAndTextureCoordinateNormalizationX: fa(E),rightNormalAndTextureCoordinateNormalizationY: fa(_)};s && (e.startHiLo2D = fa(u),e.offsetAndRight2D = fa(c),e.startEndNormals2D = fa(C),e.texcoordNormalization2D = new Le.GeometryAttribute({componentDatatype: ke.ComponentDatatype.FLOAT,componentsPerAttribute: 2,normalize: !1,values: p}));return new Le.Geometry({attributes: e,indices: w,boundingSphere: _e});
}(o,C,P,k,b,O,s);
}
};var x = new be.Cartesian3,N = new Oe.Matrix3,R = new Oe.Quaternion;function Ne(e,a,t,n){
a = xe(t,a,x),a = be.Cartesian3.dot(a,e);if(Ie < a || a < m){
t = xe(n,t,I),a = a < m ? Pe.CesiumMath.PI_OVER_TWO : -Pe.CesiumMath.PI_OVER_TWO,a = Oe.Quaternion.fromAxisAngle(t,a,R),a = Oe.Matrix3.fromQuaternion(a,N);return Oe.Matrix3.multiplyByVector(a,e,e),!0;
}return!1;
}var D = new be.Cartographic,z = new be.Cartesian3,H = new be.Cartesian3;function Re(e,a,t,n,i){
var r = be.Cartographic.toCartesian(a,e._ellipsoid,z),s = be.Cartesian3.add(r,t,H),o = !1,l = e._ellipsoid,u = l.cartesianToCartographic(s,D);Math.abs(a.longitude - u.longitude) > Pe.CesiumMath.PI_OVER_TWO && (o = !0,s = be.Cartesian3.subtract(r,t,H),u = l.cartesianToCartographic(s,D)),u.height = 0;u = e.project(u,i);return(i = be.Cartesian3.subtract(u,n,i)).z = 0,i = be.Cartesian3.normalize(i,i),o && be.Cartesian3.negate(i,i),i;
}var oe = new be.Cartesian3,le = new be.Cartesian3;function De(e,a,t,n,i,r){
var s = be.Cartesian3.subtract(a,e,oe);be.Cartesian3.normalize(s,s);t -= q,t = be.Cartesian3.multiplyByScalar(s,t,le);be.Cartesian3.add(e,t,i);n -= X,t = be.Cartesian3.multiplyByScalar(s,n,le);be.Cartesian3.add(a,t,r);
}var ue = new be.Cartesian3;function ze(e,a){
var t = r.Plane.getPointDistance(Q,e),n = r.Plane.getPointDistance(Q,a),i = ue;Pe.CesiumMath.equalsEpsilon(t,0,Pe.CesiumMath.EPSILON2) ? (i = xe(a,e,i),be.Cartesian3.multiplyByScalar(i,Pe.CesiumMath.EPSILON2,i),be.Cartesian3.add(e,i,e)) : Pe.CesiumMath.equalsEpsilon(n,0,Pe.CesiumMath.EPSILON2) && (i = xe(e,a,i),be.Cartesian3.multiplyByScalar(i,Pe.CesiumMath.EPSILON2,i),be.Cartesian3.add(a,i,a));
}var He = new be.Cartographic,Be = new be.Cartographic,je = new be.Cartesian3,Ge = new be.Cartesian3,Ve = new be.Cartesian3,Ye = new be.Cartesian3,Fe = new be.Cartesian3,qe = new be.Cartesian3,Xe = [He,Be],We = new be.Rectangle,Ue = new be.Cartesian3,Ze = new be.Cartesian3,Je = new be.Cartesian3,Qe = new be.Cartesian3,Ke = new be.Cartesian3,$e = new be.Cartesian3,ea = new be.Cartesian3,aa = new be.Cartesian3,ta = new be.Cartesian3,na = new be.Cartesian3,ia = new be.Cartesian3,ra = new be.Cartesian3,sa = new be.Cartesian3,oa = new be.Cartesian3,la = new Ae.EncodedCartesian3,ua = new Ae.EncodedCartesian3,ca = new be.Cartesian3,Ca = new be.Cartesian3,pa = new be.Cartesian3,da = [new Oe.BoundingSphere,new Oe.BoundingSphere],ha = [0,2,1,0,3,2,0,7,3,0,4,7,0,5,4,0,1,5,5,7,4,5,6,7,5,2,6,5,1,2,3,6,2,3,7,6],ga = ha.length;function fa(e){
return new Le.GeometryAttribute({componentDatatype: ke.ComponentDatatype.FLOAT,componentsPerAttribute: 4,normalize: !1,values: e});
}return w._projectNormal = Re,function(e,a){
return Se.initialize().then(function(){
return B.defined(a) && (e = w.unpack(e,a)),w.createGeometry(e);
});
};
});

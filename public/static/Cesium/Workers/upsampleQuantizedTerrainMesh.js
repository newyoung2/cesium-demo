define(["./AttributeCompression-f02ec82f","./Transforms-a73b3b3b","./Cartesian2-8417ca3d","./when-208fe5b0","./TerrainEncoding-73cbc4e6","./IndexDatatype-d47ad6f6","./Check-d18af7c4","./Math-4e53b694","./OrientedBoundingBox-18b4901f","./createTaskProcessorWorker","./RuntimeError-7f634f5d","./ComponentDatatype-9204e9f6","./WebGLConstants-76bb35d1","./EllipsoidTangentPlane-9123a53b","./IntersectionTests-7d224a2f","./Plane-4aa8974d"],function(s,oe,ae,c,pe,de,e,fe,le,t,i,n,r,h,u,o){
"use strict";var ge = {clipTriangleAtAxisAlignedThreshold: function(e,t,i,n,s,r){
var h,u;c.defined(r) ? r.length = 0 : r = [];var o,a,p,d,f,l,g = t ? (h = i < e,u = n < e,s < e) : (h = e < i,u = e < n,e < s),t = h + u + g;return 1 === t ? h ? (o = (e - i) / (n - i),a = (e - i) / (s - i),r.push(1),r.push(2),1 !== a && (r.push(-1),r.push(0),r.push(2),r.push(a)),1 !== o && (r.push(-1),r.push(0),r.push(1),r.push(o))) : u ? (p = (e - n) / (s - n),d = (e - n) / (i - n),r.push(2),r.push(0),1 !== d && (r.push(-1),r.push(1),r.push(0),r.push(d)),1 !== p && (r.push(-1),r.push(1),r.push(2),r.push(p))) : g && (f = (e - s) / (i - s),l = (e - s) / (n - s),r.push(0),r.push(1),1 !== l && (r.push(-1),r.push(2),r.push(1),r.push(l)),1 !== f && (r.push(-1),r.push(2),r.push(0),r.push(f))) : 2 === t ? h || i === e ? u || n === e ? g || s === e || (a = (e - i) / (s - i),p = (e - n) / (s - n),r.push(2),r.push(-1),r.push(0),r.push(2),r.push(a),r.push(-1),r.push(1),r.push(2),r.push(p)) : (l = (e - s) / (n - s),o = (e - i) / (n - i),r.push(1),r.push(-1),r.push(2),r.push(1),r.push(l),r.push(-1),r.push(0),r.push(1),r.push(o)) : (d = (e - n) / (i - n),f = (e - s) / (i - s),r.push(0),r.push(-1),r.push(1),r.push(0),r.push(d),r.push(-1),r.push(2),r.push(0),r.push(f)) : 3 !== t && (r.push(0),r.push(1),r.push(2)),r;
},computeBarycentricCoordinates: function(e,t,i,n,s,r,h,u,o){
var a = i - h,i = h - s,s = r - u,r = n - u,n = 1 / (s * a + i * r),u = t - u,h = e - h,i = (s * h + i * u) * n,u = (-r * h + a * u) * n,n = 1 - i - u;return c.defined(o) ? (o.x = i,o.y = u,o.z = n,o) : new ae.Cartesian3(i,u,n);
},computeLineSegmentLineSegmentIntersection: function(e,t,i,n,s,r,h,u,o){
var a = (h - s) * (t - r) - (u - r) * (e - s),p = (i - e) * (t - r) - (n - t) * (e - s),s = (u - r) * (i - e) - (h - s) * (n - t);if(0 != s){
a = a / s,s = p / s;return 0 <= a && a <= 1 && 0 <= s && s <= 1 ? ((o = !c.defined(o) ? new ae.Cartesian2 : o).x = e + a * (i - e),o.y = t + a * (n - t),o) : void 0;
}
}},ce = 32767,me = 16383,xe = [],we = [],Ce = [],ve = new ae.Cartographic,ye = new ae.Cartesian3,Be = [],Ie = [],be = [],Ae = [],Te = [],ze = new ae.Cartesian3,Me = new oe.BoundingSphere,Ne = new le.OrientedBoundingBox,Ve = new ae.Cartesian2,Ee = new ae.Cartesian3;function Re(){
this.vertexBuffer = void 0,this.index = void 0,this.first = void 0,this.second = void 0,this.ratio = void 0;
}Re.prototype.clone = function(e){
return(e = !c.defined(e) ? new Re : e).uBuffer = this.uBuffer,e.vBuffer = this.vBuffer,e.heightBuffer = this.heightBuffer,e.normalBuffer = this.normalBuffer,e.index = this.index,e.first = this.first,e.second = this.second,e.ratio = this.ratio,e;
},Re.prototype.initializeIndexed = function(e,t,i,n,s){
this.uBuffer = e,this.vBuffer = t,this.heightBuffer = i,this.normalBuffer = n,this.index = s,this.first = void 0,this.second = void 0,this.ratio = void 0;
},Re.prototype.initializeFromClipResult = function(e,t,i){
var n = t + 1;return-1 !== e[t] ? i[e[t]].clone(this) : (this.vertexBuffer = void 0,this.index = void 0,this.first = i[e[n]],++n,this.second = i[e[n]],++n,this.ratio = e[n],++n),n;
},Re.prototype.getKey = function(){
return this.isIndexed() ? this.index : JSON.stringify({first: this.first.getKey(),second: this.second.getKey(),ratio: this.ratio});
},Re.prototype.isIndexed = function(){
return c.defined(this.index);
},Re.prototype.getH = function(){
return c.defined(this.index) ? this.heightBuffer[this.index] : fe.CesiumMath.lerp(this.first.getH(),this.second.getH(),this.ratio);
},Re.prototype.getU = function(){
return c.defined(this.index) ? this.uBuffer[this.index] : fe.CesiumMath.lerp(this.first.getU(),this.second.getU(),this.ratio);
},Re.prototype.getV = function(){
return c.defined(this.index) ? this.vBuffer[this.index] : fe.CesiumMath.lerp(this.first.getV(),this.second.getV(),this.ratio);
};var a = new ae.Cartesian2,p = -1,d = [new ae.Cartesian3,new ae.Cartesian3],f = [new ae.Cartesian3,new ae.Cartesian3];function l(e,t){
var i = d[++p],n = f[p],i = s.AttributeCompression.octDecode(e.first.getNormalX(),e.first.getNormalY(),i),n = s.AttributeCompression.octDecode(e.second.getNormalX(),e.second.getNormalY(),n);return ye = ae.Cartesian3.lerp(i,n,e.ratio,ye),ae.Cartesian3.normalize(ye,ye),s.AttributeCompression.octEncode(ye,t),--p,t;
}Re.prototype.getNormalX = function(){
return c.defined(this.index) ? this.normalBuffer[2 * this.index] : (a = l(this,a)).x;
},Re.prototype.getNormalY = function(){
return c.defined(this.index) ? this.normalBuffer[2 * this.index + 1] : (a = l(this,a)).y;
};var m = [];function He(e,t,i,n,s,r,h,u,o){
if(0 !== h.length){
for(var a = 0,p = 0;p < h.length;)p = m[a++].initializeFromClipResult(h,p,u);for(var d = 0;d < a;++d){
var f,l,g = m[d];g.isIndexed() ? (g.newIndex = r[g.index],g.uBuffer = e,g.vBuffer = t,g.heightBuffer = i,o && (g.normalBuffer = n)) : (f = g.getKey(),c.defined(r[f]) ? g.newIndex = r[f] : (l = e.length,e.push(g.getU()),t.push(g.getV()),i.push(g.getH()),o && (n.push(g.getNormalX()),n.push(g.getNormalY())),g.newIndex = l,r[f] = l));
}3 === a ? (s.push(m[0].newIndex),s.push(m[1].newIndex),s.push(m[2].newIndex)) : 4 === a && (s.push(m[0].newIndex),s.push(m[1].newIndex),s.push(m[2].newIndex),s.push(m[0].newIndex),s.push(m[2].newIndex),s.push(m[3].newIndex));
}
}return m.push(new Re),m.push(new Re),m.push(new Re),m.push(new Re),t(function(e,t){
var i = e.isEastChild,n = e.isNorthChild,s = i ? me : 0,r = i ? ce : me,h = n ? me : 0,u = n ? ce : me,o = Be,a = Ie,p = be,d = Te;o.length = 0,a.length = 0,p.length = 0,d.length = 0;var f = Ae;f.length = 0;for(var l = {},g = e.vertices,c = (c = e.indices).subarray(0,e.indexCountWithoutSkirts),m = pe.TerrainEncoding.clone(e.encoding),x = m.hasVertexNormals,w = e.exaggeration,C = 0,v = e.vertexCountWithoutSkirts,y = e.minimumHeight,B = e.maximumHeight,I = new Array(v),b = new Array(v),A = new Array(v),T = x ? new Array(2 * v) : void 0,z = 0,M = 0;z < v;++z,M += 2){
var N = m.decodeTextureCoordinates(g,z,Ve),V = m.decodeHeight(g,z) / w,E = fe.CesiumMath.clamp(N.x * ce | 0,0,ce),R = fe.CesiumMath.clamp(N.y * ce | 0,0,ce);A[z] = fe.CesiumMath.clamp((V - y) / (B - y) * ce | 0,0,ce),ce - (E = E < 20 ? 0 : E) < 20 && (E = ce),ce - (R = R < 20 ? 0 : R) < 20 && (R = ce),I[z] = E,b[z] = R,x && (N = m.getOctEncodedNormal(g,z,Ee),T[M] = N.x,T[M + 1] = N.y),(i && me <= E || !i && E <= me) && (n && me <= R || !n && R <= me) && (l[z] = C,o.push(E),a.push(R),p.push(A[z]),x && (d.push(T[M]),d.push(T[M + 1])),++C);
}var H = [];H.push(new Re),H.push(new Re),H.push(new Re);var O = [];for(O.push(new Re),O.push(new Re),O.push(new Re),z = 0;z < c.length;z += 3){
var S = c[z],U = c[z + 1],F = c[z + 2],P = I[S],k = I[U],D = I[F];H[0].initializeIndexed(I,b,A,T,S),H[1].initializeIndexed(I,b,A,T,U),H[2].initializeIndexed(I,b,A,T,F);k = ge.clipTriangleAtAxisAlignedThreshold(me,i,P,k,D,xe);k.length <= 0 || (D = O[0].initializeFromClipResult(k,0,H)) >= k.length || (D = O[1].initializeFromClipResult(k,D,H)) >= k.length || (D = O[2].initializeFromClipResult(k,D,H),He(o,a,p,d,f,l,ge.clipTriangleAtAxisAlignedThreshold(me,n,O[0].getV(),O[1].getV(),O[2].getV(),we),O,x),D < k.length && (O[2].clone(O[1]),O[2].initializeFromClipResult(k,D,H),He(o,a,p,d,f,l,ge.clipTriangleAtAxisAlignedThreshold(me,n,O[0].getV(),O[1].getV(),O[2].getV(),we),O,x)));
}var W = i ? -ce : 0,X = n ? -ce : 0,K = [],L = [],Y = [],_ = [],G = Number.MAX_VALUE,J = -G,Z = Ce;Z.length = 0;var j = ae.Ellipsoid.clone(e.ellipsoid),q = (ue = ae.Rectangle.clone(e.childRectangle)).north,Q = ue.south,$ = ue.east,ee = ue.west;for($ < ee && ($ += fe.CesiumMath.TWO_PI),z = 0;z < o.length;++z)E = (E = Math.round(o[z])) <= s ? (K.push(z),0) : r <= E ? (Y.push(z),ce) : 2 * E + W,o[z] = E,R = (R = Math.round(a[z])) <= h ? (L.push(z),0) : u <= R ? (_.push(z),ce) : 2 * R + X,a[z] = R,(V = fe.CesiumMath.lerp(y,B,p[z] / ce)) < G && (G = V),J < V && (J = V),p[z] = V,ve.longitude = fe.CesiumMath.lerp(ee,$,E / ce),ve.latitude = fe.CesiumMath.lerp(Q,q,R / ce),ve.height = V,j.cartographicToCartesian(ve,ye),Z.push(ye.x),Z.push(ye.y),Z.push(ye.z);var te = oe.BoundingSphere.fromVertices(Z,ae.Cartesian3.ZERO,3,Me),ie = le.OrientedBoundingBox.fromRectangle(ue,G,J,j,Ne),e = new pe.EllipsoidalOccluder(j).computeHorizonCullingPointFromVerticesPossiblyUnderEllipsoid(te.center,Z,3,te.center,G,ze),ne = J - G,se = new Uint16Array(o.length + a.length + p.length);for(z = 0;z < o.length;++z)se[z] = o[z];var re = o.length;for(z = 0;z < a.length;++z)se[re + z] = a[z];for(re += a.length,z = 0;z < p.length;++z)se[re + z] = ce * (p[z] - G) / ne;var he,ue = de.IndexDatatype.createTypedArray(o.length,f);return x ? (he = new Uint8Array(d),t.push(se.buffer,ue.buffer,he.buffer),he = he.buffer) : t.push(se.buffer,ue.buffer),{vertices: se.buffer,encodedNormals: he,indices: ue.buffer,minimumHeight: G,maximumHeight: J,westIndices: K,southIndices: L,eastIndices: Y,northIndices: _,boundingSphere: te,orientedBoundingBox: ie,horizonOcclusionPoint: e};
});
});

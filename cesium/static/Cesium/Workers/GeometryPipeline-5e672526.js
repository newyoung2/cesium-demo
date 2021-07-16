define(["exports","./AttributeCompression-f02ec82f","./Cartesian2-8417ca3d","./Check-d18af7c4","./when-208fe5b0","./Math-4e53b694","./Transforms-a73b3b3b","./ComponentDatatype-9204e9f6","./EncodedCartesian3-874933de","./GeometryAttribute-04a19cfe","./IndexDatatype-d47ad6f6","./IntersectionTests-7d224a2f","./Plane-4aa8974d"],function(e,A,R,t,V,L,z,w,d,S,P,D,a){
"use strict";var g = new R.Cartesian3,T = new R.Cartesian3,x = new R.Cartesian3;var s = {calculateACMR: function(e){
var t = (e = V.defaultValue(e,V.defaultValue.EMPTY_OBJECT)).indices,r = e.maximumIndex,a = V.defaultValue(e.cacheSize,24),n = t.length;if(!V.defined(r))for(var r = 0,i = 0,s = t[i];i < n;)r < s && (r = s),s = t[++i];for(var o = [],u = 0;u < r + 1;u++)o[u] = 0;for(var p = a + 1,d = 0;d < n;++d)p - o[t[d]] > a && (o[t[d]] = p,++p);return(p - a + 1) / (n / 3);
}};s.tipsify = function(e){
var t = (e = V.defaultValue(e,V.defaultValue.EMPTY_OBJECT)).indices,r = e.maximumIndex,a = V.defaultValue(e.cacheSize,24);function n(e,t,r,a,n,i,s){
for(var o,u = -1,p = -1,d = 0;d < r.length;){
var l = r[d];a[l].numLiveTriangles && (o = 0,(p < (o = n - a[l].timeStamp + 2 * a[l].numLiveTriangles <= t ? n - a[l].timeStamp : o) || -1 === p) && (p = o,u = l)),++d;
}return-1 === u ? function(e,t,r){
for(;1 <= t.length;){
var a = t[t.length - 1];if(t.splice(t.length - 1,1),0 < e[a].numLiveTriangles)return a;
}for(;v < r;){
if(0 < e[v].numLiveTriangles)return++v - 1;++v;
}return-1;
}(a,i,s) : u;
}var e = t.length,i = 0,s = t[P = 0],o = e;if(V.defined(r))i = r + 1;else{
for(;P < o;)i < s && (i = s),s = t[++P];if(-1 === i)return 0;++i;
}for(var u = [],p = 0;p < i;p++)u[p] = {numLiveTriangles: 0,timeStamp: 0,vertexTriangles: []};for(var d = P = 0;P < o;)u[t[P]].vertexTriangles.push(d),++u[t[P]].numLiveTriangles,u[t[P + 1]].vertexTriangles.push(d),++u[t[P + 1]].numLiveTriangles,u[t[P + 2]].vertexTriangles.push(d),++u[t[P + 2]].numLiveTriangles,++d,P += 3;var l,y = 0,f = a + 1,v = 1,c = [],m = [],C = 0,h = [],b = e / 3,g = [];for(p = 0;p < b;p++)g[p] = !1;for(;-1 !== y;){
for(var A,c = [],T = (A = u[y]).vertexTriangles.length,x = 0;x < T;++x)if(!g[d = A.vertexTriangles[x]]){
g[d] = !0;for(var P = d + d + d,w = 0;w < 3;++w)l = t[P],c.push(l),m.push(l),h[C] = l,++C,--(l = u[l]).numLiveTriangles,f - l.timeStamp > a && (l.timeStamp = f,++f),++P;
}y = n(0,a,c,u,f,m,i);
}return h;
};var r = {};function o(e,t,r,a,n){
e[t++] = r,e[t++] = a,e[t++] = a,e[t++] = n,e[t++] = n,e[t] = r;
}function v(e){
var t,r,a = {};for(t in e)e.hasOwnProperty(t) && V.defined(e[t]) && V.defined(e[t].values) && (r = e[t],a[t] = new S.GeometryAttribute({componentDatatype: r.componentDatatype,componentsPerAttribute: r.componentsPerAttribute,normalize: r.normalize,values: []}));return a;
}r.toWireframe = function(e){
var t = e.indices;if(V.defined(t)){
switch(e.primitiveType){
case S.PrimitiveType.TRIANGLES:e.indices = function(e){
for(var t = e.length,r = t / 3 * 6,a = P.IndexDatatype.createTypedArray(t,r),n = 0,i = 0;i < t;i += 3,n += 6)o(a,n,e[i],e[i + 1],e[i + 2]);return a;
}(t);break;case S.PrimitiveType.TRIANGLE_STRIP:e.indices = function(e){
var t = e.length;if(3 <= t){
var r = 6 * (t - 2),a = P.IndexDatatype.createTypedArray(t,r);o(a,0,e[0],e[1],e[2]);for(var n = 6,i = 3;i < t;++i,n += 6)o(a,n,e[i - 1],e[i],e[i - 2]);return a;
}return new Uint16Array;
}(t);break;case S.PrimitiveType.TRIANGLE_FAN:e.indices = function(e){
if(0 < e.length){
for(var t = e.length - 1,r = 6 * (t - 1),a = P.IndexDatatype.createTypedArray(t,r),n = e[0],i = 0,s = 1;s < t;++s,i += 6)o(a,i,n,e[s],e[s + 1]);return a;
}return new Uint16Array;
}(t);
}e.primitiveType = S.PrimitiveType.LINES;
}return e;
},r.createLineSegmentsForVectors = function(e,t,r){
t = V.defaultValue(t,"normal"),r = V.defaultValue(r,1e4);for(var a,n = e.attributes.position.values,i = e.attributes[t].values,s = n.length,o = new Float64Array(2 * s),u = 0,p = 0;p < s;p += 3)o[u++] = n[p],o[u++] = n[p + 1],o[u++] = n[p + 2],o[u++] = n[p] + i[p] * r,o[u++] = n[p + 1] + i[p + 1] * r,o[u++] = n[p + 2] + i[p + 2] * r;e = e.boundingSphere;return V.defined(e) && (a = new z.BoundingSphere(e.center,e.radius + r)),new S.Geometry({attributes: {position: new S.GeometryAttribute({componentDatatype: w.ComponentDatatype.DOUBLE,componentsPerAttribute: 3,values: o})},primitiveType: S.PrimitiveType.LINES,boundingSphere: a});
},r.createAttributeLocations = function(e){
for(var t,r = ["position","positionHigh","positionLow","position3DHigh","position3DLow","position2DHigh","position2DLow","pickColor","normal","st","tangent","bitangent","extrudeDirection","compressedAttributes"],a = e.attributes,n = {},i = 0,s = r.length,o = 0;o < s;++o){
var u = r[o];V.defined(a[u]) && (n[u] = i++);
}for(t in a)a.hasOwnProperty(t) && !V.defined(n[t]) && (n[t] = i++);return n;
},r.reorderForPreVertexCache = function(e){
var t = S.Geometry.computeNumberOfVertices(e),r = e.indices;if(V.defined(r)){
for(var a = new Int32Array(t),n = 0;n < t;n++)a[n] = -1;for(var i,s = r,o = s.length,u = P.IndexDatatype.createTypedArray(t,o),p = 0,d = 0,l = 0;p < o;)-1 !== (i = a[s[p]]) ? u[d] = i : (a[i = s[p]] = l,u[d] = l,++l),++p,++d;e.indices = u;var y,f = e.attributes;for(y in f)if(f.hasOwnProperty(y) && V.defined(f[y]) && V.defined(f[y].values)){
for(var v = f[y],c = v.values,m = 0,C = v.componentsPerAttribute,h = w.ComponentDatatype.createTypedArray(v.componentDatatype,l * C);m < t;){
var b = a[m];if(-1 !== b)for(var g = 0;g < C;g++)h[C * b + g] = c[C * m + g];++m;
}v.values = h;
}
}return e;
},r.reorderForPostVertexCache = function(e,t){
var r = e.indices;if(e.primitiveType === S.PrimitiveType.TRIANGLES && V.defined(r)){
for(var a = r.length,n = 0,i = 0;i < a;i++)r[i] > n && (n = r[i]);e.indices = s.tipsify({indices: r,maximumIndex: n,cacheSize: t});
}return e;
},r.fitToUnsignedShortIndices = function(e){
var t = [],r = S.Geometry.computeNumberOfVertices(e);if(V.defined(e.indices) && r >= L.CesiumMath.SIXTY_FOUR_KILOBYTES){
var a,n = [],i = [],s = 0,o = v(e.attributes),u = e.indices,p = u.length;e.primitiveType === S.PrimitiveType.TRIANGLES ? a = 3 : e.primitiveType === S.PrimitiveType.LINES ? a = 2 : e.primitiveType === S.PrimitiveType.POINTS && (a = 1);for(var d = 0;d < p;d += a){
for(var l = 0;l < a;++l){
var y = u[d + l],f = n[y];V.defined(f) || (f = s++,n[y] = f,function(e,t,r){
for(var a in t)if(t.hasOwnProperty(a) && V.defined(t[a]) && V.defined(t[a].values))for(var n = t[a],i = 0;i < n.componentsPerAttribute;++i)e[a].values.push(n.values[r * n.componentsPerAttribute + i]);
}(o,e.attributes,y)),i.push(f);
}s + a >= L.CesiumMath.SIXTY_FOUR_KILOBYTES && (t.push(new S.Geometry({attributes: o,indices: i,primitiveType: e.primitiveType,boundingSphere: e.boundingSphere,boundingSphereCV: e.boundingSphereCV})),n = [],i = [],s = 0,o = v(e.attributes));
}0 !== i.length && t.push(new S.Geometry({attributes: o,indices: i,primitiveType: e.primitiveType,boundingSphere: e.boundingSphere,boundingSphereCV: e.boundingSphereCV}));
}else t.push(e);return t;
};var y = new R.Cartesian3,f = new R.Cartographic;r.projectTo2D = function(e,t,r,a,n){
for(var i = e.attributes[t],s = (n = V.defined(n) ? n : new z.GeographicProjection).ellipsoid,o = i.values,u = new Float64Array(o.length),p = 0,d = 0;d < o.length;d += 3){
var l = R.Cartesian3.fromArray(o,d,y),l = s.cartesianToCartographic(l,f),l = n.project(l,y);u[p++] = l.x,u[p++] = l.y,u[p++] = l.z;
}return e.attributes[r] = i,e.attributes[a] = new S.GeometryAttribute({componentDatatype: w.ComponentDatatype.DOUBLE,componentsPerAttribute: 3,values: u}),delete e.attributes[t],e;
};var l = {high: 0,low: 0};r.encodeAttribute = function(e,t,r,a){
for(var n = e.attributes[t],i = n.values,s = i.length,o = new Float32Array(s),u = new Float32Array(s),p = 0;p < s;++p)d.EncodedCartesian3.encode(i[p],l),o[p] = l.high,u[p] = l.low;n = n.componentsPerAttribute;return e.attributes[r] = new S.GeometryAttribute({componentDatatype: w.ComponentDatatype.FLOAT,componentsPerAttribute: n,values: o}),e.attributes[a] = new S.GeometryAttribute({componentDatatype: w.ComponentDatatype.FLOAT,componentsPerAttribute: n,values: u}),delete e.attributes[t],e;
};var i = new R.Cartesian3;function n(e,t){
if(V.defined(t))for(var r = t.values,a = r.length,n = 0;n < a;n += 3)R.Cartesian3.unpack(r,n,i),z.Matrix4.multiplyByPoint(e,i,i),R.Cartesian3.pack(i,r,n);
}function u(e,t){
if(V.defined(t))for(var r = t.values,a = r.length,n = 0;n < a;n += 3)R.Cartesian3.unpack(r,n,i),z.Matrix3.multiplyByVector(e,i,i),i = R.Cartesian3.normalize(i,i),R.Cartesian3.pack(i,r,n);
}var p = new z.Matrix4,c = new z.Matrix3;r.transformToWorldCoordinates = function(e){
var t = e.modelMatrix;if(z.Matrix4.equals(t,z.Matrix4.IDENTITY))return e;var r = e.geometry.attributes;n(t,r.position),n(t,r.prevPosition),n(t,r.nextPosition),(V.defined(r.normal) || V.defined(r.tangent) || V.defined(r.bitangent)) && (z.Matrix4.inverse(t,p),z.Matrix4.transpose(p,p),z.Matrix4.getMatrix3(p,c),u(c,r.normal),u(c,r.tangent),u(c,r.bitangent));r = e.geometry.boundingSphere;return V.defined(r) && (e.geometry.boundingSphere = z.BoundingSphere.transform(r,t,r)),e.modelMatrix = z.Matrix4.clone(z.Matrix4.IDENTITY),e;
};var I = new R.Cartesian3;function m(e,t){
var r,a,n = e.length;e[0].modelMatrix;var i,s,o,u = V.defined(e[0][t].indices),p = e[0][t].primitiveType,d = function(e,t){
var r,a = e.length,n = {},i = e[0][t].attributes;for(r in i)if(i.hasOwnProperty(r) && V.defined(i[r]) && V.defined(i[r].values)){
for(var s = i[r],o = s.values.length,u = !0,p = 1;p < a;++p){
var d = e[p][t].attributes[r];if(!V.defined(d) || s.componentDatatype !== d.componentDatatype || s.componentsPerAttribute !== d.componentsPerAttribute || s.normalize !== d.normalize){
u = !1;break;
}o += d.values.length;
}u && (n[r] = new S.GeometryAttribute({componentDatatype: s.componentDatatype,componentsPerAttribute: s.componentsPerAttribute,normalize: s.normalize,values: w.ComponentDatatype.createTypedArray(s.componentDatatype,o)}));
}return n;
}(e,t);for(r in d)if(d.hasOwnProperty(r))for(i = d[r].values,y = b = 0;y < n;++y)for(o = (s = e[y][t].attributes[r].values).length,a = 0;a < o;++a)i[b++] = s[a];if(u){
for(var l = 0,y = 0;y < n;++y)l += e[y][t].indices.length;var f = S.Geometry.computeNumberOfVertices(new S.Geometry({attributes: d,primitiveType: S.PrimitiveType.POINTS})),v = P.IndexDatatype.createTypedArray(f,l),c = 0,m = 0;for(y = 0;y < n;++y){
for(var C = e[y][t].indices,h = C.length,b = 0;b < h;++b)v[c++] = m + C[b];m += S.Geometry.computeNumberOfVertices(e[y][t]);
}f = v;
}var g = new R.Cartesian3,A = 0;for(y = 0;y < n;++y){
if(T = e[y][t].boundingSphere,!V.defined(T)){
g = void 0;break;
}R.Cartesian3.add(T.center,g,g);
}if(V.defined(g))for(R.Cartesian3.divideByScalar(g,n,g),y = 0;y < n;++y){
var T = e[y][t].boundingSphere,x = R.Cartesian3.magnitude(R.Cartesian3.subtract(T.center,g,I)) + T.radius;A < x && (A = x);
}return new S.Geometry({attributes: d,indices: f,primitiveType: p,boundingSphere: V.defined(g) ? new z.BoundingSphere(g,A) : void 0});
}r.combineInstances = function(e){
for(var t = [],r = [],a = e.length,n = 0;n < a;++n){
var i = e[n];V.defined(i.geometry) ? t.push(i) : V.defined(i.westHemisphereGeometry) && V.defined(i.eastHemisphereGeometry) && r.push(i);
}var s = [];return 0 < t.length && s.push(m(t,"geometry")),0 < r.length && (s.push(m(r,"westHemisphereGeometry")),s.push(m(r,"eastHemisphereGeometry"))),s;
};var O = new R.Cartesian3,E = new R.Cartesian3,N = new R.Cartesian3,M = new R.Cartesian3;r.computeNormal = function(e){
for(var t = e.indices,r = e.attributes,a = r.position.values,n = r.position.values.length / 3,i = t.length,s = new Array(n),o = new Array(i / 3),u = new Array(i),p = 0;p < n;p++)s[p] = {indexOffset: 0,count: 0,currentCount: 0};var d = 0;for(p = 0;p < i;p += 3){
var l = t[p],y = t[p + 1],f = t[p + 2],v = 3 * l,c = 3 * y,m = 3 * f;E.x = a[v],E.y = a[1 + v],E.z = a[2 + v],N.x = a[c],N.y = a[1 + c],N.z = a[2 + c],M.x = a[m],M.y = a[1 + m],M.z = a[2 + m],s[l].count++,s[y].count++,s[f].count++,R.Cartesian3.subtract(N,E,N),R.Cartesian3.subtract(M,E,M),o[d] = R.Cartesian3.cross(N,M,new R.Cartesian3),d++;
}var C = 0;for(p = 0;p < n;p++)s[p].indexOffset += C,C += s[p].count;for(p = d = 0;p < i;p += 3){
var h,b = (h = s[t[p]]).indexOffset + h.currentCount;u[b] = d,h.currentCount++,u[(h = s[t[p + 1]]).indexOffset + h.currentCount] = d,h.currentCount++,u[(h = s[t[p + 2]]).indexOffset + h.currentCount] = d,h.currentCount++,d++;
}var g = new Float32Array(3 * n);for(p = 0;p < n;p++){
var A = 3 * p;if(h = s[p],R.Cartesian3.clone(R.Cartesian3.ZERO,O),0 < h.count){
for(d = 0;d < h.count;d++)R.Cartesian3.add(O,o[u[h.indexOffset + d]],O);R.Cartesian3.equalsEpsilon(R.Cartesian3.ZERO,O,L.CesiumMath.EPSILON10) && R.Cartesian3.clone(o[u[h.indexOffset]],O);
}R.Cartesian3.equalsEpsilon(R.Cartesian3.ZERO,O,L.CesiumMath.EPSILON10) && (O.z = 1),R.Cartesian3.normalize(O,O),g[A] = O.x,g[1 + A] = O.y,g[2 + A] = O.z;
}return e.attributes.normal = new S.GeometryAttribute({componentDatatype: w.ComponentDatatype.FLOAT,componentsPerAttribute: 3,values: g}),e;
};var G = new R.Cartesian3,F = new R.Cartesian3,B = new R.Cartesian3;r.computeTangentAndBitangent = function(e){
e.attributes;for(var t = e.indices,r = e.attributes.position.values,a = e.attributes.normal.values,n = e.attributes.st.values,i = e.attributes.position.values.length / 3,s = t.length,o = new Array(3 * i),u = 0;u < o.length;u++)o[u] = 0;for(u = 0;u < s;u += 3){
var p,d = t[u],l = t[u + 1],y = t[u + 2],f = 3 * l,v = 3 * y,c = 2 * d,m = 2 * l,C = 2 * y,h = r[p = 3 * d],b = r[p + 1],l = r[p + 2],y = n[c],d = n[1 + c],c = n[1 + m] - d,d = n[1 + C] - d,y = 1 / ((n[m] - y) * d - (n[C] - y) * c),h = (d * (r[f] - h) - c * (r[v] - h)) * y,b = (d * (r[f + 1] - b) - c * (r[v + 1] - b)) * y,y = (d * (r[f + 2] - l) - c * (r[v + 2] - l)) * y;o[p] += h,o[p + 1] += b,o[p + 2] += y,o[f] += h,o[f + 1] += b,o[f + 2] += y,o[v] += h,o[v + 1] += b,o[v + 2] += y;
}var g = new Float32Array(3 * i),A = new Float32Array(3 * i);for(u = 0;u < i;u++){
f = (p = 3 * u) + 1,v = p + 2;var T = R.Cartesian3.fromArray(a,p,G),x = R.Cartesian3.fromArray(o,p,B),P = R.Cartesian3.dot(T,x);R.Cartesian3.multiplyByScalar(T,P,F),R.Cartesian3.normalize(R.Cartesian3.subtract(x,F,x),x),g[p] = x.x,g[f] = x.y,g[v] = x.z,R.Cartesian3.normalize(R.Cartesian3.cross(T,x,x),x),A[p] = x.x,A[f] = x.y,A[v] = x.z;
}return e.attributes.tangent = new S.GeometryAttribute({componentDatatype: w.ComponentDatatype.FLOAT,componentsPerAttribute: 3,values: g}),e.attributes.bitangent = new S.GeometryAttribute({componentDatatype: w.ComponentDatatype.FLOAT,componentsPerAttribute: 3,values: A}),e;
};var k = new R.Cartesian2,_ = new R.Cartesian3,q = new R.Cartesian3,U = new R.Cartesian3,Y = new R.Cartesian2;function C(e){
switch(e.primitiveType){
case S.PrimitiveType.TRIANGLE_FAN:return function(e){
var t = S.Geometry.computeNumberOfVertices(e),r = P.IndexDatatype.createTypedArray(t,3 * (t - 2));r[0] = 1,r[1] = 0,r[2] = 2;for(var a = 3,n = 3;n < t;++n)r[a++] = n - 1,r[a++] = 0,r[a++] = n;return e.indices = r,e.primitiveType = S.PrimitiveType.TRIANGLES,e;
}(e);case S.PrimitiveType.TRIANGLE_STRIP:return function(e){
var t = S.Geometry.computeNumberOfVertices(e),r = P.IndexDatatype.createTypedArray(t,3 * (t - 2));r[0] = 0,r[1] = 1,r[2] = 2,3 < t && (r[3] = 0,r[4] = 2,r[5] = 3);for(var a = 6,n = 3;n < t - 1;n += 2)r[a++] = n,r[a++] = n - 1,r[a++] = n + 1,n + 2 < t && (r[a++] = n,r[a++] = n + 1,r[a++] = n + 2);return e.indices = r,e.primitiveType = S.PrimitiveType.TRIANGLES,e;
}(e);case S.PrimitiveType.TRIANGLES:return function(e){
if(V.defined(e.indices))return e;for(var t = S.Geometry.computeNumberOfVertices(e),r = P.IndexDatatype.createTypedArray(t,t),a = 0;a < t;++a)r[a] = a;return e.indices = r,e;
}(e);case S.PrimitiveType.LINE_STRIP:return function(e){
var t = S.Geometry.computeNumberOfVertices(e),r = P.IndexDatatype.createTypedArray(t,2 * (t - 1));r[0] = 0,r[1] = 1;for(var a = 2,n = 2;n < t;++n)r[a++] = n - 1,r[a++] = n;return e.indices = r,e.primitiveType = S.PrimitiveType.LINES,e;
}(e);case S.PrimitiveType.LINE_LOOP:return function(e){
var t = S.Geometry.computeNumberOfVertices(e),r = P.IndexDatatype.createTypedArray(t,2 * t);r[0] = 0,r[1] = 1;for(var a = 2,n = 2;n < t;++n)r[a++] = n - 1,r[a++] = n;return r[a++] = t - 1,r[a] = 0,e.indices = r,e.primitiveType = S.PrimitiveType.LINES,e;
}(e);case S.PrimitiveType.LINES:return function(e){
if(V.defined(e.indices))return e;for(var t = S.Geometry.computeNumberOfVertices(e),r = P.IndexDatatype.createTypedArray(t,t),a = 0;a < t;++a)r[a] = a;return e.indices = r,e;
}(e);
}return e;
}function h(e,t){
Math.abs(e.y) < L.CesiumMath.EPSILON6 && (e.y = t ? -L.CesiumMath.EPSILON6 : L.CesiumMath.EPSILON6);
}r.compressVertices = function(e){
var t = e.attributes.extrudeDirection;if(V.defined(t)){
for(var r = t.values,a = r.length / 3,n = new Float32Array(2 * a),i = 0,s = 0;s < a;++s)R.Cartesian3.fromArray(r,3 * s,_),R.Cartesian3.equals(_,R.Cartesian3.ZERO) ? i += 2 : (Y = A.AttributeCompression.octEncodeInRange(_,65535,Y),n[i++] = Y.x,n[i++] = Y.y);return e.attributes.compressedAttributes = new S.GeometryAttribute({componentDatatype: w.ComponentDatatype.FLOAT,componentsPerAttribute: 2,values: n}),delete e.attributes.extrudeDirection,e;
}var o = e.attributes.normal,u = e.attributes.st,p = V.defined(o),d = V.defined(u);if(!p && !d)return e;var l,y,f,v,c = e.attributes.tangent,t = e.attributes.bitangent,m = V.defined(c),C = V.defined(t);p && (l = o.values),d && (y = u.values),m && (f = c.values),C && (v = t.values);c = a = (p ? l : y).length / (p ? 3 : 2),t = d && p ? 2 : 1;c *= t += m || C ? 1 : 0;var h = new Float32Array(c),b = 0;for(s = 0;s < a;++s){
d && (R.Cartesian2.fromArray(y,2 * s,k),h[b++] = A.AttributeCompression.compressTextureCoordinates(k));var g = 3 * s;p && V.defined(f) && V.defined(v) ? (R.Cartesian3.fromArray(l,g,_),R.Cartesian3.fromArray(f,g,q),R.Cartesian3.fromArray(v,g,U),A.AttributeCompression.octPack(_,q,U,k),h[b++] = k.x,h[b++] = k.y) : (p && (R.Cartesian3.fromArray(l,g,_),h[b++] = A.AttributeCompression.octEncodeFloat(_)),m && (R.Cartesian3.fromArray(f,g,_),h[b++] = A.AttributeCompression.octEncodeFloat(_)),C && (R.Cartesian3.fromArray(v,g,_),h[b++] = A.AttributeCompression.octEncodeFloat(_)));
}return e.attributes.compressedAttributes = new S.GeometryAttribute({componentDatatype: w.ComponentDatatype.FLOAT,componentsPerAttribute: t,values: h}),p && delete e.attributes.normal,d && delete e.attributes.st,C && delete e.attributes.bitangent,m && delete e.attributes.tangent,e;
};var b = new R.Cartesian3;function Z(e,t,r,a){
R.Cartesian3.add(e,R.Cartesian3.multiplyByScalar(R.Cartesian3.subtract(t,e,b),e.y / (e.y - t.y),b),r),R.Cartesian3.clone(r,a),h(r,!0),h(a,!1);
}var H = new R.Cartesian3,W = new R.Cartesian3,X = new R.Cartesian3,j = new R.Cartesian3,J = {positions: new Array(7),indices: new Array(9)};function K(e,t,r){
if(!(0 <= e.x || 0 <= t.x || 0 <= r.x)){
!function(e,t,r){
if(0 !== e.y && 0 !== t.y && 0 !== r.y)return h(e,e.y < 0),h(t,t.y < 0),h(r,r.y < 0);var a = Math.abs(e.y),n = Math.abs(t.y),i = Math.abs(r.y),n = n < a ? i < a ? L.CesiumMath.sign(e.y) : L.CesiumMath.sign(r.y) : i < n ? L.CesiumMath.sign(t.y) : L.CesiumMath.sign(r.y);h(e,n = n < 0),h(t,n),h(r,n);
}(e,t,r);var a = e.y < 0,n = t.y < 0,i = r.y < 0,s = 0;s += a ? 1 : 0,s += n ? 1 : 0,s += i ? 1 : 0;var o = J.indices;1 == s ? (o[1] = 3,o[2] = 4,o[5] = 6,o[7] = 6,o[8] = 5,a ? (Z(e,t,H,X),Z(e,r,W,j),o[0] = 0,o[3] = 1,o[4] = 2,o[6] = 1) : n ? (Z(t,r,H,X),Z(t,e,W,j),o[0] = 1,o[3] = 2,o[4] = 0,o[6] = 2) : i && (Z(r,e,H,X),Z(r,t,W,j),o[0] = 2,o[3] = 0,o[4] = 1,o[6] = 0)) : 2 == s && (o[2] = 4,o[4] = 4,o[5] = 3,o[7] = 5,o[8] = 6,a ? n ? i || (Z(r,e,H,X),Z(r,t,W,j),o[0] = 0,o[1] = 1,o[3] = 0,o[6] = 2) : (Z(t,r,H,X),Z(t,e,W,j),o[0] = 2,o[1] = 0,o[3] = 2,o[6] = 1) : (Z(e,t,H,X),Z(e,r,W,j),o[0] = 1,o[1] = 2,o[3] = 1,o[6] = 0));o = J.positions;return o[0] = e,o[1] = t,o[2] = r,o.length = 3,1 != s && 2 != s || (o[3] = H,o[4] = W,o[5] = X,o[6] = j,o.length = 7),J;
}
}function Q(e,t){
var r = e.attributes;if(0 !== r.position.values.length){
for(var a in r)r.hasOwnProperty(a) && V.defined(r[a]) && V.defined(r[a].values) && ((a = r[a]).values = w.ComponentDatatype.createTypedArray(a.componentDatatype,a.values));var n = S.Geometry.computeNumberOfVertices(e);return e.indices = P.IndexDatatype.createTypedArray(n,e.indices),t && (e.boundingSphere = z.BoundingSphere.fromVertices(r.position.values)),e;
}
}function $(e){
var t,r,a = e.attributes,n = {};for(t in a)a.hasOwnProperty(t) && V.defined(a[t]) && V.defined(a[t].values) && (r = a[t],n[t] = new S.GeometryAttribute({componentDatatype: r.componentDatatype,componentsPerAttribute: r.componentsPerAttribute,normalize: r.normalize,values: []}));return new S.Geometry({attributes: n,indices: [],primitiveType: e.primitiveType});
}function ee(e,t,r){
var a = V.defined(e.geometry.boundingSphere);t = Q(t,a),r = Q(r,a),V.defined(r) && !V.defined(t) ? e.geometry = r : !V.defined(r) && V.defined(t) ? e.geometry = t : (e.westHemisphereGeometry = t,e.eastHemisphereGeometry = r,e.geometry = void 0);
}function te(u,p){
var d = new u,l = new u,y = new u;return function(e,t,r,a,n,i,s,o){
e = u.fromArray(n,e * p,d),t = u.fromArray(n,t * p,l),r = u.fromArray(n,r * p,y);u.multiplyByScalar(e,a.x,e),u.multiplyByScalar(t,a.y,t),u.multiplyByScalar(r,a.z,r);e = u.add(e,t,e);u.add(e,r,e),o && u.normalize(e,e),u.pack(e,i,s * p);
};
}var re = te(z.Cartesian4,4),ae = te(R.Cartesian3,3),ne = te(R.Cartesian2,2),ie = function(e,t,r,a,n,i,s){
e = n[e] * a.x,t = n[t] * a.y,a = n[r] * a.z;i[s] = e + t + a > L.CesiumMath.EPSILON6 ? 1 : 0;
},se = new R.Cartesian3,oe = new R.Cartesian3,ue = new R.Cartesian3,pe = new R.Cartesian3;function de(e,t,r,a,n,i,s,o,u,p,d,l,y,f,v,c){
if(V.defined(i) || V.defined(s) || V.defined(o) || V.defined(u) || V.defined(p) || 0 !== f){
var m,C = function(e,t,r,a,n){
var i,s,o,u,p,d,l;if(V.defined(n) || (n = new R.Cartesian3),V.defined(t.z)){
if(R.Cartesian3.equalsEpsilon(e,t,L.CesiumMath.EPSILON14))return R.Cartesian3.clone(R.Cartesian3.UNIT_X,n);if(R.Cartesian3.equalsEpsilon(e,r,L.CesiumMath.EPSILON14))return R.Cartesian3.clone(R.Cartesian3.UNIT_Y,n);if(R.Cartesian3.equalsEpsilon(e,a,L.CesiumMath.EPSILON14))return R.Cartesian3.clone(R.Cartesian3.UNIT_Z,n);i = R.Cartesian3.subtract(r,t,g),s = R.Cartesian3.subtract(a,t,T),o = R.Cartesian3.subtract(e,t,x),u = R.Cartesian3.dot(i,i),y = R.Cartesian3.dot(i,s),p = R.Cartesian3.dot(i,o),d = R.Cartesian3.dot(s,s),l = R.Cartesian3.dot(s,o);
}else{
if(R.Cartesian2.equalsEpsilon(e,t,L.CesiumMath.EPSILON14))return R.Cartesian3.clone(R.Cartesian3.UNIT_X,n);if(R.Cartesian2.equalsEpsilon(e,r,L.CesiumMath.EPSILON14))return R.Cartesian3.clone(R.Cartesian3.UNIT_Y,n);if(R.Cartesian2.equalsEpsilon(e,a,L.CesiumMath.EPSILON14))return R.Cartesian3.clone(R.Cartesian3.UNIT_Z,n);i = R.Cartesian2.subtract(r,t,g),s = R.Cartesian2.subtract(a,t,T),o = R.Cartesian2.subtract(e,t,x),u = R.Cartesian2.dot(i,i),y = R.Cartesian2.dot(i,s),p = R.Cartesian2.dot(i,o),d = R.Cartesian2.dot(s,s),l = R.Cartesian2.dot(s,o);
}n.y = d * p - y * l,n.z = u * l - y * p;var y = u * d - y * y;return 0 !== n.y && (n.y /= y),0 !== n.z && (n.z /= y),n.x = 1 - n.y - n.z,n;
}(a,R.Cartesian3.fromArray(n,3 * e,se),R.Cartesian3.fromArray(n,3 * t,oe),R.Cartesian3.fromArray(n,3 * r,ue),pe);if(V.defined(i) && ae(e,t,r,C,i,l.normal.values,c,!0),V.defined(p) && (n = R.Cartesian3.fromArray(p,3 * e,se),i = R.Cartesian3.fromArray(p,3 * t,oe),p = R.Cartesian3.fromArray(p,3 * r,ue),R.Cartesian3.multiplyByScalar(n,C.x,n),R.Cartesian3.multiplyByScalar(i,C.y,i),R.Cartesian3.multiplyByScalar(p,C.z,p),R.Cartesian3.equals(n,R.Cartesian3.ZERO) && R.Cartesian3.equals(i,R.Cartesian3.ZERO) && R.Cartesian3.equals(p,R.Cartesian3.ZERO) ? ((m = se).x = 0,m.y = 0,m.z = 0) : (m = R.Cartesian3.add(n,i,n),R.Cartesian3.add(m,p,m),R.Cartesian3.normalize(m,m)),R.Cartesian3.pack(m,l.extrudeDirection.values,3 * c)),V.defined(d) && ie(e,t,r,C,d,l.applyOffset.values,c),V.defined(s) && ae(e,t,r,C,s,l.tangent.values,c,!0),V.defined(o) && ae(e,t,r,C,o,l.bitangent.values,c,!0),V.defined(u) && ne(e,t,r,C,u,l.st.values,c),0 < f)for(var h = 0;h < f;h++){
var b = y[h];!function(e,t,r,a,n,i,s){
var o = i.componentsPerAttribute,u = i.values,p = s.values;switch(o){
case 4:re(e,t,r,a,u,p,n,!1);break;case 3:ae(e,t,r,a,u,p,n,!1);break;case 2:ne(e,t,r,a,u,p,n,!1);break;default:p[n] = u[e] * a.x + u[t] * a.y + u[r] * a.z;
}
}(e,t,r,C,c,v[b],l[b]);
}
}
}function le(e,t,r,a,n,i){
var s = e.position.values.length / 3;if(-1 === n)return e.position.values.push(i.x,i.y,i.z),t.push(s),s;a = a[n],n = r[a];return-1 === n ? (r[a] = s,e.position.values.push(i.x,i.y,i.z),t.push(s),s) : (t.push(n),n);
}var ye = {position: !0,normal: !0,bitangent: !0,tangent: !0,st: !0,extrudeDirection: !0,applyOffset: !0};function fe(e){
var t,r = e.geometry,a = r.attributes,n = a.position.values,i = V.defined(a.normal) ? a.normal.values : void 0,s = V.defined(a.bitangent) ? a.bitangent.values : void 0,o = V.defined(a.tangent) ? a.tangent.values : void 0,u = V.defined(a.st) ? a.st.values : void 0,p = V.defined(a.extrudeDirection) ? a.extrudeDirection.values : void 0,d = V.defined(a.applyOffset) ? a.applyOffset.values : void 0,l = r.indices,y = [];for(t in a)a.hasOwnProperty(t) && !ye[t] && V.defined(a[t]) && y.push(t);var f,v,c = y.length,m = $(r),C = $(r),h = [];h.length = n.length / 3;var b = [];for(b.length = n.length / 3,A = 0;A < h.length;++A)h[A] = -1,b[A] = -1;for(var g = l.length,A = 0;A < g;A += 3){
var T = l[A],x = l[A + 1],P = l[A + 2],w = R.Cartesian3.fromArray(n,3 * T),S = R.Cartesian3.fromArray(n,3 * x),I = R.Cartesian3.fromArray(n,3 * P),O = K(w,S,I);if(V.defined(O) && 3 < O.positions.length)for(var E = O.positions,N = O.indices,L = N.length,z = 0;z < L;++z){
var D = N[z],M = E[D],G = M.y < 0 ? (f = C.attributes,v = C.indices,h) : (f = m.attributes,v = m.indices,b);de(T,x,P,M,n,i,o,s,u,p,d,f,y,c,a,le(f,v,G,l,D < 3 ? A + D : -1,M));
}else V.defined(O) && (w = O.positions[0],S = O.positions[1],I = O.positions[2]),G = w.y < 0 ? (f = C.attributes,v = C.indices,h) : (f = m.attributes,v = m.indices,b),de(T,x,P,w,n,i,o,s,u,p,d,f,y,c,a,le(f,v,G,l,A,w)),de(T,x,P,S,n,i,o,s,u,p,d,f,y,c,a,le(f,v,G,l,A + 1,S)),de(T,x,P,I,n,i,o,s,u,p,d,f,y,c,a,le(f,v,G,l,A + 2,I));
}ee(e,C,m);
}var ve = a.Plane.fromPointNormal(R.Cartesian3.ZERO,R.Cartesian3.UNIT_Y),ce = new R.Cartesian3,me = new R.Cartesian3;function Ce(e,t,r,a,n,i,s){
V.defined(s) && (a = R.Cartesian3.fromArray(a,3 * e,se),R.Cartesian3.equalsEpsilon(a,r,L.CesiumMath.EPSILON10) ? i.applyOffset.values[n] = s[e] : i.applyOffset.values[n] = s[t]);
}function he(e){
var t,r = e.geometry,a = r.attributes,n = a.position.values,i = V.defined(a.applyOffset) ? a.applyOffset.values : void 0,s = r.indices,o = $(r),u = $(r),p = s.length,d = [];d.length = n.length / 3;var l = [];for(l.length = n.length / 3,t = 0;t < d.length;++t)d[t] = -1,l[t] = -1;for(t = 0;t < p;t += 2){
var y = s[t],f = s[t + 1],v = R.Cartesian3.fromArray(n,3 * y,se),c = R.Cartesian3.fromArray(n,3 * f,oe);Math.abs(v.y) < L.CesiumMath.EPSILON6 && (v.y < 0 ? v.y = -L.CesiumMath.EPSILON6 : v.y = L.CesiumMath.EPSILON6),Math.abs(c.y) < L.CesiumMath.EPSILON6 && (c.y < 0 ? c.y = -L.CesiumMath.EPSILON6 : c.y = L.CesiumMath.EPSILON6);var m,C,h,b,g = o.attributes,A = o.indices,T = l,x = u.attributes,P = u.indices,w = d,S = D.IntersectionTests.lineSegmentPlane(v,c,ve,ue);V.defined(S) ? (m = R.Cartesian3.multiplyByScalar(R.Cartesian3.UNIT_Y,5 * L.CesiumMath.EPSILON9,ce),v.y < 0 && (R.Cartesian3.negate(m,m),g = u.attributes,A = u.indices,T = d,x = o.attributes,P = o.indices,w = l),C = R.Cartesian3.add(S,m,me),Ce(y,f,v,n,le(g,A,T,s,t,v),g,i),Ce(y,f,C,n,le(g,A,T,s,-1,C),g,i),R.Cartesian3.negate(m,m),R.Cartesian3.add(S,m,C),Ce(y,f,C,n,le(x,P,w,s,-1,C),x,i),Ce(y,f,c,n,le(x,P,w,s,t + 1,c),x,i)) : (x = v.y < 0 ? (h = u.attributes,b = u.indices,d) : (h = o.attributes,b = o.indices,l),Ce(y,f,v,n,le(h,b,x,s,t,v),h,i),Ce(y,f,c,n,le(h,b,x,s,t + 1,c),h,i));
}ee(e,u,o);
}var be = new R.Cartesian2,ge = new R.Cartesian2,Ae = new R.Cartesian3,Te = new R.Cartesian3,xe = new R.Cartesian3,Pe = new R.Cartesian3,we = new R.Cartesian3,Se = new R.Cartesian3,Ie = new z.Cartesian4;function Oe(e){
for(var e = e.attributes,t = e.position.values,r = e.prevPosition.values,a = e.nextPosition.values,n = t.length,i = 0;i < n;i += 3){
var s,o = R.Cartesian3.unpack(t,i,Ae);0 < o.x || (s = R.Cartesian3.unpack(r,i,Te),(o.y < 0 && 0 < s.y || 0 < o.y && s.y < 0) && (0 < i - 3 ? (r[i] = t[i - 3],r[i + 1] = t[i - 2],r[i + 2] = t[i - 1]) : R.Cartesian3.pack(o,r,i)),s = R.Cartesian3.unpack(a,i,xe),(o.y < 0 && 0 < s.y || 0 < o.y && s.y < 0) && (i + 3 < n ? (a[i] = t[i + 3],a[i + 1] = t[i + 4],a[i + 2] = t[i + 5]) : R.Cartesian3.pack(o,a,i)));
}
}var Ee = 5 * L.CesiumMath.EPSILON9,Ne = L.CesiumMath.EPSILON6;r.splitLongitude = function(e){
var t = e.geometry,r = t.boundingSphere;if(V.defined(r) && (0 < r.center.x - r.radius || z.BoundingSphere.intersectPlane(r,a.Plane.ORIGIN_ZX_PLANE) !== z.Intersect.INTERSECTING))return e;if(t.geometryType !== S.GeometryType.NONE)switch(t.geometryType){
case S.GeometryType.POLYLINES:!function(e){
for(var t = e.geometry,r = t.attributes,a = r.position.values,n = r.prevPosition.values,i = r.nextPosition.values,s = r.expandAndWidth.values,o = V.defined(r.st) ? r.st.values : void 0,u = V.defined(r.color) ? r.color.values : void 0,p = $(t),d = $(t),l = !1,y = a.length / 3,f = 0;f < y;f += 4){
var v = f,c = f + 2,m = R.Cartesian3.fromArray(a,3 * v,Ae),C = R.Cartesian3.fromArray(a,3 * c,Te);if(Math.abs(m.y) < Ne)for(m.y = Ne * (C.y < 0 ? -1 : 1),a[3 * f + 1] = m.y,a[3 * (f + 1) + 1] = m.y,O = 3 * v;O < 3 * v + 12;O += 3)n[O] = a[3 * f],n[O + 1] = a[3 * f + 1],n[O + 2] = a[3 * f + 2];if(Math.abs(C.y) < Ne)for(C.y = Ne * (m.y < 0 ? -1 : 1),a[3 * (f + 2) + 1] = C.y,a[3 * (f + 3) + 1] = C.y,O = 3 * v;O < 3 * v + 12;O += 3)i[O] = a[3 * (f + 2)],i[O + 1] = a[3 * (f + 2) + 1],i[O + 2] = a[3 * (f + 2) + 2];var h = p.attributes,b = p.indices,g = d.attributes,A = d.indices,T = D.IntersectionTests.lineSegmentPlane(m,C,ve,Pe);if(V.defined(T)){
var l = !0,x = R.Cartesian3.multiplyByScalar(R.Cartesian3.UNIT_Y,Ee,we);m.y < 0 && (R.Cartesian3.negate(x,x),h = d.attributes,b = d.indices,g = p.attributes,A = p.indices);var P = R.Cartesian3.add(T,x,Se);h.position.values.push(m.x,m.y,m.z,m.x,m.y,m.z),h.position.values.push(P.x,P.y,P.z),h.position.values.push(P.x,P.y,P.z),h.prevPosition.values.push(n[3 * v],n[3 * v + 1],n[3 * v + 2]),h.prevPosition.values.push(n[3 * v + 3],n[3 * v + 4],n[3 * v + 5]),h.prevPosition.values.push(m.x,m.y,m.z,m.x,m.y,m.z),h.nextPosition.values.push(P.x,P.y,P.z),h.nextPosition.values.push(P.x,P.y,P.z),h.nextPosition.values.push(P.x,P.y,P.z),h.nextPosition.values.push(P.x,P.y,P.z),R.Cartesian3.negate(x,x),R.Cartesian3.add(T,x,P),g.position.values.push(P.x,P.y,P.z),g.position.values.push(P.x,P.y,P.z),g.position.values.push(C.x,C.y,C.z,C.x,C.y,C.z),g.prevPosition.values.push(P.x,P.y,P.z),g.prevPosition.values.push(P.x,P.y,P.z),g.prevPosition.values.push(P.x,P.y,P.z),g.prevPosition.values.push(P.x,P.y,P.z),g.nextPosition.values.push(C.x,C.y,C.z,C.x,C.y,C.z),g.nextPosition.values.push(i[3 * c],i[3 * c + 1],i[3 * c + 2]),g.nextPosition.values.push(i[3 * c + 3],i[3 * c + 4],i[3 * c + 5]);var w = R.Cartesian2.fromArray(s,2 * v,be),S = Math.abs(w.y);h.expandAndWidth.values.push(-1,S,1,S),h.expandAndWidth.values.push(-1,-S,1,-S),g.expandAndWidth.values.push(-1,S,1,S),g.expandAndWidth.values.push(-1,-S,1,-S);x = R.Cartesian3.magnitudeSquared(R.Cartesian3.subtract(T,m,xe));if(x /= R.Cartesian3.magnitudeSquared(R.Cartesian3.subtract(C,m,xe)),V.defined(u)){
for(var P = z.Cartesian4.fromArray(u,4 * v,Ie),I = z.Cartesian4.fromArray(u,4 * c,Ie),w = L.CesiumMath.lerp(P.x,I.x,x),S = L.CesiumMath.lerp(P.y,I.y,x),T = L.CesiumMath.lerp(P.z,I.z,x),I = L.CesiumMath.lerp(P.w,I.w,x),O = 4 * v;O < 4 * v + 8;++O)h.color.values.push(u[O]);for(h.color.values.push(w,S,T,I),h.color.values.push(w,S,T,I),g.color.values.push(w,S,T,I),g.color.values.push(w,S,T,I),O = 4 * c;O < 4 * c + 8;++O)g.color.values.push(u[O]);
}if(V.defined(o)){
var I = R.Cartesian2.fromArray(o,2 * v,be),E = R.Cartesian2.fromArray(o,2 * (f + 3),ge),x = L.CesiumMath.lerp(I.x,E.x,x);for(O = 2 * v;O < 2 * v + 4;++O)h.st.values.push(o[O]);for(h.st.values.push(x,I.y),h.st.values.push(x,E.y),g.st.values.push(x,I.y),g.st.values.push(x,E.y),O = 2 * c;O < 2 * c + 4;++O)g.st.values.push(o[O]);
}E = h.position.values.length / 3 - 4,b.push(E,E + 2,E + 1),b.push(E + 1,E + 2,E + 3),E = g.position.values.length / 3 - 4,A.push(E,E + 2,E + 1),A.push(E + 1,E + 2,E + 3);
}else{
var N,A = m.y < 0 ? (N = d.attributes,d.indices) : (N = p.attributes,p.indices);for(N.position.values.push(m.x,m.y,m.z),N.position.values.push(m.x,m.y,m.z),N.position.values.push(C.x,C.y,C.z),N.position.values.push(C.x,C.y,C.z),O = 3 * f;O < 3 * f + 12;++O)N.prevPosition.values.push(n[O]),N.nextPosition.values.push(i[O]);for(O = 2 * f;O < 2 * f + 8;++O)N.expandAndWidth.values.push(s[O]),V.defined(o) && N.st.values.push(o[O]);if(V.defined(u))for(O = 4 * f;O < 4 * f + 16;++O)N.color.values.push(u[O]);E = N.position.values.length / 3 - 4,A.push(E,E + 2,E + 1),A.push(E + 1,E + 2,E + 3);
}
}l && (Oe(d),Oe(p)),ee(e,d,p);
}(e);break;case S.GeometryType.TRIANGLES:fe(e);break;case S.GeometryType.LINES:he(e);
}else C(t),t.primitiveType === S.PrimitiveType.TRIANGLES ? fe(e) : t.primitiveType === S.PrimitiveType.LINES && he(e);return e;
},e.GeometryPipeline = r;
});

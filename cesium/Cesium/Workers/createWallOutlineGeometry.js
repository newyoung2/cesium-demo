define(["./when-54c2dc71","./Check-6c0211bc","./Math-fc8cecf5","./Cartesian2-d1adddcb","./Transforms-ea828842","./RuntimeError-2109023a","./WebGLConstants-76bb35d1","./ComponentDatatype-6d99a1ee","./GeometryAttribute-618451c9","./GeometryAttributes-4fcfcf40","./IndexDatatype-53503fee","./IntersectionTests-43aa431f","./Plane-0cab2b36","./EllipsoidTangentPlane-6135b6f5","./EllipsoidRhumbLine-8b165373","./PolygonPipeline-7bd8d933","./EllipsoidGeodesic-a4f6440a","./PolylinePipeline-7574302f","./WallGeometryLibrary-a6e43643"],function(P,e,G,L,x,i,t,T,V,D,I,a,n,r,o,s,l,d,S){"use strict";var R=new L.Cartesian3,M=new L.Cartesian3;function m(e){var i=(e=P.defaultValue(e,P.defaultValue.EMPTY_OBJECT)).positions,t=e.maximumHeights,a=e.minimumHeights,n=P.defaultValue(e.granularity,G.CesiumMath.RADIANS_PER_DEGREE),r=P.defaultValue(e.ellipsoid,L.Ellipsoid.WGS84);this._positions=i,this._minimumHeights=a,this._maximumHeights=t,this._granularity=n,this._ellipsoid=L.Ellipsoid.clone(r),this._workerName="createWallOutlineGeometry";var o=1+i.length*L.Cartesian3.packedLength+2;P.defined(a)&&(o+=a.length),P.defined(t)&&(o+=t.length),this.packedLength=o+L.Ellipsoid.packedLength+1}m.pack=function(e,i,t){var a;t=P.defaultValue(t,0);var n=e._positions,r=n.length;for(i[t++]=r,a=0;a<r;++a,t+=L.Cartesian3.packedLength)L.Cartesian3.pack(n[a],i,t);var o=e._minimumHeights,r=P.defined(o)?o.length:0;if(i[t++]=r,P.defined(o))for(a=0;a<r;++a)i[t++]=o[a];var s=e._maximumHeights;if(r=P.defined(s)?s.length:0,i[t++]=r,P.defined(s))for(a=0;a<r;++a)i[t++]=s[a];return L.Ellipsoid.pack(e._ellipsoid,i,t),i[t+=L.Ellipsoid.packedLength]=e._granularity,i};var u=L.Ellipsoid.clone(L.Ellipsoid.UNIT_SPHERE),p={positions:void 0,minimumHeights:void 0,maximumHeights:void 0,ellipsoid:u,granularity:void 0};return m.unpack=function(e,i,t){i=P.defaultValue(i,0);for(var a,n,r=e[i++],o=new Array(r),s=0;s<r;++s,i+=L.Cartesian3.packedLength)o[s]=L.Cartesian3.unpack(e,i);if(0<(r=e[i++]))for(a=new Array(r),s=0;s<r;++s)a[s]=e[i++];if(0<(r=e[i++]))for(n=new Array(r),s=0;s<r;++s)n[s]=e[i++];var l=L.Ellipsoid.unpack(e,i,u),d=e[i+=L.Ellipsoid.packedLength];return P.defined(t)?(t._positions=o,t._minimumHeights=a,t._maximumHeights=n,t._ellipsoid=L.Ellipsoid.clone(l,t._ellipsoid),t._granularity=d,t):(p.positions=o,p.minimumHeights=a,p.maximumHeights=n,p.granularity=d,new m(p))},m.fromConstantHeights=function(e){var i=(e=P.defaultValue(e,P.defaultValue.EMPTY_OBJECT)).positions,t=e.minimumHeight,a=e.maximumHeight,n=P.defined(t),r=P.defined(a);if(n||r)for(var o=i.length,s=n?new Array(o):void 0,l=r?new Array(o):void 0,d=0;d<o;++d)n&&(s[d]=t),r&&(l[d]=a);return new m({positions:i,maximumHeights:l,minimumHeights:s,ellipsoid:e.ellipsoid})},m.createGeometry=function(e){var i=e._positions,t=e._minimumHeights,a=e._maximumHeights,n=e._granularity,r=e._ellipsoid,o=S.WallGeometryLibrary.computePositions(r,i,a,t,n,!1);if(P.defined(o)){var s=o.bottomPositions,l=o.topPositions,d=l.length,m=2*d,u=new Float64Array(m),p=0;for(d/=3,v=0;v<d;++v){var f=3*v,c=L.Cartesian3.fromArray(l,f,R),h=L.Cartesian3.fromArray(s,f,M);u[p++]=h.x,u[p++]=h.y,u[p++]=h.z,u[p++]=c.x,u[p++]=c.y,u[p++]=c.z}for(var g=new D.GeometryAttributes({position:new V.GeometryAttribute({componentDatatype:T.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:u})}),y=m/3,m=2*y-4+y,E=I.IndexDatatype.createTypedArray(y,m),_=0,v=0;v<y-2;v+=2){var C,b,H=v,A=v+2,k=L.Cartesian3.fromArray(u,3*H,R),w=L.Cartesian3.fromArray(u,3*A,M);L.Cartesian3.equalsEpsilon(k,w,G.CesiumMath.EPSILON10)||(C=v+1,b=v+3,E[_++]=C,E[_++]=H,E[_++]=C,E[_++]=b,E[_++]=H,E[_++]=A)}return E[_++]=y-2,E[_++]=y-1,new V.Geometry({attributes:g,indices:E,primitiveType:V.PrimitiveType.LINES,boundingSphere:new x.BoundingSphere.fromVertices(u)})}},function(e,i){return P.defined(i)&&(e=m.unpack(e,i)),e._ellipsoid=L.Ellipsoid.clone(e._ellipsoid),m.createGeometry(e)}});

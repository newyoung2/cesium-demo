define(["exports","./Math-4e53b694"],function(r,d){
"use strict";var t = {computePositions: function(r,t,e,a,i){
for(var n = .5 * r,o = -n,r = a + a,s = new Float64Array(3 * (i ? 2 * r : r)),u = 0,c = 0,f = i ? 3 * r : 0,h = i ? 3 * (r + a) : 3 * a,y = 0;y < a;y++){
var M = y / a * d.CesiumMath.TWO_PI,m = Math.cos(M),v = Math.sin(M),b = m * e,M = v * e,m = m * t,v = v * t;s[c + f] = b,s[c + f + 1] = M,s[c + f + 2] = o,s[c + h] = m,s[c + h + 1] = v,s[c + h + 2] = n,c += 3,i && (s[u++] = b,s[u++] = M,s[u++] = o,s[u++] = m,s[u++] = v,s[u++] = n);
}return s;
}};r.CylinderGeometryLibrary = t;
});

define(["exports","./Check-d18af7c4","./when-208fe5b0","./Math-4e53b694"],function(e,t,h,r){
"use strict";var l = r.CesiumMath.EPSILON10;e.arrayRemoveDuplicates = function(e,t,r){
if(h.defined(e)){
r = h.defaultValue(r,!1);var n,f,i,a = e.length;if(a < 2)return e;for(n = 1;n < a && !t(f = e[n - 1],i = e[n],l);++n);if(n === a)return r && t(e[0],e[e.length - 1],l) ? e.slice(1) : e;for(var u = e.slice(0,n);n < a;++n)t(f,i = e[n],l) || (u.push(i),f = i);return r && 1 < u.length && t(u[0],u[u.length - 1],l) && u.shift(),u;
}
};
});

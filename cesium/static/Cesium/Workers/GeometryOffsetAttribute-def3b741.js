define(["exports","./Check-d18af7c4","./when-208fe5b0"],function(e,t,l){
"use strict";var f = Object.freeze({NONE: 0,TOP: 1,ALL: 2});e.GeometryOffsetAttribute = f,e.arrayFill = function(e,t,f,a){
if("function" == typeof e.fill)return e.fill(t,f,a);for(var r = e.length >>> 0,n = (f = l.defaultValue(f,0)) < 0 ? Math.max(r + f,0) : Math.min(f,r),i = (a = l.defaultValue(a,r)) < 0 ? Math.max(r + a,0) : Math.min(a,r);n < i;)e[n] = t,n++;return e;
};
});

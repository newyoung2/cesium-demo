define(["exports","./when-208fe5b0","./Check-d18af7c4"],function(e,o,t){
"use strict";function a(e){
e = o.defaultValue(e,o.defaultValue.EMPTY_OBJECT),this.position = o.defaultValue(e.position,!1),this.normal = o.defaultValue(e.normal,!1),this.st = o.defaultValue(e.st,!1),this.bitangent = o.defaultValue(e.bitangent,!1),this.tangent = o.defaultValue(e.tangent,!1),this.color = o.defaultValue(e.color,!1);
}a.POSITION_ONLY = Object.freeze(new a({position: !0})),a.POSITION_AND_NORMAL = Object.freeze(new a({position: !0,normal: !0})),a.POSITION_NORMAL_AND_ST = Object.freeze(new a({position: !0,normal: !0,st: !0})),a.POSITION_AND_ST = Object.freeze(new a({position: !0,st: !0})),a.POSITION_AND_COLOR = Object.freeze(new a({position: !0,color: !0})),a.ALL = Object.freeze(new a({position: !0,normal: !0,st: !0,tangent: !0,bitangent: !0})),a.DEFAULT = a.POSITION_NORMAL_AND_ST,a.packedLength = 6,a.pack = function(e,t,n){
return n = o.defaultValue(n,0),t[n++] = e.position ? 1 : 0,t[n++] = e.normal ? 1 : 0,t[n++] = e.st ? 1 : 0,t[n++] = e.tangent ? 1 : 0,t[n++] = e.bitangent ? 1 : 0,t[n] = e.color ? 1 : 0,t;
},a.unpack = function(e,t,n){
return t = o.defaultValue(t,0),(n = !o.defined(n) ? new a : n).position = 1 === e[t++],n.normal = 1 === e[t++],n.st = 1 === e[t++],n.tangent = 1 === e[t++],n.bitangent = 1 === e[t++],n.color = 1 === e[t],n;
},a.clone = function(e,t){
if(o.defined(e))return(t = !o.defined(t) ? new a : t).position = e.position,t.normal = e.normal,t.st = e.st,t.tangent = e.tangent,t.bitangent = e.bitangent,t.color = e.color,t;
},e.VertexFormat = a;
});

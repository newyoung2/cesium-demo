define(["./when-208fe5b0"],function(f){
"use strict";return function(r){
var o;return function(e){
var s = e.data,a = [],i = {id: s.id,result: void 0,error: void 0};return f.when(function(e,r,n){
try{
return e(r,n);
}catch(e){
return f.when.reject(e);
}
}(r,s.parameters,a)).then(function(e){
i.result = e;
}).otherwise(function(e){
e instanceof Error ? i.error = {name: e.name,message: e.message,stack: e.stack} : i.error = e;
}).always(function(){
f.defined(o) || (o = f.defaultValue(self.webkitPostMessage,self.postMessage)),s.canTransferArrayBuffer || (a.length = 0);try{
o(i,a);
}catch(e){
i.result = void 0,i.error = "postMessage failed with error: " + (n = (r = e).name,t = r.message,t = f.defined(n) && f.defined(t) ? n + ": " + t : r.toString(),r = r.stack,f.defined(r) && (t += "\n" + r),t) + "\n  with responseMessage: " + JSON.stringify(i),o(i);
}var r,n,t;
});
};
};
});

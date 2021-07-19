define(["./when-208fe5b0","./WebGLConstants-76bb35d1","./RuntimeError-7f634f5d","./createTaskProcessorWorker"],function(when,WebGLConstants,RuntimeError,createTaskProcessorWorker){
"use strict";function CompressedTextureBuffer(e,r,t,n){
this._format = e,this._width = r,this._height = t,this._buffer = n;
}Object.defineProperties(CompressedTextureBuffer.prototype,{internalFormat: {get: function(){
return this._format;
}},width: {get: function(){
return this._width;
}},height: {get: function(){
return this._height;
}},bufferView: {get: function(){
return this._buffer;
}}}),CompressedTextureBuffer.clone = function(e){
if(when.defined(e))return new CompressedTextureBuffer(e._format,e._width,e._height,e._buffer);
},CompressedTextureBuffer.prototype.clone = function(){
return CompressedTextureBuffer.clone(this);
};var PixelDatatype = {UNSIGNED_BYTE: WebGLConstants.WebGLConstants.UNSIGNED_BYTE,UNSIGNED_SHORT: WebGLConstants.WebGLConstants.UNSIGNED_SHORT,UNSIGNED_INT: WebGLConstants.WebGLConstants.UNSIGNED_INT,FLOAT: WebGLConstants.WebGLConstants.FLOAT,HALF_FLOAT: WebGLConstants.WebGLConstants.HALF_FLOAT_OES,UNSIGNED_INT_24_8: WebGLConstants.WebGLConstants.UNSIGNED_INT_24_8,UNSIGNED_SHORT_4_4_4_4: WebGLConstants.WebGLConstants.UNSIGNED_SHORT_4_4_4_4,UNSIGNED_SHORT_5_5_5_1: WebGLConstants.WebGLConstants.UNSIGNED_SHORT_5_5_5_1,UNSIGNED_SHORT_5_6_5: WebGLConstants.WebGLConstants.UNSIGNED_SHORT_5_6_5,toWebGLConstant: function(e,r){
switch(e){
case PixelDatatype.UNSIGNED_BYTE:return WebGLConstants.WebGLConstants.UNSIGNED_BYTE;case PixelDatatype.UNSIGNED_SHORT:return WebGLConstants.WebGLConstants.UNSIGNED_SHORT;case PixelDatatype.UNSIGNED_INT:return WebGLConstants.WebGLConstants.UNSIGNED_INT;case PixelDatatype.FLOAT:return WebGLConstants.WebGLConstants.FLOAT;case PixelDatatype.HALF_FLOAT:return r.webgl2 ? WebGLConstants.WebGLConstants.HALF_FLOAT : WebGLConstants.WebGLConstants.HALF_FLOAT_OES;case PixelDatatype.UNSIGNED_INT_24_8:return WebGLConstants.WebGLConstants.UNSIGNED_INT_24_8;case PixelDatatype.UNSIGNED_SHORT_4_4_4_4:return WebGLConstants.WebGLConstants.UNSIGNED_SHORT_4_4_4_4;case PixelDatatype.UNSIGNED_SHORT_5_5_5_1:return WebGLConstants.WebGLConstants.UNSIGNED_SHORT_5_5_5_1;case PixelDatatype.UNSIGNED_SHORT_5_6_5:return PixelDatatype.UNSIGNED_SHORT_5_6_5;
}
},isPacked: function(e){
return e === PixelDatatype.UNSIGNED_INT_24_8 || e === PixelDatatype.UNSIGNED_SHORT_4_4_4_4 || e === PixelDatatype.UNSIGNED_SHORT_5_5_5_1 || e === PixelDatatype.UNSIGNED_SHORT_5_6_5;
},sizeInBytes: function(e){
switch(e){
case PixelDatatype.UNSIGNED_BYTE:return 1;case PixelDatatype.UNSIGNED_SHORT:case PixelDatatype.UNSIGNED_SHORT_4_4_4_4:case PixelDatatype.UNSIGNED_SHORT_5_5_5_1:case PixelDatatype.UNSIGNED_SHORT_5_6_5:case PixelDatatype.HALF_FLOAT:return 2;case PixelDatatype.UNSIGNED_INT:case PixelDatatype.FLOAT:case PixelDatatype.UNSIGNED_INT_24_8:return 4;
}
},validate: function(e){
return e === PixelDatatype.UNSIGNED_BYTE || e === PixelDatatype.UNSIGNED_SHORT || e === PixelDatatype.UNSIGNED_INT || e === PixelDatatype.FLOAT || e === PixelDatatype.HALF_FLOAT || e === PixelDatatype.UNSIGNED_INT_24_8 || e === PixelDatatype.UNSIGNED_SHORT_4_4_4_4 || e === PixelDatatype.UNSIGNED_SHORT_5_5_5_1 || e === PixelDatatype.UNSIGNED_SHORT_5_6_5;
}},PixelDatatype$1 = Object.freeze(PixelDatatype),PixelFormat = {DEPTH_COMPONENT: WebGLConstants.WebGLConstants.DEPTH_COMPONENT,DEPTH_STENCIL: WebGLConstants.WebGLConstants.DEPTH_STENCIL,ALPHA: WebGLConstants.WebGLConstants.ALPHA,RGB: WebGLConstants.WebGLConstants.RGB,RGBA: WebGLConstants.WebGLConstants.RGBA,LUMINANCE: WebGLConstants.WebGLConstants.LUMINANCE,LUMINANCE_ALPHA: WebGLConstants.WebGLConstants.LUMINANCE_ALPHA,RGB_DXT1: WebGLConstants.WebGLConstants.COMPRESSED_RGB_S3TC_DXT1_EXT,RGBA_DXT1: WebGLConstants.WebGLConstants.COMPRESSED_RGBA_S3TC_DXT1_EXT,RGBA_DXT3: WebGLConstants.WebGLConstants.COMPRESSED_RGBA_S3TC_DXT3_EXT,RGBA_DXT5: WebGLConstants.WebGLConstants.COMPRESSED_RGBA_S3TC_DXT5_EXT,RGB_PVRTC_4BPPV1: WebGLConstants.WebGLConstants.COMPRESSED_RGB_PVRTC_4BPPV1_IMG,RGB_PVRTC_2BPPV1: WebGLConstants.WebGLConstants.COMPRESSED_RGB_PVRTC_2BPPV1_IMG,RGBA_PVRTC_4BPPV1: WebGLConstants.WebGLConstants.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG,RGBA_PVRTC_2BPPV1: WebGLConstants.WebGLConstants.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG,RGB_ETC1: WebGLConstants.WebGLConstants.COMPRESSED_RGB_ETC1_WEBGL,componentsLength: function(e){
switch(e){
case PixelFormat.RGB:return 3;case PixelFormat.RGBA:return 4;case PixelFormat.LUMINANCE_ALPHA:return 2;case PixelFormat.ALPHA:case PixelFormat.LUMINANCE:default:return 1;
}
},validate: function(e){
return e === PixelFormat.DEPTH_COMPONENT || e === PixelFormat.DEPTH_STENCIL || e === PixelFormat.ALPHA || e === PixelFormat.RGB || e === PixelFormat.RGBA || e === PixelFormat.LUMINANCE || e === PixelFormat.LUMINANCE_ALPHA || e === PixelFormat.RGB_DXT1 || e === PixelFormat.RGBA_DXT1 || e === PixelFormat.RGBA_DXT3 || e === PixelFormat.RGBA_DXT5 || e === PixelFormat.RGB_PVRTC_4BPPV1 || e === PixelFormat.RGB_PVRTC_2BPPV1 || e === PixelFormat.RGBA_PVRTC_4BPPV1 || e === PixelFormat.RGBA_PVRTC_2BPPV1 || e === PixelFormat.RGB_ETC1;
},isColorFormat: function(e){
return e === PixelFormat.ALPHA || e === PixelFormat.RGB || e === PixelFormat.RGBA || e === PixelFormat.LUMINANCE || e === PixelFormat.LUMINANCE_ALPHA;
},isDepthFormat: function(e){
return e === PixelFormat.DEPTH_COMPONENT || e === PixelFormat.DEPTH_STENCIL;
},isCompressedFormat: function(e){
return e === PixelFormat.RGB_DXT1 || e === PixelFormat.RGBA_DXT1 || e === PixelFormat.RGBA_DXT3 || e === PixelFormat.RGBA_DXT5 || e === PixelFormat.RGB_PVRTC_4BPPV1 || e === PixelFormat.RGB_PVRTC_2BPPV1 || e === PixelFormat.RGBA_PVRTC_4BPPV1 || e === PixelFormat.RGBA_PVRTC_2BPPV1 || e === PixelFormat.RGB_ETC1;
},isDXTFormat: function(e){
return e === PixelFormat.RGB_DXT1 || e === PixelFormat.RGBA_DXT1 || e === PixelFormat.RGBA_DXT3 || e === PixelFormat.RGBA_DXT5;
},isPVRTCFormat: function(e){
return e === PixelFormat.RGB_PVRTC_4BPPV1 || e === PixelFormat.RGB_PVRTC_2BPPV1 || e === PixelFormat.RGBA_PVRTC_4BPPV1 || e === PixelFormat.RGBA_PVRTC_2BPPV1;
},isETC1Format: function(e){
return e === PixelFormat.RGB_ETC1;
},compressedTextureSizeInBytes: function(e,r,t){
switch(e){
case PixelFormat.RGB_DXT1:case PixelFormat.RGBA_DXT1:case PixelFormat.RGB_ETC1:return Math.floor((r + 3) / 4) * Math.floor((t + 3) / 4) * 8;case PixelFormat.RGBA_DXT3:case PixelFormat.RGBA_DXT5:return Math.floor((r + 3) / 4) * Math.floor((t + 3) / 4) * 16;case PixelFormat.RGB_PVRTC_4BPPV1:case PixelFormat.RGBA_PVRTC_4BPPV1:return Math.floor((Math.max(r,8) * Math.max(t,8) * 4 + 7) / 8);case PixelFormat.RGB_PVRTC_2BPPV1:case PixelFormat.RGBA_PVRTC_2BPPV1:return Math.floor((Math.max(r,16) * Math.max(t,8) * 2 + 7) / 8);default:return 0;
}
},textureSizeInBytes: function(e,r,t,n){
e = PixelFormat.componentsLength(e);return(e = PixelDatatype$1.isPacked(r) ? 1 : e) * PixelDatatype$1.sizeInBytes(r) * t * n;
},alignmentInBytes: function(e,r,t){
t = PixelFormat.textureSizeInBytes(e,r,t,1) % 4;return 0 == t ? 4 : 2 == t ? 2 : 1;
},createTypedArray: function(e,r,t,n){
var i = PixelDatatype$1.sizeInBytes(r),r = i === Uint8Array.BYTES_PER_ELEMENT ? Uint8Array : i === Uint16Array.BYTES_PER_ELEMENT ? Uint16Array : i === Float32Array.BYTES_PER_ELEMENT && r === PixelDatatype$1.FLOAT ? Float32Array : Uint32Array;return new r(PixelFormat.componentsLength(e) * t * n);
},flipY: function(e,r,t,n,i){
if(1 === i)return e;for(var a = PixelFormat.createTypedArray(r,t,n,i),o = PixelFormat.componentsLength(r),u = n * o,f = 0;f < i;++f)for(var l = f * n * o,s = (i - f - 1) * n * o,c = 0;c < u;++c)a[s + c] = e[l + c];return a;
},toInternalFormat: function(e,r,t){
if(!t.webgl2)return e;if(e === PixelFormat.DEPTH_STENCIL)return WebGLConstants.WebGLConstants.DEPTH24_STENCIL8;if(e === PixelFormat.DEPTH_COMPONENT){
if(r === PixelDatatype$1.UNSIGNED_SHORT)return WebGLConstants.WebGLConstants.DEPTH_COMPONENT16;if(r === PixelDatatype$1.UNSIGNED_INT)return WebGLConstants.WebGLConstants.DEPTH_COMPONENT24;
}if(r === PixelDatatype$1.FLOAT)switch(e){
case PixelFormat.RGBA:return WebGLConstants.WebGLConstants.RGBA32F;case PixelFormat.RGB:return WebGLConstants.WebGLConstants.RGB32F;case PixelFormat.RG:return WebGLConstants.WebGLConstants.RG32F;case PixelFormat.R:return WebGLConstants.WebGLConstants.R32F;
}if(r === PixelDatatype$1.HALF_FLOAT)switch(e){
case PixelFormat.RGBA:return WebGLConstants.WebGLConstants.RGBA16F;case PixelFormat.RGB:return WebGLConstants.WebGLConstants.RGB16F;case PixelFormat.RG:return WebGLConstants.WebGLConstants.RG16F;case PixelFormat.R:return WebGLConstants.WebGLConstants.R16F;
}return e;
}},PixelFormat$1 = Object.freeze(PixelFormat),Module,Module = Module || ((void 0 !== Module ? Module : null) || {}),moduleOverrides = {},key;for(key in Module)Module.hasOwnProperty(key) && (moduleOverrides[key] = Module[key]);var ENVIRONMENT_IS_WEB = !1,ENVIRONMENT_IS_WORKER = !1,ENVIRONMENT_IS_NODE = !1,ENVIRONMENT_IS_SHELL = !1,nodeFS,nodePath,TRY_USE_DUMP,key;if(Module.ENVIRONMENT)if("WEB" === Module.ENVIRONMENT)ENVIRONMENT_IS_WEB = !0;else if("WORKER" === Module.ENVIRONMENT)ENVIRONMENT_IS_WORKER = !0;else if("NODE" === Module.ENVIRONMENT)ENVIRONMENT_IS_NODE = !0;else{
if("SHELL" !== Module.ENVIRONMENT)throw new Error("The provided Module['ENVIRONMENT'] value is not valid. It must be one of: WEB|WORKER|NODE|SHELL.");ENVIRONMENT_IS_SHELL = !0;
}else ENVIRONMENT_IS_WEB = "object" == typeof window,ENVIRONMENT_IS_WORKER = "function" == typeof importScripts,ENVIRONMENT_IS_NODE = "object" == typeof process && "function" == typeof require && !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER,ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;if(ENVIRONMENT_IS_NODE)Module.print || (Module.print = console.log),Module.printErr || (Module.printErr = console.warn),Module.read = function(e,r){
nodeFS = nodeFS || require("fs"),e = (nodePath = nodePath || require("path")).normalize(e);e = nodeFS.readFileSync(e);return r ? e : e.toString();
},Module.readBinary = function(e){
e = Module.read(e,!0);return assert((e = !e.buffer ? new Uint8Array(e) : e).buffer),e;
},Module.load = function(e){
globalEval(read(e));
},Module.thisProgram || (1 < process.argv.length ? Module.thisProgram = process.argv[1].replace(/\\/g,"/") : Module.thisProgram = "unknown-program"),Module.arguments = process.argv.slice(2),"undefined" != typeof module && (module.exports = Module),process.on("uncaughtException",function(e){
if(!(e instanceof ExitStatus))throw e;
}),Module.inspect = function(){
return"[Emscripten Module object]";
};else if(ENVIRONMENT_IS_SHELL)Module.print || (Module.print = print),"undefined" != typeof printErr && (Module.printErr = printErr),"undefined" != typeof read ? Module.read = read : Module.read = function(){
throw"no read() available";
},Module.readBinary = function(e){
if("function" == typeof readbuffer)return new Uint8Array(readbuffer(e));e = read(e,"binary");return assert("object" == typeof e),e;
},"undefined" != typeof scriptArgs ? Module.arguments = scriptArgs : void 0 !== arguments && (Module.arguments = arguments),"function" == typeof quit && (Module.quit = function(e,r){
quit(e);
});else{
if(!ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER)throw"Unknown runtime environment. Where are we?";Module.read = function(e){
var r = new XMLHttpRequest;return r.open("GET",e,!1),r.send(null),r.responseText;
},ENVIRONMENT_IS_WORKER && (Module.readBinary = function(e){
var r = new XMLHttpRequest;return r.open("GET",e,!1),r.responseType = "arraybuffer",r.send(null),new Uint8Array(r.response);
}),Module.readAsync = function(e,r,t){
var n = new XMLHttpRequest;n.open("GET",e,!0),n.responseType = "arraybuffer",n.onload = function(){
200 == n.status || 0 == n.status && n.response ? r(n.response) : t();
},n.onerror = t,n.send(null);
},void 0 !== arguments && (Module.arguments = arguments),"undefined" != typeof console ? (Module.print || (Module.print = function(e){
console.log(e);
}),Module.printErr || (Module.printErr = function(e){
console.warn(e);
})) : (TRY_USE_DUMP = !1,Module.print || (Module.print = TRY_USE_DUMP && "undefined" != typeof dump ? function(e){
dump(e);
} : function(e){})),ENVIRONMENT_IS_WORKER && (Module.load = importScripts),void 0 === Module.setWindowTitle && (Module.setWindowTitle = function(e){
document.title = e;
});
}function globalEval(e){
eval.call(null,e);
}for(key in!Module.load && Module.read && (Module.load = function(e){
globalEval(Module.read(e));
}),Module.print || (Module.print = function(){}),Module.printErr || (Module.printErr = Module.print),Module.arguments || (Module.arguments = []),Module.thisProgram || (Module.thisProgram = "./this.program"),Module.quit || (Module.quit = function(e,r){
throw r;
}),Module.print = Module.print,Module.printErr = Module.printErr,Module.preRun = [],Module.postRun = [],moduleOverrides)moduleOverrides.hasOwnProperty(key) && (Module[key] = moduleOverrides[key]);var moduleOverrides = void 0,Runtime = {setTempRet0: function(e){
return tempRet0 = e;
},getTempRet0: function(){
return tempRet0;
},stackSave: function(){
return STACKTOP;
},stackRestore: function(e){
STACKTOP = e;
},getNativeTypeSize: function(e){
switch(e){
case"i1":case"i8":return 1;case"i16":return 2;case"i32":return 4;case"i64":return 8;case"float":return 4;case"double":return 8;default:if("*" === e[e.length - 1])return Runtime.QUANTUM_SIZE;if("i" !== e[0])return 0;var r = parseInt(e.substr(1));return assert(r % 8 == 0),r / 8;
}
},getNativeFieldSize: function(e){
return Math.max(Runtime.getNativeTypeSize(e),Runtime.QUANTUM_SIZE);
},STACK_ALIGN: 16,prepVararg: function(e,r){
return"double" === r || "i64" === r ? 7 & e && (assert(4 == (7 & e)),e += 4) : assert(0 == (3 & e)),e;
},getAlignSize: function(e,r,t){
return t || "i64" != e && "double" != e ? e ? Math.min(r || (e ? Runtime.getNativeFieldSize(e) : 0),Runtime.QUANTUM_SIZE) : Math.min(r,8) : 8;
},dynCall: function(e,r,t){
return t && t.length ? Module["dynCall_" + e].apply(null,[r].concat(t)) : Module["dynCall_" + e].call(null,r);
},functionPointers: [],addFunction: function(e){
for(var r = 0;r < Runtime.functionPointers.length;r++)if(!Runtime.functionPointers[r])return Runtime.functionPointers[r] = e,2 * (1 + r);throw"Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.";
},removeFunction: function(e){
Runtime.functionPointers[(e - 2) / 2] = null;
},warnOnce: function(e){
Runtime.warnOnce.shown || (Runtime.warnOnce.shown = {}),Runtime.warnOnce.shown[e] || (Runtime.warnOnce.shown[e] = 1,Module.printErr(e));
},funcWrappers: {},getFuncWrapper: function(r,t){
assert(t),Runtime.funcWrappers[t] || (Runtime.funcWrappers[t] = {});var e = Runtime.funcWrappers[t];return e[r] || (1 === t.length ? e[r] = function(){
return Runtime.dynCall(t,r);
} : 2 === t.length ? e[r] = function(e){
return Runtime.dynCall(t,r,[e]);
} : e[r] = function(){
return Runtime.dynCall(t,r,Array.prototype.slice.call(arguments));
}),e[r];
},getCompilerSetting: function(e){
throw"You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work";
},stackAlloc: function(e){
var r = STACKTOP;return STACKTOP = (STACKTOP = STACKTOP + e | 0) + 15 & -16,r;
},staticAlloc: function(e){
var r = STATICTOP;return STATICTOP = (STATICTOP = STATICTOP + e | 0) + 15 & -16,r;
},dynamicAlloc: function(e){
var r = HEAP32[DYNAMICTOP_PTR >> 2],e = -16 & (r + e + 15 | 0);if((HEAP32[DYNAMICTOP_PTR >> 2] = e,TOTAL_MEMORY <= e) && !enlargeMemory())return HEAP32[DYNAMICTOP_PTR >> 2] = r,0;return r;
},alignMemory: function(e,r){
return e = Math.ceil(e / (r || 16)) * (r || 16);
},makeBigInt: function(e,r,t){
return t ? +(e >>> 0) + 4294967296 * (r >>> 0) : +(e >>> 0) + 4294967296 * (0 | r);
},GLOBAL_BASE: 8,QUANTUM_SIZE: 4,__dummy__: 0};Module.Runtime = Runtime;var ABORT = 0,cwrap,ccall;function assert(e,r){
e || abort("Assertion failed: " + r);
}function getCFunc(ident){
var func = Module["_" + ident];if(!func)try{
func = eval("_" + ident);
}catch(e){}return assert(func,"Cannot call unknown function " + ident + " (perhaps LLVM optimizations or closure removed it?)"),func;
}function setValue(e,r,t,n){
switch(t = "*" === (t = t || "i8").charAt(t.length - 1) ? "i32" : t){
case"i1":case"i8":HEAP8[e >> 0] = r;break;case"i16":HEAP16[e >> 1] = r;break;case"i32":HEAP32[e >> 2] = r;break;case"i64":tempI64 = [r >>> 0,(tempDouble = r,1 <= +Math_abs(tempDouble) ? 0 < tempDouble ? (0 | Math_min(+Math_floor(tempDouble / 4294967296),4294967295)) >>> 0 : ~~+Math_ceil((tempDouble - (~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)],HEAP32[e >> 2] = tempI64[0],HEAP32[e + 4 >> 2] = tempI64[1];break;case"float":HEAPF32[e >> 2] = r;break;case"double":HEAPF64[e >> 3] = r;break;default:abort("invalid type for setValue: " + t);
}
}function getValue(e,r,t){
switch(r = "*" === (r = r || "i8").charAt(r.length - 1) ? "i32" : r){
case"i1":case"i8":return HEAP8[e >> 0];case"i16":return HEAP16[e >> 1];case"i32":case"i64":return HEAP32[e >> 2];case"float":return HEAPF32[e >> 2];case"double":return HEAPF64[e >> 3];default:abort("invalid type for setValue: " + r);
}return null;
}!function(){
var JSfuncs = {stackSave: function(){
Runtime.stackSave();
},stackRestore: function(){
Runtime.stackRestore();
},arrayToC: function(e){
var r = Runtime.stackAlloc(e.length);return writeArrayToMemory(e,r),r;
},stringToC: function(e){
var r,t = 0;return null != e && 0 !== e && (r = 1 + (e.length << 2),stringToUTF8(e,t = Runtime.stackAlloc(r),r)),t;
}},toC = {string: JSfuncs.stringToC,array: JSfuncs.arrayToC};ccall = function(e,r,t,n,i){
var e = getCFunc(e),a = [],o = 0;if(n)for(var u = 0;u < n.length;u++){
var f = toC[t[u]];f ? (0 === o && (o = Runtime.stackSave()),a[u] = f(n[u])) : a[u] = n[u];
}e = e.apply(null,a);if("string" === r && (e = Pointer_stringify(e)),0 !== o){
if(i && i.async)return void EmterpreterAsync.asyncFinalizers.push(function(){
Runtime.stackRestore(o);
});Runtime.stackRestore(o);
}return e;
};var sourceRegex = /^function\s*[a-zA-Z$_0-9]*\s*\(([^)]*)\)\s*{\s*([^*]*?)[\s;]*(?:return\s*(.*?)[;\s]*)?}$/;function parseJSFunc(e){
e = e.toString().match(sourceRegex).slice(1);return{arguments: e[0],body: e[1],returnValue: e[2]};
}var JSsource = null;function ensureJSsource(){
if(!JSsource)for(var e in JSsource = {},JSfuncs)JSfuncs.hasOwnProperty(e) && (JSsource[e] = parseJSFunc(JSfuncs[e]));
}cwrap = function cwrap(ident,returnType,argTypes){
argTypes = argTypes || [];var cfunc = getCFunc(ident),numericArgs = argTypes.every(function(e){
return"number" === e;
}),numericRet = "string" !== returnType;if(numericRet && numericArgs)return cfunc;var argNames = argTypes.map(function(e,r){
return"$" + r;
}),funcstr = "(function(" + argNames.join(",") + ") {",nargs = argTypes.length;if(!numericArgs){
ensureJSsource(),funcstr += "var stack = " + JSsource.stackSave.body + ";";for(var i = 0;i < nargs;i++){
var arg = argNames[i],type = argTypes[i],convertCode;"number" !== type && (convertCode = JSsource[type + "ToC"],funcstr += "var " + convertCode.arguments + " = " + arg + ";",funcstr += convertCode.body + ";",funcstr += arg + "=(" + convertCode.returnValue + ");");
}
}var cfuncname = parseJSFunc(function(){
return cfunc;
}).returnValue,strgfy;return funcstr += "var ret = " + cfuncname + "(" + argNames.join(",") + ");",numericRet || (strgfy = parseJSFunc(function(){
return Pointer_stringify;
}).returnValue,funcstr += "ret = " + strgfy + "(ret);"),numericArgs || (ensureJSsource(),funcstr += JSsource.stackRestore.body.replace("()","(stack)") + ";"),funcstr += "return ret})",eval(funcstr);
};
}(),Module.ccall = ccall,Module.cwrap = cwrap,Module.setValue = setValue,Module.getValue = getValue;var ALLOC_NORMAL = 0,ALLOC_STACK = 1,ALLOC_STATIC = 2,ALLOC_DYNAMIC = 3,ALLOC_NONE = 4;function allocate(e,r,t,n){
var i,a = "number" == typeof e ? (i = !0,e) : (i = !1,e.length),o = "string" == typeof r ? r : null,u = t == ALLOC_NONE ? n : ["function" == typeof _malloc ? _malloc : Runtime.staticAlloc,Runtime.stackAlloc,Runtime.staticAlloc,Runtime.dynamicAlloc][void 0 === t ? ALLOC_STATIC : t](Math.max(a,o ? 1 : r.length));if(i){
var f,n = u;for(assert(0 == (3 & u)),f = u + (-4 & a);n < f;n += 4)HEAP32[n >> 2] = 0;for(f = u + a;n < f;)HEAP8[n++ >> 0] = 0;return u;
}if("i8" === o)return e.subarray || e.slice ? HEAPU8.set(e,u) : HEAPU8.set(new Uint8Array(e),u),u;for(var l,s,c,_ = 0;_ < a;){
var d = e[_];"function" == typeof d && (d = Runtime.getFunctionIndex(d)),0 !== (l = o || r[_]) ? (setValue(u + _,d,l = "i64" == l ? "i32" : l),c !== l && (s = Runtime.getNativeTypeSize(l),c = l),_ += s) : _++;
}return u;
}function getMemory(e){
return staticSealed ? runtimeInitialized ? _malloc(e) : Runtime.dynamicAlloc(e) : Runtime.staticAlloc(e);
}function Pointer_stringify(e,r){
if(0 === r || !e)return"";for(var t,n = 0,i = 0;n |= t = HEAPU8[e + i >> 0],(0 != t || r) && (i++,!r || i != r););r = r || i;var a = "";if(n < 128){
for(var o;0 < r;)o = String.fromCharCode.apply(String,HEAPU8.subarray(e,e + Math.min(r,1024))),a = a ? a + o : o,e += 1024,r -= 1024;return a;
}return Module.UTF8ToString(e);
}function AsciiToString(e){
for(var r = "";;){
var t = HEAP8[e++ >> 0];if(!t)return r;r += String.fromCharCode(t);
}
}function stringToAscii(e,r){
return writeAsciiToMemory(e,r,!1);
}Module.ALLOC_NORMAL = ALLOC_NORMAL,Module.ALLOC_STACK = ALLOC_STACK,Module.ALLOC_STATIC = ALLOC_STATIC,Module.ALLOC_DYNAMIC = ALLOC_DYNAMIC,Module.ALLOC_NONE = ALLOC_NONE,Module.allocate = allocate,Module.getMemory = getMemory,Module.Pointer_stringify = Pointer_stringify,Module.AsciiToString = AsciiToString,Module.stringToAscii = stringToAscii;var UTF8Decoder = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;function UTF8ArrayToString(e,r){
for(var t = r;e[t];)++t;if(16 < t - r && e.subarray && UTF8Decoder)return UTF8Decoder.decode(e.subarray(r,t));for(var n,i,a,o,u,f = "";;){
if(!(o = e[r++]))return f;128 & o ? (u = 63 & e[r++],192 != (224 & o) ? (a = 63 & e[r++],(o = 224 == (240 & o) ? (15 & o) << 12 | u << 6 | a : (n = 63 & e[r++],240 == (248 & o) ? (7 & o) << 18 | u << 12 | a << 6 | n : (i = 63 & e[r++],248 == (252 & o) ? (3 & o) << 24 | u << 18 | a << 12 | n << 6 | i : (1 & o) << 30 | u << 24 | a << 18 | n << 12 | i << 6 | 63 & e[r++]))) < 65536 ? f += String.fromCharCode(o) : (i = o - 65536,f += String.fromCharCode(55296 | i >> 10,56320 | 1023 & i))) : f += String.fromCharCode((31 & o) << 6 | u)) : f += String.fromCharCode(o);
}
}function UTF8ToString(e){
return UTF8ArrayToString(HEAPU8,e);
}function stringToUTF8Array(e,r,t,n){
if(!(0 < n))return 0;for(var i = t,a = t + n - 1,o = 0;o < e.length;++o){
var u = e.charCodeAt(o);if((u = 55296 <= u && u <= 57343 ? 65536 + ((1023 & u) << 10) | 1023 & e.charCodeAt(++o) : u) <= 127){
if(a <= t)break;r[t++] = u;
}else if(u <= 2047){
if(a <= t + 1)break;r[t++] = 192 | u >> 6,r[t++] = 128 | 63 & u;
}else if(u <= 65535){
if(a <= t + 2)break;r[t++] = 224 | u >> 12,r[t++] = 128 | u >> 6 & 63,r[t++] = 128 | 63 & u;
}else if(u <= 2097151){
if(a <= t + 3)break;r[t++] = 240 | u >> 18,r[t++] = 128 | u >> 12 & 63,r[t++] = 128 | u >> 6 & 63,r[t++] = 128 | 63 & u;
}else if(u <= 67108863){
if(a <= t + 4)break;r[t++] = 248 | u >> 24,r[t++] = 128 | u >> 18 & 63,r[t++] = 128 | u >> 12 & 63,r[t++] = 128 | u >> 6 & 63,r[t++] = 128 | 63 & u;
}else{
if(a <= t + 5)break;r[t++] = 252 | u >> 30,r[t++] = 128 | u >> 24 & 63,r[t++] = 128 | u >> 18 & 63,r[t++] = 128 | u >> 12 & 63,r[t++] = 128 | u >> 6 & 63,r[t++] = 128 | 63 & u;
}
}return r[t] = 0,t - i;
}function stringToUTF8(e,r,t){
return stringToUTF8Array(e,HEAPU8,r,t);
}function lengthBytesUTF8(e){
for(var r = 0,t = 0;t < e.length;++t){
var n = e.charCodeAt(t);(n = 55296 <= n && n <= 57343 ? 65536 + ((1023 & n) << 10) | 1023 & e.charCodeAt(++t) : n) <= 127 ? ++r : r += n <= 2047 ? 2 : n <= 65535 ? 3 : n <= 2097151 ? 4 : n <= 67108863 ? 5 : 6;
}return r;
}function demangle(e){
var r = Module.___cxa_demangle || Module.__cxa_demangle;if(r){
try{
var t = e.substr(1),n = lengthBytesUTF8(t) + 1,i = _malloc(n);stringToUTF8(t,i,n);var a = _malloc(4),o = r(i,0,0,a);if(0 === getValue(a,"i32") && o)return Pointer_stringify(o);
}catch(e){}finally{
i && _free(i),a && _free(a),o && _free(o);
}return e;
}return Runtime.warnOnce("warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling"),e;
}function demangleAll(e){
return e.replace(/__Z[\w\d_]+/g,function(e){
var r = demangle(e);return e === r ? e : e + " [" + r + "]";
});
}function jsStackTrace(){
var r = new Error;if(!r.stack){
try{
throw new Error(0);
}catch(e){
r = e;
}if(!r.stack)return"(no stack trace available)";
}return r.stack.toString();
}function stackTrace(){
var e = jsStackTrace();return Module.extraStackTrace && (e += "\n" + Module.extraStackTrace()),demangleAll(e);
}Module.UTF8ArrayToString = UTF8ArrayToString,Module.UTF8ToString = UTF8ToString,Module.stringToUTF8Array = stringToUTF8Array,Module.stringToUTF8 = stringToUTF8,Module.lengthBytesUTF8 = lengthBytesUTF8,"undefined" != typeof TextDecoder && new TextDecoder("utf-16le"),Module.stackTrace = stackTrace;var WASM_PAGE_SIZE = 65536,ASMJS_PAGE_SIZE = 16777216,MIN_TOTAL_MEMORY = 16777216,HEAP,buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64,STATIC_BASE,STATICTOP,staticSealed,STACK_BASE,STACKTOP,STACK_MAX,DYNAMIC_BASE,DYNAMICTOP_PTR,byteLength;function alignUp(e,r){
return 0 < e % r && (e += r - e % r),e;
}function updateGlobalBuffer(e){
Module.buffer = buffer = e;
}function updateGlobalBufferViews(){
Module.HEAP8 = HEAP8 = new Int8Array(buffer),Module.HEAP16 = HEAP16 = new Int16Array(buffer),Module.HEAP32 = HEAP32 = new Int32Array(buffer),Module.HEAPU8 = HEAPU8 = new Uint8Array(buffer),Module.HEAPU16 = HEAPU16 = new Uint16Array(buffer),Module.HEAPU32 = HEAPU32 = new Uint32Array(buffer),Module.HEAPF32 = HEAPF32 = new Float32Array(buffer),Module.HEAPF64 = HEAPF64 = new Float64Array(buffer);
}function abortOnCannotGrowMemory(){
abort("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value " + TOTAL_MEMORY + ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime but prevents some optimizations, (3) set Module.TOTAL_MEMORY to a higher value before the program runs, or (4) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ");
}function enlargeMemory(){
var e = Module.usingWasm ? WASM_PAGE_SIZE : ASMJS_PAGE_SIZE,r = 2147483648 - e;if(HEAP32[DYNAMICTOP_PTR >> 2] > r)return!1;var t = TOTAL_MEMORY;for(TOTAL_MEMORY = Math.max(TOTAL_MEMORY,MIN_TOTAL_MEMORY);TOTAL_MEMORY < HEAP32[DYNAMICTOP_PTR >> 2];)TOTAL_MEMORY = TOTAL_MEMORY <= 536870912 ? alignUp(2 * TOTAL_MEMORY,e) : Math.min(alignUp((3 * TOTAL_MEMORY + 2147483648) / 4,e),r);var n = Module.reallocBuffer(TOTAL_MEMORY);return n && n.byteLength == TOTAL_MEMORY ? (updateGlobalBuffer(n),updateGlobalBufferViews(),!0) : (TOTAL_MEMORY = t,!1);
}STATIC_BASE = STATICTOP = STACK_BASE = STACKTOP = STACK_MAX = DYNAMIC_BASE = DYNAMICTOP_PTR = 0,staticSealed = !1,Module.reallocBuffer || (Module.reallocBuffer = function(e){
var r,t;try{
ArrayBuffer.transfer ? t = ArrayBuffer.transfer(buffer,e) : (r = HEAP8,t = new ArrayBuffer(e),new Int8Array(t).set(r));
}catch(e){
return!1;
}return!!_emscripten_replace_memory(t) && t;
});try{
byteLength = Function.prototype.call.bind(Object.getOwnPropertyDescriptor(ArrayBuffer.prototype,"byteLength").get),byteLength(new ArrayBuffer(4));
}catch(e){
byteLength = function(e){
return e.byteLength;
};
}var TOTAL_STACK = Module.TOTAL_STACK || 5242880,TOTAL_MEMORY = Module.TOTAL_MEMORY || 16777216;function getTotalMemory(){
return TOTAL_MEMORY;
}if(TOTAL_MEMORY < TOTAL_STACK && Module.printErr("TOTAL_MEMORY should be larger than TOTAL_STACK, was " + TOTAL_MEMORY + "! (TOTAL_STACK=" + TOTAL_STACK + ")"),buffer = Module.buffer || new ArrayBuffer(TOTAL_MEMORY),updateGlobalBufferViews(),HEAP32[0] = 1668509029,HEAP16[1] = 25459,115 !== HEAPU8[2] || 99 !== HEAPU8[3])throw"Runtime error: expected the system to be little-endian!";function callRuntimeCallbacks(e){
for(;0 < e.length;){
var r,t = e.shift();"function" != typeof t ? "number" == typeof(r = t.func) ? void 0 === t.arg ? Module.dynCall_v(r) : Module.dynCall_vi(r,t.arg) : r(void 0 === t.arg ? null : t.arg) : t();
}
}Module.HEAP = HEAP,Module.buffer = buffer,Module.HEAP8 = HEAP8,Module.HEAP16 = HEAP16,Module.HEAP32 = HEAP32,Module.HEAPU8 = HEAPU8,Module.HEAPU16 = HEAPU16,Module.HEAPU32 = HEAPU32,Module.HEAPF32 = HEAPF32,Module.HEAPF64 = HEAPF64;var __ATPRERUN__ = [],__ATINIT__ = [],__ATMAIN__ = [],__ATEXIT__ = [],__ATPOSTRUN__ = [],runtimeInitialized = !1;function preRun(){
if(Module.preRun)for("function" == typeof Module.preRun && (Module.preRun = [Module.preRun]);Module.preRun.length;)addOnPreRun(Module.preRun.shift());callRuntimeCallbacks(__ATPRERUN__);
}function ensureInitRuntime(){
runtimeInitialized || (runtimeInitialized = !0,callRuntimeCallbacks(__ATINIT__));
}function preMain(){
callRuntimeCallbacks(__ATMAIN__);
}function exitRuntime(){
callRuntimeCallbacks(__ATEXIT__);
}function postRun(){
if(Module.postRun)for("function" == typeof Module.postRun && (Module.postRun = [Module.postRun]);Module.postRun.length;)addOnPostRun(Module.postRun.shift());callRuntimeCallbacks(__ATPOSTRUN__);
}function addOnPreRun(e){
__ATPRERUN__.unshift(e);
}function addOnInit(e){
__ATINIT__.unshift(e);
}function addOnPreMain(e){
__ATMAIN__.unshift(e);
}function addOnExit(e){
__ATEXIT__.unshift(e);
}function addOnPostRun(e){
__ATPOSTRUN__.unshift(e);
}function intArrayFromString(e,r,t){
t = 0 < t ? t : lengthBytesUTF8(e) + 1,t = new Array(t),e = stringToUTF8Array(e,t,0,t.length);return r && (t.length = e),t;
}function intArrayToString(e){
for(var r = [],t = 0;t < e.length;t++){
var n = e[t];255 < n && (n &= 255),r.push(String.fromCharCode(n));
}return r.join("");
}function writeStringToMemory(e,r,t){
var n,i;Runtime.warnOnce("writeStringToMemory is deprecated and should not be called! Use stringToUTF8() instead!"),t && (i = r + lengthBytesUTF8(e),n = HEAP8[i]),stringToUTF8(e,r,1 / 0),t && (HEAP8[i] = n);
}function writeArrayToMemory(e,r){
HEAP8.set(e,r);
}function writeAsciiToMemory(e,r,t){
for(var n = 0;n < e.length;++n)HEAP8[r++ >> 0] = e.charCodeAt(n);t || (HEAP8[r >> 0] = 0);
}Module.addOnPreRun = addOnPreRun,Module.addOnInit = addOnInit,Module.addOnPreMain = addOnPreMain,Module.addOnExit = addOnExit,Module.addOnPostRun = addOnPostRun,Module.intArrayFromString = intArrayFromString,Module.intArrayToString = intArrayToString,Module.writeStringToMemory = writeStringToMemory,Module.writeArrayToMemory = writeArrayToMemory,Module.writeAsciiToMemory = writeAsciiToMemory,Math.imul && -5 === Math.imul(4294967295,5) || (Math.imul = function(e,r){
var t = 65535 & e,n = 65535 & r;return t * n + ((e >>> 16) * n + t * (r >>> 16) << 16) | 0;
}),Math.imul = Math.imul,Math.clz32 || (Math.clz32 = function(e){
e >>>= 0;for(var r = 0;r < 32;r++)if(e & 1 << 31 - r)return r;return 32;
}),Math.clz32 = Math.clz32,Math.trunc || (Math.trunc = function(e){
return e < 0 ? Math.ceil(e) : Math.floor(e);
}),Math.trunc = Math.trunc;var Math_abs = Math.abs,Math_ceil = Math.ceil,Math_floor = Math.floor,Math_min = Math.min,runDependencies = 0,dependenciesFulfilled = null;function addRunDependency(e){
runDependencies++,Module.monitorRunDependencies && Module.monitorRunDependencies(runDependencies);
}function removeRunDependency(e){
var r;runDependencies--,Module.monitorRunDependencies && Module.monitorRunDependencies(runDependencies),0 == runDependencies && dependenciesFulfilled && (r = dependenciesFulfilled,dependenciesFulfilled = null,r());
}Module.addRunDependency = addRunDependency,Module.removeRunDependency = removeRunDependency,Module.preloadedImages = {},Module.preloadedAudios = {},STATIC_BASE = Runtime.GLOBAL_BASE,STATICTOP = STATIC_BASE + 6192,__ATINIT__.push(),allocate([228,2,0,0,81,16,0,0,12,3,0,0,177,16,0,0,32,0,0,0,0,0,0,0,12,3,0,0,94,16,0,0,48,0,0,0,0,0,0,0,228,2,0,0,127,16,0,0,12,3,0,0,140,16,0,0,16,0,0,0,0,0,0,0,12,3,0,0,183,17,0,0,32,0,0,0,0,0,0,0,12,3,0,0,147,17,0,0,72,0,0,0,0,0,0,0,108,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,2,0,0,0,32,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,248,19,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,224,1,0,0,5,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,2,0,0,0,40,20,0,0,0,4,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,16,0,0,0,1,0,0,0,2,0,0,0,3,0,0,0,4,0,0,0,5,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,56,0,0,0,1,0,0,0,5,0,0,0,3,0,0,0,4,0,0,0,5,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,37,115,40,37,117,41,58,32,65,115,115,101,114,116,105,111,110,32,102,97,105,108,117,114,101,58,32,34,37,115,34,10,0,109,95,115,105,122,101,32,60,61,32,109,95,99,97,112,97,99,105,116,121,0,46,47,105,110,99,92,99,114,110,95,100,101,99,111,109,112,46,104,0,109,105,110,95,110,101,119,95,99,97,112,97,99,105,116,121,32,60,32,40,48,120,55,70,70,70,48,48,48,48,85,32,47,32,101,108,101,109,101,110,116,95,115,105,122,101,41,0,110,101,119,95,99,97,112,97,99,105,116,121,32,38,38,32,40,110,101,119,95,99,97,112,97,99,105,116,121,32,62,32,109,95,99,97,112,97,99,105,116,121,41,0,110,117,109,95,99,111,100,101,115,91,99,93,0,115,111,114,116,101,100,95,112,111,115,32,60,32,116,111,116,97,108,95,117,115,101,100,95,115,121,109,115,0,112,67,111,100,101,115,105,122,101,115,91,115,121,109,95,105,110,100,101,120,93,32,61,61,32,99,111,100,101,115,105,122,101,0,116,32,60,32,40,49,85,32,60,60,32,116,97,98,108,101,95,98,105,116,115,41,0,109,95,108,111,111,107,117,112,91,116,93,32,61,61,32,99,85,73,78,84,51,50,95,77,65,88,0,99,114,110,100,95,109,97,108,108,111,99,58,32,115,105,122,101,32,116,111,111,32,98,105,103,0,99,114,110,100,95,109,97,108,108,111,99,58,32,111,117,116,32,111,102,32,109,101,109,111,114,121,0,40,40,117,105,110,116,51,50,41,112,95,110,101,119,32,38,32,40,67,82,78,68,95,77,73,78,95,65,76,76,79,67,95,65,76,73,71,78,77,69,78,84,32,45,32,49,41,41,32,61,61,32,48,0,99,114,110,100,95,114,101,97,108,108,111,99,58,32,98,97,100,32,112,116,114,0,99,114,110,100,95,102,114,101,101,58,32,98,97,100,32,112,116,114,0,102,97,108,115,101,0,40,116,111,116,97,108,95,115,121,109,115,32,62,61,32,49,41,32,38,38,32,40,116,111,116,97,108,95,115,121,109,115,32,60,61,32,112,114,101,102,105,120,95,99,111,100,105,110,103,58,58,99,77,97,120,83,117,112,112,111,114,116,101,100,83,121,109,115,41,0,17,18,19,20,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15,16,48,0,110,117,109,95,98,105,116,115,32,60,61,32,51,50,85,0,109,95,98,105,116,95,99,111,117,110,116,32,60,61,32,99,66,105,116,66,117,102,83,105,122,101,0,116,32,33,61,32,99,85,73,78,84,51,50,95,77,65,88,0,109,111,100,101,108,46,109,95,99,111,100,101,95,115,105,122,101,115,91,115,121,109,93,32,61,61,32,108,101,110,0,0,2,3,1,0,2,3,4,5,6,7,1,40,108,101,110,32,62,61,32,49,41,32,38,38,32,40,108,101,110,32,60,61,32,99,77,97,120,69,120,112,101,99,116,101,100,67,111,100,101,83,105,122,101,41,0,105,32,60,32,109,95,115,105,122,101,0,110,101,120,116,95,108,101,118,101,108,95,111,102,115,32,62,32,99,117,114,95,108,101,118,101,108,95,111,102,115,0,1,2,2,3,3,3,3,4,0,0,0,0,0,0,1,1,0,1,0,1,0,0,1,2,1,2,0,0,0,1,0,2,1,0,2,0,0,1,2,3,110,117,109,32,38,38,32,40,110,117,109,32,61,61,32,126,110,117,109,95,99,104,101,99,107,41,0,17,0,10,0,17,17,17,0,0,0,0,5,0,0,0,0,0,0,9,0,0,0,0,11,0,0,0,0,0,0,0,0,17,0,15,10,17,17,17,3,10,7,0,1,19,9,11,11,0,0,9,6,11,0,0,11,0,6,17,0,0,0,17,17,17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,0,0,0,0,0,0,0,0,17,0,10,10,17,17,17,0,10,0,0,2,0,9,11,0,0,0,9,0,11,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,12,0,0,0,0,9,12,0,0,0,0,0,12,0,0,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,0,0,0,0,0,0,0,0,0,0,0,13,0,0,0,4,13,0,0,0,0,9,14,0,0,0,0,0,14,0,0,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,0,0,0,0,0,0,0,0,0,0,0,15,0,0,0,0,15,0,0,0,0,9,16,0,0,0,0,0,16,0,0,16,0,0,18,0,0,0,18,18,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,18,0,0,0,18,18,18,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,0,0,0,0,0,0,0,0,0,0,0,10,0,0,0,0,10,0,0,0,0,9,11,0,0,0,0,0,11,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,12,0,0,0,0,9,12,0,0,0,0,0,12,0,0,12,0,0,45,43,32,32,32,48,88,48,120,0,40,110,117,108,108,41,0,45,48,88,43,48,88,32,48,88,45,48,120,43,48,120,32,48,120,0,105,110,102,0,73,78,70,0,110,97,110,0,78,65,78,0,48,49,50,51,52,53,54,55,56,57,65,66,67,68,69,70,46,0,84,33,34,25,13,1,2,3,17,75,28,12,16,4,11,29,18,30,39,104,110,111,112,113,98,32,5,6,15,19,20,21,26,8,22,7,40,36,23,24,9,10,14,27,31,37,35,131,130,125,38,42,43,60,61,62,63,67,71,74,77,88,89,90,91,92,93,94,95,96,97,99,100,101,102,103,105,106,107,108,114,115,116,121,122,123,124,0,73,108,108,101,103,97,108,32,98,121,116,101,32,115,101,113,117,101,110,99,101,0,68,111,109,97,105,110,32,101,114,114,111,114,0,82,101,115,117,108,116,32,110,111,116,32,114,101,112,114,101,115,101,110,116,97,98,108,101,0,78,111,116,32,97,32,116,116,121,0,80,101,114,109,105,115,115,105,111,110,32,100,101,110,105,101,100,0,79,112,101,114,97,116,105,111,110,32,110,111,116,32,112,101,114,109,105,116,116,101,100,0,78,111,32,115,117,99,104,32,102,105,108,101,32,111,114,32,100,105,114,101,99,116,111,114,121,0,78,111,32,115,117,99,104,32,112,114,111,99,101,115,115,0,70,105,108,101,32,101,120,105,115,116,115,0,86,97,108,117,101,32,116,111,111,32,108,97,114,103,101,32,102,111,114,32,100,97,116,97,32,116,121,112,101,0,78,111,32,115,112,97,99,101,32,108,101,102,116,32,111,110,32,100,101,118,105,99,101,0,79,117,116,32,111,102,32,109,101,109,111,114,121,0,82,101,115,111,117,114,99,101,32,98,117,115,121,0,73,110,116,101,114,114,117,112,116,101,100,32,115,121,115,116,101,109,32,99,97,108,108,0,82,101,115,111,117,114,99,101,32,116,101,109,112,111,114,97,114,105,108,121,32,117,110,97,118,97,105,108,97,98,108,101,0,73,110,118,97,108,105,100,32,115,101,101,107,0,67,114,111,115,115,45,100,101,118,105,99,101,32,108,105,110,107,0,82,101,97,100,45,111,110,108,121,32,102,105,108,101,32,115,121,115,116,101,109,0,68,105,114,101,99,116,111,114,121,32,110,111,116,32,101,109,112,116,121,0,67,111,110,110,101,99,116,105,111,110,32,114,101,115,101,116,32,98,121,32,112,101,101,114,0,79,112,101,114,97,116,105,111,110,32,116,105,109,101,100,32,111,117,116,0,67,111,110,110,101,99,116,105,111,110,32,114,101,102,117,115,101,100,0,72,111,115,116,32,105,115,32,100,111,119,110,0,72,111,115,116,32,105,115,32,117,110,114,101,97,99,104,97,98,108,101,0,65,100,100,114,101,115,115,32,105,110,32,117,115,101,0,66,114,111,107,101,110,32,112,105,112,101,0,73,47,79,32,101,114,114,111,114,0,78,111,32,115,117,99,104,32,100,101,118,105,99,101,32,111,114,32,97,100,100,114,101,115,115,0,66,108,111,99,107,32,100,101,118,105,99,101,32,114,101,113,117,105,114,101,100,0,78,111,32,115,117,99,104,32,100,101,118,105,99,101,0,78,111,116,32,97,32,100,105,114,101,99,116,111,114,121,0,73,115,32,97,32,100,105,114,101,99,116,111,114,121,0,84,101,120,116,32,102,105,108,101,32,98,117,115,121,0,69,120,101,99,32,102,111,114,109,97,116,32,101,114,114,111,114,0,73,110,118,97,108,105,100,32,97,114,103,117,109,101,110,116,0,65,114,103,117,109,101,110,116,32,108,105,115,116,32,116,111,111,32,108,111,110,103,0,83,121,109,98,111,108,105,99,32,108,105,110,107,32,108,111,111,112,0,70,105,108,101,110,97,109,101,32,116,111,111,32,108,111,110,103,0,84,111,111,32,109,97,110,121,32,111,112,101,110,32,102,105,108,101,115,32,105,110,32,115,121,115,116,101,109,0,78,111,32,102,105,108,101,32,100,101,115,99,114,105,112,116,111,114,115,32,97,118,97,105,108,97,98,108,101,0,66,97,100,32,102,105,108,101,32,100,101,115,99,114,105,112,116,111,114,0,78,111,32,99,104,105,108,100,32,112,114,111,99,101,115,115,0,66,97,100,32,97,100,100,114,101,115,115,0,70,105,108,101,32,116,111,111,32,108,97,114,103,101,0,84,111,111,32,109,97,110,121,32,108,105,110,107,115,0,78,111,32,108,111,99,107,115,32,97,118,97,105,108,97,98,108,101,0,82,101,115,111,117,114,99,101,32,100,101,97,100,108,111,99,107,32,119,111,117,108,100,32,111,99,99,117,114,0,83,116,97,116,101,32,110,111,116,32,114,101,99,111,118,101,114,97,98,108,101,0,80,114,101,118,105,111,117,115,32,111,119,110,101,114,32,100,105,101,100,0,79,112,101,114,97,116,105,111,110,32,99,97,110,99,101,108,101,100,0,70,117,110,99,116,105,111,110,32,110,111,116,32,105,109,112,108,101,109,101,110,116,101,100,0,78,111,32,109,101,115,115,97,103,101,32,111,102,32,100,101,115,105,114,101,100,32,116,121,112,101,0,73,100,101,110,116,105,102,105,101,114,32,114,101,109,111,118,101,100,0,68,101,118,105,99,101,32,110,111,116,32,97,32,115,116,114,101,97,109,0,78,111,32,100,97,116,97,32,97,118,97,105,108,97,98,108,101,0,68,101,118,105,99,101,32,116,105,109,101,111,117,116,0,79,117,116,32,111,102,32,115,116,114,101,97,109,115,32,114,101,115,111,117,114,99,101,115,0,76,105,110,107,32,104,97,115,32,98,101,101,110,32,115,101,118,101,114,101,100,0,80,114,111,116,111,99,111,108,32,101,114,114,111,114,0,66,97,100,32,109,101,115,115,97,103,101,0,70,105,108,101,32,100,101,115,99,114,105,112,116,111,114,32,105,110,32,98,97,100,32,115,116,97,116,101,0,78,111,116,32,97,32,115,111,99,107,101,116,0,68,101,115,116,105,110,97,116,105,111,110,32,97,100,100,114,101,115,115,32,114,101,113,117,105,114,101,100,0,77,101,115,115,97,103,101,32,116,111,111,32,108,97,114,103,101,0,80,114,111,116,111,99,111,108,32,119,114,111,110,103,32,116,121,112,101,32,102,111,114,32,115,111,99,107,101,116,0,80,114,111,116,111,99,111,108,32,110,111,116,32,97,118,97,105,108,97,98,108,101,0,80,114,111,116,111,99,111,108,32,110,111,116,32,115,117,112,112,111,114,116,101,100,0,83,111,99,107,101,116,32,116,121,112,101,32,110,111,116,32,115,117,112,112,111,114,116,101,100,0,78,111,116,32,115,117,112,112,111,114,116,101,100,0,80,114,111,116,111,99,111,108,32,102,97,109,105,108,121,32,110,111,116,32,115,117,112,112,111,114,116,101,100,0,65,100,100,114,101,115,115,32,102,97,109,105,108,121,32,110,111,116,32,115,117,112,112,111,114,116,101,100,32,98,121,32,112,114,111,116,111,99,111,108,0,65,100,100,114,101,115,115,32,110,111,116,32,97,118,97,105,108,97,98,108,101,0,78,101,116,119,111,114,107,32,105,115,32,100,111,119,110,0,78,101,116,119,111,114,107,32,117,110,114,101,97,99,104,97,98,108,101,0,67,111,110,110,101,99,116,105,111,110,32,114,101,115,101,116,32,98,121,32,110,101,116,119,111,114,107,0,67,111,110,110,101,99,116,105,111,110,32,97,98,111,114,116,101,100,0,78,111,32,98,117,102,102,101,114,32,115,112,97,99,101,32,97,118,97,105,108,97,98,108,101,0,83,111,99,107,101,116,32,105,115,32,99,111,110,110,101,99,116,101,100,0,83,111,99,107,101,116,32,110,111,116,32,99,111,110,110,101,99,116,101,100,0,67,97,110,110,111,116,32,115,101,110,100,32,97,102,116,101,114,32,115,111,99,107,101,116,32,115,104,117,116,100,111,119,110,0,79,112,101,114,97,116,105,111,110,32,97,108,114,101,97,100,121,32,105,110,32,112,114,111,103,114,101,115,115,0,79,112,101,114,97,116,105,111,110,32,105,110,32,112,114,111,103,114,101,115,115,0,83,116,97,108,101,32,102,105,108,101,32,104,97,110,100,108,101,0,82,101,109,111,116,101,32,73,47,79,32,101,114,114,111,114,0,81,117,111,116,97,32,101,120,99,101,101,100,101,100,0,78,111,32,109,101,100,105,117,109,32,102,111,117,110,100,0,87,114,111,110,103,32,109,101,100,105,117,109,32,116,121,112,101,0,78,111,32,101,114,114,111,114,32,105,110,102,111,114,109,97,116,105,111,110,0,0,116,101,114,109,105,110,97,116,105,110,103,32,119,105,116,104,32,37,115,32,101,120,99,101,112,116,105,111,110,32,111,102,32,116,121,112,101,32,37,115,58,32,37,115,0,116,101,114,109,105,110,97,116,105,110,103,32,119,105,116,104,32,37,115,32,101,120,99,101,112,116,105,111,110,32,111,102,32,116,121,112,101,32,37,115,0,116,101,114,109,105,110,97,116,105,110,103,32,119,105,116,104,32,37,115,32,102,111,114,101,105,103,110,32,101,120,99,101,112,116,105,111,110,0,116,101,114,109,105,110,97,116,105,110,103,0,117,110,99,97,117,103,104,116,0,83,116,57,101,120,99,101,112,116,105,111,110,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,54,95,95,115,104,105,109,95,116,121,112,101,95,105,110,102,111,69,0,83,116,57,116,121,112,101,95,105,110,102,111,0,78,49,48,95,95,99,120,120,97,98,105,118,49,50,48,95,95,115,105,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,55,95,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0,112,116,104,114,101,97,100,95,111,110,99,101,32,102,97,105,108,117,114,101,32,105,110,32,95,95,99,120,97,95,103,101,116,95,103,108,111,98,97,108,115,95,102,97,115,116,40,41,0,99,97,110,110,111,116,32,99,114,101,97,116,101,32,112,116,104,114,101,97,100,32,107,101,121,32,102,111,114,32,95,95,99,120,97,95,103,101,116,95,103,108,111,98,97,108,115,40,41,0,99,97,110,110,111,116,32,122,101,114,111,32,111,117,116,32,116,104,114,101,97,100,32,118,97,108,117,101,32,102,111,114,32,95,95,99,120,97,95,103,101,116,95,103,108,111,98,97,108,115,40,41,0,116,101,114,109,105,110,97,116,101,95,104,97,110,100,108,101,114,32,117,110,101,120,112,101,99,116,101,100,108,121,32,114,101,116,117,114,110,101,100,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,57,95,95,112,111,105,110,116,101,114,95,116,121,112,101,95,105,110,102,111,69,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,55,95,95,112,98,97,115,101,95,116,121,112,101,95,105,110,102,111,69,0],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE);var tempDoublePtr = STATICTOP;function _abort(){
Module.abort();
}function __ZSt18uncaught_exceptionv(){
return!!__ZSt18uncaught_exceptionv.uncaught_exception;
}STATICTOP += 16;var EXCEPTIONS = {last: 0,caught: [],infos: {},deAdjust: function(e){
if(!e || EXCEPTIONS.infos[e])return e;for(var r in EXCEPTIONS.infos)if(EXCEPTIONS.infos[r].adjusted === e)return r;return e;
},addRef: function(e){
e && EXCEPTIONS.infos[e].refcount++;
},decRef: function(e){
var r;e && (assert(0 < (r = EXCEPTIONS.infos[e]).refcount),r.refcount--,0 !== r.refcount || r.rethrown || (r.destructor && Module.dynCall_vi(r.destructor,e),delete EXCEPTIONS.infos[e],___cxa_free_exception(e)));
},clearRef: function(e){
e && (EXCEPTIONS.infos[e].refcount = 0);
}};function ___cxa_begin_catch(e){
var r = EXCEPTIONS.infos[e];return r && !r.caught && (r.caught = !0,__ZSt18uncaught_exceptionv.uncaught_exception--),r && (r.rethrown = !1),EXCEPTIONS.caught.push(e),EXCEPTIONS.addRef(EXCEPTIONS.deAdjust(e)),e;
}function _pthread_once(e,r){
_pthread_once.seen || (_pthread_once.seen = {}),e in _pthread_once.seen || (Module.dynCall_v(r),_pthread_once.seen[e] = 1);
}function _emscripten_memcpy_big(e,r,t){
return HEAPU8.set(HEAPU8.subarray(r,r + t),e),e;
}var SYSCALLS = {varargs: 0,get: function(e){
return SYSCALLS.varargs += 4,HEAP32[SYSCALLS.varargs - 4 >> 2];
},getStr: function(){
return Pointer_stringify(SYSCALLS.get());
},get64: function(){
var e = SYSCALLS.get(),r = SYSCALLS.get();return assert(0 <= e ? 0 === r : -1 === r),e;
},getZero: function(){
assert(0 === SYSCALLS.get());
}};function ___syscall6(e,r){
SYSCALLS.varargs = r;try{
var t = SYSCALLS.getStreamFromFD();return FS.close(t),0;
}catch(e){
return"undefined" != typeof FS && e instanceof FS.ErrnoError || abort(e),-e.errno;
}
}var cttz_i8 = allocate([8,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,7,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0],"i8",ALLOC_STATIC),PTHREAD_SPECIFIC = {};function _pthread_getspecific(e){
return PTHREAD_SPECIFIC[e] || 0;
}function ___setErrNo(e){
return Module.___errno_location && (HEAP32[Module.___errno_location() >> 2] = e),e;
}var PTHREAD_SPECIFIC_NEXT_KEY = 1,ERRNO_CODES = {EPERM: 1,ENOENT: 2,ESRCH: 3,EINTR: 4,EIO: 5,ENXIO: 6,E2BIG: 7,ENOEXEC: 8,EBADF: 9,ECHILD: 10,EAGAIN: 11,EWOULDBLOCK: 11,ENOMEM: 12,EACCES: 13,EFAULT: 14,ENOTBLK: 15,EBUSY: 16,EEXIST: 17,EXDEV: 18,ENODEV: 19,ENOTDIR: 20,EISDIR: 21,EINVAL: 22,ENFILE: 23,EMFILE: 24,ENOTTY: 25,ETXTBSY: 26,EFBIG: 27,ENOSPC: 28,ESPIPE: 29,EROFS: 30,EMLINK: 31,EPIPE: 32,EDOM: 33,ERANGE: 34,ENOMSG: 42,EIDRM: 43,ECHRNG: 44,EL2NSYNC: 45,EL3HLT: 46,EL3RST: 47,ELNRNG: 48,EUNATCH: 49,ENOCSI: 50,EL2HLT: 51,EDEADLK: 35,ENOLCK: 37,EBADE: 52,EBADR: 53,EXFULL: 54,ENOANO: 55,EBADRQC: 56,EBADSLT: 57,EDEADLOCK: 35,EBFONT: 59,ENOSTR: 60,ENODATA: 61,ETIME: 62,ENOSR: 63,ENONET: 64,ENOPKG: 65,EREMOTE: 66,ENOLINK: 67,EADV: 68,ESRMNT: 69,ECOMM: 70,EPROTO: 71,EMULTIHOP: 72,EDOTDOT: 73,EBADMSG: 74,ENOTUNIQ: 76,EBADFD: 77,EREMCHG: 78,ELIBACC: 79,ELIBBAD: 80,ELIBSCN: 81,ELIBMAX: 82,ELIBEXEC: 83,ENOSYS: 38,ENOTEMPTY: 39,ENAMETOOLONG: 36,ELOOP: 40,EOPNOTSUPP: 95,EPFNOSUPPORT: 96,ECONNRESET: 104,ENOBUFS: 105,EAFNOSUPPORT: 97,EPROTOTYPE: 91,ENOTSOCK: 88,ENOPROTOOPT: 92,ESHUTDOWN: 108,ECONNREFUSED: 111,EADDRINUSE: 98,ECONNABORTED: 103,ENETUNREACH: 101,ENETDOWN: 100,ETIMEDOUT: 110,EHOSTDOWN: 112,EHOSTUNREACH: 113,EINPROGRESS: 115,EALREADY: 114,EDESTADDRREQ: 89,EMSGSIZE: 90,EPROTONOSUPPORT: 93,ESOCKTNOSUPPORT: 94,EADDRNOTAVAIL: 99,ENETRESET: 102,EISCONN: 106,ENOTCONN: 107,ETOOMANYREFS: 109,EUSERS: 87,EDQUOT: 122,ESTALE: 116,ENOTSUP: 95,ENOMEDIUM: 123,EILSEQ: 84,EOVERFLOW: 75,ECANCELED: 125,ENOTRECOVERABLE: 131,EOWNERDEAD: 130,ESTRPIPE: 86};function _pthread_key_create(e,r){
return 0 == e ? ERRNO_CODES.EINVAL : (HEAP32[e >> 2] = PTHREAD_SPECIFIC_NEXT_KEY,PTHREAD_SPECIFIC[PTHREAD_SPECIFIC_NEXT_KEY] = 0,PTHREAD_SPECIFIC_NEXT_KEY++,0);
}function ___resumeException(e){
throw EXCEPTIONS.last || (EXCEPTIONS.last = e),e + " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";
}function ___cxa_find_matching_catch(){
if(!(n = EXCEPTIONS.last))return 0 | (Runtime.setTempRet0(0),0);var e = EXCEPTIONS.infos[n],r = e.type;if(!r)return 0 | (Runtime.setTempRet0(0),n);var t = Array.prototype.slice.call(arguments);Module.___cxa_is_pointer_type(r),___cxa_find_matching_catch.buffer || (___cxa_find_matching_catch.buffer = _malloc(4)),HEAP32[___cxa_find_matching_catch.buffer >> 2] = n;for(var n = ___cxa_find_matching_catch.buffer,i = 0;i < t.length;i++)if(t[i] && Module.___cxa_can_catch(t[i],r,n))return n = HEAP32[n >> 2],e.adjusted = n,0 | (Runtime.setTempRet0(t[i]),n);return n = HEAP32[n >> 2],0 | (Runtime.setTempRet0(r),n);
}function ___gxx_personality_v0(){}function _pthread_setspecific(e,r){
return e in PTHREAD_SPECIFIC ? (PTHREAD_SPECIFIC[e] = r,0) : ERRNO_CODES.EINVAL;
}function ___syscall140(e,r){
SYSCALLS.varargs = r;try{
var t = SYSCALLS.getStreamFromFD(),n = (SYSCALLS.get(),SYSCALLS.get()),i = SYSCALLS.get(),a = SYSCALLS.get(),n = n;return FS.llseek(t,n,a),HEAP32[i >> 2] = t.position,t.getdents && 0 === n && 0 === a && (t.getdents = null),0;
}catch(e){
return"undefined" != typeof FS && e instanceof FS.ErrnoError || abort(e),-e.errno;
}
}function ___syscall146(e,r){
SYSCALLS.varargs = r;try{
var t = SYSCALLS.get(),n = SYSCALLS.get(),i = SYSCALLS.get(),a = 0;___syscall146.buffer || (___syscall146.buffers = [null,[],[]],___syscall146.printChar = function(e,r){
var t = ___syscall146.buffers[e];assert(t),0 === r || 10 === r ? ((1 === e ? Module.print : Module.printErr)(UTF8ArrayToString(t,0)),t.length = 0) : t.push(r);
});for(var o = 0;o < i;o++){
for(var u = HEAP32[n + 8 * o >> 2],f = HEAP32[n + (8 * o + 4) >> 2],l = 0;l < f;l++)___syscall146.printChar(t,HEAPU8[u + l]);a += f;
}return a;
}catch(e){
return"undefined" != typeof FS && e instanceof FS.ErrnoError || abort(e),-e.errno;
}
}function ___syscall54(e,r){
SYSCALLS.varargs = r;try{
return 0;
}catch(e){
return"undefined" != typeof FS && e instanceof FS.ErrnoError || abort(e),-e.errno;
}
}function invoke_iiii(e,r,t,n){
try{
return Module.dynCall_iiii(e,r,t,n);
}catch(e){
if("number" != typeof e && "longjmp" !== e)throw e;Module.setThrew(1,0);
}
}function invoke_viiiii(e,r,t,n,i,a){
try{
Module.dynCall_viiiii(e,r,t,n,i,a);
}catch(e){
if("number" != typeof e && "longjmp" !== e)throw e;Module.setThrew(1,0);
}
}function invoke_vi(e,r){
try{
Module.dynCall_vi(e,r);
}catch(e){
if("number" != typeof e && "longjmp" !== e)throw e;Module.setThrew(1,0);
}
}function invoke_ii(e,r){
try{
return Module.dynCall_ii(e,r);
}catch(e){
if("number" != typeof e && "longjmp" !== e)throw e;Module.setThrew(1,0);
}
}function invoke_viii(e,r,t,n){
try{
Module.dynCall_viii(e,r,t,n);
}catch(e){
if("number" != typeof e && "longjmp" !== e)throw e;Module.setThrew(1,0);
}
}function invoke_v(e){
try{
Module.dynCall_v(e);
}catch(e){
if("number" != typeof e && "longjmp" !== e)throw e;Module.setThrew(1,0);
}
}function invoke_viiiiii(e,r,t,n,i,a,o){
try{
Module.dynCall_viiiiii(e,r,t,n,i,a,o);
}catch(e){
if("number" != typeof e && "longjmp" !== e)throw e;Module.setThrew(1,0);
}
}function invoke_viiii(e,r,t,n,i){
try{
Module.dynCall_viiii(e,r,t,n,i);
}catch(e){
if("number" != typeof e && "longjmp" !== e)throw e;Module.setThrew(1,0);
}
}__ATEXIT__.push(function(){
var e = Module._fflush;e && e(0);var r = ___syscall146.printChar;r && ((e = ___syscall146.buffers)[1].length && r(1,10),e[2].length && r(2,10));
}),DYNAMICTOP_PTR = allocate(1,"i32",ALLOC_STATIC),STACK_BASE = STACKTOP = Runtime.alignMemory(STATICTOP),STACK_MAX = STACK_BASE + TOTAL_STACK,DYNAMIC_BASE = Runtime.alignMemory(STACK_MAX),HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE,staticSealed = !0,Module.asmGlobalArg = {Math: Math,Int8Array: Int8Array,Int16Array: Int16Array,Int32Array: Int32Array,Uint8Array: Uint8Array,Uint16Array: Uint16Array,Uint32Array: Uint32Array,Float32Array: Float32Array,Float64Array: Float64Array,NaN: NaN,Infinity: 1 / 0,byteLength: byteLength},Module.asmLibraryArg = {abort: abort,assert: assert,enlargeMemory: enlargeMemory,getTotalMemory: getTotalMemory,abortOnCannotGrowMemory: abortOnCannotGrowMemory,invoke_iiii: invoke_iiii,invoke_viiiii: invoke_viiiii,invoke_vi: invoke_vi,invoke_ii: invoke_ii,invoke_viii: invoke_viii,invoke_v: invoke_v,invoke_viiiiii: invoke_viiiiii,invoke_viiii: invoke_viiii,_pthread_getspecific: _pthread_getspecific,___syscall54: ___syscall54,_pthread_setspecific: _pthread_setspecific,___gxx_personality_v0: ___gxx_personality_v0,___syscall6: ___syscall6,___setErrNo: ___setErrNo,_abort: _abort,___cxa_begin_catch: ___cxa_begin_catch,_pthread_once: _pthread_once,_emscripten_memcpy_big: _emscripten_memcpy_big,_pthread_key_create: _pthread_key_create,___syscall140: ___syscall140,___resumeException: ___resumeException,___cxa_find_matching_catch: ___cxa_find_matching_catch,___syscall146: ___syscall146,__ZSt18uncaught_exceptionv: __ZSt18uncaught_exceptionv,DYNAMICTOP_PTR: DYNAMICTOP_PTR,tempDoublePtr: tempDoublePtr,ABORT: ABORT,STACKTOP: STACKTOP,STACK_MAX: STACK_MAX,cttz_i8: cttz_i8};var asm = function(e,r,t){
var n = e.Int8Array,ce = new n(t),i = e.Int16Array,W = new i(t),a = e.Int32Array,_e = new a(t),o = e.Uint8Array,de = new o(t),u = e.Uint16Array,Ee = new u(t),f = e.Uint32Array;new f(t);var l = e.Float32Array;new l(t);var s = e.Float64Array,k = new s(t),c = e.byteLength,_ = 0 | r.DYNAMICTOP_PTR,g = 0 | r.tempDoublePtr;r.ABORT;var Te = 0 | r.STACKTOP;r.STACK_MAX;var d = 0 | r.cttz_i8;e.NaN,e.Infinity;var L = 0;e.Math.floor,e.Math.abs,e.Math.sqrt,e.Math.pow,e.Math.cos,e.Math.sin,e.Math.tan,e.Math.acos,e.Math.asin,e.Math.atan,e.Math.atan2,e.Math.exp,e.Math.log,e.Math.ceil;var ie = e.Math.imul;e.Math.min,e.Math.max;var T = e.Math.clz32,E = r.abort;r.assert;var A = r.enlargeMemory,M = r.getTotalMemory,b = r.abortOnCannotGrowMemory;r.invoke_iiii,r.invoke_viiiii,r.invoke_vi,r.invoke_ii,r.invoke_viii,r.invoke_v,r.invoke_viiiiii,r.invoke_viiii;var m = r._pthread_getspecific,S = r.___syscall54,P = r._pthread_setspecific;r.___gxx_personality_v0;var R = r.___syscall6,h = r.___setErrNo,p = r._abort;r.___cxa_begin_catch;var C = r._pthread_once,N = r._emscripten_memcpy_big,y = r._pthread_key_create,O = r.___syscall140;r.___resumeException,r.___cxa_find_matching_catch;var v = r.___syscall146;function I(e){
e |= 0;var r = 0,t = 0,n = 0,i = 0,a = 0,o = 0,u = 0,f = 0,l = 0,s = 0,c = 0,_ = 0,d = 0,E = 0,T = 0,A = 0,M = 0,b = 0,m = 0,S = 0,P = Te;Te = Te + 16 | 0,_ = P;do{
if(e >>> 0 < 245){
if(e = (l = e >>> 0 < 11 ? 16 : e + 11 & -8) >>> 3,3 & (t = (c = 0 | _e[1144]) >>> e) | 0)return n = 0 | _e[(t = (e = 4616 + ((r = (1 & t ^ 1) + e | 0) << 1 << 2) | 0) + 8 | 0) >> 2],(0 | e) == (0 | (a = 0 | _e[(i = n + 8 | 0) >> 2])) ? _e[1144] = c & ~(1 << r) : (_e[a + 12 >> 2] = e,_e[t >> 2] = a),S = r << 3,_e[n + 4 >> 2] = 3 | S,_e[(S = n + S + 4 | 0) >> 2] = 1 | _e[S >> 2],Te = P,0 | (S = i);if((s = 0 | _e[1146]) >>> 0 < l >>> 0){
if(0 | t)return r = ((r = t << e & ((r = 2 << e) | 0 - r)) & 0 - r) - 1 | 0,i = 0 | _e[(e = (r = 4616 + ((n = ((t = (r >>>= o = r >>> 12 & 16) >>> 5 & 8) | o | (i = (r >>>= t) >>> 2 & 4) | (e = (r >>>= i) >>> 1 & 2) | (n = (r >>>= e) >>> 1 & 1)) + (r >>> n) | 0) << 1 << 2) | 0) + 8 | 0) >> 2],(0 | r) == (0 | (t = 0 | _e[(o = i + 8 | 0) >> 2])) ? (e = c & ~(1 << n),_e[1144] = e) : (_e[t + 12 >> 2] = r,_e[e >> 2] = t,e = c),a = (n << 3) - l | 0,_e[i + 4 >> 2] = 3 | l,_e[(n = i + l | 0) + 4 >> 2] = 1 | a,_e[n + a >> 2] = a,0 | s && (i = 0 | _e[1149],t = 4616 + ((r = s >>> 3) << 1 << 2) | 0,e & (r = 1 << r) ? r = 0 | _e[(e = t + 8 | 0) >> 2] : (_e[1144] = e | r,e = (r = t) + 8 | 0),_e[e >> 2] = i,_e[r + 12 >> 2] = i,_e[i + 8 >> 2] = r,_e[i + 12 >> 2] = t),_e[1146] = a,_e[1149] = n,Te = P,0 | (S = o);if(u = 0 | _e[1145]){
if(t = (u & 0 - u) - 1 | 0,e = 0 | _e[4880 + (((a = (t >>>= o = t >>> 12 & 16) >>> 5 & 8) | o | (f = (t >>>= a) >>> 2 & 4) | (n = (t >>>= f) >>> 1 & 2) | (e = (t >>>= n) >>> 1 & 1)) + (t >>> e) << 2) >> 2],t = (-8 & _e[e + 4 >> 2]) - l | 0,n = 0 | _e[e + 16 + ((0 == (0 | _e[e + 16 >> 2]) & 1) << 2) >> 2]){
for(;t = (f = (o = (-8 & _e[n + 4 >> 2]) - l | 0) >>> 0 < t >>> 0) ? o : t,e = f ? n : e,n = 0 | _e[n + 16 + ((0 == (0 | _e[n + 16 >> 2]) & 1) << 2) >> 2],0 != (0 | n););f = e,a = t;
}else f = e,a = t;if(f >>> 0 < (o = f + l | 0) >>> 0){
i = 0 | _e[f + 24 >> 2],r = 0 | _e[f + 12 >> 2];do{
if((0 | r) == (0 | f)){
if(e = f + 20 | 0,r = 0 | _e[e >> 2],!r && !(r = 0 | _e[(e = f + 16 | 0) >> 2])){
t = 0;break;
}for(;;)if(0 | (n = 0 | _e[(t = r + 20 | 0) >> 2]))r = n,e = t;else{
if(!(n = 0 | _e[(t = r + 16 | 0) >> 2]))break;r = n,e = t;
}_e[e >> 2] = 0,t = r;
}else t = 0 | _e[f + 8 >> 2],_e[t + 12 >> 2] = r,_e[r + 8 >> 2] = t,t = r;
}while(0);do{
if(0 | i){
if(r = 0 | _e[f + 28 >> 2],(0 | f) == (0 | _e[(e = 4880 + (r << 2) | 0) >> 2])){
if(!(_e[e >> 2] = t)){
_e[1145] = u & ~(1 << r);break;
}
}else if(!(_e[i + 16 + (((0 | _e[i + 16 >> 2]) != (0 | f) & 1) << 2) >> 2] = t))break;_e[t + 24 >> 2] = i,0 | (r = 0 | _e[f + 16 >> 2]) && (_e[t + 16 >> 2] = r,_e[r + 24 >> 2] = t),0 | (r = 0 | _e[f + 20 >> 2]) && (_e[t + 20 >> 2] = r,_e[r + 24 >> 2] = t);
}
}while(0);return a >>> 0 < 16 ? (S = a + l | 0,_e[f + 4 >> 2] = 3 | S,_e[(S = f + S + 4 | 0) >> 2] = 1 | _e[S >> 2]) : (_e[f + 4 >> 2] = 3 | l,_e[o + 4 >> 2] = 1 | a,_e[o + a >> 2] = a,0 | s && (n = 0 | _e[1149],t = 4616 + ((r = s >>> 3) << 1 << 2) | 0,c & (r = 1 << r) ? r = 0 | _e[(e = t + 8 | 0) >> 2] : (_e[1144] = c | r,e = (r = t) + 8 | 0),_e[e >> 2] = n,_e[r + 12 >> 2] = n,_e[n + 8 >> 2] = r,_e[n + 12 >> 2] = t),_e[1146] = a,_e[1149] = o),Te = P,0 | (S = f + 8 | 0);
}c = l;
}else c = l;
}else c = l;
}else if(e >>> 0 <= 4294967231)if(l = -8 & (e = e + 11 | 0),f = 0 | _e[1145]){
n = 0 - l | 0,u = (e >>>= 8) ? 16777215 < l >>> 0 ? 31 : l >>> ((u = 14 - ((s = ((m = e << (c = (e + 1048320 | 0) >>> 16 & 8)) + 520192 | 0) >>> 16 & 4) | c | (u = ((m <<= s) + 245760 | 0) >>> 16 & 2)) + (m << u >>> 15) | 0) + 7 | 0) & 1 | u << 1 : 0,t = 0 | _e[4880 + (u << 2) >> 2];e:do{
if(t)for(o = l << (31 == ((e = 0) | u) ? 0 : 25 - (u >>> 1) | 0),a = 0;;){
if((i = (-8 & _e[t + 4 >> 2]) - l | 0) >>> 0 < n >>> 0){
if(!i){
n = 0,i = e = t,m = 61;break e;
}e = t,n = i;
}if(a = 0 == (0 | (i = 0 | _e[t + 20 >> 2])) | (0 | i) == (0 | (t = 0 | _e[t + 16 + (o >>> 31 << 2) >> 2])) ? a : i,i = 0 == (0 | t)){
t = a,m = 57;break;
}o <<= 1 & (1 ^ i);
}else e = t = 0,m = 57;
}while(0);if(57 == (0 | m)){
if(0 == (0 | t) & 0 == (0 | e)){
if(!(e = f & ((e = 2 << u) | 0 - e))){
c = l;break;
}c = (e & 0 - e) - 1 | 0,t = (e = 0) | _e[4880 + (((a = (c >>>= o = c >>> 12 & 16) >>> 5 & 8) | o | (u = (c >>>= a) >>> 2 & 4) | (s = (c >>>= u) >>> 1 & 2) | (t = (c >>>= s) >>> 1 & 1)) + (c >>> t) << 2) >> 2];
}t ? (i = t,m = 61) : (u = e,o = n);
}if(61 == (0 | m))for(;;){
if(m = 0,t = (c = (t = (-8 & _e[i + 4 >> 2]) - l | 0) >>> 0 < n >>> 0) ? t : n,e = c ? i : e,!(i = 0 | _e[i + 16 + ((0 == (0 | _e[i + 16 >> 2]) & 1) << 2) >> 2])){
u = e,o = t;break;
}n = t,m = 61;
}if(0 != (0 | u) && o >>> 0 < ((0 | _e[1146]) - l | 0) >>> 0){
if((a = u + l | 0) >>> 0 <= u >>> 0)return Te = P,(S = 0) | S;i = 0 | _e[u + 24 >> 2],r = 0 | _e[u + 12 >> 2];do{
if((0 | r) == (0 | u)){
if(e = u + 20 | 0,r = 0 | _e[e >> 2],!r && !(r = 0 | _e[(e = u + 16 | 0) >> 2])){
r = 0;break;
}for(;;)if(0 | (n = 0 | _e[(t = r + 20 | 0) >> 2]))r = n,e = t;else{
if(!(n = 0 | _e[(t = r + 16 | 0) >> 2]))break;r = n,e = t;
}_e[e >> 2] = 0;
}else S = 0 | _e[u + 8 >> 2],_e[S + 12 >> 2] = r,_e[r + 8 >> 2] = S;
}while(0);do{
if(i){
if(e = 0 | _e[u + 28 >> 2],(0 | u) == (0 | _e[(t = 4880 + (e << 2) | 0) >> 2])){
if(!(_e[t >> 2] = r)){
n = f & ~(1 << e),_e[1145] = n;break;
}
}else if(!(_e[i + 16 + (((0 | _e[i + 16 >> 2]) != (0 | u) & 1) << 2) >> 2] = r)){
n = f;break;
}_e[r + 24 >> 2] = i,0 | (e = 0 | _e[u + 16 >> 2]) && (_e[r + 16 >> 2] = e,_e[e + 24 >> 2] = r),n = ((e = 0 | _e[u + 20 >> 2]) && (_e[r + 20 >> 2] = e,_e[e + 24 >> 2] = r),f);
}else n = f;
}while(0);do{
if(16 <= o >>> 0){
if(_e[u + 4 >> 2] = 3 | l,_e[a + 4 >> 2] = 1 | o,r = (_e[a + o >> 2] = o) >>> 3,o >>> 0 < 256){
t = 4616 + (r << 1 << 2) | 0,(e = 0 | _e[1144]) & (r = 1 << r) ? r = 0 | _e[(e = t + 8 | 0) >> 2] : (_e[1144] = e | r,e = (r = t) + 8 | 0),_e[e >> 2] = a,_e[r + 12 >> 2] = a,_e[a + 8 >> 2] = r,_e[a + 12 >> 2] = t;break;
}if(t = 4880 + ((r = (r = o >>> 8) ? 16777215 < o >>> 0 ? 31 : o >>> ((r = 14 - ((b = ((S = r << (m = (r + 1048320 | 0) >>> 16 & 8)) + 520192 | 0) >>> 16 & 4) | m | (r = ((S <<= b) + 245760 | 0) >>> 16 & 2)) + (S << r >>> 15) | 0) + 7 | 0) & 1 | r << 1 : 0) << 2) | 0,_e[a + 28 >> 2] = r,_e[(e = a + 16 | 0) + 4 >> 2] = 0,_e[e >> 2] = 0,!(n & (e = 1 << r))){
_e[1145] = n | e,_e[t >> 2] = a,_e[a + 24 >> 2] = t,_e[a + 12 >> 2] = a,_e[a + 8 >> 2] = a;break;
}for(e = o << (31 == (0 | r) ? 0 : 25 - (r >>> 1) | 0),t = 0 | _e[t >> 2];;){
if((-8 & _e[t + 4 >> 2] | 0) == (0 | o)){
m = 97;break;
}if(!(r = 0 | _e[(n = t + 16 + (e >>> 31 << 2) | 0) >> 2])){
m = 96;break;
}e <<= 1,t = r;
}if(96 == (0 | m)){
_e[n >> 2] = a,_e[a + 24 >> 2] = t,_e[a + 12 >> 2] = a,_e[a + 8 >> 2] = a;break;
}if(97 == (0 | m)){
S = 0 | _e[(m = t + 8 | 0) >> 2],_e[S + 12 >> 2] = a,_e[m >> 2] = a,_e[a + 8 >> 2] = S,_e[a + 12 >> 2] = t,_e[a + 24 >> 2] = 0;break;
}
}else S = o + l | 0,_e[u + 4 >> 2] = 3 | S,_e[(S = u + S + 4 | 0) >> 2] = 1 | _e[S >> 2];
}while(0);return Te = P,0 | (S = u + 8 | 0);
}c = l;
}else c = l;else c = -1;
}while(0);if(c >>> 0 <= (t = 0 | _e[1146]) >>> 0)return r = t - c | 0,e = 0 | _e[1149],15 < r >>> 0 ? (S = e + c | 0,_e[1149] = S,_e[1146] = r,_e[S + 4 >> 2] = 1 | r,_e[S + r >> 2] = r,_e[e + 4 >> 2] = 3 | c) : (_e[1146] = 0,_e[1149] = 0,_e[e + 4 >> 2] = 3 | t,_e[(S = e + t + 4 | 0) >> 2] = 1 | _e[S >> 2]),Te = P,0 | (S = e + 8 | 0);if(c >>> 0 < (o = 0 | _e[1147]) >>> 0)return b = o - c | 0,_e[1147] = b,m = (S = 0 | _e[1150]) + c | 0,_e[1150] = m,_e[m + 4 >> 2] = 1 | b,_e[S + 4 >> 2] = 3 | c,Te = P,0 | (S = S + 8 | 0);if(u = c + 48 | 0,(l = (a = (e = 0 | _e[1262] ? 0 | _e[1264] : (_e[1264] = 4096,_e[1263] = 4096,_e[1265] = -1,_e[1266] = -1,_e[1267] = 0,_e[1255] = 0,e = -16 & _ ^ 1431655768,_e[_ >> 2] = e,_e[1262] = e,4096)) + (f = c + 47 | 0) | 0) & (i = 0 - e | 0)) >>> 0 <= c >>> 0)return Te = P,(S = 0) | S;if(0 | (e = 0 | _e[1254]) && (_ = (s = 0 | _e[1252]) + l | 0) >>> 0 <= s >>> 0 | e >>> 0 < _ >>> 0)return Te = P,(S = 0) | S;e:do{
if(4 & _e[1255])r = 0,m = 133;else{
t = 0 | _e[1150];r:do{
if(t){
for(n = 5024;!((e = 0 | _e[n >> 2]) >>> 0 <= t >>> 0 && (e + (0 | _e[(T = n + 4 | 0) >> 2]) | 0) >>> 0 > t >>> 0);){
if(!(e = 0 | _e[n + 8 >> 2])){
m = 118;break r;
}n = e;
}if((r = a - o & i) >>> 0 < 2147483647)if((0 | (e = 0 | me(0 | r))) == ((0 | _e[n >> 2]) + (0 | _e[T >> 2]) | 0)){
if(-1 != (0 | e)){
o = r,a = e,m = 135;break e;
}
}else n = e,m = 126;else r = 0;
}else m = 118;
}while(0);do{
if(118 == (0 | m))if(-1 != (0 | (t = 0 | me(0))) && (r = t,E = (r = (0 == ((E = (d = 0 | _e[1263]) + -1 | 0) & r | 0) ? 0 : (E + r & 0 - d) - r | 0) + l | 0) + (d = 0 | _e[1252]) | 0,c >>> 0 < r >>> 0 & r >>> 0 < 2147483647)){
if(0 | (T = 0 | _e[1254]) && E >>> 0 <= d >>> 0 | T >>> 0 < E >>> 0){
r = 0;break;
}if((0 | (e = 0 | me(0 | r))) == (0 | t)){
o = r,a = t,m = 135;break e;
}n = e,m = 126;
}else r = 0;
}while(0);do{
if(126 == (0 | m)){
if(t = 0 - r | 0,!(r >>> 0 < u >>> 0 & r >>> 0 < 2147483647 & -1 != (0 | n))){
if(-1 == (0 | n)){
r = 0;break;
}o = r,a = n,m = 135;break e;
}if(2147483647 <= (e = f - r + (e = 0 | _e[1264]) & 0 - e) >>> 0){
o = r,a = n,m = 135;break e;
}if(-1 == (0 | me(0 | e))){
me(0 | t),r = 0;break;
}o = e + r | 0,a = n,m = 135;break e;
}
}while(0);_e[1255] = 4 | _e[1255],m = 133;
}
}while(0);if(133 == (0 | m) && l >>> 0 < 2147483647 && !(-1 == (0 | (b = 0 | me(0 | l))) | 1 ^ (M = (c + 40 | 0) >>> 0 < (A = (T = 0 | me(0)) - b | 0) >>> 0) | b >>> 0 < T >>> 0 & -1 != (0 | b) & -1 != (0 | T) ^ 1) && (o = M ? A : r,a = b,m = 135),135 == (0 | m)){
r = (0 | _e[1252]) + o | 0,(_e[1252] = r) >>> 0 > (0 | _e[1253]) >>> 0 && (_e[1253] = r),f = 0 | _e[1150];do{
if(f){
for(r = 5024;;){
if((0 | a) == ((e = 0 | _e[r >> 2]) + (n = 0 | _e[(t = r + 4 | 0) >> 2]) | 0)){
m = 145;break;
}if(!(i = 0 | _e[r + 8 >> 2]))break;r = i;
}if(145 == (0 | m) && 0 == (8 & _e[r + 12 >> 2] | 0) && f >>> 0 < a >>> 0 & e >>> 0 <= f >>> 0){
_e[t >> 2] = n + o,m = f + (S = 0 == (7 & (S = f + 8 | 0) | 0) ? 0 : 0 - S & 7) | 0,S = (0 | _e[1147]) + (o - S) | 0,_e[1150] = m,_e[1147] = S,_e[m + 4 >> 2] = 1 | S,_e[m + S + 4 >> 2] = 40,_e[1151] = _e[1266];break;
}for(a >>> 0 < (0 | _e[1148]) >>> 0 && (_e[1148] = a),t = a + o | 0,r = 5024;;){
if((0 | _e[r >> 2]) == (0 | t)){
m = 153;break;
}if(!(e = 0 | _e[r + 8 >> 2]))break;r = e;
}if(153 == (0 | m) && 0 == (8 & _e[r + 12 >> 2] | 0)){
_e[r >> 2] = a,_e[(s = r + 4 | 0) >> 2] = (0 | _e[s >> 2]) + o,l = (s = a + (0 == (7 & (s = a + 8 | 0) | 0) ? 0 : 0 - s & 7) | 0) + c | 0,u = (r = t + (0 == (7 & (r = t + 8 | 0) | 0) ? 0 : 0 - r & 7) | 0) - s - c | 0,_e[s + 4 >> 2] = 3 | c;do{
if((0 | r) != (0 | f)){
if((0 | r) == (0 | _e[1149])){
S = (0 | _e[1146]) + u | 0,_e[1146] = S,_e[1149] = l,_e[l + 4 >> 2] = 1 | S,_e[l + S >> 2] = S;break;
}if(1 == (3 & (e = 0 | _e[r + 4 >> 2]) | 0)){
o = -8 & e,n = e >>> 3;e:do{
if(e >>> 0 < 256){
if(e = 0 | _e[r + 8 >> 2],(0 | (t = 0 | _e[r + 12 >> 2])) == (0 | e)){
_e[1144] = _e[1144] & ~(1 << n);break;
}_e[e + 12 >> 2] = t,_e[t + 8 >> 2] = e;break;
}a = 0 | _e[r + 24 >> 2],e = 0 | _e[r + 12 >> 2];do{
if((0 | e) == (0 | r)){
if(!(e = 0 | _e[(t = (n = r + 16 | 0) + 4 | 0) >> 2])){
if(!(e = 0 | _e[n >> 2])){
e = 0;break;
}t = n;
}for(;;)if(0 | (i = 0 | _e[(n = e + 20 | 0) >> 2]))e = i,t = n;else{
if(!(i = 0 | _e[(n = e + 16 | 0) >> 2]))break;e = i,t = n;
}_e[t >> 2] = 0;
}else S = 0 | _e[r + 8 >> 2],_e[S + 12 >> 2] = e,_e[e + 8 >> 2] = S;
}while(0);if(!a)break;n = 4880 + ((t = 0 | _e[r + 28 >> 2]) << 2) | 0;do{
if((0 | r) == (0 | _e[n >> 2])){
if(0 | (_e[n >> 2] = e))break;_e[1145] = _e[1145] & ~(1 << t);break e;
}if(!(_e[a + 16 + (((0 | _e[a + 16 >> 2]) != (0 | r) & 1) << 2) >> 2] = e))break e;
}while(0);
}while((_e[e + 24 >> 2] = a,0 | (n = 0 | _e[(t = r + 16 | 0) >> 2]) && (_e[e + 16 >> 2] = n,_e[n + 24 >> 2] = e),t = 0 | _e[t + 4 >> 2]) && (_e[e + 20 >> 2] = t,_e[t + 24 >> 2] = e,0));r = r + o | 0,i = o + u | 0;
}else i = u;if(_e[(r = r + 4 | 0) >> 2] = -2 & _e[r >> 2],_e[l + 4 >> 2] = 1 | i,r = (_e[l + i >> 2] = i) >>> 3,i >>> 0 < 256){
t = 4616 + (r << 1 << 2) | 0,(e = 0 | _e[1144]) & (r = 1 << r) ? r = 0 | _e[(e = t + 8 | 0) >> 2] : (_e[1144] = e | r,e = (r = t) + 8 | 0),_e[e >> 2] = l,_e[r + 12 >> 2] = l,_e[l + 8 >> 2] = r,_e[l + 12 >> 2] = t;break;
}r = i >>> 8;do{
if(r){
if(16777215 < i >>> 0){
r = 31;break;
}r = i >>> ((r = 14 - ((b = ((S = r << (m = (r + 1048320 | 0) >>> 16 & 8)) + 520192 | 0) >>> 16 & 4) | m | (r = ((S <<= b) + 245760 | 0) >>> 16 & 2)) + (S << r >>> 15) | 0) + 7 | 0) & 1 | r << 1;
}else r = 0;
}while(0);if(n = 4880 + (r << 2) | 0,_e[l + 28 >> 2] = r,_e[(e = l + 16 | 0) + 4 >> 2] = 0,!((e = (_e[e >> 2] = 0) | _e[1145]) & (t = 1 << r))){
_e[1145] = e | t,_e[n >> 2] = l,_e[l + 24 >> 2] = n,_e[l + 12 >> 2] = l,_e[l + 8 >> 2] = l;break;
}for(e = i << (31 == (0 | r) ? 0 : 25 - (r >>> 1) | 0),t = 0 | _e[n >> 2];;){
if((-8 & _e[t + 4 >> 2] | 0) == (0 | i)){
m = 194;break;
}if(!(r = 0 | _e[(n = t + 16 + (e >>> 31 << 2) | 0) >> 2])){
m = 193;break;
}e <<= 1,t = r;
}if(193 == (0 | m)){
_e[n >> 2] = l,_e[l + 24 >> 2] = t,_e[l + 12 >> 2] = l,_e[l + 8 >> 2] = l;break;
}if(194 == (0 | m)){
S = 0 | _e[(m = t + 8 | 0) >> 2],_e[S + 12 >> 2] = l,_e[m >> 2] = l,_e[l + 8 >> 2] = S,_e[l + 12 >> 2] = t,_e[l + 24 >> 2] = 0;break;
}
}else S = (0 | _e[1147]) + u | 0,_e[1147] = S,_e[1150] = l,_e[l + 4 >> 2] = 1 | S;
}while(0);return Te = P,0 | (S = s + 8 | 0);
}for(r = 5024;!((e = 0 | _e[r >> 2]) >>> 0 <= f >>> 0 && f >>> 0 < (S = e + (0 | _e[r + 4 >> 2]) | 0) >>> 0);)r = 0 | _e[r + 8 >> 2];for(i = S + -47 | 0,e = i + 8 | 0,e = i + (0 == (7 & e | 0) ? 0 : 0 - e & 7) | 0,i = f + 16 | 0,e = e >>> 0 < i >>> 0 ? f : e,r = e + 8 | 0,t = a + 8 | 0,t = 0 == (7 & t | 0) ? 0 : 0 - t & 7,m = a + t | 0,t = o + -40 - t | 0,_e[1150] = m,_e[1147] = t,_e[m + 4 >> 2] = 1 | t,_e[m + t + 4 >> 2] = 40,_e[1151] = _e[1266],t = e + 4 | 0,_e[t >> 2] = 27,_e[r >> 2] = _e[1256],_e[r + 4 >> 2] = _e[1257],_e[r + 8 >> 2] = _e[1258],_e[r + 12 >> 2] = _e[1259],_e[1256] = a,_e[1257] = o,_e[1259] = 0,_e[1258] = r,r = e + 24 | 0;_e[(r = (m = r) + 4 | 0) >> 2] = 7,(m + 8 | 0) >>> 0 < S >>> 0;);if((0 | e) != (0 | f)){
if(a = e - f | 0,_e[t >> 2] = -2 & _e[t >> 2],_e[f + 4 >> 2] = 1 | a,r = (_e[e >> 2] = a) >>> 3,a >>> 0 < 256){
t = 4616 + (r << 1 << 2) | 0,(e = 0 | _e[1144]) & (r = 1 << r) ? r = 0 | _e[(e = t + 8 | 0) >> 2] : (_e[1144] = e | r,e = (r = t) + 8 | 0),_e[e >> 2] = f,_e[r + 12 >> 2] = f,_e[f + 8 >> 2] = r,_e[f + 12 >> 2] = t;break;
}if(n = 4880 + ((t = (r = a >>> 8) ? 16777215 < a >>> 0 ? 31 : a >>> ((t = 14 - ((b = ((S = r << (m = (r + 1048320 | 0) >>> 16 & 8)) + 520192 | 0) >>> 16 & 4) | m | (t = ((S <<= b) + 245760 | 0) >>> 16 & 2)) + (S << t >>> 15) | 0) + 7 | 0) & 1 | t << 1 : 0) << 2) | 0,_e[f + 28 >> 2] = t,_e[f + 20 >> 2] = 0,!((r = (_e[i >> 2] = 0) | _e[1145]) & (e = 1 << t))){
_e[1145] = r | e,_e[n >> 2] = f,_e[f + 24 >> 2] = n,_e[f + 12 >> 2] = f,_e[f + 8 >> 2] = f;break;
}for(e = a << (31 == (0 | t) ? 0 : 25 - (t >>> 1) | 0),t = 0 | _e[n >> 2];;){
if((-8 & _e[t + 4 >> 2] | 0) == (0 | a)){
m = 216;break;
}if(!(r = 0 | _e[(n = t + 16 + (e >>> 31 << 2) | 0) >> 2])){
m = 215;break;
}e <<= 1,t = r;
}if(215 == (0 | m)){
_e[n >> 2] = f,_e[f + 24 >> 2] = t,_e[f + 12 >> 2] = f,_e[f + 8 >> 2] = f;break;
}if(216 == (0 | m)){
S = 0 | _e[(m = t + 8 | 0) >> 2],_e[S + 12 >> 2] = f,_e[m >> 2] = f,_e[f + 8 >> 2] = S,_e[f + 12 >> 2] = t,_e[f + 24 >> 2] = 0;break;
}
}
}else{
for(S = 0 | _e[1148],0 == (0 | S) | a >>> 0 < S >>> 0 && (_e[1148] = a),_e[1256] = a,_e[1257] = o,_e[1259] = 0,_e[1153] = _e[1262],_e[1152] = -1,r = 0;_e[(S = 4616 + (r << 1 << 2) | 0) + 12 >> 2] = S,_e[S + 8 >> 2] = S,r = r + 1 | 0,32 != (0 | r););m = a + (S = 0 == (7 & (S = a + 8 | 0) | 0) ? 0 : 0 - S & 7) | 0,S = o + -40 - S | 0,_e[1150] = m,_e[1147] = S,_e[m + 4 >> 2] = 1 | S,_e[m + S + 4 >> 2] = 40,_e[1151] = _e[1266];
}
}while(0);if(c >>> 0 < (r = 0 | _e[1147]) >>> 0)return b = r - c | 0,_e[1147] = b,m = (S = 0 | _e[1150]) + c | 0,_e[1150] = m,_e[m + 4 >> 2] = 1 | b,_e[S + 4 >> 2] = 3 | c,Te = P,0 | (S = S + 8 | 0);
}return _e[(S = 296) >> 2] = 12,Te = P,(S = 0) | S;
}function D(e,r,t,n,i,a){
e |= 0,r = +r,t |= 0,n |= 0,i |= 0,a |= 0;var o,u = 0,f = 0,l = 0,s = 0,c = 0,_ = 0,d = 0,E = 0,T = 0,A = 0,M = 0,b = 0,m = 0,S = 0,P = 0,R = 0,h = 0,p = 0,C = 0,N = 0,y = 0,O = 0,v = Te;Te = Te + 560 | 0,l = v + 8 | 0,y = O = (M = v) + 524 | 0,N = (s = v + 512 | 0) + 12 | (_e[M >> 2] = 0),ke(r),h = (0 | L) < 0 ? (r = -r,p = 1,2087) : (p = 0 != (2049 & i | 0) & 1,0 == (2048 & i | 0) ? 0 == (1 & i | 0) ? 2088 : 2093 : 2090),ke(r),C = 2146435072 & L;do{
if(C >>> 0 < 2146435072 | 2146435072 == (0 | C) & !1){
if((u = 0 != (E = 2 * (o = M,+ + +function e(r,t){
r = +r;t |= 0;var n = 0,i = 0,a = 0;k[g >> 3] = r;n = 0 | _e[g >> 2];i = 0 | _e[g + 4 >> 2];a = 0 | ye(0 | n,0 | i,52);switch(2047 & a){
case 0:n = 0 != r ? (r = +e(0x10000000000000000 * r,t),(0 | _e[t >> 2]) - 64 | 0) : 0,_e[t >> 2] = n;break;case 2047:break;default:_e[t >> 2] = (2047 & a) - 1022,_e[g >> 2] = n,_e[g + 4 >> 2] = -2146435073 & i | 1071644672,r = +k[g >> 3];
}return+r;
}(+r,o |= 0)))) && (_e[M >> 2] = (0 | _e[M >> 2]) - 1),97 == (0 | (m = 32 | a))){
d = 0 == (0 | (T = 32 & a)) ? h : h + 9 | 0,_ = 2 | p,u = 12 - n | 0;do{
if(!(11 < n >>> 0 | 0 == (0 | u))){
for(r = 8;u = u + -1 | 0,r *= 16,0 != (0 | u););if(45 == (0 | ce[d >> 0])){
r = -(r + (-E - r));break;
}r = E + r - r;break;
}
}while(r = E,0);for(f = 0 | _e[M >> 2],u = (0 | f) < 0 ? 0 - f | 0 : f,u = 0 | fe(u,((0 | u) < 0) << 31 >> 31,N),(0 | u) == (0 | N) && (ce[(u = s + 11 | 0) >> 0] = 48),ce[u + -1 >> 0] = 43 + (f >> 31 & 2),c = u + -2 | 0,ce[c >> 0] = a + 15,s = (0 | n) < 1,l = 0 == (8 & i | 0),u = O;C = ~~r,f = u + 1 | 0,ce[u >> 0] = de[2122 + C >> 0] | T,r = 16 * (r - (0 | C)),u = 1 != (f - y | 0) || l & s & 0 == r ? f : (ce[f >> 0] = 46,u + 2 | 0),0 != r;);C = u - y | 0,se(e,32,t,u = (y = N - c | 0) + _ + (N = 0 != (0 | n) & (C + -2 | 0) < (0 | n) ? n + 2 | 0 : C) | 0,i),Ie(e,d,_),se(e,48,t,u,65536 ^ i),Ie(e,O,C),se(e,48,N - C | 0,0,0),Ie(e,c,y),se(e,32,t,u,8192 ^ i);break;
}for(f = (0 | n) < 0 ? 6 : n,u ? (u = (0 | _e[M >> 2]) - 28 | 0,_e[M >> 2] = u,r = 268435456 * E) : (r = E,u = 0 | _e[M >> 2]),C = (0 | u) < 0 ? l : l + 288 | 0,l = C;P = ~~r >>> 0,_e[l >> 2] = P,l = l + 4 | 0,r = 1e9 * (r - (P >>> 0)),0 != r;);if(0 < (0 | u))for(s = C,_ = l;;){
if(c = (0 | u) < 29 ? u : 29,s >>> 0 <= (u = _ + -4 | 0) >>> 0){
for(l = 0;b = 0 | he(0 | (S = 0 | ge(0 | (S = 0 | Ne(0 | _e[u >> 2],0,0 | c)),0 | L,0 | l,0)),0 | (P = L),1e9,0),_e[u >> 2] = b,l = 0 | Fe(0 | S,0 | P,1e9,0),u = u + -4 | 0,s >>> 0 <= u >>> 0;);l && (_e[(s = s + -4 | 0) >> 2] = l);
}for(l = _;!(l >>> 0 <= s >>> 0 || 0 | _e[(u = l + -4 | 0) >> 2]);)l = u;if(u = (0 | _e[M >> 2]) - c | 0,!(0 < (0 | (_e[M >> 2] = u))))break;_ = l;
}else s = C;if((0 | u) < 0){
n = 1 + ((f + 25 | 0) / 9 | 0) | 0,A = 102 == (0 | m);do{
if(T = (0 | (T = 0 - u | 0)) < 9 ? T : 9,s >>> 0 < l >>> 0){
for(c = (1 << T) - 1 | 0,_ = 1e9 >>> T,d = 0,u = s;P = 0 | _e[u >> 2],_e[u >> 2] = (P >>> T) + d,d = 0 | ie(P & c,_),u = u + 4 | 0,u >>> 0 < l >>> 0;);u = 0 == (0 | _e[s >> 2]) ? s + 4 | 0 : s,u = d ? (_e[l >> 2] = d,s = u,l + 4 | 0) : (s = u,l);
}else s = 0 == (0 | _e[s >> 2]) ? s + 4 | 0 : s,u = l;
}while(l = (0 | n) < (u - (l = A ? C : s) >> 2 | 0) ? l + (n << 2) | 0 : u,u = (0 | _e[M >> 2]) + T | 0,(0 | (_e[M >> 2] = u)) < 0);u = s,n = l;
}else u = s,n = l;if(P = C,u >>> 0 < n >>> 0){
if(l = 9 * (P - u >> 2) | 0,10 <= (c = 0 | _e[u >> 2]) >>> 0)for(s = 10;s = 10 * s | 0,l = l + 1 | 0,s >>> 0 <= c >>> 0;);
}else l = 0;if((0 | (s = f - (102 != (0 | m) ? l : 0) + (((b = 0 != (0 | f)) & (A = 103 == (0 | m))) << 31 >> 31) | 0)) < ((9 * (n - P >> 2) | 0) - 9 | 0)){
if(T = C + 4 + (((0 | (s = s + 9216 | 0)) / 9 | 0) - 1024 << 2) | 0,(0 | (s = 1 + ((0 | s) % 9 | 0) | 0)) < 9)for(c = 10;c = 10 * c | 0,s = s + 1 | 0,9 != (0 | s););else c = 10;if((s = (T + 4 | 0) == (0 | n)) & 0 == (0 | (d = ((_ = 0 | _e[T >> 2]) >>> 0) % (c >>> 0) | 0)))s = T;else if(E = 0 == (1 & ((_ >>> 0) / (c >>> 0) | 0) | 0) ? 9007199254740992 : 9007199254740994,r = d >>> 0 < (S = (0 | c) / 2 | 0) >>> 0 ? .5 : s & (0 | d) == (0 | S) ? 1 : 1.5,p && (r = (S = 45 == (0 | ce[h >> 0])) ? -r : r,E = S ? -E : E),s = _ - d | 0,_e[T >> 2] = s,E + r != E){
if(S = s + c | 0,999999999 < (_e[T >> 2] = S) >>> 0)for(l = T;(s = l + -4 | 0) >>> (_e[l >> 2] = 0) < u >>> 0 && (_e[(u = u + -4 | 0) >> 2] = 0),S = 1 + (0 | _e[s >> 2]) | 0,999999999 < (_e[s >> 2] = S) >>> 0;)l = s;else s = T;if(l = 9 * (P - u >> 2) | 0,10 <= (_ = 0 | _e[u >> 2]) >>> 0)for(c = 10;c = 10 * c | 0,l = l + 1 | 0,c >>> 0 <= _ >>> 0;);
}else s = T;s = (s = s + 4 | 0) >>> 0 < n >>> 0 ? s : n,S = u;
}else s = n,S = u;for(m = s;;){
if(m >>> 0 <= S >>> 0){
M = 0;break;
}if(0 | _e[(u = m + -4 | 0) >> 2]){
M = 1;break;
}m = u;
}n = 0 - l | 0;do{
if(A){
if(f = (0 | l) < (0 | (u = (1 & (1 ^ b)) + f | 0)) & -5 < (0 | l) ? (c = a + -1 | 0,u + -1 - l | 0) : (c = a + -2 | 0,u + -1 | 0),!(u = 8 & i)){
if(M && 0 != (0 | (R = 0 | _e[m + -4 >> 2])))if((R >>> 0) % 10 | 0)s = 0;else for(s = 0,u = 10;u = 10 * u | 0,s = s + 1 | 0,!((R >>> 0) % (u >>> 0) | 0););else s = 9;if(u = (9 * (m - P >> 2) | 0) - 9 | 0,102 == (32 | c)){
f = (0 | f) < (0 | (T = 0 < (0 | (T = u - s | 0)) ? T : 0)) ? f : T,T = 0;break;
}f = (0 | f) < (0 | (T = 0 < (0 | (T = u + l - s | 0)) ? T : 0)) ? f : T,T = 0;break;
}T = u;
}else c = a,T = 8 & i;
}while(0);if(_ = 0 != (0 | (A = f | T)) & 1,d = 102 == (32 | c))u = (b = 0) < (0 | l) ? l : 0;else{
if(((s = N) - (u = 0 | fe(u = (0 | l) < 0 ? n : l,((0 | u) < 0) << 31 >> 31,N)) | 0) < 2)for(;ce[(u = u + -1 | 0) >> 0] = 48,(s - u | 0) < 2;);ce[u + -1 >> 0] = 43 + (l >> 31 & 2),ce[(u = u + -2 | 0) >> 0] = c,u = s - (b = u) | 0;
}if(se(e,32,t,u = p + 1 + f + _ + u | 0,i),Ie(e,h,p),se(e,48,t,u,65536 ^ i),d){
_ = T = O + 9 | 0,d = O + 8 | 0,s = c = C >>> 0 < S >>> 0 ? C : S;do{
if(l = 0 | fe(0 | _e[s >> 2],0,T),(0 | s) == (0 | c))(0 | l) == (0 | T) && (ce[d >> 0] = 48,l = d);else if(O >>> 0 < l >>> 0)for(ne(0 | O,48,l - y | 0);l = l + -1 | 0,O >>> 0 < l >>> 0;);
}while(Ie(e,l,_ - l | 0),(s = s + 4 | 0) >>> 0 <= C >>> 0);if(0 | A && Ie(e,2138,1),s >>> 0 < m >>> 0 & 0 < (0 | f))for(;;){
if(O >>> 0 < (l = 0 | fe(0 | _e[s >> 2],0,T)) >>> 0)for(ne(0 | O,48,l - y | 0);l = l + -1 | 0,O >>> 0 < l >>> 0;);if(Ie(e,l,(0 | f) < 9 ? f : 9),l = f + -9 | 0,!((s = s + 4 | 0) >>> 0 < m >>> 0 & 9 < (0 | f))){
f = l;break;
}f = l;
}se(e,48,f + 9 | 0,9,0);
}else{
if(A = M ? m : S + 4 | 0,-1 < (0 | f)){
T = 0 == (0 | T),n = M = O + 9 | 0,_ = 0 - y | 0,d = O + 8 | 0,c = S;do{
(0 | (l = 0 | fe(0 | _e[c >> 2],0,M))) == (0 | M) && (ce[d >> 0] = 48,l = d);do{
if((0 | c) == (0 | S)){
if(s = l + 1 | 0,Ie(e,l,1),T & (0 | f) < 1){
l = s;break;
}Ie(e,2138,1),l = s;
}else{
if(l >>> 0 <= O >>> 0)break;for(ne(0 | O,48,l + _ | 0);l = l + -1 | 0,O >>> 0 < l >>> 0;);
}
}while(0);
}while(Ie(e,l,(0 | (y = n - l | 0)) < (0 | f) ? y : f),(c = c + 4 | 0) >>> 0 < A >>> 0 & -1 < (0 | (f = f - y | 0)));
}se(e,48,f + 18 | 0,18,0),Ie(e,b,N - b | 0);
}se(e,32,t,u,8192 ^ i);
}else O = 0 != (32 & a | 0),se(e,32,t,u = p + 3 | 0,-65537 & i),Ie(e,h,p),Ie(e,r != r | !1 ? O ? 2114 : 2118 : O ? 2106 : 2110,3),se(e,32,t,u,8192 ^ i);
}while(0);return Te = v,0 | ((0 | u) < (0 | t) ? t : u);
}function w(e,r,t,n,i){
e |= 0,r |= 0,t |= 0,n |= 0,i |= 0;var a,o,u,f,l,s,c,_,d,E = 0,T = 0,A = 0,M = 0,b = 0,m = 0,S = 0,P = 0,R = 0,h = 0,p = 0,C = 0,N = 0,y = Te;Te = Te + 64 | 0,f = (c = y) + 24 | 0,_ = y + 8 | 0,d = y + 20 | 0,_e[(s = y + 16 | 0) >> 2] = r,a = 0 != (0 | e),u = o = 40 + f | 0,f = 39 + f | 0,l = 4 + _ | 0,m = E = T = 0;e:for(;;){
do{
if(-1 < (0 | E)){
if((2147483647 - E | 0) < (0 | T)){
_e[(E = 296) >> 2] = 75,E = -1;break;
}E = T + E | 0;break;
}
}while(0);if(!((T = 0 | ce[r >> 0]) << 24 >> 24)){
N = 87;break;
}A = r;r:for(;;){
switch(T << 24 >> 24){
case 37:T = A,N = 9;break r;case 0:T = A;break r;
}C = A + 1 | 0,_e[s >> 2] = C,T = 0 | ce[C >> 0],A = C;
}r:do{
if(9 == (0 | N))for(;;){
if(37 != ((N = 0) | ce[A + 1 >> 0]))break r;if(T = T + 1 | 0,A = A + 2 | 0,_e[s >> 2] = A,37 != (0 | ce[A >> 0]))break;N = 9;
}
}while(0);if(T = T - r | 0,a && Ie(e,r,T),0 | T)r = A;else{
(T = (0 | ce[(M = A + 1 | 0) >> 0]) - 48 | 0) >>> 0 < 10 ? (p = (C = 36 == (0 | ce[A + 2 >> 0])) ? T : -1,m = C ? 1 : m,M = C ? A + 3 | 0 : M) : p = -1,_e[s >> 2] = M,A = ((T = 0 | ce[M >> 0]) << 24 >> 24) - 32 | 0;r:do{
if(A >>> 0 < 32)for(b = 0,S = T;;){
if(!(75913 & (T = 1 << A))){
T = S;break r;
}if(b |= T,M = M + 1 | 0,_e[s >> 2] = M,32 <= (A = ((T = 0 | ce[M >> 0]) << 24 >> 24) - 32 | 0) >>> 0)break;S = T;
}else b = 0;
}while(0);if(T << 24 >> 24 == 42){
if((T = (0 | ce[(A = M + 1 | 0) >> 0]) - 48 | 0) >>> 0 < 10 && 36 == (0 | ce[M + 2 >> 0]))_e[i + (T << 2) >> 2] = 10,T = 0 | _e[n + ((0 | ce[A >> 0]) - 48 << 3) >> 2],m = 1,M = M + 3 | 0;else{
if(0 | m){
E = -1;break;
}M = (m = a ? (m = 3 + (0 | _e[t >> 2]) & -4,T = 0 | _e[m >> 2],_e[t >> 2] = m + 4,0) : T = 0,A);
}_e[s >> 2] = M,T = (C = (0 | T) < 0) ? 0 - T | 0 : T,b = C ? 8192 | b : b;
}else{
if((0 | (T = 0 | Se(s))) < 0){
E = -1;break;
}M = 0 | _e[s >> 2];
}do{
if(46 == (0 | ce[M >> 0])){
if(42 != (0 | ce[M + 1 >> 0])){
_e[s >> 2] = M + 1,A = 0 | Se(s),M = 0 | _e[s >> 2];break;
}if((A = (0 | ce[(S = M + 2 | 0) >> 0]) - 48 | 0) >>> 0 < 10 && 36 == (0 | ce[M + 3 >> 0])){
_e[i + (A << 2) >> 2] = 10,A = 0 | _e[n + ((0 | ce[S >> 0]) - 48 << 3) >> 2],M = M + 4 | 0,_e[s >> 2] = M;break;
}if(0 | m){
E = -1;break e;
}a ? (C = 3 + (0 | _e[t >> 2]) & -4,A = 0 | _e[C >> 2],_e[t >> 2] = C + 4) : A = 0,M = _e[s >> 2] = S;
}else A = -1;
}while(0);for(h = 0;;){
if(57 < ((0 | ce[M >> 0]) - 65 | 0) >>> 0){
E = -1;break e;
}if(C = M + 1 | 0,_e[s >> 2] = C,!(((P = 255 & (S = 0 | ce[(0 | ce[M >> 0]) - 65 + (1606 + (58 * h | 0)) >> 0])) + -1 | 0) >>> 0 < 8))break;h = P,M = C;
}if(!(S << 24 >> 24)){
E = -1;break;
}R = -1 < (0 | p);do{
if(S << 24 >> 24 == 19){
if(R){
E = -1;break e;
}N = 49;
}else{
if(R){
_e[i + (p << 2) >> 2] = P,p = 0 | _e[(R = n + (p << 3) | 0) + 4 >> 2],_e[(N = c) >> 2] = _e[R >> 2],_e[N + 4 >> 2] = p,N = 49;break;
}if(!a){
E = 0;break e;
}H(c,P,t);
}
}while(0);if(49 != (0 | N) || (N = 0,a)){
M = 0 != (0 | h) & 3 == (15 & (M = 0 | ce[M >> 0]) | 0) ? -33 & M : M,R = -65537 & b,p = 0 == (8192 & b | 0) ? b : R;r:do{
switch(0 | M){
case 110:switch((255 & h) << 24 >> 24){
case 0:case 1:_e[_e[c >> 2] >> 2] = E,T = 0,r = C;continue e;case 2:T = 0 | _e[c >> 2],_e[T >> 2] = E,_e[T + 4 >> 2] = ((0 | E) < 0) << 31 >> 31,T = 0,r = C;continue e;case 3:W[_e[c >> 2] >> 1] = E,T = 0,r = C;continue e;case 4:ce[_e[c >> 2] >> 0] = E,T = 0,r = C;continue e;case 6:_e[_e[c >> 2] >> 2] = E,T = 0,r = C;continue e;case 7:T = 0 | _e[c >> 2],_e[T >> 2] = E,_e[T + 4 >> 2] = ((0 | E) < 0) << 31 >> 31,T = 0,r = C;continue e;default:T = 0,r = C;continue e;
}case 112:M = 120,A = 8 < A >>> 0 ? A : 8,r = 8 | p,N = 61;break;case 88:case 120:r = p,N = 61;break;case 111:S = 2070,A = (b = 0) == (8 & p | 0) | (0 | (R = u - (P = 0 | function(e,r,t){
if(t |= 0,!(0 == (0 | (e |= 0)) & 0 == (0 | (r |= 0))))for(;ce[(t = t + -1 | 0) >> 0] = 7 & e | 48,e = 0 | ye(0 | e,0 | r,3),r = L,!(0 == (0 | e) & 0 == (0 | r)););return 0 | t;
}(r = 0 | _e[(M = c) >> 2],M = 0 | _e[M + 4 >> 2],o)) | 0)) < (0 | A) ? A : R + 1 | 0,R = p,N = 67;break;case 105:case 100:if(r = 0 | _e[(M = c) >> 2],(0 | (M = 0 | _e[M + 4 >> 2])) < 0){
r = 0 | ve(0,0,0 | r,0 | M),M = L,_e[(b = c) >> 2] = r,_e[b + 4 >> 2] = M,b = 1,S = 2070,N = 66;break r;
}b = 0 != (2049 & p | 0) & 1,S = 0 == (2048 & p | 0) ? 0 == (1 & p | 0) ? 2070 : 2072 : 2071,N = 66;break r;case 117:S = 2070,r = (b = 0) | _e[(M = c) >> 2],M = 0 | _e[M + 4 >> 2],N = 66;break;case 99:ce[f >> 0] = _e[c >> 2],r = f,b = 0,S = 2070,P = o,M = 1,A = R;break;case 109:M = 0 | (0 | function(e,r){
e |= 0,r |= 0;var t = 0,n = 0;n = 0;for(;;){
if((0 | de[2140 + n >> 0]) == (0 | e)){
e = 2;break;
}if(87 == (0 | (t = n + 1 | 0))){
t = 2228,n = 87,e = 5;break;
}n = t;
}2 == (0 | e) && (n ? (t = 2228,e = 5) : t = 2228);if(5 == (0 | e))for(;;){
for(;t = (e = t) + 1 | 0,0 != (0 | ce[e >> 0]););if(!(n = n + -1 | 0))break;e = 5;
}return 0 | function(e,r){
return 0 | function(e,r){
e |= 0,r = (r |= 0) ? 0 | function(e,r,t){
r |= 0,t |= 0;var n = 0,i = 0,a = 0,o = 0,u = 0,f = 0,l = 0,s = 0,c = 0,_ = 0;_ = 1794895138 + (0 | _e[(e |= 0) >> 2]) | 0,a = 0 | Ge(0 | _e[e + 8 >> 2],_),n = 0 | Ge(0 | _e[e + 12 >> 2],_),i = 0 | Ge(0 | _e[e + 16 >> 2],_);t:do{
if(a >>> 0 < r >>> 2 >>> 0 && (c = r - (a << 2) | 0,n >>> 0 < c >>> 0 & i >>> 0 < c >>> 0) && 0 == (3 & (i | n) | 0)){
for(c = n >>> 2,s = i >>> 2,l = 0;;){
if(n = 0 | Ge(0 | _e[e + ((i = (o = (f = l + (u = a >>> 1) | 0) << 1) + c | 0) << 2) >> 2],_),!((i = 0 | Ge(0 | _e[e + (i + 1 << 2) >> 2],_)) >>> 0 < r >>> 0 & n >>> 0 < (r - i | 0) >>> 0)){
n = 0;break t;
}if(0 | ce[e + (i + n) >> 0]){
n = 0;break t;
}if(!(n = 0 | function(e,r){
r |= 0;var t = 0,n = 0;if(t = 0 | ce[(e |= 0) >> 0],n = 0 | ce[r >> 0],t << 24 >> 24 == 0 || t << 24 >> 24 != n << 24 >> 24)e = n;else{
for(;r = r + 1 | 0,t = 0 | ce[(e = e + 1 | 0) >> 0],n = 0 | ce[r >> 0],t << 24 >> 24 != 0 && t << 24 >> 24 == n << 24 >> 24;);e = n;
}return(255 & t) - (255 & e) | 0;
}(t,e + i | 0)))break;if(n = (0 | n) < 0,1 == (0 | a)){
n = 0;break t;
}l = n ? l : f,a = n ? u : a - u | 0;
}i = 0 | Ge(0 | _e[e + ((n = o + s | 0) << 2) >> 2],_),n = (n = 0 | Ge(0 | _e[e + (n + 1 << 2) >> 2],_)) >>> 0 < r >>> 0 & i >>> 0 < (r - n | 0) >>> 0 && 0 == (0 | ce[e + (n + i) >> 0]) ? e + n | 0 : 0;
}else n = 0;
}while(0);return 0 | n;
}(0 | _e[r >> 2],0 | _e[r + 4 >> 2],e) : 0;return 0 | (0 | r ? r : e);
}(e |= 0,r |= 0);
}(t,0 | _e[r + 20 >> 2]);
}(0 | _e[(M = 296) >> 2] | 0,0 | _e[105])),N = 71;break;case 115:M = 0 | (M = 0 | _e[c >> 2]) ? M : 2080,N = 71;break;case 67:_e[_ >> 2] = _e[c >> 2],_e[l >> 2] = 0,P = -1,M = _e[c >> 2] = _,N = 75;break;case 83:r = 0 | _e[c >> 2],N = A ? (P = A,M = r,75) : (se(e,32,T,0,p),r = 0,84);break;case 65:case 71:case 70:case 69:case 97:case 103:case 102:case 101:T = 0 | D(e,+k[c >> 3],T,A,p,M),r = C;continue e;default:b = 0,S = 2070,P = o,M = A,A = p;
}
}while(0);r:do{
if(61 == (0 | N))P = 0 | function(e,r,t,n){
if(t |= 0,n |= 0,!(0 == (0 | (e |= 0)) & 0 == (0 | (r |= 0))))for(;ce[(t = t + -1 | 0) >> 0] = 0 | de[2122 + (15 & e) >> 0] | n,e = 0 | ye(0 | e,0 | r,4),r = L,!(0 == (0 | e) & 0 == (0 | r)););return 0 | t;
}(h = 0 | _e[(p = c) >> 2],p = 0 | _e[p + 4 >> 2],o,32 & M),b = (S = 0 == (8 & r | 0) | 0 == (0 | h) & 0 == (0 | p)) ? 0 : 2,S = S ? 2070 : 2070 + (M >> 4) | 0,R = r,r = h,M = p,N = 67;else if(66 == (0 | N))P = 0 | fe(r,M,o),R = p,N = 67;else if(71 == (0 | N))S = 2070,P = (h = (b = N = 0) == (0 | (p = 0 | function(e,r,t){
e |= 0;var n = 0,i = 0,a = 0,o = 0;a = 255 & (r |= 0),n = 0 != (0 | (t |= 0));t:do{
if(n & 0 != (3 & e | 0))for(i = 255 & r;;){
if((0 | ce[e >> 0]) == i << 24 >> 24){
o = 6;break t;
}if(!((n = 0 != (0 | (t = t + -1 | 0))) & 0 != (3 & (e = e + 1 | 0) | 0))){
o = 5;break;
}
}else o = 5;
}while(0);5 == (0 | o) && (n ? o = 6 : t = 0);t:do{
if(6 == (0 | o) && (i = 255 & r,(0 | ce[e >> 0]) != i << 24 >> 24)){
n = 0 | ie(a,16843009);n:do{
if(3 < t >>> 0){
for(;!((-2139062144 & (a = _e[e >> 2] ^ n) ^ -2139062144) & a + -16843009 | 0);)if(e = e + 4 | 0,(t = t + -4 | 0) >>> 0 <= 3){
o = 11;break n;
}
}else o = 11;
}while(0);if(11 == (0 | o) && !t){
t = 0;break;
}for(;;){
if((0 | ce[e >> 0]) == i << 24 >> 24)break t;if(e = e + 1 | 0,!(t = t + -1 | 0)){
t = 0;break;
}
}
}
}while(0);return 0 | (0 | t ? e : 0);
}(r = M,0,A)))) ? M + A | 0 : p,M = h ? A : p - M | 0,A = R;else if(75 == (0 | N)){
for(S = M,A = r = N = 0;(b = 0 | _e[S >> 2]) && !((0 | (A = 0 | De(d,b))) < 0 | (P - r | 0) >>> 0 < A >>> 0) && (r = A + r | 0) >>> 0 < P >>> 0;)S = S + 4 | 0;if((0 | A) < 0){
E = -1;break e;
}if(se(e,32,T,r,p),r)for(b = 0;;){
if(!(A = 0 | _e[M >> 2])){
N = 84;break r;
}if((0 | r) < (0 | (b = (A = 0 | De(d,A)) + b | 0))){
N = 84;break r;
}if(Ie(e,d,A),r >>> 0 <= b >>> 0){
N = 84;break;
}M = M + 4 | 0;
}else r = 0,N = 84;
}
}while(0);if(67 == (0 | N))p = (N = 0) != (0 | A) | (M = 0 != (0 | r) | 0 != (0 | M)),M = u - P + (1 & (1 ^ M)) | 0,r = p ? P : o,P = o,M = !p || (0 | M) < (0 | A) ? A : M,A = -1 < (0 | A) ? -65537 & R : R;else if(84 == (0 | N)){
N = 0,se(e,32,T,r,8192 ^ p),T = (0 | r) < (0 | T) ? T : r,r = C;continue;
}se(e,32,T = (0 | T) < (0 | (p = (R = (0 | M) < (0 | (h = P - r | 0)) ? h : M) + b | 0)) ? p : T,p,A),Ie(e,S,b),se(e,48,T,p,65536 ^ A),se(e,48,R,h,0),Ie(e,r,h),se(e,32,T,p,8192 ^ A),r = C;
}else T = 0,r = C;
}
}e:do{
if(87 == (0 | N) && !e)if(m){
for(E = 1;r = 0 | _e[i + (E << 2) >> 2];)if(H(n + (E << 3) | 0,r,t),10 <= (0 | (E = E + 1 | 0))){
E = 1;break e;
}for(;;){
if(0 | _e[i + (E << 2) >> 2]){
E = -1;break e;
}if(10 <= (0 | (E = E + 1 | 0))){
E = 1;break;
}
}
}else E = 0;
}while(0);return Te = y,0 | E;
}function V(e,r){
r |= 0;var t,n,i,a,o,u,f,l,s,c,_,d,E,T,A = 0,M = 0,b = 0,m = 0,S = 0,P = 0,R = 0,h = 0,p = 0,C = 0,N = Te;if(Te = Te + 704 | 0,E = N + 144 | 0,d = N + 128 | 0,_ = N + 112 | 0,c = N + 96 | 0,s = N + 80 | 0,l = N + 64 | 0,f = N + 48 | 0,T = N + 32 | 0,t = N + 16 | 0,i = (P = N) + 184 | 0,C = N + 160 | 0,!(a = 0 | function(e,r){
e |= 0;var t = 0,n = 0,i = 0,a = 0,o = 0,u = 0,f = 0,l = 0;if(Te = (l = Te) + 528 | 0,a = (o = l) + 16 | 0,!(r |= 0))return Te = l,(f = 0) | f;if(r >>> 0 <= 16)return f = 0 | Q(e,r),Te = l,0 | f;if(u = 0 | Q(e,r + -16 | 0),(0 | (r = 0 | _e[(f = e + 20 | 0) >> 2])) < 16)for(n = e + 4 | 0,i = e + 8 | 0,t = e + 16 | 0;e = (0 | (e = 0 | _e[n >> 2])) == (0 | _e[i >> 2]) ? 0 : (_e[n >> 2] = e + 1,0 | de[e >> 0]),r = r + 8 | 0,33 <= (0 | (_e[f >> 2] = r)) && (_e[o >> 2] = 866,_e[o + 4 >> 2] = 3208,_e[o + 8 >> 2] = 1366,Ce(a,812,o),Me(a),r = 0 | _e[f >> 2]),e = e << 32 - r | _e[t >> 2],_e[t >> 2] = e,(0 | r) < 16;);else e = 0 | _e[(t = e = e + 16 | 0) >> 2];return _e[t >> 2] = e << 16,_e[f >> 2] = r + -16,Te = l,0 | (f = e >>> 16 | u << 16);
}(e |= 0,14)))return function(e){
var r = 0,t = 0,n = 0,i = 0,a = 0,o = 0;Te = (o = Te) + 544 | 0,a = o + 16 | 0,i = (n = o) + 32 | 0,(_e[(e |= 0) >> 2] = 0) | (t = 0 | _e[(r = e + 4 | 0) >> 2]) && (7 & t ? (_e[n >> 2] = 866,_e[n + 4 >> 2] = 2506,_e[n + 8 >> 2] = 1232,Ce(i,812,n),Me(i)) : ue(t,0,0,1,0),_e[r >> 2] = 0,_e[e + 8 >> 2] = 0,_e[e + 12 >> 2] = 0);if(ce[e + 16 >> 0] = 0,!(r = 0 | _e[(e = e + 20 | 0) >> 2]))return Te = o;Z(r),7 & r ? (_e[a >> 2] = 866,_e[4 + a >> 2] = 2506,_e[8 + a >> 2] = 1232,Ce(i,812,a),Me(i)) : ue(r,0,0,1,0);_e[e >> 2] = 0,Te = o;
}(r),Te = N,0 | (C = 1);if(o = r + 4 | 0,(0 | (A = 0 | _e[(u = r + 8 | 0) >> 2])) != (0 | a)){
if(A >>> 0 <= a >>> 0){
do{
if((0 | _e[r + 12 >> 2]) >>> 0 < a >>> 0){
if(0 | X(o,a,(A + 1 | 0) == (0 | a),1,0)){
A = 0 | _e[u >> 2];break;
}return ce[r + 16 >> 0] = 1,Te = N,(C = 0) | C;
}
}while(0);ne((0 | _e[o >> 2]) + A | 0,0,a - A | 0);
}_e[u >> 2] = a;
}if(ne(0 | _e[o >> 2],0,0 | a),(0 | (A = 0 | _e[(n = e + 20 | 0) >> 2])) < 5)for(m = e + 4 | 0,S = e + 8 | 0,b = e + 16 | 0;M = (0 | (M = 0 | _e[m >> 2])) == (0 | _e[S >> 2]) ? 0 : (_e[m >> 2] = M + 1,0 | de[M >> 0]),A = A + 8 | 0,33 <= (0 | (_e[n >> 2] = A)) && (_e[P >> 2] = 866,_e[P + 4 >> 2] = 3208,_e[P + 8 >> 2] = 1366,Ce(i,812,P),Me(i),A = 0 | _e[n >> 2]),M = M << 32 - A | _e[b >> 2],_e[b >> 2] = M,(0 | A) < 5;);else M = 0 | _e[(b = M = e + 16 | 0) >> 2];if(h = M >>> 27,_e[b >> 2] = M << 5,_e[n >> 2] = A + -5,20 < (h + -1 | 0) >>> 0)return Te = N,(C = 0) | C;_e[C + 20 >> 2] = 0,_e[C >> 2] = 0,_e[C + 4 >> 2] = 0,_e[C + 8 >> 2] = 0,_e[C + 12 >> 2] = 0,A = C + 4 | (ce[C + 16 >> 0] = 0),M = C + 8 | 0;e:do{
if(0 | X(A,21,0,1,0)){
m = 0 | _e[M >> 2],ne((R = 0 | _e[A >> 2]) + m | 0,0,21 - m | 0),_e[M >> 2] = 21,m = e + 4 | 0,S = e + 8 | 0,P = e + 16 | 0,b = 0;do{
if((0 | (A = 0 | _e[n >> 2])) < 3)for(;M = (0 | (M = 0 | _e[m >> 2])) == (0 | _e[S >> 2]) ? 0 : (_e[m >> 2] = M + 1,0 | de[M >> 0]),A = A + 8 | 0,33 <= (0 | (_e[n >> 2] = A)) && (_e[t >> 2] = 866,_e[4 + t >> 2] = 3208,_e[8 + t >> 2] = 1366,Ce(i,812,t),Me(i),A = 0 | _e[n >> 2]),M = M << 32 - A | _e[P >> 2],_e[P >> 2] = M,(0 | A) < 3;);else M = 0 | _e[P >> 2];
}while(_e[P >> 2] = M << 3,_e[n >> 2] = A + -3,ce[R + (0 | de[1327 + b >> 0]) >> 0] = M >>> 29,(0 | (b = b + 1 | 0)) != (0 | h));if(0 | $(C)){
P = e + 4 | 0,R = e + 8 | 0,h = e + 16 | 0,A = 0;r:do{
S = a - A | 0,b = 0 | Ae(e,C);t:do{
if(b >>> 0 < 17)(0 | _e[u >> 2]) >>> 0 <= A >>> 0 && (_e[T >> 2] = 866,_e[4 + T >> 2] = 910,_e[8 + T >> 2] = 1497,Ce(i,812,T),Me(i)),ce[(0 | _e[o >> 2]) + A >> 0] = b,A = A + 1 | 0;else switch(0 | b){
case 17:if((0 | (M = 0 | _e[n >> 2])) < 3)for(;b = (0 | (b = 0 | _e[P >> 2])) == (0 | _e[R >> 2]) ? 0 : (_e[P >> 2] = b + 1,0 | de[b >> 0]),M = M + 8 | 0,33 <= (0 | (_e[n >> 2] = M)) && (_e[f >> 2] = 866,_e[4 + f >> 2] = 3208,_e[8 + f >> 2] = 1366,Ce(i,812,f),Me(i),M = 0 | _e[n >> 2]),b = b << 32 - M | _e[h >> 2],_e[h >> 2] = b,(0 | M) < 3;);else b = 0 | _e[h >> 2];if(_e[h >> 2] = b << 3,_e[n >> 2] = M + -3,M = S >>> 0 < (b = 3 + (b >>> 29) | 0) >>> 0){
A = 0;break e;
}A = (M ? 0 : b) + A | 0;break t;case 18:if((0 | (M = 0 | _e[n >> 2])) < 7)for(;b = (0 | (b = 0 | _e[P >> 2])) == (0 | _e[R >> 2]) ? 0 : (_e[P >> 2] = b + 1,0 | de[b >> 0]),M = M + 8 | 0,33 <= (0 | (_e[n >> 2] = M)) && (_e[l >> 2] = 866,_e[4 + l >> 2] = 3208,_e[8 + l >> 2] = 1366,Ce(i,812,l),Me(i),M = 0 | _e[n >> 2]),b = b << 32 - M | _e[h >> 2],_e[h >> 2] = b,(0 | M) < 7;);else b = 0 | _e[h >> 2];if(_e[h >> 2] = b << 7,_e[n >> 2] = M + -7,M = S >>> 0 < (b = 11 + (b >>> 25) | 0) >>> 0){
A = 0;break e;
}A = (M ? 0 : b) + A | 0;break t;default:if(2 <= (b + -19 | 0) >>> 0){
p = 81;break r;
}if(M = 0 | _e[n >> 2],19 == (0 | b)){
if((0 | M) < 2)for(b = M;m = (0 | (M = 0 | _e[P >> 2])) == (0 | _e[R >> 2]) ? 0 : (_e[P >> 2] = M + 1,0 | de[M >> 0]),M = b + 8 | 0,33 <= (0 | (_e[n >> 2] = M)) && (_e[s >> 2] = 866,_e[4 + s >> 2] = 3208,_e[8 + s >> 2] = 1366,Ce(i,812,s),Me(i),M = 0 | _e[n >> 2]),b = m << 32 - M | _e[h >> 2],_e[h >> 2] = b,(0 | M) < 2;)b = M;else b = 0 | _e[h >> 2];_e[h >> 2] = b << 2,b >>>= 30,m = 3,M = M + -2 | 0;
}else{
if((0 | M) < 6)for(;b = (0 | (b = 0 | _e[P >> 2])) == (0 | _e[R >> 2]) ? 0 : (_e[P >> 2] = b + 1,0 | de[b >> 0]),M = M + 8 | 0,33 <= (0 | (_e[n >> 2] = M)) && (_e[c >> 2] = 866,_e[4 + c >> 2] = 3208,_e[8 + c >> 2] = 1366,Ce(i,812,c),Me(i),M = 0 | _e[n >> 2]),b = b << 32 - M | _e[h >> 2],_e[h >> 2] = b,(0 | M) < 6;);else b = 0 | _e[h >> 2];_e[h >> 2] = b << 6,b >>>= 26,m = 7,M = M + -6 | 0;
}if(_e[n >> 2] = M,0 == (0 | A) | S >>> 0 < (b = b + m | 0) >>> 0){
A = 0;break e;
}if(M = A + -1 | 0,(0 | _e[u >> 2]) >>> 0 <= M >>> 0 && (_e[_ >> 2] = 866,_e[4 + _ >> 2] = 910,_e[8 + _ >> 2] = 1497,Ce(i,812,_),Me(i)),!((m = 0 | ce[(0 | _e[o >> 2]) + M >> 0]) << 24 >> 24)){
A = 0;break e;
}if((M = b + A | 0) >>> 0 <= A >>> 0)break t;for(;(0 | _e[u >> 2]) >>> 0 <= A >>> 0 && (_e[d >> 2] = 866,_e[4 + d >> 2] = 910,_e[8 + d >> 2] = 1497,Ce(i,812,d),Me(i)),ce[(0 | _e[o >> 2]) + A >> 0] = m,A = A + 1 | 0,(0 | A) != (0 | M););A = M;
}
}while(0);
}while(A >>> 0 < a >>> 0);if(81 == (0 | p)){
_e[E >> 2] = 866,_e[4 + E >> 2] = 3149,_e[8 + E >> 2] = 1348,Ce(i,812,E),Me(i),A = 0;break;
}A = (0 | a) == (0 | A) ? 0 | $(r) : 0;
}else A = 0;
}else ce[C + 16 >> 0] = 1,A = 0;
}while(0);return re(C),Te = N,0 | (C = A);
}function G(e,r,t,n){
e |= 0,t |= 0;var i,a,o,u,f,l,s,c,_ = 0,d = 0,E = 0,T = 0,A = 0,M = 0,b = 0,m = 0,S = 0,P = 0,R = 0,h = 0,p = 0,C = 0,N = 0,y = 0,O = 0,v = 0,k = 0,g = Te;if(Te = Te + 880 | 0,v = g + 144 | 0,c = g + 128 | 0,s = g + 112 | 0,l = g + 96 | 0,y = g + 80 | 0,C = g + 64 | 0,h = g + 48 | 0,p = g + 32 | 0,m = g + 16 | 0,u = (b = g) + 360 | 0,f = g + 296 | 0,k = g + 224 | 0,R = g + 156 | 0,0 == (0 | (r |= 0)) | 11 < (n |= 0) >>> 0)return Te = g,(k = 0) | k;for(_e[e >> 2] = r,_ = k,d = _ + 68 | 0;_ = _ + 4 | (_e[_ >> 2] = 0),(0 | _) < (0 | d););for(_ = 0;d = k + ((255 & (O = 0 | ce[t + _ >> 0])) << 2) | 0,O << 24 >> 24 && (_e[d >> 2] = 1 + (0 | _e[d >> 2])),_ = _ + 1 | 0,(0 | _) != (0 | r););for(T = E = d = 0,A = -1,M = 1;(_ = 0 | _e[k + (M << 2) >> 2]) ? (d = _ + (_e[f + ((S = M + -1 | 0) << 2) >> 2] = d) | 0,O = 16 - M | 0,_e[e + 28 + (S << 2) >> 2] = 1 + (d + -1 << O | (1 << O) - 1),_e[e + 96 + (S << 2) >> 2] = E,S = _ + (_e[R + (M << 2) >> 2] = E) | 0,T = M >>> 0 < T >>> 0 ? T : M,A = A >>> 0 < M >>> 0 ? A : M) : (_e[e + 28 + (M + -1 << 2) >> 2] = 0,S = E),17 != (0 | (M = M + 1 | 0));)d <<= 1,E = S;_e[e + 4 >> 2] = S,d = e + 172 | 0;do{
if(S >>> 0 > (0 | _e[d >> 2]) >>> 0){
_ = (_ = S + -1 | 0) & S ? (_ |= _ >>> 16,_ |= _ >>> 8,_ |= _ >>> 4,r >>> 0 < (_ = 1 + ((_ |= _ >>> 2) >>> 1 | _) | 0) >>> 0 ? r : _) : S,_e[d >> 2] = _,_ = 0 | _e[(E = e + 176 | 0) >> 2];do{
if(0 | _){
if(O = 0 | _e[_ + -4 >> 2],_ = _ + -8 | 0,0 != (0 | O) && (0 | O) == (0 | ~_e[_ >> 2]) || (_e[b >> 2] = 866,_e[b + 4 >> 2] = 651,_e[b + 8 >> 2] = 1579,Ce(u,812,b),Me(u)),7 & _){
_e[m >> 2] = 866,_e[m + 4 >> 2] = 2506,_e[m + 8 >> 2] = 1232,Ce(u,812,m),Me(u);break;
}ue(_,0,0,1,0);break;
}
}while(0);if(d = 0 | te(8 + ((_ = 0 | (_ = 0 | _e[d >> 2]) ? _ : 1) << 1) | 0,0)){
_e[d + 4 >> 2] = _,_e[d >> 2] = ~_,_e[E >> 2] = d + 8,P = 24;break;
}n = _e[E >> 2] = 0;break;
}
}while(P = 24,0);e:do{
if(24 == (0 | P)){
for(O = e + 24 | 0,ce[O >> 0] = A,ce[e + 25 >> 0] = T,E = e + 176 | 0,d = 0;_ = 255 & (N = 0 | ce[t + d >> 0]),N << 24 >> 24 && (0 | _e[k + (_ << 2) >> 2] || (_e[p >> 2] = 866,_e[p + 4 >> 2] = 2276,_e[p + 8 >> 2] = 977,Ce(u,812,p),Me(u)),_ = 0 | _e[(N = R + (_ << 2) | 0) >> 2],_e[N >> 2] = _ + 1,S >>> 0 <= _ >>> 0 && (_e[h >> 2] = 866,_e[h + 4 >> 2] = 2280,_e[h + 8 >> 2] = 990,Ce(u,812,h),Me(u)),W[(0 | _e[E >> 2]) + (_ << 1) >> 1] = d),d = d + 1 | 0,(0 | d) != (0 | r););if(o = (0 | de[O >> 0]) >>> 0 < n >>> 0 ? n : 0,a = 0 != (0 | (_e[(N = e + 8 | 0) >> 2] = o))){
i = 1 << o,_ = e + 164 | 0;do{
if(i >>> 0 > (0 | _e[_ >> 2]) >>> 0){
_e[_ >> 2] = i,_ = 0 | _e[(E = e + 168 | 0) >> 2];do{
if(0 | _){
if(p = 0 | _e[_ + -4 >> 2],_ = _ + -8 | 0,0 != (0 | p) && (0 | p) == (0 | ~_e[_ >> 2]) || (_e[C >> 2] = 866,_e[C + 4 >> 2] = 651,_e[C + 8 >> 2] = 1579,Ce(u,812,C),Me(u)),7 & _){
_e[y >> 2] = 866,_e[y + 4 >> 2] = 2506,_e[y + 8 >> 2] = 1232,Ce(u,812,y),Me(u);break;
}ue(_,0,0,1,0);break;
}
}while(0);if(d = 0 | te((_ = i << 2) + 8 | 0,0)){
y = d + 8 | 0,_e[d + 4 >> 2] = i,_e[d >> 2] = ~i,d = _e[E >> 2] = y;break;
}n = _e[E >> 2] = 0;break e;
}
}while(_ = i << 2,d = 0 | _e[(E = d = e + 168 | 0) >> 2],0);ne(0 | d,-1,0 | _),h = e + 176 | 0,R = 1;do{
if(0 | _e[k + (R << 2) >> 2] && (C = 1 << (p = o - R | 0),d = 0 | _e[f + ((_ = R + -1 | 0) << 2) >> 2],16 <= _ >>> 0 && (_e[l >> 2] = 866,_e[4 + l >> 2] = 1960,_e[8 + l >> 2] = 1453,Ce(u,812,l),Me(u)),d >>> 0 <= (r = 0 == (0 | (r = 0 | _e[e + 28 + (_ << 2) >> 2])) ? -1 : (r + -1 | 0) >>> (16 - R | 0)) >>> 0)){
S = (0 | _e[e + 96 + (_ << 2) >> 2]) - d | 0,P = R << 16;do{
for(_ = 0 | Ee[(0 | _e[h >> 2]) + (S + d << 1) >> 1],(0 | de[t + _ >> 0]) != (0 | R) && (_e[s >> 2] = 866,_e[4 + s >> 2] = 2322,_e[8 + s >> 2] = 1019,Ce(u,812,s),Me(u)),m = d << p,M = _ | P,A = 0;i >>> 0 <= (b = A + m | 0) >>> 0 && (_e[c >> 2] = 866,_e[4 + c >> 2] = 2328,_e[8 + c >> 2] = 1053,Ce(u,812,c),Me(u)),_ = 0 | _e[E >> 2],-1 != (0 | _e[_ + (b << 2) >> 2]) && (_e[v >> 2] = 866,_e[v + 4 >> 2] = 2330,_e[v + 8 >> 2] = 1076,Ce(u,812,v),Me(u),_ = 0 | _e[E >> 2]),_e[_ + (b << 2) >> 2] = M,A = A + 1 | 0,A >>> 0 < C >>> 0;);
}while((d = d + 1 | 0) >>> 0 <= r >>> 0);
}
}while((R = R + 1 | 0) >>> 0 <= o >>> 0);
}_e[(_ = e + 96 | 0) >> 2] = (0 | _e[_ >> 2]) - (0 | _e[f >> 2]),_e[(_ = e + 100 | 0) >> 2] = (0 | _e[_ >> 2]) - (0 | _e[4 + f >> 2]),_e[(_ = e + 104 | 0) >> 2] = (0 | _e[_ >> 2]) - (0 | _e[8 + f >> 2]),_e[(_ = e + 108 | 0) >> 2] = (0 | _e[_ >> 2]) - (0 | _e[12 + f >> 2]),_e[(_ = e + 112 | 0) >> 2] = (0 | _e[_ >> 2]) - (0 | _e[16 + f >> 2]),_e[(_ = e + 116 | 0) >> 2] = (0 | _e[_ >> 2]) - (0 | _e[20 + f >> 2]),_e[(_ = e + 120 | 0) >> 2] = (0 | _e[_ >> 2]) - (0 | _e[24 + f >> 2]),_e[(_ = e + 124 | 0) >> 2] = (0 | _e[_ >> 2]) - (0 | _e[28 + f >> 2]),_e[(_ = e + 128 | 0) >> 2] = (0 | _e[_ >> 2]) - (0 | _e[32 + f >> 2]),_e[(_ = e + 132 | 0) >> 2] = (0 | _e[_ >> 2]) - (0 | _e[36 + f >> 2]),_e[(_ = e + 136 | 0) >> 2] = (0 | _e[_ >> 2]) - (0 | _e[40 + f >> 2]),_e[(_ = e + 140 | 0) >> 2] = (0 | _e[_ >> 2]) - (0 | _e[44 + f >> 2]),_e[(_ = e + 144 | 0) >> 2] = (0 | _e[_ >> 2]) - (0 | _e[48 + f >> 2]),_e[(_ = e + 148 | 0) >> 2] = (0 | _e[_ >> 2]) - (0 | _e[52 + f >> 2]),_e[(_ = e + 152 | 0) >> 2] = (0 | _e[_ >> 2]) - (0 | _e[56 + f >> 2]),_e[(_ = e + 156 | 0) >> 2] = (0 | _e[_ >> 2]) - (0 | _e[60 + f >> 2]),_e[(_ = e + 16 | 0) >> 2] = 0,_e[(d = e + 20 | 0) >> 2] = de[O >> 0];r:do{
if(a){
do{
if(!n)break r;
}while(n = (v = n) + -1 | 0,!(0 | _e[k + (v << 2) >> 2]));if(_e[_ >> 2] = _e[e + 28 + (n << 2) >> 2],n = o + 1 | 0,(_e[d >> 2] = n) >>> 0 <= T >>> 0){
for(;!(0 | _e[k + (n << 2) >> 2]);)if(T >>> 0 < (n = n + 1 | 0) >>> 0)break r;_e[d >> 2] = n;
}
}
}while(0);_e[e + 92 >> 2] = -1,_e[e + 160 >> 2] = 1048575,_e[e + 12 >> 2] = 32 - (0 | _e[N >> 2]),n = 1;
}
}while(0);return Te = g,0 | (k = n);
}function F(e){
var r = 0,t = 0,n = 0,i = 0,a = 0,o = 0,u = 0,f = 0;if(e |= 0){
t = e + -8 | 0,i = 0 | _e[1148],f = t + (r = -8 & (e = 0 | _e[e + -4 >> 2])) | 0;do{
if(1 & e)o = u = t;else{
if(n = 0 | _e[t >> 2],!(3 & e))return;if(a = n + r | 0,(o = t + (0 - n) | 0) >>> 0 < i >>> 0)return;if((0 | o) == (0 | _e[1149])){
if(3 == (3 & (r = 0 | _e[(e = f + 4 | 0) >> 2]) | 0))return _e[1146] = a,_e[e >> 2] = -2 & r,_e[o + 4 >> 2] = 1 | a,void(_e[o + a >> 2] = a);u = o,r = a;break;
}if(t = n >>> 3,n >>> 0 < 256){
if(e = 0 | _e[o + 8 >> 2],(0 | (r = 0 | _e[o + 12 >> 2])) == (0 | e)){
_e[1144] = _e[1144] & ~(1 << t),u = o,r = a;break;
}_e[e + 12 >> 2] = r,_e[r + 8 >> 2] = e,u = o,r = a;break;
}i = 0 | _e[o + 24 >> 2],e = 0 | _e[o + 12 >> 2];do{
if((0 | e) == (0 | o)){
if(!(e = 0 | _e[(r = (t = o + 16 | 0) + 4 | 0) >> 2])){
if(!(e = 0 | _e[t >> 2])){
e = 0;break;
}r = t;
}for(;;)if(0 | (n = 0 | _e[(t = e + 20 | 0) >> 2]))e = n,r = t;else{
if(!(n = 0 | _e[(t = e + 16 | 0) >> 2]))break;e = n,r = t;
}_e[r >> 2] = 0;
}else u = 0 | _e[o + 8 >> 2],_e[u + 12 >> 2] = e,_e[e + 8 >> 2] = u;
}while(0);if(i){
if(r = 0 | _e[o + 28 >> 2],(0 | o) == (0 | _e[(t = 4880 + (r << 2) | 0) >> 2])){
if(!(_e[t >> 2] = e)){
_e[1145] = _e[1145] & ~(1 << r),u = o,r = a;break;
}
}else if(!(_e[i + 16 + (((0 | _e[i + 16 >> 2]) != (0 | o) & 1) << 2) >> 2] = e)){
u = o,r = a;break;
}_e[e + 24 >> 2] = i,0 | (t = 0 | _e[(r = o + 16 | 0) >> 2]) && (_e[e + 16 >> 2] = t,_e[t + 24 >> 2] = e),r = (u = ((r = 0 | _e[r + 4 >> 2]) && (_e[e + 20 >> 2] = r,_e[r + 24 >> 2] = e),o),a);
}else u = o,r = a;
}
}while(0);if(!(f >>> 0 <= o >>> 0) && 1 & (n = 0 | _e[(e = f + 4 | 0) >> 2])){
if(2 & n)_e[e >> 2] = -2 & n,_e[u + 4 >> 2] = 1 | r,i = _e[o + r >> 2] = r;else{
if(e = 0 | _e[1149],(0 | f) == (0 | _e[1150]))return f = (0 | _e[1147]) + r | 0,_e[1147] = f,_e[1150] = u,_e[u + 4 >> 2] = 1 | f,(0 | u) != (0 | e) ? void 0 : (_e[1149] = 0,void(_e[1146] = 0));if((0 | f) == (0 | e))return f = (0 | _e[1146]) + r | 0,_e[1146] = f,_e[1149] = o,_e[u + 4 >> 2] = 1 | f,void(_e[o + f >> 2] = f);i = (-8 & n) + r | 0,t = n >>> 3;do{
if(n >>> 0 < 256){
if(r = 0 | _e[f + 8 >> 2],(0 | (e = 0 | _e[f + 12 >> 2])) == (0 | r)){
_e[1144] = _e[1144] & ~(1 << t);break;
}_e[r + 12 >> 2] = e,_e[e + 8 >> 2] = r;break;
}a = 0 | _e[f + 24 >> 2],e = 0 | _e[f + 12 >> 2];do{
if((0 | e) == (0 | f)){
if(!(e = 0 | _e[(r = (t = f + 16 | 0) + 4 | 0) >> 2])){
if(!(e = 0 | _e[t >> 2])){
t = 0;break;
}r = t;
}for(;;)if(0 | (n = 0 | _e[(t = e + 20 | 0) >> 2]))e = n,r = t;else{
if(!(n = 0 | _e[(t = e + 16 | 0) >> 2]))break;e = n,r = t;
}_e[r >> 2] = 0,t = e;
}else t = 0 | _e[f + 8 >> 2],_e[t + 12 >> 2] = e,_e[e + 8 >> 2] = t,t = e;
}while(0);if(0 | a){
if(e = 0 | _e[f + 28 >> 2],(0 | f) == (0 | _e[(r = 4880 + (e << 2) | 0) >> 2])){
if(!(_e[r >> 2] = t)){
_e[1145] = _e[1145] & ~(1 << e);break;
}
}else if(!(_e[a + 16 + (((0 | _e[a + 16 >> 2]) != (0 | f) & 1) << 2) >> 2] = t))break;_e[t + 24 >> 2] = a,0 | (r = 0 | _e[(e = f + 16 | 0) >> 2]) && (_e[t + 16 >> 2] = r,_e[r + 24 >> 2] = t),0 | (e = 0 | _e[e + 4 >> 2]) && (_e[t + 20 >> 2] = e,_e[e + 24 >> 2] = t);
}
}while(0);if(_e[u + 4 >> 2] = 1 | i,_e[o + i >> 2] = i,(0 | u) == (0 | _e[1149]))return void(_e[1146] = i);
}if(e = i >>> 3,i >>> 0 < 256)return t = 4616 + (e << 1 << 2) | 0,(r = 0 | _e[1144]) & (e = 1 << e) ? e = 0 | _e[(r = t + 8 | 0) >> 2] : (_e[1144] = r | e,r = (e = t) + 8 | 0),_e[r >> 2] = u,_e[e + 12 >> 2] = u,_e[u + 8 >> 2] = e,void(_e[u + 12 >> 2] = t);n = 4880 + ((e = (e = i >>> 8) ? 16777215 < i >>> 0 ? 31 : i >>> ((e = 14 - ((a = ((f = e << (o = (e + 1048320 | 0) >>> 16 & 8)) + 520192 | 0) >>> 16 & 4) | o | (e = ((f <<= a) + 245760 | 0) >>> 16 & 2)) + (f << e >>> 15) | 0) + 7 | 0) & 1 | e << 1 : 0) << 2) | 0,_e[u + 28 >> 2] = e,_e[u + 20 >> 2] = 0,r = (_e[u + 16 >> 2] = 0) | _e[1145],t = 1 << e;do{
if(r & t){
for(r = i << (31 == (0 | e) ? 0 : 25 - (e >>> 1) | 0),t = 0 | _e[n >> 2];;){
if((-8 & _e[t + 4 >> 2] | 0) == (0 | i)){
e = 73;break;
}if(!(e = 0 | _e[(n = t + 16 + (r >>> 31 << 2) | 0) >> 2])){
e = 72;break;
}r <<= 1,t = e;
}if(72 == (0 | e)){
_e[n >> 2] = u,_e[u + 24 >> 2] = t,_e[u + 12 >> 2] = u,_e[u + 8 >> 2] = u;break;
}if(73 == (0 | e)){
f = 0 | _e[(o = t + 8 | 0) >> 2],_e[f + 12 >> 2] = u,_e[o >> 2] = u,_e[u + 8 >> 2] = f,_e[u + 12 >> 2] = t,_e[u + 24 >> 2] = 0;break;
}
}else _e[1145] = r | t,_e[n >> 2] = u,_e[u + 24 >> 2] = n,_e[u + 12 >> 2] = u,_e[u + 8 >> 2] = u;
}while(0);if(f = (0 | _e[1152]) - 1 | 0,!(_e[1152] = f)){
for(e = 5032;e = 0 | _e[e >> 2];)e = e + 8 | 0;_e[1152] = -1;
}
}
}
}function x(e,r){
var t = 0,n = 0,i = 0,a = 0,o = 0,u = 0,f = 0,f = (e |= 0) + (r |= 0) | 0,t = 0 | _e[e + 4 >> 2];do{
if(1 & t)u = e,t = r;else{
if(n = 0 | _e[e >> 2],!(3 & t))return;if(o = n + r | 0,(0 | (a = e + (0 - n) | 0)) == (0 | _e[1149])){
if(3 == (3 & (t = 0 | _e[(e = f + 4 | 0) >> 2]) | 0))return _e[1146] = o,_e[e >> 2] = -2 & t,_e[a + 4 >> 2] = 1 | o,void(_e[a + o >> 2] = o);u = a,t = o;break;
}if(r = n >>> 3,n >>> 0 < 256){
if(e = 0 | _e[a + 8 >> 2],(0 | (t = 0 | _e[a + 12 >> 2])) == (0 | e)){
_e[1144] = _e[1144] & ~(1 << r),u = a,t = o;break;
}_e[e + 12 >> 2] = t,_e[t + 8 >> 2] = e,u = a,t = o;break;
}i = 0 | _e[a + 24 >> 2],e = 0 | _e[a + 12 >> 2];do{
if((0 | e) == (0 | a)){
if(!(e = 0 | _e[(t = (r = a + 16 | 0) + 4 | 0) >> 2])){
if(!(e = 0 | _e[r >> 2])){
e = 0;break;
}t = r;
}for(;;)if(0 | (n = 0 | _e[(r = e + 20 | 0) >> 2]))e = n,t = r;else{
if(!(n = 0 | _e[(r = e + 16 | 0) >> 2]))break;e = n,t = r;
}_e[t >> 2] = 0;
}else u = 0 | _e[a + 8 >> 2],_e[u + 12 >> 2] = e,_e[e + 8 >> 2] = u;
}while(0);if(i){
if(t = 0 | _e[a + 28 >> 2],(0 | a) == (0 | _e[(r = 4880 + (t << 2) | 0) >> 2])){
if(!(_e[r >> 2] = e)){
_e[1145] = _e[1145] & ~(1 << t),u = a,t = o;break;
}
}else if(!(_e[i + 16 + (((0 | _e[i + 16 >> 2]) != (0 | a) & 1) << 2) >> 2] = e)){
u = a,t = o;break;
}_e[e + 24 >> 2] = i,0 | (r = 0 | _e[(t = a + 16 | 0) >> 2]) && (_e[e + 16 >> 2] = r,_e[r + 24 >> 2] = e),t = (u = ((t = 0 | _e[t + 4 >> 2]) && (_e[e + 20 >> 2] = t,_e[t + 24 >> 2] = e),a),o);
}else u = a,t = o;
}
}while(0);if(2 & (n = 0 | _e[(e = f + 4 | 0) >> 2]))_e[e >> 2] = -2 & n,_e[u + 4 >> 2] = 1 | t,_e[u + t >> 2] = t;else{
if(e = 0 | _e[1149],(0 | f) == (0 | _e[1150]))return f = (0 | _e[1147]) + t | 0,_e[1147] = f,_e[1150] = u,_e[u + 4 >> 2] = 1 | f,(0 | u) == (0 | e) && (_e[1149] = 0,void(_e[1146] = 0));if((0 | f) == (0 | e))return f = (0 | _e[1146]) + t | 0,_e[1146] = f,_e[1149] = u,_e[u + 4 >> 2] = 1 | f,void(_e[u + f >> 2] = f);a = (-8 & n) + t | 0,r = n >>> 3;do{
if(n >>> 0 < 256){
if(t = 0 | _e[f + 8 >> 2],(0 | (e = 0 | _e[f + 12 >> 2])) == (0 | t)){
_e[1144] = _e[1144] & ~(1 << r);break;
}_e[t + 12 >> 2] = e,_e[e + 8 >> 2] = t;break;
}i = 0 | _e[f + 24 >> 2],e = 0 | _e[f + 12 >> 2];do{
if((0 | e) == (0 | f)){
if(!(e = 0 | _e[(t = (r = f + 16 | 0) + 4 | 0) >> 2])){
if(!(e = 0 | _e[r >> 2])){
r = 0;break;
}t = r;
}for(;;)if(0 | (n = 0 | _e[(r = e + 20 | 0) >> 2]))e = n,t = r;else{
if(!(n = 0 | _e[(r = e + 16 | 0) >> 2]))break;e = n,t = r;
}_e[t >> 2] = 0,r = e;
}else r = 0 | _e[f + 8 >> 2],_e[r + 12 >> 2] = e,_e[e + 8 >> 2] = r,r = e;
}while(0);if(0 | i){
if(e = 0 | _e[f + 28 >> 2],(0 | f) == (0 | _e[(t = 4880 + (e << 2) | 0) >> 2])){
if(!(_e[t >> 2] = r)){
_e[1145] = _e[1145] & ~(1 << e);break;
}
}else if(!(_e[i + 16 + (((0 | _e[i + 16 >> 2]) != (0 | f) & 1) << 2) >> 2] = r))break;_e[r + 24 >> 2] = i,0 | (t = 0 | _e[(e = f + 16 | 0) >> 2]) && (_e[r + 16 >> 2] = t,_e[t + 24 >> 2] = r),0 | (e = 0 | _e[e + 4 >> 2]) && (_e[r + 20 >> 2] = e,_e[e + 24 >> 2] = r);
}
}while(0);if(_e[u + 4 >> 2] = 1 | a,_e[u + a >> 2] = a,(0 | u) == (0 | _e[1149]))return void(_e[1146] = a);t = a;
}if(e = t >>> 3,t >>> 0 < 256)return r = 4616 + (e << 1 << 2) | 0,(t = 0 | _e[1144]) & (e = 1 << e) ? e = 0 | _e[(t = r + 8 | 0) >> 2] : (_e[1144] = t | e,t = (e = r) + 8 | 0),_e[t >> 2] = u,_e[e + 12 >> 2] = u,_e[u + 8 >> 2] = e,void(_e[u + 12 >> 2] = r);if(i = 4880 + ((e = (e = t >>> 8) ? 16777215 < t >>> 0 ? 31 : t >>> ((e = 14 - ((a = ((f = e << (o = (e + 1048320 | 0) >>> 16 & 8)) + 520192 | 0) >>> 16 & 4) | o | (e = ((f <<= a) + 245760 | 0) >>> 16 & 2)) + (f << e >>> 15) | 0) + 7 | 0) & 1 | e << 1 : 0) << 2) | 0,_e[u + 28 >> 2] = e,_e[u + 20 >> 2] = 0,!((r = (_e[u + 16 >> 2] = 0) | _e[1145]) & (n = 1 << e)))return _e[1145] = r | n,_e[i >> 2] = u,_e[u + 24 >> 2] = i,_e[u + 12 >> 2] = u,void(_e[u + 8 >> 2] = u);for(r = t << (31 == (0 | e) ? 0 : 25 - (e >>> 1) | 0),n = 0 | _e[i >> 2];;){
if((-8 & _e[n + 4 >> 2] | 0) == (0 | t)){
e = 69;break;
}if(!(e = 0 | _e[(i = n + 16 + (r >>> 31 << 2) | 0) >> 2])){
e = 68;break;
}r <<= 1,n = e;
}68 == (0 | e) ? (_e[i >> 2] = u,_e[u + 24 >> 2] = n,_e[u + 12 >> 2] = u,_e[u + 8 >> 2] = u) : 69 == (0 | e) && (f = 0 | _e[(o = n + 8 | 0) >> 2],_e[f + 12 >> 2] = u,_e[o >> 2] = u,_e[u + 8 >> 2] = f,_e[u + 12 >> 2] = n,_e[u + 24 >> 2] = 0);
}function B(e,r,t,n,i){
i |= 0;var a = 0,o = 0,u = 0,f = 0,l = 0,s = 0,c = 0,_ = 0,d = 0,E = 0,s = e |= 0,o = t |= 0,u = _ = n |= 0;if(!(l = f = r |= 0))return a = 0 != (0 | i),u ? (a && (_e[i >> 2] = 0 | e,_e[i + 4 >> 2] = 0 & r),(i = _ = 0) | (L = _,i)) : (a && (_e[i >> 2] = (s >>> 0) % (o >>> 0),_e[i + 4 >> 2] = 0),(_ = 0) | (L = _,i = (s >>> 0) / (o >>> 0) >>> 0));a = 0 == (0 | u);do{
if(o){
if(!a){
if((a = (0 | T(0 | u)) - (0 | T(0 | l)) | 0) >>> 0 <= 31){
e = s >>> ((o = c = a + 1 | 0) >>> 0) & (r = a - 31 >> 31) | l << (u = 31 - a | 0),r &= l >>> (c >>> 0),a = 0,u = s << u;break;
}return i ? (_e[i >> 2] = 0 | e,_e[i + 4 >> 2] = f | 0 & r,(i = _ = 0) | (L = _,i)) : (i = _ = 0) | (L = _,i);
}if((a = o - 1 | 0) & o | 0){
e = (c = 32 - (u = 33 + (0 | T(0 | o)) - (0 | T(0 | l)) | 0) | 0) - 1 >> 31 & l >>> ((d = u - 32 | 0) >>> 0) | (l << c | s >>> ((o = u) >>> 0)) & (r = d >> 31),r &= l >>> (u >>> 0),a = s << (E = 64 - u | 0) & (f = c >> 31),u = (l << E | s >>> (d >>> 0)) & f | s << c & u - 33 >> 31;break;
}return 0 | i && (_e[i >> 2] = a & s,_e[i + 4 >> 2] = 0),1 == (0 | o) ? 0 | (L = d = f | 0 & r,E = 0 | e) : (E = 0 | Pe(0 | o),0 | (L = d = l >>> (E >>> 0) | 0,E = l << 32 - E | s >>> (E >>> 0) | 0));
}if(a)return 0 | i && (_e[i >> 2] = (l >>> 0) % (o >>> 0),_e[i + 4 >> 2] = 0),(d = 0) | (L = d,E = (l >>> 0) / (o >>> 0) >>> 0);if(!s)return 0 | i && (_e[i >> 2] = 0,_e[i + 4 >> 2] = (l >>> 0) % (u >>> 0)),(d = 0) | (L = d,E = (l >>> 0) / (u >>> 0) >>> 0);if(!((a = u - 1 | 0) & u))return 0 | i && (_e[i >> 2] = 0 | e,_e[i + 4 >> 2] = a & l | 0 & r),E = l >>> (((d = 0) | Pe(0 | u)) >>> 0),0 | (L = d,E);if((a = (0 | T(0 | u)) - (0 | T(0 | l)) | 0) >>> 0 <= 30){
e = l << (u = 31 - a | 0) | s >>> ((o = r = a + 1 | 0) >>> 0),r = l >>> (r >>> 0),a = 0,u = s << u;break;
}return i && (_e[i >> 2] = 0 | e,_e[i + 4 >> 2] = f | 0 & r),(E = d = 0) | (L = d,E);
}while(0);if(o){
for(c = 0 | t,s = _ | 0 & n,l = 0 | ge(0 | c,0 | s,-1,-1),t = L,f = u,u = 0;f = a >>> 31 | (n = f) << 1,a = u | a << 1,ve(0 | l,0 | t,0 | (n = e << 1 | n >>> 31 | 0),0 | (_ = e >>> 31 | r << 1 | 0)),u = 1 & (d = (E = L) >> 31 | ((0 | E) < 0 ? -1 : 0) << 1),e = 0 | ve(0 | n,0 | _,d & c | 0,(((0 | E) < 0 ? -1 : 0) >> 31 | ((0 | E) < 0 ? -1 : 0) << 1) & s | 0),r = L,o = o - 1 | 0,0 != (0 | o););l = f,f = 0;
}else l = u,u = f = 0;return(o = 0) | i && (_e[i >> 2] = e,_e[i + 4 >> 2] = r),0 | (L = d = (0 | a) >>> 31 | (l | o) << 1 | 0 & (o << 1 | a >>> 31) | f,E = -2 & (a << 1 | 0) | u);
}function Ae(e,r){
e |= 0;var t,n,i,a,o,u,f,l = 0,s = 0,c = 0,_ = 0,d = 0,E = 0,T = Te;Te = Te + 576 | 0,i = T + 48 | 0,o = T + 32 | 0,a = T + 16 | 0,f = (n = T) + 64 | 0,u = 0 | _e[(r |= 0) + 20 >> 2],(0 | (t = 0 | _e[(E = e + 20 | 0) >> 2])) < 24 ? (s = (l = 0 | _e[(d = e + 4 | 0) >> 2]) >>> 0 < (c = 0 | _e[e + 8 >> 2]) >>> 0,(0 | t) < 16 ? (s ? (_ = (0 | de[l >> 0]) << 8,l = l + 1 | 0) : _ = 0,l >>> 0 < c >>> 0 ? (c = 0 | de[l >> 0],l = l + 1 | 0) : c = 0,_e[d >> 2] = l,_e[E >> 2] = 16 + t,s = 16,l = c | _) : (l = s ? (_e[d >> 2] = l + 1,0 | de[l >> 0]) : 0,_e[E >> 2] = 8 + t,s = 24),c = _e[(d = e + 16 | 0) >> 2] | l << s - t,_e[d >> 2] = c) : c = 0 | _e[(d = c = e + 16 | 0) >> 2],_ = 1 + (c >>> 16) | 0;do{
if(!(_ >>> 0 <= (0 | _e[16 + u >> 2]) >>> 0)){
for(s = 0 | _e[20 + u >> 2];_ >>> 0 > (0 | _e[28 + u + ((l = s + -1 | 0) << 2) >> 2]) >>> 0;)s = s + 1 | 0;if((l = (c >>> (32 - s | 0)) + (0 | _e[96 + u + (l << 2) >> 2]) | 0) >>> 0 < (0 | _e[r >> 2]) >>> 0){
l = 0 | Ee[(0 | _e[176 + u >> 2]) + (l << 1) >> 1];break;
}return _e[i >> 2] = 866,_e[4 + i >> 2] = 3275,_e[8 + i >> 2] = 1348,Ce(f,812,i),Me(f),Te = T,(E = 0) | E;
}
}while(-1 == (0 | (s = 0 | _e[(0 | _e[168 + u >> 2]) + (c >>> (32 - (0 | _e[8 + u >> 2]) | 0) << 2) >> 2])) && (_e[n >> 2] = 866,_e[n + 4 >> 2] = 3253,_e[n + 8 >> 2] = 1393,Ce(f,812,n),Me(f)),l = 65535 & s,s >>>= 16,(0 | _e[r + 8 >> 2]) >>> 0 <= l >>> 0 && (_e[a >> 2] = 866,_e[4 + a >> 2] = 909,_e[8 + a >> 2] = 1497,Ce(f,812,a),Me(f)),(0 | de[(0 | _e[r + 4 >> 2]) + l >> 0]) != (0 | s) && (_e[o >> 2] = 866,_e[4 + o >> 2] = 3257,_e[8 + o >> 2] = 1410,Ce(f,812,o),Me(f)),0);return _e[d >> 2] = _e[d >> 2] << s,_e[E >> 2] = (0 | _e[E >> 2]) - s,Te = T,0 | (E = l);
}function U(e){
var r,t,n,i,a = 0,o = 0,u = 0,f = Te;if(Te = Te + 576 | 0,u = f + 48 | 0,n = f + 32 | 0,t = f + 16 | 0,i = (r = f) + 64 | 0,(_e[(e |= 0) >> 2] = 0) | (o = 0 | _e[(a = e + 284 | 0) >> 2]) && (7 & o ? (_e[r >> 2] = 866,_e[r + 4 >> 2] = 2506,_e[r + 8 >> 2] = 1232,Ce(i,812,r),Me(i)) : ue(o,0,0,1,0),_e[a >> 2] = 0,_e[e + 288 >> 2] = 0,_e[e + 292 >> 2] = 0),(ce[e + 296 >> 0] = 0) | (o = 0 | _e[(a = e + 268 | 0) >> 2]) && (7 & o ? (_e[t >> 2] = 866,_e[4 + t >> 2] = 2506,_e[8 + t >> 2] = 1232,Ce(i,812,t),Me(i)) : ue(o,0,0,1,0),_e[a >> 2] = 0,_e[e + 272 >> 2] = 0,_e[e + 276 >> 2] = 0),(ce[e + 280 >> 0] = 0) | (o = 0 | _e[(a = e + 252 | 0) >> 2]) && (7 & o ? (_e[n >> 2] = 866,_e[4 + n >> 2] = 2506,_e[8 + n >> 2] = 1232,Ce(i,812,n),Me(i)) : ue(o,0,0,1,0),_e[a >> 2] = 0,_e[e + 256 >> 2] = 0,_e[e + 260 >> 2] = 0),!(o = (ce[e + 264 >> 0] = 0) | _e[(a = e + 236 | 0) >> 2]))return re(u = e + 212 | (ce[(u = e + 248 | 0) >> 0] = 0)),re(u = e + 188 | 0),re(u = e + 164 | 0),re(u = e + 140 | 0),re(u = e + 116 | 0),void(Te = f);7 & o ? (_e[u >> 2] = 866,_e[u + 4 >> 2] = 2506,_e[u + 8 >> 2] = 1232,Ce(i,812,u),Me(i)) : ue(o,0,0,1,0),_e[a >> 2] = 0,_e[e + 240 >> 2] = 0,_e[e + 244 >> 2] = 0,re(u = e + 212 | (ce[(u = e + 248 | 0) >> 0] = 0)),re(u = e + 188 | 0),re(u = e + 164 | 0),re(u = e + 140 | 0),re(u = e + 116 | 0),Te = f;
}function H(e,r,t){
e |= 0,r |= 0,t |= 0;var n = 0,i = 0,a = 0;e:do{
if(r >>> 0 <= 20){
switch(0 | r){
case 9:n = 3 + (0 | _e[t >> 2]) & -4,r = 0 | _e[n >> 2],_e[t >> 2] = n + 4,_e[e >> 2] = r;break e;case 10:n = 3 + (0 | _e[t >> 2]) & -4,r = 0 | _e[n >> 2],_e[t >> 2] = n + 4,_e[(n = e) >> 2] = r,_e[n + 4 >> 2] = ((0 | r) < 0) << 31 >> 31;break e;case 11:n = 3 + (0 | _e[t >> 2]) & -4,r = 0 | _e[n >> 2],_e[t >> 2] = n + 4,_e[(n = e) >> 2] = r,_e[n + 4 >> 2] = 0;break e;case 12:n = 7 + (0 | _e[t >> 2]) & -8,i = 0 | _e[(r = n) >> 2],r = 0 | _e[r + 4 >> 2],_e[t >> 2] = n + 8,_e[(n = e) >> 2] = i,_e[n + 4 >> 2] = r;break e;case 13:i = 3 + (0 | _e[t >> 2]) & -4,n = 0 | _e[i >> 2],_e[t >> 2] = i + 4,n = (65535 & n) << 16 >> 16,_e[(i = e) >> 2] = n,_e[i + 4 >> 2] = ((0 | n) < 0) << 31 >> 31;break e;case 14:i = 3 + (0 | _e[t >> 2]) & -4,n = 0 | _e[i >> 2],_e[t >> 2] = i + 4,_e[(i = e) >> 2] = 65535 & n,_e[i + 4 >> 2] = 0;break e;case 15:i = 3 + (0 | _e[t >> 2]) & -4,n = 0 | _e[i >> 2],_e[t >> 2] = i + 4,n = (255 & n) << 24 >> 24,_e[(i = e) >> 2] = n,_e[i + 4 >> 2] = ((0 | n) < 0) << 31 >> 31;break e;case 16:i = 3 + (0 | _e[t >> 2]) & -4,n = 0 | _e[i >> 2],_e[t >> 2] = i + 4,_e[(i = e) >> 2] = 255 & n,_e[i + 4 >> 2] = 0;break e;case 17:case 18:i = 7 + (0 | _e[t >> 2]) & -8,a = +k[i >> 3],_e[t >> 2] = i + 8,k[e >> 3] = a;break e;default:break e;
}
}
}while(0);
}function X(e,r,t,n,i){
r |= 0,t |= 0,n |= 0,i |= 0;var a,o,u,f,l,s = 0,c = 0,_ = 0,d = 0,E = Te;if(Te = Te + 576 | 0,f = E + 48 | 0,a = E + 32 | 0,c = E + 16 | 0,u = (s = E) + 64 | 0,l = E + 60 | 0,d = (e |= 0) + 8 | 0,(0 | _e[(o = e + 4 | 0) >> 2]) >>> 0 > (0 | _e[d >> 2]) >>> 0 && (_e[s >> 2] = 866,_e[s + 4 >> 2] = 2123,_e[s + 8 >> 2] = 845,Ce(u,812,s),Me(u)),(2147418112 / (n >>> 0) | 0) >>> 0 <= r >>> 0 && (_e[c >> 2] = 866,_e[c + 4 >> 2] = 2124,_e[c + 8 >> 2] = 885,Ce(u,812,c),Me(u)),r >>> 0 <= (s = 0 | _e[d >> 2]) >>> 0)return Te = E,0 | (d = 1);if(10 == (0 | (t = 9 == (0 | (t = t && 0 != ((_ = r + -1 | 0) & r | 0) ? (r = _ >>> 16 | _,r |= r >>> 8,r |= r >>> 4,(r = 1 + ((r |= r >>> 2) >>> 1 | r) | 0) ? 9 : (r = 0,10)) : 9)) && r >>> 0 <= s >>> 0 ? 10 : t)) && (_e[a >> 2] = 866,_e[4 + a >> 2] = 2133,_e[8 + a >> 2] = 933,Ce(u,812,a),Me(u)),_ = 0 | ie(r,n),i)if(c = 0 | te(_,l)){
Ze[0 & i](c,0 | _e[e >> 2],0 | _e[o >> 2]),s = 0 | _e[e >> 2];do{
if(0 | s){
if(7 & s){
_e[f >> 2] = 866,_e[4 + f >> 2] = 2506,_e[8 + f >> 2] = 1232,Ce(u,812,f),Me(u);break;
}ue(s,0,0,1,0);break;
}
}while(0);_e[e >> 2] = c,t = 20;
}else r = 0;else(s = 0 | function(e,r,t,n){
r |= 0,t |= 0,n |= 0;var i = 0,a = 0,o = 0,u = 0,f = 0,l = 0;if(Te = (l = Te) + 560 | 0,f = l + 32 | 0,a = l + 16 | 0,o = (i = l) + 48 | 0,u = l + 44 | 0,7 & (e |= 0) | 0)return _e[i >> 2] = 866,_e[i + 4 >> 2] = 2506,_e[i + 8 >> 2] = 1210,Ce(o,812,i),Me(o),Te = l,(f = 0) | f;if(2147418112 < r >>> 0)return _e[a >> 2] = 866,_e[4 + a >> 2] = 2506,_e[8 + a >> 2] = 1103,Ce(o,812,a),Me(o),Te = l,(f = 0) | f;_e[u >> 2] = r,e = 0 | ue(e,r,u,n,0),0 | t && (_e[t >> 2] = _e[u >> 2]);7 & e | 0 && (_e[f >> 2] = 866,_e[f + 4 >> 2] = 2558,_e[f + 8 >> 2] = 1156,Ce(o,812,f),Me(o));return Te = l,0 | (f = e);
}(0 | _e[e >> 2],_,l,1)) ? (_e[e >> 2] = s,t = 20) : r = 0;return 20 == (0 | t) && (_ >>> 0 < (s = 0 | _e[l >> 2]) >>> 0 && (r = (s >>> 0) / (n >>> 0) | 0),_e[d >> 2] = r,r = 1),Te = E,0 | (d = r);
}function Y(e,r,t,n,i,a,o){
r |= 0,t |= 0,n |= 0,i |= 0,a |= 0,o |= 0;var u,f = 0,l = 0,s = 0 | _e[(e |= 0) + 88 >> 2];if(f = ((1 < (f = (de[12 + s >> 0] << 8 | de[13 + s >> 0]) >>> o) >>> 0 ? f : 1) + 3 | 0) >>> 2,l = ((1 < (l = (de[14 + s >> 0] << 8 | de[15 + s >> 0]) >>> o) >>> 0 ? l : 1) + 3 | 0) >>> 2,o = 0 | ce[(s = 18 + s | 0) >> 0],o = 0 | ie(f,o << 24 >> 24 == 0 | o << 24 >> 24 == 9 ? 8 : 16),a){
if(!(0 == (3 & a | 0) & o >>> 0 <= a >>> 0))return(i = 0) | i;o = a;
}if((0 | ie(o,l)) >>> 0 > i >>> 0)return(i = 0) | i;if(a = (f + 1 | 0) >>> 1,u = (l + 1 | 0) >>> 1,!t)return(i = 0) | i;switch(_e[e + 92 >> 2] = r,_e[e + 96 >> 2] = r,_e[e + 104 >> 2] = t,_e[e + 100 >> 2] = r + t,_e[e + 108 >> 2] = 0,(_e[e + 112 >> 2] = 0) | ce[s >> 0]){
case 0:if(!(0 | function(e,r,t,n,i,a,o,u){
r |= 0,t |= 0,n |= 0,i |= 0,a |= 0,o |= 0,u |= 0;var f,l,s,c,_,d,E,T,A,M,b,m,S,P,R,h,p,C,N,y,O,v,k,g,L,I,D,w,G,F,x,B,U,H,W,V,X,Y,K = 0,z = 0,j = 0,J = 0,$ = 0,Z = 0,q = 0,Q = 0,ee = 0,re = 0,te = 0,ne = Te;if(Te = Te + 656 | 0,X = ne + 112 | 0,W = ne + 96 | 0,H = ne + 80 | 0,U = ne + 64 | 0,B = ne + 48 | 0,Y = ne + 32 | 0,V = ne + 16 | 0,G = (x = ne) + 144 | 0,F = ne + 128 | 0,y = 0 | _e[(N = (e |= 0) + 240 | 0) >> 2],v = 0 | _e[(O = e + 256 | 0) >> 2],k = 255 & (w = 0 | ce[17 + (0 | _e[e + 88 >> 2]) >> 0]),!(w << 24 >> 24))return Te = ne,1;L = 0 == (0 | u),D = (I = o + -1 | 0) << 4,w = u + -1 | 0,S = 0 != (1 & a | 0),P = n << 1,R = e + 92 | 0,h = e + 116 | 0,p = e + 140 | 0,C = e + 236 | 0,m = 0 != (1 & i | 0),b = e + 188 | 0,E = e + 252 | 0,T = 1 + (g = n >>> 2) | 0,A = 2 + g | 0,M = 3 + g | 0,t = a = ee = 0,i = 1;do{
if(!L)for(q = 0 | _e[r + (ee << 2) >> 2],Q = 0;;){
if(z = 0 == (0 | (_ = 1 & Q)),c = (_ << 5 ^ 32) - 16 | 0,_ = (_ << 1 ^ 2) - 1 | 0,d = S & (e = (0 | Q) == (0 | w)),(0 | (K = z ? 0 : I)) != (0 | (s = z ? o : -1)))for(l = S & e ^ 1,Z = z ? q : q + D | 0;;){
for(1 == (0 | i) && (i = 512 | Ae(R,h)),f = 7 & i,i >>>= 3,z = 0 | de[1539 + f >> 0],e = 0;t = ($ = (J = (j = (0 | Ae(R,p)) + t | 0) - y | 0) >> 31) & j | J & ~$,(0 | _e[N >> 2]) >>> 0 <= t >>> 0 && (_e[x >> 2] = 866,_e[x + 4 >> 2] = 910,_e[x + 8 >> 2] = 1497,Ce(G,812,x),Me(G)),_e[F + (e << 2) >> 2] = _e[(0 | _e[C >> 2]) + (t << 2) >> 2],e = e + 1 | 0,e >>> 0 < z >>> 0;);if(d | ($ = m & (0 | K) == (0 | I))){
J = 0;do{
e = Z + (0 | ie(J,n)) | 0,j = 0 == (0 | J) | l,z = J << 1,a = (a = (re = (te = (0 | Ae(R,b)) + a | 0) - v | 0) >> 31) & te | re & ~a;do{
if($){
if(!j){
a = (a = (te = (re = (0 | Ae(R,b)) + a | 0) - v | 0) >> 31) & re | te & ~a;break;
}_e[e >> 2] = _e[F + ((0 | de[1547 + (f << 2) + z >> 0]) << 2) >> 2],(0 | _e[O >> 2]) >>> 0 <= a >>> 0 && (_e[W >> 2] = 866,_e[4 + W >> 2] = 910,_e[8 + W >> 2] = 1497,Ce(G,812,W),Me(G)),_e[e + 4 >> 2] = _e[(0 | _e[E >> 2]) + (a << 2) >> 2],a = (a = (te = (re = (0 | Ae(R,b)) + a | 0) - v | 0) >> 31) & re | te & ~a;
}else j && (_e[e >> 2] = _e[F + ((0 | de[1547 + (f << 2) + z >> 0]) << 2) >> 2],(0 | _e[O >> 2]) >>> 0 <= a >>> 0 && (_e[H >> 2] = 866,_e[4 + H >> 2] = 910,_e[8 + H >> 2] = 1497,Ce(G,812,H),Me(G)),_e[e + 4 >> 2] = _e[(0 | _e[E >> 2]) + (a << 2) >> 2]),e = e + 8 | 0,a = (a = (te = (re = (0 | Ae(R,b)) + a | 0) - v | 0) >> 31) & re | te & ~a,j && (_e[e >> 2] = _e[F + ((0 | de[1547 + (f << 2) + (1 | z) >> 0]) << 2) >> 2],(0 | _e[O >> 2]) >>> 0 <= a >>> 0 && (_e[X >> 2] = 866,_e[4 + X >> 2] = 910,_e[8 + X >> 2] = 1497,Ce(G,812,X),Me(G)),_e[e + 4 >> 2] = _e[(0 | _e[E >> 2]) + (a << 2) >> 2]);
}while(0);
}while(2 != (0 | (J = J + 1 | 0)));
}else _e[Z >> 2] = _e[F + ((0 | de[1547 + (f << 2) >> 0]) << 2) >> 2],a = (a = (te = (re = (0 | Ae(R,b)) + a | 0) - v | 0) >> 31) & re | te & ~a,(0 | _e[O >> 2]) >>> 0 <= a >>> 0 && (_e[V >> 2] = 866,_e[4 + V >> 2] = 910,_e[8 + V >> 2] = 1497,Ce(G,812,V),Me(G)),_e[Z + 4 >> 2] = _e[(0 | _e[E >> 2]) + (a << 2) >> 2],_e[Z + 8 >> 2] = _e[F + ((0 | de[1547 + (f << 2) + 1 >> 0]) << 2) >> 2],a = (a = (te = (re = (0 | Ae(R,b)) + a | 0) - v | 0) >> 31) & re | te & ~a,(0 | _e[O >> 2]) >>> 0 <= a >>> 0 && (_e[Y >> 2] = 866,_e[4 + Y >> 2] = 910,_e[8 + Y >> 2] = 1497,Ce(G,812,Y),Me(G)),_e[Z + 12 >> 2] = _e[(0 | _e[E >> 2]) + (a << 2) >> 2],_e[Z + (g << 2) >> 2] = _e[F + ((0 | de[1547 + (f << 2) + 2 >> 0]) << 2) >> 2],a = (a = (te = (re = (0 | Ae(R,b)) + a | 0) - v | 0) >> 31) & re | te & ~a,(0 | _e[O >> 2]) >>> 0 <= a >>> 0 && (_e[B >> 2] = 866,_e[4 + B >> 2] = 910,_e[8 + B >> 2] = 1497,Ce(G,812,B),Me(G)),_e[Z + (T << 2) >> 2] = _e[(0 | _e[E >> 2]) + (a << 2) >> 2],_e[Z + (A << 2) >> 2] = _e[F + ((0 | de[1547 + (f << 2) + 3 >> 0]) << 2) >> 2],a = (a = (te = (re = (0 | Ae(R,b)) + a | 0) - v | 0) >> 31) & re | te & ~a,(0 | _e[O >> 2]) >>> 0 <= a >>> 0 && (_e[U >> 2] = 866,_e[4 + U >> 2] = 910,_e[8 + U >> 2] = 1497,Ce(G,812,U),Me(G)),_e[Z + (M << 2) >> 2] = _e[(0 | _e[E >> 2]) + (a << 2) >> 2];if((0 | (K = _ + K | 0)) == (0 | s))break;Z = Z + c | 0;
}if((0 | (Q = Q + 1 | 0)) == (0 | u))break;q = q + P | 0;
}
}while((0 | (ee = ee + 1 | 0)) != (0 | k));return Te = ne,1;
}(e,n,i,o,f,l,a,u)))return(i = 0) | i;break;case 4:case 6:case 5:case 3:case 2:if(!(0 | function(e,r,t,n,i,a,o,u){
r |= 0,t |= 0,n |= 0,i |= 0,a |= 0,o |= 0,u |= 0;var f,l,s,c,_,d,E,T,A,M,b,m,S,P,R,h,p,C,N,y,O,v,k,g,L,I,D,w,G,F,x,B,U,H,W,V,X,Y,K,z,j = 0,J = 0,$ = 0,Z = 0,q = 0,Q = 0,ee = 0,re = 0,te = 0,ne = 0,ie = 0,ae = 0,oe = 0,ue = 0,fe = 0,le = 0,se = Te;if(Te = Te + 640 | 0,Y = se + 80 | 0,X = se + 64 | 0,V = se + 48 | 0,z = se + 32 | 0,K = se + 16 | 0,U = (W = se) + 128 | 0,H = se + 112 | 0,b = se + 96 | 0,S = 0 | _e[(m = (e |= 0) + 240 | 0) >> 2],R = 0 | _e[(P = e + 256 | 0) >> 2],p = 0 | _e[(h = e + 272 | 0) >> 2],B = 0 | _e[e + 88 >> 2],C = (0 | de[63 + B >> 0]) << 8 | 0 | de[64 + B >> 0],N = 255 & (B = 0 | ce[17 + B >> 0]),!(B << 24 >> 24))return Te = se,1;y = 0 == (0 | u),v = (O = o + -1 | 0) << 5,k = u + -1 | 0,g = n << 1,L = e + 92 | 0,I = e + 116 | 0,D = e + 164 | 0,w = e + 268 | 0,G = e + 140 | 0,F = e + 236 | 0,x = e + 212 | 0,B = e + 188 | 0,M = 0 == (1 & i | 0),A = 0 == (1 & a | 0),E = e + 288 | 0,T = e + 284 | 0,d = e + 252 | 0,t = i = a = e = le = 0,j = 1;do{
if(!y)for(ue = 0 | _e[r + (le << 2) >> 2],fe = 0;;){
if($ = 0 == (0 | (_ = 1 & fe)),c = (_ << 6 ^ 64) - 32 | 0,_ = (_ << 1 ^ 2) - 1 | 0,(0 | (J = $ ? 0 : O)) != (0 | (l = $ ? o : -1)))for(s = A | (0 | fe) != (0 | k),oe = $ ? ue : ue + v | 0;;){
for(1 == (0 | j) && (j = 512 | Ae(L,I)),f = 7 & j,j >>>= 3,Z = 0 | de[1539 + f >> 0],$ = 0;a = (ae = (ie = (ne = (0 | Ae(L,D)) + a | 0) - p | 0) >> 31) & ne | ie & ~ae,(0 | _e[h >> 2]) >>> 0 <= a >>> 0 && (_e[W >> 2] = 866,_e[W + 4 >> 2] = 910,_e[W + 8 >> 2] = 1497,Ce(U,812,W),Me(U)),_e[b + ($ << 2) >> 2] = Ee[(0 | _e[w >> 2]) + (a << 1) >> 1],$ = $ + 1 | 0,$ >>> 0 < Z >>> 0;);for($ = 0;t = (ae = (ie = (ne = (0 | Ae(L,G)) + t | 0) - S | 0) >> 31) & ne | ie & ~ae,(0 | _e[m >> 2]) >>> 0 <= t >>> 0 && (_e[K >> 2] = 866,_e[4 + K >> 2] = 910,_e[8 + K >> 2] = 1497,Ce(U,812,K),Me(U)),_e[H + ($ << 2) >> 2] = _e[(0 | _e[F >> 2]) + (t << 2) >> 2],$ = $ + 1 | 0,$ >>> 0 < Z >>> 0;);for(ae = M | (0 | J) != (0 | O),ne = 0,ie = oe;;){
if(ee = s | 0 == (0 | ne),re = ne << 1,ae)for(q = 0,Q = ie;e = (e = (Z = (te = (0 | Ae(L,x)) + e | 0) - C | 0) >> 31) & te | Z & ~e,i = (i = (te = (Z = (0 | Ae(L,B)) + i | 0) - R | 0) >> 31) & Z | te & ~i,ee && ($ = 0 | de[q + re + (1547 + (f << 2)) >> 0],Z = 3 * e | 0,(0 | _e[E >> 2]) >>> 0 <= Z >>> 0 && (_e[z >> 2] = 866,_e[4 + z >> 2] = 910,_e[8 + z >> 2] = 1497,Ce(U,812,z),Me(U)),te = (0 | _e[T >> 2]) + (Z << 1) | 0,_e[Q >> 2] = (0 | Ee[te >> 1]) << 16 | _e[b + ($ << 2) >> 2],_e[Q + 4 >> 2] = (0 | Ee[te + 4 >> 1]) << 16 | 0 | Ee[te + 2 >> 1],_e[Q + 8 >> 2] = _e[H + ($ << 2) >> 2],(0 | _e[P >> 2]) >>> 0 <= i >>> 0 && (_e[V >> 2] = 866,_e[4 + V >> 2] = 910,_e[8 + V >> 2] = 1497,Ce(U,812,V),Me(U)),_e[Q + 12 >> 2] = _e[(0 | _e[d >> 2]) + (i << 2) >> 2]),2 != (0 | (q = q + 1 | 0));)Q = Q + 16 | 0;else for(te = 1 ^ ee,ee = 1547 + (f << 2) + re | 0,q = 0,Q = ie;e = (e = (Z = (re = (0 | Ae(L,x)) + e | 0) - C | 0) >> 31) & re | Z & ~e,i = (i = (re = (Z = (0 | Ae(L,B)) + i | 0) - R | 0) >> 31) & Z | re & ~i,0 != (0 | q) | te || ($ = 0 | de[ee >> 0],Z = 3 * e | 0,(0 | _e[E >> 2]) >>> 0 <= Z >>> 0 && (_e[X >> 2] = 866,_e[4 + X >> 2] = 910,_e[8 + X >> 2] = 1497,Ce(U,812,X),Me(U)),re = (0 | _e[T >> 2]) + (Z << 1) | 0,_e[Q >> 2] = (0 | Ee[re >> 1]) << 16 | _e[b + ($ << 2) >> 2],_e[Q + 4 >> 2] = (0 | Ee[re + 4 >> 1]) << 16 | 0 | Ee[re + 2 >> 1],_e[Q + 8 >> 2] = _e[H + ($ << 2) >> 2],(0 | _e[P >> 2]) >>> 0 <= i >>> 0 && (_e[Y >> 2] = 866,_e[4 + Y >> 2] = 910,_e[8 + Y >> 2] = 1497,Ce(U,812,Y),Me(U)),_e[Q + 12 >> 2] = _e[(0 | _e[d >> 2]) + (i << 2) >> 2]),2 != (0 | (q = q + 1 | 0));)Q = Q + 16 | 0;if(2 == (0 | (ne = ne + 1 | 0)))break;ie = ie + n | 0;
}if((0 | (J = _ + J | 0)) == (0 | l))break;oe = oe + c | 0;
}if((0 | (fe = fe + 1 | 0)) == (0 | u))break;ue = ue + g | 0;
}
}while((0 | (le = le + 1 | 0)) != (0 | N));return Te = se,1;
}(e,n,i,o,f,l,a,u)))return(i = 0) | i;break;case 9:if(!(0 | function(e,r,t,n,i,a,o,u){
r |= 0,t |= 0,n |= 0,i |= 0,a |= 0,o |= 0,u |= 0;var f,l,s,c,_,d,E,T,A,M,b,m,S,P,R,h,p,C,N,y,O,v,k,g,L,I,D,w,G,F = 0,x = 0,B = 0,U = 0,H = 0,W = 0,V = 0,X = 0,Y = 0,K = 0,z = 0,j = 0,J = Te;if(Te = Te + 592 | 0,D = J + 48 | 0,G = J + 32 | 0,w = J + 16 | 0,g = (I = J) + 80 | 0,L = J + 64 | 0,b = 0 | _e[(M = (e |= 0) + 272 | 0) >> 2],k = 0 | _e[e + 88 >> 2],m = (0 | de[63 + k >> 0]) << 8 | 0 | de[64 + k >> 0],S = 255 & (k = 0 | ce[17 + k >> 0]),!(k << 24 >> 24))return Te = J,1;P = 0 == (0 | u),h = (R = o + -1 | 0) << 4,p = u + -1 | 0,C = n << 1,N = e + 92 | 0,y = e + 116 | 0,O = e + 164 | 0,v = e + 268 | 0,k = e + 212 | 0,A = 0 == (1 & i | 0),T = 0 == (1 & a | 0),E = e + 288 | 0,d = e + 284 | 0,t = i = j = 0,a = 1;do{
if(!P)for(K = 0 | _e[r + (j << 2) >> 2],z = 0;;){
if(F = 0 == (0 | (_ = 1 & z)),c = (_ << 5 ^ 32) - 16 | 0,_ = (_ << 1 ^ 2) - 1 | 0,(0 | (e = F ? 0 : R)) != (0 | (l = F ? o : -1)))for(s = T | (0 | z) != (0 | p),Y = F ? K : K + h | 0;;){
for(1 == (0 | a) && (a = 512 | Ae(N,y)),f = 7 & a,a >>>= 3,x = 0 | de[1539 + f >> 0],F = 0;t = (X = (V = (W = (0 | Ae(N,O)) + t | 0) - b | 0) >> 31) & W | V & ~X,(0 | _e[M >> 2]) >>> 0 <= t >>> 0 && (_e[I >> 2] = 866,_e[I + 4 >> 2] = 910,_e[I + 8 >> 2] = 1497,Ce(g,812,I),Me(g)),_e[L + (F << 2) >> 2] = Ee[(0 | _e[v >> 2]) + (t << 1) >> 1],F = F + 1 | 0,F >>> 0 < x >>> 0;);for(X = A | (0 | e) != (0 | R),W = 0,V = Y;H = s | 0 == (0 | W),x = W << 1,U = (U = (B = (F = (0 | Ae(N,k)) + i | 0) - m | 0) >> 31) & F | B & ~U,X ? (H && (i = 0 | de[1547 + (f << 2) + x >> 0],F = 3 * U | 0,(0 | _e[E >> 2]) >>> 0 <= F >>> 0 && (_e[w >> 2] = 866,_e[4 + w >> 2] = 910,_e[8 + w >> 2] = 1497,Ce(g,812,w),Me(g)),B = (0 | _e[d >> 2]) + (F << 1) | 0,_e[V >> 2] = (0 | Ee[B >> 1]) << 16 | _e[L + (i << 2) >> 2],_e[V + 4 >> 2] = (0 | Ee[B + 4 >> 1]) << 16 | 0 | Ee[B + 2 >> 1]),B = V + 8 | 0,i = (i = (U = (F = (0 | Ae(N,k)) + U | 0) - m | 0) >> 31) & F | U & ~i,H && (F = 0 | de[1547 + (f << 2) + (1 | x) >> 0],x = 3 * i | 0,(0 | _e[E >> 2]) >>> 0 <= x >>> 0 && (_e[D >> 2] = 866,_e[4 + D >> 2] = 910,_e[8 + D >> 2] = 1497,Ce(g,812,D),Me(g)),H = (0 | _e[d >> 2]) + (x << 1) | 0,_e[B >> 2] = (0 | Ee[H >> 1]) << 16 | _e[L + (F << 2) >> 2],_e[V + 12 >> 2] = (0 | Ee[H + 4 >> 1]) << 16 | 0 | Ee[H + 2 >> 1])) : (H && (i = 0 | de[1547 + (f << 2) + x >> 0],F = 3 * U | 0,(0 | _e[E >> 2]) >>> 0 <= F >>> 0 && (_e[G >> 2] = 866,_e[4 + G >> 2] = 910,_e[8 + G >> 2] = 1497,Ce(g,812,G),Me(g)),H = (0 | _e[d >> 2]) + (F << 1) | 0,_e[V >> 2] = (0 | Ee[H >> 1]) << 16 | _e[L + (i << 2) >> 2],_e[V + 4 >> 2] = (0 | Ee[H + 4 >> 1]) << 16 | 0 | Ee[H + 2 >> 1]),i = (i = (H = (U = (0 | Ae(N,k)) + U | 0) - m | 0) >> 31) & U | H & ~i),2 != (0 | (W = W + 1 | 0));)V = V + n | 0;if((0 | (e = _ + e | 0)) == (0 | l))break;Y = Y + c | 0;
}if((0 | (z = z + 1 | 0)) == (0 | u))break;K = K + C | 0;
}
}while((0 | (j = j + 1 | 0)) != (0 | S));return Te = J,1;
}(e,n,i,o,f,l,a,u)))return(i = 0) | i;break;case 8:case 7:if(!(0 | function(e,r,t,n,i,a,o,u){
r |= 0,t |= 0,n |= 0,i |= 0,a |= 0,o |= 0,u |= 0;var f,l,s,c,_,d,E,T,A,M,b,m,S,P,R,h,p,C,N,y,O,v,k,g,L,I,D,w,G,F,x,B,U = 0,H = 0,W = 0,V = 0,X = 0,Y = 0,K = 0,z = 0,j = 0,J = 0,$ = 0,Z = 0,q = 0,Q = 0,ee = 0,re = 0,te = 0,ne = 0,ie = 0,ae = Te;if(Te = Te + 640 | 0,F = ae + 80 | 0,G = ae + 64 | 0,w = ae + 48 | 0,B = ae + 32 | 0,x = ae + 16 | 0,L = (D = ae) + 128 | 0,I = ae + 112 | 0,M = ae + 96 | 0,m = 0 | _e[(b = (e |= 0) + 272 | 0) >> 2],g = 0 | _e[e + 88 >> 2],S = (0 | de[63 + g >> 0]) << 8 | 0 | de[64 + g >> 0],P = 255 & (g = 0 | ce[17 + g >> 0]),!(g << 24 >> 24))return Te = ae,1;R = 0 == (0 | u),p = (h = o + -1 | 0) << 5,C = u + -1 | 0,N = n << 1,y = e + 92 | 0,O = e + 116 | 0,v = e + 164 | 0,k = e + 268 | 0,g = e + 212 | 0,A = 0 == (1 & i | 0),T = 0 == (1 & a | 0),E = e + 288 | 0,d = e + 284 | 0,t = i = a = e = ie = 0,U = 1;do{
if(!R)for(te = 0 | _e[r + (ie << 2) >> 2],ne = 0;;){
if(W = 0 == (0 | (_ = 1 & ne)),c = (_ << 6 ^ 64) - 32 | 0,_ = (_ << 1 ^ 2) - 1 | 0,(0 | (H = W ? 0 : h)) != (0 | (l = W ? o : -1)))for(s = T | (0 | ne) != (0 | C),re = W ? te : te + p | 0;;){
for(1 == (0 | U) && (U = 512 | Ae(y,O)),f = 7 & U,U >>>= 3,V = 0 | de[1539 + f >> 0],W = 0;t = (ee = (Q = (q = (0 | Ae(y,v)) + t | 0) - m | 0) >> 31) & q | Q & ~ee,(0 | _e[b >> 2]) >>> 0 <= t >>> 0 && (_e[D >> 2] = 866,_e[D + 4 >> 2] = 910,_e[D + 8 >> 2] = 1497,Ce(L,812,D),Me(L)),_e[I + (W << 2) >> 2] = Ee[(0 | _e[k >> 2]) + (t << 1) >> 1],W = W + 1 | 0,W >>> 0 < V >>> 0;);for(W = 0;a = (ee = (Q = (q = (0 | Ae(y,v)) + a | 0) - m | 0) >> 31) & q | Q & ~ee,(0 | _e[b >> 2]) >>> 0 <= a >>> 0 && (_e[x >> 2] = 866,_e[4 + x >> 2] = 910,_e[8 + x >> 2] = 1497,Ce(L,812,x),Me(L)),_e[M + (W << 2) >> 2] = Ee[(0 | _e[k >> 2]) + (a << 1) >> 1],W = W + 1 | 0,W >>> 0 < V >>> 0;);for(ee = A | (0 | H) != (0 | h),q = 0,Q = re;;){
if(J = s | 0 == (0 | q),$ = q << 1,ee)for(z = 0,j = Q;i = (i = (K = (Z = (0 | Ae(y,g)) + i | 0) - S | 0) >> 31) & Z | K & ~i,e = (e = (Z = (K = (0 | Ae(y,g)) + e | 0) - S | 0) >> 31) & K | Z & ~e,J && (K = 0 | de[z + $ + (1547 + (f << 2)) >> 0],V = 3 * i | 0,(W = 0 | _e[E >> 2]) >>> 0 <= V >>> 0 && (_e[B >> 2] = 866,_e[4 + B >> 2] = 910,_e[8 + B >> 2] = 1497,Ce(L,812,B),Me(L),W = 0 | _e[E >> 2]),V = (X = 0 | _e[d >> 2]) + (V << 1) | 0,Z = (W = (Y = 3 * e | 0) >>> 0 < W >>> 0 ? X : (_e[w >> 2] = 866,_e[4 + w >> 2] = 910,_e[8 + w >> 2] = 1497,Ce(L,812,w),Me(L),0 | _e[d >> 2])) + (Y << 1) | 0,_e[j >> 2] = (0 | Ee[V >> 1]) << 16 | _e[I + (K << 2) >> 2],_e[j + 4 >> 2] = (0 | Ee[V + 4 >> 1]) << 16 | 0 | Ee[V + 2 >> 1],_e[j + 8 >> 2] = (0 | Ee[Z >> 1]) << 16 | _e[M + (K << 2) >> 2],_e[j + 12 >> 2] = (0 | Ee[Z + 4 >> 1]) << 16 | 0 | Ee[Z + 2 >> 1]),2 != (0 | (z = z + 1 | 0));)j = j + 16 | 0;else for(Z = 1 ^ J,J = 1547 + (f << 2) + $ | 0,z = 0,j = Q;i = (i = (K = ($ = (0 | Ae(y,g)) + i | 0) - S | 0) >> 31) & $ | K & ~i,e = (e = ($ = (K = (0 | Ae(y,g)) + e | 0) - S | 0) >> 31) & K | $ & ~e,0 != (0 | z) | Z || (K = 0 | de[J >> 0],V = 3 * i | 0,(W = 0 | _e[E >> 2]) >>> 0 <= V >>> 0 && (_e[G >> 2] = 866,_e[4 + G >> 2] = 910,_e[8 + G >> 2] = 1497,Ce(L,812,G),Me(L),W = 0 | _e[E >> 2]),V = (X = 0 | _e[d >> 2]) + (V << 1) | 0,$ = (W = (Y = 3 * e | 0) >>> 0 < W >>> 0 ? X : (_e[F >> 2] = 866,_e[4 + F >> 2] = 910,_e[8 + F >> 2] = 1497,Ce(L,812,F),Me(L),0 | _e[d >> 2])) + (Y << 1) | 0,_e[j >> 2] = (0 | Ee[V >> 1]) << 16 | _e[I + (K << 2) >> 2],_e[j + 4 >> 2] = (0 | Ee[V + 4 >> 1]) << 16 | 0 | Ee[V + 2 >> 1],_e[j + 8 >> 2] = (0 | Ee[$ >> 1]) << 16 | _e[M + (K << 2) >> 2],_e[j + 12 >> 2] = (0 | Ee[$ + 4 >> 1]) << 16 | 0 | Ee[$ + 2 >> 1]),2 != (0 | (z = z + 1 | 0));)j = j + 16 | 0;if(2 == (0 | (q = q + 1 | 0)))break;Q = Q + n | 0;
}if((0 | (H = _ + H | 0)) == (0 | l))break;re = re + c | 0;
}if((0 | (ne = ne + 1 | 0)) == (0 | u))break;te = te + N | 0;
}
}while((0 | (ie = ie + 1 | 0)) != (0 | P));return Te = ae,1;
}(e,n,i,o,f,l,a,u)))return(i = 0) | i;break;default:return(i = 0) | i;
}return 0 | (i = 1);
}function K(e,r,t){
e |= 0,r |= 0;var n,i,a;if(8192 <= (0 | (t |= 0)))return 0 | N(0 | e,0 | r,0 | t);if(a = 0 | e,i = e + t | 0,(3 & e) == (3 & r)){
for(;3 & e;){
if(!t)return 0 | a;ce[e >> 0] = 0 | ce[r >> 0],e = e + 1 | 0,r = r + 1 | 0,t = t - 1 | 0;
}for(n = (t = -4 & i | 0) - 64 | 0;(0 | e) <= (0 | n);)_e[e >> 2] = _e[r >> 2],_e[e + 4 >> 2] = _e[r + 4 >> 2],_e[e + 8 >> 2] = _e[r + 8 >> 2],_e[e + 12 >> 2] = _e[r + 12 >> 2],_e[e + 16 >> 2] = _e[r + 16 >> 2],_e[e + 20 >> 2] = _e[r + 20 >> 2],_e[e + 24 >> 2] = _e[r + 24 >> 2],_e[e + 28 >> 2] = _e[r + 28 >> 2],_e[e + 32 >> 2] = _e[r + 32 >> 2],_e[e + 36 >> 2] = _e[r + 36 >> 2],_e[e + 40 >> 2] = _e[r + 40 >> 2],_e[e + 44 >> 2] = _e[r + 44 >> 2],_e[e + 48 >> 2] = _e[r + 48 >> 2],_e[e + 52 >> 2] = _e[r + 52 >> 2],_e[e + 56 >> 2] = _e[r + 56 >> 2],_e[e + 60 >> 2] = _e[r + 60 >> 2],e = e + 64 | 0,r = r + 64 | 0;for(;(0 | e) < (0 | t);)_e[e >> 2] = _e[r >> 2],e = e + 4 | 0,r = r + 4 | 0;
}else for(t = i - 4 | 0;(0 | e) < (0 | t);)ce[e >> 0] = 0 | ce[r >> 0],ce[e + 1 >> 0] = 0 | ce[r + 1 >> 0],ce[e + 2 >> 0] = 0 | ce[r + 2 >> 0],ce[e + 3 >> 0] = 0 | ce[r + 3 >> 0],e = e + 4 | 0,r = r + 4 | 0;for(;(0 | e) < (0 | i);)ce[e >> 0] = 0 | ce[r >> 0],e = e + 1 | 0,r = r + 1 | 0;return 0 | a;
}function z(e,r,t){
r |= 0,t |= 0;var n,i,a,o,u,f = 0,l = 0,s = 0,c = 0,_ = 0,d = Te;Te = Te + 48 | 0,o = d + 16 | 0,l = (s = d) + 32 | 0,f = 0 | _e[(i = (e |= 0) + 28 | 0) >> 2],_e[l >> 2] = f,f = (0 | _e[(a = e + 20 | 0) >> 2]) - f | 0,_e[l + 4 >> 2] = f,_e[l + 8 >> 2] = r,f = f + (_e[l + 12 >> 2] = t) | 0,n = e + 60 | 0,_e[s >> 2] = _e[n >> 2],_e[s + 4 >> 2] = l,_e[s + 8 >> 2] = 2,s = 0 | Le(0 | v(146,0 | s));e:do{
if((0 | f) != (0 | s)){
for(r = 2;!((0 | s) < 0);)if(f = f - s | 0,r = ((u = (_ = 0 | _e[l + 4 >> 2]) >>> 0 < s >>> 0) << 31 >> 31) + r | 0,_ = s - (u ? _ : 0) | 0,_e[(l = u ? l + 8 | 0 : l) >> 2] = (0 | _e[l >> 2]) + _,_e[(u = l + 4 | 0) >> 2] = (0 | _e[u >> 2]) - _,_e[o >> 2] = _e[n >> 2],_e[4 + o >> 2] = l,_e[8 + o >> 2] = r,(0 | f) == (0 | (s = 0 | Le(0 | v(146,0 | o))))){
c = 3;break e;
}_e[e + 16 >> 2] = 0,_e[i >> 2] = 0,_e[a >> 2] = 0,_e[e >> 2] = 32 | _e[e >> 2],t = 2 == (0 | r) ? 0 : t - (0 | _e[l + 4 >> 2]) | 0;
}else c = 3;
}while(0);return 3 == (0 | c) && (_ = 0 | _e[e + 44 >> 2],_e[e + 16 >> 2] = _ + (0 | _e[e + 48 >> 2]),_e[i >> 2] = _,_e[a >> 2] = _),Te = d,0 | t;
}function j(e,r,t){
e |= 0,r |= 0,t |= 0;var n,i,a,o,u,f,l,s,c,_ = 0,d = 0,E = Te;for(Te = Te + 224 | 0,f = E + 120 | 0,l = E + 80 | 0,s = E,c = E + 136 | 0,_ = l,d = _ + 40 | 0;_ = _ + 4 | (_e[_ >> 2] = 0),(0 | _) < (0 | d););return _e[f >> 2] = _e[t >> 2],t = (0 | w(0,r,f,s,l)) < 0 ? -1 : (_e[e + 76 >> 2],u = 32 & (t = 0 | _e[e >> 2]),(0 | ce[e + 74 >> 0]) < 1 && (_e[e >> 2] = -33 & t),0 | _e[(_ = e + 48 | 0) >> 2] ? t = 0 | w(e,r,f,s,l) : (n = 0 | _e[(d = e + 44 | 0) >> 2],_e[d >> 2] = c,_e[(i = e + 28 | 0) >> 2] = c,_e[(a = e + 20 | 0) >> 2] = c,_e[_ >> 2] = 80,_e[(o = e + 16 | 0) >> 2] = 80 + c,t = 0 | w(e,r,f,s,l),n && (ze[7 & _e[e + 36 >> 2]](e,0,0),t = 0 == (0 | _e[a >> 2]) ? -1 : t,_e[d >> 2] = n,_e[_ >> 2] = 0,_e[o >> 2] = 0,_e[i >> 2] = 0,_e[a >> 2] = 0)),_ = 0 | _e[e >> 2],_e[e >> 2] = _ | u,0 == (32 & _ | 0) ? t : -1),Te = E,0 | t;
}function J(e,r,t,n){
e |= 0,r |= 0,t |= 0,n |= 0;var i,a,o,u,f,l,s,c = 0,_ = Te;for(Te = Te + 64 | 0,l = _,f = 0 | _e[e >> 2],s = e + (0 | _e[f - 8 >> 2]) | 0,f = 0 | _e[f - 4 >> 2],_e[l >> 2] = t,_e[l + 4 >> 2] = e,_e[l + 8 >> 2] = r,_e[l + 12 >> 2] = n,e = l + 16 | 0,r = l + 20 | 0,n = l + 24 | 0,i = l + 28 | 0,a = l + 32 | 0,o = l + 40 | 0,c = e,u = c + 36 | 0;c = c + 4 | (_e[c >> 2] = 0),(0 | c) < (0 | u););W[e + 36 >> 1] = 0,ce[e + 38 >> 0] = 0;e:do{
if(0 | we(f,t))_e[l + 48 >> 2] = 1,Qe[3 & _e[20 + (0 | _e[f >> 2]) >> 2]](f,l,s,s,1,0),e = 1 == (0 | _e[n >> 2]) ? s : 0;else{
switch(je[3 & _e[24 + (0 | _e[f >> 2]) >> 2]](f,l,s,1,0),0 | _e[l + 36 >> 2]){
case 0:e = 1 == (0 | _e[o >> 2]) & 1 == (0 | _e[i >> 2]) & 1 == (0 | _e[a >> 2]) ? 0 | _e[r >> 2] : 0;break e;case 1:break;default:e = 0;break e;
}if(1 != (0 | _e[n >> 2]) && !(0 == (0 | _e[o >> 2]) & 1 == (0 | _e[i >> 2]) & 1 == (0 | _e[a >> 2]))){
e = 0;break;
}e = 0 | _e[e >> 2];
}
}while(0);return Te = _,0 | e;
}function $(e){
var r = 0,t = 0,n = 0,i = 0,a = 0,o = 0,u = 0,f = Te;if(Te = Te + 544 | 0,o = f + 16 | 0,i = (r = f) + 32 | 0,8192 <= ((t = 0 | _e[(a = (e |= 0) + 8 | 0) >> 2]) + -1 | 0) >>> 0 && (_e[r >> 2] = 866,_e[r + 4 >> 2] = 3006,_e[r + 8 >> 2] = 1257,Ce(i,812,r),Me(i)),_e[e >> 2] = t,u = (r = 0 | _e[(n = e + 20 | 0) >> 2]) ? t : ((r = 0 | te(180,0)) ? (_e[(u = r + 164 | 0) >> 2] = 0,_e[u + 4 >> 2] = 0,_e[u + 8 >> 2] = 0,_e[u + 12 >> 2] = 0) : r = 0,_e[n >> 2] = r,0 | _e[e >> 2]),o = 0 | _e[a >> 2] ? u : (_e[o >> 2] = 866,_e[o + 4 >> 2] = 910,_e[o + 8 >> 2] = 1497,Ce(i,812,o),Me(i),0 | _e[e >> 2]),i = 0 | _e[e + 4 >> 2],!(16 < o >>> 0))return e = (e = 0) | G(r,u,i,e),Te = f,0 | e;for(t = o,n = 0;a = n + 1 | 0,3 < t >>> 0;)t >>>= 1,n = a;return e = 0 | G(r,u,i,e = 255 & ((e = n + 2 + (32 != (0 | a) & 1 << a >>> 0 < o >>> 0 & 1) | 0) >>> 0 < 11 ? e : 11)),Te = f,0 | e;
}function Z(e){
var r,t,n,i,a,o = 0,u = 0,f = Te;Te = Te + 576 | 0,i = f + 48 | 0,a = f + 32 | 0,t = f + 16 | 0,n = (r = f) + 64 | 0,o = 0 | _e[(e |= 0) + 168 >> 2];do{
if(0 | o){
if(u = 0 | _e[o + -4 >> 2],o = o + -8 | 0,0 != (0 | u) && (0 | u) == (0 | ~_e[o >> 2]) || (_e[r >> 2] = 866,_e[r + 4 >> 2] = 651,_e[r + 8 >> 2] = 1579,Ce(n,812,r),Me(n)),7 & o){
_e[t >> 2] = 866,_e[4 + t >> 2] = 2506,_e[8 + t >> 2] = 1232,Ce(n,812,t),Me(n);break;
}ue(o,0,0,1,0);break;
}
}while(0);Te = ((o = 0 | _e[e + 176 >> 2]) && (u = 0 | _e[o + -4 >> 2],o = o + -8 | 0,0 != (0 | u) && (0 | u) == (0 | ~_e[o >> 2]) || (_e[a >> 2] = 866,_e[4 + a >> 2] = 651,_e[8 + a >> 2] = 1579,Ce(n,812,a),Me(n)),7 & o ? (_e[i >> 2] = 866,_e[4 + i >> 2] = 2506,_e[8 + i >> 2] = 1232,Ce(n,812,i),Me(n)) : ue(o,0,0,1,0)),f);
}function q(e,r,t){
var n;return!(0 != (0 | (e |= 0)) & 73 < (r |= 0) >>> 0 & 0 != (0 | (t |= 0))) || 40 != (0 | _e[t >> 2]) || 18552 != ((0 | de[e >> 0]) << 8 | 0 | de[e + 1 >> 0] | 0) || ((0 | de[e + 2 >> 0]) << 8 | 0 | de[e + 3 >> 0]) >>> 0 < 74 || ((0 | de[e + 7 >> 0]) << 16 | (0 | de[e + 6 >> 0]) << 24 | (0 | de[e + 8 >> 0]) << 8 | 0 | de[e + 9 >> 0]) >>> 0 > r >>> 0 ? (t = 0) | t : (_e[t + 4 >> 2] = (0 | de[e + 12 >> 0]) << 8 | 0 | de[e + 13 >> 0],_e[t + 8 >> 2] = (0 | de[e + 14 >> 0]) << 8 | 0 | de[e + 15 >> 0],_e[t + 12 >> 2] = de[e + 16 >> 0],_e[t + 16 >> 2] = de[e + 17 >> 0],r = e + 18 | 0,_e[(n = t + 32 | 0) >> 2] = de[r >> 0],r = (_e[4 + n >> 2] = 0) | ce[r >> 0],_e[t + 20 >> 2] = r << 24 >> 24 == 0 | r << 24 >> 24 == 9 ? 8 : 16,_e[t + 24 >> 2] = (0 | de[e + 26 >> 0]) << 16 | (0 | de[e + 25 >> 0]) << 24 | (0 | de[e + 27 >> 0]) << 8 | 0 | de[e + 28 >> 0],_e[t + 28 >> 2] = (0 | de[e + 30 >> 0]) << 16 | (0 | de[e + 29 >> 0]) << 24 | (0 | de[e + 31 >> 0]) << 8 | 0 | de[e + 32 >> 0],0 | (t = 1));
}function Q(e,r){
e |= 0;var t,n,i = 0,a = 0,o = 0,u = 0,f = 0,l = Te;if(Te = Te + 544 | 0,f = l + 16 | 0,u = (i = l) + 32 | 0,33 <= (r |= 0) >>> 0 && (_e[i >> 2] = 866,_e[i + 4 >> 2] = 3199,_e[i + 8 >> 2] = 1350,Ce(u,812,i),Me(u)),(0 | r) <= (0 | (i = 0 | _e[(n = e + 20 | 0) >> 2])))return u = i,f = (a = 0 | _e[(o = a = e + 16 | 0) >> 2]) >>> (f = 32 - r | 0),a <<= r,_e[o >> 2] = a,r = u - r | 0,_e[n >> 2] = r,Te = l,0 | f;for(a = e + 4 | 0,o = e + 8 | 0,t = e + 16 | 0;e = (0 | (e = 0 | _e[a >> 2])) == (0 | _e[o >> 2]) ? 0 : (_e[a >> 2] = e + 1,0 | de[e >> 0]),i = i + 8 | 0,33 <= (0 | (_e[n >> 2] = i)) && (_e[f >> 2] = 866,_e[f + 4 >> 2] = 3208,_e[f + 8 >> 2] = 1366,Ce(u,812,f),Me(u),i = 0 | _e[n >> 2]),e = e << 32 - i | _e[t >> 2],_e[t >> 2] = e,(0 | i) < (0 | r););return f = e >>> (f = 32 - r | 0),u = e << r,_e[t >> 2] = u,r = i - r | 0,_e[n >> 2] = r,Te = l,0 | f;
}function ee(e,r,t){
e |= 0,r |= 0;var n,i = 0,a = 0,o = 0,u = 0;(a = 0 | _e[(i = (t |= 0) + 16 | 0) >> 2]) ? o = 5 : 0 | be(t) ? i = 0 : (a = 0 | _e[i >> 2],o = 5);e:do{
if(5 == (0 | o)){
if((a - (i = u = 0 | _e[(n = t + 20 | 0) >> 2]) | 0) >>> 0 < r >>> 0){
i = 0 | ze[7 & _e[t + 36 >> 2]](t,e,r);break;
}r:do{
if(-1 < (0 | ce[t + 75 >> 0])){
for(u = r;;){
if(!u){
o = 0,a = e;break r;
}if(10 == (0 | ce[e + (a = u + -1 | 0) >> 0]))break;u = a;
}if((i = 0 | ze[7 & _e[t + 36 >> 2]](t,e,u)) >>> 0 < u >>> 0)break e;a = e + (o = u) | 0,r = r - u | 0,i = 0 | _e[n >> 2];
}else o = 0,a = e;
}while(0);K(0 | i,0 | a,0 | r),_e[n >> 2] = (0 | _e[n >> 2]) + r,i = o + r | 0;
}
}while(0);return 0 | i;
}function re(e){
var r,t = 0,n = 0,i = 0,a = Te;Te = Te + 544 | 0,i = a + 16 | 0,r = (n = a) + 32 | 0,t = 0 | _e[(e |= 0) + 20 >> 2];do{
if(0 | t){
if(Z(t),7 & t){
_e[n >> 2] = 866,_e[n + 4 >> 2] = 2506,_e[n + 8 >> 2] = 1232,Ce(r,812,n),Me(r);break;
}ue(t,0,0,1,0);break;
}
}while(0);if(!(n = 0 | _e[(t = e + 4 | 0) >> 2]))return ce[(i = e + 16 | 0) >> 0] = 0,void(Te = a);7 & n ? (_e[i >> 2] = 866,_e[i + 4 >> 2] = 2506,_e[i + 8 >> 2] = 1232,Ce(r,812,i),Me(r)) : ue(n,0,0,1,0),_e[t >> 2] = 0,_e[e + 8 >> 2] = 0,_e[e + 12 >> 2] = 0,ce[(i = e + 16 | 0) >> 0] = 0,Te = a;
}function te(e,r){
r |= 0;var t,n,i,a = 0,o = 0,u = 0,f = Te;return Te = Te + 560 | 0,u = f + 32 | 0,i = f + 16 | 0,n = (a = f) + 48 | 0,t = f + 44 | 0,2147418112 < (o = 0 | (o = (e |= 0) + 3 & -4) ? o : 4) >>> 0 ? (_e[a >> 2] = 866,_e[a + 4 >> 2] = 2506,_e[a + 8 >> 2] = 1103,Ce(n,812,a),Me(n),Te = f,(u = 0) | u) : (e = 0 | ue(0,_e[t >> 2] = o,t,1,0),a = 0 | _e[t >> 2],0 | r && (_e[r >> 2] = a),0 == (0 | e) | a >>> 0 < o >>> 0 ? (_e[i >> 2] = 866,_e[4 + i >> 2] = 2506,_e[8 + i >> 2] = 1129,Ce(n,812,i),Me(n),e = 0) : 7 & e && (_e[u >> 2] = 866,_e[u + 4 >> 2] = 2533,_e[u + 8 >> 2] = 1156,Ce(n,812,u),Me(n)),Te = f,0 | (u = e));
}function ne(e,r,t){
r |= 0;var n,i,a,o = (e |= 0) + (t |= 0) | 0;if(r &= 255,67 <= (0 | t)){
for(;3 & e;)ce[e >> 0] = r,e = e + 1 | 0;for(i = (n = -4 & o | 0) - 64 | 0,a = r | r << 8 | r << 16 | r << 24;(0 | e) <= (0 | i);)_e[e >> 2] = a,_e[e + 4 >> 2] = a,_e[e + 8 >> 2] = a,_e[e + 12 >> 2] = a,_e[e + 16 >> 2] = a,_e[e + 20 >> 2] = a,_e[e + 24 >> 2] = a,_e[e + 28 >> 2] = a,_e[e + 32 >> 2] = a,_e[e + 36 >> 2] = a,_e[e + 40 >> 2] = a,_e[e + 44 >> 2] = a,_e[e + 48 >> 2] = a,_e[e + 52 >> 2] = a,_e[e + 56 >> 2] = a,_e[e + 60 >> 2] = a,e = e + 64 | 0;for(;(0 | e) < (0 | n);)_e[e >> 2] = a,e = e + 4 | 0;
}for(;(0 | e) < (0 | o);)ce[e >> 0] = r,e = e + 1 | 0;return o - t | 0;
}function ae(e,r,t,n,i){
e |= 0,t |= 0,n |= 0,i |= 0;var a,o,u,f;ce[(r |= 0) + 53 >> 0] = 1;do{
if((0 | _e[r + 4 >> 2]) == (0 | n)){
if(ce[r + 52 >> 0] = 1,u = r + 54 | 0,f = r + 48 | 0,o = r + 24 | 0,e = r + 36 | 0,!(a = 0 | _e[(n = r + 16 | 0) >> 2])){
if(_e[n >> 2] = t,_e[o >> 2] = i,!((_e[e >> 2] = 1) == (0 | _e[f >> 2]) & 1 == (0 | i)))break;ce[u >> 0] = 1;break;
}if((0 | a) != (0 | t)){
_e[e >> 2] = 1 + (0 | _e[e >> 2]),ce[u >> 0] = 1;break;
}2 == (0 | (e = 0 | _e[o >> 2])) && (e = _e[o >> 2] = i),1 == (0 | _e[f >> 2]) & 1 == (0 | e) && (ce[u >> 0] = 1);
}
}while(0);
}function oe(e,r){
e |= 0;var t,n,i = 0,a = 0,o = 0,u = 0,f = Te;Te = Te + 16 | 0,n = 255 & (r |= 0),ce[(t = f) >> 0] = n,(o = 0 | _e[(a = e + 16 | 0) >> 2]) ? u = 4 : 0 | be(e) ? i = -1 : (o = 0 | _e[a >> 2],u = 4);do{
if(4 == (0 | u)){
if((a = 0 | _e[(u = e + 20 | 0) >> 2]) >>> 0 < o >>> 0 && (0 | (i = 255 & r)) != (0 | ce[e + 75 >> 0])){
_e[u >> 2] = a + 1,ce[a >> 0] = n;break;
}i = 1 == (0 | ze[7 & _e[e + 36 >> 2]](e,t,1)) ? 0 | de[t >> 0] : -1;
}
}while(0);return Te = f,0 | i;
}function ue(e,r,t,n,i){
e |= 0,r |= 0,t |= 0,n |= 0,i |= 0;do{
if(e){
if(!r){
if(F(e),!t){
r = 0;break;
}r = _e[t >> 2] = 0;break;
}n ? e = 0 == (0 | (r = 0 | function(e,r){
r |= 0;var t = 0,n = 0;if(!(e |= 0))return 0 | (r = 0 | I(r));if(4294967231 < r >>> 0)return _e[(r = 296) >> 2] = 12,(r = 0) | r;if(0 | (t = 0 | function(e,r){
r |= 0;var t,n,i = 0,a = 0,o = 0,u = 0,f = 0,l = 0,s = 0,c = (e |= 0) + (i = -8 & (l = 0 | _e[(s = e + 4 | 0) >> 2])) | 0;if(!(3 & l))return!(r >>> 0 < 256) && (r + 4 | 0) >>> 0 <= i >>> 0 && (i - r | 0) >>> 0 <= _e[1264] << 1 >>> 0 ? 0 | e : (e = 0) | e;if(r >>> 0 <= i >>> 0)return(i = i - r | 0) >>> 0 <= 15 || (f = e + r | 0,_e[s >> 2] = 1 & l | r | 2,_e[f + 4 >> 2] = 3 | i,_e[(s = f + i + 4 | 0) >> 2] = 1 | _e[s >> 2],x(f,i)),0 | e;if((0 | c) == (0 | _e[1150]))return i = (f = (0 | _e[1147]) + i | 0) - r | 0,a = e + r | 0,f >>> 0 <= r >>> 0 ? (e = 0) | e : (_e[s >> 2] = 1 & l | r | 2,_e[a + 4 >> 2] = 1 | i,_e[1150] = a,_e[1147] = i,0 | e);if((0 | c) == (0 | _e[1149]))return(o = (0 | _e[1146]) + i | 0) >>> 0 < r >>> 0 ? (e = 0) | e : (a = 1 & l,15 < (i = o - r | 0) >>> 0 ? (f = (l = e + r | 0) + i | 0,_e[s >> 2] = a | r | 2,_e[l + 4 >> 2] = 1 | i,_e[f >> 2] = i,_e[(a = f + 4 | 0) >> 2] = -2 & _e[a >> 2],a = l) : (_e[s >> 2] = a | o | 2,_e[(a = e + o + 4 | 0) >> 2] = 1 | _e[a >> 2],i = a = 0),_e[1146] = i,_e[1149] = a,0 | e);if(2 & (a = 0 | _e[4 + c >> 2]) | 0)return(e = 0) | e;if((n = (-8 & a) + i | 0) >>> 0 < r >>> 0)return(e = 0) | e;f = n - r | 0,o = a >>> 3;do{
if(a >>> 0 < 256){
if(a = 0 | _e[8 + c >> 2],(0 | (i = 0 | _e[12 + c >> 2])) == (0 | a)){
_e[1144] = _e[1144] & ~(1 << o);break;
}_e[a + 12 >> 2] = i,_e[i + 8 >> 2] = a;break;
}t = 0 | _e[24 + c >> 2],i = 0 | _e[12 + c >> 2];do{
if((0 | i) == (0 | c)){
if(i = 0 | _e[(a = (o = 16 + c | 0) + 4 | 0) >> 2])u = a;else{
if(!(i = 0 | _e[o >> 2])){
o = 0;break;
}u = o;
}for(;;)if(0 | (a = 0 | _e[(o = i + 20 | 0) >> 2]))i = a,u = o;else{
if(!(o = 0 | _e[(a = i + 16 | 0) >> 2]))break;i = o,u = a;
}_e[u >> 2] = 0,o = i;
}else o = 0 | _e[8 + c >> 2],_e[o + 12 >> 2] = i,_e[i + 8 >> 2] = o,o = i;
}while(0);if(0 | t){
if(i = 0 | _e[28 + c >> 2],(0 | c) == (0 | _e[(a = 4880 + (i << 2) | 0) >> 2])){
if(!(_e[a >> 2] = o)){
_e[1145] = _e[1145] & ~(1 << i);break;
}
}else if(!(_e[16 + t + (((0 | _e[16 + t >> 2]) != (0 | c) & 1) << 2) >> 2] = o))break;_e[o + 24 >> 2] = t,0 | (a = 0 | _e[(i = 16 + c | 0) >> 2]) && (_e[o + 16 >> 2] = a,_e[a + 24 >> 2] = o),0 | (i = 0 | _e[i + 4 >> 2]) && (_e[o + 20 >> 2] = i,_e[i + 24 >> 2] = o);
}
}while(0);return i = 1 & l,f >>> 0 < 16 ? (_e[s >> 2] = n | i | 2,_e[(s = e + n + 4 | 0) >> 2] = 1 | _e[s >> 2]) : (l = e + r | 0,_e[s >> 2] = i | r | 2,_e[l + 4 >> 2] = 3 | f,_e[(s = l + f + 4 | 0) >> 2] = 1 | _e[s >> 2],x(l,f)),0 | e;
}(e + -8 | 0,r >>> 0 < 11 ? 16 : r + 11 & -8)))return 0 | (r = t + 8 | 0);return(t = 0 | I(r)) ? (n = 0 | _e[e + -4 >> 2],K(0 | t,0 | e,0 | ((n = (-8 & n) - (0 == (3 & n | 0) ? 8 : 4) | 0) >>> 0 < r >>> 0 ? n : r)),F(e),0 | (r = t)) : (r = 0) | r;
}(e,r))) ? e : r : r = 0,t && (i = 0 | pe(e),_e[t >> 2] = i);
}else r = 0 | I(r),t && (e = r ? 0 | pe(r) : 0,_e[t >> 2] = e);
}while(0);return 0 | r;
}function fe(e,r,t){
t |= 0;var n;if(0 < (r |= 0) >>> 0 | 0 == (0 | r) & 4294967295 < (e |= 0) >>> 0){
for(;n = 0 | he(0 | e,0 | r,10,0),ce[(t = t + -1 | 0) >> 0] = 255 & n | 48,e = 0 | Fe(0 | (n = e),0 | r,10,0),9 < r >>> 0 | 9 == (0 | r) & 4294967295 < n >>> 0;)r = L;r = e;
}else r = e;if(r)for(;ce[(t = t + -1 | 0) >> 0] = (r >>> 0) % 10 | 48,!(r >>> 0 < 10);)r = (r >>> 0) / 10 | 0;return 0 | t;
}function le(e,r,t,n){
e |= 0,t |= 0,n |= 0;var i = 0 | _e[(e = (r |= 0) + 16 | 0) >> 2],a = r + 36 | 0,o = r + 24 | 0;do{
if(i){
if((0 | i) != (0 | t)){
_e[a >> 2] = 1 + (0 | _e[a >> 2]),_e[o >> 2] = 2,ce[r + 54 >> 0] = 1;break;
}2 == (0 | _e[o >> 2]) && (_e[o >> 2] = n);
}else _e[e >> 2] = t,_e[o >> 2] = n,_e[a >> 2] = 1;
}while(0);
}function Me(e){
e |= 0;var r = 0,t = 0,n = 0 | _e[119];_e[76 + n >> 2];do{
if((0 | function(e,r){
r |= 0;var t = 0;return t = 0 | function(e){
var r = 0,t = 0,n = 0,n = e |= 0;e:do{
if(3 & n)for(r = n;;){
if(!(0 | ce[e >> 0])){
e = r;break e;
}if(!(3 & (r = e = e + 1 | 0))){
t = 4;break;
}
}else t = 4;
}while(0);if(4 == (0 | t)){
for(;!((-2139062144 & (r = 0 | _e[e >> 2]) ^ -2139062144) & r + -16843009);)e = e + 4 | 0;if((255 & r) << 24 >> 24)for(;e = e + 1 | 0,0 != (0 | ce[e >> 0]););
}return e - n | 0;
}(e = e | 0),((0 | function(e,r,t,n){
e |= 0,n |= 0;var i = 0;i = 0 | ie(t |= 0,r |= 0),t = 0 == (0 | r) ? 0 : t,e = (_e[n + 76 >> 2],0 | ee(e,i,n));(0 | e) != (0 | i) && (t = (e >>> 0) / (r >>> 0) | 0);return 0 | t;
}(e,1,t,r)) != (0 | t)) << 31 >> 31 | 0;
}(e,n)) < 0)e = 1;else{
if(10 != (0 | ce[75 + n >> 0]) && (t = 0 | _e[(r = 20 + n | 0) >> 2]) >>> 0 < (0 | _e[16 + n >> 2]) >>> 0){
_e[r >> 2] = t + 1,ce[t >> 0] = 10,e = 0;break;
}e = (0 | oe(n,10)) < 0;
}
}while(0);return e << 31 >> 31 | 0;
}function se(e,r,t,n,i){
e |= 0,r |= 0;var a,o = Te;if(Te = Te + 256 | 0,a = o,(0 | (n |= 0)) < (0 | (t |= 0)) & 0 == (73728 & (i |= 0) | 0)){
if(ne(0 | a,0 | r,0 | ((i = t - n | 0) >>> 0 < 256 ? i : 256)),255 < i >>> 0){
for(r = t - n | 0;Ie(e,a,256),i = i + -256 | 0,255 < i >>> 0;);i = 255 & r;
}Ie(e,a,i);
}Te = o;
}function be(e){
var r = 0,t = 0 | ce[(r = (e |= 0) + 74 | 0) >> 0];return ce[r >> 0] = 255 + t | t,0 | (e = 8 & (r = 0 | _e[e >> 2]) ? (_e[e >> 2] = 32 | r,-1) : (_e[e + 8 >> 2] = 0,t = (_e[e + 4 >> 2] = 0) | _e[e + 44 >> 2],_e[e + 28 >> 2] = t,_e[e + 20 >> 2] = t,_e[e + 16 >> 2] = t + (0 | _e[e + 48 >> 2]),0));
}function me(e){
var r = 0,t = 0;return 0 < (0 | (t = (e |= 0) + 15 & -16 | 0)) & (0 | (e = (r = 0 | _e[_ >> 2]) + t | 0)) < (0 | r) | (0 | e) < 0 ? (b(),h(12),-1) : (0 | (_e[_ >> 2] = e)) > (0 | M()) && 0 == (0 | A()) ? (_e[_ >> 2] = r,h(12),-1) : 0 | r;
}function Se(e){
var r = 0,t = 0,n = 0,t = 0 | _e[(e |= 0) >> 2];if((n = (0 | ce[t >> 0]) - 48 | 0) >>> 0 < 10)for(r = 0;r = n + (10 * r | 0) | 0,t = t + 1 | 0,_e[e >> 2] = t,n = (0 | ce[t >> 0]) - 48 | 0,n >>> 0 < 10;);else r = 0;return 0 | r;
}function Pe(e){
var r = 0;return(0 | (r = 0 | ce[d + (255 & (e |= 0)) >> 0])) < 8 ? 0 | r : (0 | (r = 0 | ce[d + (e >> 8 & 255) >> 0])) < 8 ? r + 8 | 0 : (0 | (r = 0 | ce[d + (e >> 16 & 255) >> 0])) < 8 ? r + 16 | 0 : 24 + (0 | ce[d + (e >>> 24) >> 0]) | 0;
}function Re(e,r,t,n){
t |= 0,n |= 0;var i = 0;(0 | _e[(r |= 0) + 4 >> 2]) == (0 | t) && 1 != (0 | _e[(i = r + 28 | 0) >> 2]) && (_e[i >> 2] = n);
}function he(e,r,t,n){
var i,a = Te;return Te = Te + 16 | 0,B(e |= 0,r |= 0,t |= 0,n |= 0,i = 0 | a),Te = a,0 | (L = 0 | _e[4 + i >> 2],0 | _e[i >> 2]);
}function pe(e){
var r;return(e |= 0) ? 0 | (1 == (0 | (e = 3 & (r = 0 | _e[e + -4 >> 2]))) ? 0 : (-8 & r) - (0 == (0 | e) ? 8 : 4) | 0) : 0;
}function Ce(e,r,t){
e |= 0,r |= 0,t |= 0;var n = 0,i = Te;return Te = Te + 16 | 0,_e[(n = i) >> 2] = t,t = 0 | (e = e,r = r,n = n,0 | function(e,r,t,n){
e |= 0,r |= 0,t |= 0,n |= 0;var i,a = 0,o = 0,u = 0,f = 0,l = 0,s = Te;for(Te = Te + 128 | 0,a = s + 124 | 0,l = s,o = l,u = 604,i = o + 124 | 0;_e[o >> 2] = _e[u >> 2],o = o + 4 | 0,u = u + 4 | 0,(0 | o) < (0 | i););return 2147483646 < (r + -1 | 0) >>> 0 ? r ? (_e[(r = 296) >> 2] = 75,r = -1) : (e = a,r = 1,f = 4) : f = 4,4 == (0 | f) && (f = (f = -2 - e | 0) >>> 0 < r >>> 0 ? f : r,_e[l + 48 >> 2] = f,_e[(a = l + 20 | 0) >> 2] = e,r = (_e[l + 44 >> 2] = e) + f | 0,_e[(e = l + 16 | 0) >> 2] = r,_e[l + 28 >> 2] = r,r = 0 | j(l,t,n),f && (l = 0 | _e[a >> 2],ce[l + (((0 | l) == (0 | _e[e >> 2])) << 31 >> 31) >> 0] = 0)),Te = s,0 | r;
}(e |= 0,2147483647,r |= 0,n |= 0)),Te = i,0 | t;
}function Ne(e,r,t){
return e |= 0,r |= 0,(0 | (t |= 0)) < 32 ? (L = r << t | (e & (1 << t) - 1 << 32 - t) >>> 32 - t,e << t) : (L = e << t - 32,0);
}function ye(e,r,t){
return e |= 0,r |= 0,(0 | (t |= 0)) < 32 ? (L = r >>> t,e >>> t | (r & (1 << t) - 1) << 32 - t) : r >>> t - 32 | (L = 0);
}function Oe(e,r){
e |= 0,r |= 0;var t = Te;Te = Te + 16 | 0,_e[t >> 2] = r,j(r = 0 | _e[26],e,t),function(e,r){
var t = 0,n = 0,i = 0,a = 0,o = 255 & (e |= 0),t = 255 & e;_e[(r |= 0) + 76 >> 2],a = 3;do{
if(3 == (0 | a)){
if((0 | t) != (0 | ce[r + 75 >> 0]) && (i = 0 | _e[(n = r + 20 | 0) >> 2]) >>> 0 < (0 | _e[r + 16 >> 2]) >>> 0){
_e[n >> 2] = i + 1,ce[i >> 0] = o;break;
}t = 0 | oe(r,e);
}
}while(0);
}(10,r),p();
}function ve(e,r,t,n){
return 0 | (L = n = (r |= 0) - (n |= 0) - ((e |= 0) >>> 0 < (t |= 0) >>> 0 | 0) >>> 0,e - t >>> 0 | 0);
}function ke(e){
e = +e;var r;return k[g >> 3] = e,r = 0 | _e[g >> 2],L = 0 | _e[g + 4 >> 2],0 | r;
}function ge(e,r,t,n){
return 0 | (L = (r |= 0) + (n |= 0) + ((t = (e |= 0) + (t |= 0) >>> 0) >>> 0 < e >>> 0 | 0) >>> 0,0 | t);
}function Le(e){
return 4294963200 < (e |= 0) >>> 0 && (_e[74] = 0 - e,e = -1),0 | e;
}function Ie(e,r,t){
r |= 0,t |= 0,32 & _e[(e |= 0) >> 2] || ee(r,t,e);
}function De(e,r){
return r |= 0,0 | (e = (e |= 0) ? 0 | function(e,r){
e |= 0,r |= 0;do{
if(e){
if(r >>> 0 < 128){
ce[e >> 0] = r,e = 1;break;
}if(!(0 | _e[_e[420 >> 2] >> 2])){
if(57216 == (-128 & r | 0)){
ce[e >> 0] = r,e = 1;break;
}_e[(e = 296) >> 2] = 84,e = -1;break;
}if(r >>> 0 < 2048){
ce[e >> 0] = r >>> 6 | 192,ce[e + 1 >> 0] = 63 & r | 128,e = 2;break;
}if(r >>> 0 < 55296 | 57344 == (-8192 & r | 0)){
ce[e >> 0] = r >>> 12 | 224,ce[e + 1 >> 0] = r >>> 6 & 63 | 128,ce[e + 2 >> 0] = 63 & r | 128,e = 3;break;
}if((r + -65536 | 0) >>> 0 < 1048576){
ce[e >> 0] = r >>> 18 | 240,ce[e + 1 >> 0] = r >>> 12 & 63 | 128,ce[e + 2 >> 0] = r >>> 6 & 63 | 128,ce[e + 3 >> 0] = 63 & r | 128,e = 4;break;
}_e[(e = 296) >> 2] = 84,e = -1;break;
}
}while(e = 1,0);return 0 | e;
}(e,r) : 0);
}function we(e,r){
return(0 | (e |= 0)) == (0 | (r |= 0)) | 0;
}function Ge(e,r){
var t = 0 | xe(0 | (e |= 0));return 0 | (0 == (0 | (r |= 0)) ? e : t);
}function Fe(e,r,t,n){
return 0 | B(e |= 0,r |= 0,t |= 0,n |= 0,0);
}function xe(e){
return(255 & (e |= 0)) << 24 | (e >> 8 & 255) << 16 | (e >> 16 & 255) << 8 | e >>> 24 | 0;
}function Be(e,r,t,n,i,a){
E(6);
}function Ue(e,r,t,n,i){
E(1);
}function He(e){
e = e |= 0,F(e |= 0);
}function We(e,r,t,n){
E(7);
}function Ve(e,r,t){
return E(0),0;
}function Xe(e){}function Ye(e){
E(2);
}function Ke(){
E(5);
}r.__ZSt18uncaught_exceptionv;var ze = [Ve,z,function(e,r,t){
e |= 0,r |= 0,t |= 0;var n,i,a = Te;return Te = Te + 32 | 0,n = (i = a) + 20 | 0,_e[i >> 2] = _e[e + 60 >> 2],_e[i + 4 >> 2] = 0,_e[i + 8 >> 2] = r,_e[i + 12 >> 2] = n,_e[i + 16 >> 2] = t,e = (0 | Le(0 | O(140,0 | i))) < 0 ? _e[n >> 2] = -1 : 0 | _e[n >> 2],Te = a,0 | e;
},function(e,r,t){
r |= 0,t |= 0;var n = 0,i = Te;return Te = Te + 32 | 0,n = i,_e[(e |= 0) + 36 >> 2] = 1,0 == (64 & _e[e >> 2] | 0) && (_e[n >> 2] = _e[e + 60 >> 2],_e[n + 4 >> 2] = 21523,_e[n + 8 >> 2] = i + 16,0 | S(54,0 | n)) && (ce[e + 75 >> 0] = -1),n = 0 | z(e,r,t),Te = i,0 | n;
},function(e,r,t){
r |= 0,t |= 0;var n = 0,i = 0;return K(0 | (i = 0 | _e[(n = (e |= 0) + 20 | 0) >> 2]),0 | r,0 | (e = t >>> 0 < (e = (0 | _e[e + 16 >> 2]) - i | 0) >>> 0 ? t : e)),_e[n >> 2] = (0 | _e[n >> 2]) + e,0 | t;
},function(e,r,t){
t |= 0;var n,i,a = 0,o = Te;if(Te = Te + 64 | 0,i = o,0 | we(e |= 0,r |= 0))r = 1;else if(0 != (0 | r) && 0 != (0 | (a = 0 | J(r,32,16,0)))){
for(r = i + 4 | 0,n = r + 52 | 0;r = r + 4 | (_e[r >> 2] = 0),(0 | r) < (0 | n););_e[i >> 2] = a,_e[i + 8 >> 2] = e,_e[i + 12 >> 2] = -1,_e[i + 48 >> 2] = 1,er[3 & _e[28 + (0 | _e[a >> 2]) >> 2]](a,i,0 | _e[t >> 2],1),r = 1 == (0 | _e[i + 24 >> 2]) ? (_e[t >> 2] = _e[i + 16 >> 2],1) : 0;
}else r = 0;return Te = o,0 | r;
},Ve,Ve],je = [Ue,function(e,r,t,n,i){
e |= 0,r |= 0,t |= 0,n |= 0;var a = 0;do{
if(0 | we(e,0 | _e[r + 8 >> 2]))Re(0,r,t,n);else if(0 | we(e,0 | _e[r >> 2])){
if(e = r + 32 | 0,(0 | _e[r + 16 >> 2]) != (0 | t) && (0 | _e[(a = r + 20 | 0) >> 2]) != (0 | t)){
_e[e >> 2] = n,_e[a >> 2] = t,_e[(n = r + 40 | 0) >> 2] = 1 + (0 | _e[n >> 2]),1 == (0 | _e[r + 36 >> 2]) && 2 == (0 | _e[r + 24 >> 2]) && (ce[r + 54 >> 0] = 1),_e[r + 44 >> 2] = 4;break;
}1 == (0 | n) && (_e[e >> 2] = 1);
}
}while(0);
},function(e,r,t,n,i){
e |= 0,r |= 0,t |= 0,n |= 0,i |= 0;var a,o = 0,u = 0,f = 0;do{
if(0 | we(e,0 | _e[r + 8 >> 2]))Re(0,r,t,n);else{
if(o = e + 8 | 0,!(0 | we(e,0 | _e[r >> 2]))){
f = 0 | _e[o >> 2],je[3 & _e[24 + (0 | _e[f >> 2]) >> 2]](f,r,t,n,i);break;
}if(e = r + 32 | 0,(0 | _e[r + 16 >> 2]) != (0 | t) && (0 | _e[(u = r + 20 | 0) >> 2]) != (0 | t)){
if(_e[e >> 2] = n,4 == (0 | _e[(n = r + 44 | 0) >> 2]))break;ce[(e = r + 52 | 0) >> 0] = 0,o = (ce[(a = r + 53 | 0) >> 0] = 0) | _e[o >> 2],Qe[3 & _e[20 + (0 | _e[o >> 2]) >> 2]](o,r,t,t,1,i),0 | ce[a >> 0] ? 0 | ce[e >> 0] ? e = 3 : (e = 3,f = 11) : (e = 4,f = 11),11 == (0 | f) && (_e[u >> 2] = t,_e[(a = r + 40 | 0) >> 2] = 1 + (0 | _e[a >> 2]),1 == (0 | _e[r + 36 >> 2]) && 2 == (0 | _e[r + 24 >> 2]) && (ce[r + 54 >> 0] = 1)),_e[n >> 2] = e;break;
}1 == (0 | n) && (_e[e >> 2] = 1);
}
}while(0);
},Ue],Je = [Ye,Xe,He,Xe,Xe,He,function(e){
var r = Te;Te = Te + 16 | 0,F(e |= 0),0 | P(0 | _e[1285],0) ? Oe(4406,r) : Te = r;
},Ye],$e = [function(e){
return E(3),0;
},function(e){
var r,t,n = Te;return Te = Te + 16 | 0,r = n,e = 0 | (t = 0 | _e[(e |= 0) + 60 >> 2],0 | (t |= 0)),_e[r >> 2] = e,e = 0 | Le(0 | R(6,0 | r)),Te = n,0 | e;
}],Ze = [function(e,r,t){
E(4);
}],qe = [Ke,function(){
var e,r,t,n,i = 0,a = 0,o = 0,u = Te;Te = Te + 48 | 0,n = u + 32 | 0,r = u + 24 | 0,o = u + 16 | 0,u = (t = u) + 36 | 0,0 | (i = 0 | function(){
var e = 0,r = 0;{if(Te = (e = Te) + 16 | 0,!(0 | C(5136,2)))return r = 0 | m(0 | _e[1285]),Te = e,0 | r;Oe(4307,e);}return 0;
}()) && 0 | (a = 0 | _e[i >> 2]) && (1126902528 == (-256 & (e = 0 | _e[(i = a + 48 | 0) >> 2]) | 0) & 1129074247 == (0 | (i = 0 | _e[i + 4 >> 2])) || (_e[r >> 2] = 4168,Oe(4118,r)),i = 1126902529 == (0 | e) & 1129074247 == (0 | i) ? 0 | _e[a + 44 >> 2] : a + 80 | 0,_e[u >> 2] = i,a = 0 | _e[a >> 2],i = 0 | _e[a + 4 >> 2],0 | ze[7 & _e[16 + (0 | _e[2]) >> 2]](8,a,u) ? (o = 0 | _e[u >> 2],o = 0 | $e[1 & _e[8 + (0 | _e[o >> 2]) >> 2]](o),_e[t >> 2] = 4168,_e[t + 4 >> 2] = i,_e[t + 8 >> 2] = o,Oe(4032,t)) : (_e[o >> 2] = 4168,_e[o + 4 >> 2] = i,Oe(4077,o))),Oe(4156,n);
},function(){
var e = Te;Te = Te + 16 | 0,0 | y(5140,6) ? Oe(4356,e) : Te = e;
},Ke],Qe = [Be,function(e,r,t,n,i,a){
t |= 0,n |= 0,i |= 0,0 | we(e |= 0,0 | _e[(r |= 0) + 8 >> 2]) && ae(0,r,t,n,i);
},function(e,r,t,n,i,a){
t |= 0,n |= 0,i |= 0,a |= 0,0 | we(e |= 0,0 | _e[(r |= 0) + 8 >> 2]) ? ae(0,r,t,n,i) : (e = 0 | _e[e + 8 >> 2],Qe[3 & _e[20 + (0 | _e[e >> 2]) >> 2]](e,r,t,n,i,a));
},Be],er = [We,function(e,r,t,n){
t |= 0,n |= 0,0 | we(e |= 0,0 | _e[(r |= 0) + 8 >> 2]) && le(0,r,t,n);
},function(e,r,t,n){
t |= 0,n |= 0,0 | we(e |= 0,0 | _e[(r |= 0) + 8 >> 2]) ? le(0,r,t,n) : (e = 0 | _e[e + 8 >> 2],er[3 & _e[28 + (0 | _e[e >> 2]) >> 2]](e,r,t,n));
},We];return{stackSave: function(){
return 0 | Te;
},_i64Subtract: ve,_crn_get_bytes_per_block: function(e,r){
e |= 0,r |= 0;var t,n,i = 0,a = Te;switch(Te = Te + 576 | 0,n = a + 40 | 0,t = a + 56 | 0,_e[(i = a) >> 2] = 40,q(e,r,i),e = 0 | _e[(r = i + 32 | 0) + 4 >> 2],0 | _e[r >> 2]){
case 0:if(!e)return Te = a,0 | (i = 8);e = 14;break;case 1:case 2:case 3:case 4:case 5:case 6:case 7:case 8:e = e ? 14 : 13;break;case 9:case 10:if(!e)return Te = a,0 | (i = 8);e = 14;break;default:e = 14;
}return 13 == (0 | e) ? (Te = a,0 | (i = 16)) : 14 == (0 | e) ? (_e[n >> 2] = 866,_e[4 + n >> 2] = 2672,_e[8 + n >> 2] = 1251,Ce(t,812,n),Me(t),Te = a,(i = 0) | i) : 0;
},setThrew: function(e,r){},dynCall_viii: function(e,r,t,n){
r |= 0,t |= 0,n |= 0,Ze[0 & (e |= 0)](0 | r,0 | t,0 | n);
},_bitshift64Lshr: ye,_bitshift64Shl: Ne,dynCall_viiii: function(e,r,t,n,i){
r |= 0,t |= 0,n |= 0,i |= 0,er[3 & (e |= 0)](0 | r,0 | t,0 | n,0 | i);
},setTempRet0: function(e){
L = e |= 0;
},_crn_decompress: function(e,r,t,n,i,a){
e |= 0,r |= 0,t |= 0,n |= 0,i |= 0,a |= 0;var o,u,f,l = 0,s = 0,c = 0,_ = 0,d = 0,E = Te;switch(Te = Te + 592 | 0,f = E + 56 | 0,c = E + 40 | 0,o = E + 72 | 0,u = (d = E) + 68 | 0,_e[d >> 2] = 40,q(e,r,d),l = (0 | _e[d + 4 >> 2]) >>> i,s = (0 | _e[d + 8 >> 2]) >>> i,n = 0 | _e[(d = d + 32 | 0) + 4 >> 2],0 | _e[d >> 2]){
case 0:n ? _ = 14 : d = 8;break;case 1:case 2:case 3:case 4:case 5:case 6:case 7:case 8:_ = n ? 14 : 13;break;case 9:case 10:n ? _ = 14 : d = 8;break;default:_ = 14;
}13 == (0 | _) ? d = 16 : 14 == (0 | _) && (_e[c >> 2] = 866,_e[c + 4 >> 2] = 2672,_e[c + 8 >> 2] = 1251,Ce(o,812,c),Me(o),d = 0),_e[u >> 2] = t,_ = 0 | function(e,r){
var t = 0,n = 0,i = 0,a = 0,o = 0,u = 0,f = 0,l = 0,s = 0,c = 0,_ = 0,d = 0;if(Te = (_ = Te) + 528 | 0,u = (s = _) + 16 | 0,0 == (0 | (e |= 0)) | (r |= 0) >>> 0 < 62)return Te = _,(d = 0) | d;if(!(f = 0 | te(300,0)))return Te = _,(d = 0) | d;_e[f >> 2] = 519686845,_e[4 + f >> 2] = 0,_e[8 + f >> 2] = 0,l = 88 + f | 0,t = 136 + f | 0,n = 160 + f | 0,i = 184 + f | 0,a = 208 + f | 0,o = 232 + f | 0,_e[(c = 252 + f | 0) >> 2] = 0,_e[c + 4 >> 2] = 0,_e[c + 8 >> 2] = 0,ce[c + 12 >> 0] = 0,_e[(c = 268 + f | 0) >> 2] = 0,_e[c + 4 >> 2] = 0,_e[c + 8 >> 2] = 0,ce[c + 12 >> 0] = 0,_e[(c = 284 + f | 0) >> 2] = 0,_e[c + 4 >> 2] = 0,_e[c + 8 >> 2] = 0,ce[c + 12 >> 0] = 0,d = 44 + (c = l) | 0;for(;_e[c >> 2] = 0,c = c + 4 | 0,(0 | c) < (0 | d););if(ce[44 + l >> 0] = 0,_e[t >> 2] = 0,_e[4 + t >> 2] = 0,_e[8 + t >> 2] = 0,_e[12 + t >> 2] = 0,_e[16 + t >> 2] = 0,ce[20 + t >> 0] = 0,_e[n >> 2] = 0,_e[4 + n >> 2] = 0,_e[8 + n >> 2] = 0,_e[12 + n >> 2] = 0,_e[16 + n >> 2] = 0,ce[20 + n >> 0] = 0,_e[i >> 2] = 0,_e[4 + i >> 2] = 0,_e[8 + i >> 2] = 0,_e[12 + i >> 2] = 0,_e[16 + i >> 2] = 0,ce[20 + i >> 0] = 0,_e[a >> 2] = 0,_e[4 + a >> 2] = 0,_e[8 + a >> 2] = 0,_e[12 + a >> 2] = 0,_e[16 + a >> 2] = 0,ce[20 + a >> 0] = 0,_e[o >> 2] = 0,_e[4 + o >> 2] = 0,_e[8 + o >> 2] = 0,_e[12 + o >> 2] = 0,ce[16 + o >> 0] = 0,0 | function(e,r,t){
e |= 0;var n = 0,i = 0;if(!(0 == (0 | (r |= 0)) | (t |= 0) >>> 0 < 74 || 18552 != ((0 | de[r >> 0]) << 8 | 0 | de[r + 1 >> 0] | 0)) && 74 <= ((0 | de[r + 2 >> 0]) << 8 | 0 | de[r + 3 >> 0]) >>> 0 && ((0 | de[r + 7 >> 0]) << 16 | (0 | de[r + 6 >> 0]) << 24 | (0 | de[r + 8 >> 0]) << 8 | 0 | de[r + 9 >> 0]) >>> 0 <= t >>> 0){
if(_e[(n = e + 88 | 0) >> 2] = r,_e[e + 4 >> 2] = r,_e[e + 8 >> 2] = t,!(0 | function(e){
var r = 0,t = 0,n = 0,i = 0;if(i = 92 + (e |= 0) | 0,t = 0 | _e[(n = e + 88 | 0) >> 2],r = (0 | _e[e + 4 >> 2]) + ((0 | de[68 + t >> 0]) << 8 | (0 | de[67 + t >> 0]) << 16 | 0 | de[69 + t >> 0]) | 0,!(t = (0 | de[65 + t >> 0]) << 8 | 0 | de[66 + t >> 0]))return(i = 0) | i;if(_e[i >> 2] = r,_e[e + 96 >> 2] = r,_e[e + 104 >> 2] = t,_e[e + 100 >> 2] = r + t,_e[e + 108 >> 2] = 0,_e[e + 112 >> 2] = 0,!(0 | V(i,e + 116 | 0)))return(i = 0) | i;r = 0 | _e[n >> 2];do{
if((0 | de[r + 39 >> 0]) << 8 | 0 | de[r + 40 >> 0]){
if(!(0 | V(i,e + 140 | 0)))return(i = 0) | i;if(0 | V(i,e + 188 | 0)){
r = 0 | _e[n >> 2];break;
}return(i = 0) | i;
}if(!((0 | de[r + 55 >> 0]) << 8 | 0 | de[r + 56 >> 0]))return(i = 0) | i;
}while(0);if((0 | de[r + 55 >> 0]) << 8 | 0 | de[r + 56 >> 0] | 0){
if(!(0 | V(i,e + 164 | 0)))return(i = 0) | i;if(!(0 | V(i,e + 212 | 0)))return(i = 0) | i;
}return 0 | (i = 1);
}(e)))return(i = 0) | i;if(r = 0 | _e[n >> 2],(0 | de[r + 39 >> 0]) << 8 | 0 | de[r + 40 >> 0] ? 0 | function(e){
var r = 0,t = 0,n = 0,i = 0,a = 0,o = 0,u = 0,f = 0,l = 0,s = 0,c = 0,_ = 0,d = 0;if(Te = (d = Te) + 576 | 0,i = (o = d) + 64 | 0,_ = d + 16 | 0,r = 0 | _e[(n = 88 + (e |= 0) | 0) >> 2],c = (0 | de[r + 39 >> 0]) << 8 | 0 | de[r + 40 >> 0],l = e + 236 | 0,(0 | (t = 0 | _e[(a = e + 240 | 0) >> 2])) != (0 | c)){
if(t >>> 0 <= c >>> 0){
do{
if((0 | _e[e + 244 >> 2]) >>> 0 < c >>> 0){
if(0 | X(l,c,(t + 1 | 0) == (0 | c),4,0)){
r = 0 | _e[a >> 2];break;
}return ce[e + 248 >> 0] = 1,Te = d,(_ = 0) | _;
}
}while(r = t,0);ne((0 | _e[l >> 2]) + (r << 2) | 0,0,c - r << 2 | 0),r = 0 | _e[n >> 2];
}_e[a >> 2] = c;
}if(s = e + 92 | 0,t = (0 | _e[e + 4 >> 2]) + ((0 | de[r + 34 >> 0]) << 8 | (0 | de[r + 33 >> 0]) << 16 | 0 | de[r + 35 >> 0]) | 0,!(r = (0 | de[r + 37 >> 0]) << 8 | (0 | de[r + 36 >> 0]) << 16 | 0 | de[r + 38 >> 0]))return Te = d,(_ = 0) | _;if(_e[s >> 2] = t,_e[e + 96 >> 2] = t,_e[e + 104 >> 2] = r,_e[e + 100 >> 2] = t + r,_e[e + 108 >> 2] = 0,_e[e + 112 >> 2] = 0,u = _ + 20 | 0,_e[_ >> 2] = 0,_e[_ + 4 >> 2] = 0,_e[_ + 8 >> 2] = 0,_e[_ + 12 >> 2] = 0,ce[_ + 16 >> 0] = 0,f = _ + 24 | 0,_e[_ + 44 >> 2] = 0,_e[u >> 2] = 0,_e[u + 4 >> 2] = 0,_e[u + 8 >> 2] = 0,_e[u + 12 >> 2] = 0,_e[u + 16 >> 2] = 0,ce[u + 20 >> 0] = 0,0 | V(s,_) && 0 | V(s,f))if(0 | _e[a >> 2] || (_e[o >> 2] = 866,_e[o + 4 >> 2] = 910,_e[o + 8 >> 2] = 1497,Ce(i,812,o),Me(i)),c)for(t = (u = o = 0) | _e[l >> 2],a = i = r = e = n = 0;;){
if(o = (0 | Ae(s,_)) + o & 31,a = (0 | Ae(s,f)) + a & 63,i = (0 | Ae(s,_)) + i & 31,r = (0 | Ae(s,_)) + r | 0,e = (0 | Ae(s,f)) + e & 63,n = (0 | Ae(s,_)) + n & 31,_e[t >> 2] = a << 5 | o << 11 | i | r << 27 | e << 21 | n << 16,c >>> 0 <= (u = u + 1 | 0) >>> 0){
r = 1;break;
}t = t + 4 | 0,r &= 31;
}else r = 1;else r = 0;return re(_ + 24 | 0),re(_),Te = d,0 | (_ = r);
}(e) && 0 | function(e){
var r,t,n,i,a,o,u,f,l,s,c,_,d,E,T,A,M,b,m,S,P,R,h,p,C,N,y,O,v,k = 0,g = 0,L = 0,I = 0,D = 0,w = 0,G = 0,F = 0,x = 0,B = Te;if(Te = Te + 1008 | 0,D = (w = B) + 496 | 0,F = B + 472 | 0,E = B + 276 | 0,T = B + 80 | 0,A = B + 16 | 0,g = 0 | _e[(e |= 0) + 88 >> 2],_ = (0 | de[g + 47 >> 0]) << 8 | 0 | de[g + 48 >> 0],d = e + 92 | 0,k = (0 | _e[e + 4 >> 2]) + ((0 | de[g + 42 >> 0]) << 8 | (0 | de[g + 41 >> 0]) << 16 | 0 | de[g + 43 >> 0]) | 0,!(g = (0 | de[g + 45 >> 0]) << 8 | (0 | de[g + 44 >> 0]) << 16 | 0 | de[g + 46 >> 0]))return Te = B,(F = 0) | F;if(_e[d >> 2] = k,_e[e + 96 >> 2] = k,_e[e + 104 >> 2] = g,_e[e + 100 >> 2] = k + g,_e[e + 108 >> 2] = 0,_e[e + 112 >> 2] = 0,_e[F + 20 >> 2] = 0,_e[F >> 2] = 0,_e[F + 4 >> 2] = 0,_e[F + 8 >> 2] = 0,_e[F + 12 >> 2] = 0,(ce[F + 16 >> 0] = 0) | V(d,F)){
for(k = 0,L = g = -3;_e[E + (k << 2) >> 2] = L,_e[T + (k << 2) >> 2] = g,I = 2 < (0 | L),49 != (0 | (k = k + 1 | 0));)g = (1 & I) + g | 0,L = I ? -3 : L + 1 | 0;for(k = A,g = k + 64 | 0;k = k + 4 | (_e[k >> 2] = 0),(0 | k) < (0 | g););L = e + 252 | 0,k = 0 | _e[(g = e + 256 | 0) >> 2];e:do{
if((0 | k) == (0 | _))G = 13;else{
if(k >>> 0 <= _ >>> 0){
do{
if((0 | _e[e + 260 >> 2]) >>> 0 < _ >>> 0){
if(0 | X(L,_,(k + 1 | 0) == (0 | _),4,0)){
k = 0 | _e[g >> 2];break;
}ce[e + 264 >> 0] = 1,k = 0;break e;
}
}while(0);ne((0 | _e[L >> 2]) + (k << 2) | 0,0,_ - k << 2 | 0);
}_e[g >> 2] = _,G = 13;
}
}while(0);do{
if(13 == (0 | G)){
if(!_){
_e[w >> 2] = 866,_e[w + 4 >> 2] = 910,_e[w + 8 >> 2] = 1497,Ce(D,812,w),Me(D),k = 1;break;
}for(e = 4 + A | 0,D = 8 + A | 0,w = 12 + A | 0,G = 16 + A | 0,r = 20 + A | 0,t = 24 + A | 0,n = 28 + A | 0,i = 32 + A | 0,a = 36 + A | 0,o = 40 + A | 0,u = 44 + A | 0,f = 48 + A | 0,l = 52 + A | 0,s = 56 + A | 0,c = 60 + A | 0,k = (I = 0) | _e[L >> 2],g = 0 | _e[e >> 2],L = 0 | _e[A >> 2];v = 0 | Ae(d,F),L = L + (0 | _e[E + (v << 2) >> 2]) & 3,g = g + (0 | _e[T + (v << 2) >> 2]) & 3,v = 0 | Ae(d,F),x = (0 | _e[D >> 2]) + (0 | _e[E + (v << 2) >> 2]) & 3,_e[D >> 2] = x,v = (0 | _e[w >> 2]) + (0 | _e[T + (v << 2) >> 2]) & 3,_e[w >> 2] = v,y = 0 | Ae(d,F),O = (0 | _e[G >> 2]) + (0 | _e[E + (y << 2) >> 2]) & 3,_e[G >> 2] = O,y = (0 | _e[r >> 2]) + (0 | _e[T + (y << 2) >> 2]) & 3,_e[r >> 2] = y,C = 0 | Ae(d,F),N = (0 | _e[t >> 2]) + (0 | _e[E + (C << 2) >> 2]) & 3,_e[t >> 2] = N,C = (0 | _e[n >> 2]) + (0 | _e[T + (C << 2) >> 2]) & 3,_e[n >> 2] = C,h = 0 | Ae(d,F),p = (0 | _e[i >> 2]) + (0 | _e[E + (h << 2) >> 2]) & 3,_e[i >> 2] = p,h = (0 | _e[a >> 2]) + (0 | _e[T + (h << 2) >> 2]) & 3,_e[a >> 2] = h,P = 0 | Ae(d,F),R = (0 | _e[o >> 2]) + (0 | _e[E + (P << 2) >> 2]) & 3,_e[o >> 2] = R,P = (0 | _e[u >> 2]) + (0 | _e[T + (P << 2) >> 2]) & 3,_e[u >> 2] = P,m = 0 | Ae(d,F),S = (0 | _e[f >> 2]) + (0 | _e[E + (m << 2) >> 2]) & 3,_e[f >> 2] = S,m = (0 | _e[l >> 2]) + (0 | _e[T + (m << 2) >> 2]) & 3,_e[l >> 2] = m,M = 0 | Ae(d,F),b = (0 | _e[s >> 2]) + (0 | _e[E + (M << 2) >> 2]) & 3,_e[s >> 2] = b,M = (0 | _e[c >> 2]) + (0 | _e[T + (M << 2) >> 2]) & 3,_e[c >> 2] = M,_e[k >> 2] = (0 | de[1441 + g >> 0]) << 2 | 0 | de[1441 + L >> 0] | (0 | de[1441 + x >> 0]) << 4 | (0 | de[1441 + v >> 0]) << 6 | (0 | de[1441 + O >> 0]) << 8 | (0 | de[1441 + y >> 0]) << 10 | (0 | de[1441 + N >> 0]) << 12 | (0 | de[1441 + C >> 0]) << 14 | (0 | de[1441 + p >> 0]) << 16 | (0 | de[1441 + h >> 0]) << 18 | (0 | de[1441 + R >> 0]) << 20 | (0 | de[1441 + P >> 0]) << 22 | (0 | de[1441 + S >> 0]) << 24 | (0 | de[1441 + m >> 0]) << 26 | (0 | de[1441 + b >> 0]) << 28 | (0 | de[1441 + M >> 0]) << 30,!(_ >>> 0 <= (I = I + 1 | 0) >>> 0);)k = k + 4 | 0;_e[A >> 2] = L,_e[e >> 2] = g,k = 1;
}
}while(0);
}else k = 0;return re(F),Te = B,0 | (x = k);
}(e) && (r = 0 | _e[n >> 2],i = 11) : i = 11,11 == (0 | i)){
if(!((0 | de[r + 55 >> 0]) << 8 | 0 | de[r + 56 >> 0]))return 0 | (i = 1);if(0 | function(e){
var r = 0,t = 0,n = 0,i = 0,a = 0,o = 0,u = 0,f = 0,l = 0;if(Te = (l = Te) + 560 | 0,n = (i = l) + 40 | 0,f = l + 16 | 0,t = 0 | _e[88 + (e |= 0) >> 2],o = (0 | de[t + 55 >> 0]) << 8 | 0 | de[t + 56 >> 0],u = e + 92 | 0,r = (0 | _e[e + 4 >> 2]) + ((0 | de[t + 50 >> 0]) << 8 | (0 | de[t + 49 >> 0]) << 16 | 0 | de[t + 51 >> 0]) | 0,!(t = (0 | de[t + 53 >> 0]) << 8 | (0 | de[t + 52 >> 0]) << 16 | 0 | de[t + 54 >> 0]))return Te = l,(f = 0) | f;_e[u >> 2] = r,_e[e + 96 >> 2] = r,_e[e + 104 >> 2] = t,_e[e + 100 >> 2] = r + t,_e[e + 108 >> 2] = 0,_e[e + 112 >> 2] = 0,_e[f + 20 >> 2] = 0,_e[f >> 2] = 0,_e[f + 4 >> 2] = 0,_e[f + 8 >> 2] = 0,_e[f + 12 >> 2] = 0,ce[f + 16 >> 0] = 0;e:do{
if(0 | V(u,f)){
if(a = e + 268 | 0,(0 | (r = 0 | _e[(t = e + 272 | 0) >> 2])) != (0 | o)){
if(r >>> 0 <= o >>> 0){
do{
if((0 | _e[e + 276 >> 2]) >>> 0 < o >>> 0){
if(0 | X(a,o,(r + 1 | 0) == (0 | o),2,0)){
r = 0 | _e[t >> 2];break;
}ce[e + 280 >> 0] = 1,r = 0;break e;
}
}while(0);ne((0 | _e[a >> 2]) + (r << 1) | 0,0,o - r << 1 | 0);
}_e[t >> 2] = o;
}if(!o){
_e[i >> 2] = 866,_e[i + 4 >> 2] = 910,_e[i + 8 >> 2] = 1497,Ce(n,812,i),Me(n),r = 1;break;
}for(r = (n = e = t = 0) | _e[a >> 2];;){
if(a = 0 | Ae(u,f),n = a + n & 255,e = (0 | Ae(u,f)) + e & 255,W[r >> 1] = e << 8 | n,o >>> 0 <= (t = t + 1 | 0) >>> 0){
r = 1;break;
}r = r + 2 | 0;
}
}else r = 0;
}while(0);return re(f),Te = l,0 | (f = r);
}(e) && 0 | function(e){
var r,t,n,i,a,o,u,f,l,s,c,_,d,E,T,A,M,b,m,S,P,R = 0,h = 0,p = 0,C = 0,N = 0,y = 0,O = 0,v = 0,k = 0,g = 0,L = 0,I = 0,D = 0,w = 0,G = 0,F = 0,x = 0,B = 0,U = 0,H = Te;if(Te = Te + 2416 | 0,N = (y = H) + 1904 | 0,B = H + 1880 | 0,b = H + 980 | 0,m = H + 80 | 0,S = H + 16 | 0,h = 0 | _e[(e |= 0) + 88 >> 2],A = (0 | de[h + 63 >> 0]) << 8 | 0 | de[h + 64 >> 0],M = e + 92 | 0,R = (0 | _e[e + 4 >> 2]) + ((0 | de[h + 58 >> 0]) << 8 | (0 | de[h + 57 >> 0]) << 16 | 0 | de[h + 59 >> 0]) | 0,!(h = (0 | de[h + 61 >> 0]) << 8 | (0 | de[h + 60 >> 0]) << 16 | 0 | de[h + 62 >> 0]))return Te = H,(B = 0) | B;if(_e[M >> 2] = R,_e[e + 96 >> 2] = R,_e[e + 104 >> 2] = h,_e[e + 100 >> 2] = R + h,_e[e + 108 >> 2] = 0,_e[e + 112 >> 2] = 0,_e[B + 20 >> 2] = 0,_e[B >> 2] = 0,_e[B + 4 >> 2] = 0,_e[B + 8 >> 2] = 0,_e[B + 12 >> 2] = 0,(ce[B + 16 >> 0] = 0) | V(M,B)){
for(R = 0,p = h = -7;_e[b + (R << 2) >> 2] = p,_e[m + (R << 2) >> 2] = h,C = 6 < (0 | p),225 != (0 | (R = R + 1 | 0));)h = (1 & C) + h | 0,p = C ? -7 : p + 1 | 0;for(R = S,h = R + 64 | 0;R = R + 4 | (_e[R >> 2] = 0),(0 | R) < (0 | h););C = e + 284 | 0,h = 3 * A | 0,R = 0 | _e[(p = e + 288 | 0) >> 2];e:do{
if((0 | R) == (0 | h))O = 13;else{
if(R >>> 0 <= h >>> 0){
do{
if((0 | _e[e + 292 >> 2]) >>> 0 < h >>> 0){
if(0 | X(C,h,(R + 1 | 0) == (0 | h),2,0)){
R = 0 | _e[p >> 2];break;
}ce[e + 296 >> 0] = 1,R = 0;break e;
}
}while(0);ne((0 | _e[C >> 2]) + (R << 1) | 0,0,h - R << 1 | 0);
}_e[p >> 2] = h,O = 13;
}
}while(0);do{
if(13 == (0 | O)){
if(!A){
_e[y >> 2] = 866,_e[y + 4 >> 2] = 910,_e[y + 8 >> 2] = 1497,Ce(N,812,y),Me(N),R = 1;break;
}for(r = 4 + S | 0,t = 8 + S | 0,n = 12 + S | 0,i = 16 + S | 0,a = 20 + S | 0,o = 24 + S | 0,u = 28 + S | 0,f = 32 + S | 0,l = 36 + S | 0,s = 40 + S | 0,c = 44 + S | 0,_ = 48 + S | 0,d = 52 + S | 0,E = 56 + S | 0,T = 60 + S | 0,R = (x = 0) | _e[C >> 2],h = 0 | _e[S >> 2],p = 0 | _e[r >> 2],C = 0 | _e[t >> 2],e = 0 | _e[n >> 2],N = 0 | _e[i >> 2],y = 0 | _e[a >> 2],O = 0 | _e[o >> 2],v = 0 | _e[u >> 2],k = 0 | _e[f >> 2],g = 0 | _e[l >> 2],L = 0 | _e[s >> 2],I = 0 | _e[c >> 2],F = G = w = D = 0;U = 0 | Ae(M,B),h = h + (0 | _e[b + (U << 2) >> 2]) & 7,p = p + (0 | _e[m + (U << 2) >> 2]) & 7,U = 0 | Ae(M,B),C = C + (0 | _e[b + (U << 2) >> 2]) & 7,e = e + (0 | _e[m + (U << 2) >> 2]) & 7,U = 0 | Ae(M,B),N = N + (0 | _e[b + (U << 2) >> 2]) & 7,y = y + (0 | _e[m + (U << 2) >> 2]) & 7,U = 0 | Ae(M,B),O = O + (0 | _e[b + (U << 2) >> 2]) & 7,v = v + (0 | _e[m + (U << 2) >> 2]) & 7,U = 0 | Ae(M,B),k = k + (0 | _e[b + (U << 2) >> 2]) & 7,g = g + (0 | _e[m + (U << 2) >> 2]) & 7,U = 0 | Ae(M,B),L = L + (0 | _e[b + (U << 2) >> 2]) & 7,I = I + (0 | _e[m + (U << 2) >> 2]) & 7,U = 0 | Ae(M,B),D = D + (0 | _e[b + (U << 2) >> 2]) & 7,w = w + (0 | _e[m + (U << 2) >> 2]) & 7,U = 0 | Ae(M,B),G = G + (0 | _e[b + (U << 2) >> 2]) & 7,F = F + (0 | _e[m + (U << 2) >> 2]) & 7,U = 0 | de[1445 + y >> 0],W[R >> 1] = (0 | de[1445 + p >> 0]) << 3 | 0 | de[1445 + h >> 0] | (0 | de[1445 + C >> 0]) << 6 | (0 | de[1445 + e >> 0]) << 9 | (0 | de[1445 + N >> 0]) << 12 | U << 15,P = 0 | de[1445 + L >> 0],W[R + 2 >> 1] = (0 | de[1445 + O >> 0]) << 2 | U >>> 1 | (0 | de[1445 + v >> 0]) << 5 | (0 | de[1445 + k >> 0]) << 8 | (0 | de[1445 + g >> 0]) << 11 | P << 14,W[R + 4 >> 1] = (0 | de[1445 + I >> 0]) << 1 | P >>> 2 | (0 | de[1445 + D >> 0]) << 4 | (0 | de[1445 + w >> 0]) << 7 | (0 | de[1445 + G >> 0]) << 10 | (0 | de[1445 + F >> 0]) << 13,!(A >>> 0 <= (x = x + 1 | 0) >>> 0);)R = R + 6 | 0;_e[S >> 2] = h,_e[r >> 2] = p,_e[t >> 2] = C,_e[n >> 2] = e,_e[i >> 2] = N,_e[a >> 2] = y,_e[o >> 2] = O,_e[u >> 2] = v,_e[f >> 2] = k,_e[l >> 2] = g,_e[s >> 2] = L,_e[c >> 2] = I,_e[_ >> 2] = D,_e[d >> 2] = w,_e[E >> 2] = G,_e[T >> 2] = F,R = 1;
}
}while(0);
}else R = 0;return re(B),Te = H,0 | (U = R);
}(e))return 0 | (i = 1);
}return(i = 0) | i;
}return _e[e + 88 >> 2] = 0,(i = 0) | i;
}(f,e,r))return Te = _,0 | (d = f);return U(f),Te = (7 & f ? (_e[s >> 2] = 866,_e[s + 4 >> 2] = 2506,_e[s + 8 >> 2] = 1232,Ce(u,812,s),Me(u)) : ue(f,0,0,1,0),_),(d = 0) | d;
}(e,r),r = a + i | 0;do{
if(i >>> 0 < r >>> 0){
if(!_){
for(n = t;n = n + (0 | ie(0 | ie((l + 3 | 0) >>> 2,d),(s + 3 | 0) >>> 2)) | 0,(0 | (i = i + 1 | 0)) != (0 | r);)s >>>= 1,l >>>= 1;_e[u >> 2] = n;break;
}for(e = s,n = t;s = 0 | ie((l + 3 | 0) >>> 2,d),15 < i >>> 0 | (c = 0 | ie(s,(e + 3 | 0) >>> 2)) >>> 0 < 8 || 519686845 != (0 | _e[_ >> 2]) || (function(e,r,t,n,i){
r |= 0,t |= 0,n |= 0,i |= 0;var a = 0,o = 0,u = 0,f = 0,l = 0,s = 0;Te = (s = Te) + 528 | 0,f = (l = s) + 16 | 0,o = 0 | _e[88 + (e |= 0) >> 2],u = (0 | de[70 + o + (i << 2) + 1 >> 0]) << 16 | (0 | de[70 + o + (i << 2) >> 0]) << 24 | (0 | de[70 + o + (i << 2) + 2 >> 0]) << 8 | 0 | de[70 + o + (i << 2) + 3 >> 0],a = (a = i + 1 | 0) >>> 0 < (0 | de[16 + o >> 0]) >>> 0 ? (0 | de[70 + o + (a << 2) + 1 >> 0]) << 16 | (0 | de[70 + o + (a << 2) >> 0]) << 24 | (0 | de[70 + o + (a << 2) + 2 >> 0]) << 8 | 0 | de[70 + o + (a << 2) + 3 >> 0] : 0 | _e[e + 8 >> 2];if(u >>> 0 < a >>> 0)return f = 0 | _e[(f = e + 4 | 0) >> 2],l = 0 | Y(e,f = f + u | 0,l = a - u | 0,r,t,n,i),Te = s;_e[l >> 2] = 866,_e[l + 4 >> 2] = 3694,_e[l + 8 >> 2] = 1508,Ce(f,812,l),Me(f),f = 0 | _e[(f = e + 4 | 0) >> 2],l = 0 | Y(e,f = f + u | 0,l = a - u | 0,r,t,n,i),Te = s;
}(_,u,c,s,i),n = 0 | _e[u >> 2]),n = n + c | 0,_e[u >> 2] = n,(0 | (i = i + 1 | 0)) != (0 | r);)e >>>= 1,l >>>= 1;
}
}while(0);Te = (_ && 519686845 == (0 | _e[_ >> 2]) && (U(_),7 & _ ? (_e[f >> 2] = 866,_e[4 + f >> 2] = 2506,_e[8 + f >> 2] = 1232,Ce(o,812,f),Me(o)) : ue(_,0,0,1,0)),E);
},_memset: ne,_sbrk: me,_memcpy: K,stackAlloc: function(e){
var r = Te;return Te = (Te = Te + (e |= 0) | 0) + 15 & -16,0 | r;
},_crn_get_height: function(e,r){
e |= 0,r |= 0;var t,n = Te;return Te = Te + 48 | 0,_e[(t = n) >> 2] = 40,q(e,r,t),Te = n,0 | _e[t + 8 >> 2];
},dynCall_vi: function(e,r){
r |= 0,Je[7 & (e |= 0)](0 | r);
},getTempRet0: function(){
return 0 | L;
},_crn_get_levels: function(e,r){
e |= 0,r |= 0;var t,n = Te;return Te = Te + 48 | 0,_e[(t = n) >> 2] = 40,q(e,r,t),Te = n,0 | _e[t + 12 >> 2];
},_crn_get_uncompressed_size: function(e,r,t){
e |= 0,r |= 0,t |= 0;var n,i,a,o,u = 0,f = Te;switch(Te = Te + 576 | 0,a = f + 40 | 0,i = f + 56 | 0,_e[(o = f) >> 2] = 40,q(e,r,o),n = (3 + ((0 | _e[o + 4 >> 2]) >>> t) | 0) >>> 2,r = (3 + ((0 | _e[o + 8 >> 2]) >>> t) | 0) >>> 2,e = 0 | _e[(t = o + 32 | 0) + 4 >> 2],0 | _e[t >> 2]){
case 0:e ? u = 14 : e = 8;break;case 1:case 2:case 3:case 4:case 5:case 6:case 7:case 8:u = e ? 14 : 13;break;case 9:case 10:e ? u = 14 : e = 8;break;default:u = 14;
}return 13 == (0 | u) ? e = 16 : 14 == (0 | u) && (_e[a >> 2] = 866,_e[4 + a >> 2] = 2672,_e[8 + a >> 2] = 1251,Ce(i,812,a),Me(i),e = 0),o = 0 | ie(0 | ie(r,n),e),Te = f,0 | o;
},_i64Add: ge,dynCall_iiii: function(e,r,t,n){
return r |= 0,t |= 0,n |= 0,0 | ze[7 & (e |= 0)](0 | r,0 | t,0 | n);
},_emscripten_get_global_libc: function(){
return 5072;
},dynCall_ii: function(e,r){
return r |= 0,0 | $e[1 & (e |= 0)](0 | r);
},___udivdi3: Fe,_llvm_bswap_i32: xe,dynCall_viiiii: function(e,r,t,n,i,a){
r |= 0,t |= 0,n |= 0,i |= 0,a |= 0,je[3 & (e |= 0)](0 | r,0 | t,0 | n,0 | i,0 | a);
},___cxa_can_catch: function(e,r,t){
e |= 0,r |= 0,t |= 0;var n,i = Te;return Te = Te + 16 | 0,_e[(n = i) >> 2] = _e[t >> 2],(e = 0 | ze[7 & _e[16 + (0 | _e[e >> 2]) >> 2]](e,r,n)) && (_e[t >> 2] = _e[n >> 2]),Te = i,1 & e | 0;
},_free: F,runPostSets: function(){},dynCall_viiiiii: function(e,r,t,n,i,a,o){
r |= 0,t |= 0,n |= 0,i |= 0,a |= 0,o |= 0,Qe[3 & (e |= 0)](0 | r,0 | t,0 | n,0 | i,0 | a,0 | o);
},establishStackSpace: function(e,r){
Te = e |= 0;
},___uremdi3: he,___cxa_is_pointer_type: function(e){
return 1 & (e = (e |= 0) ? 0 != (0 | J(e,32,88,0)) : 0) | 0;
},stackRestore: function(e){
Te = e |= 0;
},_malloc: I,_emscripten_replace_memory: function(e){
return!(16777215 & c(e) || c(e) <= 16777215 || 2147483648 < c(e)) && (ce = new n(e),W = new i(e),_e = new a(e),de = new o(e),Ee = new u(e),new f(e),new l(e),k = new s(e),!0);
},dynCall_v: function(e){
qe[3 & (e |= 0)]();
},_crn_get_width: function(e,r){
e |= 0,r |= 0;var t,n = Te;return Te = Te + 48 | 0,_e[(t = n) >> 2] = 40,q(e,r,t),Te = n,0 | _e[t + 4 >> 2];
},_crn_get_dxt_format: function(e,r){
e |= 0,r |= 0;var t,n = Te;return Te = Te + 48 | 0,_e[(t = n) >> 2] = 40,q(e,r,t),Te = n,0 | _e[t + 32 >> 2];
}};
}(Module.asmGlobalArg,Module.asmLibraryArg,buffer);Module.stackSave = asm.stackSave,Module.getTempRet0 = asm.getTempRet0,Module._memset = asm._memset,Module.setThrew = asm.setThrew,Module._bitshift64Lshr = asm._bitshift64Lshr,Module._bitshift64Shl = asm._bitshift64Shl,Module.setTempRet0 = asm.setTempRet0,Module._crn_decompress = asm._crn_decompress,Module._crn_get_bytes_per_block = asm._crn_get_bytes_per_block,Module._sbrk = asm._sbrk,Module._memcpy = asm._memcpy,Module.stackAlloc = asm.stackAlloc,Module._crn_get_height = asm._crn_get_height,Module._i64Subtract = asm._i64Subtract,Module._crn_get_levels = asm._crn_get_levels,Module._crn_get_uncompressed_size = asm._crn_get_uncompressed_size,Module._i64Add = asm._i64Add,Module._emscripten_get_global_libc = asm._emscripten_get_global_libc,Module.___udivdi3 = asm.___udivdi3,Module._llvm_bswap_i32 = asm._llvm_bswap_i32,Module.___cxa_can_catch = asm.___cxa_can_catch;var _free = Module._free = asm._free;Module.runPostSets = asm.runPostSets,Module.establishStackSpace = asm.establishStackSpace,Module.___uremdi3 = asm.___uremdi3,Module.___cxa_is_pointer_type = asm.___cxa_is_pointer_type,Module.stackRestore = asm.stackRestore;var _malloc = Module._malloc = asm._malloc,_emscripten_replace_memory = Module._emscripten_replace_memory = asm._emscripten_replace_memory,initialStackTop;function ExitStatus(e){
this.name = "ExitStatus",this.message = "Program terminated with exit(" + e + ")",this.status = e;
}function run(e){
function r(){
Module.calledRun || (Module.calledRun = !0,ABORT || (ensureInitRuntime(),preMain(),Module.onRuntimeInitialized && Module.onRuntimeInitialized(),Module._main && shouldRunNow && Module.callMain(e),postRun()));
}e = e || Module.arguments,0 < runDependencies || (preRun(),0 < runDependencies || Module.calledRun || (Module.setStatus ? (Module.setStatus("Running..."),setTimeout(function(){
setTimeout(function(){
Module.setStatus("");
},1),r();
},1)) : r()));
}function exit(e,r){
r && Module.noExitRuntime || (Module.noExitRuntime || (ABORT = !0,STACKTOP = initialStackTop,exitRuntime(),Module.onExit && Module.onExit(e)),ENVIRONMENT_IS_NODE && process.exit(e),Module.quit(e,new ExitStatus(e)));
}Module._crn_get_width = asm._crn_get_width,Module._crn_get_dxt_format = asm._crn_get_dxt_format,Module.dynCall_iiii = asm.dynCall_iiii,Module.dynCall_viiiii = asm.dynCall_viiiii,Module.dynCall_vi = asm.dynCall_vi,Module.dynCall_ii = asm.dynCall_ii,Module.dynCall_viii = asm.dynCall_viii,Module.dynCall_v = asm.dynCall_v,Module.dynCall_viiiiii = asm.dynCall_viiiiii,Module.dynCall_viiii = asm.dynCall_viiii,Runtime.stackAlloc = Module.stackAlloc,Runtime.stackSave = Module.stackSave,Runtime.stackRestore = Module.stackRestore,Runtime.establishStackSpace = Module.establishStackSpace,Runtime.setTempRet0 = Module.setTempRet0,Runtime.getTempRet0 = Module.getTempRet0,Module.asm = asm,ExitStatus.prototype = new Error,ExitStatus.prototype.constructor = ExitStatus,dependenciesFulfilled = function e(){
Module.calledRun || run(),Module.calledRun || (dependenciesFulfilled = e);
},Module.callMain = Module.callMain = function(e){
e = e || [],ensureInitRuntime();var r = e.length + 1;function t(){
for(var e = 0;e < 3;e++)n.push(0);
}var n = [allocate(intArrayFromString(Module.thisProgram),"i8",ALLOC_NORMAL)];t();for(var i = 0;i < r - 1;i += 1)n.push(allocate(intArrayFromString(e[i]),"i8",ALLOC_NORMAL)),t();n.push(0),n = allocate(n,"i32",ALLOC_NORMAL);try{
exit(Module._main(r,n,0),!0);
}catch(e){
if(e instanceof ExitStatus)return;if("SimulateInfiniteLoop" == e)return void(Module.noExitRuntime = !0);var a = e;e && "object" == typeof e && e.stack && (a = [e,e.stack]),Module.printErr("exception thrown: " + a),Module.quit(1,e);
}
},Module.run = Module.run = run,Module.exit = Module.exit = exit;var abortDecorators = [];function abort(r){
Module.onAbort && Module.onAbort(r),r = void 0 !== r ? (Module.print(r),Module.printErr(r),JSON.stringify(r)) : "",ABORT = !0;var t = "abort(" + r + ") at " + stackTrace() + "\nIf this abort() is unexpected, build with -s ASSERTIONS=1 which can give more information.";throw abortDecorators && abortDecorators.forEach(function(e){
t = e(t,r);
}),t;
}if(Module.abort = Module.abort = abort,Module.preInit)for("function" == typeof Module.preInit && (Module.preInit = [Module.preInit]);0 < Module.preInit.length;)Module.preInit.pop()();var shouldRunNow = !0;Module.noInitialRun && (shouldRunNow = !1),Module.noExitRuntime = !0,run();var crunch = Module,CRN_FORMAT = {cCRNFmtInvalid: -1,cCRNFmtDXT1: 0,cCRNFmtDXT3: 1,cCRNFmtDXT5: 2},DXT_FORMAT_MAP = {},dst,dxtData;DXT_FORMAT_MAP[CRN_FORMAT.cCRNFmtDXT1] = PixelFormat$1.RGB_DXT1,DXT_FORMAT_MAP[CRN_FORMAT.cCRNFmtDXT3] = PixelFormat$1.RGBA_DXT3,DXT_FORMAT_MAP[CRN_FORMAT.cCRNFmtDXT5] = PixelFormat$1.RGBA_DXT5;var cachedDstSize = 0;function arrayBufferCopy(e,r,t,n){
for(var i = t / 4,a = n % 4,o = new Uint32Array(e.buffer,0,(n - a) / 4),u = new Uint32Array(r.buffer),f = 0;f < o.length;f++)u[i + f] = o[f];for(f = n - a;f < n;f++)r[t + f] = e[f];
}function transcodeCRNToDXT(e,r){
var t = e.byteLength,n = new Uint8Array(e),e = crunch._malloc(t);arrayBufferCopy(n,crunch.HEAPU8,e,t);var n = crunch._crn_get_dxt_format(e,t),i = DXT_FORMAT_MAP[n];if(!when.defined(i))throw new RuntimeError.RuntimeError("Unsupported compressed format.");for(var a = crunch._crn_get_levels(e,t),o = crunch._crn_get_width(e,t),u = crunch._crn_get_height(e,t),f = 0,l = 0;l < a;++l)f += PixelFormat$1.compressedTextureSizeInBytes(i,o >> l,u >> l);cachedDstSize < f && (when.defined(dst) && crunch._free(dst),dst = crunch._malloc(f),dxtData = new Uint8Array(crunch.HEAPU8.buffer,dst,f),cachedDstSize = f),crunch._crn_decompress(e,t,dst,f,0,a),crunch._free(e);t = PixelFormat$1.compressedTextureSizeInBytes(i,o,u),e = dxtData.subarray(0,t),t = new Uint8Array(t);return t.set(e,0),r.push(t.buffer),new CompressedTextureBuffer(i,o,u,t);
}var transcodeCRNToDXT$1 = createTaskProcessorWorker(transcodeCRNToDXT);return transcodeCRNToDXT$1;
});

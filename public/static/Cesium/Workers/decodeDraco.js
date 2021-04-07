define(["./ComponentDatatype-9204e9f6","./when-208fe5b0","./IndexDatatype-d47ad6f6","./RuntimeError-7f634f5d","./createTaskProcessorWorker","./Check-d18af7c4","./WebGLConstants-76bb35d1","./Math-4e53b694"],function(d,c,f,y,t,e,r,n){
"use strict";var A;function b(e,t,r){
var n,o = e.num_points(),a = r.num_components(),i = new A.AttributeQuantizationTransform;if(i.InitFromAttribute(r)){
for(var u = new Array(a),s = 0;s < a;++s)u[s] = i.min_value(s);n = {quantizationBits: i.quantization_bits(),minValues: u,range: i.range(),octEncoded: !1};
}A.destroy(i),(i = new A.AttributeOctahedronTransform).InitFromAttribute(r) && (n = {quantizationBits: i.quantization_bits(),octEncoded: !0}),A.destroy(i);o *= a,t = c.defined(n) ? function(e,t,r,n,o){
var a,i;n.quantizationBits <= 8 ? (i = new A.DracoUInt8Array,a = new Uint8Array(o),t.GetAttributeUInt8ForAllPoints(e,r,i)) : (i = new A.DracoUInt16Array,a = new Uint16Array(o),t.GetAttributeUInt16ForAllPoints(e,r,i));for(var u = 0;u < o;++u)a[u] = i.GetValue(u);return A.destroy(i),a;
}(e,t,r,n,o) : function(e,t,r,n){
var o,a;switch(r.data_type()){
case 1:case 11:a = new A.DracoInt8Array,o = new Int8Array(n),t.GetAttributeInt8ForAllPoints(e,r,a);break;case 2:a = new A.DracoUInt8Array,o = new Uint8Array(n),t.GetAttributeUInt8ForAllPoints(e,r,a);break;case 3:a = new A.DracoInt16Array,o = new Int16Array(n),t.GetAttributeInt16ForAllPoints(e,r,a);break;case 4:a = new A.DracoUInt16Array,o = new Uint16Array(n),t.GetAttributeUInt16ForAllPoints(e,r,a);break;case 5:case 7:a = new A.DracoInt32Array,o = new Int32Array(n),t.GetAttributeInt32ForAllPoints(e,r,a);break;case 6:case 8:a = new A.DracoUInt32Array,o = new Uint32Array(n),t.GetAttributeUInt32ForAllPoints(e,r,a);break;case 9:case 10:a = new A.DracoFloat32Array,o = new Float32Array(n),t.GetAttributeFloatForAllPoints(e,r,a);
}for(var i = 0;i < n;++i)o[i] = a.GetValue(i);return A.destroy(a),o;
}(e,t,r,o),o = d.ComponentDatatype.fromTypedArray(t);return{array: t,data: {componentsPerAttribute: a,componentDatatype: o,byteOffset: r.byte_offset(),byteStride: d.ComponentDatatype.getSizeInBytes(o) * a,normalized: r.normalized(),quantization: n}};
}function o(e){
var t = new A.Decoder,r = ["POSITION","NORMAL","COLOR","TEX_COORD"];if(e.dequantizeInShader)for(var n = 0;n < r.length;++n)t.SkipAttributeTransform(A[r[n]]);var o = e.bufferView,a = new A.DecoderBuffer;if(a.Init(e.array,o.byteLength),t.GetEncodedGeometryType(a) !== A.TRIANGULAR_MESH)throw new y.RuntimeError("Unsupported draco mesh geometry type.");var i = new A.Mesh,o = t.DecodeBufferToMesh(a,i);if(!o.ok() || 0 === i.ptr)throw new y.RuntimeError("Error decoding draco mesh geometry: " + o.error_msg());A.destroy(a);var u,s,d = {},c = e.compressedAttributes;for(u in c)c.hasOwnProperty(u) && (s = c[u],s = t.GetAttributeByUniqueId(i,s),d[u] = b(i,t,s));e = {indexArray: function(e,t){
for(var r = e.num_points(),n = e.num_faces(),o = new A.DracoInt32Array,a = 3 * n,i = f.IndexDatatype.createTypedArray(r,a),u = 0,s = 0;s < n;++s)t.GetFaceFromMesh(e,s,o),i[u + 0] = o.GetValue(0),i[u + 1] = o.GetValue(1),i[u + 2] = o.GetValue(2),u += 3;return A.destroy(o),{typedArray: i,numberOfIndices: a};
}(i,t),attributeData: d};return A.destroy(i),A.destroy(t),e;
}function a(e){
return(c.defined(e.primitive) ? o : function(e){
var t = new A.Decoder;e.dequantizeInShader && (t.SkipAttributeTransform(A.POSITION),t.SkipAttributeTransform(A.NORMAL));var r = new A.DecoderBuffer;if(r.Init(e.buffer,e.buffer.length),t.GetEncodedGeometryType(r) !== A.POINT_CLOUD)throw new y.RuntimeError("Draco geometry type must be POINT_CLOUD.");var n = new A.PointCloud,o = t.DecodeBufferToPointCloud(r,n);if(!o.ok() || 0 === n.ptr)throw new y.RuntimeError("Error decoding draco point cloud: " + o.error_msg());A.destroy(r);var a,i,u = {},s = e.properties;for(a in s)s.hasOwnProperty(a) && (i = s[a],i = t.GetAttributeByUniqueId(n,i),u[a] = b(n,t,i));return A.destroy(n),A.destroy(t),u;
})(e);
}function i(e){
A = e,self.onmessage = t(a),self.postMessage(!0);
}return function(e){
var t = e.data.webAssemblyConfig;if(c.defined(t))return require([t.modulePath],function(e){
c.defined(t.wasmBinaryFile) ? (e = !c.defined(e) ? self.DracoDecoderModule : e)(t).then(function(e){
i(e);
}) : i(e());
});
};
});

define(["exports","./when-208fe5b0","./Check-d18af7c4","./Transforms-a73b3b3b"],function(e,t,i,a){
"use strict";e.GeometryInstance = function(e){
e = t.defaultValue(e,t.defaultValue.EMPTY_OBJECT),this.geometry = e.geometry,this.modelMatrix = a.Matrix4.clone(t.defaultValue(e.modelMatrix,a.Matrix4.IDENTITY)),this.id = e.id,this.pickPrimitive = e.pickPrimitive,this.attributes = t.defaultValue(e.attributes,{}),this.westHemisphereGeometry = void 0,this.eastHemisphereGeometry = void 0;
};
});

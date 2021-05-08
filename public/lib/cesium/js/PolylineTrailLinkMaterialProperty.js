function PolylineTrailLinkMaterialProperty(color, duration,image) {
    this._definitionChanged = new Cesium.Event();
    this._color = undefined;
    this._image = undefined;
    this._colorSubscription = undefined;
    this.color = color;
    this._image = image;
    this.duration = duration || 3000;
    this._time = (new Date()).getTime();
    this.isTranslucent = function () {
        return true;
    }
}
//1.69版本使用这个，感谢LEARNER GEX
Object.defineProperties(PolylineTrailLinkMaterialProperty.prototype, {
// Cesium.defineProperties(PolylineTrailLinkMaterialProperty.prototype, {
    isConstant: {
        get: function () {
            return false;
        }
    },
    definitionChanged: {
        get: function () {
            return this._definitionChanged;
        }
    },
    color: Cesium.createPropertyDescriptor('color'),
    image: Cesium.createPropertyDescriptor('image')
});
PolylineTrailLinkMaterialProperty.prototype.getType = function (time) {
    return 'PolylineTrailLink';
}
PolylineTrailLinkMaterialProperty.prototype.getValue = function (time, result) {
    if (!Cesium.defined(result)) {
        result = {};
    }
    result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.WHITE, result.color);
    // result.image = this._image?this._image:Cesium.Material.PolylineTrailLinkImage;
    result.image = Cesium.Property.getValueOrUndefined(this._image, time);
    result.time = (((new Date()).getTime() - this._time) % this.duration) / this.duration;
    return result;
}
PolylineTrailLinkMaterialProperty.prototype.equals = function (other) {
    return this === other ||
        (other instanceof PolylineTrailLinkMaterialProperty &&
            Cesium.Property.equals(this._color, other._color))
}
Cesium.PolylineTrailLinkMaterialProperty = PolylineTrailLinkMaterialProperty;
Cesium.Material.PolylineTrailLinkType = 'PolylineTrailLink';
Cesium.Material.PolylineTrailLinkImage = "../texture/nanshan-road1.png";
Cesium.Material.PolylineTrailLinkSource = "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
                                                {\n\
                                                    czm_material material = czm_getDefaultMaterial(materialInput);\n\
                                                    vec2 st = materialInput.st;\n\
                                                    vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));\n\
                                                    material.alpha = colorImage.a * color.a;\n\
                                                    material.diffuse = (colorImage.rgb+color.rgb)/2.0;\n\
                                                    return material;\n\
                                                }";


                                               
Cesium.Material._materialCache.addMaterial(Cesium.Material.PolylineTrailLinkType, {
    fabric: {
        type: Cesium.Material.PolylineTrailLinkType,
        uniforms: {
            color: new Cesium.Color(0.0, 0.0, 1.0, 0.5),
            image: Cesium.Material.PolylineTrailLinkImage,
            time: 20
        },
        source: Cesium.Material.PolylineTrailLinkSource
    },
    translucent: function (material) {
        return true;
    }
});
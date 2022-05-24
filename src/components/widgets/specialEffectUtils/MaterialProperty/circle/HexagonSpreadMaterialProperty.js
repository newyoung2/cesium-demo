/**
 * 六边形扩散材质
 * @date:2022-01-12
 */
 function HexagonSpreadMaterialProperty(color) {
    this._definitionChanged = new Cesium.Event()
    this._color = undefined
    this._colorSubscription = undefined
    this.color = color
    this._time = new Date().getTime()
}
Object.defineProperties(HexagonSpreadMaterialProperty.prototype, {
    isConstant: {
        get: function() {
            return false
        },
    },
    definitionChanged: {
        get: function() {
            return this._definitionChanged
        },
    },
    color: Cesium.createPropertyDescriptor('color'),
})
HexagonSpreadMaterialProperty.prototype.getType = function(_time) {
    return Cesium.Material.HexagonSpreadMaterialType
}
HexagonSpreadMaterialProperty.prototype.getValue = function(
    time,
    result
) {
    if (!Cesium.defined(result)) {
        result = {}
    }
    result.color = Cesium.Property.getValueOrClonedDefault(
        this._color,
        time,
        Cesium.Color.WHITE,
        result.color
    )
    result.image = Cesium.Material.HexagonSpreadMaterialImage
    return result
}
HexagonSpreadMaterialProperty.prototype.equals = function(other) {
    const reData = (
        this === other ||
        (other instanceof HexagonSpreadMaterialProperty &&
            Cesium.Property.equals(this._color, other._color))
    )
    return reData
}
Cesium.HexagonSpreadMaterialProperty = HexagonSpreadMaterialProperty
Cesium.Material.HexagonSpreadMaterialType = 'HexagonSpreadMaterial'
Cesium.Material.HexagonSpreadMaterialImage = './../../data/pictures/hexagon.png'
Cesium.Material.HexagonSpreadSource = `
  czm_material czm_getMaterial(czm_materialInput materialInput)
  {
       czm_material material = czm_getDefaultMaterial(materialInput);
       vec2 st = materialInput.st;
       vec4 colorImage = texture2D(image,  vec2(st));
       material.alpha = colorImage.a * color.a * 0.5;
       material.diffuse =  1.8 * color.rgb  ;
       return material;
   }
   `
Cesium.Material._materialCache.addMaterial(
    Cesium.Material.HexagonSpreadMaterialType, {
        fabric: {
            type: Cesium.Material.HexagonSpreadMaterialType,
            uniforms: {
                color: new Cesium.Color(1, 0, 0, 0.5),
                image: Cesium.Material.HexagonSpreadMaterialImage,
            },
            source: Cesium.Material.HexagonSpreadSource,
        },
        translucent: function(material) {
            return true
        },
    }
)
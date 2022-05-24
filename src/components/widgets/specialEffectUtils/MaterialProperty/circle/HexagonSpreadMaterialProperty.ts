/**
 * 六边形扩散材质
 * @date:2022-01-12
 */
 import * as Cesium from 'cesium'
 import hexagon from '../../img/hexagon.png'
 let imgage = hexagon
 class HexagonSpreadMaterialProperty {
     constructor(options:any){
        this._definitionChanged = new Cesium.Event()
        this._color = undefined
        this._colorSubscription = undefined
        this.color = Cesium.Color.fromCssColorString(options.color);
        console.log('imgage',options)
        imgage = options?.image || hexagon
        this._time = new Date().getTime()
     }

     get isConstant() {
        return false;
    }


    get definitionChanged() {
        return this._definitionChanged;
    }


    getType(time) {
        return Cesium.Material.HexagonSpreadMaterialType;
    }


    getValue(time, result) {
        if (!Cesium.defined(result)) {
            result = {};
        }

        result.color = Cesium.Property.getValueOrClonedDefault(
            this._color,
            time,
            Cesium.Color.WHITE,
            result.color
        )

        result.image = imgage
        return result
    }


    equals(other) {
        const reData = (
            this === other ||
            (other instanceof HexagonSpreadMaterialProperty &&
                Cesium.Property.equals(this._color, other._color))
        )
        return reData
    }
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

Cesium.Material.HexagonSpreadMaterialType = 'HexagonSpreadMaterial'
Cesium.Material.HexagonSpreadMaterialImage = imgage
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

export default HexagonSpreadMaterialProperty
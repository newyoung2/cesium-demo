/**
 *  精灵穿梭路光效果，
 *  参考gitee开源
 *  entity的材质使用MaterialProperty,而primitive使用的是material。
 *  @Data：2022-01-11
 */
 import * as Cesium from 'cesium'
 import spriteline1 from '../../img/spriteline1.png'
class Spriteline1MaterialProperty{
    constructor(options?:any){
        this._definitionChanged = new Cesium.Event()
        this.duration = options?.duration || 1000
         this.image = options?.image ||spriteline1
       this._time = performance.now()
    }

    get isConstant() {
        return false;
    }


    get definitionChanged() {
        return this._definitionChanged;
    }


    getType(time) {
        return Cesium.Material.Spriteline1Type;
    }

    getValue(time, result) {
        if (!Cesium.defined(result)) {
            result = {}
        }
        result.image = this.image
        result.time =
            ((performance.now() - this._time) % this.duration) / this.duration
        return result
    }


    equals(other) {
        return (
            this === e ||
            (e instanceof Spriteline1MaterialProperty && this.duration === e.duration)
        )
    }

}

Object.defineProperties(Spriteline1MaterialProperty.prototype, {
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
    duration: Cesium.createPropertyDescriptor('duration')
})

// Cesium.Spriteline1MaterialProperty = Spriteline1MaterialProperty
Cesium.Material.Spriteline1Type = 'Spriteline1'
Cesium.Material.Spriteline1Source = `
czm_material czm_getMaterial(czm_materialInput materialInput)
{
czm_material material = czm_getDefaultMaterial(materialInput);
vec2 st = materialInput.st;
vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));
material.alpha = colorImage.a;
material.diffuse = colorImage.rgb * 1.5 ;
return material;
}
`
    // st :二维纹理坐标
    // czm_material：保存可用于照明的材质信息
Cesium.Material._materialCache.addMaterial(Cesium.Material.Spriteline1Type, {
    fabric: {
        type: Cesium.Material.Spriteline1Type,
        uniforms: {
            color: new Cesium.Color(1, 0, 0, 0.5),
            image: '',
            transparent: true,
            time: 20,
        },
        source: Cesium.Material.Spriteline1Source,
    },
    translucent: function(material) {
        return true
    },
})

export default Spriteline1MaterialProperty

//流动墙材质
import colors from '../../img/wenlu1.webp'
import * as Cesium from 'cesium'
class TrailLineMaterialProperty{
    constructor(options?:any){
        // 默认参数设置
    this._definitionChanged = new Cesium.Event();
    this._color = undefined;
    this._colorSubscription = undefined;
    this.color = options?.color? Cesium.Color.fromCssColorString(options.color) : Cesium.Color.WHITE;
    this.duration = options.duration || 18000;
    this._time = (new Date()).getTime();
    }

    get isConstant() {
        return false;
    }


    get definitionChanged() {
        return this._definitionChanged;
    }


    getType(time) {
        return Cesium.Material.TrailLineType;
    }

    getValue(time, result) {
        if (!Cesium.defined(result)) {
            result = {};
        }
        result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.WHITE, result.color);
    
        if (this.duration) {
            result.time = (((new Date()).getTime() - this._time) % this.duration) / this.duration;
        }
        viewer.scene.requestRender();
        return result;
    }


    equals(other) {
        return this === other ||
        (other instanceof TrailLineMaterialProperty &&
            Cesium.Property.equals(this._color, other._color))
    }
}

Object.defineProperties(TrailLineMaterialProperty.prototype, {
    isConstant: {
        get: function() {
            return false;
        }
    },
    definitionChanged: {
        get: function() {
            return this._definitionChanged;
        }
    },
    color: Cesium.createPropertyDescriptor('color')
});

// Cesium.TrailLineMaterialProperty = TrailLineMaterialProperty;
Cesium.Material.TrailLineType = 'TrailLine';
Cesium.Material.TrailLineImage = colors;
Cesium.Material.TrailLineSource = "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
{\n\
     czm_material material = czm_getDefaultMaterial(materialInput);\n\
     vec2 st = materialInput.st;\n\
     vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));\n\
     material.alpha = colorImage.a * color.a;\n\
     material.diffuse = (colorImage.rgb+color.rgb)/2.0;\n\
     return material;\n\
 }";
Cesium.Material._materialCache.addMaterial(Cesium.Material.TrailLineType, {
    fabric: {
        type: Cesium.Material.TrailLineType,
        uniforms: {
            color: new Cesium.Color(1.0, 1.0, 1.0, 1),
            image: Cesium.Material.TrailLineImage,
            time: 0
        },
        source: Cesium.Material.TrailLineSource
    },
    translucent: function(material) {
        return true;
    }
});

export default TrailLineMaterialProperty

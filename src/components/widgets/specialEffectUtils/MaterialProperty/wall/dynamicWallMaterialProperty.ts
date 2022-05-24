/**
 * @description:动态立体墙材质
 * @date: 2022-02-11
 */


//动态墙材质
import * as Cesium from 'cesium'
import colors from '../../img/spriteline1.png'
class DynamicWallMaterialProperty{
     constructor(options?:any){
        this._definitionChanged = new Cesium.Event();
        this._color = undefined;
        this._colorSubscription = undefined;
        this.color = options?.color? Cesium.Color.fromCssColorString(options.color) : Cesium.Color.RED;
        this.duration = options?.duration || 18000;
        this.trailImage = options?.trailImage || colors;
        this._time = (new Date()).getTime();
     }

     get isConstant() {
        return false;
    }


    get definitionChanged() {
        return this._definitionChanged;
    }


    getType(time) {
        return Cesium.Material.DynamicWallType;
    }


    getValue(time, result) {
        if (!Cesium.defined(result)) {
            result = {};
        }
        result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.WHITE, result.color);
        if (this.trailImage) {
            result.image = this.trailImage;
        } else {
            result.image = Cesium.Material.DynamicWallImage
        }
    
        if (this.duration) {
            result.time = (((new Date()).getTime() - this._time) % this.duration) / this.duration;
        }
        viewer.scene.requestRender();
        return result;
    }


    equals(other) {
        return this === other ||
        (other instanceof DynamicWallMaterialProperty &&
            Cesium.Property.equals(this._color, other._color))
    }
}

Object.defineProperties(DynamicWallMaterialProperty.prototype, {
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
Cesium.Material.DynamicWallType = 'DynamicWall';
Cesium.Material.DynamicWallImage = colors;
Cesium.Material.DynamicWallSource = "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
                                            {\n\
                                            czm_material material = czm_getDefaultMaterial(materialInput);\n\
                                            vec2 st = materialInput.st;\n\
                                            vec4 colorImage = texture2D(image, vec2(fract(st.t - time), st.t));\n\
                                            vec4 fragColor;\n\
                                            fragColor.rgb = color.rgb / 1.0;\n\
                                            fragColor = czm_gammaCorrect(fragColor);\n\
                                            material.alpha = colorImage.a * color.a;\n\
                                            material.diffuse = color.rgb;\n\
                                            material.emission = fragColor.rgb;\n\
                                            return material;\n\
                                            }";
Cesium.Material._materialCache.addMaterial(Cesium.Material.DynamicWallType, {
    fabric: {
        type: Cesium.Material.DynamicWallType,
        uniforms: {
            color: new Cesium.Color(1.0, 1.0, 1.0, 1),
            image: Cesium.Material.DynamicWallImage,
            time: 0
        },
        source: Cesium.Material.DynamicWallSource
    },
    translucent: function(material) {
        return true;
    }
});

export default DynamicWallMaterialProperty

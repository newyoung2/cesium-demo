
import CircleRippleMaterialProperty from '../specialEffectUtils/MaterialProperty/circle/circleRippleMaterialProperty'
import circleScanMaterialProperty from '../specialEffectUtils/MaterialProperty/circle/circleScanMaterialProperty'
import CircleDiffuseMaterialProperty from '../specialEffectUtils/MaterialProperty/circle/circleScanMaterialProperty'
import CircleFadeMaterialProperty from '../specialEffectUtils/MaterialProperty/circle/CircleFadeMaterialProperty'
import CircleBlurMaterialProperty from '../specialEffectUtils/MaterialProperty/circle/CircleBlurMaterialProperty'
import CircleColorfulMaterialProperty from '../specialEffectUtils/MaterialProperty/circle/CircleColorfulMaterialProperty'
import CircleSpiralMaterialProperty from '../specialEffectUtils/MaterialProperty/circle/CircleSpiralMaterialProperty'
import CirclePulseMaterialProperty from '../specialEffectUtils/MaterialProperty/circle/CirclePulseMaterialProperty'
import common from '../common'
/* 圆效果（参考开源代码） */

/* 绘制时传入的数据结构示例 */
const mockData = [{
    otherInfo: {
        name: '黔东南'  //label  显示的文字
    },
    /* 单个配置-----优先级高于全局配置 */
    option: {
        // image:t1,  //图片---如需不需要图片只显示颜色  把值设为null
        minRadius: 5000, //最小半径
        maxRadius: 50000, //最大半径
        step: 800,  //步长  控制扩散速度  
        color: 'white',  //颜色 支持rgba修改透明度
        showLabel: true,
    },
    position: [107.968185, 26.567005]
}, {
    otherInfo: {
        name: '铜仁'
    },
    option: {
        image: null,  //图片
        color: 'rgba(255,230,230,0.5)'  //颜色 支持rgba修改透明度
    },
    position: [109.195651, 27.704625]
}, {
    otherInfo: {
        name: '黔南'
    },
    option: {
        // image:t1,  //图片
        minRadius: 2000, //最小半径
        maxRadius: 30000, //最大半径
        step: 1000,  //步长  控制扩散速度
        color: 'yellow'  //颜色 支持rgba修改透明度
    },
    position: [107.560123, 26.193474]
}, {
    otherInfo: {
        name: '安顺'
    },
    position: [105.953657, 26.189369]
}, {
    otherInfo: {
        name: '黔西南'
    },
    position: [104.931939, 25.039942]
}, {
    otherInfo: {
        name: '六盘水'
    },
    position: [104.83584, 26.545852]
}, {
    otherInfo: {
        name: '毕节'
    },
    position: [105.28409, 27.242577]
}, {
    otherInfo: {
        name: '贵阳'
    },
    position: [106.650551, 26.609621]
}, {
    otherInfo: {
        name: '遵义'
    },
    position: [107.0678, 27.694908]
}]


class specialEffectCircle extends common {
    entityType: string = 'CircleRipple'
    entityTypeMaterial: any

    constructor(Cesium: any, viewer: any, option?: any) {


        if (!Cesium) throw new Error('请传入Cesium!!')
        if (!viewer) throw new Error('请传入viewer!!')

        let defaultOption = {
            radius: 30000,  //半径
            speed: 15, //速度
            color: 'red',  //颜色 支持rgba修改透明度
            count: 3,//波纹条数
            gradient: 0.2
        }
        defaultOption = Object.assign(defaultOption, option)
        let param = {
            option: defaultOption,
            dataSourceName: 'CircleRipple'
        }
        super(Cesium, viewer, param)
        option?.entityType? this.entityType = option.entityType : ''
    }

    startDraw(param: any = mockData) {
        this.draw(param)
    }

    drawEntity(param: any) {
        switch (this.entityType) {
            case 'CircleRipple':   //波纹效果
                this.entityTypeMaterial = new CircleRippleMaterialProperty(param.option)
                break;
            case 'CircleScan':  //扫描效果
                this.entityTypeMaterial = new circleScanMaterialProperty(param.option)
                break;
            case 'CircleFade':  //消隐效果
                this.entityTypeMaterial = new CircleFadeMaterialProperty(param.option)
                break;
            case 'CircleBlur':  //模糊效果
                this.entityTypeMaterial = new CircleBlurMaterialProperty(param.option)
                break;
            case 'CircleColor':  //多彩效果
                this.entityTypeMaterial = new CircleColorfulMaterialProperty(param.option)
                break;
            case 'CircleSpiral':  //螺旋效果
                this.entityTypeMaterial = new CircleSpiralMaterialProperty(param.option)
                break;
            case 'CirclePulse':  //脉冲效果
                this.entityTypeMaterial = new CirclePulseMaterialProperty(param.option)
                break;
            default:
                this.entityTypeMaterial = new CircleRippleMaterialProperty(param.option)
                break;
        }

        let ent = this.dataSource.entities.add({
            name: '圆',
            position: this.Cesium.Cartesian3.fromDegrees(param.position[0], param.position[1]),
            ellipse: {
                semiMajorAxis: param.option.radius,
                semiMinorAxis: param.option.radius,
                material: this.entityTypeMaterial
            }
        })

        return ent

    }

}

export default specialEffectCircle

import dynamicWallMaterialProperty from '../specialEffectUtils/MaterialProperty/wall/dynamicWallMaterialProperty'
import TrailLineMaterialProperty from '../specialEffectUtils/MaterialProperty/wall/TrailLineMaterialProperty'

import common from '../common'
/* 圆效果（参考开源代码） */

/* 绘制时传入的数据结构示例 */
const mockData = [{
    otherInfo: {
        name: '黔东南'  //label  显示的文字
    },
    /* 单个配置-----优先级高于全局配置 */
    option: {
    },
    position: [106.383264, 27.081627,107.411728, 26.870376,107.05914, 26.044289, 106.181221, 26.452442]
},
//  {
//     otherInfo: {
//         name: '铜仁'
//     },
//     option: {
//         image: null,  //图片
//         color: 'rgba(255,230,230,0.5)'  //颜色 支持rgba修改透明度
//     },
//     position: [109.195651, 27.704625]
// }, {
//     otherInfo: {
//         name: '黔南'
//     },
//     option: {
//         // image:t1,  //图片
//         minRadius: 2000, //最小半径
//         maxRadius: 30000, //最大半径
//         step: 1000,  //步长  控制扩散速度
//         color: 'yellow'  //颜色 支持rgba修改透明度
//     },
//     position: [107.560123, 26.193474]
// }, {
//     otherInfo: {
//         name: '安顺'
//     },
//     position: [105.953657, 26.189369]
// }, {
//     otherInfo: {
//         name: '黔西南'
//     },
//     position: [104.931939, 25.039942]
// }, {
//     otherInfo: {
//         name: '六盘水'
//     },
//     position: [104.83584, 26.545852]
// }, {
//     otherInfo: {
//         name: '毕节'
//     },
//     position: [105.28409, 27.242577]
// }, {
//     otherInfo: {
//         name: '贵阳'
//     },
//     position: [106.650551, 26.609621]
// }, {
//     otherInfo: {
//         name: '遵义'
//     },
//     position: [107.0678, 27.694908]
// }
]


class specialEffectWall extends common {
    entityType: string = 'dynamicWall'
    entityTypeMaterial: any

    constructor(Cesium: any, viewer: any, option?: any) {


        if (!Cesium) throw new Error('请传入Cesium!!')
        if (!viewer) throw new Error('请传入viewer!!')

        let defaultOption = {
            maximumHeights: 30000,  //半径
            minimunHeights: 5000, //速度
        }
        defaultOption = Object.assign(defaultOption, option)
        let param = {
            option: defaultOption,
            dataSourceName: 'specialEffectWall'
        }
        super(Cesium, viewer, param)
        option?.entityType? this.entityType = option.entityType : ''
    }

    startDraw(param: any = mockData) {
        this.draw(param)
    }

    drawEntity(param: any) {
        switch (this.entityType) {
            case 'dynamicWall':   //磁场效果
                this.entityTypeMaterial = new dynamicWallMaterialProperty(param.option)
                break;
            case 'TrailLine':  //轨迹球
                this.entityTypeMaterial = new TrailLineMaterialProperty(param.option)
                break;
                
            default:
                this.entityTypeMaterial = new dynamicWallMaterialProperty(param.option)
                break;
        }

        let ent = this.dataSource.entities.add({
            name: '墙',
            wall: {
                positions: this.Cesium.Cartesian3.fromDegreesArray(param.position),
                maximumHeights: new Array(param.position.length/2).fill(param.option.maximumHeights) ,
                minimunHeights: new Array(param.position.length/2).fill(param.option.minimunHeights),  
                material: this.entityTypeMaterial
            }
        })

        return ent

    }

}

export default specialEffectWall
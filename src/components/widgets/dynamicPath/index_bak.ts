import * as turf from '@turf/turf'
import utils from '../utils'
import { ILineOption, Ioption } from './type'


/* 模拟数据   数据结构如下 */
/**
 * data属性必传
 * lineOption属性 配置线的颜色宽度
 * speed 属性配置线段移动速度  默认0.08 值越大流速越慢  值越小流速越快
 * realSpeed 传入当前参数   按照实际流速移动
 * 其他属性不传则会使用全局配置  传了优先使用传入配置
 * 
 */
const mockData = [
{
    text: '铜仁',
    lineOption: {
        color: 'green',
        width: 8
    },
    // speed:0.01,
    // realSpeed:13000,
     data: [[106.678249, 26.58059], [109.195651, 27.704625]]
},
{
    text: '黔东南',
    lineOption: {
        color: 'black',
        width: 5
    },
    speed:0.04,
     data: [[106.678249, 26.58059], [107.968185, 26.567005]]
},
{
    text: '黔南',
    lineOption: {
        color: 'pink',
        width: 7
    }, 
    speed:0.06,
    data: [[106.678249, 26.58059], [107.560123, 26.193474]]
},
{
    text: '安顺',
    lineOption: {
        color: 'yellow',
        width: 8
    }, 
    speed:0.1,
    data: [[106.678249, 26.58059], [105.953657, 26.189369]]
},
{
    text: '黔西南',
    lineOption: {
        color: 'gray',
        width: 8
    }, 
    speed:0.03,
    data: [[106.678249, 26.58059], [104.931939, 25.039942]]
},
{
    text: '六盘水',
    lineOption: {
        color: 'white',
        width: 8
    }, 
    speed:0.05,
    data: [[106.678249, 26.58059], [104.83584, 26.545852]]
},
{
    text: '毕节',
    speed:0.09,
    data: [[106.678249, 26.58059], [105.28409, 27.242577]]
}
]
/* 折线模拟河流动态流动效果 */
class drawDynamicPath {
    Cesium: any
    viewer: any
    dataSource: any
    speed: number //影响水流流速系数默认值0.1   值越大流速越慢  值越小流速越快  全局配置
    cesiumRiverSpeed:number = 16798  //16798 m/s
    lineOption: ILineOption //配置线的颜色宽度  全局配置

    constructor(Cesium: any, viewer: any, option: Ioption = {
        speed: 0.1,
        lineOption: { //线配置
            color: 'rgba(0,245,255,0.8)',
            width: 5
        }
    }) {
        if (!Cesium) throw new Error('请传入Cesium!!')
        if (!viewer) throw new Error('请传入viewer!!')

        this.viewer = viewer
        this.Cesium = Cesium
        this.speed = option.speed as number
        this.lineOption = option.lineOption as ILineOption
    }

    draw(param: any) {
        if (!this.dataSource) {
            this.dataSource = new this.Cesium.CustomDataSource('dynamicPath')
            this.viewer.dataSources.add(this.dataSource)
        }

        /* 数据准备 */
        let data = param || mockData

        if (!(data instanceof Array)){
            data = [data]
        }

        if (data.length > 0) {
            data.map((e:any) => {
                let resParam = this.assembleData(e)
                this.drawEntity(resParam, e)
            })
        }
    }
    
    /* 数据组装 */
    assembleData(param: any) {
        let data = param.data
        let len = utils.getSpaceDistance(utils.changeDescartes(data)) ///距离
        
        let resolution = 0
        if(!param.realSpeed){  //如果数据中传入realSpeed属性 按近似水流速度移动
            resolution = Math.floor(len * (param.speed || this.speed)) 
        }else{
            resolution = Math.floor(len * (0.1*(this.cesiumRiverSpeed/param.realSpeed)))  //距离长度与相乘计算出需要分割出多少个点
        }
         
        if (data.length > resolution) {
            resolution = data.length
        }
        //通过插值计算算出更多点
        var line = turf.lineString(data);
        var curved = turf.bezierSpline(line, { sharpness: 0.1, resolution: resolution });  //插值计算  sharpness属性控制弧度
        let positions: any = [];
        let dynamicPositions: any = [];
        console.log('coordinates',curved.geometry.coordinates)
        curved.geometry.coordinates.map((e: any, i: number) => {
            positions.push(e[0], e[1])
            if (i <= 1) {
                dynamicPositions.push(e[0], e[1])
            }
        })

        return {
            index: 0,
            coordinates: curved.geometry.coordinates as any,
            positions: positions,
            dynamicPositions: dynamicPositions
        }
    }
    
    /* 绘制实体 */
    drawEntity({
        index = 0,
        coordinates = [],
        positions = [],
        dynamicPositions = []
    }, info?: any) {
        const ent = this.dataSource.entities.add({
            position: new this.Cesium.CallbackProperty(() => {
                let res = this.Cesium.Cartesian3.fromDegrees(coordinates[index][0], coordinates[index][1])
                return res;
            }, false),
            polyline: {
                show: true,
                positions: new this.Cesium.CallbackProperty((time:any,result:any) => {
                  
                    if (dynamicPositions.length <= positions.length) {
                        index++
                        dynamicPositions.push(coordinates[index][0], coordinates[index][1])
                    } else {
                        //循环流动
                        index = 0
                        dynamicPositions = positions.slice(0, 4)
                    }

                    let res = this.Cesium.Cartesian3.fromDegreesArray(dynamicPositions)
                    return res;
                }, false),
                material: this.Cesium.Color.fromCssColorString(info?.lineOption?.color || this.lineOption.color),
                width: info?.lineOption?.width || this.lineOption.width,
            },
            label: {
                text: info?.text || '测试',
                show: true,
                font: '12px Microsoft YaHei',
                style: this.Cesium.LabelStyle.FILL,
                fillColor: this.Cesium.Color.BLACK,
                showBackground: true,
                backgroundColor: this.Cesium.Color.YELLOW.withAlpha(0.6),
                backgroundPadding: new this.Cesium.Cartesian2(4, 4),
                verticalOrigin: this.Cesium.VerticalOrigin.BOTTOM
            }
        })

        return ent
    }
    
    // 销毁清除
    destory() {
        if (!this.viewer && !this.dataSource) return
        this.viewer?.dataSources?.remove(this.dataSource)

        delete this.viewer
        delete this.Cesium
        delete this.dataSource
    }

}

export default drawDynamicPath
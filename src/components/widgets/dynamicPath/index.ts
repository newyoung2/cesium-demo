import * as turf from '@turf/turf'
import utils from '../utils'
import { ILineOption, Ioption, IdataStruct } from './type'


/* 模拟数据   数据结构如下 */
/**
 * data属性必传
 * lineOption属性 配置线的颜色宽度
 * speed 属性配置线段移动速度  默认1 值越大流速越慢  值越小流速越快
 * 其他属性不传则会使用全局配置  传了优先使用传入配置
 * 
 */
const mockData = [
    [
        {
            text: '10m³/s',
            position: [106.708339, 26.533121]
        },
        {
            text: '20m³/s',
            position: [106.812364, 26.439094]
        },
        {
            text: '30m³/s',
            position: [106.91785, 26.410693]
        },
        {
            text: '40m³/s',
            position: [107.051724, 26.402744]
        },
        {
            text: '50m³/s',
            position: [107.169718, 26.41942]
        },
        {
            text: '60m³/s',
            position: [107.317059, 26.470241]
        },
        {
            text: '70m³/s',
            position: [107.383182, 26.590336]
        },
        {
            text: '80m³/s',
            position: [107.413555, 26.754834]
        }
    ]
]
/* 折线模拟河流动态流动效果 */
class drawDynamicPath {
    Cesium: any
    viewer: any
    dataSource: any
    speed: number //影响水流流速系数默认值1   值越大流速越慢  值越小流速越快  全局配置
    lineOption: ILineOption = { //配置线的颜色宽度  全局配置
        color: 'rgba(0,245,255,0.8)',
        width: 5
    }

    constructor(Cesium: any, viewer: any, option?: any) {
        if (!Cesium) throw new Error('请传入Cesium!!')
        if (!viewer) throw new Error('请传入viewer!!')

        this.viewer = viewer
        this.Cesium = Cesium
        this.speed = option?.speed || 0.1
        this.lineOption = Object.assign(this.lineOption, option?.lineOption)
    }

    draw(param: any) {
        if (!param) throw new Error('请传入数据!!')

        if (!this.dataSource) {
            this.dataSource = new this.Cesium.CustomDataSource('dynamicPath')
            this.viewer.dataSources.add(this.dataSource)
        }

        /* 数据准备 */
        let data = param
        if (!(data instanceof Array)) {
            data = [data]
        }

        if (data.length > 0) {
            data.map((e: any) => {
                let resParam = this.assembleData(e)
                this.drawEntity(resParam, e)
            })
        }
    }

    /* 数据组装 */
    assembleData(data: any) {
        let positions: any = [];
        let dynamicPositions: any = [];
        data.map((e: any, i: number) => {
            positions.push(e.position[0], e.position[1])
            if (i <= 1) {
                dynamicPositions.push(e.position[0], e.position[1])
            }
        })

        return {
            index: 0,
            coordinates: data,
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
        let preTime: any

        let showCallBack = new this.Cesium.CallbackProperty(() => {
            let res = index == 0 ? false : true
            return res;
        }, false)

        const ent = this.dataSource.entities.add({
            position: new this.Cesium.CallbackProperty(() => {
                let coordinatesObj: IdataStruct = coordinates[index]
                let res = this.Cesium.Cartesian3.fromDegrees(coordinatesObj.position[0], coordinatesObj.position[1])
                return res;
            }, false),
            polyline: {
                show: showCallBack,
                positions: new this.Cesium.CallbackProperty((time: any, result: any) => {

                    !preTime ? preTime = new Date() : ''

                    let nowTime = new Date()
                    if ((parseInt(nowTime - preTime) / 1000) >= this.speed && dynamicPositions.length <= positions.length) {
                        index++
                        let coordinatesObj: IdataStruct = coordinates[index]
                        dynamicPositions.push(coordinatesObj.position[0], coordinatesObj.position[1])
                        preTime = new Date()
                    } else if (dynamicPositions.length > positions.length) {

                        let t = setTimeout(() => {
                            index = 0
                            dynamicPositions = positions.slice(0, 4)
                            clearTimeout(t)
                        }, this.speed * 1000)

                    }

                    let res = this.Cesium.Cartesian3.fromDegreesArray(dynamicPositions)
                    return res;
                }, false),
                material: this.Cesium.Color.fromCssColorString(info?.lineOption?.color || this.lineOption.color),
                width: info?.lineOption?.width || this.lineOption.width,
            },
            label: {
                text: new this.Cesium.CallbackProperty(() => {
                    let coordinatesObj: IdataStruct = coordinates[index]
                    let res = coordinatesObj.text
                    return res;
                }, false),
                show: showCallBack,
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

    // 清除实体
    clear() {
        if (!this.viewer && !this.dataSource) return
        this.viewer?.dataSources?.remove(this.dataSource)
        this.dataSource = null
    }

    // 销毁清除
    destory() {
        this.clear()

        delete this.viewer
        delete this.Cesium
        delete this.dataSource
    }

}

export default drawDynamicPath
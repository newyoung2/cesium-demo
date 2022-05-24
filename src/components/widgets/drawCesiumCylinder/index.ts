import * as Cesium from "cesium";
import GCPopover from "../../../../../core/utils/GCPopover";
interface IcesiumCylinder {
    handler: any
    addMoveEvent(cesiumRef: any): void
    cylinderIds: any[]
    drawCylinder(param: any, cesiumRef: any): void
    clearCylinder(cesiumRef: any): void
    clear(cesiumRef: any): void
    dealCesiumBarData(data: any[], innerKey: string, outKey: string, barHighest: number): void
}
const cesiumCylinder: IcesiumCylinder = {
    handler: null,
    // 添加鼠标移动事件
    addMoveEvent(cesiumRef: any) {
        this.handler = new Cesium.ScreenSpaceEventHandler(cesiumRef?.viewer.scene.canvas)
        /** 移动*/
        this.handler.setInputAction((e: any) => {
            let pick = cesiumRef?.viewer.scene.pick(e.endPosition);
            const gcDom = document.getElementById('gc-cesium-popover') as HTMLElement
            if (pick && pick.id && pick.id.name == '工程蓄水') {
                const scratch = new Cesium.Cartesian2()
                /** hover部分  单例存在*/
                const position = Cesium.Cartesian3.fromDegrees(Number(GCPopover.getCartesian()[0]), Number(GCPopover.getCartesian()[1]), 2500)
                // cartesianToCanvasCoordinates 转换三维空间坐标到canvas坐标（窗口坐标）
                const canvasPosition = cesiumRef?.viewer.scene.cartesianToCanvasCoordinates(position, scratch)
                GCPopover.setPosition(document.getElementById('gc-cesium-popover') as HTMLElement, canvasPosition)
                const {
                    name,
                    properties,
                    cartesian,
                } = GCPopover.getProperties(pick.id.name, pick.id.info, false);
                gcDom.style.display = 'block'
            } else {
                gcDom.style.display = 'none'
            }

        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
    },
    cylinderIds: [],  //存储实体id 清除实体时候用
    // 绘制圆柱
    drawCylinder(param: any, cesiumRef: any) {
        let entityId = 'cylinder' + this.cylinderIds.length
        this.cylinderIds.push(entityId)
        cesiumRef?.viewer.entities.add({
            id: entityId,
            name: "工程蓄水",
            position: Cesium.Cartesian3.fromDegrees(param.lgtd, param.lttd, param.nPositionHeight),
            cylinder: {
                length: param.nBarHeight,
                topRadius: 10000.0,
                bottomRadius: 10000.0,
                material: Cesium.Color.WHITE.withAlpha(0.5)
            },
            info: param
        });

        let entityId1 = 'cylinder' + this.cylinderIds.length
        this.cylinderIds.push(entityId1)
        cesiumRef?.viewer.entities.add({
            id: entityId1,
            name: "工程蓄水",
            position: Cesium.Cartesian3.fromDegrees(param.lgtd, param.lttd, 0.0),
            cylinder: {
                length: param.cBarHeight,
                topRadius: 9000.0,
                bottomRadius: 9000.0,
                material: Cesium.Color.fromCssColorString('#00E5EE')
            },
        });


        if (!this.handler) {
            this.addMoveEvent(cesiumRef)
        }

    },
    // 清除圆柱实体
    clearCylinder(cesiumRef: any) {
        if (this.cylinderIds.length > 0) {
            this.cylinderIds.map(e => {
                let entity = cesiumRef?.viewer.entities.getById(e)
                if (entity) {
                    cesiumRef?.viewer.entities.remove(entity);
                }
            })
            this.cylinderIds = []
        }
    },
    // 绘制圆柱前组装数据
    /**
     * 
     * @param {*} data 需要进行处理的数据
     * @param {*} innerKey 内层圆柱的value对应的字段名
     * @param {*} outKey 外层圆柱的value对应的字段名
     * @param {*} barHighest 圆柱最大高度
     */
    dealCesiumBarData(data: any[], innerKey: string, outKey: string, barHighest?: number) {
        const highest = barHighest ||  50000
        let dataArr: any[] = []
        data.map(e => {
            dataArr.push(e[innerKey])
            dataArr.push(e[outKey])
        })
        dataArr.sort((x, y) => {//比较函数
            if (x < y) {
                return -1;
            } else if (x > y) {
                return 1;
            } else {
                return 0;
            }
        })
        let max = dataArr[dataArr.length - 1]
        data.map(e => {
            e.cBarHeight = e[innerKey] / max * highest
            e.nBarHeight = e[outKey] / max * highest
            e.nPositionHeight = e.nBarHeight / 2 - e.cBarHeight / 2
        })
    },
    // 清除实体和鼠标事件
    clear(cesiumRef: any) {
        this.clearCylinder(cesiumRef)
        if (this.handler) {
            this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
            this.handler = null
        }
    }

}

export default cesiumCylinder
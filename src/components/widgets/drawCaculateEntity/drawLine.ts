import common from './common'
import utils from '../utils'
import * as turf from 'turf'
import EOC from './entityOptionConfig'

class drawLine extends common {
    floatPointEntity:any
    floatLineEntity:any
    corridorEntity:any
    floatLabelEntity:any
    len:string|number = 0

    constructor(Cesium: any, viewer: any,valObj:any,paramOption?:any) {
        super(Cesium,viewer,paramOption)
        this.corridorWith = valObj.hcRange || 2
    }

    //开启绘制后 鼠标左击  当前函数内的代码会执行
    leftClickFn() {
        /* 绘制线  鼠标左击事件 */
        if (this.floatPointEntity && this.floatLineEntity) {
            /* 清除浮动点 */
            this.viewer.entities.remove(this.floatPointEntity);
            this.viewer.entities.remove(this.floatLineEntity);
            this.floatPointEntity = null
            this.floatLineEntity = null
        }

        /* 用当前坐标位置再绘制不浮动的点和线 */
        this.drawPoint(this.cartesian.clone())
        if (this.positions.length >= 2) {
            let i = this.positions.length
            this.drawLine([this.positions[i - 2], this.positions[i - 1]])
        }

    }

    //开启绘制后 鼠标移动  当前函数内的代码会执行
    mouseMoveFn() {
        if(this.positions.length >= 1){
            if (!this.floatPointEntity && !this.floatLineEntity) {
                // 
                var dynamicPoint = new this.Cesium.CallbackProperty(() => {
                    return this.cartesian;
                }, false);
                this.floatPointEntity = this.drawPoint(dynamicPoint)
                // 
                var dynamicLine = new this.Cesium.CallbackProperty(() => {
                    let i = this.positions.length
                    return [this.positions[i - 1], this.cartesian];
                }, false);
                this.floatLineEntity = this.drawLine(dynamicLine)
    
    
            }

             // 动态显示距离
        if (!this.floatLabelEntity) {
            var dynamicPosition = new this.Cesium.CallbackProperty((time:any, result:any) => {
                result = this.cartesian
                return result;
            }, false);

            var dynamicText = new this.Cesium.CallbackProperty((time:any, result:any) => {
                result = 'L = ' + (utils.getSpaceDistance([...this.positions, this.cartesian]) / 1000).toFixed(2) + '（km）'
                return result;
            }, false);

            this.floatLabelEntity = this.drawLabel({position:dynamicPosition,text:dynamicText})
        }


        if (!this.corridorEntity) {
            this.drawBufferPolygon(true)
        }
        }
        
    }

    //开启绘制后 注册鼠标右击事件
    rightClickFn(callBack:Function) {
        if (this.floatPointEntity || this.floatLineEntity) {
            /* floatPointEntity 或 floatLineEntity不为null  说明浮动点/线还存在  需要清掉  */
            this.viewer.entities.remove(this.floatPointEntity);
            this.viewer.entities.remove(this.floatLineEntity);
            this.viewer.entities.remove(this.corridorEntity);
            this.viewer.entities.remove(this.floatLabelEntity);
            this.floatPointEntity = null
            this.floatLineEntity = null
            this.corridorEntity = null
            this.floatLabelEntity = null
        }

        this.drawBufferPolygon()
        this.clearOneTypeEntities('point')
        
        this.len = (utils.getSpaceDistance(this.positions) / 1000).toFixed(2)
        var dynamicText = 'L = ' + this.len + '（km）'
        this.drawLabel({position:this.positions[this.positions.length - 1],text:dynamicText})


        let clData = utils.changeLatitude(this.positions)
        let callBackObj = {
            type:'line',
            positions: clData,
            len:this.len
        }
        callBack(callBackObj)
    }
    

    destory(){
        this.floatPointEntity = null
        this.floatLineEntity = null
        this.corridorEntity = null
        this.floatLabelEntity = null
        this.corridorWith = 2
        this.len = 0
        this.isDynamicBuffer = false
        this.clear()
    }

    /* 缓冲区分析（线） */
    corridorWith  //缓冲范围
    isDynamicBuffer = true
    dynamicBufferData = new this.Cesium.CallbackProperty(() => {
        let initData = this.isDynamicBuffer ? [...this.positions, this.cartesian] : this.positions
        let jwd = utils.changeLatitude(initData)
        let turfLinePtCoors = jwd.map(e => {
            return [e.x, e.y]
        })
        let line = turf.lineString(turfLinePtCoors);
        let linebuffer = turf.buffer(line, this.corridorWith, 'kilometers');
        let arr = this.getPtCoor(linebuffer.geometry.coordinates[0])
        let res = this.Cesium.Cartesian3.fromDegreesArray(arr)
        let resfina = new this.Cesium.PolygonHierarchy(res)
        return resfina
    }, false)

    /* 绘制线性缓冲区 */
    drawBufferPolygon(isDynamicBuffer = false) {
        this.isDynamicBuffer = isDynamicBuffer
        if (this.corridorEntity) {
            this.viewer.entities.remove(this.corridorEntity)
            this.corridorEntity = null
        }

        let entityOption = EOC(this.Cesium,'bufferArea',this.cusEntityOption)
        entityOption.hierarchy = this.dynamicBufferData

        let option = {
            polygon: entityOption,
        }
        this.corridorEntity = this.drawEntity(option, 'area')
    }

    // 更新缓冲范围  重新绘制缓冲多边形
    updateCorridorWith(val:number) {
        this.corridorWith = val >= 2 ? val : 2
        this.drawBufferPolygon()
    }

    getPtCoor(turfPtArr:any[]) {
        let ptArr:any[] = [];
        turfPtArr.forEach(pt => {
            ptArr.push(pt[0]);
            ptArr.push(pt[1]);
        });
        return ptArr;
    }

}

export default drawLine
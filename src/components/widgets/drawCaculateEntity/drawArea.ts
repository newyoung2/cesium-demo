import common from './common'
import utils from '../utils'

class drawArea extends common{
    floatPointEntity:any
    floatLineEntity:any
    floatAreaEntity:any 
    floatLabelEntity:any
    area:string|number = 0
    constructor(Cesium: any, viewer: any,paramOption?:any){
        super(Cesium,viewer,paramOption)
    }

    //开启绘制后 鼠标左击  当前函数内的代码会执行
    leftClickFn(){
            /* 清除浮动点 */
            if (this.floatPointEntity && this.floatLineEntity && this.floatAreaEntity) {
                this.viewer.entities.remove(this.floatPointEntity);
                this.viewer.entities.remove(this.floatLineEntity);
                this.viewer.entities.remove(this.floatAreaEntity);
                this.floatPointEntity = null
                this.floatLineEntity = null
                this.floatAreaEntity = null
            }

            /* 用当前坐标位置再绘制不浮动的点和线 */
            this.drawPoint(this.cartesian.clone())
            if (this.positions.length >= 2) {
                let i = this.positions.length
                this.drawLine([this.positions[i - 2], this.positions[i - 1]])
            }
    }

    //开启绘制后 鼠标移动  当前函数内的代码会执行
    mouseMoveFn(){
        if(this.positions.length >= 2){
            if (!this.floatAreaEntity) {
                var dynamicArea = new this.Cesium.CallbackProperty(() => {
                    return new this.Cesium.PolygonHierarchy([...this.positions, this.cartesian, this.positions[0]]);
                }, false);
                this.floatAreaEntity = this.drawArea(dynamicArea)

                 // 动态显示距离
            if (!this.floatLabelEntity) {
                var dynamicPosition = new this.Cesium.CallbackProperty((time:any, result:any) => {
                    var plyPositions = this.floatAreaEntity.polygon.hierarchy.getValue(this.Cesium.JulianDate.now()).positions;
                    //中心点
                    result = this.Cesium.BoundingSphere.fromPoints(plyPositions).center;
                    return result
                }, false);

                var dynamicText = new this.Cesium.CallbackProperty((time:any, result:any) => {
                    this.area = utils.computeSignedArea([...this.positions,this.cartesian,this.positions[0]])
                    result =   'S = ' + this.area + '（km²）'
                    return result;
                }, false);

                this.floatLabelEntity = this.drawLabel({position:dynamicPosition,text:dynamicText})
            }

        }
        }
                
            
    }

    //开启绘制后 注册鼠标右击事件
    rightClickFn(callBack:Function){
                if (this.floatPointEntity || this.floatLineEntity) {
                    /* floatPointEntity 或 floatLineEntity不为null  说明浮动点/线还存在  需要清掉  */
                    this.positions.pop()
                    this.viewer.entities.remove(this.floatPointEntity);
                    this.viewer.entities.remove(this.floatLineEntity);
                    this.viewer.entities.remove(this.floatAreaEntity);
                    
                    this.floatPointEntity = null
                    this.floatLineEntity = null
                    this.floatAreaEntity = null
                    
                }

                this.clearOneTypeEntities('point')
                this.clearOneTypeEntities('area')

                this.drawLine([this.positions[this.positions.length - 1],this.positions[0]])
                this.drawArea([...this.positions, this.positions[0]])

            let clData = utils.changeLatitude(this.positions)
            let callBackObj = {
                type:'area',
                 positions: clData,
                 area:this.area
            }
            callBack(callBackObj)

    }

    destory(){
        this.area = 0
        delete this.floatPointEntity 
        delete this.floatLineEntity 
        delete this.floatAreaEntity
        delete this.floatLabelEntity
        this.clear()
    }
}

export default drawArea
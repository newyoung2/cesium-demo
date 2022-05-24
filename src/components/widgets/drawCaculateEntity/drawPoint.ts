import common from './common'
import utils from '../utils'

class drawPoint extends common{

    pointRadius:number = 0
    floatPointEntity:any
    floatLineEntity:any
    floatCircleEntity:any
    floatLabelEntity:any

    constructor(Cesium: any, viewer: any,paramOption?:any){
       super(Cesium,viewer,paramOption)
    }
    
    //开启绘制后 鼠标左击  当前函数内的代码会执行
    leftClickFn(){
        console.log(this.positions.length)
        if(this.positions.length == 1){
            this.drawPoint(this.cartesian.clone())
        }       
    }
    
    //开启绘制后 鼠标移动  当前函数内的代码会执行
    mouseMoveFn() {
        if(this.positions.length >= 1){
                // 绘制动态点
                if (!this.floatPointEntity) {
                    var dynamicPoint = new this.Cesium.CallbackProperty(() => {
                        return this.cartesian;
                    }, false);
                    // this.drawPoint(dynamicPoint)
                    this.floatPointEntity = this.drawPoint(dynamicPoint)
                }
                
                // 绘制动态线
                if (!this.floatLineEntity) {
                    var dynamicLine = new this.Cesium.CallbackProperty(() => {
                        return [this.positions[0],this.cartesian];
                    }, false);
                    this.floatLineEntity = this.drawLine(dynamicLine)
                }

                // 绘制动态圆
                if (!this.floatCircleEntity) {
                    var dynamicRadius = new this.Cesium.CallbackProperty((time:any, result:any) => {
                        this.pointRadius = parseFloat(utils.getSpaceDistance([this.positions[0], this.cartesian]))
                        result = this.pointRadius
                        return result;
                    }, false);
                    let param  = {
                        position:this.positions[0],
                        radius:dynamicRadius
                    }
                    this.floatCircleEntity = this.drawCircle(param)
                }

                // 动态显示距离
                if (!this.floatLabelEntity) {
                    var dynamicPosition = new this.Cesium.CallbackProperty((time:any, result:any) => {
                        result = utils.getMidpoint(this.positions[0],this.cartesian)
                        return result;
                    }, false);

                    var dynamicText = new this.Cesium.CallbackProperty((time:any, result:any) => {
                        result = 'R = ' + (utils.getSpaceDistance([this.positions[0],this.cartesian]) / 1000).toFixed(2) + '（km）'
                        return result;
                    }, false);

                    this.floatLabelEntity = this.drawLabel({position:dynamicPosition,text:dynamicText})
                }
            } 
    }

    //开启绘制后 注册鼠标右击事件
    rightClickFn(callBack:Function) {
                console.log(this.floatPointEntity)
                if (this.floatPointEntity) {
                    this.viewer.entities.remove(this.floatPointEntity);
                    this.floatPointEntity = null
                }

            let clData = utils.changeLatitude(this.positions) 
            clData.pop()
            let callBackObj = {
                 type:'point',
                 positions: clData,
                 radius:(this.pointRadius/1000).toFixed(2)
            }
            callBack(callBackObj) 
    }

    destory(){
        this.pointRadius = 0
        this.floatPointEntity = null
        this.floatLineEntity = null
        this.floatCircleEntity = null
        this.floatLabelEntity = null
        this.clear()
    }
}

export default drawPoint
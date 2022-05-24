import utils from '../utils'
import EOC from './entityOptionConfig'
/* 基类公共抽象类   */
abstract class common {
    Cesium:any
    viewer:any
    handler:any
    positions:any[] = []  //存储绘制点的坐标数据
    cartesian:any
    allEntitiesCollection:any[] = []  //存储绘制的元素信息    清除时使用
    cusEntityOption:any  //存储自定义配置  更改绘制实体的属性（颜色、大小等。。。）

    constructor(Cesium: any, viewer: any,paramOption?:any) {
        if (!Cesium) throw new Error('请传入Cesium!!')
        if (!viewer) throw new Error('请传入viewer!!')

        this.viewer = viewer
        this.Cesium = Cesium
        paramOption?this.cusEntityOption = paramOption:''
    }

    /**
     * 开始绘制  
     * @param {*} callBack 绘制完成后的回调函数（鼠标右键即绘制完成）
     * @param {*} type 绘制类型 point绘制点  line绘制线  area绘制面
     */
    startDraw(callBack:Function) {

        if (!this.handler) {
            this.handler = new this.Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
        }

        // 注册鼠标左击事件
        this.addLeftClickEvent()

        // 注册鼠标移动事件
        this.addMouseMoveEvent()

        // 注册鼠标右击事件
        this.addRightClickEvent(callBack)

    }
    

    /* **********************鼠标事件相关**start************************* */
    // 注册鼠标左击事件
    addLeftClickEvent() {
        this.handler.setInputAction((movement:any) => {
            let ray = this.viewer.camera.getPickRay(movement.position);
            this.cartesian = this.viewer.scene.globe.pick(ray, this.viewer.scene);
            this.positions.push(this.cartesian.clone());
            this.leftClickFn()
        }, this.Cesium.ScreenSpaceEventType.LEFT_CLICK)
    }
    
    // 左击事件后执行的逻辑---子类根据自己的逻辑进行重写
    abstract leftClickFn():void

    //  注册鼠标移动事件
    addMouseMoveEvent() {
        this.handler.setInputAction((movement:any) => {
            let ray = this.viewer.camera.getPickRay(movement.endPosition);
            this.cartesian = this.viewer.scene.globe.pick(ray, this.viewer.scene);   
            this.mouseMoveFn()  
        },  this.Cesium.ScreenSpaceEventType.MOUSE_MOVE)
    }

    // 鼠标移动后执行的逻辑---子类根据自己的逻辑进行重写
    abstract mouseMoveFn():void

    // 注册鼠标右击事件
    addRightClickEvent(callBack:Function) {
        this.handler.setInputAction((movement:any) => {
            let ray = this.viewer.camera.getPickRay(movement.position);
            this.cartesian = this.viewer.scene.globe.pick(ray, this.viewer.scene);
            this.removeAllEvent()
            this.rightClickFn(callBack)       
        },  this.Cesium.ScreenSpaceEventType.RIGHT_CLICK)
    }

    // 左击事件后执行的逻辑---子类根据自己的逻辑进行重写
    abstract rightClickFn(callBack:Function):void

    //移除左击事件
    removeLeftClickEvent() {
        if (this.handler) {
            this.handler.removeInputAction( this.Cesium.ScreenSpaceEventType.LEFT_CLICK)
        }
    }

    //移除右击事件
    removeRightClickEvent() {
        if (this.handler) {
            this.handler.removeInputAction( this.Cesium.ScreenSpaceEventType.RIGHT_CLICK)
        }
    }

    // 移除鼠标悬浮事件
    removeMouseMoveEvent() {
        if (this.handler) {
            this.handler.removeInputAction( this.Cesium.ScreenSpaceEventType.MOUSE_MOVE)
        }
    }

    //移除所有鼠标事件
    removeAllEvent() {
        this.removeLeftClickEvent()
        this.removeRightClickEvent()
        this.removeMouseMoveEvent()
    }

    /* **********************鼠标事件相关**end************************* */


    /* *********************绘制相关**start****************************** */
   
    // 根据配置绘制相关元素
    drawEntity(option:any,type:string){
        let entityId =  utils.uuid(8,10)  
        option.id = entityId
        let obj = this.viewer.entities.add(option)
        this.allEntitiesCollection.push({
            type,
            id:entityId
        })
        return obj
    }

    // 画点
    drawPoint(position:any){
        let option = {
         name: '点',
         position: position,
         point: EOC(this.Cesium,'point',this.cusEntityOption)
       }

      let obj =  this.drawEntity(option,'point')
      return obj
     }
     
     // 画线
     drawLine(positions:any){
        let entityOption = EOC(this.Cesium,'line',this.cusEntityOption)
        entityOption.positions = positions
        let option = {
            name: '线',
            polyline: entityOption
        }
 
        let obj =  this.drawEntity(option,'line')
        return obj
     }

     // 画面
     drawArea(positions:any) {
        let entityOption = EOC(this.Cesium,'area',this.cusEntityOption)
        entityOption.hierarchy = positions
        let option = {
            name: '面',
            polygon: entityOption,
        }

        let obj = this.drawEntity(option, 'area')
        return obj
    }
     
     // 画圆
     drawCircle(param:any){
        let entityOption = EOC(this.Cesium,'circle',this.cusEntityOption)
        entityOption.semiMinorAxis = param.radius
        entityOption.semiMajorAxis = param.radius
     let  option = {
         name: '圆',
         position: param.position,
         ellipse: entityOption,
     }
     
     let obj = this.drawEntity(option,'circle')
     return obj
     }
     
     // 画标注
     drawLabel(param:any){
        let entityOption = EOC(this.Cesium,'label',this.cusEntityOption)
        entityOption.text = param.text
        let option = {
            position: param.position,
            name: '文本',
            label: entityOption,
        }
 
        let obj = this.drawEntity(option,'label')
        return obj
     }
    
    // 删除所有实体
    clearAllEntities(){
        if(this.allEntitiesCollection.length<=0)return
            this.allEntitiesCollection.map(e=>{
                let entity = this.viewer.entities.getById(e.id)
                if(entity){
                    this.viewer.entities.remove(entity);
                }
            })
    }
    
    // 删除指定类型实体
    clearOneTypeEntities(type:string){
        if(!type || this.allEntitiesCollection.length<=0)return

            this.allEntitiesCollection.map(e=>{
                if(type == e.type){
                    let entity = this.viewer.entities.getById(e.id)
                    if(entity){
                       this.viewer.entities.remove(entity);
                    }
                }
            })
    
    }

    // 清除所有  包括事件、实体、初始化数据等......
    clear() {
        this.removeAllEvent()

        // 清空所有实体
        this.clearAllEntities();
        
        //将一些属性初始化
        this.positions = []
        this.cartesian = null
        this.handler = null
        this.allEntitiesCollection = []

        delete this.Cesium
        delete this.viewer
        delete this.handler

    }
    /* *********************绘制相关**end****************************** */
    
}
export default common
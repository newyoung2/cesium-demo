import hexagon from './img/hexagon.png'
import specialEffectUtils from '../specialEffectUtils'
/* 扩散圆特效(基于图片) */
/**
 * ps:绘制完后  图片和颜色渲染不同步待解决
 */


interface Ioption {
     image?:any  //图片
     minRadius:number //最小半径  值最小是1 
     maxRadius:number //最大半径
     step:number  //步长  控制扩散速度   值越大扩散越快
     color?:string  //颜色 支持rgba修改透明度
     showLabel?:boolean  //是否显示标签
}

/* 绘制时传入的数据结构示例 */
const mockData = [{
    otherInfo:{
        name:'黔东南'  //label  显示的文字
    },
    /* 单个配置-----优先级高于全局配置 */
    option:{
        image:hexagon,  //图片---如需不需要图片只显示颜色  把值设为null
        minRadius:5000, //最小半径
        maxRadius:50000, //最大半径
        step:800,  //步长  控制扩散速度  
        color:'white',  //颜色 支持rgba修改透明度
        showLabel:true,
    },
    position:[107.968185, 26.567005]
},{
    otherInfo:{
        name:'铜仁'
    },
    option:{
        image:null,  //图片
        color:'rgba(255,230,230,0.5)'  //颜色 支持rgba修改透明度
    },
    position:[109.195651, 27.704625]
},{
    otherInfo:{
        name:'黔南'
    },
    option:{
        // image:t1,  //图片
        minRadius:2000, //最小半径
        maxRadius:30000, //最大半径
        step:1000,  //步长  控制扩散速度
        color:'yellow'  //颜色 支持rgba修改透明度
    },
    position:[107.560123, 26.193474]
},{
    otherInfo:{
        name:'安顺'
    },
    position:[105.953657, 26.189369]
},{
    otherInfo:{
        name:'黔西南'
    },
    position:[104.931939, 25.039942]
},{
    otherInfo:{
        name:'六盘水'
    },
    position:[104.83584, 26.545852]
},{
    otherInfo:{
        name:'毕节'
    },
    position:[105.28409, 27.242577]
},{
    otherInfo:{
        name:'贵阳'
    },
    position:[106.650551, 26.609621]
},{
    otherInfo:{
        name:'遵义'
    },
    position:[107.0678, 27.694908]
}]


class spreadCircle {
    Cesium: any
    viewer: any
    dataSource: any
    option:Ioption = {
        image: hexagon,
        minRadius:3000,
        maxRadius:30000,
        step:300,
        color:'yellow',
        showLabel:false
    }

    constructor(Cesium: any, viewer: any,option?:any) {
        if (!Cesium) throw new Error('请传入Cesium!!')
        if (!viewer) throw new Error('请传入viewer!!')

        this.viewer = viewer
        this.Cesium = Cesium
        this.option = Object.assign(this.option,option)
    }
 
    draw(param:any = mockData) {
        if(param.length<=0) throw new Error('请传入数据!!')

        if (!this.dataSource) {
            this.dataSource = new this.Cesium.CustomDataSource('spreadCircle')
            this.viewer.dataSources.add(this.dataSource)
        }

        if (!(param instanceof Array)){
            param = [param]
        }
        
        this.assembleData(param)

        param.forEach(e=>{
          this.drawEntity(e)
        })
    }

    assembleData(paramArr:any[]){
        paramArr.map(e=>{
            let obj = Object.assign({},this.option,(e.option || {}))
            obj.radius = obj.minRadius
            e.option = obj
        })
    }

    drawEntity(param:any){
       let ent = this.dataSource.entities.add({
            name: '圆',
            position: this.Cesium.Cartesian3.fromDegrees(param.position[0], param.position[1]),
            ellipse: {},
            label: {
                text: param?.otherInfo?.name || '',
                show: param?.option?.showLabel?true:false,
                font: '12px Microsoft YaHei',
                style: this.Cesium.LabelStyle.FILL,
                fillColor: this.Cesium.Color.BLACK,
                showBackground: true,
                backgroundColor: this.Cesium.Color.YELLOW.withAlpha(0.6),
                backgroundPadding: new this.Cesium.Cartesian2(4, 4),
                verticalOrigin: this.Cesium.VerticalOrigin.BOTTOM
            }
        })
        
        // 给圆添加扩散特效
        specialEffectUtils.spreadCircle(this.Cesium,ent.ellipse,param.option)
    }

    clear(){
        this.viewer?.dataSources?.remove(this.dataSource)
        this.dataSource = null
    }

    // 销毁清除
    destory() {
        if (!this.viewer && !this.dataSource) return
        this.clear()

        delete this.viewer
        delete this.Cesium
        delete this.dataSource
    }

}

export default spreadCircle
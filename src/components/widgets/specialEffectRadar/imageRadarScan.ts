import radarImg from './img/雷达刻度.png'
import scanImg from './img/扫描雷达.png'
import specialEffectUtils from '../specialEffectUtils'
/* 图片雷达扫描效果 */
/**
 * ps:绘制完后  图片和颜色渲染不同步待解决
 */

interface Ioption {
     radius:number //最小半径  值最小是1 
     radarColor?:string  //颜色 支持rgba修改透明度
     scanColor?:string  //颜色 支持rgba修改透明度
     speed?:number //旋转速度
}

/* 绘制时传入的数据结构示例 */
const mockData = [
//     {
//     otherInfo:{
//         name:'黔东南'  //label  显示的文字
//     },
//     position:[107.968185, 26.567005]
// },{
//     otherInfo:{
//         name:'铜仁'
//     },
//     position:[109.195651, 27.704625]
// },{
//     otherInfo:{
//         name:'黔南'
//     },
//     position:[107.560123, 26.193474]
// },{
//     otherInfo:{
//         name:'安顺'
//     },
//     position:[105.953657, 26.189369]
// },{
//     otherInfo:{
//         name:'黔西南'
//     },
//     position:[104.931939, 25.039942]
// },{
//     otherInfo:{
//         name:'六盘水'
//     },
//     position:[104.83584, 26.545852]
// },{
//     otherInfo:{
//         name:'毕节'
//     },
//     position:[105.28409, 27.242577]
// },
{
    otherInfo:{
        name:'贵阳'
    },
    position:[106.650551, 26.609621]
},
// {
//     otherInfo:{
//         name:'遵义'
//     },
//     position:[107.0678, 27.694908]
// }
]


class radarScan {
    Cesium: any
    viewer: any
    dataSource: any
    option:Ioption = {
        radius:30000,
        speed:0.05,
        radarColor:'red',// '#00cccc',
        scanColor:'red',//'#00ffff',
    }

    constructor(Cesium: any, viewer: any,option?:any) {
        if (!Cesium) throw new Error('请传入Cesium!!')
        if (!viewer) throw new Error('请传入viewer!!')

        this.viewer = viewer
        this.Cesium = Cesium
        this.option = Object.assign(this.option,option)
    }
 
    startDraw(param:any = mockData) {
        if(param.length<=0) throw new Error('请传入数据!!')

        if (!this.dataSource) {
            this.dataSource = new this.Cesium.CustomDataSource('radarScan')
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
            e.option = obj
        })
    }

    drawEntity(param:any){
        console.log('78979879879879878979879879879879')
       const ent1 = this.dataSource.entities.add({
            name: '圆',
            position: this.Cesium.Cartesian3.fromDegrees(param.position[0], param.position[1]),
            ellipse: {
                semiMajorAxis:param.option.radius,
                semiMinorAxis:param.option.radius,
                material: new this.Cesium.ImageMaterialProperty({
                    image: radarImg,
                    color: this.Cesium.Color.fromCssColorString(param.option.radarColor),/*  */
                    repeat: new this.Cesium.Cartesian2(1, 1),
                    transparent: true
                })
            },
        })

        const ent2 = this.dataSource.entities.add({
            name: '圆',
            position: this.Cesium.Cartesian3.fromDegrees(param.position[0], param.position[1]),
            ellipse: {
                semiMajorAxis:param.option.radius,
                semiMinorAxis:param.option.radius,
                material: new this.Cesium.ImageMaterialProperty({
                    image: scanImg,
                    color: this.Cesium.Color.fromCssColorString(param.option.scanColor),/*  */
                    repeat: new this.Cesium.Cartesian2(1, 1),
                    transparent: true
                })
            },
        })
        
        // 给圆添加扩散特效
        specialEffectUtils.rotationEffect(this.Cesium,ent2.ellipse,param.option)
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

export default radarScan
import specialEffectUtils from '../specialEffectUtils'

/* 模拟数据   数据结构如下 */
/**
 * 
 */
const mockData = [
        {   
             /* 必传属性 */
             positions: [104.959502, 25.044378, 105.967193, 26.148019],
            /* 可选属性 */
            // color:'red', 
            // width:5,   
            // speed:0.02,
           
        },  
        {
            positions:[105.967193, 26.148019,104.848984, 26.552209]
        },
        {
            positions:[104.848984, 26.552209,105.276023, 27.202104]
        },
        {
            positions:[105.276023, 27.202104,106.656012, 26.637652]
        },
        {
            positions:[106.656012, 26.637652,107.058941, 27.631599]
        },
        {
            positions:[107.058941, 27.631599,107.58094, 26.179906]
        },
        {
            positions:[107.58094, 26.179906,108.000018, 26.490957]
        },
        {
            positions:[108.000018, 26.490957,109.206242, 27.679742]
        },
]
/* 折线模拟河流动态流动效果 */
class flowLine {
    Cesium: any
    viewer: any
    primitivesCollection: any
    option:any = {   //默认配置
        positions:[],
        color:'rgb(2,185,246)', 
        width:5,   
        speed:0.02,
    }

    constructor(Cesium: any, viewer: any, option?: any) {
        if (!Cesium) throw new Error('请传入Cesium!!')
        if (!viewer) throw new Error('请传入viewer!!')

        this.viewer = viewer
        this.Cesium = Cesium
        this.option = Object.assign(this.option, option)
        this.primitivesCollection = this.viewer.scene.primitives.add(new this.Cesium.PolylineCollection());
    }

    draw(param: any) {
        // if (!param) throw new Error('请传入数据!!')

        /* 数据准备 */
        let data = param || mockData
        if (!(data instanceof Array)) {
            data = [data]
        }

        if (data.length > 0) {
            this.assembleData(data)
            data.map((e: any) => {
                console.log('eee',e)
                specialEffectUtils.flowLine(this.Cesium,this.primitivesCollection,e.option)
            })
        }
    }

    /* 数据组装 */
    assembleData(paramArr:any[]){
        paramArr.map(e=>{
            let obj = Object.assign({},this.option,(e || {}))
            e.option = obj
        })
    }

    // 清除实体
    clear() {
        if (!this.viewer && !this.primitivesCollection) return
        this.viewer.scene.primitives.remove(this.primitivesCollection)
        this.primitivesCollection = null
    }

    // 销毁清除
    destory() {
        this.clear()

        delete this.viewer
        delete this.Cesium
        delete this.primitivesCollection
    }

}

export default flowLine
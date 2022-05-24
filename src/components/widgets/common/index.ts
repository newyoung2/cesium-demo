/* 公共类 */

abstract class common {
    Cesium: any
    viewer: any
    dataSource: any
    option:any
    dataSourceName:string

    constructor(Cesium: any, viewer: any,option:any) {
        if (!Cesium) throw new Error('请传入Cesium!!')
        if (!viewer) throw new Error('请传入viewer!!')

        this.viewer = viewer
        this.Cesium = Cesium
        this.dataSourceName = option.dataSourceName || ''
        this.option = option.option
    }
    
    // 开始绘制
    draw(param:any) {
        if(param.length<=0) throw new Error('请传入数据!!')

        if (!this.dataSource) {
            this.dataSource = new this.Cesium.CustomDataSource(this.dataSourceName)
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
    
    // 数据组装
    assembleData(paramArr:any[]){
        paramArr.map(e=>{
            let obj = Object.assign({},this.option,(e.option || {}))
            e.option = obj
        })
    }

    abstract drawEntity(param:any):any

    // 清除实体
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

export default common
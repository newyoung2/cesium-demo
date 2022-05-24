/* 一些动态效果的封装类 */
class specialEffectUtils{
    
    /* 圆扩散效果 */
    /**
     * 
     * @param Cesium  Cesium对象
     * @param entity  ellipse 不能为undefined或null  必须实例化一次
     * @param option  自定义配置
     * {  //可配置项
            image: null,
            minRadius:3000,  //圆最小半径  必须大于0
            maxRadius:30000, //最大半径
            step:300,   //步长 值越大  扩散越快
            color:'rgba(160,32,240,0.8)',  //填充色
        }
     */
    static spreadCircle(Cesium:any,ellipse:any,option?:any){
        if(!ellipse) throw new Error('ellipse 不能为undefined或null')

        let defaultOption = {  //默认配置
            image: null,
            minRadius:3000,
            maxRadius:30000,
            step:300,
            radius:3000,
            color:'rgba(160,32,240,0.8)'
        }
        
        defaultOption = Object.assign(defaultOption,option)
        defaultOption.radius = defaultOption.minRadius

        ellipse.semiMajorAxis = new Cesium.CallbackProperty((time:any,result:any) => {
            defaultOption.radius += defaultOption.step
            if(defaultOption.radius >= defaultOption.maxRadius){
                defaultOption.radius = defaultOption.minRadius
            }
            return defaultOption.radius;
        }, false)

        ellipse.semiMinorAxis = new Cesium.CallbackProperty((time:any,result:any) => {
            return defaultOption.radius;
        }, false)

        ellipse.material = 
        new Cesium.ImageMaterialProperty({
            image: defaultOption.image,
            color:Cesium.Color.fromCssColorString(defaultOption.color),/*  */
            repeat: new Cesium.Cartesian2(1, 1),
            transparent: true
        })

    }


    /* 圆旋转 */
    static rotationEffect(Cesium:any,ellipse:any,option?:any){
        if(!ellipse) throw new Error('ellipse 不能为undefined或null')

        let defaultOption = {   //默认配置
            speed:0.01,     
        }

        defaultOption = Object.assign(defaultOption,option)

        let rotation = Cesium.Math.toRadians(50)
        let cbp = new Cesium.CallbackProperty(()=>{
            rotation -= defaultOption.speed
            return rotation
        }, false)

        ellipse.stRotation = cbp
    }

    /* 闪烁效果  返回ImageMaterialProperty类型实例对象  (适用于面)  */
    /**
     * 
     * @param Cesium 
     * @param option {  //可配置项
     *                  color:'red',
     *                  speed:0.01, //闪烁的频率   值越大闪烁越慢
     *                  splitNum:5  //值越大渐变透明的效果更明显  和speed属性联合使用控制闪烁效果
     *               }
     * @returns 
     */
    static twinkleEffectImageMaterialProperty(Cesium:any,option?:any){
        let callbackp = specialEffectUtils.twinkleEffectColor(Cesium,option)
        return new Cesium.ImageMaterialProperty({
            color:callbackp,
        })
    }
    
    /* 闪烁效果  返回ColorMaterialProperty类型实例对象 (适用于线)   */
    /**
     * 
     * @param Cesium 
     * @param option {  //可配置项
     *                  color:'red',
     *                  speed:0.01, //闪烁的频率   值越大闪烁越慢
     *                  splitNum:5  //值越大渐变透明的效果更明显  和speed属性联合使用控制闪烁效果
     *               }
     * @returns 
     */
    static twinkleEffectColorMaterialProperty(Cesium:any,option?:any){
        let callbackp = specialEffectUtils.twinkleEffectColor(Cesium,option)
        return new Cesium.ColorMaterialProperty(callbackp)
    }
    
    /* 闪烁效果 返回cesium.color类型实例对象 (适用于点) */
    /**
     * 
     * @param Cesium 
     * @param option {  //可配置项
     *                  color:'red',
     *                  speed:0.01, //闪烁的频率   值越大闪烁越慢
     *                  splitNum:5  //值越大渐变透明的效果更明显  和speed属性联合使用控制闪烁效果
     *               }
     * @returns 
     */
    static twinkleEffectColor(Cesium:any,option?:any){

        let defaultOption = {   //默认配置
            color:'red',
            speed:0.02,   
            splitNum:1,    
        }

        defaultOption = Object.assign(defaultOption,option)
        
        let aphalArr:any[] = []
        for(let i = defaultOption.splitNum;i>=0;i--){
            aphalArr.push(i/defaultOption.splitNum)
        } 
        
        let preTime:any
        let index:number = 0
        let isAdd = false

        const callbackp = new Cesium.CallbackProperty((time:any,result:any) => {
            !preTime?preTime = new Date():''
            let nowTime = new Date()

            if(index == 0){
                isAdd = true
            }else if(index ==  aphalArr.length-1){
                isAdd = false
            }
              
            let res = Cesium.Color.fromCssColorString(defaultOption.color).withAlpha(aphalArr[index])
            if((parseInt(nowTime - preTime)  / 1000) >= defaultOption.speed && isAdd){     
                index ++
                preTime = new Date()
            }else if((parseInt(nowTime - preTime)  / 1000) >= defaultOption.speed && !isAdd){
                index --
                preTime = new Date()
            }
            return res;

        }, false)

        return callbackp
    }
    

    /* 流光线段效果 */
    /**
     * 
     * @param Cesium 
     * @param polylines Cesium.PolylineCollection()类型
     * @param option 
     * @returns 
     */
     static flowLine(Cesium:any,polylines:any,option?:any) {

        let defaultOption = {   //默认配置
            positions:[],
            color:'rgb(2,185,246)', 
            width:5,   
            speed:0.02,
        }

        defaultOption = Object.assign(defaultOption,option)

        var fadingPolyline = polylines.add({
            positions: Cesium.Cartesian3.fromDegreesArray(defaultOption.positions),
            width: 5,
            material: Cesium.Material.fromType(Cesium.Material.FadeType, {
                repeat: true,
                fadeInColor: Cesium.Color.fromCssColorString(defaultOption.color),
                fadeOutColor: Cesium.Color.fromCssColorString(defaultOption.color).withAlpha(0),
                time: new Cesium.Cartesian2(0.0, 0.0),
                fadeDirection: {
                    x: true,
                    y: false,
                }
            })
        });

        var i = 0;
        function render() {
            i += defaultOption.speed;
            if (i >= 1) {
                i = 0; // 控制在0.0到1.0之间
            }
            fadingPolyline.material.uniforms.time.x = i;
            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
        return fadingPolyline
    }

    
    
}

export default specialEffectUtils
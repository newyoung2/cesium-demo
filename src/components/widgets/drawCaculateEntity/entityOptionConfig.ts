
/**
 * 绘制实体的相关配置  可直接修改当前文件对应配置全局使用  若需要自定义配置则需要在实例化对象的时候传入 paramOption
 * @param Cesium 
 * @param type 
 * @param paramOption 自定义配置
 * @returns 
 */
const EOC = (Cesium: any, type: string, paramOption?: any) => {
    let option = null
    switch (type) {
        case 'point':  //点配置
            option = {
                pixelSize: 5,
                color: Cesium.Color.fromCssColorString('rgb(128,213,225)'), // Cesium.Color.RED,
                outlineColor: Cesium.Color.WHITE,
                outlineWidth: 2,
                clampToGround: true
            }
            break;
        case 'line':  //线配置
            option = {
                show: true,
                material:  Cesium.Color.fromCssColorString('rgb(128,213,225)'),//Cesium.Color.CHARTREUSE,
                width: 5,
                clampToGround: true
            }
            break;
        case 'area':  //面配置
            option = {
                material: Cesium.Color.MEDIUMAQUAMARINE.withAlpha(0.5),
                clampToGround: true
            }
            break;
        case 'circle':   //圆配置
            option = {
                outline: true,
                outlineColor:  Cesium.Color.WHITE.withAlpha(0.5),
                outlineWidth: 3,
                material:  Cesium.Color.MEDIUMAQUAMARINE.withAlpha(0.5),
                clampToGround: true
            }
            break;
        case 'label':   //文本标注配置
            option = {
                show: true,
                font: '12px Microsoft YaHei',
                style:  Cesium.LabelStyle.FILL,
                fillColor:  Cesium.Color.BLACK,
                showBackground: true,
                backgroundColor:  Cesium.Color.YELLOW.withAlpha(0.6),
                backgroundPadding: new Cesium.Cartesian2(4, 4),
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM
            }
            break;
        case 'bufferArea':   //画线时  缓冲区域配置
            option = {
                material: Cesium.Color.MEDIUMAQUAMARINE.withAlpha(0.5)
            }
            break;
        default:
            break;
    }

    // 若传入自定义配置  则优先使用自定义配置
    if (paramOption && paramOption[type]) {
        option = paramOption[type]
    }

    return option
}
export default EOC
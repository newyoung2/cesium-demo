import drawPoint from './drawPoint'
import drawLine from './drawLine'
import drawArea from './drawArea'

/* 在cesium中绘制 点线面 及计算面积长度半径等 */
export default { drawPoint, drawLine, drawArea }

/**
 * 基本使用
 * 例：
 * 1、实例化
 *  lyc = new drawPoint(Cesium,viewer) 
 * 
 * 2、开始绘制
 *  lyc.startDraw(callBack)  //callBack 为右键结束回调的函数
 * 
 * 3、绘制结束后销毁
 *   lyc.destory()
 * 
 */
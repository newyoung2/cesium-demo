import * as Cesium from 'cesium'
import * as turf from 'turf'

/* 工具类 */

class utils {

    // 根据经纬度计算多边形面积
    static computeSignedArea(val: any) {
        let path = []
        path = this.changeLatitude(val)
        path.map((e: any) => {
            e.lat = e.y
            e.lng = e.x
        })
        let radius = 6371009
        let len = path.length;
        if (len < 3) return 0;
        let total = 0;
        let prev = path[len - 1];
        let prevTanLat = Math.tan(((Math.PI / 2 - prev.lat / 180 * Math.PI) / 2));
        let prevLng = (prev.lng) / 180 * Math.PI;
        for (let i in path) {
            let tanLat = Math.tan((Math.PI / 2 -
                (path[i].lat) / 180 * Math.PI) / 2);
            let lng = (path[i].lng) / 180 * Math.PI;
            total += polarTriangleArea(tanLat, lng, prevTanLat, prevLng);
            prevTanLat = tanLat;
            prevLng = lng;
        }

        return (Math.abs(total * (radius * radius)) / 1000000.0).toFixed(4)

        function polarTriangleArea(tan1: any, lng1: any, tan2: any, lng2: any) {
            let deltaLng = lng1 - lng2;
            let t = tan1 * tan2;
            return 2 * Math.atan2(t * Math.sin(deltaLng), 1 + t * Math.cos(deltaLng));
        }
    }


    /**
     * 获取两条线段中心位置
     * @param {*} startPoint 
     * @param {*} endPoint 
     * @returns 
     */
    static geodesic: any = new Cesium.EllipsoidGeodesic()
    static getMidpoint(startPoint: any, endPoint: any) {
        const startCartographic = Cesium.Cartographic.fromCartesian(startPoint);
        const endCartographic = Cesium.Cartographic.fromCartesian(endPoint);

        this.geodesic.setEndPoints(startCartographic, endCartographic);
        const midpointCartographic = this.geodesic.interpolateUsingFraction(
            0.5
        );
        return Cesium.Cartesian3.fromRadians(
            midpointCartographic.longitude,
            midpointCartographic.latitude
        );
    }

    //空间两点距离计算函数
    /**
     * 
     * @param positions 笛卡尔坐标系
     * @returns 
     */
    static getSpaceDistance(positions: any): any {
        var distance: number = 0;
        for (var i = 0; i < positions.length - 1; i++) {

            var point1cartographic = Cesium.Cartographic.fromCartesian(positions[i]);
            var point2cartographic = Cesium.Cartographic.fromCartesian(positions[i + 1]);
            /**根据经纬度计算出距离**/
            var geodesic = new Cesium.EllipsoidGeodesic();
            geodesic.setEndPoints(point1cartographic, point2cartographic);
            var s = geodesic.surfaceDistance;
            //console.log(Math.sqrt(Math.pow(distance, 2) + Math.pow(endheight, 2)));
            //返回两点之间的距离
            s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2));
            distance = distance + s;
        }
        return distance.toFixed(2);
    }

    //将笛卡尔坐标转为经纬度坐标
    static changeLatitude(data: any): any[] | any {
        if (data instanceof Array) {
            let resArr: any[] = [];
            data.map(item => {
                let cartographic = Cesium.Cartographic.fromCartesian(item);
                let longitude = Cesium.Math.toDegrees(cartographic.longitude);
                let latitude = Cesium.Math.toDegrees(cartographic.latitude);
                let height = cartographic.height;
                resArr.push({ 'x': longitude, 'y': latitude, 'z': height });
            });
            return resArr;
        } else if (typeof data == "object") {
            let cartographic = Cesium.Cartographic.fromCartesian(data);
            let longitude = Cesium.Math.toDegrees(cartographic.longitude);
            let latitude = Cesium.Math.toDegrees(cartographic.latitude);
            let height = cartographic.height;
            return { 'x': longitude, 'y': latitude, 'z': height };
        }
    }


    //将经纬度坐标转为笛卡尔坐标
    static changeDescartes(data: any[]) {
        if (data instanceof Array) {
            let resArr: any[] = [];
            data.map(item => {
                resArr.push(Cesium.Cartesian3.fromDegrees(item[0], item[1]));
            });
            return resArr;
        } else if (typeof data == "object") {
            let newObj = Cesium.Cartesian3.fromDegrees((data as any).lng, (data as any).lat);
            return newObj;
        }
    }

    // 生成唯一标识
    static uuid(len: number, radix: number) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;

        if (len) {
            // Compact form
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
            // rfc4122, version 4 form
            var r;

            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';

            // Fill in random data.  At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }

        return uuid.join('');
    }

}

export default utils
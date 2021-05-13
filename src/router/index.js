import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect:"/load3DTiles",
    children:[
      {
        path: '/load3DTiles',
        name: 'load3DTiles',
        component: () => import( '../views/3dtiles/loadModel.vue')
      },
      {
        path: '/NewYorkModel',
        name: 'NewYorkModel',
        component: () => import( '../views/3dtiles/NewYorkModel.vue')
      },
      {
        path: '/bloom',
        name: 'bloom',
        component: () => import( '../views/postProcess/bloom.vue')
      },
      {
        path: '/flyView',
        name: 'flyView',
        component: () => import( '../views/other/flyView.vue')
      },
      {
        path: '/mls',
        name: 'mls',
        component: () => import( '../views/other/measureLineSpace.vue')
      },
      {
        path: '/mas',
        name: 'mas',
        component: () => import( '../views/other/measureAreaSpace.vue')
      },
      {
        path: '/globeColor',
        name: 'globeColor',
        component: () => import( '../views/other/globeColor.vue')
      },
      {
        path: '/limitRange',
        name: 'limitRange',
        component: () => import( '../views/other/limitRange.vue')
      },
      {
        path: '/model',
        name: 'model',
        component: () => import( '../views/other/model.vue')
      },
      {
        path: '/goSH',
        name: 'goSH',
        component: () => import( '../views/other/goSH.vue')
      },
      {
        path: '/clampToModel',
        name: 'clampToModel',
        component: () => import( '../views/other/clampToModel.vue')
      },
      {
        path: '/clampToTerrian',
        name: 'clampToTerrian',
        component: () => import( '../views/terrain/clampToTerrian.vue')
      },
      {
        path: '/customFeature',
        name: 'customFeature',
        component: () => import( '../views/postProcess/customFeature.vue')
      },
      {
        path: '/drawLine',
        name: 'drawLine',
        component: () => import( '../views/other/drawLine1.vue')
      },
      {
        path: '/combineecharts',
        name: 'combineecharts',
        component: () => import( '../views/other/combineEcharts.vue')
      },
      {
        path: '/combinethree',
        name: 'combinethree',
        component: () => import( '../views/other/combineThree.vue')
      },
      {
        path: '/drawArea',
        name: 'drawArea',
        component: () => import( '../views/other/drawArea.vue')
      },
      {
        path: '/topoJson',
        name: 'topoJson',
        component: () => import( '../views/other/topoJson.vue')
      },
      {
        path: '/moveOnTrail',
        name: 'moveOnTrail',
        component: () => import( '../views/other/moveOnTrail.vue')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import( '../views/other/video.vue')
      },
      {
        path: '/splitTerrain',
        name: 'splitTerrain',
        component: () => import( '../views/terrain/geoSplitTerrain.vue')
      },
      {
        path: '/geoSplitTerrain2',
        name: 'geoSplitTerrain2',
        component: () => import( '../views/terrain/geoSplitTerrain2.vue')
      },
      {
        path: '/globeInner',
        name: 'globeInner',
        component: () => import( '../views/globe/globeInner.vue')
      },
      {
        path: '/alphaBg',
        name: 'alphaBg',
        component: () => import( '../views/globe/alphaBg.vue')
      },
      {
        path: '/syncView',
        name: 'syncView',
        component: () => import( '../views/globe/syncView.vue')
      },
      {
        path: '/imagerSplit',
        name: 'imagerSplit',
        component: () => import( '../views/imager/imagerSplit.vue')
      },
      {
        path: '/firePlane',
        name: 'firePlane',
        component: () => import( '../views/particle/firePlane.vue')
      },
      {
        path: '/snow',
        name: 'snow',
        component: () => import( '../views/particle/snow.vue')
      },
      {
        path: '/rain',
        name: 'rain',
        component: () => import( '../views/particle/rain.vue')
      },
      {
        path: '/wisdomcity',
        name: 'wisdomcity',
        component: () => import( '../views/wisdomCity/wisdomCity.vue')
      },
      {
        path: '/dynamicRadar',
        name: 'dynamicRadar',
        component: () => import( '../views/wisdomCity/dynamicRadar.vue')
      },
      {
        path: '/electBox',
        name: 'electBox',
        component: () => import( '../views/wisdomCity/electBox.vue')
      },
      {
        path: '/spreadWall',
        name: 'spreadWall',
        component: () => import( '../views/wisdomCity/spreadWall.vue')
      },
      {
        path: '/scatterCircle',
        name: 'scatterCircle',
        component: () => import( '../views/wisdomCity/scatterCircle.vue')
      },
      {
        path: '/radar',
        name: 'radar',
        component: () => import( '../views/wisdomCity/radar.vue')
      },
      {
        path: '/lightRoad',
        name: 'lightRoad',
        component: () => import( '../views/wisdomCity/lightRoad.vue')
      },
      {
        path: '/threeCityModel',
        name: 'threeCityModel',
        component: () => import( '../views/wisdomCity/threeCityModel.vue')
      },
      {
        path: '/floatBox',
        name: 'floatBox',
        component: () => import( '../views/wisdomCity/floatBox.vue')
      },
      {
        path: '/indexCity',
        name: 'indexCity',
        component: () => import( '../views/wisdomCity/indexCity.vue')
      },
      {
        path: '/heatmap',
        name: 'heatmap',
        component: () => import( '../views/wisdomCity/heatmap.vue')
      },
      {
        path: '/myInfoBox',
        name: 'myInfoBox',
        component: () => import( '../views/wisdomCity/myInfoBox.vue')
      },
    ]
  }
]

const router = new VueRouter({
  routes
})


const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router

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

(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-60ce3288"],{"07a2":function(e,i,n){"use strict";n.r(i);var a,t,s,o,m,l=function(){var e=this,i=e.$createElement,n=e._self._c||i;return n("div",{attrs:{id:"cesiumContainer1"}})},r=[],c=n("acc5"),d=(n("5b17"),null),u=12,p=1e5,h={name:"model",props:{},data:function(){return{count:0,modelsData:[["SampleData/models/CesiumAir/Cesium_Air.glb",5e3],["SampleData/models/CesiumDrone/CesiumDrone.glb",150],["SampleData/models/GroundVehicle/GroundVehicle.glb",0],["SampleData/models/CesiumBalloon/CesiumBalloon.glb",1e3],["SampleData/models/CesiumMilkTruck/CesiumMilkTruck.glb",0],["SampleData/models/CesiumMan/Cesium_Man.glb",0],["SampleData/models/DracoCompressed/CesiumMilkTruck.gltf",0]]}},mounted:function(){this.init()},methods:{init:function(){d=new c["rb"]("cesiumContainer1",{shouldAnimate:!0,terrainProvider:c["tb"]()}),d._cesiumWidget._creditContainer.style.display="none",d.scene.camera.setView({destination:new c["e"](277096.634865404,5647834.481964232,2985563.7039122293),orientation:{heading:4.731089976107251,pitch:-.32003481981370063}}),this.addParticleSystem()},addParticleSystem:function(){function e(e,i){o=c["e"].normalize(e.position,o),c["e"].multiplyByScalar(o,c["P"].randomBetween(-30,-300),o),e.velocity=c["e"].add(e.velocity,o,e.velocity);var n=c["e"].distance(m.camera.position,e.position);e.endColor.alpha=n>p?0:s.endColor.alpha/(n/p+.1)}m=d.scene,a=new c["d"](u,u),t=new c["d"](2*u,2*u),o=new c["e"],s=new c["S"]({modelMatrix:new c["R"].fromTranslation(d.scene.camera.position),minimumSpeed:-1,maximumSpeed:0,lifetime:15,emitter:new c["ib"](p),startScale:.5,endScale:1,image:"SampleData/snowflake_particle.png",emissionRate:7e3,startColor:c["q"].WHITE.withAlpha(0),endColor:c["q"].WHITE.withAlpha(1),minimumImageSize:a,maximumImageSize:t,updateCallback:e}),d.scene.primitives.add(s),d.scene.skyAtmosphere.hueShift=-.97,d.scene.skyAtmosphere.saturationShift=.25,d.scene.skyAtmosphere.brightnessShift=-.4,d.scene.fog.density=25e-5,d.scene.fog.minimumBrightness=.01}}},f=h,S=(n("c4db"),n("c701")),C=Object(S["a"])(f,l,r,!1,null,"28f804d5",null);i["default"]=C.exports},c4db:function(e,i,n){"use strict";n("ef16")},ef16:function(e,i,n){}}]);
//# sourceMappingURL=chunk-60ce3288.202fe3e4.js.map
(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{312:function(t,e,r){t.exports={}},318:function(t,e,r){"use strict";r(312)},320:function(t,e,r){"use strict";r.r(e);r(217);var n={props:{height:{type:Number},fullHeight:{type:Boolean}},mounted:function(){this.setAnim()},watch:{height:function(){this.setAnim()}},methods:{setAnim:function(){var t=this.$gsap,e=this.$refs.scrollProgressBar,r=54;this.fullHeight&&(r=0),t.to(e,{height:"100vh",scrollTrigger:{trigger:e,start:"top top",end:"+=".concat(this.height-window.innerHeight-r,"px"),scrub:1.1}})}}},o=(r(318),r(15)),component=Object(o.a)(n,(function(){return(0,this._self._c)("div",{ref:"scrollProgressBar",staticClass:"scroll-progress-bar"})}),[],!1,null,null,null);e.default=component.exports}}]);
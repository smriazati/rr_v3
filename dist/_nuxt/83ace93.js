(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{317:function(t,e,n){t.exports={}},330:function(t,e,n){"use strict";n(317)},340:function(t,e,n){"use strict";n.r(e);n(12),n(18);var o={props:{panels:{type:Array,required:!0}},data:function(){return{scrollTween:null,activeSection:0,currentSection:0}},mounted:function(){var t=this;this.$nextTick((function(){t.setNewAnim(),t.scrolledToEnd()}))},watch:{activeSection:function(){this.activeSection===this.panelNum-1&&this.$emit("scrolled-to-end")}},computed:{panelNum:function(){return this.panels.length}},beforeDestroy:function(){var t=this.$ScrollTrigger,e=this.$gsap;t.killAll(),e.set("body",{height:"auto"})},methods:{goToSection:function(i){var t=this,e=this.$gsap;this.setActiveSection(i),this.scrollTween=e.to(window,{scrollTo:{y:i*innerHeight,autoKill:!1},duration:.8,ease:"ease-in-out",onComplete:function(){return t.scrollTween=null},overwrite:!0})},setActiveSection:function(i){this.activeSection=i},scrolledToEnd:function(){var t=this,e=this.$ScrollTrigger,n=this.$gsap,o=this.$refs.textScroller,r=n.utils.toArray(".panel");if(o&&e&&r){var c=r.length*innerHeight-innerHeight/1.5+"px";e.create({start:"0px",end:"+=".concat(c," bottom"),onLeave:function(e){e.progress,e.direction,e.isActive;t.$emit("scrolled-to-end")}})}},setNewAnim:function(){var t=this,e=this.$gsap,n=this.$ScrollTrigger,o=e.utils.toArray(".panel");this.currentSection=o[0],e.defaults({overwrite:"auto",duration:.3}),e.set("body",{height:o.length*innerHeight+"px"}),o.forEach((function(section,i){n.create({start:function(){return(i-.5)*innerHeight},end:function(){return(i+.5)*innerHeight},onToggle:function(e){return e.isActive&&t.setNewSection(section)},toggleClass:{targets:section,className:"is-active"}})}))},setNewSection:function(t){var e=this.$gsap;t!==this.currentSection&&(e.to(this.currentSection,{autoAlpha:0}),e.to(t,{autoAlpha:1}),this.currentSection=t)},setTextScrollerAnim:function(){var t=this,e=this.$gsap,n=this.$ScrollTrigger;e.utils.toArray(".panel").forEach((function(e,i){n.create({trigger:e,start:"top-=".concat(window.innerWidth/4," top"),end:"bottom top",onToggle:function(e){e.isActive&&t.setActiveSection(i)},toggleClass:{targets:e,className:"is-active"}})}))}}},r=(n(330),n(15)),component=Object(r.a)(o,(function(){var t=this,e=t._self._c;return e("div",{ref:"textScroller",staticClass:"text-scroller"},t._l(t.panels,(function(n,o){return e("div",{key:o,staticClass:"panel"},[e("div",{staticClass:"text-wrapper light centered flex-col"},[e("p",[e("LocalizationString",{attrs:{string:n}})],1),t._v(" "),0!==o?e("button",{staticClass:"flat up",on:{click:function(e){return t.goToSection(o-1)}}},[e("SystemIcon",{staticClass:"icon icon-arrow-up",attrs:{type:"arrow",width:20,color:"light"}})],1):t._e(),t._v(" "),o<t.panelNum-1?e("button",{staticClass:"flat down",on:{click:function(e){return t.goToSection(o+1)}}},[e("SystemIcon",{staticClass:"icon icon-arrow-down",attrs:{type:"arrow",width:20,color:"light"}})],1):t._e()])])})),0)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{LocalizationString:n(216).default,SystemIcon:n(218).default})}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{311:function(t,e,r){"use strict";r.r(e);r(24),r(23),r(28),r(12),r(33),r(18),r(34);var n=r(9),c=(r(217),r(25));function o(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function l(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?o(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):o(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var f={props:{img:{type:Object,required:!0},size:{type:Number,required:!1}},computed:l(l({},Object(c.b)("localization",{activeLanguage:function(t){return t.activeLanguage}})),{},{src:function(){return this.img&&this.img.img?this.img.img.asset:""},alt:function(){var t;if(!this.img)return"";if(!this.img.alt)return"";var e,r=null===(t=this.img)||void 0===t?void 0:t.alt[this.activeLanguage];if(r)return r;null===(e=this.img)||void 0===e||e.alt.en}})},O=r(15),component=Object(O.a)(f,(function(){var t=this,e=t._self._c;return e("div",[""===t.src||t.size?t._e():e("div",[e("img",{attrs:{src:t.$urlFor(t.src),alt:t.alt}})]),t._v(" "),""!==t.src&&t.size?e("div",[e("img",{attrs:{src:t.$urlFor(t.src).width(t.size),alt:t.alt}})]):t._e()])}),[],!1,null,null,null);e.default=component.exports}}]);
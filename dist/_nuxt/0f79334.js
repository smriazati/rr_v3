(window.webpackJsonp=window.webpackJsonp||[]).push([[40,22],{301:function(t,e,n){t.exports={}},302:function(t,e,n){"use strict";var r=n(2),o=n(303);r({target:"String",proto:!0,forced:n(304)("link")},{link:function(t){return o(this,"a","href",t)}})},303:function(t,e,n){"use strict";var r=n(4),o=n(31),c=n(16),l=/"/g,v=r("".replace);t.exports=function(t,e,n,r){var f=c(o(t)),d="<"+e;return""!==n&&(d+=" "+n+'="'+v(c(r),l,"&quot;")+'"'),d+">"+f+"</"+e+">"}},304:function(t,e,n){"use strict";var r=n(3);t.exports=function(t){return r((function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3}))}},305:function(t,e,n){"use strict";n(301)},306:function(t,e,n){"use strict";n.r(e);n(302),n(24),n(23),n(28),n(12),n(33),n(18),n(34);var r,o=n(9),c=n(8),l=n(88),v=(n(41),n(25)),f=n(48);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var h=Object(f.b)(r||(r=Object(l.a)(['*[_type == "','"]{\n  "prev": siteNavLabels.prev,\n  "next": siteNavLabels.next\n}[0]'])),"settings"),_={data:function(){return{labels:"",isCollapsed:!1}},fetch:function(){var t=this;return Object(c.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$sanity.fetch(h);case 2:t.labels=e.sent;case 3:case"end":return e.stop()}}),e)})))()},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(v.b)("localization",{activeLanguage:function(t){return t.activeLanguage}})),props:{message:{type:Object,required:!0},link:{type:String,required:!0},back:{type:Boolean,required:!1}}},m=_,y=(n(305),n(15)),component=Object(y.a)(m,(function(){var t,e,n,r,o=this,c=o._self._c;return c("nav",{ref:"pagination",staticClass:"pagination",class:o.back?"back-btn":""},[o._m(0),o._v(" "),c("nuxt-link",{staticClass:"wrapper",attrs:{to:{path:o.link,query:o.$route.query}}},[o.back?c("h3",{staticClass:"subheadline"},["en"==o.activeLanguage?c("span",[o._v("\n        "+o._s(null===(n=o.labels.prev)||void 0===n?void 0:n.en)+"\n      ")]):o._e(),o._v(" "),"uk"==o.activeLanguage?c("span",[o._v("\n        "+o._s(null===(r=o.labels.prev)||void 0===r?void 0:r.uk)+"\n      ")]):o._e()]):c("h3",{staticClass:"subheadline"},["en"==o.activeLanguage?c("span",[o._v("\n        "+o._s(null===(t=o.labels.next)||void 0===t?void 0:t.en)+"\n      ")]):o._e(),o._v(" "),"uk"==o.activeLanguage?c("span",[o._v("\n        "+o._s(null===(e=o.labels.next)||void 0===e?void 0:e.uk)+"\n      ")]):o._e()]),o._v(" "),c("span",{staticClass:"cta",attrs:{to:o.link}},[c("LocalizationString",{attrs:{string:o.message}}),o._v(" "),c("SystemIcon",{attrs:{type:"arrow",color:"light",width:25}})],1)])],1)}),[function(){var t=this._self._c;return t("div",{staticClass:"tree-icon"},[t("img",{attrs:{src:"/icons/tree.svg",alt:""}})])}],!1,null,null,null);e.default=component.exports;installComponents(component,{LocalizationString:n(216).default,SystemIcon:n(218).default})},403:function(t,e,n){t.exports={}},436:function(t,e,n){"use strict";n(403)},465:function(t,e,n){"use strict";n.r(e);n(29);var r,o=n(88),c=n(48),l=Object(c.b)(r||(r=Object(o.a)(['*[_type == "','"][0]{\n  nav\n}'])),"settings1"),v={asyncData:function(t){return t.$sanity.fetch(l)},data:function(){return{name:"intro-stories-individual",isPaginationVisible:!0,pageNames:{1:"Meet Luba Chomut",2:"Meet Yosef Zilberberg",3:"Meet Mania Schwartzman"}}},head:function(){return{title:this.pageNames[this.$route.params.id]}},methods:{showPagination:function(){this.isPaginationVisible=!0}}},f=(n(436),n(15)),component=Object(f.a)(v,(function(){var t,e,n=this,r=n._self._c;return r("div",{ref:"wrapper",staticClass:"stories-individual",class:n.name},[r("h1",{staticClass:"visually-hidden"},[n._v(n._s(n.name))]),n._v(" "),r("div",{ref:"storyWrapper"},[r("StoriesIntro",{attrs:{subjectId:"subject".concat(this.$route.params.id),sectionId:"intro",schema:"story1_".concat(this.$route.params.id)}})],1),n._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:n.isPaginationVisible,expression:"isPaginationVisible"}],staticClass:"pagination-row flex-row"},[r("Pagination",{attrs:{link:"/1/stories",message:null===(t=n.nav)||void 0===t?void 0:t.prev,back:!0}}),n._v(" "),r("Pagination",{attrs:{link:"/2",message:null===(e=n.nav)||void 0===e?void 0:e.next}})],1)])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{StoriesIntro:n(412).default,Pagination:n(306).default})}}]);
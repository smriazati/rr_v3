(window.webpackJsonp=window.webpackJsonp||[]).push([[53,13,22,23,32],{301:function(t,e,n){t.exports={}},302:function(t,e,n){"use strict";var r=n(2),c=n(303);r({target:"String",proto:!0,forced:n(304)("link")},{link:function(t){return c(this,"a","href",t)}})},303:function(t,e,n){"use strict";var r=n(4),c=n(31),o=n(16),l=/"/g,v=r("".replace);t.exports=function(t,e,n,r){var f=o(c(t)),d="<"+e;return""!==n&&(d+=" "+n+'="'+v(o(r),l,"&quot;")+'"'),d+">"+f+"</"+e+">"}},304:function(t,e,n){"use strict";var r=n(3);t.exports=function(t){return r((function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3}))}},305:function(t,e,n){"use strict";n(301)},306:function(t,e,n){"use strict";n.r(e);n(302),n(24),n(23),n(28),n(12),n(33),n(18),n(34);var r,c=n(9),o=n(8),l=n(88),v=(n(41),n(25)),f=n(48);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var h=Object(f.b)(r||(r=Object(l.a)(['*[_type == "','"]{\n  "prev": siteNavLabels.prev,\n  "next": siteNavLabels.next\n}[0]'])),"settings"),O={data:function(){return{labels:"",isCollapsed:!1}},fetch:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$sanity.fetch(h);case 2:t.labels=e.sent;case 3:case"end":return e.stop()}}),e)})))()},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(c.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(v.b)("localization",{activeLanguage:function(t){return t.activeLanguage}})),props:{message:{type:Object,required:!0},link:{type:String,required:!0},back:{type:Boolean,required:!1}}},j=O,m=(n(305),n(15)),component=Object(m.a)(j,(function(){var t,e,n,r,c=this,o=c._self._c;return o("nav",{ref:"pagination",staticClass:"pagination",class:c.back?"back-btn":""},[c._m(0),c._v(" "),o("nuxt-link",{staticClass:"wrapper",attrs:{to:{path:c.link,query:c.$route.query}}},[c.back?o("h3",{staticClass:"subheadline"},["en"==c.activeLanguage?o("span",[c._v("\n        "+c._s(null===(n=c.labels.prev)||void 0===n?void 0:n.en)+"\n      ")]):c._e(),c._v(" "),"uk"==c.activeLanguage?o("span",[c._v("\n        "+c._s(null===(r=c.labels.prev)||void 0===r?void 0:r.uk)+"\n      ")]):c._e()]):o("h3",{staticClass:"subheadline"},["en"==c.activeLanguage?o("span",[c._v("\n        "+c._s(null===(t=c.labels.next)||void 0===t?void 0:t.en)+"\n      ")]):c._e(),c._v(" "),"uk"==c.activeLanguage?o("span",[c._v("\n        "+c._s(null===(e=c.labels.next)||void 0===e?void 0:e.uk)+"\n      ")]):c._e()]),c._v(" "),o("span",{staticClass:"cta",attrs:{to:c.link}},[o("LocalizationString",{attrs:{string:c.message}}),c._v(" "),o("SystemIcon",{attrs:{type:"arrow",color:"light",width:25}})],1)])],1)}),[function(){var t=this._self._c;return t("div",{staticClass:"tree-icon"},[t("img",{attrs:{src:"/icons/tree.svg",alt:""}})])}],!1,null,null,null);e.default=component.exports;installComponents(component,{LocalizationString:n(216).default,SystemIcon:n(218).default})},311:function(t,e,n){"use strict";n.r(e);n(24),n(23),n(28),n(12),n(33),n(18),n(34);var r=n(9),c=(n(217),n(25));function o(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function l(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?o(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):o(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var v={props:{img:{type:Object,required:!0},size:{type:Number,required:!1}},computed:l(l({},Object(c.b)("localization",{activeLanguage:function(t){return t.activeLanguage}})),{},{src:function(){return this.img&&this.img.img?this.img.img.asset:""},alt:function(){var t;if(!this.img)return"";if(!this.img.alt)return"";var e,n=null===(t=this.img)||void 0===t?void 0:t.alt[this.activeLanguage];if(n)return n;null===(e=this.img)||void 0===e||e.alt.en}})},f=n(15),component=Object(f.a)(v,(function(){var t=this,e=t._self._c;return e("div",[""===t.src||t.size?t._e():e("div",[e("img",{attrs:{src:t.$urlFor(t.src),alt:t.alt}})]),t._v(" "),""!==t.src&&t.size?e("div",[e("img",{attrs:{src:t.$urlFor(t.src).width(t.size),alt:t.alt}})]):t._e()])}),[],!1,null,null,null);e.default=component.exports},329:function(t,e,n){t.exports={}},339:function(t,e,n){t.exports={}},346:function(t,e,n){"use strict";n(329)},353:function(t,e,n){"use strict";n.r(e);n(29),n(24),n(23),n(28),n(12),n(33),n(18),n(34);var r,c=n(9),o=n(8),l=n(88),v=(n(41),n(25)),f=n(48);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function h(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(c.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var O=Object(f.b)(r||(r=Object(l.a)(['\n{\n  "settings": *[_id == "settings"][0]{\n    "sections": siteNavLabels.sections\n  },\n  "subjects": *[_id == "subjects"][0]{\n    subject1, subject2, subject3\n  }\n}\n']))),j={fetch:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$sanity.fetch(O);case 2:t.content=e.sent;case 3:case"end":return e.stop()}}),e)})))()},data:function(){return{content:""}},props:{subjectId:{type:String},sectionId:{type:String}},computed:h(h({},Object(v.b)("localization",{activeLanguage:function(t){return t.activeLanguage}})),{},{activeSection:function(){var section={title:""};return this.sectionId&&this.content.settings&&this.content.settings.sections?(section.title=this.content.settings.sections[this.sectionId],section):section},activeSubject:function(){var t,e,n={name:"",image:""};return this.subjectId&&this.content.subjects?(n.name=null===(t=this.content.subjects[this.subjectId])||void 0===t?void 0:t.name,n.image=null===(e=this.content.subjects[this.subjectId])||void 0===e?void 0:e.img,n):n}}),mounted:function(){},methods:{}},m=(n(346),n(15)),component=Object(m.a)(j,(function(){var t,e=this,n=e._self._c;return n("header",{ref:"header",staticClass:"story-title-wrapper"},[n("div",[n("div",{staticClass:"banner"}),e._v(" "),n("div",{staticClass:"text-wrapper"},[e.activeSection?n("h2",{staticClass:"subheadline collapsed-mb"},[n("LocalizationString",{attrs:{string:e.activeSection.title}})],1):e._e(),e._v(" "),e.activeSubject?n("h1",{staticClass:"collapsed-mb"},[n("LocalizationString",{attrs:{string:null===(t=e.activeSubject)||void 0===t?void 0:t.name}})],1):e._e()]),e._v(" "),e.activeSubject?n("div",{staticClass:"image-wrapper"},[n("LocalizationImageNoCaption",{attrs:{img:e.activeSubject.image,size:150}})],1):e._e()])])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{LocalizationString:n(216).default,LocalizationImageNoCaption:n(311).default})},366:function(t,e,n){"use strict";n(339)},376:function(t,e,n){"use strict";n.r(e);n(302),n(24),n(23),n(28),n(12),n(33),n(18),n(34);var r,c=n(9),o=n(8),l=n(88),v=(n(41),n(25)),f=n(48);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var h=Object(f.b)(r||(r=Object(l.a)(['*[_type == "','"]{\n  "prev": siteNavLabels.prev,\n  "next": siteNavLabels.next\n}[0]'])),"settings"),O={data:function(){return{labels:"",isCollapsed:!1}},fetch:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$sanity.fetch(h);case 2:t.labels=e.sent;case 3:case"end":return e.stop()}}),e)})))()},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(c.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(v.b)("localization",{activeLanguage:function(t){return t.activeLanguage}})),props:{message:{type:Object,required:!0},link:{type:String,required:!0},hash:{type:String,required:!0},back:{type:Boolean,required:!1}}},j=O,m=(n(366),n(15)),component=Object(m.a)(j,(function(){var t,e,n,r,c=this,o=c._self._c;return o("nav",{ref:"pagination",staticClass:"pagination",class:c.back?"back-btn":""},[c._m(0),c._v(" "),o("nuxt-link",{staticClass:"wrapper",attrs:{to:{path:c.link,hash:"#".concat(c.hash),query:c.$route.query}}},[c.back?o("h3",{staticClass:"subheadline"},["en"==c.activeLanguage?o("span",[c._v("\n                "+c._s(null===(n=c.labels.prev)||void 0===n?void 0:n.en)+"\n            ")]):c._e(),c._v(" "),"uk"==c.activeLanguage?o("span",[c._v("\n                "+c._s(null===(r=c.labels.prev)||void 0===r?void 0:r.uk)+"\n            ")]):c._e()]):o("h3",{staticClass:"subheadline"},["en"==c.activeLanguage?o("span",[c._v("\n                "+c._s(null===(t=c.labels.next)||void 0===t?void 0:t.en)+"\n            ")]):c._e(),c._v(" "),"uk"==c.activeLanguage?o("span",[c._v("\n                "+c._s(null===(e=c.labels.next)||void 0===e?void 0:e.uk)+"\n            ")]):c._e()]),c._v(" "),o("span",{staticClass:"cta",attrs:{to:c.link}},[o("LocalizationString",{attrs:{string:c.message}}),c._v(" "),o("SystemIcon",{attrs:{type:"arrow",color:"light",width:25}})],1)])],1)}),[function(){var t=this._self._c;return t("div",{staticClass:"tree-icon"},[t("img",{attrs:{src:"/icons/tree.svg",alt:""}})])}],!1,null,null,null);e.default=component.exports;installComponents(component,{LocalizationString:n(216).default,SystemIcon:n(218).default})},406:function(t,e,n){t.exports={}},439:function(t,e,n){"use strict";n(406)},467:function(t,e,n){"use strict";n.r(e);n(29);var r,c=n(88),o=n(48),l={asyncData:function(t){var e=t.$sanity,n=t.params,l=Object(o.b)(r||(r=Object(c.a)(['\n        {\n            "nav": *[_id == "','"]{\n                nav\n            }[0],\n            "metadata": *[_id == "story4_','"][0]{\n                pageMetadata\n            }\n        }\n        '])),"settings4",n.id);return e.fetch(l)},data:function(){return{name:"aftermath-stories-individual",sectionId:"aftermath",isPaginationVisible:!0}},head:function(){var t;return{title:this.$setPageTitle(null===(t=this.metadata)||void 0===t?void 0:t.pageMetadata)}}},v=(n(439),n(15)),component=Object(v.a)(l,(function(){var t,e,n=this,r=n._self._c;return r("div",{ref:"story",staticClass:"story-wrapper",class:n.name},[r("div",{staticClass:"page-grid"},[r("div",{staticClass:"title"},[r("StoryTitle",{attrs:{subjectId:"subject".concat(this.$route.params.id),sectionId:n.sectionId}})],1),n._v(" "),r("div",{ref:"theStory",staticClass:"story"},[r("StoriesAftermath",{attrs:{schema:"story4_".concat(this.$route.params.id)}})],1),n._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:n.isPaginationVisible,expression:"isPaginationVisible"}],staticClass:"pagination-row flex-row"},[r("PaginationHash",{attrs:{link:"/aftermath/stories",hash:"stories",message:null===(t=n.nav)||void 0===t||null===(t=t.nav)||void 0===t?void 0:t.prev,back:!0}}),n._v(" "),r("Pagination",{attrs:{link:"/conclusion",message:null===(e=n.nav)||void 0===e||null===(e=e.nav)||void 0===e?void 0:e.next}})],1)])])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{StoryTitle:n(353).default,StoriesAftermath:n(413).default,PaginationHash:n(376).default,Pagination:n(306).default})}}]);
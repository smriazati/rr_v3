(window.webpackJsonp=window.webpackJsonp||[]).push([[59,13,16,24,29,30],{307:function(t,e,n){"use strict";n.r(e);n(24),n(23),n(28),n(12),n(33),n(18),n(34);var r=n(9),o=n(25);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function l(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var f={props:{content:{type:Object,required:!1}},computed:l(l({},Object(o.b)("localization",{activeLanguage:function(t){return t.activeLanguage}})),{},{activeString:function(){return this.activeLanguage&&this.content?this.content[this.activeLanguage]:""}})},d=n(15),component=Object(d.a)(f,(function(){var t,e,n=this,r=n._self._c;return r("div",[n.content?r("div",[n.activeString?r("div",[r("SanityContent",{attrs:{blocks:null===(t=n.activeString)||void 0===t?void 0:t.rte}})],1):r("div",[r("SanityContent",{attrs:{blocks:null===(e=n.content)||void 0===e||null===(e=e.en)||void 0===e?void 0:e.rte}})],1)]):n._e()])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{SanityContent:n(310).default})},309:function(t,e,n){"use strict";function r(t){return null!==t&&"object"==typeof t}function o(t,e,n=".",c){if(!r(e))return o(t,{},n,c);const l=Object.assign({},e);for(const e in t){if("__proto__"===e||"constructor"===e)continue;const f=t[e];null!=f&&(c&&c(l,e,f,n)||(Array.isArray(f)&&Array.isArray(l[e])?l[e]=l[e].concat(f):r(f)&&r(l[e])?l[e]=o(f,l[e],(n?`${n}.`:"")+e.toString(),c):l[e]=f))}return l}function c(t){return(...e)=>e.reduce(((p,e)=>o(p,e,"",t)),{})}n.r(e);const l=c();l.fn=c(((t,e,n,r)=>{if(void 0!==t[e]&&"function"==typeof n)return t[e]=n(t[e]),!0})),l.arrayFn=c(((t,e,n,r)=>{if(Array.isArray(t[e])&&"function"==typeof n)return t[e]=n(t[e]),!0})),l.extend=c,e.default=l},310:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});function r(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}const o=r(n(309)),c={types:{span:"span",image:"img"},marks:{strong:"strong",em:"em",link:"a"},styles:{h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",normal:"p",blockquote:"blockquote"},listItem:"li",container:"div"};let l=1;function f(t){if(!t)return{};const e=Object.entries(t).reduce(((t,[e,n])=>{switch(!0){case["_key","key"].includes(e):return t.key=n||null,t;case["class","href","src"].includes(e):return t.attrs[e]=n,t;case["_type"].includes(e):return t;default:return t.props[e]=n,t}}),{props:{},attrs:{}});return e.props={level:l,...e.props},e}function d(t,e){if(!t)return;const{_type:n,listItem:r}=t;return r?e.listItem||"li":n&&n in e.types?e.types[n]:n&&n in e.marks?e.marks[n]:void 0}function y(t,content,[mark,...e]=[],n=c,r=[]){if(!mark)return content;const o=mark in n.marks?{_type:mark,_key:""}:r.find((t=>t._key===mark));return t(d(o,n)||"span",f(o),[y(t,content,e,n,r)])}function h(t,e){const{length:n}=t;if(!e.level)return t.push(e),t;const{_type:r,children:o,level:c}=t[n-1]||{};return"list"===r&&o?c===e.level?o.push(e):h(o,e):t.push({_type:"list",children:[e],level:e.level}),t}function v(t,e,n,r=!1){return(r?e:e.reduce(h,[])).map((e=>{const r=function(t,{style:style,listItem:e},n,r){const o=style?style.match(/^h(\d)$/):[];return!e&&o&&o.length>1&&(l=Number(o[1])),!e&&style&&n.styles[style]?t(n.styles[style],{},r):r}(t,e,n,function(t,e,content,n){const r=d(e,n);return r?[t(r,f(e),content)]:content}(t,e,"block"===e._type?(e.children||[]).map((r=>"span"!==r._type?t(d(r,n)||"span",f(r),[y(t,r.text,r.marks,n,e.markDefs)]):y(t,r.text,r.marks,n,e.markDefs))):[],n));return r}))}const m={name:"SanityContent",functional:!0,props:{blocks:{type:Array,default:()=>[]},serializers:{type:Object,default:()=>({})},renderContainerOnSingleChild:{type:Boolean,default:!1}},render(t,{props:e,data:data}){const n=o.default(e.serializers,c);return n.types.list=n.types.list||{name:"ListComponent",functional:!0,props:{children:{type:Array,default:()=>[]}},render:(h2,{props:t})=>h2(t.children.length&&"number"===t.children[0].listItem?"ol":"ul",{},v(h2,t.children,n,!0))},t(n.container,data,v(t,e.blocks||[],n))}};e.SanityContent=m,e.default=m},311:function(t,e,n){"use strict";n.r(e);n(24),n(23),n(28),n(12),n(33),n(18),n(34);var r=n(9),o=(n(217),n(25));function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function l(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var f={props:{img:{type:Object,required:!0},size:{type:Number,required:!1}},computed:l(l({},Object(o.b)("localization",{activeLanguage:function(t){return t.activeLanguage}})),{},{src:function(){return this.img&&this.img.img?this.img.img.asset:""},alt:function(){var t;if(!this.img)return"";if(!this.img.alt)return"";var e,n=null===(t=this.img)||void 0===t?void 0:t.alt[this.activeLanguage];if(n)return n;null===(e=this.img)||void 0===e||e.alt.en}})},d=n(15),component=Object(d.a)(f,(function(){var t=this,e=t._self._c;return e("div",[""===t.src||t.size?t._e():e("div",[e("img",{attrs:{src:t.$urlFor(t.src),alt:t.alt}})]),t._v(" "),""!==t.src&&t.size?e("div",[e("img",{attrs:{src:t.$urlFor(t.src).width(t.size),alt:t.alt}})]):t._e()])}),[],!1,null,null,null);e.default=component.exports},337:function(t,e,n){t.exports={}},360:function(t,e,n){"use strict";n(337)},373:function(t,e,n){"use strict";n.r(e);var r,o=n(8),c=n(88),l=(n(29),n(49),n(42),n(50),n(55),n(24),n(12),n(56),n(71),n(51),n(36),n(23),n(72),n(73),n(52),n(41),n(48));function f(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return d(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return d(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0,r=function(){};return{s:r,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,l=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return c=t.done,t},e:function(t){l=!0,o=t},f:function(){try{c||null==n.return||n.return()}finally{if(l)throw o}}}}function d(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}var y=Object(l.b)(r||(r=Object(c.a)(['*[_type == "','"]{\n  "sections": siteNavLabels.sections\n}[0]'])),"settings"),h={data:function(){return{sections:""}},fetch:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$sanity.fetch(y);case 2:if(data=e.sent){e.next=5;break}return e.abrupt("return");case 5:t.sections=data.sections;case 6:case"end":return e.stop()}}),e)})))()},computed:{sectionTitle:function(){if(this.sections&&this.$route&&this.$route.name){var t,e,n=this.sections,r=this.$route.name.slice(),o=r.includes("-")?r.substr(0,r.indexOf("-")):r,c=f(Object.keys(n).map((function(section){return section})));try{for(c.s();!(e=c.n()).done;){var l=e.value;l===o&&(t=n[l])}}catch(t){c.e(t)}finally{c.f()}return t}}}},v=n(15),component=Object(v.a)(h,(function(){var t=this._self._c;return t("div",[t("h2",{staticClass:"subheadline collapsed-mb"},[t("LocalizationString",{attrs:{string:this.sectionTitle}})],1)])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{LocalizationString:n(216).default})},374:function(t,e,n){"use strict";n.r(e);n(89),n(29);var r,o=n(8),c=n(88),l=(n(41),n(48)),f=Object(l.b)(r||(r=Object(c.a)(['*[_type == "','"]{\n    subject1, subject2, subject3\n  }[0]'])),"subjects"),d={fetch:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$sanity.fetch(f);case 2:t.subjects=e.sent;case 3:case"end":return e.stop()}}),e)})))()},fetchOnServer:!1,data:function(){return{subjects:""}},props:{subtitle:{type:Object},title:{type:Object},subjectCTA:{type:Object},route:{type:String}},computed:{routeSection:function(){if(this.$route&&this.$route.name){var t=this.$route.name;return t.substr(0,t.indexOf("-"))}}}},y=(n(360),n(15)),component=Object(y.a)(d,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"stories-subjects-wrapper",attrs:{id:"stories"}},[e("div",{staticClass:"content-wrapper"},[e("div",{staticClass:"text-wrapper"},[t.title?e("h2",{staticClass:"h1 title collapsed-mb"},[e("LocalizationString",{attrs:{string:t.title}})],1):t._e(),t._v(" "),t.subtitle?e("p",{staticClass:"small"},[e("LocalizationString",{attrs:{string:t.subtitle}})],1):t._e()]),t._v(" "),e("div",{staticClass:"card-row"},t._l(t.subjects,(function(n,r,o){return e("nuxt-link",{key:o,staticClass:"card",attrs:{to:{path:"/".concat(t.routeSection,"/stories/").concat(o+1),query:t.$route.query}}},[e("figure",{staticClass:"image-wrapper"},[e("div",{staticClass:"img"},[e("LocalizationImageNoCaption",{attrs:{img:n.img}})],1),t._v(" "),e("figcaption",[e("LocalizationString",{attrs:{string:n.name}})],1)]),t._v(" "),e("div",{staticClass:"button-wrapper"},[t.subjectCTA?e("button",{ref:"button",refInFor:!0,staticClass:"bright full-width"},[e("nuxt-link",{attrs:{to:{path:"/".concat(t.routeSection,"/stories/").concat(o+1),query:t.$route.query}}},[e("span",[e("LocalizationString",{attrs:{string:t.subjectCTA}})],1)])],1):t._e()])])})),1)])])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{LocalizationString:n(216).default,LocalizationImageNoCaption:n(311).default})},390:function(t,e,n){t.exports={}},423:function(t,e,n){"use strict";n(390)},451:function(t,e,n){"use strict";n.r(e);n(29);var r,o=n(88),c=n(48),l=Object(c.b)(r||(r=Object(o.a)(['*[_type == "','"][0]'])),"intro1"),f={asyncData:function(t){return t.$sanity.fetch(l)},data:function(){return{name:"introduction-stories"}},mounted:function(){document.querySelector("body").style.height="auto"},head:function(){return{title:this.$setPageTitle(this.pageMetadata)}}},d=(n(423),n(15)),component=Object(d.a)(f,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"stories-page-wrapper",class:t.name},[e("div",{staticClass:"intro-text-wrapper text-wrapper"},[e("StoriesSubheadline"),t._v(" "),e("h1",{staticClass:"center"},[e("LocalizationString",{attrs:{string:t.title}})],1),t._v(" "),e("LocalizationRte",{attrs:{content:t.mainText}})],1),t._v(" "),e("StoriesSubjects",{attrs:{title:t.subhead,subtitle:t.subheadText,subjectCTA:t.subjectCTA,route:"intro"}})],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{StoriesSubheadline:n(373).default,LocalizationString:n(216).default,LocalizationRte:n(307).default,StoriesSubjects:n(374).default})}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[17,18],{335:function(t,e,n){t.exports={}},348:function(t,e,n){"use strict";n.r(e);n(24),n(23),n(28),n(12),n(33),n(18),n(34);var r=n(9),o=(n(217),n(42),n(50),n(25));function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function l(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var d={props:{item:{type:Object},index:{type:Number}},computed:l(l({},Object(o.b)("occupation",{viewedStories:function(t){return t.viewedStories}})),{},{isViewed:function(){return this.viewedStories?!!this.viewedStories.includes(this.index):null}}),methods:{setActiveStory:function(){this.$store.commit("occupation/setActiveStory",this.index)}}},m=n(15),component=Object(m.a)(d,(function(){var t=this,e=t._self._c;return e("li",{attrs:{id:"marker-".concat(t.index)}},[t.item?e("span",{staticClass:"hover-cursor",class:t.isViewed?"viewed-marker":"",on:{click:t.setActiveStory}},[e("span",{staticClass:"icon"}),t._v(" "),e("LocalizationString",{attrs:{string:t.item.title}})],1):t._e()])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{LocalizationString:n(216).default})},358:function(t,e,n){"use strict";n(335)},371:function(t,e,n){"use strict";n.r(e);var r,o=n(8),c=n(88),l=(n(41),n(48)),d=Object(l.b)(r||(r=Object(c.a)(['\n{\n  "content" : *[_type == "settings2"][0],\n  "markers" : {\n    "marker1": *[_id == "marker1"][0]{\n      "title": content.title\n    },\n    "marker2": *[_id == "marker2"][0]{\n      "title": content.title\n    },\n      "marker3": *[_id == "marker3"][0]{\n      "title": content.title\n    },\n      "marker4": *[_id == "marker4"][0]{\n      "title": content.title\n    },\n      "marker5": *[_id == "marker5"][0]{\n      "title": content.title\n    },\n      "marker6": *[_id == "marker6"][0]{\n      "title": content.title\n    },\n  }\n}\n']))),m={data:function(){return{data:"",isExpanded:!1}},fetch:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$sanity.fetch(d);case 2:t.data=e.sent;case 3:case"end":return e.stop()}}),e)})))()},props:{markersData:{type:Array}},computed:{markersSorted:function(){if(!this.data)return null;if(!this.data.markers)return null;var t=["marker1","marker2","marker3","marker4","marker5","marker6"],e=[],n=this.data.markers;for(var r in n)n.hasOwnProperty(r)&&(r===t[0]&&(e[0]=n[r]),r===t[1]&&(e[1]=n[r]),r===t[2]&&(e[2]=n[r]),r===t[3]&&(e[3]=n[r]),r===t[4]&&(e[4]=n[r]),r===t[5]&&(e[5]=n[r]));return e}},methods:{toggleMenu:function(){this.isExpanded=!this.isExpanded},showIntro:function(){this.$emit("show-intro")},showTimeline:function(){this.$emit("show-timeline")}}},f=(n(358),n(15)),component=Object(f.a)(m,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"map-controls",class:t.isExpanded?"expanded":"collapsed"},[t.isExpanded?e("button",{staticClass:"flat menu-toggle",on:{click:t.toggleMenu}},[e("span",{staticClass:"visually-hidden"},[t._v("Close Map Menu")]),t._v(" "),e("SystemIcon",{attrs:{type:"close",color:"light",width:30}})],1):e("button",{staticClass:"menu-toggle",on:{click:t.toggleMenu}},[e("span",{staticClass:"text"},[t._v("Open Map Menu")])]),t._v(" "),e("h2",{staticClass:"visually-hidden"},[t._v("Map controls")]),t._v(" "),e("div",{staticClass:"map-box-wrapper"},[t.data.content?e("nav",{staticClass:"map-options map-box"},[e("h3",[e("LocalizationString",{attrs:{string:t.data.content.optionsTitle}})],1),t._v(" "),e("ul",[e("li",{staticClass:"hover-cursor",on:{click:t.showIntro}},[t._m(0),t._v(" "),e("LocalizationString",{attrs:{string:t.data.content.instructionsLabel}})],1),t._v(" "),e("li",{staticClass:"hover-cursor",attrs:{id:"recenterMap"}},[t._m(1),t._v(" "),e("LocalizationString",{attrs:{string:t.data.content.recenterLabel}})],1)])]):t._e(),t._v(" "),e("nav",{staticClass:"map-marker-list map-box"},[t.data.content?e("h3",[e("LocalizationString",{attrs:{string:t.data.content.markersTitle}})],1):t._e(),t._v(" "),t.markersSorted?e("ul",t._l(t.markersSorted,(function(t,n){return e("MapControlsMarkerListItem",{key:n,attrs:{item:t,index:n}})})),1):t._e()])])])}),[function(){var t=this._self._c;return t("span",{staticClass:"icon"},[t("img",{staticClass:"icon icon-instructions icon-light",attrs:{src:"/icons/instructions.svg",alt:"view instructions icon"}})])},function(){var t=this._self._c;return t("span",{staticClass:"icon"},[t("img",{staticClass:"icon icon-recenter icon-light",attrs:{src:"/icons/recenter.svg",alt:"recenter the map icon"}})])}],!1,null,null,null);e.default=component.exports;installComponents(component,{SystemIcon:n(218).default,LocalizationString:n(216).default,MapControlsMarkerListItem:n(348).default})}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[50,35],{362:function(t,e,n){t.exports={}},378:function(t,e,n){"use strict";n(362)},398:function(t,e,n){t.exports={}},410:function(t,e,n){"use strict";n.r(e);var r={props:{animate:{type:Boolean}}},o=(n(378),n(15)),component=Object(o.a)(r,(function(){var t=this._self._c;return t("figure",{ref:"logo",staticClass:"exhibit-logo"},[t("img",{attrs:{src:"/images/logo.png",alt:"A logo that says Roots of Resistance, with the symbol of a tree. The tree  shows both its branches and roots. "}})])}),[],!1,null,null,null);e.default=component.exports},431:function(t,e,n){"use strict";n(398)},459:function(t,e,n){"use strict";n.r(e);n(29);var r,o=n(88),l=(n(49),n(48)),c=Object(l.b)(r||(r=Object(o.a)(['*[_type == "','"][0]'])),"intro0"),f={asyncData:function(t){return t.$sanity.fetch(c)},data:function(){return{name:"home"}},head:function(){return{title:this.name.charAt(0).toUpperCase()+this.name.slice(1)}}},d=(n(431),n(15)),component=Object(d.a)(f,(function(){var t=this,e=t._self._c;return e("div",{class:t.name},[e("div",{ref:"bg",staticClass:"bg-image"},[e("img",{attrs:{src:"/images/01/bgimg.jpg",alt:"Painting of figure walking into a forest"}})]),t._v(" "),e("header",{staticClass:"flex-col align-center"},[e("div",{staticClass:"logo-wrapper"},[e("SystemLogo")],1),t._v(" "),e("div",{staticClass:"text-wrapper centered"},[e("h1",{staticClass:"subheadline collapsed-mb"},[t.subhead?e("div",[e("LocalizationString",{attrs:{string:t.subhead}})],1):t._e()]),t._v(" "),e("h2",{staticClass:"h1 collapsed-mb"},[t.title?e("div",[e("LocalizationString",{attrs:{string:t.title}})],1):t._e()])]),t._v(" "),e("button",{ref:"button",staticClass:"bright full-width"},[e("nuxt-link",{attrs:{to:"/1/"}},[t.ctaText?e("div",[e("LocalizationString",{attrs:{string:t.ctaText}})],1):t._e()])],1)]),t._v(" "),e("footer",{ref:"warning",staticClass:"content-warning"},[e("div",{staticClass:"text-wrapper centered"},[e("p",[t.warning?e("span",[e("LocalizationString",{attrs:{string:t.warning}})],1):t._e()])])])])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{SystemLogo:n(410).default,LocalizationString:n(216).default})}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{328:function(n,t,e){n.exports={}},345:function(n,t,e){"use strict";e(328)},352:function(n,t,e){"use strict";e.r(t);var o,l=e(8),d=e(88),r=(e(12),e(18),e(41),e(48)),c=Object(r.b)(o||(o=Object(d.a)(['*[_type == "','"]{\n  "pause": vidPlaybackLabels.pause,\n  "play": vidPlaybackLabels.play\n}[0]'])),"settings"),v={fetch:function(){var n=this;return Object(l.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.$sanity.fetch(c);case 2:n.labels=t.sent;case 3:case"end":return t.stop()}}),t)})))()},props:{vidId:{type:String,required:!0}},data:function(){return{labels:"",options:{controls:!0,loop:!1,autoplay:!1,muted:!1,portrait:!1,title:!1,byline:!1},isPlaying:!1}},methods:{togglePlayback:function(){this.isPlaying?this.pauseVid():this.playVid()},playVid:function(){this.isPlaying=!0,this.$emit("on-vid-playing",!0),this.$refs.vid.play(),this.pauseOtherVids()},pauseOtherVids:function(){var n=this.$refs.vid;if(n){var t=n.$el.id,e=n.$el.closest("div.story");if(e)e.querySelectorAll("[id^='vimeo-player']:not([id='".concat(t,"'])")).forEach((function(n){var component=n.closest(".vimeo-component");if(null==component?void 0:component.classList.contains("playing")){var t,e=null==component||null===(t=component.parentElement)||void 0===t?void 0:t.querySelector(".pauseBtn");if(!e)return;e.click()}}))}},pauseVid:function(){console.log("pauseVid function now"),this.isPlaying=!1,this.$emit("on-vid-pausing",!1),this.$refs.vid.pause()},onVidLoaded:function(){},onVidReady:function(){},onVidPlaying:function(){this.isPlaying||(this.isPlaying=!0),this.$emit("on-vid-playing",!0)},onVidPaused:function(){console.log("on vid paused now"),this.isPlaying&&(this.isPlaying=!1),this.$emit("on-vid-pausing",!1)},onVidEnded:function(){this.isPlaying&&(this.isPlaying=!1),this.$emit("on-vid-ended")},onVidTimeUpdate:function(n,data,t){}}},y=v,f=(e(345),e(15)),component=Object(f.a)(y,(function(){var n,t,e=this,o=e._self._c;return o("div",{staticClass:"video-component-container"},[o("button",{staticClass:"pauseBtn",on:{click:e.togglePlayback}},[e.isPlaying?o("span",[o("LocalizationString",{attrs:{string:null===(n=e.labels)||void 0===n?void 0:n.pause}})],1):o("span",[o("LocalizationString",{attrs:{string:null===(t=e.labels)||void 0===t?void 0:t.play}})],1)]),e._v(" "),o("div",{staticClass:"vimeo-component",class:e.isPlaying?"playing":"",attrs:{id:e.vidId},on:{click:e.playVid}},[o("client-only",[e.vidId?o("div",{ref:"vidWrapper",staticClass:"iframe-wrapper"},[o("vimeo-player",{key:e.vidId,ref:"vid",attrs:{"video-url":"https://vimeo.com/".concat(e.vidId),"video-id":e.vidId,options:e.options},on:{ready:e.onVidReady,loaded:e.onVidLoaded,playing:e.onVidPlaying,pause:e.onVidPaused,timeupdate:e.onVidTimeUpdate,ended:e.onVidEnded}})],1):e._e()])],1)])}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{LocalizationString:e(216).default})}}]);
define(["require","exports","incremental-dom"],function(t,e,a){"use strict";var r={},s=(new Date).getTime()+1298;a.notifications.nodesDeleted=function(t){t.forEach(function(t){t.id&&r[t.id]&&r[t.id].detached&&r[t.id].detached(),t.id&&r[t.id]&&(r[t.id]=null,delete r[t.id])})};var n=function(){function e(){}return e.prototype.build=function(t){var a="";if(t.hostVars&&t.hostVars["key:id"]?(a=t.hostVars["key:id"],delete t.hostVars["key:id"]):t.staticVars&&t.staticVars["key:id"]&&(a=t.staticVars["key:id"],delete t.staticVars["key:id"]),t.classFactory.prototype.refresh||(t.classFactory.prototype.refresh=e.prototype.refresh),t.classFactory.prototype.content||(t.classFactory.prototype.content=e.prototype.content),a&&r[a])return r[a];if(a&&!r[a])return r[a]=new t.classFactory,r[a]._$target$_=t.target,r[a]._$key$_=a,r[a]._$tagName$_=t.tagName,this.changeAttrs.call(r[a],t.hostVars),this.changeAttrs.call(r[a],t.staticVars),r[a];var s=new t.classFactory;return s._$target$_=t.target,s._$tagName$_=t.tagName,this.changeAttrs.call(s,t.hostVars),this.changeAttrs.call(s,t.staticVars),s},e.prototype.content=function(t){return t?this._$content$_=t:this._$content$_&&this._$content$_(),this},e.prototype.changeAttrs=function(t,e){if(t)for(var a in t){var r=e&&("is"===a||"id"===a);if(!r){var s=a.toLowerCase().replace(/-(.)/g,function(t,e){return e.toUpperCase()}),n=t[a];if(s.indexOf(".")>-1){var o=s.split(".");this[o[0]][o[1]](n)}else{var i="set"+s.replace(/(^\D)/g,function(t,e){return t.toUpperCase()});this[i]?this[i](n):this[s]=n}}}},e.prototype.refresh=function(){var t=this;if(t._$target$_&&document.getElementById(t._$target$_))a.patch(document.getElementById(t._$target$_),t.render.bind(t),t),!t._$loaded$_&&t.attached&&(t._$loaded$_=!0,t.attached(),document.getElementById(t._$target$_).className=t._$style_name$_||t._$tag_name$_);else{t._$target$_=t._$target$_?t._$target$_:"uid_"+s++;var e=t._$style_name$_||t._$tag_name$_;a.elementOpen(t._$tag_name$_,t._$key$_?t._$key$_:null,["is",t._$tag_name$_,"id",t._$target$_,"class",e]),t.render.call(t,t),a.elementClose(t._$tag_name$_),!t._$loaded$_&&t.attached&&(t._$loaded$_=!0,t.attached())}},e.prototype.compose=function(e,a,r,s,n){var o=this;t([e+".html"],function(t){o.build({classFactory:t["default"],hostVars:r,staticVars:s,target:a,tagName:"compose-view"}).content(n).refresh()})},e}();e.FerrugemJSFactory=n,Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=new n});
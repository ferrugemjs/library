define(["require","exports","incremental-dom","./register-tag"],function(e,t,r,n){"use strict";var o=function(){function e(){}return e.prototype.refresh=function(){if(this._$el$domref)if(document.getElementById(this._$el$domref))r.patch(document.getElementById(this._$el$domref),function(){this._$render_from_powerup(this,n["default"],a)}.bind(this));else if(this.detached){this.detached();var e=this;setTimeout(function(){e=null})}},e}(),i=function(){function e(){}return e.prototype.initModule=function(e){if(document.getElementById(e.target)){var t=n["default"].getRegistred(e.tag),r=new t._$controller;r._$el$domref=e.target,r.refresh(),r.attached&&r.attached(),this.changeProps(r,e.host_vars)}},e.prototype.load=function(e,t,i){for(var a=[],f=3;f<arguments.length;f++)a[f-3]=arguments[f];var s=n["default"].getRegistred(e),u="custom_element_id_"+(new Date).getTime();r.elementOpen("div",u,["id",u,"class",s.tag]),r.elementClose("div"),a&&(i||(i=[]),a.forEach(function(e){i.push(e)}));var c={tag:s.tag,target:u,host_vars:i};if(s&&s._$controller)this.initModule(c);else{var d=this;n["default"].setLoading(s.tag),System["import"](s.url).then(function(e){var t=Object.keys(e)[0];n["default"].config(s.tag,e[t]),System["import"](s.url+".html").then(function(r){var n=Object.keys(r)[0];e[t].prototype.refresh||(e[t].prototype.content=function(){},e[t].prototype._$render_from_powerup=r[n],e[t].prototype.refresh=o.prototype.refresh),d.initModule(c)})})}return this},e.prototype.content=function(e){},e.prototype.changeProps=function(e,t){if(t&&t.length>1)for(var r=t.length,n=0;n<r;n+=2){var o=t[n],i=t[n+1],a="set"+o.replace(/(^\D)/g,function(e,t){return e.toUpperCase()});e[a]?e[a](i):e[o]=i}},e}(),a=new i;Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=a});
define(["require","exports","incremental-dom","./register-tag"],function(t,e,o,r){"use strict";var n=function(){function t(){this.moduleWait=[]}return t.prototype.resolveModules=function(){var t=this;console.log("resolve "+this.moduleWait.length),this.moduleWait.forEach(function(e){t.initModule(e)})},t.prototype.initModule=function(t){var e=r["default"].getRegistred(t.tag),o=new e._$controller;o._$el$domref=t.target,o.refresh(),o.attached&&o.attached(),this.changeProps(o,t.host_vars)},t.prototype.load=function(t,e,n){var i=r["default"].getRegistred(t),a="custom_element_id_"+(new Date).getTime();if(o.elementOpen("div",a,["id",a]),o.elementClose("div"),i&&i._$controller)this.moduleWait.push({tag:i.tag,target:a,host_vars:n,loaded:!0});else if(this.moduleWait.push({tag:i.tag,target:a,host_vars:n}),!i.loading){var s=this;r["default"].setLoading(i.tag),System["import"](i.url).then(function(t){var e=Object.keys(t)[0];r["default"].config(i.tag,t[e]),System["import"](i.url+".html").then(function(n){var i=Object.keys(n)[0];t[e].prototype.refresh||(t[e].prototype.content=function(){},t[e].prototype._$render_from_powerup=n[i],t[e].prototype.refresh=function(){this._$el$domref&&o.patch(document.getElementById(this._$el$domref),function(){this._$render_from_powerup(this,r["default"],s)}.bind(this))}),s.resolveModules()})})}return this},t.prototype.content=function(t){var e=this.moduleWait.length-1;this.moduleWait[e].loaded&&this.initModule(this.moduleWait.pop())},t.prototype.changeProps=function(t,e){if(e&&e.length>0)for(var o=e.length,r=0;r<o/2;++r){var n=e[r],i=e[r+1],a="on"+n.replace(/(^\D)/g,function(t,e){return t.toUpperCase()})+"Changed",s=t[n];t[n]=i,t[a]&&t[a](i,s)}},t}();Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=new n});
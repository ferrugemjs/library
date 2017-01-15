define(["require","exports","incremental-dom"],function(t,e,s){"use strict";var r=function(){function t(){}return t.prototype.changeAttrs=function(t){if(t)for(var e in t){var s=e.toLowerCase().replace(/-(.)/g,function(t,e){return e.toUpperCase()}),r=t[e];if(s.indexOf(".")>-1){var i=s.split(".");this[i[0]][i[1]](r)}else{var o="set"+s.replace(/(^\D)/g,function(t,e){return t.toUpperCase()});this[o]?this[o](r):this[s]=r}}},t.prototype.changeProps=function(e,s){t.prototype.changeAttrs.call(this,e),t.prototype.changeAttrs.call(this,s)},t.prototype.compose=function(e,r,o,a){var n="uid_"+i++,l="nonefound";s.elementOpen("div",n,["id",n,"class",l]),s.elementClose("div"),System["import"](e+".html").then(function(e){var s=new e["default"];t.prototype.configComponent.call(s,"compose",n,r,o),s.content(a),s.refresh(),document.getElementById(s._$el$domref.target).className=s.$className$ref_style_name$,delete s._$el$domref.static_vars,delete s._$el$domref.host_vars})},t.prototype.configComponent=function(t,e,s,r){var i={tag:t,target:e,host_vars:s,static_vars:r||{}};return this._$el$domref&&this._$el$domref.static_vars&&(i.static_vars.id=this._$el$domref.static_vars.id),this._$el$domref=i,this},t}();e.AuxClass=r;var i=(new Date).getTime()+1298,o=function(){function t(){}return t.prototype.content=function(t){return t?this._$content$_=t:this._$content$_&&this._$content$_(),this},t.prototype.refresh=function(){var t="uid_"+i++;if(this._$el$domref)if(this._$el$domref.static_vars||(this._$el$domref.static_vars={}),this._$el$domref.static_vars.id=this._$el$domref.static_vars.id||t,document.getElementById(this._$el$domref.target))r.prototype.changeProps.call(this,this._$el$domref.host_vars,this._$el$domref.static_vars),delete this._$el$domref.host_vars,s.patch(document.getElementById(this._$el$domref.target),this.render.bind(this),this),!this._alredy_load_module&&this.attached&&(this._alredy_load_module=!0,this.attached());else if(this._$el$domref.target){r.prototype.changeProps.call(this,this._$el$domref.host_vars,this._$el$domref.static_vars),delete this._$el$domref.host_vars;var e=this.$className$ref_style_name$||this._$el$domref.tag;this._$el$domref.target=this._$el$domref.static_vars.id,s.elementOpen("div",this._$el$domref.static_vars.id,["id",this._$el$domref.static_vars.id,"class",e]),this.render.call(this,this),s.elementClose("div"),!this._alredy_load_module&&this.attached&&(this._alredy_load_module=!0,this.attached())}else if(this.detached){this.detached();var o=this;setTimeout(function(){o=null})}return this},t}();e.GenericComponent=o});
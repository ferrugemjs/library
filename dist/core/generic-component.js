define(["require","exports","incremental-dom"],function(t,e,i){"use strict";var n=function(){function t(){}return t.prototype.changeProps=function(t){if(t&&t.length>1)for(var e=t.length,i=0;i<e;i+=2){var n=t[i],r=t[i+1],o="set"+n.replace(/(^\D)/g,function(t,e){return t.toUpperCase()});this[o]?this[o](r):this[n]=r}},t.prototype.configComponent=function(t,e,i){for(var n=[],r=3;r<arguments.length;r++)n[r-3]=arguments[r];return n&&(i||(i=[]),n.forEach(function(t){i.push(t)})),this._$el$domref={tag:t,target:e,host_vars:i},this},t}();e.AuxClass=n;var r=(new Date).getMilliseconds(),o=function(){function t(){}return t.prototype.content=function(t){return t?this._$content$_=t:this._$content$_&&this._$content$_(),this},t.prototype.refresh=function(){if(this._$el$domref)if(document.getElementById(this._$el$domref.target))i.patch(document.getElementById(this._$el$domref.target),this.render.bind(this),this),!this._alredy_load_module&&this.attached&&(this._alredy_load_module=!0,this.attached());else if(this._$el$domref.target){var t="custom_element_id_"+r++;this._$el$domref.target=t,i.elementOpen("div",this._$el$domref.target,["id",this._$el$domref.target,"class",this._$el$domref.tag]),this.render.call(this,this),i.elementClose("div"),!this._alredy_load_module&&this.attached&&(this._alredy_load_module=!0,this.attached(),n.prototype.changeProps.call(this,this._$el$domref.host_vars))}else if(this.detached){this.detached();var e=this;setTimeout(function(){e=null})}return this},t}();e.GenericComponent=o});
define(["require", "exports", "incremental-dom"], function (require, exports, _IDOM) {
    "use strict";
    var AuxClass = (function () {
        function AuxClass() {
        }
        AuxClass.prototype.changeAttrs = function (attrs_vars) {
            if (attrs_vars) {
                for (var propOrign in attrs_vars) {
                    var prop = propOrign.toLowerCase().replace(/-(.)/g, function (match, group1) {
                        return group1.toUpperCase();
                    });
                    var newValue = attrs_vars[propOrign];
                    if (prop.indexOf(".") > -1) {
                        var prop_splited = prop.split(".");
                        this[prop_splited[0]][prop_splited[1]](newValue);
                    }
                    else {
                        var _onChangedFunction = "set" + prop.replace(/(^\D)/g, function (g0, g1) {
                            return g0.toUpperCase();
                        });
                        if (this[_onChangedFunction]) {
                            this[_onChangedFunction](newValue);
                        }
                        else {
                            this[prop] = newValue;
                        }
                    }
                }
                ;
            }
        };
        AuxClass.prototype.changeProps = function (host_vars, static_vars) {
            AuxClass.prototype.changeAttrs.call(this, host_vars);
            AuxClass.prototype.changeAttrs.call(this, static_vars);
        };
        AuxClass.prototype.compose = function (path, host_vars, static_vars, contentfn) {
            var nextuid = 'uid_' + (uid_generated++);
            var className = "none-found";
            _IDOM.elementOpen("div", nextuid, ['is', 'compose-view', 'id', nextuid, 'class', className]);
            _IDOM.elementClose("div");
            System.import(path + ".html").then(function (mod) {
                var instMod = new mod.default();
                AuxClass.prototype.configComponent.call(instMod, "compose-view", nextuid, host_vars, static_vars);
                instMod.content(contentfn);
                instMod.refresh();
                document.getElementById(instMod._$el$domref.target).className = instMod["$className$ref_style_name$"];
                delete instMod._$el$domref.static_vars;
                delete instMod._$el$domref.host_vars;
            });
        };
        AuxClass.prototype.configComponent = function (tag, target, host_vars, static_vars) {
            var tmpNewProps = { tag: tag, target: target, host_vars: host_vars, static_vars: static_vars || {} };
            if (this._$el$domref && this._$el$domref.static_vars) {
                tmpNewProps.static_vars.id = this._$el$domref.static_vars.id;
            }
            this._$el$domref = tmpNewProps;
            return this;
        };
        return AuxClass;
    }());
    exports.AuxClass = AuxClass;
    var uid_generated = new Date().getTime() + 1298;
    var GenericComponent = (function () {
        function GenericComponent() {
        }
        GenericComponent.prototype.content = function ($content$) {
            if ($content$) {
                this._$content$_ = $content$;
            }
            else if (this._$content$_) {
                this._$content$_();
            }
            return this;
        };
        GenericComponent.prototype.refresh = function () {
            var nextuid = 'uid_' + (uid_generated++);
            if (this._$el$domref) {
                if (!this._$el$domref.static_vars) {
                    this._$el$domref.static_vars = {};
                }
                this._$el$domref.static_vars.id = this._$el$domref.static_vars.id || nextuid;
                if (document.getElementById(this._$el$domref.target)) {
                    AuxClass.prototype.changeProps.call(this, this._$el$domref.host_vars, this._$el$domref.static_vars);
                    delete this._$el$domref.host_vars;
                    _IDOM.patch(document.getElementById(this._$el$domref.target), this.render.bind(this), this);
                    if (!this._alredy_load_module && this.attached) {
                        this._alredy_load_module = true;
                        this.attached();
                    }
                }
                else if (this._$el$domref.target) {
                    AuxClass.prototype.changeProps.call(this, this._$el$domref.host_vars, this._$el$domref.static_vars);
                    delete this._$el$domref.host_vars;
                    var className = this["$className$ref_style_name$"] || this._$el$domref.tag;
                    this._$el$domref.target = this._$el$domref.static_vars.id;
                    _IDOM.elementOpen('div', this._$el$domref.static_vars.id, ['is', this._$el$domref.tag, 'id', this._$el$domref.static_vars.id, 'class', className]);
                    this.render.call(this, this);
                    _IDOM.elementClose('div');
                    if (!this._alredy_load_module && this.attached) {
                        this._alredy_load_module = true;
                        this.attached();
                    }
                }
                else {
                    if (this.detached) {
                        this.detached();
                        var $this_1 = this;
                        setTimeout(function () {
                            $this_1 = null;
                        });
                    }
                }
            }
            return this;
        };
        return GenericComponent;
    }());
    exports.GenericComponent = GenericComponent;
});

define(["require", "exports", "incremental-dom"], function (require, exports, _IDOM) {
    "use strict";
    var AuxClass = (function () {
        function AuxClass() {
        }
        AuxClass.prototype.changeProps = function (host_vars) {
            if (host_vars && host_vars.length > 1) {
                var host_vars_count = host_vars.length;
                for (var i = 0; i < host_vars_count; i += 2) {
                    var prop = host_vars[i];
                    var newValue = host_vars[i + 1];
                    var _onChangedFunction = "set" + prop.replace(/(^\D)/g, function (g0, g1) {
                        return g0.toUpperCase();
                    });
                    if (prop.indexOf(".") > -1) {
                        console.log(prop);
                        eval("this." + prop + "='" + newValue + "'");
                        newValue();
                    }
                    else if (this[_onChangedFunction]) {
                        this[_onChangedFunction](newValue);
                    }
                    else {
                        this[prop] = newValue;
                    }
                }
                ;
            }
        };
        AuxClass.prototype.configComponent = function (tag, target, host_vars) {
            var extra_attr = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                extra_attr[_i - 3] = arguments[_i];
            }
            if (extra_attr) {
                if (!host_vars) {
                    host_vars = [];
                }
                ;
                extra_attr.forEach(function (key) {
                    host_vars.push(key);
                });
            }
            ;
            this._$el$domref = { tag: tag, target: target, host_vars: host_vars };
            return this;
        };
        return AuxClass;
    }());
    exports.AuxClass = AuxClass;
    var unique_id_ui_component_store = new Date().getMilliseconds();
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
            if (this._$el$domref) {
                console.log(this._$el$domref.host_vars);
                if (document.getElementById(this._$el$domref.target)) {
                    AuxClass.prototype.changeProps.call(this, this._$el$domref.host_vars);
                    delete this._$el$domref.host_vars;
                    _IDOM.patch(document.getElementById(this._$el$domref.target), this.render.bind(this), this);
                    if (!this._alredy_load_module && this.attached) {
                        this._alredy_load_module = true;
                        this.attached();
                    }
                }
                else if (this._$el$domref.target) {
                    AuxClass.prototype.changeProps.call(this, this._$el$domref.host_vars);
                    delete this._$el$domref.host_vars;
                    var tmpIdElement = "custom_element_id_" + (unique_id_ui_component_store++);
                    this._$el$domref.target = tmpIdElement;
                    _IDOM.elementOpen("div", this._$el$domref.target, ['id', this._$el$domref.target, 'class', this._$el$domref.tag]);
                    this.render.call(this, this);
                    _IDOM.elementClose("div");
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

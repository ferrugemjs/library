define(["require", "exports", "incremental-dom", "./register-tag"], function (require, exports, _IDOM, register_tag_1) {
    "use strict";
    var LoadTag = (function () {
        function LoadTag() {
            this.moduleWait = [];
        }
        LoadTag.prototype.resolveModules = function () {
            var _this = this;
            this.moduleWait.forEach(function (mod) {
                _this.initModule(mod);
            });
        };
        LoadTag.prototype.initModule = function (mod) {
            var tmpTagReg = register_tag_1.default.getRegistred(mod.tag);
            var controlInt = new tmpTagReg._$controller();
            controlInt._$el$domref = mod.target;
            controlInt.refresh();
            if (controlInt.attached) {
                controlInt.attached();
            }
            ;
            this.changeProps(controlInt, mod.host_vars);
        };
        LoadTag.prototype.load = function (tag, target, host_vars) {
            var tmpTagReg = register_tag_1.default.getRegistred(tag);
            var tmpIdElement = "custom_element_id_" + new Date().getTime();
            _IDOM.elementOpen("div", tmpIdElement, ['id', tmpIdElement]);
            _IDOM.elementClose("div");
            if (tmpTagReg && tmpTagReg._$controller) {
                this.moduleWait.push({ tag: tmpTagReg.tag, target: tmpIdElement, host_vars: host_vars, loaded: true });
            }
            else {
                this.moduleWait.push({ tag: tmpTagReg.tag, target: tmpIdElement, host_vars: host_vars });
                if (!tmpTagReg.loading) {
                    var tmpThis_1 = this;
                    register_tag_1.default.setLoading(tmpTagReg.tag);
                    System.import(tmpTagReg.url).then(function (_controller) {
                        var _controllerName = Object.keys(_controller)[0];
                        register_tag_1.default.config(tmpTagReg.tag, _controller[_controllerName]);
                        System.import(tmpTagReg.url + ".html").then(function (_sub_comp) {
                            var _modname = Object.keys(_sub_comp)[0];
                            if (!_controller[_controllerName].prototype.refresh) {
                                _controller[_controllerName].prototype.content = function () {
                                };
                                _controller[_controllerName].prototype._$render_from_powerup = _sub_comp[_modname];
                                _controller[_controllerName].prototype.refresh = function () {
                                    if (this._$el$domref) {
                                        _IDOM.patch(document.getElementById(this._$el$domref), function () {
                                            this._$render_from_powerup(this, register_tag_1.default, tmpThis_1);
                                        }.bind(this));
                                    }
                                };
                            }
                            tmpThis_1.resolveModules();
                        });
                    });
                }
            }
            return this;
        };
        LoadTag.prototype.content = function (cb) {
            var lastModule = this.moduleWait.length - 1;
            if (this.moduleWait[lastModule].loaded) {
                this.initModule(this.moduleWait.pop());
            }
        };
        LoadTag.prototype.changeProps = function (tag_controller, host_vars) {
            if (host_vars && host_vars.length > 0) {
                var host_vars_count = host_vars.length;
                for (var i = 0; i < host_vars_count / 2; ++i) {
                    var prop = host_vars[i];
                    var newValue = host_vars[i + 1];
                    var _onChangedFunction = "on" + prop.replace(/(^\D)/g, function (g0, g1) {
                        return g0.toUpperCase();
                    }) + "Changed";
                    var oldValue = tag_controller[prop];
                    tag_controller[prop] = newValue;
                    if (tag_controller[_onChangedFunction]) {
                        tag_controller[_onChangedFunction](newValue, oldValue);
                    }
                }
                ;
            }
        };
        return LoadTag;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = new LoadTag();
});

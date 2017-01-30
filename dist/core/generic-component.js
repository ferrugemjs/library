define(["require", "exports", "incremental-dom"], function (require, exports, _IDOM) {
    "use strict";
    var uid_generated = new Date().getTime() + 1298;
    var inst_watched = {};
    _IDOM.notifications.nodesDeleted = function (nodes) {
        nodes.forEach(function (node) {
            if (inst_watched[node.id] && inst_watched[node.id].detached) {
                inst_watched[node.id].detached();
                inst_watched[node.id] = null;
                delete inst_watched[node.id];
            }
            ;
        });
    };
    var AuxClass = (function () {
        function AuxClass() {
        }
        AuxClass.prototype.changeAttrs = function (attrs_vars, isStatics) {
            if (attrs_vars) {
                for (var propOrign in attrs_vars) {
                    var notAccepted = isStatics && (propOrign === "is" || propOrign === "id");
                    if (!notAccepted) {
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
                }
                ;
            }
        };
        AuxClass.prototype.changeProps = function (host_vars, static_vars) {
            AuxClass.prototype.changeAttrs.call(this, static_vars, true);
            AuxClass.prototype.changeAttrs.call(this, host_vars);
        };
        AuxClass.prototype.compose = function (path, host_vars, static_vars, contentfn) {
            var nextuid = 'uid_' + (uid_generated++);
            var className = "none-found";
            var tmpKey = static_vars && static_vars["key:id"] ? static_vars["key:id"] : "";
            tmpKey = host_vars && host_vars["key:id"] ? host_vars["key:id"] : tmpKey;
            if (tmpKey) {
                nextuid = tmpKey;
            }
            _IDOM.elementOpen("compose-view", nextuid, ['is', 'compose-view', 'view', path, 'data-key', tmpKey, 'id', nextuid, 'class', className]);
            _IDOM.elementClose("compose-view");
            System.import(path + ".html").then(function (mod) {
                var instMod = inst_watched[nextuid] ? inst_watched[nextuid] : new mod.default();
                if (!inst_watched[nextuid]) {
                    inst_watched[nextuid] = instMod;
                }
                AuxClass.prototype.configComponent.call(instMod, "compose-view", nextuid, host_vars, static_vars);
                instMod.content(contentfn);
                instMod.refresh();
                document.getElementById(instMod._$el$domref.target).className = instMod["$className$ref_style_name$"];
                delete instMod._$el$domref.static_vars;
                delete instMod._$el$domref.host_vars;
            });
        };
        AuxClass.prototype.configComponent = function (tag, target, host_vars, static_vars) {
            var tmpId = static_vars ? static_vars.id : "";
            var tmpKey = static_vars && static_vars["key:id"] ? static_vars["key:id"] : "";
            if (tmpKey) {
                delete static_vars["key:id"];
            }
            tmpKey = host_vars && host_vars["key:id"] ? host_vars["key:id"] : tmpKey;
            if (host_vars && host_vars["key:id"]) {
                delete host_vars["key:id"];
            }
            ;
            if (tmpKey) {
                target = tmpKey;
            }
            if (tmpId) {
                delete static_vars.id;
                host_vars["id"] = tmpId;
            }
            var tmpNewProps = { tag: tag, target: target, host_vars: host_vars, static_vars: static_vars || {} };
            if (this._$el$domref && this._$el$domref.static_vars) {
            }
            this._$el$domref = tmpNewProps;
            return this;
        };
        return AuxClass;
    }());
    exports.AuxClass = AuxClass;
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
            var _inst_ = null;
            if (this._$el$domref && this._$el$domref.target) {
                _inst_ = (inst_watched[this._$el$domref.target]) ? inst_watched[this._$el$domref.target] : this;
            }
            else {
                _inst_ = this;
            }
            if (_inst_._$el$domref && _inst_._$el$domref.target) {
                if (!_inst_._$el$domref.static_vars) {
                    _inst_._$el$domref.static_vars = {};
                }
                if (document.getElementById(_inst_._$el$domref.target)) {
                    AuxClass.prototype.changeProps.call(_inst_, _inst_._$el$domref.host_vars, _inst_._$el$domref.static_vars);
                    _IDOM.patch(document.getElementById(_inst_._$el$domref.target), _inst_.render.bind(_inst_), _inst_);
                    if (!_inst_._alredy_load_module && _inst_.attached) {
                        _inst_._alredy_load_module = true;
                    }
                    delete _inst_._$el$domref.host_vars;
                    delete _inst_._$el$domref.static_vars;
                }
                else if (_inst_._$el$domref.target) {
                    var keyelement = _inst_._$el$domref.static_vars.id || nextuid;
                    _inst_._$el$domref.static_vars.id = keyelement;
                    AuxClass.prototype.changeProps.call(_inst_, _inst_._$el$domref.host_vars, _inst_._$el$domref.static_vars);
                    var className = _inst_["$className$ref_style_name$"] || _inst_._$el$domref.tag;
                    _inst_._$el$domref.target = _inst_._$el$domref.target ? _inst_._$el$domref.target : _inst_._$el$domref.static_vars.id;
                    _IDOM.elementOpen(_inst_._$el$domref.tag, _inst_._$el$domref.target, ['is', _inst_._$el$domref.tag, 'key-data', _inst_._$el$domref.target, 'id', _inst_._$el$domref.target, 'class', className]);
                    _inst_.render.call(_inst_, _inst_);
                    _IDOM.elementClose(_inst_._$el$domref.tag);
                    if (!_inst_._alredy_load_module && _inst_.attached) {
                        _inst_._alredy_load_module = true;
                        _inst_.attached();
                    }
                    delete _inst_._$el$domref.host_vars;
                    delete _inst_._$el$domref.static_vars;
                    if (!inst_watched[keyelement]) {
                        inst_watched[keyelement] = _inst_;
                    }
                }
            }
            return this;
        };
        return GenericComponent;
    }());
    exports.GenericComponent = GenericComponent;
});

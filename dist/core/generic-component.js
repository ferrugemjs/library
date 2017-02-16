define(["require", "exports", "incremental-dom"], function (require, exports, _IDOM) {
    "use strict";
    ;
    var inst_watched = {};
    var uid_generated = new Date().getTime() + 1298;
    _IDOM.notifications.nodesDeleted = function (nodes) {
        nodes.forEach(function (node) {
            var key_id = node.getAttribute ? node.getAttribute("key-id") : "";
            if (key_id && inst_watched[key_id] && inst_watched[key_id].inst.detached) {
                inst_watched[key_id].inst.detached();
            }
            if (key_id && inst_watched[key_id]) {
                inst_watched[key_id].inst = null;
                inst_watched[key_id] = null;
                delete inst_watched[key_id];
            }
            ;
        });
    };
    _IDOM.notifications.nodesCreated = function (nodes) {
        nodes.forEach(function (node) {
            var key_id = node.getAttribute ? node.getAttribute("key-id") : "";
            if (key_id && inst_watched[key_id] && inst_watched[key_id].inst.attached && (!inst_watched[key_id].loaded)) {
                inst_watched[key_id].loaded = true;
                inst_watched[key_id].inst.attached();
            }
        });
    };
    var FerrugemJSFactory = (function () {
        function FerrugemJSFactory() {
        }
        FerrugemJSFactory.prototype.build = function (config) {
            var _key = "";
            if (config.hostVars && config.hostVars["key:id"]) {
                _key = config.hostVars["key:id"];
                delete config.hostVars["key:id"];
            }
            else if (config.staticVars && config.staticVars["key:id"]) {
                _key = config.staticVars["key:id"];
                delete config.staticVars["key:id"];
            }
            if (!config.classFactory.prototype.refresh) {
                config.classFactory.prototype.refresh = FerrugemJSFactory.prototype.refresh;
            }
            if (!config.classFactory.prototype.content) {
                config.classFactory.prototype.content = FerrugemJSFactory.prototype.content;
            }
            if (_key && inst_watched[_key]) {
                if (config.hostVars) {
                    for (var _prop_ in config.hostVars) {
                        if (_prop_.indexOf(".") > -1) {
                            delete config.hostVars[_prop_];
                        }
                    }
                }
                this.changeAttrs.call(inst_watched[_key].inst, config.hostVars);
                return inst_watched[_key].inst;
            }
            inst_watched[_key] = { inst: new config.classFactory() };
            inst_watched[_key].target = config.target;
            inst_watched[_key].inst["_$key$_"] = _key;
            inst_watched[_key].alias = config.alias;
            inst_watched[_key].tag = config.tag || "div";
            inst_watched[_key].tag = inst_watched[_key].inst["_$attrs$_"] ? inst_watched[_key].inst["_$attrs$_"]["name"] : inst_watched[_key].tag;
            this.changeAttrs.call(inst_watched[_key].inst, config.hostVars);
            this.changeAttrs.call(inst_watched[_key].inst, config.staticVars);
            if (inst_watched[_key].inst["_$attrs$_"]) {
                inst_watched[_key].extHostVars = inst_watched[_key].inst["_$attrs$_"]["dinamic"];
                inst_watched[_key].extStaticVars = Object.assign([], inst_watched[_key].inst["_$attrs$_"]["static"]);
            }
            return inst_watched[_key].inst;
        };
        FerrugemJSFactory.prototype.content = function ($content$) {
            if ($content$) {
                this._$content$_ = $content$;
            }
            else if (this._$content$_) {
                this._$content$_();
            }
            return this;
        };
        FerrugemJSFactory.prototype.changeAttrs = function (attrs_vars, isStatics) {
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
        FerrugemJSFactory.prototype.reDraw = function () {
            var _inst_ = inst_watched[this._$key$_] || { inst: this, extStaticVars: [], extHostVars: "" };
            _inst_.extHostVars = _inst_.extHostVars || "";
            _inst_.extStaticVars = _inst_.extStaticVars || [];
            _inst_.target = _inst_.target || 'uid_' + (uid_generated++) + '_provided';
            if (_inst_.extStaticVars.indexOf('id') < 0) {
                _inst_.extStaticVars.push('id', _inst_.target);
            }
            else {
                _inst_.target = _inst_.extStaticVars[_inst_.extStaticVars.indexOf('id') + 1];
            }
            if (_inst_.extStaticVars.indexOf('is') < 0 && _inst_.alias) {
                _inst_.extStaticVars.push('is', _inst_.alias);
            }
            if (_inst_.inst._$key$_) {
                _inst_.extStaticVars.push('key-id', _inst_.inst._$key$_);
            }
            _IDOM.elementOpen.apply(_IDOM, [_inst_.tag, _inst_.inst._$key$_, _inst_.extStaticVars].concat(new Function('$_this_$', 'return [' + _inst_.extHostVars + ']')(_inst_.inst)));
            _inst_.inst.render(_inst_.inst);
            _IDOM.elementClose(_inst_.tag);
        };
        FerrugemJSFactory.prototype.refresh = function () {
            var _inst_ = inst_watched[this._$key$_] || { inst: this };
            if (_inst_.target && document.getElementById(_inst_.target)) {
                var elementDom_1 = document.getElementById(_inst_.target);
                if (_inst_.extHostVars && _inst_.extHostVars !== '""') {
                    var converted_to_array_1 = new Function('$_this_$', 'return [' + _inst_.extHostVars + ']')(_inst_.inst);
                    converted_to_array_1.forEach(function (attrkey, $indx) {
                        var skypeZero = $indx || 2;
                        if (skypeZero % 2 === 0) {
                            elementDom_1.setAttribute(attrkey, converted_to_array_1[$indx + 1]);
                        }
                    });
                }
                _IDOM.patch(elementDom_1, _inst_.inst.render, _inst_.inst);
            }
        };
        FerrugemJSFactory.prototype.compose = function (path, target, host_vars, static_vars, contentfn) {
            var _this = this;
            require([path + ".html"], function (mod) {
                _this.build({
                    classFactory: mod.default,
                    hostVars: host_vars,
                    staticVars: static_vars,
                    target: target,
                    alias: "compose-view",
                    tag: "div"
                }).content(contentfn).refresh();
            });
        };
        return FerrugemJSFactory;
    }());
    exports.FerrugemJSFactory = FerrugemJSFactory;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = new FerrugemJSFactory();
});

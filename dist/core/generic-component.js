define(["require", "exports", "incremental-dom"], function (require, exports, _IDOM) {
    "use strict";
    var inst_watched = {};
    var uid_generated = new Date().getTime() + 1298;
    _IDOM.notifications.nodesDeleted = function (nodes) {
        nodes.forEach(function (node) {
            if (node.id && inst_watched[node.id] && inst_watched[node.id].detached) {
                inst_watched[node.id].detached();
            }
            if (node.id && inst_watched[node.id]) {
                inst_watched[node.id] = null;
                delete inst_watched[node.id];
            }
            ;
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
                return inst_watched[_key];
            }
            if (_key && !inst_watched[_key]) {
                inst_watched[_key] = new config.classFactory();
                inst_watched[_key]["_$target$_"] = config.target;
                inst_watched[_key]["_$key$_"] = _key;
                inst_watched[_key]["_$tagName$_"] = config.tagName;
                this.changeAttrs.call(inst_watched[_key], config.hostVars);
                this.changeAttrs.call(inst_watched[_key], config.staticVars);
                return inst_watched[_key];
            }
            var _inst_ = new config.classFactory();
            _inst_["_$target$_"] = config.target;
            _inst_["_$tagName$_"] = config.tagName;
            this.changeAttrs.call(_inst_, config.hostVars);
            this.changeAttrs.call(_inst_, config.staticVars);
            return _inst_;
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
        FerrugemJSFactory.prototype.refresh = function () {
            var _inst_ = this;
            if (_inst_._$target$_ && document.getElementById(_inst_._$target$_)) {
                _IDOM.patch(document.getElementById(_inst_._$target$_), _inst_.render.bind(_inst_), _inst_);
                if (!_inst_._$loaded$_ && _inst_.attached) {
                    _inst_._$loaded$_ = true;
                    _inst_.attached();
                    document.getElementById(_inst_._$target$_).className = _inst_._$style_name$_ || _inst_._$tag_name$_;
                }
            }
            else {
                _inst_._$target$_ = _inst_._$target$_ ? _inst_._$target$_ : 'uid_' + (uid_generated++);
                var className = _inst_._$style_name$_ || _inst_._$tag_name$_;
                _IDOM.elementOpen(_inst_._$tag_name$_, _inst_._$key$_ ? _inst_._$key$_ : null, ['is', _inst_._$tag_name$_, 'id', _inst_._$target$_, 'class', className]);
                _inst_.render.call(_inst_, _inst_);
                _IDOM.elementClose(_inst_._$tag_name$_);
                if (!_inst_._$loaded$_ && _inst_.attached) {
                    _inst_._$loaded$_ = true;
                    _inst_.attached();
                }
            }
        };
        FerrugemJSFactory.prototype.compose = function (path, target, host_vars, static_vars, contentfn) {
            var _this = this;
            System.import(path + ".html").then(function (mod) {
                _this.build({
                    classFactory: mod.default,
                    hostVars: host_vars,
                    staticVars: static_vars,
                    target: target,
                    tagName: "compose-view"
                }).content(contentfn).refresh();
            });
        };
        return FerrugemJSFactory;
    }());
    exports.FerrugemJSFactory = FerrugemJSFactory;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = new FerrugemJSFactory();
});

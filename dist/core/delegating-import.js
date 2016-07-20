define(["require", "exports", "./define-tag-webcomponent"], function (require, exports, defineTag) {
    "use strict";
    var DelegatingSystemImport = (function () {
        function DelegatingSystemImport() {
            this.from = "";
            this._loaded_modules = [];
        }
        DelegatingSystemImport.prototype.loadModule = function (p_resource_url) {
            if (this._loaded_modules.indexOf(p_resource_url) < 0) {
                this._loaded_modules.push(p_resource_url);
                if (p_resource_url.lastIndexOf("!") === p_resource_url.length - 1) {
                    System.import(p_resource_url);
                }
                else {
                    var patt_alias = / as\W+(\w.+)/g;
                    var _tagname_1;
                    var _trueurl_1;
                    if (patt_alias.test(p_resource_url)) {
                        var _urlsplit = p_resource_url.split(' as ');
                        _trueurl_1 = _urlsplit[0];
                        _tagname_1 = _urlsplit[1];
                    }
                    else {
                        _trueurl_1 = p_resource_url;
                        _tagname_1 = p_resource_url.substring(p_resource_url.lastIndexOf("/") + 1, p_resource_url.length);
                    }
                    System.import(_trueurl_1).then(function (_controller) {
                        var _controllerName = Object.keys(_controller)[0];
                        System.import(_trueurl_1 + ".html").then(function (_sub_comp) {
                            var _modname = Object.keys(_sub_comp)[0];
                            defineTag({
                                tag: _tagname_1,
                                render: _sub_comp[_modname],
                                controller: _controller[_controllerName]
                            });
                        });
                    });
                }
            }
        };
        DelegatingSystemImport.prototype.attached = function () {
            if (this.from) {
                this.loadModule(this.from);
            }
        };
        DelegatingSystemImport.prototype.onFromChanged = function (p_newfrom, p_oldfrom) {
            if (p_newfrom) {
                this.loadModule(p_newfrom);
            }
            ;
        };
        return DelegatingSystemImport;
    }());
    defineTag({
        tag: 'delegating-import',
        controller: DelegatingSystemImport,
        render: function () { }
    });
});

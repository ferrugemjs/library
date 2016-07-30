define(["require", "exports"], function (require, exports) {
    "use strict";
    var RegisterTag = (function () {
        function RegisterTag() {
            this.internal_dictionary = {};
        }
        RegisterTag.prototype.getRegistred = function (tag) {
            return {
                tag: tag,
                url: this.internal_dictionary[tag].url,
                _$controller: this.internal_dictionary[tag]._$controller,
                loading: this.internal_dictionary[tag].loading
            };
        };
        RegisterTag.prototype.config = function (tag, _controller) {
            this.internal_dictionary[tag].loading = false;
            this.internal_dictionary[tag]._$controller = _controller;
        };
        RegisterTag.prototype.setLoading = function (tag) {
            this.internal_dictionary[tag].loading = true;
        };
        RegisterTag.prototype.add = function (p_resource_url) {
            var tmptag = this.getTagFromUrl(p_resource_url);
            if (!this.internal_dictionary[tmptag.tag]) {
                if (p_resource_url.lastIndexOf("!") === p_resource_url.length - 1) {
                    System.import(p_resource_url);
                }
                else {
                    this.internal_dictionary[tmptag.tag] = { url: tmptag.url, loading: false };
                }
            }
        };
        RegisterTag.prototype.getTagFromUrl = function (p_resource_url) {
            var patt_alias = / as\W+(\w.+)/g;
            var _tagname;
            var _trueurl;
            if (patt_alias.test(p_resource_url)) {
                var _urlsplit = p_resource_url.split(' as ');
                _trueurl = _urlsplit[0];
                _tagname = _urlsplit[1];
            }
            else {
                _trueurl = p_resource_url;
                _tagname = p_resource_url.substring(p_resource_url.lastIndexOf("/") + 1, p_resource_url.length);
            }
            ;
            return { tag: _tagname, url: _trueurl };
        };
        return RegisterTag;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = new RegisterTag();
});

define(["require", "exports", "jquery", "incremental-dom", "./define-tag", "webcomponents.js/webcomponents.min", "./delegating-import"], function (require, exports, jquery, _IDOM, defineTag) {
    "use strict";
    jquery(function () {
        var app_html = jquery("[app]:first");
        var app_url = app_html.attr("app") || "app";
        var app_uid = app_html.attr("id");
        if (!app_uid) {
            app_uid = "uid_" + new Date().getTime();
            app_html.attr("id", app_uid);
        }
        ;
        System.import(app_url).then(function (_init_app) {
            var _app_name = Object.keys(_init_app)[0];
            System.import(app_url + ".html").then(function (_init_app_render) {
                var _modname = Object.keys(_init_app_render)[0];
                defineTag({
                    tag: 'init-app-root',
                    render: _init_app_render[_modname],
                    controller: _init_app[_app_name]
                });
                _IDOM.patch(document.getElementById(app_uid), function ($this) {
                    _IDOM.elementOpen("init-app-root", null, null, "props", { test: '' });
                    _IDOM.elementClose("init-app-root");
                }, {});
            });
        });
    });
});

define(["require", "exports", "incremental-dom", "./define-tag-webcomponent", "./delegating-import"], function (require, exports, _IDOM, defineTag) {
    "use strict";
    var app_html_s = document.querySelectorAll('[app]');
    var app_html;
    if (app_html_s.length === 0) {
        app_html = document.getElementsByTagName('body')[0];
    }
    else {
        app_html = app_html_s[0];
    }
    ;
    app_html_s = null;
    var app_url = app_html.getAttribute("app") || "app";
    var app_uid = app_html.getAttribute("id");
    if (!app_uid) {
        app_uid = "uid_" + new Date().getTime();
        app_html.setAttribute("id", app_uid);
    }
    ;
    System.import(app_url).then(function (_init_app) {
        var _app_name = Object.keys(_init_app)[0];
        System.import(app_url + ".html").then(function (_init_app_render) {
            var _modname = Object.keys(_init_app_render)[0];
            _IDOM.patch(document.getElementById(app_uid), function ($this) {
                _IDOM.elementOpen("init-app", null, ['id', '123']);
                _IDOM.elementOpen("span");
                _IDOM.text("funciona cabra");
                _IDOM.elementClose("span");
                _IDOM.elementClose("init-app");
            }, {});
            defineTag({
                tag: 'init-app',
                render: _init_app_render[_modname],
                controller: _init_app[_app_name]
            });
        });
    });
});

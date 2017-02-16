define(["require", "exports", "incremental-dom", "./generic-component"], function (require, exports, _IDOM, generic_component_1) {
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
    require([app_url + ".html"], function (_mod_init_app) {
        var _tmp_class_name = app_html.className ? app_html.className + " " : "";
        var _tmp_inst = generic_component_1.default.build({
            classFactory: _mod_init_app.default,
            staticVars: {
                "key:id": app_uid
            },
            hostVars: {},
            tag: "div",
            alias: "init-app-tag"
        });
        _IDOM.patch(document.getElementById(app_uid), generic_component_1.default.reDraw.bind(_tmp_inst), _tmp_inst);
    });
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = generic_component_1.default;
});

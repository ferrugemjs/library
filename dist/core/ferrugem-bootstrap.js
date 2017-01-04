define(["require", "exports", "./generic-component", "./generic-component"], function (require, exports, generic_component_1, generic_component_2) {
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
    System.import(app_url + ".html").then(function (_mod_init_app) {
        var _controllerName = Object.keys(_mod_init_app)[0];
        var _controller_ = new _mod_init_app[_controllerName]();
        generic_component_1.AuxClass.prototype.configComponent.call(_controller_, 'init-app-tag', app_uid, [], null);
        _controller_.refresh();
    });
    exports.GenericComponent = generic_component_2.GenericComponent;
    exports.AuxClass = generic_component_2.AuxClass;
});

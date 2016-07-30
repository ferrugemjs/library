define(["require", "exports", "incremental-dom", "./register-tag", "./load-tag"], function (require, exports, _IDOM, register_tag_1, load_tag_1) {
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
    register_tag_1.default.add(app_url + " as init-app-tag");
    _IDOM.patch(document.getElementById(app_uid), function () {
        load_tag_1.default.load('init-app-tag', app_uid, []);
    }, {});
});

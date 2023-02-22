define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MainApp = void 0;
    const MainApp = (params) => {
        console.log('params:', params);
        update();
        setInterval(() => {
            update();
        }, 2000);
    };
    exports.MainApp = MainApp;
});
//# sourceMappingURL=main-app.js.map
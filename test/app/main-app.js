define(["exports"], (exports) => {
    class MainApp {
        // this.msg = "agora vai?";
        // this.attached = () => {
        //     console.log('im in DOM');
        //     setInterval(() => {
        //         this.msg = "agooooo";
        //         //     this.refresh();
        //     }, 2000);
        // }
        attached() {
            console.log('im in DOM3', this.msg);
            setInterval(() => {
                this.msg = "agooooo" + new Date().getTime();
                //     this.refresh();
            }, 2000);
        }
    }

    // MainApp.prototype.msg = "gora avi???";
    // MainApp.prototype.attached = () => {
    //     console.log('im in DOM2', MainApp.prototype.msg);
    //     setInterval(() => {
    //         MainApp.prototype.msg = "agooooo";
    //         //     this.refresh();
    //     }, 2000);
    // }

    exports.default = new MainApp;
})


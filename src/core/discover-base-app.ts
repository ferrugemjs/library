export default new Promise<HTMLElement>(success => {
    const domReadyHandler = function() {
        let app_html_s = document.querySelectorAll('[app]');
        let app_html: HTMLElement;
        
        if (app_html_s.length === 0) {
          app_html = document.getElementsByTagName('body')[0];
        } else {
          app_html = <HTMLElement>app_html_s[0];
        }
        app_html_s = null;

        success(app_html);
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", domReadyHandler);
    }else{
        domReadyHandler();
    }
});
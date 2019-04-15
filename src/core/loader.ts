import discoverBaseApp from './discover-base-app';

declare let require: Function;
declare let __webpack_require__: Function;

const loader = (modulePath:string) => {
    return new Promise(success => {
        discoverBaseApp.then(app_html => {
            let templateExtension = app_html.getAttribute('template-extension') || '.html';
            
            if(typeof __webpack_require__ === 'function'){
                require([`@/${modulePath}${templateExtension}`], success);
            }else{
                require([`${modulePath}${templateExtension}`], success);
            }
        });
    });
};

export default loader;
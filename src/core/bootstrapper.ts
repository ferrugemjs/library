import platform from 'ferrugemjs/platform';

declare let require: Function;
declare let __webpack_require__: Function;

let app_html_s = document.querySelectorAll('[app]');
let app_html: HTMLElement;

if (app_html_s.length === 0) {
  app_html = document.getElementsByTagName('body')[0];
} else {
  app_html = <HTMLElement>app_html_s[0];
}
app_html_s = null;

let app_url: string = app_html.getAttribute('app') || 'app';
let templateExtension = app_html.getAttribute('template-extension') || '.html';

if (typeof __webpack_require__ === 'function') {
  require([`root_app/${app_url}${templateExtension}`], (_mod_init_app: any) => {
    platform
      .bootstrap(_mod_init_app, { templateExtension })
      .at(app_html);
  });
} else {
  require([`${app_url}${templateExtension}`], (_mod_init_app: any) => {
    platform
      .bootstrap(_mod_init_app, { templateExtension })
      .at(app_html);
  });
}

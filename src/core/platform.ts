import _IDOM = require('incremental-dom');
import componentFactory from './component-factory';

export class PlatformBootstrap {
  private _module: any;
  public bootstrap(pmodule: any, option?: { templateExtension: string }): PlatformBootstrap {
    this._module = pmodule;
    componentFactory.config.templateExtension = option && option.templateExtension ? option.templateExtension : '.html';
    return this;
  }
  public at(domRender: HTMLElement): void {
    let app_uid: string = domRender.getAttribute('id');
    if (!app_uid) {
      app_uid = `uid_${ new Date().getTime() }`;
      domRender.setAttribute('id', app_uid);
    }
    let _tmp_inst = componentFactory.build({
      classFactory: this._module.default
      , staticVars: {
        'key:id': app_uid
      }
      , hostVars: {}
      , tag: 'div'
      , alias: 'init-app-tag'
      //,target:app_uid
    });
    _IDOM.patch(document.getElementById(app_uid), componentFactory.reDraw.bind(_tmp_inst), _tmp_inst);
    delete this._module;
  }
}

export default new PlatformBootstrap();
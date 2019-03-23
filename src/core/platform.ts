import componentFactory from './component-factory';
import { patch } from 'incremental-dom';

export class PlatformBootstrap {
  public bootstrap(pmodule: any, option?: { templateExtension: string }): any {
    // componentFactory.config.templateExtension = option && option.templateExtension ? option.templateExtension : '.html';
    return { at:(domRender: HTMLElement) => this.at(domRender,pmodule) };
  }
  public at(domRender: HTMLElement, pmodule?: any): void {
    //let key_id: string = domRender.getAttribute('id');
    //if (!key_id) {
    const key_id = `uid_${new Date().getTime()}`;
      //domRender.setAttribute('id', key_id);
    //}
    const is = 'init-app-tag';
    const proxyInst = componentFactory(pmodule.default,{z: 1000},{is, key_id}).content(function(){});
    patch(domRender, proxyInst.$render.bind(proxyInst,{is, key_id}), proxyInst);
    //patch(domRender, proxy_inst.$render.bind(proxy_inst,{key_id, is, loaded:true}), proxy_inst);
  }
}

export default new PlatformBootstrap();
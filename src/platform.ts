import componentFactory from './component-factory';
import { patch } from 'incremental-dom';

export class PlatformBootstrap {
  public bootstrap(pmodule: any, option?: { templateExtension: string }): any {
    return { at:(domRender: HTMLElement) => this.at(domRender,pmodule) };
  }
  public at(domRender: HTMLElement, pmodule?: any): void {
    const key_id = `uid_${new Date().getTime()}`;
    const is = 'init-app-tag';
    const proxyInst = componentFactory(pmodule,{z: 1000},{is, key_id}).content(function(){});
    patch(domRender, proxyInst.$render.bind(proxyInst,{is, key_id}), proxyInst);
  }
}

export default new PlatformBootstrap();
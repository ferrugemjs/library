import { patch } from 'incremental-dom';
import componentFactory from './component-factory';

export class PlatformBootstrap {
  public bootstrap(pmodule: any, option?: { templateExtension: string }): any {
    return { at: (domRender: HTMLElement) => this.at(domRender, pmodule) };
  }
  public at(domRender: HTMLElement, pmodule?: any, params?: any): void {
    const key_id = `uid_${new Date().getTime()}`;
    const is = 'init-app-tag';
    const props = params || {};
    const proxyInst = componentFactory(pmodule, props, { is, key_id }).content(function () { });
    patch(domRender, proxyInst.$render.bind(proxyInst, { is, key_id }), proxyInst);
  }
}

export default new PlatformBootstrap();
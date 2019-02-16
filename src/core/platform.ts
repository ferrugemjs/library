import componentFactory from './component-factory';

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
    componentFactory(pmodule.default,{z: 1000},{is, key_id},domRender);
  }
}

export default new PlatformBootstrap();
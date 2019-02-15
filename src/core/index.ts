/*
import componentFactory from './component-factory';
import platform from './platform';
import bootstrapper from './bootstrapper';

export { componentFactory };
export { platform };
export { bootstrapper };
*/
import {patch,elementOpen,elementClose,text,notifications,attributes} from 'incremental-dom';
import inst_watched from './nodes-watched';
import { detacheNode, attacheNode } from './nodes-action';

notifications.nodesDeleted = function (nodes: HTMLDivElement[]) {
    nodes.forEach(detacheNode);
};
  
notifications.nodesCreated = function (nodes: HTMLDivElement[]) {
    nodes.forEach(attacheNode);
};
attributes.value = function (el: any, name: string, value: any) {
    el.value = value === null || typeof (value) === 'undefined' ? '' : value;
};
attributes.checked = function (el: any, name: string, value: any) {
    el.checked = !!value;
};

class Test{
    public b:number;
    public render:Function;

    constructor({b}:any){
        this.b = b;
    }
    public attached(){
        this.b = 123;
    }
}


export default ({key_id,is}:{key_id:string,is:string}, inst_props:{}) => {
    // console.log('init');
    const props = {a:123, b:321};

    const app_html_ref = document.getElementsByTagName('body')[0];
    

    Test.prototype.render = function({key_id,is}:any){
        elementOpen('div',key_id,['key-id',key_id,'is',is,'id',key_id]);
            text(this.b);
        elementClose('div');
    }

    const inst = new Test(props);

    let $draw = () => {};

    const proxy_inst = new Proxy(inst,{
        set: function(target, prop, value){
            // console.log(`'${String(prop)}' change from '${target[prop]}' to '${value}'`);
            target[prop] = value;
            setTimeout($draw.bind(target),0);
            return true;
        }
    });

    if(key_id && !inst_watched[key_id]){
        inst_watched[key_id] = {inst:proxy_inst};
    }else if(inst_watched[key_id]){
        // already in dom ?
    }else{
        console.warn(`key id not provide to ${is}`);
    }

    $draw = () => patch(app_html_ref, proxy_inst.render.bind(proxy_inst,{key_id,is}), proxy_inst);
    // first draw
    $draw();
    /*
    if(proxy_inst.attached){
        proxy_inst.attached();
    }
    */
}
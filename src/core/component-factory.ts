import { patch, notifications, attributes } from 'incremental-dom';
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

export default (p_module:any , props_inst:{[key:string]:any}, {key_id,is}:{is:string, key_id:string}, parent_ele?: HTMLElement, content?:Function) => {
    const inst = new p_module(props_inst);
    inst.$content = content || function(){};
    let $draw = () => { };

    const proxy_inst = new Proxy(inst, {
      set: function (target, prop, value) {
        // console.log(`'${String(prop)}' change from '${target[prop]}' to '${value}'`);
        target[prop] = value;
        setTimeout($draw, 0);
        return true;
      }
    });

    if (key_id && !inst_watched[key_id]) {
      inst_watched[key_id] = { inst: proxy_inst };
    } else if (inst_watched[key_id]) {
      // already in dom ?
    } else {
      console.warn(`key id not provide to ${is}`);
    }

    if(parent_ele){
      patch(parent_ele, proxy_inst.$render.bind(proxy_inst,{key_id,is}), proxy_inst);
    }else{
      proxy_inst.$render.call(proxy_inst,{key_id,is});
    }
    $draw = () => patch(document.getElementById(key_id), proxy_inst.$render.bind(proxy_inst,{key_id, is, loaded:true}), proxy_inst);
}
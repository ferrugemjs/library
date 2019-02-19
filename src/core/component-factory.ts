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

export default (p_module:any , props_inst:{[key:string]:any}, {key_id,is}:{is:string, key_id:string}) => {
  
  return {
    content : (cont?: Function) => {
      if(key_id && !inst_watched[key_id]){
        delete props_inst['key_id'];
        delete props_inst['is'];
        delete props_inst['key:id'];
        if(props_inst['prop:values']){
          props_inst = {...props_inst, ...props_inst['prop:values']};
          delete props_inst['prop:values'];
        }
        let propsAfterAttached = {};
        for (let propOrign in props_inst) {
          let prop: string = propOrign;

          if(prop.indexOf('-') > -1){
            prop = propOrign.toLowerCase().replace(/-(.)/g, function (match, group1) {
              return group1.toUpperCase();
            });
            props_inst[prop] = props_inst[propOrign];
            delete props_inst[propOrign];
          }else if(prop.indexOf('.') > -1){
            propsAfterAttached[propOrign] = props_inst[propOrign];
            delete props_inst[propOrign];
          }
        }

        const inst = new p_module(props_inst);

        const proxy_inst = new Proxy(inst, {
          set: function (target, prop, value) {
            //console.log(`'${String(prop)}' change from '${target[prop]}' to '${value}'`);
            target[prop] = value;
            
            setTimeout( 
              proxy_inst.$draw.bind(proxy_inst, {key_id, is}),
              0
            );
            
            return true;
          }
        });

        proxy_inst.$draw = function({key_id,is}:any){
          //console.log(key_id,is,this);
          patch(
            document.getElementById(key_id),
            this.$render.bind(this,{key_id, is, loaded:true}),
            this
          )
        }
        inst_watched[key_id] = { inst: proxy_inst, $is:is, $propsAfterAttached:propsAfterAttached};
      }
      
      if(cont){
        inst_watched[key_id].inst.$content = cont;
      }

      return inst_watched[key_id].inst;
    }
  }
}
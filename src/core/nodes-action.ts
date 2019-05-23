import inst_watched from './nodes-watched';

export const detacheNode = (node: HTMLDivElement) => {
  //detacheNode(node.children);
  if (node.children && node.children.length) {
    //detacheNode(node.children);
    let node_array = Array.prototype.slice.call(node.children);
    node_array.forEach( detacheNode );
  }
  let key_id: string = node.getAttribute ? node.getAttribute('id') : '';
  //console.log(node);
  let inst_captured = inst_watched[key_id];
  if (key_id && inst_captured) {  
    if(typeof inst_captured.inst.detached === 'function'){
      inst_captured.inst.detached();
    }
    if(typeof inst_captured.inst.afterDetached === 'function'){
      inst_captured.inst.afterDetached();
    }
  }
  //ajudando o guarbage collector do javascript
  if (key_id && inst_captured) {
    //evitando usar o refresh em um no morto
    inst_captured.$loaded = false;
    inst_captured.inst = null;
    inst_captured = null;
    delete inst_watched[key_id];
  }
};

export const attacheNode = (node: HTMLDivElement) => {
  let key_id: string = node.getAttribute ? node.getAttribute('id') : '';
  let inst_captured = inst_watched[key_id];
  // console.log(key_id, inst_captured);
  if (key_id && inst_captured) {
    if(!inst_captured.$loaded){
      const $inst = inst_captured.inst;
      for (let propOrign in inst_captured.$propsAfterAttached) {
        let prop_splited: string[] = propOrign.split('.');
        if($inst[prop_splited[0]] && typeof $inst[prop_splited[0]][prop_splited[1]] === 'function'){
          $inst[prop_splited[0]][prop_splited[1]]($inst[propOrign]);
        }else{
          let {$is: compName} = inst_captured;
          console.warn(`There is no method '${propOrign}' in component '${compName}'!`);
        }
      }
      delete inst_captured.$propsAfterAttached;
      if(typeof $inst.attached === 'function'){
        $inst.attached(node);
      }
    }
    inst_captured.$loaded = true;
  }
};

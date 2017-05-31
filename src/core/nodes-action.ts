import inst_watched from "ferrugemjs/nodes-watched";

export const detacheNode = (node:HTMLDivElement) => {
	//detacheNode(node.children);
	if(node.children && node.children.length){
		//detacheNode(node.children);
		let node_array = Array.prototype.slice.call(node.children);
		node_array.forEach((subnode:HTMLDivElement) => detacheNode(subnode));
	};
	let key_id:string = node.getAttribute?node.getAttribute("key-id"):""; 
  	//console.log(node);
  	if(key_id && inst_watched[key_id] && inst_watched[key_id].inst.detached){
  		inst_watched[key_id].inst.detached();
  	} 
  	//ajudando o guarbage collector do javascript
  	if(key_id && inst_watched[key_id]){
  		//evitando usar o refresh em um no morto
  		inst_watched[key_id].loaded = false;
  		inst_watched[key_id].inst = null;
  		inst_watched[key_id] = null;
  		delete inst_watched[key_id];
  	};
}

export const attacheNode = (node:HTMLDivElement) => {
	let key_id:string = node.getAttribute?node.getAttribute("key-id"):""; 
  	if(key_id && inst_watched[key_id]){		
	  	//console.log(inst_watched[key_id])	
	  	if(inst_watched[key_id].inst.attached && (!inst_watched[key_id].loaded)){
			inst_watched[key_id].inst.attached();
		}
		inst_watched[key_id].loaded = true;
	}
}
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
	let inst_captured = inst_watched[key_id];
  	if(key_id && inst_captured && inst_captured.inst.disconnectedCallback){
  		inst_captured.inst.disconnectedCallback();
  	} 
  	//ajudando o guarbage collector do javascript
  	if(key_id && inst_captured){
  		//evitando usar o refresh em um no morto
		inst_captured.inst._capture$KeyId = null;
		delete inst_captured.inst._capture$KeyId;
  		inst_captured.loaded = false;
  		inst_captured.inst = null;
  		inst_captured = null;
  		delete inst_watched[key_id];
  	};
}

export const attacheNode = (node:HTMLDivElement) => {
	let key_id:string = node.getAttribute?node.getAttribute("key-id"):""; 
	let inst_captured = inst_watched[key_id];
  	if(key_id && inst_captured){		
	  	//console.log(inst_watched[key_id])	
	  	if(inst_captured.inst.connectedCallback && (!inst_captured.loaded)){
			inst_captured.inst.connectedCallback();
		}
		inst_captured.loaded = true;
	}
}

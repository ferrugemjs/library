import _IDOM = require("incremental-dom");




declare let System:{import:(path:string)=>{
	then:(mod:any)=>void
}};

interface IModuleConfig{
	tag:string;
	target:string;
	host_vars:{};
	static_vars:{className?:string,id?:string};
}

let uid_generated:number = new Date().getTime()+1298;
let inst_watched:{[key:string]:{detached?:Function}}={};

_IDOM.notifications.nodesDeleted = function(nodes:any) {
  //console.log(inst_watched);
  nodes.forEach((node:any)=>{
  	//console.log(node.id);
  	if(inst_watched[node.id] && inst_watched[node.id].detached){
  		inst_watched[node.id].detached();
  		inst_watched[node.id] = null;
  		delete inst_watched[node.id];
  	};    
  });
};

export class AuxClass{
	public changeAttrs(attrs_vars:{},isStatics?:boolean):void{

		if(attrs_vars){		
			for(let propOrign in attrs_vars){
				let notAccepted:boolean = isStatics && (propOrign==="is"||propOrign==="id");
				if(!notAccepted){
					let prop:string = propOrign.toLowerCase().replace(/-(.)/g, function(match, group1) {
	        				return group1.toUpperCase();
	    			});
					let newValue:any = attrs_vars[propOrign];
					if(prop.indexOf(".") > -1){		
	                    let prop_splited:string[] = prop.split(".");
	                    this[prop_splited[0]][prop_splited[1]](newValue);		
					}else{					
						let _onChangedFunction:string = "set"+prop.replace(/(^\D)/g,function(g0,g1){
							return g0.toUpperCase();
						});
						if(this[_onChangedFunction]){						
							this[_onChangedFunction](newValue);
						}else{						
	                   		this[prop] = newValue;
	                   	}
	                }					
				}

			};	        
		}
	}
	public changeProps(host_vars:{},static_vars:{}):void{
		AuxClass.prototype.changeAttrs.call(this,static_vars,true);
		AuxClass.prototype.changeAttrs.call(this,host_vars);

	}
	public compose(path:string,host_vars:{},static_vars:{},contentfn:Function):void{
		let nextuid:string = 'uid_'+(uid_generated++);
		let className:string = "none-found";

		let tmpKey:string = static_vars&&static_vars["key:id"]?static_vars["key:id"]:"";
		tmpKey = host_vars&&host_vars["key:id"]?host_vars["key:id"]:tmpKey;
		if(tmpKey){
			nextuid = tmpKey;
		}

		_IDOM.elementOpen("compose-view", nextuid, ['is','compose-view','view',path,'data-key',tmpKey,'id',nextuid,'class',className]);
			//(<any>this).render.call(this,this);
		_IDOM.elementClose("compose-view");

		System.import(path+".html").then((mod:any)=>{
			let instMod = inst_watched[nextuid]?inst_watched[nextuid]:new mod.default();


			if(!inst_watched[nextuid]){
				inst_watched[nextuid] = instMod;
			}


			//instMod.
			AuxClass.prototype.configComponent.call(instMod,"compose-view",nextuid,host_vars,static_vars);
			instMod.content(contentfn);
			//instMod.content().refresh();
			instMod.refresh();
			document.getElementById(instMod._$el$domref.target).className = instMod["$className$ref_style_name$"];
			//_IDOM.patch(document.getElementById(instMod._$el$domref.target), contentfn.bind(instMod),instMod);
			delete instMod._$el$domref.static_vars;
			delete instMod._$el$domref.host_vars;	    	
		});
	}
	public configComponent(tag: string, target: string, host_vars:{},static_vars:{id:string}): GenericComponent {
		let tmpId:string = static_vars?static_vars.id:"";
		let tmpKey:string = static_vars&&static_vars["key:id"]?static_vars["key:id"]:"";
		if(tmpKey){
			delete static_vars["key:id"];
		}
		
		tmpKey = host_vars&&host_vars["key:id"]?host_vars["key:id"]:tmpKey;
		if(host_vars&&host_vars["key:id"]){
			delete host_vars["key:id"];
		};

		if(tmpKey){
			target = tmpKey;
		}
		//console.log(tmpKey);



		if(tmpId){
			delete static_vars.id;
			host_vars["id"] = tmpId; 
		}
		let tmpNewProps:IModuleConfig = { tag: tag, target: target, host_vars: host_vars ,static_vars: static_vars||{}};
		if((<any>this)._$el$domref && (<any>this)._$el$domref.static_vars){	
			//tmpNewProps.static_vars.id = (<any>this)._$el$domref.static_vars.id;
			//tmpNewProps.static_vars.className = this["$className$ref_style_name$"];
		}
		(<any>this)._$el$domref = tmpNewProps;
		return <any>this;
	}
}
export class GenericComponent{
	public _$el$domref: IModuleConfig;
	private _alredy_load_module :boolean;
	private _$content$_:Function;

	public content($content$?:Function):GenericComponent{
		if($content$){
			this._$content$_ = $content$;
		}else if(this._$content$_){
			this._$content$_();
		}
		return this;
	}
	public refresh():GenericComponent{
		let nextuid:string = 'uid_'+(uid_generated++);
		let _inst_:any = null;

		if (this._$el$domref && this._$el$domref.target) {
			_inst_ = (inst_watched[this._$el$domref.target])?inst_watched[this._$el$domref.target]:this;
		}else{
			_inst_ = this;
		}
		
		if (_inst_._$el$domref && _inst_._$el$domref.target) {	

			

			if(!_inst_._$el$domref.static_vars){
				_inst_._$el$domref.static_vars = {};
				
			}	
			//console.log(this._$el$domref.static_vars);
			//console.log(this._$el$domref.host_vars);
			//console.log(this._$el$domref.static_vars);	
			if(document.getElementById(_inst_._$el$domref.target)){
				//alredy has the target in dom
				//console.log(this._$el$domref.static_vars);
				AuxClass.prototype.changeProps.call(_inst_,_inst_._$el$domref.host_vars,_inst_._$el$domref.static_vars);
				_IDOM.patch(document.getElementById(_inst_._$el$domref.target), (<any>_inst_).render.bind(_inst_),_inst_);
				//_IDOM.patch(document.getElementById(this._$el$domref.target), (<any>this).render.bind(this),this);
				if(!_inst_._alredy_load_module && (<any>_inst_).attached){
					_inst_._alredy_load_module = true;					
				}
				delete _inst_._$el$domref.host_vars;
				delete _inst_._$el$domref.static_vars;	
			}else if(_inst_._$el$domref.target){

				let keyelement:string = _inst_._$el$domref.static_vars.id||nextuid;
				_inst_._$el$domref.static_vars.id = keyelement;
				//first loader in dom
				AuxClass.prototype.changeProps.call(_inst_,_inst_._$el$domref.host_vars,_inst_._$el$domref.static_vars);
				let className:string = _inst_["$className$ref_style_name$"]||_inst_._$el$domref.tag;
				/*
				if(this._$el$domref.static_vars.className){
					className = this._$el$domref.static_vars.className;
				};			
				*/
				_inst_._$el$domref.target = _inst_._$el$domref.target?_inst_._$el$domref.target:_inst_._$el$domref.static_vars.id;				
				_IDOM.elementOpen(_inst_._$el$domref.tag, _inst_._$el$domref.target, ['is',_inst_._$el$domref.tag,'key-data',_inst_._$el$domref.target,'id',_inst_._$el$domref.target,'class',className]);
					(<any>_inst_).render.call(_inst_,_inst_);
				_IDOM.elementClose(_inst_._$el$domref.tag);
				if(!_inst_._alredy_load_module && (<any>_inst_).attached){
					_inst_._alredy_load_module = true;
					(<any>_inst_).attached();
					//AuxClass.prototype.changeProps.call(this,this._$el$domref.host_vars);
				}
				delete _inst_._$el$domref.host_vars;
				delete _inst_._$el$domref.static_vars;

				if(!inst_watched[keyelement]){
					inst_watched[keyelement] = _inst_;
				}
			}	
		}
		return this;
	}
}

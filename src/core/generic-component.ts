import _IDOM = require("incremental-dom");

declare let require:Function

interface IInstWatched{	
	inst?:{detached?:Function,attached:Function,_$key$_:string,render:Function}
	,tag:string
	,alias:string
	,target?:string
	,hostVars?:{}
	,staticVars?:{}
	,extStaticVars?:string[]
	,extHostVars?:string
	,loaded?:boolean
	,content?:Function;
};

let inst_watched:{[key:string]:IInstWatched}={};
let uid_generated:number = new Date().getTime()+1298;

_IDOM.notifications.nodesDeleted = function(nodes:any) {
  nodes.forEach((node:HTMLDivElement)=>{
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
  });
};


_IDOM.notifications.nodesCreated = function(nodes:any) {
  nodes.forEach((node:HTMLDivElement)=>{
  	let key_id:string = node.getAttribute?node.getAttribute("key-id"):""; 
  	
  	if(key_id && inst_watched[key_id]){		
	  	//console.log(inst_watched[key_id])	
	  	if(inst_watched[key_id].inst.attached && (!inst_watched[key_id].loaded)){
			inst_watched[key_id].inst.attached();
		}
		inst_watched[key_id].loaded = true;
	}
 
  	
  });
};



export interface IInstConfig{
	classFactory:any
	,hostVars:{}
	,staticVars:{}
	,tag:string
	,alias?:string
	,target?:string
}
export class FerrugemJSFactory{
	private _$content$_:Function;
	private _$key$_:string;
	private render:Function;
	private attached:Function;
	private detached:Function;
	/*
	 Factory of class
	*/
	public build(config:IInstConfig):FerrugemJSFactory{

		let _key = config.target;
		//find any key
		if(config.hostVars && config.hostVars["key:id"]){
			_key = config.hostVars["key:id"];
			delete config.hostVars["key:id"];
		}else if(config.staticVars && config.staticVars["key:id"]){
			_key = config.staticVars["key:id"];
			delete config.staticVars["key:id"];
		}

		if(config.hostVars && config.hostVars["prop:values"]){
			let _prop_values:{} = config.hostVars["prop:values"];
			delete config.hostVars["prop:values"];
			for(let keyp in _prop_values){
				config.hostVars[keyp]=_prop_values[keyp];
			}
		}else if(config.staticVars && config.staticVars["prop:values"]){
			//_key = config.staticVars["prop:values"];
			delete config.staticVars["prop:values"];
		}

		//append method refresh to prototype
		if(!config.classFactory.prototype.refresh){
			config.classFactory.prototype.refresh = FerrugemJSFactory.prototype.refresh;
		}

		//append method content to prototype
		if(!config.classFactory.prototype.content){
			//config.classFactory.prototype.content = FerrugemJSFactory.prototype.content;
		}

		//lookup for old inst
		if(_key && inst_watched[_key]){
			//remove events already seted
			if(config.hostVars){
				for(var _prop_ in config.hostVars){
					if(_prop_.indexOf(".") > -1){
						delete config.hostVars[_prop_];
					}
				}
			}
			//update dinamics vars from view
			this.changeAttrs.call(inst_watched[_key].inst,config.hostVars);
			return <any>inst_watched[_key].inst;
		}
		//save the new inst in watched insts
		inst_watched[_key] = <any>{ inst: new config.classFactory()};			 
		inst_watched[_key].target = config.target;
		inst_watched[_key].inst["_$key$_"] = _key;
		inst_watched[_key].alias = config.alias;
		inst_watched[_key].tag = config.tag||"div";
		inst_watched[_key].tag = inst_watched[_key].inst["_$attrs$_"]?inst_watched[_key].inst["_$attrs$_"]["name"]:inst_watched[_key].tag;

		this.changeAttrs.call(inst_watched[_key].inst,config.hostVars);
		this.changeAttrs.call(inst_watched[_key].inst,config.staticVars);

		if(inst_watched[_key].inst["_$attrs$_"]){
			inst_watched[_key].extHostVars = inst_watched[_key].inst["_$attrs$_"]["dinamic"];
			inst_watched[_key].extStaticVars = (<any>Object).assign([],inst_watched[_key].inst["_$attrs$_"]["static"]);
		}
		return <any>inst_watched[_key].inst;
	}

	public content($content$?:Function):FerrugemJSFactory{
		//nao eh vinculado a instancia e sim ao watched
		if($content$){
			this._$content$_ = $content$;
		}else if(this._$content$_){
			this._$content$_();
		}
		return this;
	}
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
	                    //console.log(this,prop_splited);
	                    //console.log(this);
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
	public reDraw(){
		let _inst_:IInstWatched =  <any>(inst_watched[this._$key$_]||{inst:this,extStaticVars:[],extHostVars:""});
		_inst_.extHostVars = _inst_.extHostVars||"";
		_inst_.extStaticVars = _inst_.extStaticVars||[];
		_inst_.target = _inst_.target||'uid_'+(uid_generated++)+'_provided';//_IDOM.currentElement().id;
			if(_inst_.extStaticVars.indexOf('id') < 0){
				//caso nao tenha adiciona o target como id
				_inst_.extStaticVars.push('id',_inst_.target);
			}else{
				//sincroniza o id que veio do static com o id do novo elemento
				_inst_.target = _inst_.extStaticVars[_inst_.extStaticVars.indexOf('id')+1];
			}
			if(_inst_.extStaticVars.indexOf('is') < 0 && _inst_.alias){
				_inst_.extStaticVars.push('is',_inst_.alias);
			}
			if(_inst_.inst._$key$_){
				_inst_.extStaticVars.push('key-id',_inst_.inst._$key$_);
			}
		_IDOM.elementOpen(_inst_.tag,_inst_.inst._$key$_,_inst_.extStaticVars, ... new Function(
			'$_this_$'
			,'return ['+_inst_.extHostVars+']'
		)(_inst_.inst));
			_inst_.inst.render(_inst_.inst);			
		_IDOM.elementClose(_inst_.tag);
	}
	public refresh(props?:{}):void{
		let _inst_:IInstWatched =  inst_watched[this._$key$_]||<any>{inst:this};
		if(props){
			FerrugemJSFactory.prototype.changeAttrs.apply(_inst_.inst,[props]);
		}
		if((_inst_.loaded||_inst_.alias=="compose-view") && _inst_.target && document.getElementById(_inst_.target)){
			let elementDom = document.getElementById(_inst_.target);
			if(_inst_.extHostVars&&_inst_.extHostVars!=='""'){
				let converted_to_array:string[] = new Function(
					'$_this_$'
					,'return ['+_inst_.extHostVars+']'
				)(_inst_.inst);	
				converted_to_array.forEach((attrkey,$indx)=>{
					let skypeZero = $indx||2;
					if(skypeZero % 2 === 0){
						elementDom.setAttribute(attrkey,converted_to_array[$indx+1]);
					}					
				});
			}
			_IDOM.patch(elementDom,_inst_.inst.render,_inst_.inst);	
		}
	}
	public compose(path:string,target:string,host_vars:{},static_vars:{},contentfn:Function):void{
		require([path+".html"],(mod:any)=>{
			let _inst_ = this.build({
					classFactory:mod.default
					,hostVars:host_vars
					,staticVars:static_vars
					,target:target
					,alias:"compose-view"
					,tag:"div"
			});
			//console.log(inst_watched[_inst_._$key$_]);
			//emprestando metodo content e anexando ao watch e nao a instancia
			FerrugemJSFactory.prototype.content.call(
				inst_watched[_inst_._$key$_]
				,contentfn
			);
			_inst_.refresh();

			if(_inst_.attached && (!inst_watched[_inst_._$key$_].loaded)){
				_inst_.attached();
			}
			inst_watched[_inst_._$key$_].loaded = true;

		});		
	}
}

export default new FerrugemJSFactory();

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
};

let inst_watched:{[key:string]:IInstWatched}={};
let uid_generated:number = new Date().getTime()+1298;

_IDOM.notifications.nodesDeleted = function(nodes:any) {
  //console.log(nodes,inst_watched);
  nodes.forEach((node:HTMLDivElement)=>{
  	let key_id:string = node.getAttribute?node.getAttribute("key-id"):""; 
  	if(key_id && inst_watched[key_id] && inst_watched[key_id].inst.detached){
  		inst_watched[key_id].inst.detached();
  	} 
  	if(key_id && inst_watched[key_id]){
  		inst_watched[key_id].inst = null;
  		inst_watched[key_id] = null;
  		delete inst_watched[key_id];
  	};  
  });
};


_IDOM.notifications.nodesCreated = function(nodes:any) {
  //console.log(nodes,inst_watched);
  nodes.forEach((node:HTMLDivElement)=>{
  	let key_id:string = node.getAttribute?node.getAttribute("key-id"):""; 
  	if(key_id && inst_watched[key_id] && inst_watched[key_id].inst.attached && (!inst_watched[key_id].loaded)){
  		inst_watched[key_id].loaded = true;
  		inst_watched[key_id].inst.attached();
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
	//private _$attrs$_:{name:string,attribs:{static:string[],dinamic:string}}
	private render:Function;
	private attached:Function;
	private detached:Function;
	/*
	 Factory of class
	*/
	public build(config:IInstConfig):FerrugemJSFactory{

		let _key = "";
		//find any key
		if(config.hostVars && config.hostVars["key:id"]){
			_key = config.hostVars["key:id"];
			delete config.hostVars["key:id"];
		}else if(config.staticVars && config.staticVars["key:id"]){
			_key = config.staticVars["key:id"];
			delete config.staticVars["key:id"];
		}

		//append methods refresh and content to prototype
		if(!config.classFactory.prototype.refresh){
			config.classFactory.prototype.refresh = FerrugemJSFactory.prototype.refresh;
		}

		//append methods refresh and content to prototype
		if(!config.classFactory.prototype.content){
			config.classFactory.prototype.content = FerrugemJSFactory.prototype.content;
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
		//if(_key && !inst_watched[_key]){
			inst_watched[_key] = <any>{ inst: new config.classFactory()};			 
			inst_watched[_key].target = config.target;
			inst_watched[_key].inst["_$key$_"] = _key;
			inst_watched[_key].alias = config.alias;
			inst_watched[_key].tag = config.tag||"div";
			inst_watched[_key].tag = inst_watched[_key].inst["_$attrs$_"]?inst_watched[_key].inst["_$attrs$_"]["name"]:inst_watched[_key].tag;
			//console.log(inst_watched[_key]);
			//inst_watched[_key].tag = !inst_watched[];
			this.changeAttrs.call(inst_watched[_key].inst,config.hostVars);
			this.changeAttrs.call(inst_watched[_key].inst,config.staticVars);

			//console.log('2',inst_watched[_key]);
			if(inst_watched[_key].inst["_$attrs$_"]){
				inst_watched[_key].extHostVars = inst_watched[_key].inst["_$attrs$_"]["dinamic"];
				inst_watched[_key].extStaticVars = Object.assign([],inst_watched[_key].inst["_$attrs$_"]["static"]);
				//console.log(inst_watched[_key].extStaticVars,inst_watched[_key].inst["_$attrs$_"]["static"])
				//nao deletar, guargar para as proximas instancias
				//delete inst_watched[_key].inst["_$attrs$_"]["dinamic"];
				//delete inst_watched[_key].inst["_$attrs$_"]["static"];
				//delete inst_watched[_key].inst["_$attrs$_"]["name"];
				//delete inst_watched[_key].inst["_$attrs$_"];			
			}
			//console.log(inst_watched[_key]);
			return inst_watched[_key].inst;
		//}


		//only a temp class instance
		/*
		let _inst_ = new config.classFactory();
		_inst_["_$target$_"] = config.target;
		_inst_["_$tagName$_"] = config.tag;
		this.changeAttrs.call(_inst_,config.hostVars);
		this.changeAttrs.call(_inst_,config.staticVars);
		
		//console.log('3');
		return _inst_;
		//return <any>{};
		*/
	}

	public content($content$?:Function):FerrugemJSFactory{
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
		let _inst_:IInstWatched =  inst_watched[this._$key$_]||{inst:this,extStaticVars:[],extHostVars:""};
		_inst_.extHostVars = _inst_.extHostVars||"";
		_inst_.extStaticVars = _inst_.extStaticVars||[];
		_inst_.target = _inst_.target||'uid_'+(uid_generated++)+'_provided';//_IDOM.currentElement().id;
		//console.log('166',_inst_);
		//if(_inst_.extStaticVars){
			//verifica se ja tem um id no static
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
		//console.log('182',_inst_);
		//}
		//console.log(_inst_);
		_IDOM.elementOpen(_inst_.tag,_inst_.inst._$key$_,_inst_.extStaticVars, ... new Function(
			'$_this_$'
			,'return ['+_inst_.extHostVars+']'
		)(_inst_.inst));
			_inst_.inst.render(_inst_.inst);			
		_IDOM.elementClose(_inst_.tag);
		/*
		if(!_inst_.loaded && _inst_.inst.attached){					
			_inst_.inst.attached();
		}
		if(!_inst_.loaded){
			_inst_.loaded = true;
		}
		*/
	}
	public refresh():void{
		let _inst_:IInstWatched =  inst_watched[this._$key$_]||<any>{inst:this};
		if(_inst_.target && document.getElementById(_inst_.target)){
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
		/*
		if(!_inst_.loaded && _inst_.inst.attached){					
			_inst_.inst.attached();
		}
		if(!_inst_.loaded){
			_inst_.loaded = true;
		}
		*/
	}
	public compose(path:string,target:string,host_vars:{},static_vars:{},contentfn:Function):void{
		require([path+".html"],(mod:any)=>{
			this.build({
				classFactory:mod.default
				,hostVars:host_vars
				,staticVars:static_vars
				,target:target
				,alias:"compose-view"
				,tag:"div"
			}).content(contentfn).refresh();
		});		
	}
}

export default new FerrugemJSFactory();

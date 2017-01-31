import _IDOM = require("incremental-dom");

declare let System:{import:(path:string)=>{
	then:(mod:any)=>void
}};

let inst_watched:{[key:string]:{detached?:Function}}={};
let uid_generated:number = new Date().getTime()+1298;

_IDOM.notifications.nodesDeleted = function(nodes:any) {
  //console.log(inst_watched);
  //console.log(inst_watched);
  nodes.forEach((node:any)=>{
  	//console.log(node);
  	if(node.id && inst_watched[node.id] && inst_watched[node.id].detached){
  		inst_watched[node.id].detached();
  	} 
  	if(node.id && inst_watched[node.id]){
  		inst_watched[node.id] = null;
  		delete inst_watched[node.id];
  	};  
  });
};

export class FerrugemJSFactory{
	private _$content$_:Function;
	private _$target$_:string;
	private _$loaded$_:boolean;
	private _$key$_:string;
	private _$style_name$_:string;
	private _$tag_name$_:string;
	private render:Function;
	private attached:Function;
	private detached:Function;
	/*
	 Factory of class
	*/
	public build(config:{
		classFactory:any
		,hostVars:{}
		,staticVars:{}
		,tagName:string
		,target:string
	}):FerrugemJSFactory{

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
			//console.log('1',inst_watched[_key]);
			return inst_watched[_key];
		}
		//save the new inst in watched insts
		if(_key && !inst_watched[_key]){
			inst_watched[_key] = new config.classFactory();
			inst_watched[_key]["_$target$_"] = config.target;
			inst_watched[_key]["_$key$_"] = _key;
			inst_watched[_key]["_$tagName$_"] = config.tagName;
			this.changeAttrs.call(inst_watched[_key],config.hostVars);
			this.changeAttrs.call(inst_watched[_key],config.staticVars);

			//console.log('2',inst_watched[_key]);
			return inst_watched[_key];
		}
		//only a temp class
		let _inst_ = new config.classFactory();
		_inst_["_$target$_"] = config.target;
		_inst_["_$tagName$_"] = config.tagName;
		this.changeAttrs.call(_inst_,config.hostVars);
		this.changeAttrs.call(_inst_,config.staticVars);
		//console.log('3',_inst_);
		return _inst_;
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
	public refresh():void{
		let _inst_ = this;	
		if(_inst_._$target$_ && document.getElementById(_inst_._$target$_)){
			//old element
			_IDOM.patch(document.getElementById(_inst_._$target$_),_inst_.render.bind(_inst_),_inst_);
			if(!_inst_._$loaded$_ && _inst_.attached){
				_inst_._$loaded$_ = true;	
				_inst_.attached();
				document.getElementById(_inst_._$target$_).className = _inst_._$style_name$_||_inst_._$tag_name$_;				
			}	
		}else{
			//first load in dom
			//console.log('first load',_inst_._$tag_name$_);
			_inst_._$target$_ = _inst_._$target$_?_inst_._$target$_:'uid_'+(uid_generated++);			
			let className:string = _inst_._$style_name$_||_inst_._$tag_name$_;
			_IDOM.elementOpen(_inst_._$tag_name$_, _inst_._$key$_?_inst_._$key$_:null, ['is',_inst_._$tag_name$_,'id',_inst_._$target$_,'class',className]);
				(<any>_inst_).render.call(_inst_,_inst_);
			_IDOM.elementClose(_inst_._$tag_name$_);
			if(!_inst_._$loaded$_ && _inst_.attached){
				_inst_._$loaded$_ = true;
				_inst_.attached();
			}
		}
	}
	public compose(path:string,target:string,host_vars:{},static_vars:{},contentfn:Function):void{
		System.import(path+".html").then((mod:any)=>{
			this.build({
				classFactory:mod.default
				,hostVars:host_vars
				,staticVars:static_vars
				,target:target
				,tagName:"compose-view"
			}).content(contentfn).refresh();  
			
		});		
	}
}

export default new FerrugemJSFactory();
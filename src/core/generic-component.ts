import _IDOM = require("incremental-dom");

declare let require:Function

let inst_watched:{[key:string]:{detached?:Function,tag:string}}={};
let uid_generated:number = new Date().getTime()+1298;

_IDOM.notifications.nodesDeleted = function(nodes:any) {
  nodes.forEach((node:any)=>{
  	if(node.id && inst_watched[node.id] && inst_watched[node.id].detached){
  		inst_watched[node.id].detached();
  	} 
  	if(node.id && inst_watched[node.id]){
  		inst_watched[node.id] = null;
  		delete inst_watched[node.id];
  	};  
  });
};

export interface IInstConfig{
	classFactory:any
	,hostVars:{}
	,staticVars:{}
	,tagName:string
	,target?:string
}
export class FerrugemJSFactory{
	private _$content$_:Function;
	private _$target$_:string;
	private _$loaded$_:boolean;
	private _$key$_:string;
	private _$style_name$_:string;
	private _$tag_name$_:string;
	private _$atrrs$_:{name:string,attribs:{static:string[],dinamic:string}}
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
			//console.log('1',inst_watched[_key]);
			//remove events already seted
			//console.log('before',Object.assign({},config.hostVars));
			if(config.hostVars){
				for(var _prop_ in config.hostVars){
					if(_prop_.indexOf(".") > -1){
						delete config.hostVars[_prop_];
					}
				}
			}
			//console.log('after',config.hostVars);
			//update dinamics vars from view
			this.changeAttrs.call(inst_watched[_key],config.hostVars);
			return <any>inst_watched[_key];
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
			return <any>inst_watched[_key];
		}
		//only a temp class instance
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
	public reDraw(){
		let _inst_ = this;
		_inst_._$target$_ = _inst_._$target$_||'uid_'+(uid_generated++)+'_provided';//_IDOM.currentElement().id;
		//cria uma copia para evitar alterar o prototype
		let static_attrs = Object.assign([],_inst_._$atrrs$_.attribs.static);
		//verifica se ja tem um id no static
		if(static_attrs.indexOf('id') < 0){
			//caso nao tenha adiciona o target como id
			static_attrs.push('id',_inst_._$target$_);
		}else{
			//sincroniza o id que veio do static com o id do novo elemento
			_inst_._$target$_ = static_attrs[static_attrs.indexOf('id')+1];
		}
		if(static_attrs.indexOf('is') < 0){
			//static_attrs.unshift(_inst_["is"],'is');
			//static_attrs.unshift(_inst_["is"]);
			//static_attrs.unshift('is');
			static_attrs.push('is',_inst_["is"]);
		}
		_IDOM.elementOpen(_inst_._$atrrs$_.name,_inst_._$key$_,static_attrs, ... new Function(
			'$_this_$'
			,'return ['+_inst_._$atrrs$_.attribs.dinamic+']'
		)(_inst_));
			_inst_.render(_inst_);			
		_IDOM.elementClose(_inst_._$atrrs$_.name);
		if(!_inst_._$loaded$_ && _inst_.attached){					
			_inst_.attached();
		}
		if(!_inst_._$loaded$_){
			_inst_._$loaded$_ = true;
		}
	}
	public refresh():void{
		let _inst_ = this;
		if(_inst_._$target$_ && document.getElementById(_inst_._$target$_)){
			let elementDom = document.getElementById(_inst_._$target$_);
			if(_inst_._$atrrs$_.attribs.dinamic&&_inst_._$atrrs$_.attribs.dinamic!=='""'){
				let converted_to_array:string[] = new Function(
					'$_this_$'
					,'return ['+_inst_._$atrrs$_.attribs.dinamic+']'
				)(_inst_);	
				converted_to_array.forEach((attrkey,$indx)=>{
					let skypeZero = $indx||2;
					if(skypeZero % 2 === 0){
						elementDom.setAttribute(attrkey,converted_to_array[$indx+1]);
					}					
				});
			}
			_IDOM.patch(elementDom,_inst_.render,_inst_);	
		}
		if(!_inst_._$loaded$_ && _inst_.attached){					
			_inst_.attached();
		}
		if(!_inst_._$loaded$_){
			_inst_._$loaded$_ = true;
		}
	}
	public compose(path:string,target:string,host_vars:{},static_vars:{},contentfn:Function):void{
		require([path+".html"],(mod:any)=>{
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

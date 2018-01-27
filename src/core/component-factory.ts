import _IDOM = require("incremental-dom");
import {IInstConfig} from "ferrugemjs/i-inst-config";
import {IInstWatched} from "ferrugemjs/i-inst-watched";
import inst_watched from "ferrugemjs/nodes-watched";
import {detacheNode,attacheNode} from "ferrugemjs/nodes-action";

declare let require:Function;
declare let __webpack_require__:Function;

let uid_generated:number = new Date().getTime()+1298;

_IDOM.notifications.nodesDeleted = function(nodes:HTMLDivElement[]) {
  nodes.forEach(node => detacheNode(node));
};

_IDOM.notifications.nodesCreated = function(nodes:HTMLDivElement[]) {
  nodes.forEach(node => attacheNode(node));
};

_IDOM.attributes.value = function (el:any, name:string, value:any) {
  el.value = value === null || typeof (value) === 'undefined' ? '' : value;
};

_IDOM.attributes.checked = function (el:any, name:string, value:any) {
  el.checked = !!value;
};

class ComponentFactory{
	private _$content$_:Function;
	private _capture$KeyId:() => string;
	private render:Function;
	private connectedCallback:Function;
	private disconnectedCallback:Function;
	private attributeChangedCallback:(attrName:string, oldVal:any, newVal:any) => void;
	public config:{templateExtension:string} = {templateExtension:".html"};
	/*
	 Factory of class
	*/
	public build(config:IInstConfig):ComponentFactory{

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
			//console.log(config.hostVars["prop:values"])
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
			config.classFactory.prototype.refresh = ComponentFactory.prototype.refresh;
		}

		//append method content to prototype
		//if(!config.classFactory.prototype.content){
			//config.classFactory.prototype.content = ComponentFactory.prototype.content;
		//}

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
		//inst_watched[_key].inst["_$key$_"] = _key;
		if(!inst_watched[_key].inst._capture$KeyId){
			(function(p_key:string){
				inst_watched[_key].inst._capture$KeyId = function(){
					return p_key;
				};
			}(_key));
		}

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

	public content($content$?:Function):ComponentFactory{
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
			let forbiddenAttrList:string[] = ["key-id","is"];
			// console.dir(attrs_vars);
			for(let propOrign in attrs_vars){
				if(forbiddenAttrList.indexOf(propOrign) < 0 ){			
					let notAccepted:boolean = isStatics && (propOrign === "id" || propOrign === "is");
					if(!notAccepted){
		                let prop:string = propOrign;
		                if(prop.indexOf("-") > -1){
		                    prop = propOrign.toLowerCase().replace(/-(.)/g, function(match, group1) {
		                        return group1.toUpperCase();
		                    });  
		                }
						let newValue:any = attrs_vars[propOrign];
						let regx = /(\w*)+\.if$/g;
						if(regx.test(prop)){
							let attrcondi = prop.replace(".if","");
							if(newValue){
								this[attrcondi] = attrcondi;
							}else{
								delete this[attrcondi];
							}
                        }else if(prop.indexOf(".") > -1){	
			                let prop_splited:string[] = prop.split(".");
			                this[prop_splited[0]][prop_splited[1]](newValue);		
						}else{
							let oldValue = this[prop];
							this[prop] = newValue;
							if(this.attributeChangedCallback){						
								this.attributeChangedCallback(prop,oldValue,newValue);
							}
			            }					
					}
				}
			}	        
		}
	}
	public reDraw(){
		let _$key$_:string = this._capture$KeyId ? this._capture$KeyId() : "";
		let _inst_:IInstWatched =  <any>(inst_watched[_$key$_]||{inst:this,extStaticVars:[],extHostVars:""});
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
			if(_$key$_){
				_inst_.extStaticVars.push('key-id', _$key$_);
			}
		_IDOM.elementOpen(_inst_.tag,_$key$_,_inst_.extStaticVars, ... new Function(
			'$_this_$'
			,'return ['+_inst_.extHostVars+']'
		)(_inst_.inst));
			_inst_.inst.render(_inst_.inst);			
		_IDOM.elementClose(_inst_.tag);
	}
	public refresh(props?:{} | Function):void{
		let _$key$_:string = this._capture$KeyId ? this._capture$KeyId() : "";
		let _inst_:IInstWatched =  inst_watched[_$key$_]||<any>{inst:this};
		
		let shouldUpdate:boolean = true;

		if(_inst_.inst.shouldUpdateCallback){
			shouldUpdate = _inst_.inst.shouldUpdateCallback(Object.assign({},_inst_.inst,props));
		}
		if(shouldUpdate){
			if(props && typeof props === "function"){
				ComponentFactory.prototype.changeAttrs.apply(_inst_.inst,[
				props(_inst_.inst)
				]);
			}else if(props){
				ComponentFactory.prototype.changeAttrs.apply(_inst_.inst,[props]);
			}
			if((_inst_.loaded || _inst_.alias === "compose-view") && _inst_.target && document.getElementById(_inst_.target)){
				let elementDom = document.getElementById(_inst_.target);
				if(_inst_.extHostVars && _inst_.extHostVars!=='""'){
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
				// console.log(_inst_);
				if(_inst_["is"]){
					elementDom.setAttribute("is",_inst_["is"]);
				}				
				_IDOM.patch(elementDom,_inst_.inst.render,_inst_.inst);	
			}
		}
	}
	public compose(path:string,target:string,host_vars:{},static_vars:{},contentfn:Function):void{
		//console.log(static_vars["is"],":",path, path.substring(path.lastIndexOf("/")+1,path.length));
		//static_vars["is"] = static_vars["is"]+ " " + path.substring(path.lastIndexOf("/")+1,path.length);
		const handlerLoad = (mod:any) => {
			let _inst_ = this.build({
					classFactory:mod.default
					,hostVars:host_vars
					,staticVars:static_vars
					,target:target
					,alias:"compose-view"
					,tag:"div"
			});
			let _$key$_:string = _inst_._capture$KeyId ? _inst_._capture$KeyId() : "";
			//console.log(inst_watched[_inst_._$key$_]);
			//emprestando metodo content e anexando ao watch e nao a instancia
			inst_watched[_$key$_]["is"] = path.substring(path.lastIndexOf("/")+1,path.length);
			
			ComponentFactory.prototype.content.call(
				inst_watched[_$key$_]
				,contentfn
			);
			_inst_.refresh();
			// _inst_.
			if(_inst_.connectedCallback && (!inst_watched[_$key$_].loaded)){
				// let elementDom = document.getElementById(_inst_.id);
				// console.log(_inst_,inst_watched[_$key$_]);
				// let isVar = path.substring(path.lastIndexOf("/")+1,path.length);
				// elementDom.setAttribute("is",isVar);
				_inst_.connectedCallback();
			}
			if(_$key$_ && inst_watched[_$key$_]){
				inst_watched[_$key$_].loaded = true;
			}
		};

		if(typeof __webpack_require__ === 'function'){
			require([`root_app/${path}${this.config.templateExtension}`],handlerLoad.bind(this));
		}else{
			require([`${path}${this.config.templateExtension}`],handlerLoad.bind(this));
		}
	}
}

export default new ComponentFactory();

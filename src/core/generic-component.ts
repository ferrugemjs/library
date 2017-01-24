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
		_IDOM.elementOpen("compose-view", nextuid, ['is','compose-view','view',path,'id',nextuid,'class',className]);
			//(<any>this).render.call(this,this);
		_IDOM.elementClose("compose-view");

		System.import(path+".html").then((mod:any)=>{
			let instMod = new mod.default();
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
		if (this._$el$domref) {	
			if(!this._$el$domref.static_vars){
				this._$el$domref.static_vars = {};
				
			}			
			if(document.getElementById(this._$el$domref.target)){
				//alredy has the target in dom
				//console.log(this._$el$domref.static_vars);
				AuxClass.prototype.changeProps.call(this,this._$el$domref.host_vars,this._$el$domref.static_vars);
				
				_IDOM.patch(document.getElementById(this._$el$domref.target), (<any>this).render.bind(this),this);
				if(!this._alredy_load_module && (<any>this).attached){
					this._alredy_load_module = true;
					(<any>this).attached();
				}
				delete this._$el$domref.host_vars;
				delete this._$el$domref.static_vars;	
			}else if(this._$el$domref.target){
				this._$el$domref.static_vars.id = this._$el$domref.static_vars.id||nextuid;
				//first loader in dom
				AuxClass.prototype.changeProps.call(this,this._$el$domref.host_vars,this._$el$domref.static_vars);
				let className:string = this["$className$ref_style_name$"]||this._$el$domref.tag;
				/*
				if(this._$el$domref.static_vars.className){
					className = this._$el$domref.static_vars.className;
				};			
				*/
				this._$el$domref.target = this._$el$domref.static_vars.id;				
				_IDOM.elementOpen(this._$el$domref.tag, this._$el$domref.static_vars.id, ['is',this._$el$domref.tag,'id',this._$el$domref.static_vars.id,'class',className]);
					(<any>this).render.call(this,this);
				_IDOM.elementClose(this._$el$domref.tag);
				if(!this._alredy_load_module && (<any>this).attached){
					this._alredy_load_module = true;
					(<any>this).attached();
					//AuxClass.prototype.changeProps.call(this,this._$el$domref.host_vars);
				}
				delete this._$el$domref.host_vars;
				delete this._$el$domref.static_vars;
			}else{
				if((<any>this).detached){
					(<any>this).detached();
					let $this = this;
					setTimeout(()=>{
						$this=null;
					});
				}
			}	
		}
		return this;
	}
}

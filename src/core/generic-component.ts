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

export class AuxClass{
	public changeProps(host_vars:{},static_vars:{}):void{
		if(host_vars){			
			for(let propOrign in host_vars){
				let prop:string = propOrign.toLowerCase().replace(/-(.)/g, function(match, group1) {
        				return group1.toUpperCase();
    			});
				let newValue:any = host_vars[propOrign];
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
			};	        
		}
		if(static_vars){
			for(let propOrign in static_vars){
				let prop:string = propOrign.toLowerCase().replace(/-(.)/g, function(match, group1) {
        				return group1.toUpperCase();
    			});
				let newValue:any = static_vars[propOrign];
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
			};
		}
	}
	public compose(path:string,host_vars:{},static_vars:{},contentfn:Function):void{
		let nextuid:string = 'uid_'+(uid_generated++);

		let className:string = "nonefound";
		_IDOM.elementOpen("div", nextuid, ['id',nextuid,'class',className]);
			//(<any>this).render.call(this,this);
		_IDOM.elementClose("div");

		System.import(path+".html").then((mod:any)=>{
			let instMod = new mod.default();
			//instMod.
			AuxClass.prototype.configComponent.call(instMod,"compose",nextuid,host_vars,static_vars);
			instMod.content(contentfn);
			//instMod.content().refresh();

			instMod.refresh();
			//console.log(instMod["$className$ref_style_name$"]);
			document.getElementById(instMod._$el$domref.target).className = instMod["$className$ref_style_name$"];
			//_IDOM.patch(document.getElementById(instMod._$el$domref.target), contentfn.bind(instMod),instMod);
			delete instMod._$el$domref.static_vars;	    	
		});
		//console.log(path,host_vars);
	}
	public configComponent(tag: string, target: string, host_vars:{},static_vars:{}): GenericComponent {
		//console.log(this["$className$ref_style_name$"]);
		let tmpNewProps:IModuleConfig = { tag: tag, target: target, host_vars: host_vars ,static_vars: static_vars||{}};
		if((<any>this)._$el$domref && (<any>this)._$el$domref.static_vars){
			tmpNewProps.static_vars.id = (<any>this)._$el$domref.static_vars.id;
			//tmpNewProps.static_vars.className = this["$className$ref_style_name$"];
		}
		//let className:string = (<any>this)._$el$domref.static_vars.className;
		(<any>this)._$el$domref = tmpNewProps;
		//(<any>this)._$el$domref.static_vars.className = className;
		//console.log((<any>this)._$el$domref);
		return <any>this;
	}
}
let uid_generated:number = new Date().getTime()+1298;
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
			this._$el$domref.static_vars.id = this._$el$domref.static_vars.id||nextuid;
			
			
			if(document.getElementById(this._$el$domref.target)){
				//alredy has the target in dom
				console.log(this._$el$domref.static_vars);
				AuxClass.prototype.changeProps.call(this,this._$el$domref.host_vars,this._$el$domref.static_vars);
				delete this._$el$domref.host_vars;
				_IDOM.patch(document.getElementById(this._$el$domref.target), (<any>this).render.bind(this),this);
				if(!this._alredy_load_module && (<any>this).attached){
					this._alredy_load_module = true;
					(<any>this).attached();
				}	
			}else if(this._$el$domref.target){
				//first loader in dom
				AuxClass.prototype.changeProps.call(this,this._$el$domref.host_vars,this._$el$domref.static_vars);
				delete this._$el$domref.host_vars;
				
				let className:string = this["$className$ref_style_name$"]||this._$el$domref.tag;
				/*
				if(this._$el$domref.static_vars.className){
					className = this._$el$domref.static_vars.className;
				};			
				*/
				this._$el$domref.target = this._$el$domref.static_vars.id;				
				_IDOM.elementOpen("div", this._$el$domref.static_vars.id, ['id',this._$el$domref.static_vars.id,'class',className]);
					(<any>this).render.call(this,this);
				_IDOM.elementClose("div");
				if(!this._alredy_load_module && (<any>this).attached){
					this._alredy_load_module = true;
					(<any>this).attached();
					//AuxClass.prototype.changeProps.call(this,this._$el$domref.host_vars);
				}
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

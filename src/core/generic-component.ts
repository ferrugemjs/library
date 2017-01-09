import _IDOM = require("incremental-dom");

interface IModuleConfig{
	tag:string;
	target:string;
	host_vars:{};
	static_vars:{};
}

export class AuxClass{
	public changeProps(host_vars:string[]):void{
		if(host_vars){			
			for(let propOrign in host_vars){
				let prop:string = propOrign.toLowerCase().replace(/-(.)/g, function(match, group1) {
        				return group1.toUpperCase();
    			});
				let newValue:any = host_vars[propOrign];
				if(prop.indexOf(".") > -1){										
					let prop_inst_ref:Function =  null;
                    eval("prop_inst_ref = this." + prop );                    
                    if(prop_inst_ref){
                        prop_inst_ref(newValue);
                    }					
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
	public configComponent(tag: string, target: string, host_vars:{},static_vars:{}): GenericComponent {
		(<any>this)._$el$domref = { tag: tag, target: target, host_vars: host_vars ,static_vars: static_vars};
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
		if (this._$el$domref) {					
			if(document.getElementById(this._$el$domref.target)){
				AuxClass.prototype.changeProps.call(this,this._$el$domref.host_vars);
				delete this._$el$domref.host_vars;
				_IDOM.patch(document.getElementById(this._$el$domref.target), (<any>this).render.bind(this),this);
				if(!this._alredy_load_module && (<any>this).attached){
					this._alredy_load_module = true;
					(<any>this).attached();
				}	
			}else if(this._$el$domref.target){
				AuxClass.prototype.changeProps.call(this,this._$el$domref.host_vars);
				delete this._$el$domref.host_vars;
				_IDOM.elementOpen("div", this._$el$domref.target, ['id',this._$el$domref.target,'class',this._$el$domref.tag]);
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

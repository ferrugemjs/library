import _IDOM = require("incremental-dom");

interface IModuleConfig{
	tag:string;
	target:string;
	host_vars:string[];
}

export class AuxClass{
	public changeProps(host_vars:string[]):void{
		//console.log(host_vars);
		if(host_vars && host_vars.length > 1){
			let host_vars_count:number = host_vars.length;
			for(let i:number = 0;i < host_vars_count;i+=2){
				//console.log(i);
				//console.log(host_vars[i]);
				//console.log(host_vars[i],host_vars[i+1]);
				let prop:string = host_vars[i];
				let newValue:any = host_vars[i+1];
				let _onChangedFunction:string = "set"+prop.replace(/(^\D)/g,function(g0,g1){
					return g0.toUpperCase();
				});
				if(this[_onChangedFunction]){
					this[_onChangedFunction](newValue);
				}else{
                   	this[prop] = newValue;
                }
			};	        
		}
	}
	public configComponent(tag: string, target: string, host_vars: string[], ...extra_attr: string[]): GenericComponent {
		//console.log(tag);
		//console.log(host_vars);
		//console.log(target);			
		if (extra_attr) {
			if (!host_vars) {
				host_vars = [];
			};
			extra_attr.forEach((key) => {
				host_vars.push(key);
			});
		};
		//console.log(host_vars);
		(<any>this)._$el$domref = { tag: tag, target: target, host_vars: host_vars };
		return <any>this;
	}
}

let unique_id_ui_component_store:number = new Date().getMilliseconds();

export class GenericComponent{
	public _$el$domref: IModuleConfig;
	private _alredy_load_module :boolean;

	public content():GenericComponent{
		return this;
	}
	public refresh():GenericComponent{
		if (this._$el$domref) {
			if(document.getElementById(this._$el$domref.target)){
				_IDOM.patch(document.getElementById(this._$el$domref.target), (<any>this).render.bind(this),this);
				if(!this._alredy_load_module && (<any>this).attached){
					this._alredy_load_module = true;
					(<any>this).attached();
				}	
			}else if(this._$el$domref.target){
				let tmpIdElement: string = "custom_element_id_"+(unique_id_ui_component_store++);
				this._$el$domref.target = tmpIdElement;
				//console.log(tmpIdElement);
				_IDOM.elementOpen("div", this._$el$domref.target, ['id',this._$el$domref.target,'class',this._$el$domref.tag]);
					(<any>this).render.call(this,this);
				_IDOM.elementClose("div");
				if(!this._alredy_load_module && (<any>this).attached){
					this._alredy_load_module = true;
					(<any>this).attached();
					//console.log('hora de mudar ne!!!');
					AuxClass.prototype.changeProps.call(this,this._$el$domref.host_vars);
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

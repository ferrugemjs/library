import _IDOM = require("incremental-dom");
import registerTag from "./register-tag";

declare var System:any;

interface IAfterLoad{
	content:(cb:Function)=>void;
}

interface IModuleConfig{
	tag:string;
	target:string;
	host_vars:string[];
	content?:Function;
}

class GenericComponentRefresh{
	private _$el$domref: any;
	refresh():void{
		if (this._$el$domref) {
			if(document.getElementById(this._$el$domref)){
				_IDOM.patch(document.getElementById(this._$el$domref), function() {
					this._$render_from_powerup(this, registerTag, loadTag);
				}.bind(this));
			}else{
				if(this.removed){
					this.removed();
					let $this = this;
					setTimeout(()=>{
						$this=null;
					});
				}
			}
		}
	}
	private removed():void{

	}
}

class LoadTag{
	constructor(){}
	private initModule(mod:IModuleConfig):void{
		if(document.getElementById(mod.target)){
			let tmpTagReg = registerTag.getRegistred(mod.tag);
	        let controlInt = new tmpTagReg._$controller();            
	        controlInt._$el$domref = mod.target;
	        //controlInt._$content = mod.content;        
		  	controlInt.refresh();
			if(controlInt.attached){
				controlInt.attached();
			};
			this.changeProps(controlInt,mod.host_vars);
		}
	}
	public load(tag:string,target:string,host_vars:string[],...extra_attr:string[]):IAfterLoad{
		//console.log(tag);
		//console.log(host_vars);
		let tmpTagReg = registerTag.getRegistred(tag);
		let tmpIdElement:string = "custom_element_id_"+new Date().getTime();		
		_IDOM.elementOpen("div", tmpIdElement, ['id',tmpIdElement]);
		_IDOM.elementClose("div");
		//console.log(tmpTagReg);
		//this.actualModule = 
		//this.actualModule = {tag:tmpTagReg.tag,target:tmpIdElement,host_vars:host_vars};
		
		if(extra_attr){
			if(!host_vars){
				host_vars = [];
			};
			extra_attr.forEach((key)=>{
				host_vars.push(key);			
			});
		};
		let tmpObjModule:IModuleConfig = {tag:tmpTagReg.tag,target:tmpIdElement,host_vars:host_vars};
		if(tmpTagReg && tmpTagReg._$controller){
			//console.log("loaded!");
			//this.actualModule.loaded = true;
			this.initModule(tmpObjModule);
		}else{
			if(!tmpTagReg.loading){
				//console.log(`loading ... ${tmpTagReg.tag}`);
				let tmpThis = this;
				registerTag.setLoading(tmpTagReg.tag);
				System.import(tmpTagReg.url).then((_controller:any)=>{
					let _controllerName:string = Object.keys(_controller)[0];
					registerTag.config(tmpTagReg.tag,_controller[_controllerName]);
						
					//importing the render					
					System.import(tmpTagReg.url+".html").then((_sub_comp:any)=>{			
						let _modname:string = Object.keys(_sub_comp)[0];
				    	if(!_controller[_controllerName].prototype.refresh){
				    		
				    		_controller[_controllerName].prototype.content = function(){
				    			//console.log(this._$content);
				    			//this._$content();
				    		};				    		
			                _controller[_controllerName].prototype._$render_from_powerup = _sub_comp[_modname];			                
							_controller[_controllerName].prototype.refresh = GenericComponentRefresh.prototype.refresh;	
		              	}
		              	tmpThis.initModule(tmpObjModule);
		            });
				});
			}
		}
		return this;
	}
	public content(cb:Function):void{		
		//injeta content na bind do patch do incremental .bind({content:cb})
		//chama o metodo refresh da instancia
		//chama o metodo attached da instancia		
	}
	private changeProps(tag_controller:any,host_vars:string[]):void{
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
				if(tag_controller[_onChangedFunction]){
					tag_controller[_onChangedFunction](newValue);
				}else{
                   	tag_controller[prop] = newValue;
                }
			};	        
		}
	}
}

let loadTag: LoadTag = new LoadTag();

export default loadTag;

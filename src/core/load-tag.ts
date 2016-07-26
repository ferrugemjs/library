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
	loaded?:boolean;
	content?:Function;
}
class LoadTag{
	private moduleWait:IModuleConfig[];
	constructor(){
		this.moduleWait = [];
	}
	private resolveModules():void{
		console.log(`resolve ${this.moduleWait.length}`);
		this.moduleWait.forEach((mod:IModuleConfig)=>{
			this.initModule(mod);			
		});
		//this.moduleWait = [];
	}
	private initModule(mod:IModuleConfig):void{
		let tmpTagReg = registerTag.getRegistred(mod.tag);
        let controlInt = new tmpTagReg._$controller();            
        controlInt._$el$domref = mod.target;
        //controlInt._$content = mod.content;
	  	controlInt.refresh();
		if(controlInt.attached){
			controlInt.attached();
		};
		this.changeProps(controlInt,mod.host_vars);

		/*
		this.moduleWait.every((mod_item:IModuleConfig,indx:number)=>{
			if(mod.target===mod_item.target){
				console.log(`${mod_item.target} - ${mod.target} - ${indx}`);
				//this.moduleWait.splice(indx,1);
				return false;
			};
			return true;
		});
		*/
	}
	public load(tag:string,target:string,host_vars:string[]):IAfterLoad{
		//console.log(tag);
		//console.log(host_vars);
		let tmpTagReg = registerTag.getRegistred(tag);
		let tmpIdElement:string = "custom_element_id_"+new Date().getTime();		
		_IDOM.elementOpen("div", tmpIdElement, ['id',tmpIdElement]);
		_IDOM.elementClose("div");
		//console.log(tmpTagReg);
		//this.actualModule = 
		//this.actualModule = {tag:tmpTagReg.tag,target:tmpIdElement,host_vars:host_vars};
		if(tmpTagReg && tmpTagReg._$controller){
			//console.log("loaded!");
			//this.actualModule.loaded = true;
			this.moduleWait.push({tag:tmpTagReg.tag,target:tmpIdElement,host_vars:host_vars,loaded:true});
		}else{
			this.moduleWait.push({tag:tmpTagReg.tag,target:tmpIdElement,host_vars:host_vars});
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
			                _controller[_controllerName].prototype.refresh =function(){
			                   if(this._$el$domref){
				            		_IDOM.patch(document.getElementById(this._$el$domref),function(){
				            			this._$render_from_powerup(this,registerTag,tmpThis);
				            		}.bind(this));
			                   	}			            
			                }
		              	}
		              	tmpThis.resolveModules();
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
		//console.log('cb');
		//console.log(this.actualModule);
		let lastModule:number = this.moduleWait.length-1;
		//this.moduleWait[lastModule].content = cb;

		if(this.moduleWait[lastModule].loaded){
			this.initModule(this.moduleWait.pop());
		}		
		
	}
	private changeProps(tag_controller:any,host_vars:string[]):void{
		//console.log(host_vars);
		if(host_vars && host_vars.length > 0){
			let host_vars_count:number = host_vars.length;
			for(let i:number = 0;i < host_vars_count/2;++i){
				//console.log(i);
				//console.log(host_vars[i]);
				//console.log(host_vars[i],host_vars[i+1]);
				let prop:string = host_vars[i];
				let newValue:any = host_vars[i+1];
				let _onChangedFunction:string = "on"+prop.replace(/(^\D)/g,function(g0,g1){
					return g0.toUpperCase();
				})+"Changed";
				let oldValue:any = tag_controller[prop];
				tag_controller[prop] = newValue;
				if(tag_controller[_onChangedFunction]){
					tag_controller[_onChangedFunction](newValue,oldValue);
				}
			};	        
		}
	}
}

export default new LoadTag();
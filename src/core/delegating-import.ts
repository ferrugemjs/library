import defineTag = require("./define-tag-webcomponent");

declare var System:any;

class DelegatingSystemImport{
	private from:string="";
	private _loaded_modules:string[]=[];
	private loadModule(p_resource_url:string):void{
		//console.log(`module loaded: ${p_resource_url}`);
		if(this._loaded_modules.indexOf(p_resource_url) < 0){
			//console.log(`novo modulo:${this.props.from}`);
			this._loaded_modules.push(p_resource_url);

			if(p_resource_url.lastIndexOf("!")===p_resource_url.length-1){
				System.import(p_resource_url);
			}else{
				//separation of alias name
				var patt_alias:RegExp = / as\W+(\w.+)/g;
				let _tagname:string;
				let _trueurl:string;
				if(patt_alias.test(p_resource_url)){
					//has a alias
					let _urlsplit:string[] = p_resource_url.split(' as ');
					_trueurl = _urlsplit[0];
					_tagname = _urlsplit[1];
				}else{
					_trueurl = p_resource_url;
					_tagname = p_resource_url.substring(p_resource_url.lastIndexOf("/")+1,p_resource_url.length);
				}
				//console.log(_tagname);
				//importing the controller
				System.import(_trueurl).then((_controller:any)=>{
					let _controllerName:string = Object.keys(_controller)[0];
					//importing the render					
					System.import(_trueurl+".html").then((_sub_comp:any)=>{			
						let _modname:string = Object.keys(_sub_comp)[0];
						//console.log(_modname);
						//let _tag_alias:string = _modname.replace(/([A-Z])/g, function($1:string){return "-"+$1.toLowerCase();});
						defineTag({
				      		tag:_tagname
				      		,render:_sub_comp[_modname]
				      		,controller:_controller[_controllerName]
				    	});
					});
				});
			}
		}
	}
	private attached(){
		//console.log(`init the import? ${this.from}`);
		//console.log(this);
		if(this.from){
			this.loadModule(this.from);
		}		
	}
	private onFromChanged(p_newfrom:string,p_oldfrom:string):void{
		//console.log(`this.from:${this.from} ,new: ${p_newfrom} , old: ${p_oldfrom}   `);
		if(p_newfrom){
			this.loadModule(p_newfrom);
		};
	}
}
defineTag({
	tag: 'delegating-import'
	,controller:DelegatingSystemImport
	,render:function(){}
});
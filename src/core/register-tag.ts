declare var System:any;

interface ITagRegister{
	tag:string;
	url:string;
	_$controller?:any;
}

class RegisterTag{
	private internal_dictionary:{[tag: string]:{url:string,_$controller?:any}}
	constructor(){
		this.internal_dictionary = {};
	}	
	public getRegistred(tag:string):ITagRegister{
		return {
			tag:tag
			,url:this.internal_dictionary[tag].url
			,_$controller:this.internal_dictionary[tag]._$controller
		};
	}
	public config(tag:string,_$controller:any):void{
		this.internal_dictionary[tag]._$controller = _$controller;
	}
	public add(p_resource_url:string):void{		
		let tmptag:ITagRegister = this.getTagFromUrl(p_resource_url);
		//console.log(`module loaded: ${p_resource_url}`);
		if(!this.internal_dictionary[tmptag.tag]){
			//console.log(`novo modulo:${this.props.from}`);
			if(p_resource_url.lastIndexOf("!")===p_resource_url.length-1){
				System.import(p_resource_url);				
			}else{
				//separation of alias name
				this.internal_dictionary[tmptag.tag] = {url:tmptag.url};
			}
		}
	}
	private getTagFromUrl(p_resource_url:string):ITagRegister{
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
		};
		return {tag:_tagname,url:_trueurl};
	}
}

export default new RegisterTag();
import _IDOM = require("incremental-dom");
import defineTag = require("./define-tag"); 
declare var System:any;
let app_html_s = document.querySelectorAll('[app]');
	let app_html:Element;

	if(app_html_s.length === 0){
	app_html = document.getElementsByTagName('body')[0];
	}else{
	app_html = app_html_s[0];
	};
	app_html_s = null;

	let app_url:string = app_html.getAttribute("app")||"app";
	let app_uid:string = app_html.getAttribute("id");
	if(!app_uid){
		app_uid = "uid_"+new Date().getTime();
		app_html.setAttribute("id",app_uid);
	};
System.import(app_url).then((_init_app:any)=>{
	let _app_name:string = Object.keys(_init_app)[0];
	System.import(app_url+".html").then((_init_app_render:any)=>{
		let _modname:string = Object.keys(_init_app_render)[0];
		_IDOM.patch(document.getElementById(app_uid),($this:any)=>{
			_IDOM.elementOpen("init-app",null,['id','123']);
				//_IDOM.elementOpen("content");
					_IDOM.elementOpen("span");
						_IDOM.text("funciona cabra");
					_IDOM.elementClose("span");
				//_IDOM.elementClose("content");	
			_IDOM.elementClose("init-app");
		},{});			
		defineTag({
			tag: 'init-app'
			, render: _init_app_render[_modname]
			, controller: _init_app[_app_name]
		});
		System.import("dist/core/delegating-import");
	});
});
import _fjs_ from "./generic-component";
declare let require:Function;

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

require([app_url+".html"],(_mod_init_app:any)=>{
	let _tmp_class_name:string = app_html.className?app_html.className+" ":"";
	let _tmp_inst = _fjs_.build({
		classFactory:_mod_init_app.default
		,staticVars:{}
		,hostVars:{}
		,tagName:"init-app-tag"
		,target:app_uid
	});
	_tmp_inst.refresh();
	app_html.className =  _tmp_class_name+_mod_init_app.default.prototype["_$style_name$_"];
});

export default _fjs_;

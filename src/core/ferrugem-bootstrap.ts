import {AuxClass} from "./generic-component";
declare var System:any;


//console.log('staterde!!!');

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

System.import(app_url+".html").then((_mod_init_app:any)=>{
	let _controller_ = new _mod_init_app.default();
	let _tmp_class_name:string = app_html.className?app_html.className+" ":"";
	app_html.className =  _tmp_class_name+_mod_init_app.default.prototype["$className$ref_style_name$"];
	AuxClass.prototype.configComponent.call(_controller_,'init-app-tag', app_uid, {});
	_controller_.refresh();
});

export {GenericComponent,AuxClass} from "./generic-component";

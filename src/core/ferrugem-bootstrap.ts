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

System.import(app_url+".html").then((_mod_init_app:any)=>{
	let _controllerName:string = Object.keys(_mod_init_app)[0];
	//console.log(_mod_init_app);
	let _controller_ = new _mod_init_app[_controllerName]();
	_controller_.configComponent('init-app-tag',app_uid,[],null);
	_controller_.refresh();
});

export {GenericComponent,AuxClass} from "./generic-component";
import _IDOM = require("incremental-dom");
import registerTag from "./register-tag";
import loadTag from "./load-tag";
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

registerTag.add(app_url+" as init-app-tag");

_IDOM.patch(document.getElementById(app_uid),()=>{
	loadTag.load('init-app-tag',app_uid,[]);
},{});